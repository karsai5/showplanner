package showdoc

import (
	"errors"

	"github.com/go-openapi/runtime/middleware"
	"gorm.io/gorm"
	"showplanner.io/pkg/conv"
	"showplanner.io/pkg/database"
	"showplanner.io/pkg/logger"
	"showplanner.io/pkg/restapi/dtos"
	"showplanner.io/pkg/restapi/operations/showdocs"
)

var handlePostShowdocTimers = showdocs.PostShowdocTimersIDHandlerFunc(func(params showdocs.PostShowdocTimersIDParams) middleware.Responder {
	logError := logger.CreateLogErrorFunc("Updating show timer", &showdocs.PostShowdocTimersIDInternalServerError{})

	userId, err := ph.GetUserId(params.HTTPRequest)

	if err != nil {
		return logError(&err)
	}

	showTimer := mapShowTimerToDatabase(*conv.StrfmtUUIDToUUID(&params.ID), userId, *params.Timer)
	showTimer, err = database.SaveShowTimer(showTimer)

	if err != nil {
		logError(&err)
	}

	return &showdocs.PostShowdocTimersIDOK{
		Payload: conv.Pointer(showTimer.MapToDTO()),
	}
})

var handleGetShowTimers = showdocs.GetShowdocTimersHandlerFunc(func(params showdocs.GetShowdocTimersParams) middleware.Responder {
	logError := logger.CreateLogErrorFunc("Getting show timers", &showdocs.GetShowdocTimersInternalServerError{})

	userId, err := ph.GetUserId(params.HTTPRequest)
	if err != nil {
		return logError(&err)
	}

	showTimers, err := database.GetShowTimersForUser(userId)
	if err != nil {
		return logError(&err)
	}

	return &showdocs.GetShowdocTimersOK{
		Payload: conv.MapArrayOfPointer(showTimers, func(showTimer database.ShowTimer) dtos.ShowTimerSummaryDTO {
			return showTimer.MapToSummaryDTO()
		}),
	}
})

var handleGetShowTimer = showdocs.GetShowdocTimersIDHandlerFunc(func(params showdocs.GetShowdocTimersIDParams) middleware.Responder {
	logError := logger.CreateLogErrorFunc("Getting show timer", &showdocs.GetShowdocTimersIDInternalServerError{})

	showTimer, err := database.GetShowTimer(*conv.StrfmtUUIDToUUID(&params.ID))

	if errors.Is(err, gorm.ErrRecordNotFound) {
		return &showdocs.GetShowdocTimersNotFound{}
	}
	if err != nil {
		return logError(&err)
	}

	return &showdocs.GetShowdocTimersIDOK{
		Payload: conv.Pointer(showTimer.MapToDTO()),
	}
})
