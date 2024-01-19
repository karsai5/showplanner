package users_domain

import (
	"fmt"
	"showplanner.io/pkg/database"
	users_domain "showplanner.io/pkg/domains/users_domain/notifications"
	"showplanner.io/pkg/permissions"

	"github.com/supertokens/supertokens-golang/recipe/thirdpartyemailpassword"
	"github.com/supertokens/supertokens-golang/recipe/userroles"
)

func AddToShow(showId string, email string) error {
	role := permissions.ShowMember.Key(showId)
	err := GiveRole(role, email)
	if err != nil {
		return fmt.Errorf("Error adding user to show: %w", err)
	}

	show, err := database.GetShowById(showId)

	if err != nil {
		return fmt.Errorf("Error adding user to show: %w", err)
	}

	users_domain.SendWelcomeToShowEmail(users_domain.WelcomeToShowEmail{
		Email:    email,
		ShowName: show.Name,
		ShowSlug: show.Slug,
	})
	return nil
}

func AddManagerToShow(showId string, email string) error {
	role := permissions.ShowManager.Key(showId)
	return GiveRole(role, email)
}

func GiveRole(role string, email string) error {
	users, err := thirdpartyemailpassword.GetUsersByEmail("public", email)
	if err != nil {
		return fmt.Errorf("Error getting email with email %s: %w", email, err)
	}

	if len(users) == 0 {
		return fmt.Errorf("No users found with email %s", email)
	}

	if len(users) > 1 {
		println("Too many users found")
		return fmt.Errorf("Too many users found with email %s", email)
	}

	user := users[0]
	response, err := userroles.AddRoleToUser("public", user.ID, role)

	if err != nil {
		return fmt.Errorf("Could not give %s role %s: %w", email, role, err)
	}

	if response.UnknownRoleError != nil {
		return fmt.Errorf("Role %s does not exist", role)
	}

	return nil
}
