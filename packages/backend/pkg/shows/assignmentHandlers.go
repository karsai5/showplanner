package shows

import (
	"github.com/go-openapi/runtime/middleware"
	"showplanner.io/pkg/conv"
	"showplanner.io/pkg/logger"
	"showplanner.io/pkg/permissions"
	"showplanner.io/pkg/restapi/dtos"
	"showplanner.io/pkg/restapi/operations/rostering"
	"showplanner.io/pkg/shows/people"
)

var handleUnasignPersonFromShow = rostering.PostShowsShowIDPeopleUnassignHandlerFunc(func(params rostering.PostShowsShowIDPeopleUnassignParams) middleware.Responder {
	logError := logger.CreateLogErrorFunc("Unassigning person from show", &rostering.PostShowsShowIDPeopleUnassignInternalServerError{})

	hasPerm, err := permissions.AddPersonnel.HasPermission(&permissions.SupertokensPermissionsHandler{}, params.HTTPRequest, uint(params.ShowID))
	if err != nil {
		return logError(&err)
	}

	if !hasPerm {
		return &rostering.PostShowsShowIDPeopleUnassignUnauthorized{
			Payload: &dtos.Error{
				Message: "User does not have permission to unassign person from show",
			},
		}
	}

	err = people.RemovePersonFromShow(uint(params.ShowID), *conv.StrfmtUUIDToUUID(&params.PersonID))
	if err != nil {
		return logError(&err)
	}

	return &rostering.PostShowsShowIDPeopleUnassignOK{}
})
