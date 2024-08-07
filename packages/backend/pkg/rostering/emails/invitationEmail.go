package emails

import (
	"fmt"

	"showplanner.io/pkg/config"
	"showplanner.io/pkg/notifications"
)

type InvitationEmail struct {
	Email          string
	ShowName       string
	NameOfInviter  string
	IsExistingUser bool
}

func SendInvitationEmail(email InvitationEmail) error {
	body := getInvitationEmailBody(email)

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

func getInvitationEmailBody(email InvitationEmail) string {
	if email.IsExistingUser {
		return fmt.Sprintf(`%s has invited you to join '%s'!

To join the show, please go to %s/shows to accept the invitation.

The ShowPlanner Team`, email.NameOfInviter, email.ShowName, config.FRONTEND_URL)
	}

	return fmt.Sprintf(`%s has invited you to join '%s'!

They're using the ShowPlanner to manage this show. In order to join it, first create an account at %s/auth, then go to %s/shows to accept the invitation.

In order for the show manager to properly assign you and cover any events you can't make, it's important to fill in your availabilities and keep them up to date.

You must sign up with the email address you received this email on, if you use another address ask the stage manager to invite you again once your account is created.

The Showplanner Team`, email.NameOfInviter, email.ShowName, config.FRONTEND_URL, config.FRONTEND_URL)
}
