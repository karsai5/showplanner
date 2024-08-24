package main

import (
	"log"
	"os"

	"showplanner.io/pkg/shows"

	"github.com/urfave/cli/v2"
)

func main() {
	app := &cli.App{
		Commands: []*cli.Command{
			ListShows(),
			AddShow(),
			ListRoles(),
			MakeAdmin(),
			GiveRole(),
			AddToShow(),
			ConvertInvitations(),
			RemoveFromShow(),
		},
	}

	if err := app.Run(os.Args); err != nil {
		log.Fatal(err)
	}
}

func ConvertInvitations() *cli.Command {
	return &cli.Command{
		Name:  "convertinvitations",
		Usage: "convert invitations",
		Action: func(ctx *cli.Context) error {
			return shows.ConvertEmailInvitationsIntoPeopleInvitations()
		},
	}
}
