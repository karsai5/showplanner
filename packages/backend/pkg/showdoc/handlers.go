package showdoc

import "showplanner.io/pkg/restapi/operations"

func SetupHandlers(api *operations.GoBackendAPI) {
	api.ShowdocsGetShowdocTimersHandler = handleGetShowTimers
	api.ShowdocsPostShowdocTimersIDHandler = handlePostShowdocTimers
	api.ShowdocsGetShowdocTimersIDHandler = handleGetShowTimer

	api.ShowdocsPostShowdocReportsIDHandler = handlePostShowdocReports
	api.ShowdocsGetShowdocReportsIDPdfHandler = handleGetShowReportPDF
	api.ShowdocsGetShowdocReportsIDTexHandler = handleGetShowReportTEX
	api.ShowdocsGetShowdocReportsIDHandler = handleGetShowReport
	api.ShowdocsGetShowdocReportsHandler = handleGetShowReports
}
