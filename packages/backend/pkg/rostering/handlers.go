package rostering

import (
	"showplanner.io/pkg/database"
	"showplanner.io/pkg/restapi/operations"
)

func SetupHandlers(api *operations.GoBackendAPI) {
	db := database.Database{}
	api.RosteringGetRosteringShowsHandler = handleGetShows

	api.RosteringGetShowsShowSlugSummaryHandler = handleGetShowSummary
	api.RosteringPostRosteringShowsHandler = handlePostShow

	api.RosteringGetShowsShowIDInvitationsHandler = handleGetInviationsForShow

	api.RosteringPostInvitationsHandler = handlePostInvitation
	api.RosteringGetInvitationsHandler = handleGetInviationForPerson
	api.RosteringGetInvitationsIDHandler = handleGetInvitationByID
	api.RosteringPostInvitationsIDAcceptHandler = handleAcceptInvitation
	api.RosteringDeleteInvitationsIDHandler = handleDeleteInviation
	api.RosteringPostInvitationsIDNotifyHandler = handleNotifyInvitation

	api.RosteringPostShowsShowIDPeopleUnassignHandler = handleUnasignPersonFromShow

	api.RosteringPostShowsShowIDRosterReleaseHandler = handleReleaseRoster(&db)
	api.RosteringPostShowsShowIDRosterUnreleaseHandler = handleUnreleaseRoster(&db)
}
