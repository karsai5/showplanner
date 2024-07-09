package schedule_domain

import (
	"errors"
	"net/http"
	dto2 "showplanner.io/pkg/restapi/dtos"
	"slices"

	"showplanner.io/pkg/domains/people_domain_old"

	"gorm.io/gorm"
	"showplanner.io/pkg/conv"
	"showplanner.io/pkg/database"
	"showplanner.io/pkg/logger"
	"showplanner.io/pkg/permissions"
	"showplanner.io/pkg/restapi/operations"

	"github.com/go-openapi/runtime"
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
	db := &database.Database{}

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

	roles, err := db.GetRolesForPerson(showId, userId)

	if err != nil && !errors.Is(err, gorm.ErrRecordNotFound) {
		return logError(&err)
	}

	scheduledEvents := []*dto2.ScheduleEventDTO{}

	for _, e := range events {
		scheduledEvents = append(scheduledEvents, conv.Pointer(
			dto2.ScheduleEventDTO{
				EventDTO:     e.MapToEventDTO(),
				Roles:        MapRoles(roles, e, userId),
				Availability: getAvailability(e.Availabilities),
			},
		))
	}

	NameEventsWithCurtainsUp(scheduledEvents)

	return &operations.GetScheduleOK{

		Payload: scheduledEvents,
	}
})

var getPublicCalendarIDHandler = operations.GetPublicCalendarIDHandlerFunc(func(params operations.GetPublicCalendarIDParams) middleware.Responder {
	userId, err := uuid.FromString(params.ID)
	if err != nil {
		logger.Error("Error getting calendar", err)
		return &operations.GetPublicCalendarIDInternalServerError{}
	}

	hideEvents := false
	if params.HideEvents != nil {
		hideEvents = *params.HideEvents
	}

	ical := iCalendar{
		UserId:                   userId,
		Db:                       &database.Database{},
		HideEventsNotRequiredFor: hideEvents,
	}

	calendarString, err := ical.CreateCalendarForPerson()

	if err != nil && errors.Is(err, gorm.ErrRecordNotFound) {
		return &operations.GetPublicCalendarIDNotFound{}
	}
	if err != nil {
		logger.Error("Error getting calendar", err)
		return &operations.GetPublicCalendarIDInternalServerError{}
	}

	return middleware.ResponderFunc(func(w http.ResponseWriter, p runtime.Producer) {
		w.Write([]byte(calendarString))
	})
})

func getAvailability(availabilities []database.Availability) *dto2.AvailabilityDTO {
	if len(availabilities) > 0 {
		return conv.Pointer(mapAvailabilityDTO(availabilities[0]))
	}
	return nil
}

func MapRoles(roles []database.Role, event database.Event, userId uuid.UUID) []*dto2.ScheduleEventDTORolesItems0 {
	arr := []*dto2.ScheduleEventDTORolesItems0{}

	// Get base roles, check if role is covered, check if role is shadowed
	for _, role := range roles {
		arr = append(arr, getBaseRole(role, event, userId))
	}

	// Add assignments
	arr = append(arr, getAssignmentsAndCovers(event, userId)...)

	// Add any shadows
	arr = append(arr, getRolesUserIsShadowing(event.Shadows, userId)...)

	return arr
}

func getBaseRole(role database.Role, event database.Event, userId uuid.UUID) *dto2.ScheduleEventDTORolesItems0 {
	baseRole := dto2.ScheduleEventDTORolesItems0{
		CoveredBy:  nil,
		Covering:   nil,
		ID:         conv.UintToInt64(role.ID),
		Name:       conv.Pointer(role.Name),
		ShadowedBy: nil,
		Shadowing:  nil,
		Type:       BASE_ROLE,
	}

	coverIdx := slices.IndexFunc(event.Assignments, func(assignment database.Assignment) bool {
		return assignment.RoleID == role.ID && userId != assignment.PersonID
	})
	if coverIdx >= 0 {
		baseRole.CoveredBy = conv.Pointer(people_domain_old.MapToPersonSummaryDTO(event.Assignments[coverIdx].Person))
	}

	addShadows(&baseRole, event, role.ID)

	return &baseRole
}

func getRolesUserIsShadowing(shadows []database.Shadow, userId uuid.UUID) []*dto2.ScheduleEventDTORolesItems0 {
	arr := []*dto2.ScheduleEventDTORolesItems0{}
	for _, shadow := range shadows {
		if shadow.PersonID == userId {
			role := dto2.ScheduleEventDTORolesItems0{
				ID:        conv.UintToInt64(shadow.RoleID),
				Name:      &shadow.Role.Name,
				Type:      SHADOWING,
				Shadowing: nil,
			}
			if shadow.Role.Person != nil {
				role.Shadowing = conv.Pointer(people_domain_old.MapToPersonSummaryDTO(*shadow.Role.Person))
			}
			arr = append(arr, conv.Pointer(role))
		}
	}
	return arr
}

func getAssignmentsAndCovers(event database.Event, userId uuid.UUID) []*dto2.ScheduleEventDTORolesItems0 {
	arr := []*dto2.ScheduleEventDTORolesItems0{}
	for _, assignment := range event.Assignments {
		if assignment.PersonID == userId {
			role := dto2.ScheduleEventDTORolesItems0{
				ID:       conv.UintToInt64(assignment.RoleID),
				Name:     conv.Pointer(assignment.Role.Name),
				Covering: nil,
				Type:     ASSIGNED,
			}

			if assignment.Role.Person != nil {
				role.Covering = conv.Pointer(people_domain_old.MapToPersonSummaryDTO(*assignment.Role.Person))
				role.Type = COVERING
			}

			addShadows(&role, event, assignment.RoleID)

			arr = append(arr, &role)
		}
	}
	return arr
}

func addShadows(role *dto2.ScheduleEventDTORolesItems0, event database.Event, roleId uint) {
	shadowsForRole := []*dto2.PersonSummaryDTO{}
	for _, s := range event.Shadows {
		if s.RoleID == roleId {
			shadowsForRole = append(shadowsForRole, conv.Pointer(people_domain_old.MapToPersonSummaryDTO(s.Person)))
		}
	}
	if len(shadowsForRole) > 0 {
		role.ShadowedBy = shadowsForRole
	}
}

func mapAssignmentsToEventRole(assignment database.Assignment) dto2.ScheduleEventDTORolesItems0 {
	return dto2.ScheduleEventDTORolesItems0{
		ID:   conv.UintToInt64(assignment.RoleID),
		Name: conv.Pointer(assignment.Role.Name),
	}
}
