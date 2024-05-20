package main

import (
	"log"
	"os"
	"time"

	"showplanner.io/pkg/conv"
	"showplanner.io/pkg/database"
	"showplanner.io/pkg/domains/showreports"

	uuid "github.com/satori/go.uuid"
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
			CreateShowReport(),
		},
	}

	if err := app.Run(os.Args); err != nil {
		log.Fatal(err)
	}
}

func CreateShowReport() *cli.Command {
	return &cli.Command{
		Name:  "showreport",
		Usage: "create show report",
		Action: func(ctx *cli.Context) error {
			id, _ := uuid.FromString("eba20525-f4e8-455e-aa37-9ca17e588d50")
			sr := database.ShowReport{
				ID:                 id,
				Title:              "Les Misérables Show 10 Report",
				Subtitle:           "Saturday 7.30pm, 5th August 2023",
				ShowStart:          conv.Pointer(time.Date(2023, 11, 17, 19, 32, 0, 0, time.UTC)),
				ShowEnd:            conv.Pointer(time.Date(2023, 11, 17, 22, 02, 0, 0, time.UTC)),
				IntervalStart:      nil,
				IntervalEnd:        nil,
				HouseOpen:          nil,
				ActOneFOHClearance: nil,
				ActTwoFOHClearance: nil,
				Notes:              "# General notes\n - one\n - two\n - three\n",
			}

			showreports.CreateShowReport(sr)

			return nil
		},
	}
}
