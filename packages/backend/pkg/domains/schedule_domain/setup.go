package schedule_domain

import "showplanner.io/pkg/restapi/operations"

func SetupHandlers(api *operations.GoBackendAPI) {
	api.GetEventsIDHandler = GetEventsHandler
	api.PostEventsHandler = CreateEventHandler
	api.PostEventsIDHandler = UpdateEventHandler
	api.DeleteEventsIDHandler = DeleteEventHandler

	api.GetScheduleHandler = GetScheduleHandler
	api.GetPublicCalendarIDHandler = getPublicCalendarIDHandler
}
