package showreports

import (
	"errors"

	"github.com/go-openapi/runtime/middleware"
	uuid "github.com/satori/go.uuid"
	"gorm.io/gorm"
	"showplanner.io/pkg/conv"
	"showplanner.io/pkg/database"
	"showplanner.io/pkg/logger"
	"showplanner.io/pkg/models"
	"showplanner.io/pkg/permissions"
	"showplanner.io/pkg/restapi/operations"
)

func SetupHandlers(api *operations.GoBackendAPI) {
	api.PostShowreportsIDHandler = handlePostShowreports
	api.GetShowreportsIDPdfHandler = handleGetShowReportPDF
	api.GetShowreportsIDHandler = handleGetShowReport
	api.GetShowreportsHandler = handleGetShowReports
	api.GetEventsIDShowreportHandler = handleGetEventsShowReport
}

var handlePostShowreports = operations.PostShowreportsIDHandlerFunc(func(params operations.PostShowreportsIDParams) middleware.Responder {
	logError := logger.CreateLogErrorFunc("Updating show report", &operations.PostShowreportsIDInternalServerError{})

	userId, err := permissions.GetUserId(params.HTTPRequest)
	if err != nil {
		return logError(&err)
	}

	showReport := mapShowReportToDatabase(*conv.StrfmtUUIDToUUID(&params.ID), userId, *params.Report)
	showReport, err = database.SaveShowReport(showReport)

	if err != nil {
		return logError(&err)
	}

	return &operations.PostShowreportsIDOK{
		Payload: conv.Pointer(mapShowReportToDTO(showReport)),
	}
})

var handleGetShowReports = operations.GetShowreportsHandlerFunc(func(params operations.GetShowreportsParams) middleware.Responder {
	logError := logger.CreateLogErrorFunc("Updating show report", &operations.GetShowreportsInternalServerError{})
	userId, err := permissions.GetUserId(params.HTTPRequest)
	if err != nil {
		return logError(&err)
	}

	showReports, err := database.GetShowReportsForUser(userId)
	if err != nil {
		return logError(&err)
	}

	return &operations.GetShowreportsOK{
		Payload: conv.MapArrayOfPointer(showReports, mapShowReportToSummaryDTO),
	}
})

var handleGetShowReport = operations.GetShowreportsIDHandlerFunc(func(params operations.GetShowreportsIDParams) middleware.Responder {
	logError := logger.CreateLogErrorFunc("Updating show report", &operations.GetShowreportsIDInternalServerError{})

	showReport, err := database.GetShowReport(*conv.StrfmtUUIDToUUID(&params.ID))

	if errors.Is(err, gorm.ErrRecordNotFound) {
		return &operations.GetShowreportsIDNotFound{}
	}
	if err != nil {
		return logError(&err)
	}

	return &operations.GetShowreportsIDOK{
		Payload: conv.Pointer(mapShowReportToDTO(showReport)),
	}
})

var handleGetShowReportPDF = operations.GetShowreportsIDPdfHandlerFunc(func(params operations.GetShowreportsIDPdfParams) middleware.Responder {
	logError := logger.CreateLogErrorFunc("Getting show report PDF", &operations.GetShowreportsIDPdfInternalServerError{})

	showReport, err := database.GetShowReport(*conv.StrfmtUUIDToUUID(&params.ID))

	if errors.Is(err, gorm.ErrRecordNotFound) {
		return &operations.GetShowreportsIDNotFound{}
	}
	if err != nil {
		return logError(&err)
	}

	readclose, err := CreateShowReport(showReport)

	return &operations.GetShowreportsIDPdfOK{
		Payload: readclose,
	}
})

var handleGetEventsShowReport = operations.GetEventsIDShowreportHandlerFunc(func(params operations.GetEventsIDShowreportParams) middleware.Responder {
	logError := logger.CreateLogErrorFunc("Getting show report for event", &operations.GetEventsIDShowreportInternalServerError{})

	e, err := database.GetEvent(uint(params.ID))

	if err != nil {
		return logError(&err)
	}

	hasPermission, err := permissions.AddEvents.HasPermission(e.ShowID, params.HTTPRequest)

	if err != nil {
		return logError(&err)
	}

	if !hasPermission {
		return &operations.GetEventsIDShowreportUnauthorized{}
	}

	sr, err := database.GetShowReportForEvent(e.ID)

	if err != nil {
		if errors.Is(err, gorm.ErrRecordNotFound) {
			sr.ID = uuid.NewV4()
			sr.EventID = &e.ID
		} else {
			return logError(&err)
		}
	}

	return &operations.GetEventsIDShowreportOK{
		Payload: &models.ShowReportForEvent{
			ShowReport: conv.Pointer(mapShowReportToDTO(sr)),
			Title:      sr.GetTitle(),
			Subtitle:   sr.GetSubtitle(),
		},
	}
})
