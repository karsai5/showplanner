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

		err = db.UpdateRosterReleaseStatus(uint(params.ShowID), true)
		if err != nil {
			return logError(&err)
		}

		if params.SendEmail != nil && *params.SendEmail {
			sendEmailNotifyingThatRosterHasBeenReleased(db, uint(params.ShowID))
		}

		return &rostering.PostShowsShowIDRosterReleaseOK{}
	})
}

func handleUnreleaseRoster(db database.IDatabase) rostering.PostShowsShowIDRosterUnreleaseHandler {
	return rostering.PostShowsShowIDRosterUnreleaseHandlerFunc(func(params rostering.PostShowsShowIDRosterUnreleaseParams) middleware.Responder {
		logError := logger.CreateLogErrorFunc("Unreleasing roster", &rostering.PostShowsShowIDRosterUnreleaseInternalServerError{})

		hasPerm, err := permissions.Rostering.HasPermission(uint(params.ShowID), params.HTTPRequest)
		if err != nil {
			return logError(&err)
		}

		if !hasPerm {
			return &rostering.PostShowsShowIDRosterReleaseUnauthorized{}
		}

		err = db.UpdateRosterReleaseStatus(uint(params.ShowID), false)
		if err != nil {
			return logError(&err)
		}

		return &rostering.PostShowsShowIDRosterUnreleaseOK{}
	})
}
