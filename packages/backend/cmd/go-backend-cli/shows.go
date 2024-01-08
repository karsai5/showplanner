package main

import (
	"errors"
	"go-backend/database"
	"regexp"

	"github.com/urfave/cli/v2"
)

func AddShow() *cli.Command {
	return &cli.Command{
		Name:  "add-show",
		Usage: "add a new show",
		Flags: []cli.Flag{
			&cli.StringFlag{
				Name:     "name",
				Usage:    "name of the show",
				Required: true,
			},
			&cli.StringFlag{
				Name:     "company",
				Usage:    "name of company, e.g. Willoughby",
				Required: true,
			},
			&cli.StringFlag{
				Name:     "slug",
				Usage:    "what string to use in urls",
				Required: true,
			},
		},
		Action: func(ctx *cli.Context) error {
			name := ctx.String("name")
			company := ctx.String("company")
			slug := ctx.String("slug")

			db := database.GetDatabase()

			show := database.Show{
				Name:    name,
				Company: company,
				Slug:    slug,
			}

			re := regexp.MustCompile(`^[a-z0-9]*$`)
			slugMatch := re.MatchString(slug)

			if !slugMatch {
				return errors.New("Slug must be all lower case, no spaces")
			}

			result := db.Create(&show)

			println("Created show: ", show.ID)

			return result.Error
		},
	}
}
