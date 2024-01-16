package main

import (
	"go-backend/notifications"
	"log"
	"os"

	"github.com/urfave/cli/v2"
)

func main() {
	app := &cli.App{
		Commands: []*cli.Command{
			ListShows(),
			AddShow(),
			ListRoles(),
			AddRole(),
			MakeAdmin(),
			GiveRole(),
			AddToShow(),
			SendEmail(),
		},
	}

	if err := app.Run(os.Args); err != nil {
		log.Fatal(err)
	}
}

func SendEmail() *cli.Command {
	return &cli.Command{
		Name:  "send-email",
		Usage: "send test email",
		Action: func(ctx *cli.Context) error {
			email := notifications.Email{
				ToEmail: "linus@linusk.com.au",
				Subject: "Test email",
				Body:    "This is another test email!",
			}

			notifications.SendEmail(email)
			return nil
		},
	}
}
