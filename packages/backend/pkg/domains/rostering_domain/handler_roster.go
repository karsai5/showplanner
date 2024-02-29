package rostering_domain

import (
	"github.com/go-openapi/runtime/middleware"
	"showplanner.io/pkg/convert"
	"showplanner.io/pkg/database"
	"showplanner.io/pkg/domains/events_domain"
	"showplanner.io/pkg/logger"
	"showplanner.io/pkg/models"
	"showplanner.io/pkg/permissions"
	"showplanner.io/pkg/restapi/operations"
)

var handleGetRoster = operations.GetRosterHandlerFunc(func(params operations.GetRosterParams) middleware.Responder {
	logError := logger.CreateLogErrorFunc("Getting roster", &operations.GetRosterInternalServerError{})

	hasPerm, err := permissions.Rostering.HasPermission(uint(params.ShowID), params.HTTPRequest)

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
	events, err := database.GetEventsWithAvailabilities(uint(params.ShowID))
	if err != nil {
		return logError(&err)
	}

	mappedEvents := convert.MapArrayOfPointer(events, mapToEventWithAssignments(roles))

	events_domain.NameEventsWithCurtainsUp(mappedEvents)

	return &operations.GetRosterOK{
		Payload: &models.RosterDTO{
			Events: mappedEvents,
			Roles:  convert.MapArrayOfPointer(roles, mapToRoleDTO),
		},
	}
})

var handlePostAssign = operations.PostRosterAssignHandlerFunc(func(params operations.PostRosterAssignParams) middleware.Responder {
	logError := logger.CreateLogErrorFunc("Getting roster", &operations.PostRosterAssignInternalServerError{})

	event, err := database.GetEvent(uint(*params.Assignment.EventID))
	if err != nil {
		return logError(&err)
	}

	hasPerm, err := permissions.Rostering.HasPermission(event.ShowID, params.HTTPRequest)
	if err != nil {
		return logError(&err)
	}
	if !hasPerm {
		return &operations.GetAvailabilitiesUnauthorized{}
	}

	database.CreateAssignment(database.Assignment{
		PersonID: *convert.StrfmtUUIDToUUID(params.Assignment.PersonID),
		EventID:  event.ID,
		RoleID:   uint(*params.Assignment.RoleID),
	})

	return logError(nil)
})
