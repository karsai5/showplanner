package events_domain

import (
	"go-backend/pkg/permissions"
	"go-backend/pkg/restapi/operations"

	"github.com/go-openapi/runtime/middleware"
)

var CreateEventsHandler = operations.PostEventsHandlerFunc(func(params operations.PostEventsParams) middleware.Responder {
	hasPermission, err := permissions.AddEvents.HasPermission(uint(*params.Event.ShowID), params.HTTPRequest)

	if err != nil {
		println("error", err.Error())
		return &operations.PostShowsInternalServerError{}
	}

	if !hasPermission {
		println("not authorized")
		return &operations.PostShowsInternalServerError{}
	}

	event := mapToDatabaseEvent(*params.Event)
	event, err = CreateEvent(event)

	if err != nil {
		println("Error creating event: " + err.Error())
		return &operations.PostShowsInternalServerError{}
	}

	mappedEvents := MapEventToEventDTO(event)

	return &operations.PostEventsOK{
		Payload: &mappedEvents,
	}
})

var UpdateEventsHandler = operations.PostEventsIDHandlerFunc(func(params operations.PostEventsIDParams) middleware.Responder {
	existingEvent, err := GetEvent(uint(params.ID))

	if err != nil {
		return &operations.PostShowsInternalServerError{}
	}

	hasPermission, err := permissions.AddEvents.HasPermission(existingEvent.ShowID, params.HTTPRequest)

	if err != nil {
		println("error", err.Error())
		return &operations.PostShowsInternalServerError{}
	}

	if !hasPermission {
		println("not authorized")
		return &operations.PostShowsInternalServerError{}
	}

	event := mapToDatabaseEvent(*params.Event)
	event, err = UpdateEvent(existingEvent.ID, event)

	if err != nil {
		println("Error creating event: " + err.Error())
		return &operations.PostShowsInternalServerError{}
	}

	mappedEvents := MapEventToEventDTO(event)
	return &operations.PostEventsOK{
		Payload: &mappedEvents,
	}
})

var DeleteEventHandler = operations.DeleteEventsIDHandlerFunc(func(params operations.DeleteEventsIDParams) middleware.Responder {

	existingEvent, err := GetEvent(uint(params.ID))

	if err != nil {
		return &operations.DeleteEventsIDInternalServerError{}
	}

	hasPermission, err := permissions.AddEvents.HasPermission(existingEvent.ShowID, params.HTTPRequest)

	if err != nil {
		println("error", err.Error())
		return &operations.DeleteEventsIDInternalServerError{}
	}

	if !hasPermission {
		println("not authorized")
		return &operations.DeleteEventsIDInternalServerError{}
	}

	err = DeleteEvent(existingEvent.ID)

	if err != nil {
		return &operations.DeleteEventsIDInternalServerError{}
	}
	return &operations.DeleteEventsIDOK{}
})
