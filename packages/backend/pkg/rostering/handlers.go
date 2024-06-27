package rostering

import (
	"showplanner.io/pkg/restapi/operations"
)

func SetupHandlers(api *operations.GoBackendAPI) {
	api.RosteringGetRosteringShowsHandler = handleGetShows

	api.RosteringGetShowsShowSlugSummaryHandler = handleGetShowSummary
	api.RosteringPostRosteringShowsHandler = handlePostShow

	api.RosteringGetShowsShowIDInvitationsHandler = handleGetInviationsForShow

	api.RosteringPostInvitationsHandler = handlePostInvitation
	api.RosteringGetInvitationsHandler = handleGetInviationForPerson
}
