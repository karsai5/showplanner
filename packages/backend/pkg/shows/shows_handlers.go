package shows

import (
	"strconv"
	"strings"

	"showplanner.io/pkg/restapi/dtos"

	"showplanner.io/pkg/conv"
	"showplanner.io/pkg/database"
	"showplanner.io/pkg/domains/media_domain"
	"showplanner.io/pkg/logger"
	"showplanner.io/pkg/permissions"
	"showplanner.io/pkg/restapi/operations/rostering"

	"github.com/go-openapi/runtime/middleware"
)

var handleGetShows = rostering.GetRosteringShowsHandlerFunc(func(params rostering.GetRosteringShowsParams) middleware.Responder {
	logError := logger.CreateLogErrorFunc("Getting shows", &rostering.GetRosteringShowsInternalServerError{})
	ph := permissions.SupertokensPermissionsHandler{}

	userId, err := ph.GetUserId(params.HTTPRequest)
	if err != nil {
		return logError(&err)
	}

	shows, err := database.GetShowsForUser(userId)

	if err != nil {
		return logError(&err)
	}

	mappedShows := conv.MapArrayOfPointer(shows, func(s database.Show) dtos.ShowDTO { return s.MapToDTO() })

	for _, show := range mappedShows {
		if show.Image != nil {
			err := media_domain.AddSignedURL(show.Image)
			if err != nil {
				return logError(&err)
			}
		}
	}

	return &rostering.GetRosteringShowsOK{
		Payload: mappedShows,
	}
})

var handleGetShowSummary = rostering.GetShowsShowSlugSummaryHandlerFunc(func(params rostering.GetShowsShowSlugSummaryParams) middleware.Responder {
	show, err := database.GetShowBySlug(params.ShowSlug)
	if err != nil {
		println("Could not find show: " + err.Error())
		return &rostering.GetShowsShowSlugSummaryNotFound{}
	}

	hasPermission, err := permissions.ViewEvents.HasPermission(&permissions.SupertokensPermissionsHandler{}, params.HTTPRequest, show.ID)

	if err != nil {
		println("Error getting permission: " + err.Error())
		return &rostering.GetShowsShowSlugSummaryInternalServerError{}
	}

	if !hasPermission {
		return &rostering.GetShowsShowSlugSummaryUnauthorized{}
	}

	return &rostering.GetShowsShowSlugSummaryOK{
		Payload: conv.Pointer(show.MapToSummaryDTO()),
	}
})

var handlePostShow = rostering.PostRosteringShowsHandlerFunc(func(psp rostering.PostRosteringShowsParams) middleware.Responder {
	ph := permissions.SupertokensPermissionsHandler{}
	userId, err := ph.GetUserId(psp.HTTPRequest)
	if err != nil {
		return &rostering.PostRosteringShowsInternalServerError{}
	}

	hasPermission, err := permissions.AddShow.HasPermission(&permissions.SupertokensPermissionsHandler{}, psp.HTTPRequest)

	if err != nil {
		return &rostering.PostRosteringShowsInternalServerError{}
	}

	if !hasPermission {
		return &rostering.PostRosteringShowsUnauthorized{}
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
		message := "Something went wrong"
		if strings.Contains(err.Error(), "UNIQUE constraint failed: shows.slug") {
			message = "Slug must be unique"
		}
		return &rostering.PostRosteringShowsBadRequest{
			Payload: &dtos.Error{
				Message: message,
			},
		}
	}

	showIdString := strconv.FormatUint(uint64(show.ID), 10)
	for _, role := range permissions.ShowRoles {
		role.Initialise(showIdString)
	}

	err = AddPersonToShow(int64(show.ID), userId)
	if err != nil {
		logger.Error("Could not add person to show", err)
		return &rostering.PostRosteringShowsInternalServerError{}
	}

	err = permissions.AddManagerToShow(showIdString, userId)
	if err != nil {
		logger.Error("Could not add manager to show", err)
		return &rostering.PostRosteringShowsInternalServerError{}
	}

	return &rostering.PostRosteringShowsOK{
		Payload: conv.Pointer(show.MapToDTO()),
	}
})
