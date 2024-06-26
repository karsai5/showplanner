package showdoc

import (
	"errors"

	"github.com/go-openapi/runtime/middleware"
	"gorm.io/gorm"
	"showplanner.io/pkg/conv"
	"showplanner.io/pkg/database"
	"showplanner.io/pkg/logger"
	"showplanner.io/pkg/permissions"
	"showplanner.io/pkg/restapi/dtos"
	"showplanner.io/pkg/restapi/operations/showdocs"
)

var handlePostShowdocReports = showdocs.PostShowdocReportsIDHandlerFunc(func(params showdocs.PostShowdocReportsIDParams) middleware.Responder {
	logError := logger.CreateLogErrorFunc("Updating show report", &showdocs.PostShowdocReportsIDInternalServerError{})

	userId, err := permissions.GetUserId(params.HTTPRequest)
	if err != nil {
		return logError(&err)
	}

	showReport := mapShowReportToDatabase(*conv.StrfmtUUIDToUUID(&params.ID), userId, *params.Report)

	_, err = database.SaveShowReport(showReport)
	if err != nil {
		return logError(&err)
	}

	showReport, err = database.GetShowReport(showReport.ID)
	if err != nil {
		return logError(&err)
	}

	return &showdocs.PostShowdocReportsIDOK{
		Payload: conv.Pointer(showReport.MapToDTO()),
	}
})

var handleGetShowReports = showdocs.GetShowdocReportsHandlerFunc(func(params showdocs.GetShowdocReportsParams) middleware.Responder {
	logError := logger.CreateLogErrorFunc("Updating show report", &showdocs.GetShowdocReportsInternalServerError{})
	userId, err := permissions.GetUserId(params.HTTPRequest)
	if err != nil {
		return logError(&err)
	}

	showReports, err := database.GetShowReportsForUser(userId)
	if err != nil {
		return logError(&err)
	}

	return &showdocs.GetShowdocReportsOK{
		Payload: conv.MapArrayOfPointer(showReports, func(showReport database.ShowReport) dtos.ShowReportSummaryDTO {
			return showReport.MapToSummaryDTO()
		}),
	}
})

var handleGetShowReport = showdocs.GetShowdocReportsIDHandlerFunc(func(params showdocs.GetShowdocReportsIDParams) middleware.Responder {
	logError := logger.CreateLogErrorFunc("Updating show report", &showdocs.GetShowdocReportsIDInternalServerError{})

	showReport, err := database.GetShowReport(*conv.StrfmtUUIDToUUID(&params.ID))

	if errors.Is(err, gorm.ErrRecordNotFound) {
		return &showdocs.GetShowdocReportsIDNotFound{}
	}
	if err != nil {
		return logError(&err)
	}

	return &showdocs.GetShowdocReportsIDOK{
		Payload: conv.Pointer(showReport.MapToDTO()),
	}
})

var handleGetShowReportTEX = showdocs.GetShowdocReportsIDTexHandlerFunc(func(params showdocs.GetShowdocReportsIDTexParams) middleware.Responder {
	logError := logger.CreateLogErrorFunc("Getting show report PDF", &showdocs.GetShowdocReportsIDTexInternalServerError{})

	showReport, err := database.GetShowReport(*conv.StrfmtUUIDToUUID(&params.ID))

	if errors.Is(err, gorm.ErrRecordNotFound) {
		return &showdocs.GetShowdocReportsIDNotFound{}
	}
	if err != nil {
		return logError(&err)
	}

	texString, err := GetShowReportTEX(showReport)
	if err != nil {
		return logError(&err)
	}

	return &showdocs.GetShowdocReportsIDTexOK{
		Payload: &showdocs.GetShowdocReportsIDTexOKBody{
			Contents: texString,
		},
	}
})

var handleGetShowReportPDF = showdocs.GetShowdocReportsIDPdfHandlerFunc(func(params showdocs.GetShowdocReportsIDPdfParams) middleware.Responder {
	logError := logger.CreateLogErrorFunc("Getting show report PDF", &showdocs.GetShowdocReportsIDPdfInternalServerError{})

	showReport, err := database.GetShowReport(*conv.StrfmtUUIDToUUID(&params.ID))

	if errors.Is(err, gorm.ErrRecordNotFound) {
		return &showdocs.GetShowdocReportsIDNotFound{}
	}
	if err != nil {
		return logError(&err)
	}

	readclose, err := CreateShowReportPDF(showReport)
	if err != nil {
		return logError(&err)
	}

	return &showdocs.GetShowdocReportsIDPdfOK{
		Payload: readclose,
	}
})
