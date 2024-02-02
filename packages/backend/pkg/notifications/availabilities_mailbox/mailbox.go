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

	router.AddPlugin(plugin.SignalsHandler)

	router.AddMiddleware(
		middleware.CorrelationID,

		middleware.Retry{
			MaxRetries:      3,
			InitialInterval: time.Millisecond * 100,
			Logger:          postoffice.RouterLogger,
		}.Middleware,

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
