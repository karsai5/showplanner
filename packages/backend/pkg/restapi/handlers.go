package restapi

import (
	"showplanner.io/pkg/domains/availabilities_domain"
	"showplanner.io/pkg/domains/events_domain"
	"showplanner.io/pkg/domains/healthcheck"
	"showplanner.io/pkg/domains/public_schedule_domain"
	"showplanner.io/pkg/domains/schedule_domain"
	"showplanner.io/pkg/domains/shows_domain"
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
