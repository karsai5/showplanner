package rostering_domain

import "showplanner.io/pkg/restapi/operations"

func SetupHandlers(api *operations.GoBackendAPI) {
	api.GetAvailabilitiesHandler = handleGetAvailabilities
	api.PostAvailabilitiesHandler = handleUpdateAvailability

	api.GetRolesHandler = handleGetRoles
	api.PostRolesHandler = handleCreateRole
	api.PutRolesIDHandler = handleUpdateRole

	api.GetRosterHandler = handleGetRoster
}
