// This file is safe to edit. Once it exists it will not be overwritten

package restapi

import (
	"crypto/tls"
	"net/http"

	"github.com/go-openapi/errors"
	"github.com/go-openapi/runtime"
	"github.com/go-openapi/runtime/middleware"

	"go-backend/pkg/restapi/operations"
)

//go:generate swagger generate server --target ../../../backend --name GoBackend --spec ../../openapi.yaml --model-package pkg/models --server-package pkg/restapi --principal models.Principal

func configureFlags(api *operations.GoBackendAPI) {
	// api.CommandLineOptionsGroups = []swag.CommandLineOptionsGroup{ ... }
}

func configureAPI(api *operations.GoBackendAPI) http.Handler {
	// configure the api here
	api.ServeError = errors.ServeError

	// Set your custom logger if needed. Default one is log.Printf
	// Expected interface func(string, ...interface{})
	//
	// Example:
	// api.Logger = log.Printf

	api.UseSwaggerUI()
	// To continue using redoc as your UI, uncomment the following line
	// api.UseRedoc()

	api.JSONConsumer = runtime.JSONConsumer()

	api.JSONProducer = runtime.JSONProducer()

	if api.DeleteEventsIDHandler == nil {
		api.DeleteEventsIDHandler = operations.DeleteEventsIDHandlerFunc(func(params operations.DeleteEventsIDParams) middleware.Responder {
			return middleware.NotImplemented("operation operations.DeleteEventsID has not yet been implemented")
		})
	}
	if api.GetPublicHealthHandler == nil {
		api.GetPublicHealthHandler = operations.GetPublicHealthHandlerFunc(func(params operations.GetPublicHealthParams) middleware.Responder {
			return middleware.NotImplemented("operation operations.GetPublicHealth has not yet been implemented")
		})
	}
	if api.GetPublicScheduleHandler == nil {
		api.GetPublicScheduleHandler = operations.GetPublicScheduleHandlerFunc(func(params operations.GetPublicScheduleParams) middleware.Responder {
			return middleware.NotImplemented("operation operations.GetPublicSchedule has not yet been implemented")
		})
	}
	if api.GetScheduleHandler == nil {
		api.GetScheduleHandler = operations.GetScheduleHandlerFunc(func(params operations.GetScheduleParams) middleware.Responder {
			return middleware.NotImplemented("operation operations.GetSchedule has not yet been implemented")
		})
	}
	if api.GetShowsHandler == nil {
		api.GetShowsHandler = operations.GetShowsHandlerFunc(func(params operations.GetShowsParams) middleware.Responder {
			return middleware.NotImplemented("operation operations.GetShows has not yet been implemented")
		})
	}
	if api.GetShowsShowSlugSummaryHandler == nil {
		api.GetShowsShowSlugSummaryHandler = operations.GetShowsShowSlugSummaryHandlerFunc(func(params operations.GetShowsShowSlugSummaryParams) middleware.Responder {
			return middleware.NotImplemented("operation operations.GetShowsShowSlugSummary has not yet been implemented")
		})
	}
	if api.PostAvailabilitiesHandler == nil {
		api.PostAvailabilitiesHandler = operations.PostAvailabilitiesHandlerFunc(func(params operations.PostAvailabilitiesParams) middleware.Responder {
			return middleware.NotImplemented("operation operations.PostAvailabilities has not yet been implemented")
		})
	}
	if api.PostEventsHandler == nil {
		api.PostEventsHandler = operations.PostEventsHandlerFunc(func(params operations.PostEventsParams) middleware.Responder {
			return middleware.NotImplemented("operation operations.PostEvents has not yet been implemented")
		})
	}
	if api.PostEventsIDHandler == nil {
		api.PostEventsIDHandler = operations.PostEventsIDHandlerFunc(func(params operations.PostEventsIDParams) middleware.Responder {
			return middleware.NotImplemented("operation operations.PostEventsID has not yet been implemented")
		})
	}
	if api.PostShowsHandler == nil {
		api.PostShowsHandler = operations.PostShowsHandlerFunc(func(params operations.PostShowsParams) middleware.Responder {
			return middleware.NotImplemented("operation operations.PostShows has not yet been implemented")
		})
	}

	api.PreServerShutdown = func() {}

	api.ServerShutdown = func() {}

	return setupGlobalMiddleware(api.Serve(setupMiddlewares))
}

// The TLS configuration before HTTPS server starts.
func configureTLS(tlsConfig *tls.Config) {
	// Make all necessary changes to the TLS configuration here.
}

// As soon as server is initialized but not run yet, this function will be called.
// If you need to modify a config, store server instance to stop it individually later, this is the place.
// This function can be called multiple times, depending on the number of serving schemes.
// scheme value will be set accordingly: "http", "https" or "unix".
func configureServer(s *http.Server, scheme, addr string) {
}

// The middleware configuration is for the handler executors. These do not apply to the swagger.json document.
// The middleware executes after routing but before authentication, binding and validation.
func setupMiddlewares(handler http.Handler) http.Handler {
	return handler
}

// The middleware configuration happens before anything, this middleware also applies to serving the swagger.json document.
// So this is a good place to plug in a panic handling middleware, logging and metrics.
func setupGlobalMiddleware(handler http.Handler) http.Handler {
	return handler
}
