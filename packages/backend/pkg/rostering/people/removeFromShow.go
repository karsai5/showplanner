package people

import (
	"fmt"
	"strconv"

	uuid "github.com/satori/go.uuid"
	"showplanner.io/pkg/database"
	"showplanner.io/pkg/permissions"
)

func RemovePersonFromShow(showId uint, userId uuid.UUID) (err error) {
	defer func() {
		if err != nil {
			err = fmt.Errorf("while removing person from show: %w", err)
		}
	}()

	err = database.RemovePersonFromShow(showId, userId)
	if err != nil {
		return err
	}

	err = database.RemovePersonAssignmentsFromShow(showId, userId)
	if err != nil {
		return err
	}

	err = database.RemovePersonRoleAssignmentsFromShow(showId, userId)
	if err != nil {
		return err
	}

	return removeShowPermissionsFromPerson(showId, userId)
}

func removeShowPermissionsFromPerson(showId uint, userId uuid.UUID) (err error) {
	defer func() {
		if err != nil {
			err = fmt.Errorf("while removing show permissions from person: %w", err)
		}
	}()

	for _, showRole := range permissions.ShowRoles {
		roleKey := showRole.Key(strconv.Itoa(int(showId)))
		err = permissions.RemoveRole(roleKey, userId)
		if err != nil {
			return err
		}
	}

	return nil
}
