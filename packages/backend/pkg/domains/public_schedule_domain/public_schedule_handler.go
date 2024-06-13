package public_schedule_domain

import (
	"showplanner.io/pkg/database"
	"showplanner.io/pkg/domains/schedule_domain"
	"showplanner.io/pkg/restapi/operations"

	"github.com/go-openapi/runtime/middleware"
)

var GetPublicScheduleHandler = operations.GetPublicScheduleHandlerFunc(func(params operations.GetPublicScheduleParams) middleware.Responder {

	show, err := database.GetShowBySlug(params.ShowSlug)

	if err != nil {
		return &operations.GetPublicScheduleInternalServerError{}
	}

	events, err := database.GetEvents(show.ID)

	if err != nil {
		return &operations.GetPublicScheduleInternalServerError{}
	}

	mappedEvents := mapEventsToPublicEventsDTO(events)

	schedule_domain.NameEventsWithCurtainsUp(mappedEvents)

	return &operations.GetPublicScheduleOK{
		Payload: &operations.GetPublicScheduleOKBody{
			ShowName: show.Name,
			Events:   mappedEvents,
		},
	}
})
