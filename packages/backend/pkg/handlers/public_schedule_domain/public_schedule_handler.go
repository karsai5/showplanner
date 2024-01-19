package public_schedule_domain

import (
	"showplanner.io/pkg/handlers/events_domain"
	"showplanner.io/pkg/handlers/shows_domain"
	"showplanner.io/pkg/restapi/operations"

	"github.com/go-openapi/runtime/middleware"
)

var GetPublicScheduleHandler = operations.GetPublicScheduleHandlerFunc(func(params operations.GetPublicScheduleParams) middleware.Responder {

	show, err := shows_domain.GetShowBySlug(params.ShowSlug)

	if err != nil {
		return &operations.GetPublicScheduleInternalServerError{}
	}

	events, err := events_domain.GetEvents(show.ID)

	if err != nil {
		return &operations.GetPublicScheduleInternalServerError{}
	}

	mappedEvents := mapEventsToPublicEventsDTO(events)

	events_domain.NameEventsWithCurtainsUp(mappedEvents)

	return &operations.GetPublicScheduleOK{
		Payload: &operations.GetPublicScheduleOKBody{
			ShowName: show.Name,
			Events:   mappedEvents,
		},
	}
})
