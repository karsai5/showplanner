package postoffice

import (
	"encoding/json"
	"fmt"
	"log/slog"
	"time"

	"github.com/ThreeDotsLabs/watermill"
	"github.com/ThreeDotsLabs/watermill-kafka/v2/pkg/kafka"
	"github.com/ThreeDotsLabs/watermill/message"
	"showplanner.io/pkg/config"
)

var (
	brokers      = []string{config.KAFKA_URL}
	RouterLogger = watermill.NewStdLogger(
		true,  // debug
		false, // trace
	)
	marshaler = kafka.DefaultMarshaler{}
	publisher = CreatePublisher()
)

type BaseEvent struct {
	ID int `json:"id"`
}

type processedEvent struct {
	ProcessedID int       `json:"processed_id"`
	Time        time.Time `json:"time"`
}

func PublishLetter[T any](topic string, event T) error {
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

func CreateNewRouter() *message.Router {
	router, err := message.NewRouter(message.RouterConfig{}, RouterLogger)
	if err != nil {
		panic(err)
	}
	return router
}

func printMessages(msg *message.Message) error {
	fmt.Printf(
		"\n> Received message: %s\n> %s\n> metadata: %v\n\n",
		msg.UUID, string(msg.Payload), msg.Metadata,
	)
	return nil
}

// createPublisher is a helper function that creates a Publisher, in this case - the Kafka Publisher.
func CreatePublisher() message.Publisher {
	kafkaPublisher, err := kafka.NewPublisher(
		kafka.PublisherConfig{
			Brokers:   brokers,
			Marshaler: marshaler,
		},
		RouterLogger,
	)
	if err != nil {
		panic(err)
	}

	return kafkaPublisher
}

// createSubscriber is a helper function similar to the previous one, but in this case it creates a Subscriber.
func CreateSubscriber(consumerGroup string) message.Subscriber {
	kafkaSubscriber, err := kafka.NewSubscriber(
		kafka.SubscriberConfig{
			Brokers:       brokers,
			Unmarshaler:   marshaler,
			ConsumerGroup: consumerGroup, // every handler will use a separate consumer group
		},
		RouterLogger,
	)
	if err != nil {
		panic(err)
	}

	return kafkaSubscriber
}
