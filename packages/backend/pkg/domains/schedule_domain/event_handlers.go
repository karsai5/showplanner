package schedule_domain

import (
	"showplanner.io/pkg/conv"
	"showplanner.io/pkg/database"
	"showplanner.io/pkg/logger"
	"showplanner.io/pkg/permissions"
	"showplanner.io/pkg/restapi/operations"

	"github.com/go-openapi/runtime/middleware"
)

var GetEventsHandler = operations.GetEventsIDHandlerFunc(func(params operations.GetEventsIDParams) middleware.Responder {
	logError := logger.CreateLogErrorFunc("Getting event", &operations.GetEventsIDInternalServerError{})

	existingEvent, err := database.GetEvent(uint(params.ID))

	if err != nil {
		return logError(&err)
	}

	hasPermission, err := permissions.AddEvents.HasPermission(existingEvent.ShowID, params.HTTPRequest)
	if err != nil {
		return logError(&err)
	}

	if !hasPermission {
		return &operations.GetEventsIDUnauthorized{}
	}

	event, err := database.GetEvent(uint(*&params.ID))

	if err != nil {
		return logError(&err)
	}
	return &operations.GetEventsIDOK{
		Payload: conv.Pointer(event.MapToEventDTO()),
	}
})

var CreateEventHandler = operations.PostEventsHandlerFunc(func(params operations.PostEventsParams) middleware.Responder {
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
	event, err = database.CreateEvent(event)

	if err != nil {
		println("Error creating event: " + err.Error())
		return &operations.PostShowsInternalServerError{}
	}

	return &operations.PostEventsOK{
		Payload: conv.Pointer(event.MapToEventDTO()),
	}
})

var UpdateEventHandler = operations.PostEventsIDHandlerFunc(func(params operations.PostEventsIDParams) middleware.Responder {
	existingEvent, err := database.GetEvent(uint(params.ID))

	if err != nil {
		return &operations.PostShowsInternalServerError{}
	}

	hasPermission, err := permissions.AddEvents.HasPermission(existingEvent.ShowID, params.HTTPRequest)

	if err != nil {
		return &operations.PostShowsInternalServerError{}
	}

	if !hasPermission {
		return &operations.PostShowsInternalServerError{}
	}

	event := mapToDatabaseEvent(*params.Event)
	event, err = database.UpdateEvent(existingEvent.ID, event)

	if err != nil {
		return &operations.PostShowsInternalServerError{}
	}

	return &operations.PostEventsOK{
		Payload: conv.Pointer(event.MapToEventDTO()),
	}
})

var DeleteEventHandler = operations.DeleteEventsIDHandlerFunc(func(params operations.DeleteEventsIDParams) middleware.Responder {

	existingEvent, err := database.GetEvent(uint(params.ID))

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

	err = database.DeleteEvent(existingEvent.ID)

	if err != nil {
		return &operations.DeleteEventsIDInternalServerError{}
	}
	return &operations.DeleteEventsIDOK{}
})
