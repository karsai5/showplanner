package people_domain_old

import (
	"fmt"

	uuid "github.com/satori/go.uuid"
	"showplanner.io/pkg/database"
	"showplanner.io/pkg/permissions"
)

func RemoveFromShow(showId uint, userId uuid.UUID) (err error) {
	defer func() {
		if err != nil {
			err = fmt.Errorf("while removing person from show: %w", err)
		}
	}()

	database.RemovePersonFromShow(showId, userId)

	for _, showRole := range permissions.ShowRoles {
		err = permissions.RemoveRole(showRole.Key(fmt.Sprint(showId)), userId)
		if err != nil {
			fmt.Printf("Error removing role: %s", err.Error())
		}
	}

	return nil
}
