package main

import (
	"fmt"
	"os"
	"strconv"
	"strings"

	"showplanner.io/pkg/conv"
	"showplanner.io/pkg/database"
	"showplanner.io/pkg/domains/personnel_domain"
	"showplanner.io/pkg/permissions"

	"github.com/muesli/termenv"
	"github.com/supertokens/supertokens-golang/recipe/userroles"
	"github.com/urfave/cli/v2"

	"github.com/erikgeiser/promptkit/selection"
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
			return personnel_domain.AddToShow(showId, userId)
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

			permissions.InitSupertokens()
			people, err := database.GetAllPeople()

			if err != nil {
				return err
			}

			blue := termenv.String().Foreground(termenv.ANSI256Color(32)) //nolint:gomnd

			sp := selection.New("Pick user", people)
			sp.PageSize = 5
			sp.SelectedChoiceStyle = func(c *selection.Choice[database.Person]) string {
				return (blue.Bold().Styled(getName(c.Value)) + " " +
					termenv.String("("+getMetadata(c.Value)+")").Faint().String())
			}
			sp.UnselectedChoiceStyle = func(c *selection.Choice[database.Person]) string {
				return (getName(c.Value) + " " + termenv.String("("+getMetadata(c.Value)+")").Faint().String())
			}

			selectedPerson, err := sp.RunPrompt()
			if err != nil {
				return err
			}

			roles := getRoleOptions()
			sr := selection.New("Pick role", roles)
			sr.PageSize = 5
			sr.SelectedChoiceStyle = func(c *selection.Choice[RoleSelection]) string {
				return (blue.Bold().Styled(c.Value.Name) + " " +
					termenv.String("("+c.Value.FullKey+")").Faint().String())
			}
			sr.UnselectedChoiceStyle = func(c *selection.Choice[RoleSelection]) string {
				return (c.Value.Name + " " + termenv.String("("+c.Value.FullKey+")").Faint().String())
			}

			selectedRole, err := sr.RunPrompt()
			if err != nil {
				return err
			}

			_, _ = selectedPerson, selectedRole

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

			return permissions.GiveRole(selectedRole.FullKey, selectedPerson.ID)
		},
	}
}

func getRoleOptions() []RoleSelection {
	roles := []RoleSelection{}
	for _, r := range permissions.Roles {
		roles = append(roles, RoleSelection{
			Name:    r.Name,
			FullKey: r.Key,
		})
	}

	shows, err := database.GetAllShows()
	if err != nil {
		return roles
	}

	for _, s := range shows {
		for _, r := range permissions.ShowRoles {
			roles = append(roles, RoleSelection{
				Name:    fmt.Sprintf("%s - %s", s.Name, r.Name),
				FullKey: r.Key(conv.UintToString(&s.ID)),
				Show:    s.Name,
			})
		}
	}
	return roles
}

type RoleSelection struct {
	Name    string
	FullKey string
	Show    string
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
