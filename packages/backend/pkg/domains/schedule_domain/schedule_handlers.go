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

var (
	BASE_ROLE = "baseRole"
	ASSIGNED  = "assigned"
	COVERING  = "covering"
	SHADOWING = "shadowing"
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

	roles, err := database.GetRolesForPerson(showId, userId)

	if err != nil && !errors.Is(err, gorm.ErrRecordNotFound) {
		return logError(&err)
	}

	scheduledEvents := []*models.ScheduleEventDTO{}

	for _, e := range events {
		scheduledEvents = append(scheduledEvents, conv.Pointer(
			models.ScheduleEventDTO{
				EventDTO:     events_domain.MapEventToEventDTO(e),
				Roles:        getRoles(roles, e, userId),
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

func getRoles(roles []database.Role, event database.Event, userId uuid.UUID) []*models.ScheduleEventDTORolesItems0 {
	arr := []*models.ScheduleEventDTORolesItems0{}

	// Get base roles, check if role is covered, check if role is shadowed
	for _, role := range roles {
		arr = append(arr, getBaseRole(role, event, userId))
	}

	// Add shadows (note: you can't get covered for an assignment)
	arr = append(arr, getAssignmentsAndCovers(event, userId)...)

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
		Type:       BASE_ROLE,
	}

	coverIdx := slices.IndexFunc(event.Assignments, func(assignment database.Assignment) bool {
		return assignment.RoleID == role.ID && userId != assignment.PersonID
	})
	if coverIdx >= 0 {
		baseRole.CoveredBy = conv.Pointer(personnel_domain.MapToPersonSummaryDTO(event.Assignments[coverIdx].Person))
	}

	addShadows(&baseRole, event, role.ID)

	return &baseRole
}

func getRolesUserIsShadowing(shadows []database.Shadow, userId uuid.UUID) []*models.ScheduleEventDTORolesItems0 {
	arr := []*models.ScheduleEventDTORolesItems0{}
	for _, shadow := range shadows {
		if shadow.PersonID == userId {
			role := models.ScheduleEventDTORolesItems0{
				ID:        conv.UintToInt64(shadow.RoleID),
				Name:      &shadow.Role.Name,
				Type:      SHADOWING,
				Shadowing: nil,
			}
			if shadow.Role.Person != nil {
				role.Shadowing = conv.Pointer(personnel_domain.MapToPersonSummaryDTO(*shadow.Role.Person))
			}
			arr = append(arr, conv.Pointer(role))
		}
	}
	return arr
}

func getAssignmentsAndCovers(event database.Event, userId uuid.UUID) []*models.ScheduleEventDTORolesItems0 {
	arr := []*models.ScheduleEventDTORolesItems0{}
	for _, assignment := range event.Assignments {
		if assignment.PersonID == userId {
			role := models.ScheduleEventDTORolesItems0{
				ID:       conv.UintToInt64(assignment.RoleID),
				Name:     conv.Pointer(assignment.Role.Name),
				Covering: nil,
				Type:     ASSIGNED,
			}

			if assignment.Role.Person != nil {
				role.Covering = conv.Pointer(personnel_domain.MapToPersonSummaryDTO(*assignment.Role.Person))
				role.Type = COVERING
			}

			addShadows(&role, event, assignment.RoleID)

			arr = append(arr, &role)
		}
	}
	return arr
}

func addShadows(role *models.ScheduleEventDTORolesItems0, event database.Event, roleId uint) {
	shadowsForRole := []*models.PersonSummaryDTO{}
	for _, s := range event.Shadows {
		if s.RoleID == roleId {
			shadowsForRole = append(shadowsForRole, conv.Pointer(personnel_domain.MapToPersonSummaryDTO(s.Person)))
		}
	}
	if len(shadowsForRole) > 0 {
		role.ShadowedBy = shadowsForRole
	}
}

func mapAssignmentsToEventRole(assignment database.Assignment) models.ScheduleEventDTORolesItems0 {
	return models.ScheduleEventDTORolesItems0{
		ID:   conv.UintToInt64(assignment.RoleID),
		Name: conv.Pointer(assignment.Role.Name),
	}
}
