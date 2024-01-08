package main

import (
	"go-backend/domains/permissions"
	"strconv"
	"strings"

	"github.com/supertokens/supertokens-golang/recipe/thirdpartyemailpassword"
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
			email := ctx.String("email")
			return giveRole(email, "admin")
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
			email := ctx.String("email")
			role := ctx.String("role")
			return giveRole(email, role)
		},
	}
}

func giveRole(email string, role string) error {

	err := permissions.InitSupertokens()
	if err != nil {
		return err
	}

	users, err := thirdpartyemailpassword.GetUsersByEmail("public", email)

	if err != nil {
		println("Error getting user", err.Error())
		return err
	}

	if len(users) == 0 {
		println("No users found")
		return nil
	}

	for _, user := range users {
		println("User found: " + user.Email + ", " + user.ID)
		response, err := userroles.AddRoleToUser("public", user.ID, role)
		if err != nil {
			println("Could not make user an admin" + err.Error())
			return err
		} else {
			if response.UnknownRoleError != nil {
				println("Role does not exist")
				return nil
			} else if response.OK.DidUserAlreadyHaveRole {
				println("User already had the role")
				return nil
			} else {
				println("Roles successfully added")
				return nil
			}
		}
	}

	return nil

}
