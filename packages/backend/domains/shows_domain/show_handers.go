package shows_domain

import (
	"go-backend/database"
	"go-backend/domains/permissions"
	"go-backend/models"
	"go-backend/restapi/operations"
	"strings"

	"github.com/go-openapi/runtime/middleware"
)

var GetShowsHandler = operations.GetShowsHandlerFunc(func(params operations.GetShowsParams, principal *models.Principal) middleware.Responder {
	hasPermission, err := permissions.ViewShow.HasPermission(params.HTTPRequest)

	if err != nil {
		println("error", err.Error())
		return &operations.PostShowsInternalServerError{}
	}

	if !hasPermission {
		println("not authorized")
		return &operations.PostShowsInternalServerError{}
	}

	shows, err := GetAllShows()

	if err != nil {
		println("Error getting shows: " + err.Error())
		return &operations.PostShowsInternalServerError{}
	}

	return &operations.GetShowsOK{
		Payload: MapShows(shows),
	}
})

var GetShowsSlugHandler = operations.GetShowsShowSlugHandlerFunc(func(gsssp operations.GetShowsShowSlugParams, p *models.Principal) middleware.Responder {
	show, err := GetShowBySlug(gsssp.ShowSlug)
	if err != nil {
		println("Could not find show: " + err.Error())
		return &operations.GetShowsShowSlugNotFound{}
	}
	return &operations.GetShowsShowSlugOK{
		Payload: MapShow(show),
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
