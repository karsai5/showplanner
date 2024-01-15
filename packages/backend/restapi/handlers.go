package restapi

import (
	"go-backend/domains/availabilities_domain"
	"go-backend/domains/events_domain"
	"go-backend/domains/public_schedule_domain"
	"go-backend/domains/schedule_domain"
	"go-backend/domains/shows_domain"
	"go-backend/restapi/operations"
)

func getHandlers(api *operations.GoBackendAPI) {

	api.GetShowsHandler = shows_domain.GetShowsHandler
	api.GetShowsShowSlugSummaryHandler = shows_domain.GetShowsSlugSummaryHandler
	api.PostShowsHandler = shows_domain.PostShowsHandler

	api.PostEventsHandler = events_domain.CreateEventsHandler
	api.PostEventsIDHandler = events_domain.UpdateEventsHandler
	api.DeleteEventsIDHandler = events_domain.DeleteEventHandler

	api.GetScheduleHandler = schedule_domain.GetScheduleHandler
	api.GetPublicScheduleHandler = public_schedule_domain.GetPublicScheduleHandler

	api.PostAvailabilitiesHandler = availabilities_domain.HandleUpdateAvailability
}
