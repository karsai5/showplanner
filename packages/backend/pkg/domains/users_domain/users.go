package users_domain

import (
	"fmt"

	"showplanner.io/pkg/database"
	"showplanner.io/pkg/notifications"
	"showplanner.io/pkg/permissions"

	uuid "github.com/satori/go.uuid"
	"github.com/supertokens/supertokens-golang/recipe/thirdpartyemailpassword"
	"github.com/supertokens/supertokens-golang/recipe/thirdpartyemailpassword/tpepmodels"
	"github.com/supertokens/supertokens-golang/recipe/userroles"
)

func AddToShow(showId string, userId string) (err error) {
	defer func() {
		if err != nil {
			err = fmt.Errorf("while adding person to show: %w", err)
		}
	}()

	user, err := GetUserById(userId)
	if err != nil {
		return err
	}

	show, err := database.GetShowById(showId)
	if err != nil {
		return err
	}

	id, err := uuid.FromString(userId)
	if err != nil {
		return err
	}

	database.AddPersonToShow(show.ID, id)

	err = GiveRole(permissions.ShowMember.Key(showId), userId)
	if err != nil {
		return err
	}

	notifications.SendWelcomeToShowEmail(notifications.WelcomeToShowEmail{
		Email:    user.Email,
		ShowName: show.Name,
		ShowSlug: show.Slug,
	})
	return nil
}

func GetuserByEmail(email string) (user tpepmodels.User, err error) {
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

func GetUserById(id string) (*tpepmodels.User, error) {
	user, err := thirdpartyemailpassword.GetUserById(id)
	if err != nil {
		return user, fmt.Errorf("Error getting email with id %s: %w", id, err)
	}

	return user, nil
}

func AddManagerToShow(showId string, email string) error {
	role := permissions.ShowManager.Key(showId)
	return GiveRole(role, email)
}

func GiveRole(role string, userId string) error {
	user, err := GetUserById(userId)

	if err != nil {
		return fmt.Errorf("Could not give %s role %s: %w", userId, role, err)
	}

	response, err := userroles.AddRoleToUser("public", user.ID, role)

	if err != nil {
		return fmt.Errorf("Could not give %s role %s: %w", userId, role, err)
	}

	if response.UnknownRoleError != nil {
		return fmt.Errorf("Role %s does not exist", role)
	}

	return nil
}
