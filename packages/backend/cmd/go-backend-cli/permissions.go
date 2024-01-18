package main

import (
	"go-backend/pkg/permissions"
	"go-backend/pkg/handlers/users_domain"
	"strconv"
	"strings"

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

func AddRole() *cli.Command {
	return &cli.Command{
		Name:  "add-role",
		Usage: "add a new role",
		Flags: []cli.Flag{
			&cli.StringFlag{
				Name:     "role",
				Usage:    "name of the role",
				Required: true,
			},
			&cli.StringFlag{
				Name:     "permission",
				Usage:    "permission string",
				Required: true,
			},
		},
		Action: func(ctx *cli.Context) error {
			role := ctx.String("role")
			permission := ctx.String("permission")

			err := permissions.InitSupertokens()
			if err != nil {
				return err
			}

			response, err := userroles.CreateNewRoleOrAddPermissions(role, []string{
				permission,
			})

			if err == nil {
				if response.OK.CreatedNewRole {
					println("New role created!")
				} else {
					println("Role updated")
				}
				return nil
			}

			println("Error creating role: " + err.Error())
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
			return users_domain.GiveRole("admin", email)
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
			showId := ctx.String("showId")
			return users_domain.AddToShow(showId, email)
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
			return users_domain.GiveRole(role, email)
		},
	}
}
