package rostering

import (
	"errors"
	"showplanner.io/pkg/restapi/dtos"

	"github.com/go-openapi/runtime/middleware"
	"showplanner.io/pkg/conv"
	"showplanner.io/pkg/database"
	"showplanner.io/pkg/logger"
	"showplanner.io/pkg/permissions"
	"showplanner.io/pkg/restapi/operations/rostering"
)

var handlePostInvitation = rostering.PostInvitationsHandlerFunc(func(params rostering.PostInvitationsParams) middleware.Responder {
	logError := logger.CreateLogErrorFunc("Sending invitations", &rostering.PostInvitationsInternalServerError{})

	hasPerm, err := permissions.AddPersonnel.HasPermission(uint(params.ShowID), params.HTTPRequest)
	if err != nil {
		return logError(&err)
	}
	if !hasPerm {
		return logError(conv.Pointer(errors.New("User does not have permission to send invitations")))
	}

	personId := conv.StrfmtUUIDToUUID(params.PersonID)
	if personId == nil {
		return &rostering.PostInvitationsBadRequest{}
	}

	err = inviteExistingUserToShow(uint(params.ShowID), *personId)
	if err != nil {
		return logError(&err)
	}

	return &rostering.PostInvitationsOK{}
})

var handleGetInviationsForShow = rostering.GetShowsShowIDInvitationsHandlerFunc(func(params rostering.GetShowsShowIDInvitationsParams) middleware.Responder {
	logError := logger.CreateLogErrorFunc("Getting invitations", &rostering.GetShowsShowIDInvitationsInternalServerError{})

	hasPerm, err := permissions.AddPersonnel.HasPermission(uint(params.ShowID), params.HTTPRequest)
	if err != nil {
		return logError(&err)
	}
	if !hasPerm {
		return logError(conv.Pointer(errors.New("User does not have permission to view invitations for this show")))
	}

	invitations, err := getInvitations(uint(params.ShowID))
	if err != nil {
		return logError(&err)
	}

	mappedInvitations := conv.MapArrayOfPointer(invitations, func(i database.Invitation) dtos.InvitationDTO { return i.MapToInvitationDTO() })

	return &rostering.GetShowsShowIDInvitationsOK{
		Payload: mappedInvitations,
	}
})
