package users_domain

import (
	"fmt"
	"showplanner.io/pkg/notifications"
	"showplanner.io/pkg/utils"
)

type WelcomeToShowEmail struct {
	Email    string
	ShowName string
	ShowSlug string
}

func SendWelcomeToShowEmail(email WelcomeToShowEmail) {
	frontendUrl := utils.GetEnvVariable("FRONTEND_URL", true)
	body := fmt.Sprintf(`You've been added to '%s'!

The most important thing is to now check out the full schedule and fill in your availabilities. Filling in your availbilities and keeping them up to date is important so that the show manager can properly assign you and cover any events you can't make.

You can checkout the schedule and fill in your availabilities at %s/shows/%s 

Linus`, email.ShowName, frontendUrl, email.ShowSlug)
	err := notifications.SendEmail(notifications.Email{
		ToEmail: email.Email,
		Subject: fmt.Sprintf("You've been added to the show '%s'", email.ShowName),
		Body:    body,
	})

	if err != nil {
		fmt.Println("EMAIL: There was an error sending welcome to show email: " + err.Error())
	}
	fmt.Println("EMAIL: welcome to show sent")
}
