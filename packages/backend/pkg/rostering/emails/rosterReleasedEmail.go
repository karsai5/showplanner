package emails

import (
	"fmt"

	"showplanner.io/pkg/config"
	"showplanner.io/pkg/notifications"
)

type RosterReleasedEmail struct {
	Email    string
	ShowName string
	ShowSlug string
}

func SendRosterReleasedEmail(email RosterReleasedEmail) error {
	body := fmt.Sprintf(`The roster for %s has now been released.

You can view it at %s/shows/%s/roster

Chookas!`, email.ShowName, config.FRONTEND_URL, email.ShowSlug)

	err := notifications.SendEmail(notifications.Email{
		ToEmail: email.Email,
		Subject: fmt.Sprintf("%s - Roster released", email.ShowName),
		Body:    body,
	})
	if err != nil {
		return err
	}

	return nil
}
