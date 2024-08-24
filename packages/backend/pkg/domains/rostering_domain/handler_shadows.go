package rostering_domain

import (
	"github.com/go-openapi/runtime/middleware"
	"showplanner.io/pkg/conv"
	"showplanner.io/pkg/database"
	"showplanner.io/pkg/logger"
	"showplanner.io/pkg/permissions"
	"showplanner.io/pkg/restapi/operations"
)

var handlePostShadow = operations.PostShadowHandlerFunc(func(params operations.PostShadowParams) middleware.Responder {
	logError := logger.CreateLogErrorFunc("Creating shadow", &operations.PostAssignmentInternalServerError{})

	event, err := database.GetEvent(uint(*params.Shadow.EventID))
	if err != nil {
		return logError(&err)
	}

	hasPerm, err := permissions.Rostering.HasPermission(&permissions.SupertokensPermissionsHandler{}, params.HTTPRequest, event.ShowID)
	if err != nil {
		return logError(&err)
	}
	if !hasPerm {
		return &operations.PostShadowUnauthorized{}
	}

	_, err = database.CreateShadow(database.Shadow{
		PersonID: *conv.StrfmtUUIDToUUID(params.Shadow.PersonID),
		EventID:  event.ID,
		RoleID:   uint(*params.Shadow.RoleID),
	})

	if err != nil {
		return logError(&err)
	}

	return &operations.PostShadowOK{}
})

var handleDeleteShadow = operations.DeleteShadowIDHandlerFunc(func(params operations.DeleteShadowIDParams) middleware.Responder {
	logError := logger.CreateLogErrorFunc("Deleting shadow", &operations.DeleteShadowIDInternalServerError{})

	shadow, err := database.GetShadow(uint(params.ID))
	if err != nil {
		return logError(&err)
	}

	hasPerm, err := permissions.Rostering.HasPermission(&permissions.SupertokensPermissionsHandler{}, params.HTTPRequest, shadow.Event.ShowID)
	if err != nil {
		return logError(&err)
	}
	if !hasPerm {
		return &operations.DeleteShadowIDUnauthorized{}
	}

	err = database.DeleteShadow(uint(params.ID))
	if err != nil {
		return logError(&err)
	}

	return &operations.DeleteShadowIDOK{}
})
