package main

import (
	"log"
	"os"

	"github.com/urfave/cli/v2"
)

func main() {
	app := &cli.App{
		Commands: []*cli.Command{
			AddShow(),
			ListRoles(),
			AddRole(),
			MakeAdmin(),
			GiveRole(),
		},
	}

	if err := app.Run(os.Args); err != nil {
		log.Fatal(err)
	}
}