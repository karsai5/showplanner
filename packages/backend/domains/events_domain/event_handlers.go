package events_domain

import (
	"go-backend/domains/permissions"
	"go-backend/models"
	"go-backend/restapi/operations"

	"github.com/go-openapi/runtime/middleware"
)

var PostEventsHandler = operations.PostEventsHandlerFunc(func(params operations.PostEventsParams, p *models.Principal) middleware.Responder {
	hasPermission, err := permissions.AddEvents.HasPermission(uint(*params.Event.ShowID), params.HTTPRequest)

	if err != nil {
		println("error", err.Error())
		return &operations.PostShowsInternalServerError{}
	}

	if !hasPermission {
		println("not authorized")
		return &operations.PostShowsInternalServerError{}
	}

	event, err := mapCreateEventDTOtoEvent((*models.CreateEventDTO)(params.Event))

	if err != nil {
		println("Error mapping event: " + err.Error())
		return &operations.PostShowsInternalServerError{}
	}

	event, err = CreateEvent(event)

	if err != nil {
		println("Error creating event: " + err.Error())
		return &operations.PostShowsInternalServerError{}
	}

	mappedEvents := mapEventToEventDTO(event)
	return &operations.PostEventsOK{
		Payload: &mappedEvents,
	}
})

var GetEventsHander = operations.GetEventsHandlerFunc(func(params operations.GetEventsParams, p *models.Principal) middleware.Responder {
	showId := uint(params.ShowID)

	hasPermission, err := permissions.AddEvents.HasPermission(showId, params.HTTPRequest)

	if err != nil {
		println("error", err.Error())
		return &operations.PostShowsInternalServerError{}
	}

	if !hasPermission {
		println("not authorized")
		return &operations.PostShowsInternalServerError{}
	}

	events, err := GetEvents(showId)
	if err != nil {
		return &operations.GetEventsInternalServerError{}
	}
	for _, event := range events {
		println(event.ID)
		println(event.Start.String())
	}
	return &operations.GetEventsOK{
		Payload: mapEventsToEventsDTO(events),
	}
})
