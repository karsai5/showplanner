// This file is safe to edit. Once it exists it will not be overwritten

package restapi

import (
	"crypto/tls"
	"log"
	"regexp"
	"strings"
	"time"

	"github.com/go-openapi/errors"
	"github.com/go-openapi/runtime"
	"github.com/supertokens/supertokens-golang/recipe/session"

	"go-backend/domains/permissions"
	"go-backend/restapi/operations"
	"go-backend/utils"
	"net/http"

	"github.com/supertokens/supertokens-golang/supertokens"
)

func configureFlags(api *operations.GoBackendAPI) {
	// api.CommandLineOptionsGroups = []swag.CommandLineOptionsGroup{ ... }
}

func configureAPI(api *operations.GoBackendAPI) http.Handler {

	err := permissions.InitSupertokens()

	if err != nil {
		panic(err.Error())
	}

	initialiseRoles()

	api.ServeError = errors.ServeError

	api.UseSwaggerUI()

	api.JSONConsumer = runtime.JSONConsumer()

	api.JSONProducer = runtime.JSONProducer()

	getHandlers(api)

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
	return VerifiedEndpointHandler(handler)
}

func VerifiedEndpointHandler(handlerToWrap http.Handler) *VerifiedEndpoint {
	return &VerifiedEndpoint{handlerToWrap}
}

type VerifiedEndpoint struct {
	handler http.Handler
}

// ServeHTTP handles the request by passing it to the real
// handler and logging the request details
func (ve *VerifiedEndpoint) ServeHTTP(w http.ResponseWriter, r *http.Request) {
	start := time.Now()
	publicEndpoint, err := regexp.Match(`^/v1/public.*$`, []byte(r.URL.Path))
	if err != nil {
		panic("Error with regex: " + err.Error())
	}

	if !publicEndpoint {
		session.VerifySession(nil, ve.handler.ServeHTTP).ServeHTTP(w, r)
	} else {
		ve.handler.ServeHTTP(w, r)
	}

	log.Printf("%s %s %v", r.Method, r.URL.Path, time.Since(start))
}

// The middleware configuration happens before anything, this middleware also applies to serving the swagger.json document.
// So this is a good place to plug in a panic handling middleware, logging and metrics.
func setupGlobalMiddleware(handler http.Handler) http.Handler {
	// return handler
	return corsMiddleware(supertokens.Middleware(handler))
}

func corsMiddleware(next http.Handler) http.Handler {
	return http.HandlerFunc(func(writer http.ResponseWriter, r *http.Request) {
		writer.Header().Set("Access-Control-Allow-Origin", utils.GetEnvVariable("FRONTEND_URL", true))
		writer.Header().Set("Access-Control-Allow-Credentials", "true")
		if r.Method == "OPTIONS" {
			// we add content-type + other headers used by SuperTokens
			writer.Header().Set("Access-Control-Allow-Headers",
				strings.Join(append([]string{"Content-Type"},
					supertokens.GetAllCORSHeaders()...), ","))
			writer.Header().Set("Access-Control-Allow-Methods", "*")
			writer.Write([]byte(""))
		} else {
			next.ServeHTTP(writer, r)
		}
	})
}
