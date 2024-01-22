package permissions

import (
	"fmt"

	"showplanner.io/pkg/database"
	"showplanner.io/pkg/logger"
	"showplanner.io/pkg/notifications"

	uuid "github.com/satori/go.uuid"
	"github.com/supertokens/supertokens-golang/recipe/session"
	"github.com/supertokens/supertokens-golang/recipe/thirdpartyemailpassword"
	"github.com/supertokens/supertokens-golang/recipe/thirdpartyemailpassword/tpepmodels"
	"github.com/supertokens/supertokens-golang/recipe/userroles"
	"github.com/supertokens/supertokens-golang/recipe/userroles/userrolesclaims"
)

func AddToShow(showId string, userId uuid.UUID) (err error) {
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

	database.AddPersonToShow(show.ID, userId)

	err = GiveRole(ShowMember.Key(showId), userId)
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

func GetUserIdByEmail(email string) (uuid.UUID, error) {
	user, err := GetUserByEmail(email)
	if err != nil {
		return uuid.UUID{}, err
	}
	userId, err := uuid.FromString(user.ID)
	if err != nil {
		return uuid.UUID{}, err
	}
	return userId, nil
}

func GetUserByEmail(email string) (user tpepmodels.User, err error) {
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

func GetUserById(id uuid.UUID) (*tpepmodels.User, error) {
	user, err := thirdpartyemailpassword.GetUserById(id.String())
	if err != nil {
		return user, fmt.Errorf("Error getting email with id %s: %w", id, err)
	}

	return user, nil
}

func AddManagerToShow(showId string, userId uuid.UUID) error {
	role := ShowManager.Key(showId)
	return GiveRole(role, userId)
}

func GiveRole(role string, userId uuid.UUID) error {
	user, err := GetUserById(userId)

	if err != nil {
		return fmt.Errorf("Could not give %s role %s: %w", userId, role, err)
	}

	response, err := userroles.AddRoleToUser("public", user.ID, role)

	if err != nil {
		return fmt.Errorf("Could not give %s role %s: %w", userId, role, err)
	}

	sessionHandles, err := session.GetAllSessionHandlesForUser(user.ID, nil)

	if err != nil {
		logger.Error(fmt.Sprintf("Could not get sessions for %s", user.Email), err)
	}

	for _, currSessionHandle := range sessionHandles {
		_, err := session.FetchAndSetClaim(currSessionHandle, userrolesclaims.UserRoleClaim)
		if err != nil {
			logger.Error("Could not fetch and set roles", err)
		}
		_, err = session.FetchAndSetClaim(currSessionHandle, userrolesclaims.PermissionClaim)
		if err != nil {
			logger.Error("Could not fetch and set permissions", err)
		}
	}

	if response.UnknownRoleError != nil {
		return fmt.Errorf("Role %s does not exist", role)
	}

	return nil
}
