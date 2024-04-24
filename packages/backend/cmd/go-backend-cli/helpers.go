package main

import (
	"fmt"

	"github.com/erikgeiser/promptkit/selection"
	"github.com/muesli/termenv"
	"showplanner.io/pkg/conv"
	"showplanner.io/pkg/database"
	"showplanner.io/pkg/permissions"
)

func selectPerson() (person database.Person, err error) {
	blue := termenv.String().Foreground(termenv.ANSI256Color(32)) //nolint:gomnd

	people, err := database.GetAllPeople()

	if err != nil {
		return person, err
	}

	sp := selection.New("Pick user", people)
	sp.PageSize = 5
	sp.SelectedChoiceStyle = func(c *selection.Choice[database.Person]) string {
		return (blue.Bold().Styled(getName(c.Value)) + " " +
			termenv.String("("+getMetadata(c.Value)+")").Faint().String())
	}
	sp.UnselectedChoiceStyle = func(c *selection.Choice[database.Person]) string {
		return (getName(c.Value) + " " + termenv.String("("+getMetadata(c.Value)+")").Faint().String())
	}

	return sp.RunPrompt()
}

type roleSelection struct {
	Name    string
	FullKey string
	Show    string
}

func selectRole() (role roleSelection, err error) {
	blue := termenv.String().Foreground(termenv.ANSI256Color(32)) //nolint:gomnd
	roles := getRoleOptions()
	sr := selection.New("Pick role", roles)
	sr.PageSize = 5
	sr.SelectedChoiceStyle = func(c *selection.Choice[roleSelection]) string {
		return (blue.Bold().Styled(c.Value.Name) + " " +
			termenv.String("("+c.Value.FullKey+")").Faint().String())
	}
	sr.UnselectedChoiceStyle = func(c *selection.Choice[roleSelection]) string {
		return (c.Value.Name + " " + termenv.String("("+c.Value.FullKey+")").Faint().String())
	}

	return sr.RunPrompt()
}

func getRoleOptions() []roleSelection {
	roles := []roleSelection{}
	for _, r := range permissions.Roles {
		roles = append(roles, roleSelection{
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
			roles = append(roles, roleSelection{
				Name:    fmt.Sprintf("%s - %s", s.Name, r.Name),
				FullKey: r.Key(conv.UintToString(&s.ID)),
				Show:    s.Name,
			})
		}
	}
	return roles
}
