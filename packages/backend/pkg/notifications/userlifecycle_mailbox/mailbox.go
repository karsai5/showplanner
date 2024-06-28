package userlifecycle_mailbox

import (
	"context"
	"encoding/json"
	"time"

	"github.com/ThreeDotsLabs/watermill/message"
	"github.com/ThreeDotsLabs/watermill/message/router/middleware"
	"github.com/ThreeDotsLabs/watermill/message/router/plugin"
	"showplanner.io/pkg/helpers"
	"showplanner.io/pkg/postoffice"
	"showplanner.io/pkg/postoffice/letters"
	"showplanner.io/pkg/postoffice/topics"
)

var (
	debounced = helpers.CreateDebouncer(10 * time.Second)
)

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
		"email_new_user",
		topics.NewUser,
		postoffice.PubSub,
		func(msg *message.Message) error {
			letter := letters.NewUserLetter{}

			err := json.Unmarshal(msg.Payload, &letter)
			if err != nil {
				return err
			}
			return sendEmailToNewUser(letter.Email)
		},
	)

	router.AddNoPublisherHandler(
		"email_admin_about_filled_in_profile",
		topics.UserFilledInProfile,
		postoffice.PubSub,
		func(msg *message.Message) error {
			letter := letters.UserFilledInProfileLetter{}

			err := json.Unmarshal(msg.Payload, &letter)
			if err != nil {
				return err
			}

			return sendAdminNewUserEmailNotification(letter)
		},
	)

	if err := router.Run(context.Background()); err != nil {
		panic(err)
	}
}
