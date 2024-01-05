package restapi

import (
	"go-backend/domains/permissions"
	"go-backend/domains/shows_domain"
	"strconv"
	"strings"

	"github.com/supertokens/supertokens-golang/recipe/userroles"
)

func initialiseRoles() {
	for _, role := range permissions.Roles {
		role.Initialise()
	}

	shows, err := shows_domain.GetAllShows()

	if err != nil {
		panic("Error getting shows: " + err.Error())
	}

	for _, show := range shows {
		showId := strconv.FormatUint(uint64(show.ID), 10)
		for _, role := range permissions.ShowRoles {
			role.Initialise(showId)
		}
	}

	roles, err := userroles.GetAllRoles()
	if err != nil {
		panic("Could not get roles" + err.Error())
	}
	for _, role := range roles.OK.Roles {
		permissions, err := userroles.GetPermissionsForRole(role)
		if err != nil {
			panic("Could not get role permissions" + err.Error())
		}
		println(role + ": [" + strings.Join(permissions.OK.Permissions, ", ") + "]")
	}
}
