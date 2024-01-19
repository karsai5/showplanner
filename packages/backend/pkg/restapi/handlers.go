package restapi

import (
	"showplanner.io/pkg/handlers/availabilities_domain"
	"showplanner.io/pkg/handlers/events_domain"
	"showplanner.io/pkg/handlers/healthcheck"
	"showplanner.io/pkg/handlers/public_schedule_domain"
	"showplanner.io/pkg/handlers/schedule_domain"
	"showplanner.io/pkg/handlers/shows_domain"
	"showplanner.io/pkg/restapi/operations"
)

func getHandlers(api *operations.GoBackendAPI) {
	api.GetPublicHealthHandler = healthcheck.HealthCheckHander

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
