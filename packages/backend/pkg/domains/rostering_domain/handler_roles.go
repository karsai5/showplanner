package rostering_domain

import (
	"github.com/go-openapi/runtime/middleware"
	"showplanner.io/pkg/conv"
	"showplanner.io/pkg/database"
	"showplanner.io/pkg/logger"
	"showplanner.io/pkg/permissions"
	"showplanner.io/pkg/restapi/dtos"
	"showplanner.io/pkg/restapi/operations"
)

var handleDeleteRole = operations.DeleteRolesIDHandlerFunc(func(params operations.DeleteRolesIDParams) middleware.Responder {
	logError := logger.CreateLogErrorFunc("Updating role", &operations.DeleteRolesIDInternalServerError{})

	role, err := database.GetRole(uint(params.ID))
	if err != nil {
		return logError(&err)
	}

	hasPerm, err := permissions.Rostering.HasPermission(&permissions.SupertokensPermissionsHandler{}, params.HTTPRequest, role.ShowID)
	if err != nil {
		return logError(&err)
	}
	if !hasPerm {
		return &operations.DeleteRolesIDUnauthorized{}
	}

	err = database.DeleteRole(uint(params.ID))
	if err != nil {
		return logError(&err)
	}
	return &operations.DeleteRolesIDOK{}
})

var handleUpdateRole = operations.PutRolesIDHandlerFunc(func(params operations.PutRolesIDParams) middleware.Responder {
	logError := logger.CreateLogErrorFunc("Updating role", &operations.PutRolesIDInternalServerError{})

	role, err := database.GetRole(uint(params.ID))
	if err != nil {
		return logError(&err)
	}

	hasPerm, err := permissions.Rostering.HasPermission(&permissions.SupertokensPermissionsHandler{}, params.HTTPRequest, role.ShowID)
	if err != nil {
		return logError(&err)
	}
	if !hasPerm {
		return &operations.GetAvailabilitiesUnauthorized{}
	}

	role, err = database.UpdateRole(uint(params.ID), database.Role{
		Name:     params.RoleDetails.Name,
		PersonID: conv.StrfmtUUIDToUUID(params.RoleDetails.PersonID),
	})
	if err != nil {
		return logError(&err)
	}

	if role.PersonID != nil {
		person, err := database.GetPerson(*role.PersonID)
		if err != nil {
			return logError(&err)
		}
		role.Person = conv.Pointer(person)
	}

	return &operations.PutRolesIDOK{Payload: conv.Pointer(role.MapToDTO())}
})

var handleCreateRole = operations.PostRolesHandlerFunc(func(params operations.PostRolesParams) middleware.Responder {
	hasPerm, err := permissions.Rostering.HasPermission(&permissions.SupertokensPermissionsHandler{}, params.HTTPRequest, uint(params.RoleDetails.ShowID))
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

	return &operations.PostRolesOK{Payload: conv.Pointer(role.MapToDTO())}
})

var handleGetRoles = operations.GetRolesHandlerFunc(func(params operations.GetRolesParams) middleware.Responder {
	logError := logger.CreateLogErrorFunc("Getting roles", &operations.GetAvailabilitiesInternalServerError{})
	hasPerm, err := permissions.Rostering.HasPermission(&permissions.SupertokensPermissionsHandler{}, params.HTTPRequest, uint(params.ShowID))
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

	mappedRoles := conv.MapArrayOfPointer(roles, func(r database.Role) dtos.RoleDTO { return r.MapToDTO() })

	return &operations.GetRolesOK{
		Payload: mappedRoles,
	}
})
