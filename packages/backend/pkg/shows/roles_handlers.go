package shows

import (
	"github.com/go-openapi/runtime/middleware"
	"showplanner.io/pkg/database"
	"showplanner.io/pkg/logger"
	"showplanner.io/pkg/permissions"
	"showplanner.io/pkg/restapi/operations/rostering"
)

func handleSetRolesOrder(db database.IDatabase, ph permissions.IPermissionsHandler) rostering.PostShowsShowIDRolesSetorderHandler {
	return rostering.PostShowsShowIDRolesSetorderHandlerFunc(func(params rostering.PostShowsShowIDRolesSetorderParams) middleware.Responder {
		logError := logger.CreateLogErrorFunc("Setting order of roles", &rostering.PostShowsShowIDRolesSetorderInternalServerError{})

		hasPerm, err := permissions.Rostering.HasPermission(ph, params.HTTPRequest, uint(params.ShowID))
		if err != nil {
			return logError(&err)
		}
		if !hasPerm {
			return rostering.NewPostShowsShowIDRolesSetorderUnauthorized()
		}

		for i, roleId := range params.Order {
			err := db.UpdateSortOrderOfRole(uint(roleId), uint(i))
			if err != nil {
				return logError(&err)
			}
		}

		return rostering.NewPostShowsShowIDRolesSetorderOK()
	})
}
