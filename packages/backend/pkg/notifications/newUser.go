package notifications

import (
	"fmt"
	"log/slog"

	"showplanner.io/pkg/config"
	"showplanner.io/pkg/logger"
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

var setupCalendarLink = fmt.Sprintf(`%s/me/calendar`, config.FRONTEND_URL)
var sendEmailToNewUserBody = fmt.Sprintf(`Welcome to the ShowPlanner! The goal of the ShowPlanner is to reduce the number of spreadsheets and overhead required to organise people for a show.

As a user it should help you to! Using the ShowPlanner means you'll always have access to the most up to date schedule and roster for any show you're working on.

At the moment you won't be assigned to any shows. But don't worry, the ShowPlanner team will have gotten an email notifying them that you've signed up and when they add you to a show you'll get an email notifying you.

In the meantime you can setup you calendar to subscribe to the ShowPlanner so that all the events for shows you're apart of will automatically appear. Head over to %s for instructions on how to set it up.

Until then sit tight, and welcome!

The ShowPlanner Team
`, setupCalendarLink)

type AdminNewUserEmailNotification struct {
	Email            string
	FirstName        string
	LastName         string
	HearAboutUs      *string
	PreviousWork     *string
	ReasonForCrewing *string
}

func SendAdminNewUserEmailNotification(details AdminNewUserEmailNotification) {

	email := config.ADMIN_EMAIL

	adminNewUserEmailNotificationBody := fmt.Sprintf(`name: %s %s
email: %s

how did they hear about us: %v
previous work: %v
reason for crewing: %v
		`, details.FirstName, details.LastName, details.Email, details.HearAboutUs, details.PreviousWork, details.ReasonForCrewing)

	err := SendEmail(Email{
		ToEmail: email,
		Subject: "New Person",
		Body:    adminNewUserEmailNotificationBody,
	})

	if err != nil {
		logger.Error("Error sending new user email", err)
	}

	slog.Info("EMAIL: Admin notificatino of new user sent")
}
