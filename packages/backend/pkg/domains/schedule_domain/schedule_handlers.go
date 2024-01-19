package schedule_domain

import (
	"showplanner.io/pkg/database"
	"showplanner.io/pkg/domains/events_domain"
	"showplanner.io/pkg/models"
	"showplanner.io/pkg/permissions"
	"showplanner.io/pkg/restapi/operations"

	"github.com/go-openapi/runtime/middleware"
)

var GetScheduleHandler = operations.GetScheduleHandlerFunc(func(params operations.GetScheduleParams) middleware.Responder {
	showId := uint(params.ShowID)

	hasPermission, err := permissions.ViewEvents.HasPermission(showId, params.HTTPRequest)
	userId := permissions.UserId(params.HTTPRequest)

	if err != nil {
		println("error", err.Error())
		return &operations.GetScheduleInternalServerError{}
	}

	if !hasPermission {
		return &operations.GetScheduleUnauthorized{}
	}

	events, err := database.GetEventsWithAvailabilityForUser(showId, userId)

	if err != nil {
		return &operations.GetScheduleInternalServerError{}
	}

	scheduledEvents := []*models.ScheduleEventDTO{}

	for _, e := range events {
		scheduledEvent := models.ScheduleEventDTO{
			EventDTO: events_domain.MapEventToEventDTO(e),
		}

		if len(e.Availabilities) > 0 {
			availability := mapAvailabilityDTO(e.Availabilities[0])
			scheduledEvent.Availability = &availability
		}

		scheduledEvents = append(scheduledEvents, &scheduledEvent)
	}

	events_domain.NameEventsWithCurtainsUp(scheduledEvents)

	return &operations.GetScheduleOK{
		Payload: scheduledEvents,
	}
})
