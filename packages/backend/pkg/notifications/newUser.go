package notifications

import (
	"fmt"
	"log/slog"

	"showplanner.io/pkg/utils"
)

func SendEmailToNewUserAndAdmin(email string) {
	err := SendEmail(Email{
		ToEmail: email,
		Subject: "Welcome to the ShowPlanner!",
		Body:    sendEmailToNewUserBody,
	})

	if err != nil {
		fmt.Println("EMAIL: Error sending new user email")
	}

	fmt.Println("EMAIL: New user email sent")
}

var sendEmailToNewUserBody = `Welcome to the ShowPlanner! The goal of the ShowPlanner is to reduce the number of spreadsheets and overhead required to organise people for a show.

As a user it should help you to! Using the ShowPlanner means you'll always have access to the most up to date schedule and roster for any show you're working on.

At the moment you won't be assigned to any shows. But don't worry, Tess or Linus would have gotten an email notifying them that you've signed up and when they add you to a show you'll get an email notifying you.

Until then sit tight, and welcome!

Linus
`

type AdminNewUserEmailNotification struct {
	Email            string
	FirstName        string
	LastName         string
	HearAboutUs      string
	PreviousWork     string
	ReasonForCrewing string
}

func SendAdminNewUserEmailNotification(details AdminNewUserEmailNotification) {

	email := utils.GetEnvVariable("ADMIN_EMAIL", true)

	adminNewUserEmailNotificationBody := fmt.Sprintf(`name: %s %s
email: %s

how did they hear about us: %s
previous work: %s
reason for crewing: %s
		`, details.FirstName, details.LastName, details.Email, details.HearAboutUs, details.PreviousWork, details.ReasonForCrewing)

	err := SendEmail(Email{
		ToEmail: email,
		Subject: "New Person",
		Body:    adminNewUserEmailNotificationBody,
	})

	if err != nil {
		slog.Error(fmt.Errorf("Error sending new user email: %w", err).Error())
	}

	slog.Info("EMAIL: Admin notificatino of new user sent")
}