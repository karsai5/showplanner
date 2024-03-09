package schedule_domain

import (
	"errors"

	"gorm.io/gorm"
	"showplanner.io/pkg/conv"
	"showplanner.io/pkg/database"
	"showplanner.io/pkg/domains/events_domain"
	"showplanner.io/pkg/logger"
	"showplanner.io/pkg/models"
	"showplanner.io/pkg/permissions"
	"showplanner.io/pkg/restapi/operations"

	"github.com/go-openapi/runtime/middleware"
)

var GetScheduleHandler = operations.GetScheduleHandlerFunc(func(params operations.GetScheduleParams) middleware.Responder {
	logError := logger.CreateLogErrorFunc("Getting roster", &operations.GetScheduleInternalServerError{})
	showId := uint(params.ShowID)

	hasPermission, err := permissions.ViewEvents.HasPermission(showId, params.HTTPRequest)
	userId, err := permissions.GetUserId(params.HTTPRequest)

	if err != nil {
		return logError(&err)
	}

	if !hasPermission {
		return &operations.GetScheduleUnauthorized{}
	}

	events, err := database.GetEventsWithAvailabilityAndAssignmentsForUser(showId, userId)
	if err != nil {
		return logError(&err)
	}

	role, err := database.GetRoleForPerson(showId, userId)

	if err != nil && !errors.Is(err, gorm.ErrRecordNotFound) {
		return logError(&err)
	}

	scheduledEvents := []*models.ScheduleEventDTO{}

	for _, e := range events {
		scheduledEvent := models.ScheduleEventDTO{
			EventDTO: events_domain.MapEventToEventDTO(e),
			Roles:    initialiseRoleArray(role),
		}

		if len(e.Availabilities) > 0 {
			availability := mapAvailabilityDTO(e.Availabilities[0])
			scheduledEvent.Availability = &availability
		}

		if len(e.Assignments) > 0 {
			scheduledEvent.Roles = append(scheduledEvent.Roles, conv.MapArrayOfPointer(e.Assignments, mapAssignmentsToEventRole)...)
		}

		scheduledEvents = append(scheduledEvents, &scheduledEvent)
	}

	events_domain.NameEventsWithCurtainsUp(scheduledEvents)

	return &operations.GetScheduleOK{

		Payload: scheduledEvents,
	}
})

func initialiseRoleArray(role database.Role) []*models.ScheduleEventDTORolesItems0 {
	arr := []*models.ScheduleEventDTORolesItems0{}
	if role.ID == 0 {
		return arr
	}
	return append(arr, &models.ScheduleEventDTORolesItems0{
		ID:   conv.UintToInt64(role.ID),
		Name: conv.Pointer(role.Name),
	})
}

func mapAssignmentsToEventRole(assignment database.Assignment) models.ScheduleEventDTORolesItems0 {
	return models.ScheduleEventDTORolesItems0{
		ID:   conv.UintToInt64(assignment.RoleID),
		Name: conv.Pointer(assignment.Role.Name),
	}
}
