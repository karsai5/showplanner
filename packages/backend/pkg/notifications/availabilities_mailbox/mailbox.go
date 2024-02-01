package availabilities_mailbox

import (
	"context"
	"encoding/json"
	"fmt"
	"log/slog"
	"time"

	"github.com/ThreeDotsLabs/watermill"
	"github.com/ThreeDotsLabs/watermill/message"
	"github.com/ThreeDotsLabs/watermill/message/router/middleware"
	"github.com/ThreeDotsLabs/watermill/message/router/plugin"
	"showplanner.io/pkg/database"
	"showplanner.io/pkg/helpers"
	"showplanner.io/pkg/postoffice"
	"showplanner.io/pkg/postoffice/letters"
	"showplanner.io/pkg/postoffice/topics"
)

var (
	debounced = helpers.CreateDebouncer(20 * time.Minute)
)

func Setup() {
	router := postoffice.CreateNewRouter()

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
			Logger:          postoffice.RouterLogger,
		}.Middleware,

		// Recoverer handles panics from handlers.
		// In this case, it passes them as errors to the Retry middleware.
		middleware.Recoverer,
	)

	router.AddHandler(
		"email_availabilities",
		topics.UpdatedAvailability,
		postoffice.CreateSubscriber("1"),
		topics.UpdatedAvailabilityEnriched,
		postoffice.CreatePublisher(),
		availabilityEnricherHandler{}.Handler,
	)

	router.AddNoPublisherHandler(
		"email_availabilities_update",
		topics.UpdatedAvailabilityEnriched,
		postoffice.CreateSubscriber("4"),
		handleEmailNotification,
	)

	if err := router.Run(context.Background()); err != nil {
		panic(err)
	}
}

type availabilityEnricherHandler struct {
	// we can add some dependencies here
	// TODO: Can't work out why email logs don't work here
}

func (s availabilityEnricherHandler) Handler(msg *message.Message) (msgs []*message.Message, err error) {

	defer func() {
		if err != nil {
			slog.Error(fmt.Sprintf("Error: %s", err.Error()))
			err = fmt.Errorf("while adding person to show: %w", err)
		}
	}()

	e := letters.UpdatedAvailabilityLetter{}

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

	enrichedEvent := letters.UpdatedAvailabilityEnrichedLetter{
		UserId:        e.UserId,
		Name:          fmt.Sprintf("%s %s", person.FirstName, person.LastName),
		ShowId:        event.Show.ID,
		ShowName:      event.Show.Name,
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
