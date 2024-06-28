package people_domain_old

import "showplanner.io/pkg/restapi/operations"

func SetupHandlers(api *operations.GoBackendAPI) {

	api.GetPersonnelAssignedGoogleContactsCSVHandler = handleAssignablePersonnelGoogle
	api.GetPersonnelAssignableHandler = handleAssignablePersonnel

	api.GetPersonnelAssignedHandler = handleAssignedPersonnel
}
