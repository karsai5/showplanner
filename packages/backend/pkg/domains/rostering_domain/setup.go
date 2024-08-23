package rostering_domain

import "showplanner.io/pkg/restapi/operations"

func SetupHandlers(api *operations.GoBackendAPI) {
	api.GetAvailabilitiesHandler = handleGetAvailabilities
	api.PostAvailabilitiesHandler = handleUpdateAvailability

	api.GetRolesHandler = handleGetRoles
	api.PostRolesHandler = handleCreateRole
	api.PutRolesIDHandler = handleUpdateRole
	api.DeleteRolesIDHandler = handleDeleteRole

	api.PostAssignmentHandler = handlePostAssignment
	api.DeleteAssignmentIDHandler = handleDeleteAssignment
	api.PutAssignmentIDHandler = handlePutAssignment

	api.PostShadowHandler = handlePostShadow
	api.DeleteShadowIDHandler = handleDeleteShadow
}
