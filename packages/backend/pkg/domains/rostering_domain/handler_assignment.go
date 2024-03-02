package rostering_domain

import (
	"github.com/go-openapi/runtime/middleware"
	"showplanner.io/pkg/conv"
	"showplanner.io/pkg/database"
	"showplanner.io/pkg/logger"
	"showplanner.io/pkg/permissions"
	"showplanner.io/pkg/restapi/operations"
)

var handlePostAssignment = operations.PostAssignmentHandlerFunc(func(params operations.PostAssignmentParams) middleware.Responder {
	logError := logger.CreateLogErrorFunc("Getting roster", &operations.PostAssignmentInternalServerError{})

	event, err := database.GetEvent(uint(*params.Assignment.EventID))
	if err != nil {
		return logError(&err)
	}

	hasPerm, err := permissions.Rostering.HasPermission(event.ShowID, params.HTTPRequest)
	if err != nil {
		return logError(&err)
	}
	if !hasPerm {
		return &operations.GetAvailabilitiesUnauthorized{}
	}

	assignment, err := database.CreateAssignment(database.Assignment{
		PersonID: *conv.StrfmtUUIDToUUID(params.Assignment.PersonID),
		EventID:  event.ID,
		RoleID:   uint(*params.Assignment.RoleID),
	})

	if err != nil {
		return logError(&err)
	}

	return &operations.PostAssignmentOK{Payload: conv.Pointer(mapToAssignedDTO(assignment))}
})

var handlePutAssignment = operations.PutAssignmentIDHandlerFunc(func(params operations.PutAssignmentIDParams) middleware.Responder {
	logError := logger.CreateLogErrorFunc("Getting roster", &operations.PutAssignmentIDInternalServerError{})

	assignment, err := database.GetAssignment(uint(params.ID))
	if err != nil {
		return logError(&err)
	}

	hasPerm, err := permissions.Rostering.HasPermission(assignment.Event.ShowID, params.HTTPRequest)
	if err != nil {
		return logError(&err)
	}
	if !hasPerm {
		return &operations.PutAssignmentIDUnauthorized{}
	}

	assignment, err = database.UpdateAssignment(uint(params.ID), database.Assignment{
		PersonID: *conv.StrfmtUUIDToUUID(params.Assignment.PersonID),
	})

	if err != nil {
		return logError(&err)
	}

	return &operations.PostAssignmentOK{
		Payload: conv.Pointer(mapToAssignedDTO(assignment)),
	}
})

var handleDeleteAssignment = operations.DeleteAssignmentIDHandlerFunc(func(params operations.DeleteAssignmentIDParams) middleware.Responder {
	logError := logger.CreateLogErrorFunc("Getting roster", &operations.PutAssignmentIDInternalServerError{})

	assignment, err := database.GetAssignment(uint(params.ID))
	if err != nil {
		return logError(&err)
	}

	hasPerm, err := permissions.Rostering.HasPermission(assignment.Event.ShowID, params.HTTPRequest)
	if err != nil {
		return logError(&err)
	}
	if !hasPerm {
		return &operations.PutAssignmentIDUnauthorized{}
	}

	err = database.DeleteAssignment(uint(params.ID))
	if err != nil {
		return logError(&err)
	}

	return &operations.PutAssignmentIDOK{}
})
