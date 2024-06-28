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

	invitingUserId, err := permissions.GetUserId(params.HTTPRequest)
	if err != nil {
		return logError(&err)
	}
	invitingPerson, err := database.GetPerson(invitingUserId)
	if err != nil {
		return logError(&err)
	}

	personId := conv.StrfmtUUIDToUUID(params.PersonID)
	if personId == nil {
		return &rostering.PostInvitationsBadRequest{}
	}
	person, err := database.GetPerson(*personId)
	if err != nil {
		return logError(&err)
	}

	show, err := database.GetShowById(params.ShowID)
	if err != nil {
		return logError(&err)
	}

	err = invitePersonToShow(person, show, invitingPerson)
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

	userId, err := permissions.GetUserId(params.HTTPRequest)
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

	invitation, err := getInvitation(*conv.StrfmtUUIDToUUID(&params.ID))
	if err != nil {
		return logError(&err)
	}

	userId, err := permissions.GetUserId(params.HTTPRequest)
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

	invitation, err := getInvitation(*conv.StrfmtUUIDToUUID(&params.ID))
	if err != nil {
		return logError(&err)
	}

	userId, err := permissions.GetUserId(params.HTTPRequest)
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
