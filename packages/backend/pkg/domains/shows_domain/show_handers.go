package shows_domain

import (
	"strconv"
	"strings"

	"showplanner.io/pkg/database"
	"showplanner.io/pkg/logger"
	"showplanner.io/pkg/models"
	"showplanner.io/pkg/permissions"
	"showplanner.io/pkg/restapi/operations"

	"github.com/go-openapi/runtime/middleware"
)

var GetShowsHandler = operations.GetShowsHandlerFunc(func(params operations.GetShowsParams) middleware.Responder {
	userId, err := permissions.GetUserId(params.HTTPRequest)
	if err != nil {
		logger.Error("Could not get shows", err)
		return &operations.PostShowsInternalServerError{}
	}

	shows, err := database.GetShowsForUser(userId)

	if err != nil {
		logger.Error("Could not get shows", err)
		return &operations.PostShowsInternalServerError{}
	}

	return &operations.GetShowsOK{
		Payload: MapShows(shows),
	}
})

var GetShowsSlugSummaryHandler = operations.GetShowsShowSlugSummaryHandlerFunc(func(params operations.GetShowsShowSlugSummaryParams) middleware.Responder {
	show, err := database.GetShowBySlug(params.ShowSlug)
	if err != nil {
		println("Could not find show: " + err.Error())
		return &operations.GetShowsShowSlugSummaryNotFound{}
	}

	hasPermission, err := permissions.ViewEvents.HasPermission(show.ID, params.HTTPRequest)

	if err != nil {
		println("Error getting permission: " + err.Error())
		return &operations.GetShowsShowSlugSummaryInternalServerError{}
	}

	if !hasPermission {
		return &operations.GetShowsShowSlugSummaryUnauthorized{}
	}

	return &operations.GetShowsShowSlugSummaryOK{
		Payload: MapShowSummary(show),
	}
})

var PostShowsHandler = operations.PostShowsHandlerFunc(func(psp operations.PostShowsParams) middleware.Responder {

	userId, err := permissions.GetUserId(psp.HTTPRequest)
	if err != nil {
		return &operations.PostShowsInternalServerError{}
	}

	hasPermission, err := permissions.AddShow.HasPermission(psp.HTTPRequest)

	if err != nil {
		return &operations.PostShowsInternalServerError{}
	}

	if !hasPermission {
		return &operations.PostShowsUnauthorized{}
	}

	show, err := database.CreateShow(database.Show{
		Name:    *psp.Show.Name,
		Slug:    *psp.Show.Slug,
		Company: *psp.Show.Company,
	})

	if err != nil {
		code := "400"
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

	showId := strconv.FormatUint(uint64(show.ID), 10)
	for _, role := range permissions.ShowRoles {
		role.Initialise(showId)
	}

	err = permissions.AddToShow(showId, userId)
	if err != nil {
		logger.Error("Could not add person to show", err)
		return &operations.PostShowsInternalServerError{}
	}

	err = permissions.AddManagerToShow(showId, userId)
	if err != nil {
		logger.Error("Could not add manager to show", err)
		return &operations.PostShowsInternalServerError{}
	}

	return &operations.PostShowsOK{
		Payload: MapShow(show),
	}
})
