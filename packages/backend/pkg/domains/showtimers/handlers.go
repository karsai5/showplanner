package showtimers

import (
	"errors"

	"github.com/go-openapi/runtime/middleware"
	"gorm.io/gorm"
	"showplanner.io/pkg/conv"
	"showplanner.io/pkg/database"
	"showplanner.io/pkg/logger"
	"showplanner.io/pkg/permissions"
	"showplanner.io/pkg/restapi/operations"
)

func SetupHandlers(api *operations.GoBackendAPI) {
	api.PostShowtimersIDHandler = handlePostShowtimers
	api.GetShowtimersIDHandler = handleGetShowTimer
	api.GetShowtimersHandler = handleGetShowTimers
}

var handlePostShowtimers = operations.PostShowtimersIDHandlerFunc(func(params operations.PostShowtimersIDParams) middleware.Responder {
	logError := logger.CreateLogErrorFunc("Updating show timer", &operations.PostShowtimersIDInternalServerError{})

	userId, err := permissions.GetUserId(params.HTTPRequest)

	if err != nil {
		return logError(&err)
	}

	showTimer := mapShowTimerToDatabase(*conv.StrfmtUUIDToUUID(&params.ID), userId, *params.Timer)
	showTimer, err = database.SaveShowTimer(showTimer)

	if err != nil {
		logError(&err)
	}

	return &operations.PostShowtimersIDOK{
		Payload: conv.Pointer(mapShowTimerToDTO(showTimer)),
	}
})

var handleGetShowTimers = operations.GetShowtimersHandlerFunc(func(params operations.GetShowtimersParams) middleware.Responder {
	logError := logger.CreateLogErrorFunc("Getting show timers", &operations.GetShowtimersInternalServerError{})

	userId, err := permissions.GetUserId(params.HTTPRequest)
	if err != nil {
		return logError(&err)
	}

	showTimers, err := database.GetShowTimersForUser(userId)
	if err != nil {
		return logError(&err)
	}

	return &operations.GetShowtimersOK{
		Payload: conv.MapArrayOfPointer(showTimers, mapShowTimerToSummaryDTO),
	}
})

var handleGetShowTimer = operations.GetShowtimersIDHandlerFunc(func(params operations.GetShowtimersIDParams) middleware.Responder {
	logError := logger.CreateLogErrorFunc("Getting show timer", &operations.GetShowtimersIDInternalServerError{})

	showTimer, err := database.GetShowTimer(*conv.StrfmtUUIDToUUID(&params.ID))

	if errors.Is(err, gorm.ErrRecordNotFound) {
		return &operations.GetShowreportsIDNotFound{}
	}
	if err != nil {
		return logError(&err)
	}

	return &operations.GetShowtimersIDOK{
		Payload: conv.Pointer(mapShowTimerToDTO(showTimer)),
	}
})
