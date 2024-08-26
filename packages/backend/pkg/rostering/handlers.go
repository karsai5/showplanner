package rostering

import (
	"showplanner.io/pkg/database"
	"showplanner.io/pkg/permissions"
	"showplanner.io/pkg/restapi/operations"
)

func SetupHandlers(api *operations.GoBackendAPI) {
	db := database.Database{}
	ph := permissions.SupertokensPermissionsHandler{}

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
	api.ShowsGetShowsShowIDPeopleCsvGoogleHandler = handleGetGoogleCSV(&db, &ph)
	api.ShowsGetShowsShowIDPeopleCsvHandler = handleGetContactCSV(&db, &ph)

	api.ShowsGetShowsShowIDRosterHandler = handleGetRoster(&db, &ph)
	api.RosteringPostShowsShowIDRosterReleaseHandler = handleReleaseRoster(&db, &ph)
	api.RosteringPostShowsShowIDRosterUnreleaseHandler = handleUnreleaseRoster(&db, &ph)

	api.RosteringPostShowsShowIDRolesSetorderHandler = handleSetRolesOrder(&db, &ph)
}
