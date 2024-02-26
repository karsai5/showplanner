package main

import (
	"strconv"
	"strings"

	"showplanner.io/pkg/domains/personnel_domain"
	"showplanner.io/pkg/permissions"

	"github.com/supertokens/supertokens-golang/recipe/userroles"
	"github.com/urfave/cli/v2"
)

func ListRoles() *cli.Command {
	return &cli.Command{
		Name:  "list-roles",
		Usage: "list all existing roles",
		Flags: []cli.Flag{},
		Action: func(ctx *cli.Context) error {
			err := permissions.InitSupertokens()
			if err != nil {
				return err
			}

			response, err := userroles.GetAllRoles(nil)

			if err == nil {
				println("Roles: ")
				for index, role := range response.OK.Roles {
					print(strconv.Itoa(index) + " - " + role)
					response, err := userroles.GetPermissionsForRole(role, nil)
					if err != nil || response.UnknownRoleError != nil {
						println("")
					} else {
						println(": " + strings.Join(response.OK.Permissions, ", "))
					}
				}
			}

			return err
		},
	}
}

func MakeAdmin() *cli.Command {
	return &cli.Command{
		Name:  "add-admin",
		Usage: "make a user an admin",
		Flags: []cli.Flag{
			&cli.StringFlag{
				Name:     "email",
				Usage:    "email of user to make admin",
				Required: true,
			},
		},
		Action: func(ctx *cli.Context) error {
			permissions.InitSupertokens()
			email := ctx.String("email")
			userId, err := permissions.GetUserIdByEmail(email)
			if err != nil {
				return err
			}
			return permissions.GiveRole("admin", userId)
		},
	}
}

func AddToShow() *cli.Command {
	return &cli.Command{
		Name:  "add-member",
		Usage: "Add a user to a show",
		Flags: []cli.Flag{
			&cli.StringFlag{
				Name:     "email",
				Usage:    "email of user to make admin",
				Required: true,
			},
			&cli.StringFlag{
				Name:     "showId",
				Usage:    "id of show to get added to",
				Required: true,
			},
		},
		Action: func(ctx *cli.Context) error {
			permissions.InitSupertokens()
			email := ctx.String("email")
			showId, err := strconv.ParseInt(ctx.String("showId"), 10, 64)
			if err != nil {
				return err
			}
			userId, err := permissions.GetUserIdByEmail(email)
			if err != nil {
				return err
			}
			return personnel_domain.AddToShow(showId, userId)
		},
	}
}

func GiveRole() *cli.Command {
	return &cli.Command{
		Name:  "give-role",
		Usage: "give the user a role",
		Flags: []cli.Flag{
			&cli.StringFlag{
				Name:     "email",
				Usage:    "email of user to make admin",
				Required: true,
			},
			&cli.StringFlag{
				Name:     "role",
				Usage:    "role to give the user",
				Required: true,
			},
		},
		Action: func(ctx *cli.Context) error {
			permissions.InitSupertokens()
			email := ctx.String("email")
			role := ctx.String("role")
			userId, err := permissions.GetUserIdByEmail(email)
			if err != nil {
				return err
			}
			return permissions.GiveRole(role, userId)
		},
	}
}
