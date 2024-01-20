package users

import (
	"fmt"

	"showplanner.io/pkg/database"
	users_domain "showplanner.io/pkg/domains/users/notifications"
	"showplanner.io/pkg/permissions"

	uuid "github.com/satori/go.uuid"
	"github.com/supertokens/supertokens-golang/recipe/thirdpartyemailpassword"
	"github.com/supertokens/supertokens-golang/recipe/thirdpartyemailpassword/tpepmodels"
	"github.com/supertokens/supertokens-golang/recipe/userroles"
)

func AddToShow(showId string, email string) (err error) {
	defer func() {
		if err != nil {
			err = fmt.Errorf("while adding person to show: %w", err)
		}
	}()

	role := permissions.ShowMember.Key(showId)
	show, err := database.GetShowById(showId)

	if err != nil {
		return err
	}

	user, err := getuserByEmail(email)
	if err != nil {
		return err
	}

	id, err := uuid.FromString(user.ID)
	if err != nil {
		return err
	}

	if err != nil {
		return err
	}
	database.AddPersonToShow(show.ID, id)

	err = GiveRole(role, email)
	if err != nil {
		return err
	}

	go users_domain.SendWelcomeToShowEmail(users_domain.WelcomeToShowEmail{
		Email:    email,
		ShowName: show.Name,
		ShowSlug: show.Slug,
	})
	return nil
}

func getuserByEmail(email string) (user tpepmodels.User, err error) {
	users, err := thirdpartyemailpassword.GetUsersByEmail("public", email)
	if err != nil {
		return user, fmt.Errorf("Error getting email with email %s: %w", email, err)
	}

	if len(users) == 0 {
		return user, fmt.Errorf("No users found with email %s", email)
	}

	if len(users) > 1 {
		println("Too many users found")
		return user, fmt.Errorf("Too many users found with email %s", email)
	}

	return users[0], nil
}

func AddManagerToShow(showId string, email string) error {
	role := permissions.ShowManager.Key(showId)
	return GiveRole(role, email)
}

func GiveRole(role string, email string) error {
	user, err := getuserByEmail(email)

	if err != nil {
		return fmt.Errorf("Could not give %s role %s: %w", email, role, err)
	}

	response, err := userroles.AddRoleToUser("public", user.ID, role)

	if err != nil {
		return fmt.Errorf("Could not give %s role %s: %w", email, role, err)
	}

	if response.UnknownRoleError != nil {
		return fmt.Errorf("Role %s does not exist", role)
	}

	return nil
}
