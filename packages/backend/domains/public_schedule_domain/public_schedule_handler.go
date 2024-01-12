package public_schedule_domain

import (
	"go-backend/domains/events_domain"
	"go-backend/domains/shows_domain"
	"go-backend/restapi/operations"

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

	return &operations.GetPublicScheduleOK{
		Payload: &operations.GetPublicScheduleOKBody{
			ShowName: show.Name,
			Events:   mapEventsToPublicEventsDTO(events),
		},
	}
})
