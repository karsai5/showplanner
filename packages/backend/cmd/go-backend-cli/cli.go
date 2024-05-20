package main

import (
	"log"
	"os"
	"time"

	"gorm.io/gorm"
	"showplanner.io/pkg/database"
	"showplanner.io/pkg/domains/showreports"

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
			sr := database.ShowReport{
				Model: gorm.Model{
					ID: 24601,
				},
				Title:              "Les Misérables Show 10 Report",
				Subtitle:           "Saturday 7.30pm, 5th August 2023",
				Author:             "Linus Karsai",
				ShowStart:          time.Date(2023, 11, 17, 19, 32, 0, 0, time.UTC),
				ShowEnd:            time.Date(2023, 11, 17, 22, 02, 0, 0, time.UTC),
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
