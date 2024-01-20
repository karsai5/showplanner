// This file is safe to edit. Once it exists it will not be overwritten

package restapi

import (
	"crypto/tls"

	"showplanner.io/pkg/domains/people"
	"showplanner.io/pkg/permissions"
	"showplanner.io/pkg/restapi/middleware"
	"showplanner.io/pkg/restapi/operations"
	"showplanner.io/pkg/utils"

	"github.com/go-openapi/errors"
	"github.com/go-openapi/runtime"

	"net/http"

	"github.com/supertokens/supertokens-golang/supertokens"
)

func configureFlags(api *operations.GoBackendAPI) {
	// api.CommandLineOptionsGroups = []swag.CommandLineOptionsGroup{ ... }
}

func configureAPI(api *operations.GoBackendAPI) http.Handler {

	initSentry()

	err := permissions.InitSupertokens()

	if err != nil {
		panic(err.Error())
	}

	initialiseRoles()

	api.ServeError = errors.ServeError

	if utils.IsDev() {
		api.UseSwaggerUI()
	}

	api.JSONConsumer = runtime.JSONConsumer()

	api.JSONProducer = runtime.JSONProducer()

	getHandlers(api)
	people.SetupHandlers(api)

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
	return middleware.VerifiedEndpointHandler(handler)
}

// The middleware configuration happens before anything, this middleware also applies to serving the swagger.json document.
// So this is a good place to plug in a panic handling middleware, logging and metrics.
func setupGlobalMiddleware(handler http.Handler) http.Handler {
	// return handler
	return middleware.LogsMiddleware(
		middleware.CorsMiddleware(
			supertokens.Middleware(handler)))
}