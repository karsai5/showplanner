package schedule_domain

import (
	"errors"
	"slices"

	"gorm.io/gorm"
	"showplanner.io/pkg/conv"
	"showplanner.io/pkg/database"
	"showplanner.io/pkg/domains/events_domain"
	"showplanner.io/pkg/domains/personnel_domain"
	"showplanner.io/pkg/logger"
	"showplanner.io/pkg/models"
	"showplanner.io/pkg/permissions"
	"showplanner.io/pkg/restapi/operations"

	"github.com/go-openapi/runtime/middleware"
	uuid "github.com/satori/go.uuid"
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
		scheduledEvents = append(scheduledEvents, conv.Pointer(
			models.ScheduleEventDTO{
				EventDTO:     events_domain.MapEventToEventDTO(e),
				Roles:        getRoles(role, e, userId),
				Availability: getAvailability(e.Availabilities),
			},
		))
	}

	events_domain.NameEventsWithCurtainsUp(scheduledEvents)

	return &operations.GetScheduleOK{

		Payload: scheduledEvents,
	}
})

func getAvailability(availabilities []database.Availability) *models.AvailabilityDTO {
	if len(availabilities) > 0 {
		return conv.Pointer(mapAvailabilityDTO(availabilities[0]))
	}
	return nil
}

func getRoles(role database.Role, event database.Event, userId uuid.UUID) []*models.ScheduleEventDTORolesItems0 {
	arr := []*models.ScheduleEventDTORolesItems0{}

	// Get base role, check if role is covered, check if role is shadowed
	if role.ID != 0 {
		arr = append(arr, getBaseRole(role, event, userId))
	}

	// Add shadows (note: you can't get covered for an assignment)
	arr = append(arr, getAssignedShadows(event.Assignments, userId)...)

	// Add any shadows
	arr = append(arr, getRolesUserIsShadowing(event.Shadows, userId)...)

	return arr
}

func getBaseRole(role database.Role, event database.Event, userId uuid.UUID) *models.ScheduleEventDTORolesItems0 {
	baseRole := models.ScheduleEventDTORolesItems0{
		ID:         conv.UintToInt64(role.ID),
		Name:       conv.Pointer(role.Name),
		CoveredBy:  nil,
		ShadowedBy: nil,
	}

	coverIdx := slices.IndexFunc(event.Assignments, func(assignment database.Assignment) bool {
		return assignment.RoleID == role.ID && userId != assignment.PersonID
	})
	if coverIdx >= 0 {
		baseRole.CoveredBy = conv.Pointer(personnel_domain.MapToPersonSummaryDTO(event.Assignments[coverIdx].Person))
	}

	shadows := []*models.PersonSummaryDTO{}
	for _, s := range event.Shadows {
		if s.RoleID == role.ID {
			shadows = append(shadows, conv.Pointer(personnel_domain.MapToPersonSummaryDTO(s.Person)))
		}
	}
	if len(shadows) > 0 {
		baseRole.ShadowedBy = shadows
	}

	return &baseRole
}

func getRolesUserIsShadowing(shadows []database.Shadow, userId uuid.UUID) []*models.ScheduleEventDTORolesItems0 {
	arr := []*models.ScheduleEventDTORolesItems0{}
	for _, shadow := range shadows {
		if shadow.PersonID == userId {
			arr = append(arr, conv.Pointer(models.ScheduleEventDTORolesItems0{
				ID:        conv.UintToInt64(shadow.RoleID),
				Name:      &shadow.Role.Name,
				Shadowing: conv.Pointer(personnel_domain.MapToPersonSummaryDTO(shadow.Person)),
			}))
		}
	}
	return arr
}

func getAssignedShadows(assignments []database.Assignment, userId uuid.UUID) []*models.ScheduleEventDTORolesItems0 {
	arr := []*models.ScheduleEventDTORolesItems0{}
	for _, assignment := range assignments {
		if assignment.PersonID == userId {
			arr = append(arr, conv.Pointer(models.ScheduleEventDTORolesItems0{
				ID:       conv.UintToInt64(assignment.RoleID),
				Name:     conv.Pointer(assignment.Role.Name),
				Covering: conv.Pointer(personnel_domain.MapToPersonSummaryDTO(*assignment.Role.Person)),
			}))
		}
	}
	return arr
}

func mapAssignmentsToEventRole(assignment database.Assignment) models.ScheduleEventDTORolesItems0 {
	return models.ScheduleEventDTORolesItems0{
		ID:   conv.UintToInt64(assignment.RoleID),
		Name: conv.Pointer(assignment.Role.Name),
	}
}
