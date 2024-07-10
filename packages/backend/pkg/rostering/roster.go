package rostering

import (
	"github.com/go-openapi/runtime/middleware"
	"showplanner.io/pkg/database"
	"showplanner.io/pkg/logger"
	"showplanner.io/pkg/permissions"
	"showplanner.io/pkg/restapi/operations/rostering"
)

func handleReleaseRoster(db database.IDatabase) rostering.PostShowsShowIDRosterReleaseHandler {
	return rostering.PostShowsShowIDRosterReleaseHandlerFunc(func(params rostering.PostShowsShowIDRosterReleaseParams) middleware.Responder {
		logError := logger.CreateLogErrorFunc("Releasing roster", &rostering.PostShowsShowIDRosterReleaseInternalServerError{})

		hasPerm, err := permissions.Rostering.HasPermission(uint(params.ShowID), params.HTTPRequest)
		if err != nil {
			return logError(&err)
		}

		if !hasPerm {
			return &rostering.PostShowsShowIDRosterReleaseUnauthorized{}
		}

		show := database.Show{
			Options: database.ShowOptions{
				IsRosterReleased: true,
			},
		}

		_, err = db.UpdateShow(show)
		if err != nil {
			return logError(&err)
		}

		// TODO: Send email

		return rostering.NewPostShowsShowIDRosterReleaseOK()
	})
}
