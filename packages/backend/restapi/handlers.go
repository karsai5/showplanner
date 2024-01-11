package restapi

import (
	"go-backend/domains/events_domain"
	"go-backend/domains/shows_domain"
	"go-backend/restapi/operations"
)

func getHandlers(api *operations.GoBackendAPI) {

	api.GetShowsHandler = shows_domain.GetShowsHandler
	api.GetShowsShowSlugSummaryHandler = shows_domain.GetShowsSlugSummaryHandler
	api.PostShowsHandler = shows_domain.PostShowsHandler

	api.GetEventsHandler = events_domain.GetEventsHander
	api.GetEventsPublicHandler = events_domain.GetEventsPublicHandler
	api.PostEventsHandler = events_domain.CreateEventHandler
	api.PostEventsIDHandler = events_domain.UpdateEventHandler
}
