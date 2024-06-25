package people_domain_old

import "showplanner.io/pkg/restapi/operations"

func SetupHandlers(api *operations.GoBackendAPI) {

	api.PostInvitationsHandler = postInvitationsHandler
	api.GetInvitationsHandler = getInvitationsHandler

	api.GetPersonnelAssignedGoogleContactsCSVHandler = handleAssignablePersonnelGoogle
	api.GetPersonnelAssignableHandler = handleAssignablePersonnel
	api.PostPersonnelAssignHandler = handleAddPersonToShow

	api.GetPersonnelAssignedHandler = handleAssignedPersonnel
}
