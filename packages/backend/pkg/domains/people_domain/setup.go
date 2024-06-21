package people_domain

import "showplanner.io/pkg/restapi/operations"

func SetupHandlers(api *operations.GoBackendAPI) {
	api.PostMeHandler = postMeHandler
	api.GetMeHandler = getMeHandler
	api.GetPublicCalendarIDHandler = getPublicCalendarIDHandler
	api.PostImpersonateHandler = postImpersonateHandler

	api.PostInvitationsHandler = postInvitationsHandler
}
