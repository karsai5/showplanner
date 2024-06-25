package shows_domain

import (
	"showplanner.io/pkg/domains/people_domain_old"
	"strconv"
	"strings"

	"showplanner.io/pkg/conv"
	"showplanner.io/pkg/database"
	"showplanner.io/pkg/domains/media_domain"
	"showplanner.io/pkg/logger"
	"showplanner.io/pkg/models"
	"showplanner.io/pkg/permissions"
	"showplanner.io/pkg/restapi/operations"

	"github.com/go-openapi/runtime/middleware"
)

var GetShowsHandler = operations.GetShowsHandlerFunc(func(params operations.GetShowsParams) middleware.Responder {
	logError := logger.CreateLogErrorFunc("Getting shows", &operations.GetShowsInternalServerError{})

	userId, err := permissions.GetUserId(params.HTTPRequest)
	if err != nil {
		return logError(&err)
	}

	shows, err := database.GetShowsForUser(userId)

	if err != nil {
		return logError(&err)
	}

	mappedShows := conv.MapArray(shows, MapShow)

	for _, show := range mappedShows {
		if show.Image != nil {
			err := media_domain.AddSignedURL(show.Image)
			if err != nil {
				return logError(&err)
			}
		}
	}

	return &operations.GetShowsOK{
		Payload: mappedShows,
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

	show := database.Show{
		Name:    *psp.Show.Name,
		Slug:    *psp.Show.Slug,
		Company: *psp.Show.Company,
		ImageID: nil,
	}
	if psp.Show.ImageID != 0 {
		show.ImageID = conv.Pointer(uint(psp.Show.ImageID))
	}

	show, err = database.CreateShow(show)

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

	showIdString := strconv.FormatUint(uint64(show.ID), 10)
	for _, role := range permissions.ShowRoles {
		role.Initialise(showIdString)
	}

	err = people_domain_old.AddToShow(int64(show.ID), userId)
	if err != nil {
		logger.Error("Could not add person to show", err)
		return &operations.PostShowsInternalServerError{}
	}

	err = permissions.AddManagerToShow(showIdString, userId)
	if err != nil {
		logger.Error("Could not add manager to show", err)
		return &operations.PostShowsInternalServerError{}
	}

	return &operations.PostShowsOK{
		Payload: MapShow(show),
	}
})
