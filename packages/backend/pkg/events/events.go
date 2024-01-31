package events

import (
	"context"
	"encoding/json"
	"fmt"
	"log/slog"
	"time"

	"github.com/ThreeDotsLabs/watermill"
	"github.com/ThreeDotsLabs/watermill-kafka/v2/pkg/kafka"
	"github.com/ThreeDotsLabs/watermill/message"
	"github.com/ThreeDotsLabs/watermill/message/router/middleware"
	"github.com/ThreeDotsLabs/watermill/message/router/plugin"
	uuid "github.com/satori/go.uuid"
	"showplanner.io/pkg/database"
	debounce "showplanner.io/pkg/helpers"
)

var (
	brokers      = []string{"127.0.0.1:9092"}
	consumeTopic = "events"
	publishTopic = "events-processed"

	logger = watermill.NewStdLogger(
		true,  // debug
		false, // trace
	)
	marshaler  = kafka.DefaultMarshaler{}
	publisher  = createPublisher()
	subscriber = createSubscriber("handler_1")
)

type BaseEvent struct {
	ID int `json:"id"`
}

type UpdatedAvailabilityRawEvent struct {
	BaseEvent
	UserId       uuid.UUID
	EventId      uint
	Availability bool
}

type UpdatedAvailabilityEvent struct {
	BaseEvent
	UserId        uuid.UUID
	FirstName     string
	ShowSlug      string
	EventId       uint
	EventDateTime string
	Availability  bool
}

type processedEvent struct {
	ProcessedID int       `json:"processed_id"`
	Time        time.Time `json:"time"`
}

const (
	TopicUpdatedAvailabilityRaw = "updated_availability_raw"
	TopicUpdatedAvailability    = "updated_availability"
)

func PublishRawAvailability(e UpdatedAvailabilityRawEvent) {
	go publishEvent(TopicUpdatedAvailabilityRaw, e)
}

func publishEvent[T any](topic string, event T) error {
	payload, err := json.Marshal(event)
	if err != nil {
		slog.Error("Could not marshall")
		return fmt.Errorf("While publishing event: %w", err)
	}
	err = publisher.Publish(topic, message.NewMessage(
		watermill.NewUUID(), // internal uuid of the message, useful for debugging
		payload,
	))
	if err != nil {
		slog.Error("Could not publish: %s", "err", err.Error())
		return fmt.Errorf("While publishing event: %w", err)
	}
	return nil
}

func SetupEvents() {
	// Subscriber is created with consumer group handler_1

	router, err := message.NewRouter(message.RouterConfig{}, logger)
	if err != nil {
		panic(err)
	}

	// shutdown when SIGTERM is recieved
	router.AddPlugin(plugin.SignalsHandler)
	// Router level middleware are executed for every message sent to the router
	router.AddMiddleware(
		// CorrelationID will copy the correlation id from the incoming message's metadata to the produced messages
		middleware.CorrelationID,

		// The handler function is retried if it returns an error.
		// After MaxRetries, the message is Nacked and it's up to the PubSub to resend it.
		middleware.Retry{
			MaxRetries:      3,
			InitialInterval: time.Millisecond * 100,
			Logger:          logger,
		}.Middleware,

		// Recoverer handles panics from handlers.
		// In this case, it passes them as errors to the Retry middleware.
		middleware.Recoverer,
	)

	router.AddHandler(
		"email_availabilities",
		TopicUpdatedAvailabilityRaw,
		createSubscriber("1"),
		TopicUpdatedAvailability,
		publisher,
		availabilityEnricherHandler{}.Handler,
	)

	router.AddNoPublisherHandler(
		"print_raw_availabilities",
		TopicUpdatedAvailabilityRaw,
		createSubscriber("2"),
		printMessages,
	)

	router.AddNoPublisherHandler(
		"print_availabilities",
		TopicUpdatedAvailability,
		createSubscriber("3"),
		printMessages,
	)

	router.AddNoPublisherHandler(
		"email_availabilities_update",
		TopicUpdatedAvailability,
		createSubscriber("4"),
		sendAvailabiltyEmail{}.Handler,
	)

	if err := router.Run(context.Background()); err != nil {
		panic(err)
	}
}

func printMessages(msg *message.Message) error {
	fmt.Printf(
		"\n> Received message: %s\n> %s\n> metadata: %v\n\n",
		msg.UUID, string(msg.Payload), msg.Metadata,
	)
	return nil
}

var debounced = debounce.New(10 * time.Second)
var events = []UpdatedAvailabilityEvent{}

type sendAvailabiltyEmail struct{}

func (s sendAvailabiltyEmail) Handler(msg *message.Message) (err error) {
	defer func() {
		if err != nil {
			slog.Error(fmt.Sprintf("Error: %s", err.Error()))
			err = fmt.Errorf("While sending email: %w", err)
		}
	}()

	e := UpdatedAvailabilityEvent{}

	err = json.Unmarshal(msg.Payload, &e)
	if err != nil {
		return err
	}

	events = append(events, e)
	debounced(s.sendEmail)

	return nil
}

func (s sendAvailabiltyEmail) sendEmail() {
	fmt.Printf("SENDING EMAILS: %v", events)
}

type availabilityEnricherHandler struct {
	// we can add some dependencies here
}

func (s availabilityEnricherHandler) Handler(msg *message.Message) (msgs []*message.Message, err error) {

	defer func() {
		if err != nil {
			slog.Error(fmt.Sprintf("Error: %s", err.Error()))
			err = fmt.Errorf("while adding person to show: %w", err)
		}
	}()

	e := UpdatedAvailabilityRawEvent{}

	err = json.Unmarshal(msg.Payload, &e)
	if err != nil {
		return msgs, err
	}

	person, err := database.GetPerson(e.UserId)
	if err != nil {
		return msgs, err
	}

	event, err := database.GetEventWithShow(e.EventId)
	if err != nil {
		return msgs, err
	}

	enrichedEvent := UpdatedAvailabilityEvent{
		BaseEvent:     BaseEvent{},
		UserId:        e.UserId,
		FirstName:     person.FirstName,
		ShowSlug:      event.Show.Slug,
		EventId:       e.EventId,
		EventDateTime: event.Start.Format("2006-01-02T15:04:05 -070000"),
		Availability:  false,
	}

	payload, err := json.Marshal(enrichedEvent)
	if err != nil {
		return msgs, err
	}

	return message.Messages{
		message.NewMessage(
			watermill.NewUUID(), // internal uuid of the message, useful for debugging
			payload,
		),
	}, nil
}

// createPublisher is a helper function that creates a Publisher, in this case - the Kafka Publisher.
func createPublisher() message.Publisher {
	kafkaPublisher, err := kafka.NewPublisher(
		kafka.PublisherConfig{
			Brokers:   brokers,
			Marshaler: marshaler,
		},
		logger,
	)
	if err != nil {
		panic(err)
	}

	return kafkaPublisher
}

// createSubscriber is a helper function similar to the previous one, but in this case it creates a Subscriber.
func createSubscriber(consumerGroup string) message.Subscriber {
	kafkaSubscriber, err := kafka.NewSubscriber(
		kafka.SubscriberConfig{
			Brokers:       brokers,
			Unmarshaler:   marshaler,
			ConsumerGroup: consumerGroup, // every handler will use a separate consumer group
		},
		logger,
	)
	if err != nil {
		panic(err)
	}

	return kafkaSubscriber
}
