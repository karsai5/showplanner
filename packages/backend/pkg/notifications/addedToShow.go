package notifications

import (
	"fmt"
	"log/slog"

	"showplanner.io/pkg/config"
	"showplanner.io/pkg/logger"
)

type WelcomeToShowEmail struct {
	Email    string
	ShowName string
	ShowSlug string
}

func SendWelcomeToShowEmail(email WelcomeToShowEmail) {
	body := fmt.Sprintf(`You've been added to '%s'!

The most important thing is to now check out the full schedule and fill in your availabilities. Filling in your availbilities and keeping them up to date is important so that the show manager can properly assign you and cover any events you can't make.

You can checkout the schedule and fill in your availabilities at %s/shows/%s 

The ShowPlanner Team`, email.ShowName, config.FRONTEND_URL, email.ShowSlug)

	err := SendEmail(Email{
		ToEmail: email.Email,
		Subject: fmt.Sprintf("You've been added to the show '%s'", email.ShowName),
		Body:    body,
	})

	if err != nil {
		logger.Error("Could not sent welcome email", err)
	}
	slog.Info("EMAIL: welcome to show sent")
}
