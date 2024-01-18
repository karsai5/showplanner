package public_schedule_domain

import (
	"go-backend/pkg/handlers/events_domain"
	"go-backend/pkg/handlers/shows_domain"
	"go-backend/pkg/restapi/operations"

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
