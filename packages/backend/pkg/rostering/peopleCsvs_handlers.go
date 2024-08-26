package rostering

import (
	"github.com/go-openapi/runtime/middleware"
	"showplanner.io/pkg/database"
	"showplanner.io/pkg/logger"
	"showplanner.io/pkg/permissions"
	"showplanner.io/pkg/restapi/operations/shows"
)

func handleGetGoogleCSV(db database.IDatabase, ph permissions.IPermissionsHandler) shows.GetShowsShowIDPeopleCsvGoogleHandler {
	return shows.GetShowsShowIDPeopleCsvGoogleHandlerFunc(func(params shows.GetShowsShowIDPeopleCsvGoogleParams) middleware.Responder {
		logError := logger.CreateLogErrorFunc("Getting google CSV", &shows.GetShowsShowIDPeopleCsvGoogleInternalServerError{})

		hasPermViewPersonnel, err := permissions.ViewPersonnel.HasPermission(ph, params.HTTPRequest, uint(params.ShowID))
		if err != nil {
			return logError(&err)
		}
		hasPermViewPrivateInfo, err := permissions.ViewPrivatePersonnelDetails.HasPermission(ph, params.HTTPRequest, uint(params.ShowID))
		if err != nil {
			return logError(&err)
		}

		if !hasPermViewPersonnel || !hasPermViewPrivateInfo {
			return &shows.GetShowsShowIDPeopleCsvGoogleUnauthorized{}
		}

		people, err := database.GetPeopleAssignedToShow(uint(params.ShowID))
		if err != nil {
			return logError(&err)
		}

		show, err := database.GetShowById(params.ShowID)
		if err != nil {
			return logError(&err)
		}

		csvString, err := getGoogleCSV(people, show.Name)
		if err != nil {
			return logError(&err)
		}

		return &shows.GetShowsShowIDPeopleCsvGoogleOK{
			Payload: csvString,
		}
	})
}
