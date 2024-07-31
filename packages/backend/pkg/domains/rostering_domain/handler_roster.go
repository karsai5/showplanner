package rostering_domain

import (
	"log/slog"

	"github.com/go-openapi/runtime/middleware"
	"showplanner.io/pkg/conv"
	"showplanner.io/pkg/database"
	"showplanner.io/pkg/domains/schedule_domain"
	"showplanner.io/pkg/logger"
	"showplanner.io/pkg/permissions"
	"showplanner.io/pkg/restapi/dtos"
	"showplanner.io/pkg/restapi/operations"
)

var handleGetRoster = operations.GetRosterHandlerFunc(func(params operations.GetRosterParams) middleware.Responder {
	logError := logger.CreateLogErrorFunc("Getting roster", &operations.GetRosterInternalServerError{})

	show, err := database.GetShowById(params.ShowID)
	if err != nil {
		return logError(&err)
	}

	// If the roster hasn't been released and the user isn't mananger
	if hasRosteringPerm, _ := permissions.Rostering.HasPermission(uint(params.ShowID), params.HTTPRequest); !show.Options.IsRosterReleased && !hasRosteringPerm {
		slog.Info("User doesn't have permission to view roster")
		return &operations.GetRosterUnauthorized{}
	}

	hasPerm, err := permissions.ViewEvents.HasPermission(uint(params.ShowID), params.HTTPRequest)
	if err != nil {
		return logError(&err)
	}
	if !hasPerm {
		return &operations.GetAvailabilitiesUnauthorized{}
	}

	roles, err := database.GetRolesForShow(uint(params.ShowID))
	if err != nil {
		return logError(&err)
	}
	events, err := database.GetEventsForRoster(uint(params.ShowID))
	if err != nil {
		return logError(&err)
	}

	mappedRoles := conv.MapArrayOfPointer(roles, func(r database.Role) dtos.RoleDTO { return r.MapToDTO() })
	mappedEvents := conv.MapArrayOfPointer(events, mapToEventWithAssignments(roles))
	schedule_domain.NameEventsWithCurtainsUp(mappedEvents)

	return &operations.GetRosterOK{
		Payload: &dtos.RosterDTO{
			Events: mappedEvents,
			Roles:  mappedRoles,
		},
	}
})
