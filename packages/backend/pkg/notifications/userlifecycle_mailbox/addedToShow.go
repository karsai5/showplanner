package userlifecycle_mailbox

import (
	"fmt"

	"showplanner.io/pkg/config"
	"showplanner.io/pkg/notifications"
	"showplanner.io/pkg/postoffice/letters"
)

func sendWelcomeToShowEmail(email letters.UserAddedToShowLetter) error {
	body := fmt.Sprintf(`You've been added to '%s'!

The most important thing is to now check out the full schedule and fill in your availabilities. Filling in your availbilities and keeping them up to date is important so that the show manager can properly assign you and cover any events you can't make.

You can checkout the schedule and fill in your availabilities at %s/shows/%s 

The ShowPlanner Team`, email.ShowName, config.FRONTEND_URL, email.ShowSlug)

	err := notifications.SendEmail(notifications.Email{
		ToEmail: email.Email,
		Subject: fmt.Sprintf("You've been added to the show '%s'", email.ShowName),
		Body:    body,
	})

	if err != nil {
		return err
	}

	return nil
}
