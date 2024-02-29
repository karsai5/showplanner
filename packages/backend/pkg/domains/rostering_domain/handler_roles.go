package rostering_domain

import (
	"github.com/go-openapi/runtime/middleware"
	"showplanner.io/pkg/convert"
	"showplanner.io/pkg/database"
	"showplanner.io/pkg/logger"
	"showplanner.io/pkg/permissions"
	"showplanner.io/pkg/restapi/operations"
)

var handleUpdateRole = operations.PutRolesIDHandlerFunc(func(params operations.PutRolesIDParams) middleware.Responder {
	logError := logger.CreateLogErrorFunc("Updating role", &operations.PutRolesIDInternalServerError{})
	role, err := database.GetRole(uint(params.ID))

	if err != nil {
		return logError(&err)
	}

	hasPerm, err := permissions.Rostering.HasPermission(role.ShowID, params.HTTPRequest)
	if err != nil {
		return logError(&err)
	}
	if !hasPerm {
		return &operations.GetAvailabilitiesUnauthorized{}
	}

	role, err = database.UpdateRole(uint(params.ID), database.Role{
		Name:     params.RoleDetails.Name,
		PersonID: convert.StrfmtUUIDToUUID(params.RoleDetails.PersonID),
	})

	if err != nil {
		return logError(&err)
	}

	if role.PersonID != nil {
		person, err := database.GetPerson(*role.PersonID)
		if err != nil {
			return logError(&err)
		}
		role.Person = convert.GetPointer(person)
	}

	return &operations.PutRolesIDOK{Payload: convert.GetPointer(mapToRoleDTO(role))}
})

var handleCreateRole = operations.PostRolesHandlerFunc(func(params operations.PostRolesParams) middleware.Responder {
	hasPerm, err := permissions.Rostering.HasPermission(uint(params.RoleDetails.ShowID), params.HTTPRequest)

	if err != nil {
		logger.Error("Creating role", err)
		return &operations.GetAvailabilitiesInternalServerError{}
	}
	if !hasPerm {
		return &operations.GetAvailabilitiesUnauthorized{}
	}

	role, err := database.CreateRole(database.Role{
		ShowID:   uint(params.RoleDetails.ShowID),
		PersonID: nil,
		Name:     params.RoleDetails.Name,
	})

	if err != nil {
		logger.Error("Creating role", err)
		return &operations.GetRolesInternalServerError{}
	}

	mappedRole := mapToRoleDTO(role)
	return &operations.PostRolesOK{Payload: &mappedRole}
})

var handleGetRoles = operations.GetRolesHandlerFunc(func(params operations.GetRolesParams) middleware.Responder {
	logError := logger.CreateLogErrorFunc("Getting roles", &operations.GetAvailabilitiesInternalServerError{})
	hasPerm, err := permissions.Rostering.HasPermission(uint(params.ShowID), params.HTTPRequest)

	if err != nil {
		return logError(&err)
	}
	if !hasPerm {
		return &operations.GetAvailabilitiesUnauthorized{}
	}

	roles, err := database.GetRolesForShow(uint(params.ShowID))

	if err != nil {
		return logError(&err)
	}

	mappedRoles := convert.MapArrayOfPointer(roles, mapToRoleDTO)

	return &operations.GetRolesOK{
		Payload: mappedRoles,
	}
})