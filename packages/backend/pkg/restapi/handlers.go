package restapi

import (
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

	api.PostEventsHandler = schedule_domain.CreateEventHandler
	api.PostEventsIDHandler = schedule_domain.UpdateEventHandler
	api.DeleteEventsIDHandler = schedule_domain.DeleteEventHandler

	api.GetScheduleHandler = schedule_domain.GetScheduleHandler
	api.GetPublicScheduleHandler = public_schedule_domain.GetPublicScheduleHandler
}
