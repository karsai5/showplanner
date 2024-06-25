package people_domain

import "showplanner.io/pkg/restapi/operations"

func SetupHandlers(api *operations.GoBackendAPI) {
	api.PostMeHandler = postMeHandler
	api.GetMeHandler = getMeHandler
	api.PostImpersonateHandler = postImpersonateHandler

	api.PostInvitationsHandler = postInvitationsHandler
	api.GetInvitationsHandler = getInvitationsHandler

	api.GetPersonnelAssignedHandler = handleAssignedPersonnel
	api.GetPersonnelAssignedGoogleContactsCSVHandler = handleAssignablePersonnelGoogle
	api.GetPersonnelAssignableHandler = handleAssignablePersonnel
	api.PostPersonnelAssignHandler = handleAddPersonToShow
	api.GetPersonnelHandler = handleGetPersonnel
}
