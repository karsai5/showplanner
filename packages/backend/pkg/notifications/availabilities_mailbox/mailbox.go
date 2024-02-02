package availabilities_mailbox

import (
	"context"
	"time"

	"github.com/ThreeDotsLabs/watermill/message/router/middleware"
	"github.com/ThreeDotsLabs/watermill/message/router/plugin"
	"showplanner.io/pkg/helpers"
	"showplanner.io/pkg/postoffice"
	"showplanner.io/pkg/postoffice/topics"
)

var debounced = helpers.CreateDebouncer(20 * time.Minute)

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

	router.AddNoPublisherHandler(
		"email_availabilities_update",
		topics.UpdatedAvailability,
		postoffice.CreateSubscriber("4"),
		handleEmailNotification,
	)

	if err := router.Run(context.Background()); err != nil {
		panic(err)
	}
}
