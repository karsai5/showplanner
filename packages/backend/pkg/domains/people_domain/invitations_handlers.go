package people_domain

import (
	"errors"

	"github.com/go-openapi/runtime/middleware"
	"showplanner.io/pkg/conv"
	"showplanner.io/pkg/logger"
	"showplanner.io/pkg/permissions"
	"showplanner.io/pkg/restapi/operations"
)

var postInvitationsHandler = operations.PostInvitationsHandlerFunc(func(params operations.PostInvitationsParams) middleware.Responder {
	logError := logger.CreateLogErrorFunc("Sending invitations", &operations.PostInvitationsInternalServerError{})

	hasPerm, err := permissions.AddPersonnel.HasPermission(uint(params.ShowID), params.HTTPRequest)
	if err != nil {
		return logError(&err)
	}
	if !hasPerm {
		return logError(conv.Pointer(errors.New("User does not have permission to send invitations")))
	}

	personId := conv.StrfmtUUIDToUUID(params.PersonID)
	if personId == nil {
		return &operations.PostInvitationsBadRequest{}
	}

	err = inviteExistingUserToShow(uint(params.ShowID), *personId)
	if err != nil {
		return logError(&err)
	}

	return &operations.PostInvitationsOK{}
})
