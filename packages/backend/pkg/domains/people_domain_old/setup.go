package people_domain_old

import "showplanner.io/pkg/restapi/operations"

func SetupHandlers(api *operations.GoBackendAPI) {
	api.GetPersonnelAssignedHandler = handleAssignedPersonnel
}
