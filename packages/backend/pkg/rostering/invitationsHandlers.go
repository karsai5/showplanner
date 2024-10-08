package rostering

import (
	"errors"
	"fmt"
	"log/slog"

	"showplanner.io/pkg/restapi/dtos"

	"github.com/go-openapi/runtime/middleware"
	"showplanner.io/pkg/conv"
	"showplanner.io/pkg/database"
	"showplanner.io/pkg/logger"
	"showplanner.io/pkg/permissions"
	"showplanner.io/pkg/restapi/operations/rostering"
)

var handleDeleteInviation = rostering.DeleteInvitationsIDHandlerFunc(func(params rostering.DeleteInvitationsIDParams) middleware.Responder {
	logError := logger.CreateLogErrorFunc("Deleting invitation", &rostering.DeleteInvitationsIDInternalServerError{})
	ph := permissions.SupertokensPermissionsHandler{}

	userId, err := ph.GetUserId(params.HTTPRequest)
	if err != nil {
		return logError(&err)
	}

	invitation, err := getInvitation(*conv.StrfmtUUIDToUUID(&params.ID))
	if err != nil {
		return logError(&err)
	}

	// Check user has permission to delete invitation
	if invitation.CreatedByID != userId {
		slog.Info(fmt.Sprintf("User %v does not have permission to delete invitation %v because it was created by %v", userId, invitation.ID, invitation.CreatedByID))
		return &rostering.DeleteInvitationsIDUnauthorized{}
	}

	err = deleteInvitation(invitation.ID)
	if err != nil {
		return logError(&err)
	}

	return &rostering.DeleteInvitationsIDOK{}
})

var handlePostInvitation = rostering.PostInvitationsHandlerFunc(func(params rostering.PostInvitationsParams) middleware.Responder {
	logError := logger.CreateLogErrorFunc("Sending invitations", &rostering.PostInvitationsInternalServerError{})
	ph := permissions.SupertokensPermissionsHandler{}

	hasPerm, err := permissions.AddPersonnel.HasPermission(&ph, params.HTTPRequest, uint(params.ShowID))
	if err != nil {
		return logError(&err)
	}
	if !hasPerm {
		return logError(conv.Pointer(errors.New("User does not have permission to send invitations")))
	}

	invitingUserId, err := ph.GetUserId(params.HTTPRequest)
	if err != nil {
		return logError(&err)
	}
	invitingPerson, err := database.GetPerson(invitingUserId)
	if err != nil {
		return logError(&err)
	}

	if params.Email == nil && params.PersonID == nil {
		return &rostering.PostInvitationsBadRequest{}
	}

	show, err := database.GetShowById(params.ShowID)
	if err != nil {
		return logError(&err)
	}

	inv := invitation{
		show:           show,
		invitingPerson: invitingPerson,
	}
	if params.Email != nil {
		inv.email = conv.Pointer(params.Email.String())
	}
	if params.PersonID != nil {
		personId := conv.StrfmtUUIDToUUID(params.PersonID)
		if personId == nil {
			return &rostering.PostInvitationsBadRequest{}
		}
		person, err := database.GetPerson(*personId)
		if err != nil {
			return logError(&err)
		}
		inv.invitedPerson = &person
	}

	err = invitePersonToShow(inv)
	if err != nil {
		return logError(&err)
	}

	return &rostering.PostInvitationsOK{}
})

var handleGetInviationsForShow = rostering.GetShowsShowIDInvitationsHandlerFunc(func(params rostering.GetShowsShowIDInvitationsParams) middleware.Responder {
	logError := logger.CreateLogErrorFunc("Getting invitations", &rostering.GetShowsShowIDInvitationsInternalServerError{})

	hasPerm, err := permissions.AddPersonnel.HasPermission(&permissions.SupertokensPermissionsHandler{}, params.HTTPRequest, uint(params.ShowID))
	if err != nil {
		return logError(&err)
	}
	if !hasPerm {
		return logError(conv.Pointer(errors.New("User does not have permission to view invitations for this show")))
	}

	invitations, err := getInvitationsForShow(uint(params.ShowID))
	if err != nil {
		return logError(&err)
	}

	mappedInvitations := conv.MapArrayOfPointer(invitations, func(i database.Invitation) dtos.InvitationDTO { return i.MapToInvitationDTO() })

	return &rostering.GetShowsShowIDInvitationsOK{
		Payload: mappedInvitations,
	}
})

var handleGetInviationForPerson = rostering.GetInvitationsHandlerFunc(func(params rostering.GetInvitationsParams) middleware.Responder {
	logError := logger.CreateLogErrorFunc("Getting invitations", &rostering.GetInvitationsInternalServerError{})
	ph := permissions.SupertokensPermissionsHandler{}

	userId, err := ph.GetUserId(params.HTTPRequest)
	if err != nil {
		return logError(&err)
	}

	invitations, err := getInvitationsForPerson(userId)
	if err != nil {
		return logError(&err)
	}

	return &rostering.GetInvitationsOK{
		Payload: conv.MapArrayOfPointer(invitations, func(i database.Invitation) dtos.InvitationDTO { return i.MapToInvitationDTO() }),
	}
})

var handleGetInvitationByID = rostering.GetInvitationsIDHandlerFunc(func(params rostering.GetInvitationsIDParams) middleware.Responder {
	logError := logger.CreateLogErrorFunc("Getting invitation", &rostering.GetInvitationsIDInternalServerError{})
	ph := permissions.SupertokensPermissionsHandler{}

	invitation, err := getInvitation(*conv.StrfmtUUIDToUUID(&params.ID))
	if err != nil {
		return logError(&err)
	}

	userId, err := ph.GetUserId(params.HTTPRequest)
	if err != nil {
		return logError(&err)
	}

	if *invitation.PersonID != userId {
		return &rostering.GetInvitationsIDUnauthorized{}
	}

	return &rostering.GetInvitationsIDOK{
		Payload: conv.Pointer(invitation.MapToInvitationDTO()),
	}
})

var handleAcceptInvitation = rostering.PostInvitationsIDAcceptHandlerFunc(func(params rostering.PostInvitationsIDAcceptParams) middleware.Responder {
	logError := logger.CreateLogErrorFunc("Accepting invitation", &rostering.PostInvitationsIDAcceptInternalServerError{})
	ph := permissions.SupertokensPermissionsHandler{}

	invitation, err := getInvitation(*conv.StrfmtUUIDToUUID(&params.ID))
	if err != nil {
		return logError(&err)
	}

	userId, err := ph.GetUserId(params.HTTPRequest)
	if err != nil {
		return logError(&err)
	}

	if *invitation.PersonID != userId {
		return &rostering.GetInvitationsIDUnauthorized{}
	}

	err = acceptInvitation(*conv.StrfmtUUIDToUUID(&params.ID))
	if err != nil {
		return logError(&err)
	}

	return &rostering.PostInvitationsIDAcceptOK{}
})

var handleNotifyInvitation = rostering.PostInvitationsIDNotifyHandlerFunc(func(params rostering.PostInvitationsIDNotifyParams) middleware.Responder {
	logError := logger.CreateLogErrorFunc("Notifying invitation", &rostering.PostInvitationsIDNotifyInternalServerError{})
	ph := permissions.SupertokensPermissionsHandler{}

	userId, err := ph.GetUserId(params.HTTPRequest)
	if err != nil {
		return logError(&err)
	}

	invitation, err := getInvitation(*conv.StrfmtUUIDToUUID(&params.ID))
	if err != nil {
		return logError(&err)
	}

	// Check user has permission to delete invitation
	if invitation.CreatedByID != userId {
		return &rostering.DeleteInvitationsIDUnauthorized{}
	}

	err = sendInvitationEmail(invitation.ID)
	if err != nil {
		return logError(&err)
	}

	return rostering.NewPostInvitationsIDNotifyOK()
})
