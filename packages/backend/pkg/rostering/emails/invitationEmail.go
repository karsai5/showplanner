package emails

import (
	"fmt"

	"showplanner.io/pkg/config"
	"showplanner.io/pkg/notifications"
)

type InvitationEmail struct {
	Email         string
	ShowName      string
	NameOfInviter string
}

func SendInvitationEmail(email InvitationEmail) error {
	body := fmt.Sprintf(`%s has invited you to join '%s'!

  To join the show, please go to %s/shows to accept the invitation.

The ShowPlanner Team`, email.NameOfInviter, email.ShowName, config.FRONTEND_URL)

	err := notifications.SendEmail(notifications.Email{
		ToEmail: email.Email,
		Subject: fmt.Sprintf("You've been invited to join '%s'", email.ShowName),
		Body:    body,
	})

	if err != nil {
		return err
	}

	return nil
}
