package rostering

import (
	"log/slog"

	"github.com/go-openapi/runtime/middleware"
	"showplanner.io/pkg/conv"
	"showplanner.io/pkg/database"
	"showplanner.io/pkg/domains/schedule_domain"
	"showplanner.io/pkg/logger"
	"showplanner.io/pkg/permissions"
	"showplanner.io/pkg/restapi/dtos"
	"showplanner.io/pkg/restapi/operations/rostering"
	"showplanner.io/pkg/restapi/operations/shows"
)

func handleGetRoster(db database.IDatabase, ph permissions.IPermissionsHandler) shows.GetShowsShowIDRosterHandler {
	return shows.GetShowsShowIDRosterHandlerFunc(func(params shows.GetShowsShowIDRosterParams) middleware.Responder {
		logError := logger.CreateLogErrorFunc("Getting roster", &shows.GetShowsShowIDRosterInternalServerError{})

		show, err := db.GetShowById(uint(params.ShowID))
		if err != nil {
			return logError(&err)
		}

		// If the roster hasn't been released and the user isn't mananger
		if hasRosteringPerm, _ := permissions.Rostering.HasPermission(ph, params.HTTPRequest, uint(params.ShowID)); !show.Options.IsRosterReleased && !hasRosteringPerm {
			slog.Info("User doesn't have permission to view roster")
			return &shows.GetShowsShowIDRosterUnauthorized{}
		}

		hasPerm, err := permissions.ViewEvents.HasPermission(ph, params.HTTPRequest, uint(params.ShowID))
		if err != nil {
			return logError(&err)
		}
		if !hasPerm {
			return &shows.GetShowsShowIDRosterUnauthorized{}
		}

		roles, err := db.GetRolesForShow(show.ID)
		if err != nil {
			return logError(&err)
		}
		events, err := db.GetEventsPreloaded(show.ID)
		if err != nil {
			return logError(&err)
		}

		mappedRoles := conv.MapArrayOfPointer(roles, func(r database.Role) dtos.RosterRoleDTO { return r.MapToRosterRoleDTO() })
		mappedEvents := conv.MapArrayOfPointer(events, func(event database.Event) dtos.RosterEventDTO { return event.MapToEventWithAssignments(roles) })
		schedule_domain.NameEventsWithCurtainsUp(mappedEvents)

		return &shows.GetShowsShowIDRosterOK{
			Payload: &dtos.RosterDTO{
				Events: mappedEvents,
				Roles:  mappedRoles,
			},
		}
	})
}

func handleReleaseRoster(db database.IDatabase, ph permissions.IPermissionsHandler) rostering.PostShowsShowIDRosterReleaseHandler {
	return rostering.PostShowsShowIDRosterReleaseHandlerFunc(func(params rostering.PostShowsShowIDRosterReleaseParams) middleware.Responder {
		logError := logger.CreateLogErrorFunc("Releasing roster", &rostering.PostShowsShowIDRosterReleaseInternalServerError{})

		hasPerm, err := permissions.Rostering.HasPermission(ph, params.HTTPRequest, uint(params.ShowID))
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

func handleUnreleaseRoster(db database.IDatabase, ph permissions.IPermissionsHandler) rostering.PostShowsShowIDRosterUnreleaseHandler {
	return rostering.PostShowsShowIDRosterUnreleaseHandlerFunc(func(params rostering.PostShowsShowIDRosterUnreleaseParams) middleware.Responder {
		logError := logger.CreateLogErrorFunc("Unreleasing roster", &rostering.PostShowsShowIDRosterUnreleaseInternalServerError{})

		hasPerm, err := permissions.Rostering.HasPermission(ph, params.HTTPRequest, uint(params.ShowID))
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
