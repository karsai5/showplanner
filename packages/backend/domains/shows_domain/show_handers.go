package shows_domain

import (
	"go-backend/database"
	"go-backend/domains/permissions"
	"go-backend/models"
	"go-backend/restapi/operations"
	"net/http"
	"strings"

	"github.com/go-openapi/runtime/middleware"
)

var GetShowsHandler = operations.GetShowsHandlerFunc(func(params operations.GetShowsParams, principal *models.Principal) middleware.Responder {

	shows, err := GetAllShows()

	if err != nil {
		println("Error getting shows: " + err.Error())
		return &operations.PostShowsInternalServerError{}
	}

	return &operations.GetShowsOK{
		Payload: MapShows(getShowsWithPermission(shows, params.HTTPRequest)),
	}
})

func getShowsWithPermission(shows []database.Show, request *http.Request) []database.Show {
	showsWithPermission := []database.Show{}

	for _, show := range shows {
		hasPermission, err := permissions.ViewEvents.HasPermission(show.ID, request)

		if err != nil {
			println("Error getting permission", err.Error())
		}

		if hasPermission {
			showsWithPermission = append(showsWithPermission, show)
		}
	}

	return showsWithPermission
}

var GetShowsSlugSummaryHandler = operations.GetShowsShowSlugSummaryHandlerFunc(func(params operations.GetShowsShowSlugSummaryParams) middleware.Responder {
	show, err := GetShowBySlug(params.ShowSlug)
	if err != nil {
		println("Could not find show: " + err.Error())
		return &operations.GetShowsShowSlugSummaryNotFound{}
	}
	return &operations.GetShowsShowSlugSummaryOK{
		Payload: MapShowSummary(show),
	}
})

var PostShowsHandler = operations.PostShowsHandlerFunc(func(psp operations.PostShowsParams, principal *models.Principal) middleware.Responder {

	show, err := CreateShow(database.Show{
		Name:    *psp.Show.Name,
		Slug:    *psp.Show.Slug,
		Company: *psp.Show.Company,
	})

	if err != nil {
		code := "404"
		message := "Something went wrong"
		if strings.Contains(err.Error(), "UNIQUE constraint failed: shows.slug") {
			message = "Slug must be unique"
		}
		return &operations.PostShowsBadRequest{
			Payload: &models.Error{
				Code:    &code,
				Message: &message,
			},
		}
	}

	return &operations.PostShowsOK{
		Payload: MapShow(show),
	}
})
