package main

import (
	"errors"
	"fmt"
	"os"
	"regexp"
	"showplanner.io/pkg/database"
	"text/tabwriter"

	"github.com/urfave/cli/v2"
)

func ListShows() *cli.Command {
	return &cli.Command{
		Name:  "list-shows",
		Usage: "List all shows",
		Action: func(ctx *cli.Context) error {
			shows, err := database.GetAllShows()

			w := tabwriter.NewWriter(os.Stdout, 1, 1, 1, ' ', 0)
			fmt.Fprintln(w, "ID\tName\tSlug")
			for _, show := range shows {
				fmt.Fprintf(w, "%v\t%s\t%s\n", show.ID, show.Name, show.Slug)
			}
			w.Flush()

			return err
		},
	}
}

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
