package restapi

import (
	"go-backend/pkg/handlers/availabilities_domain"
	"go-backend/pkg/handlers/events_domain"
	"go-backend/pkg/handlers/healthcheck"
	"go-backend/pkg/handlers/public_schedule_domain"
	"go-backend/pkg/handlers/schedule_domain"
	"go-backend/pkg/handlers/shows_domain"
	"go-backend/pkg/restapi/operations"
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
