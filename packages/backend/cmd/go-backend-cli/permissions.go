package main

import (
	"fmt"
	"os"
	"strconv"
	"strings"

	"showplanner.io/pkg/rostering"
	"showplanner.io/pkg/rostering/people"

	"showplanner.io/pkg/database"
	"showplanner.io/pkg/permissions"

	"github.com/supertokens/supertokens-golang/recipe/userroles"
	"github.com/urfave/cli/v2"

	"github.com/erikgeiser/promptkit/textinput"
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
			return rostering.AddPersonToShow(showId, userId)
		},
	}
}

func RemoveFromShow() *cli.Command {
	return &cli.Command{
		Name:  "remove-member",
		Usage: "Remove a user from a show",
		Flags: []cli.Flag{},
		Action: func(ctx *cli.Context) error {
			permissions.InitSupertokens()

			show, err := selectShow()
			if err != nil {
				return err
			}

			person, err := selectPersonForShow(show.ID)

			permissions.InitSupertokens()
			return people.RemovePersonFromShow(show.ID, person.ID)
		},
	}
}

func GiveRole() *cli.Command {
	return &cli.Command{
		Name:  "give-role",
		Usage: "give the user a role",
		Action: func(ctx *cli.Context) (err error) {
			defer func() {
				if err != nil {
					fmt.Printf(fmt.Sprintf("Error: %v", err))
					os.Exit(1)
				}
			}()

			selectedPerson, err := selectPerson()
			if err != nil {
				return err
			}

			selectedRole, err := selectRole()
			if err != nil {
				return err
			}

			confStr := fmt.Sprintf("Are you sure you want to give %s the role of %s on the show %s", getName(selectedPerson), selectedRole.Name, selectedRole.Show)

			fmt.Printf(confStr)
			input := textinput.New("Type the last name of the user to confirm")
			input.Placeholder = "Name cannot be empty"

			name, err := input.RunPrompt()
			if err != nil {
				return err
			}
			if name != selectedPerson.LastName {
				return fmt.Errorf("Names do not match %s != %s", name, selectedPerson.LastName)
			}

			permissions.InitSupertokens()
			return permissions.GiveRole(selectedRole.FullKey, selectedPerson.ID)
		},
	}
}

func getName(p database.Person) string {
	firstName := p.FirstName
	if p.PreferredName != nil && *p.PreferredName != "" {
		firstName = *p.PreferredName
	}

	return fmt.Sprintf("%s %s", firstName, p.LastName)
}

func getMetadata(p database.Person) string {
	return fmt.Sprintf("%s %s", p.Email, p.ID.String())
}
