// Code generated by go-swagger; DO NOT EDIT.

package operations

// This file was generated by the swagger tool.
// Editing this file might prove futile when you re-run the swagger generate command

import (
	"fmt"
	"io"
	"net/http"
	"strings"

	"github.com/go-openapi/errors"
	"github.com/go-openapi/loads"
	"github.com/go-openapi/runtime"
	"github.com/go-openapi/runtime/middleware"
	"github.com/go-openapi/runtime/security"
	"github.com/go-openapi/spec"
	"github.com/go-openapi/strfmt"
	"github.com/go-openapi/swag"
)

// NewGoBackendAPI creates a new GoBackend instance
func NewGoBackendAPI(spec *loads.Document) *GoBackendAPI {
	return &GoBackendAPI{
		handlers:            make(map[string]map[string]http.Handler),
		formats:             strfmt.Default,
		defaultConsumes:     "application/json",
		defaultProduces:     "application/json",
		customConsumers:     make(map[string]runtime.Consumer),
		customProducers:     make(map[string]runtime.Producer),
		PreServerShutdown:   func() {},
		ServerShutdown:      func() {},
		spec:                spec,
		useSwaggerUI:        false,
		ServeError:          errors.ServeError,
		BasicAuthenticator:  security.BasicAuth,
		APIKeyAuthenticator: security.APIKeyAuth,
		BearerAuthenticator: security.BearerAuth,

		JSONConsumer: runtime.JSONConsumer(),

		JSONProducer: runtime.JSONProducer(),
		TextCalendarProducer: runtime.ProducerFunc(func(w io.Writer, data interface{}) error {
			return errors.NotImplemented("textCalendar producer has not yet been implemented")
		}),

		DeleteEventsIDHandler: DeleteEventsIDHandlerFunc(func(params DeleteEventsIDParams) middleware.Responder {
			return middleware.NotImplemented("operation DeleteEventsID has not yet been implemented")
		}),
		GetAvailabilitiesHandler: GetAvailabilitiesHandlerFunc(func(params GetAvailabilitiesParams) middleware.Responder {
			return middleware.NotImplemented("operation GetAvailabilities has not yet been implemented")
		}),
		GetMeHandler: GetMeHandlerFunc(func(params GetMeParams) middleware.Responder {
			return middleware.NotImplemented("operation GetMe has not yet been implemented")
		}),
		GetPersonnelAssignableHandler: GetPersonnelAssignableHandlerFunc(func(params GetPersonnelAssignableParams) middleware.Responder {
			return middleware.NotImplemented("operation GetPersonnelAssignable has not yet been implemented")
		}),
		GetPersonnelAssignedHandler: GetPersonnelAssignedHandlerFunc(func(params GetPersonnelAssignedParams) middleware.Responder {
			return middleware.NotImplemented("operation GetPersonnelAssigned has not yet been implemented")
		}),
		GetPublicCalendarIDHandler: GetPublicCalendarIDHandlerFunc(func(params GetPublicCalendarIDParams) middleware.Responder {
			return middleware.NotImplemented("operation GetPublicCalendarID has not yet been implemented")
		}),
		GetPublicHealthHandler: GetPublicHealthHandlerFunc(func(params GetPublicHealthParams) middleware.Responder {
			return middleware.NotImplemented("operation GetPublicHealth has not yet been implemented")
		}),
		GetPublicScheduleHandler: GetPublicScheduleHandlerFunc(func(params GetPublicScheduleParams) middleware.Responder {
			return middleware.NotImplemented("operation GetPublicSchedule has not yet been implemented")
		}),
		GetRolesHandler: GetRolesHandlerFunc(func(params GetRolesParams) middleware.Responder {
			return middleware.NotImplemented("operation GetRoles has not yet been implemented")
		}),
		GetScheduleHandler: GetScheduleHandlerFunc(func(params GetScheduleParams) middleware.Responder {
			return middleware.NotImplemented("operation GetSchedule has not yet been implemented")
		}),
		GetShowsHandler: GetShowsHandlerFunc(func(params GetShowsParams) middleware.Responder {
			return middleware.NotImplemented("operation GetShows has not yet been implemented")
		}),
		GetShowsShowSlugSummaryHandler: GetShowsShowSlugSummaryHandlerFunc(func(params GetShowsShowSlugSummaryParams) middleware.Responder {
			return middleware.NotImplemented("operation GetShowsShowSlugSummary has not yet been implemented")
		}),
		PostAvailabilitiesHandler: PostAvailabilitiesHandlerFunc(func(params PostAvailabilitiesParams) middleware.Responder {
			return middleware.NotImplemented("operation PostAvailabilities has not yet been implemented")
		}),
		PostEventsHandler: PostEventsHandlerFunc(func(params PostEventsParams) middleware.Responder {
			return middleware.NotImplemented("operation PostEvents has not yet been implemented")
		}),
		PostEventsIDHandler: PostEventsIDHandlerFunc(func(params PostEventsIDParams) middleware.Responder {
			return middleware.NotImplemented("operation PostEventsID has not yet been implemented")
		}),
		PostMeHandler: PostMeHandlerFunc(func(params PostMeParams) middleware.Responder {
			return middleware.NotImplemented("operation PostMe has not yet been implemented")
		}),
		PostPersonnelAssignHandler: PostPersonnelAssignHandlerFunc(func(params PostPersonnelAssignParams) middleware.Responder {
			return middleware.NotImplemented("operation PostPersonnelAssign has not yet been implemented")
		}),
		PostRolesHandler: PostRolesHandlerFunc(func(params PostRolesParams) middleware.Responder {
			return middleware.NotImplemented("operation PostRoles has not yet been implemented")
		}),
		PostShowsHandler: PostShowsHandlerFunc(func(params PostShowsParams) middleware.Responder {
			return middleware.NotImplemented("operation PostShows has not yet been implemented")
		}),
		PutRolesIDHandler: PutRolesIDHandlerFunc(func(params PutRolesIDParams) middleware.Responder {
			return middleware.NotImplemented("operation PutRolesID has not yet been implemented")
		}),
	}
}

/*GoBackendAPI API description in Markdown. */
type GoBackendAPI struct {
	spec            *loads.Document
	context         *middleware.Context
	handlers        map[string]map[string]http.Handler
	formats         strfmt.Registry
	customConsumers map[string]runtime.Consumer
	customProducers map[string]runtime.Producer
	defaultConsumes string
	defaultProduces string
	Middleware      func(middleware.Builder) http.Handler
	useSwaggerUI    bool

	// BasicAuthenticator generates a runtime.Authenticator from the supplied basic auth function.
	// It has a default implementation in the security package, however you can replace it for your particular usage.
	BasicAuthenticator func(security.UserPassAuthentication) runtime.Authenticator

	// APIKeyAuthenticator generates a runtime.Authenticator from the supplied token auth function.
	// It has a default implementation in the security package, however you can replace it for your particular usage.
	APIKeyAuthenticator func(string, string, security.TokenAuthentication) runtime.Authenticator

	// BearerAuthenticator generates a runtime.Authenticator from the supplied bearer token auth function.
	// It has a default implementation in the security package, however you can replace it for your particular usage.
	BearerAuthenticator func(string, security.ScopedTokenAuthentication) runtime.Authenticator

	// JSONConsumer registers a consumer for the following mime types:
	//   - application/json
	JSONConsumer runtime.Consumer

	// JSONProducer registers a producer for the following mime types:
	//   - application/json
	JSONProducer runtime.Producer
	// TextCalendarProducer registers a producer for the following mime types:
	//   - text/calendar
	TextCalendarProducer runtime.Producer

	// DeleteEventsIDHandler sets the operation handler for the delete events ID operation
	DeleteEventsIDHandler DeleteEventsIDHandler
	// GetAvailabilitiesHandler sets the operation handler for the get availabilities operation
	GetAvailabilitiesHandler GetAvailabilitiesHandler
	// GetMeHandler sets the operation handler for the get me operation
	GetMeHandler GetMeHandler
	// GetPersonnelAssignableHandler sets the operation handler for the get personnel assignable operation
	GetPersonnelAssignableHandler GetPersonnelAssignableHandler
	// GetPersonnelAssignedHandler sets the operation handler for the get personnel assigned operation
	GetPersonnelAssignedHandler GetPersonnelAssignedHandler
	// GetPublicCalendarIDHandler sets the operation handler for the get public calendar ID operation
	GetPublicCalendarIDHandler GetPublicCalendarIDHandler
	// GetPublicHealthHandler sets the operation handler for the get public health operation
	GetPublicHealthHandler GetPublicHealthHandler
	// GetPublicScheduleHandler sets the operation handler for the get public schedule operation
	GetPublicScheduleHandler GetPublicScheduleHandler
	// GetRolesHandler sets the operation handler for the get roles operation
	GetRolesHandler GetRolesHandler
	// GetScheduleHandler sets the operation handler for the get schedule operation
	GetScheduleHandler GetScheduleHandler
	// GetShowsHandler sets the operation handler for the get shows operation
	GetShowsHandler GetShowsHandler
	// GetShowsShowSlugSummaryHandler sets the operation handler for the get shows show slug summary operation
	GetShowsShowSlugSummaryHandler GetShowsShowSlugSummaryHandler
	// PostAvailabilitiesHandler sets the operation handler for the post availabilities operation
	PostAvailabilitiesHandler PostAvailabilitiesHandler
	// PostEventsHandler sets the operation handler for the post events operation
	PostEventsHandler PostEventsHandler
	// PostEventsIDHandler sets the operation handler for the post events ID operation
	PostEventsIDHandler PostEventsIDHandler
	// PostMeHandler sets the operation handler for the post me operation
	PostMeHandler PostMeHandler
	// PostPersonnelAssignHandler sets the operation handler for the post personnel assign operation
	PostPersonnelAssignHandler PostPersonnelAssignHandler
	// PostRolesHandler sets the operation handler for the post roles operation
	PostRolesHandler PostRolesHandler
	// PostShowsHandler sets the operation handler for the post shows operation
	PostShowsHandler PostShowsHandler
	// PutRolesIDHandler sets the operation handler for the put roles ID operation
	PutRolesIDHandler PutRolesIDHandler

	// ServeError is called when an error is received, there is a default handler
	// but you can set your own with this
	ServeError func(http.ResponseWriter, *http.Request, error)

	// PreServerShutdown is called before the HTTP(S) server is shutdown
	// This allows for custom functions to get executed before the HTTP(S) server stops accepting traffic
	PreServerShutdown func()

	// ServerShutdown is called when the HTTP(S) server is shut down and done
	// handling all active connections and does not accept connections any more
	ServerShutdown func()

	// Custom command line argument groups with their descriptions
	CommandLineOptionsGroups []swag.CommandLineOptionsGroup

	// User defined logger function.
	Logger func(string, ...interface{})
}

// UseRedoc for documentation at /docs
func (o *GoBackendAPI) UseRedoc() {
	o.useSwaggerUI = false
}

// UseSwaggerUI for documentation at /docs
func (o *GoBackendAPI) UseSwaggerUI() {
	o.useSwaggerUI = true
}

// SetDefaultProduces sets the default produces media type
func (o *GoBackendAPI) SetDefaultProduces(mediaType string) {
	o.defaultProduces = mediaType
}

// SetDefaultConsumes returns the default consumes media type
func (o *GoBackendAPI) SetDefaultConsumes(mediaType string) {
	o.defaultConsumes = mediaType
}

// SetSpec sets a spec that will be served for the clients.
func (o *GoBackendAPI) SetSpec(spec *loads.Document) {
	o.spec = spec
}

// DefaultProduces returns the default produces media type
func (o *GoBackendAPI) DefaultProduces() string {
	return o.defaultProduces
}

// DefaultConsumes returns the default consumes media type
func (o *GoBackendAPI) DefaultConsumes() string {
	return o.defaultConsumes
}

// Formats returns the registered string formats
func (o *GoBackendAPI) Formats() strfmt.Registry {
	return o.formats
}

// RegisterFormat registers a custom format validator
func (o *GoBackendAPI) RegisterFormat(name string, format strfmt.Format, validator strfmt.Validator) {
	o.formats.Add(name, format, validator)
}

// Validate validates the registrations in the GoBackendAPI
func (o *GoBackendAPI) Validate() error {
	var unregistered []string

	if o.JSONConsumer == nil {
		unregistered = append(unregistered, "JSONConsumer")
	}

	if o.JSONProducer == nil {
		unregistered = append(unregistered, "JSONProducer")
	}
	if o.TextCalendarProducer == nil {
		unregistered = append(unregistered, "TextCalendarProducer")
	}

	if o.DeleteEventsIDHandler == nil {
		unregistered = append(unregistered, "DeleteEventsIDHandler")
	}
	if o.GetAvailabilitiesHandler == nil {
		unregistered = append(unregistered, "GetAvailabilitiesHandler")
	}
	if o.GetMeHandler == nil {
		unregistered = append(unregistered, "GetMeHandler")
	}
	if o.GetPersonnelAssignableHandler == nil {
		unregistered = append(unregistered, "GetPersonnelAssignableHandler")
	}
	if o.GetPersonnelAssignedHandler == nil {
		unregistered = append(unregistered, "GetPersonnelAssignedHandler")
	}
	if o.GetPublicCalendarIDHandler == nil {
		unregistered = append(unregistered, "GetPublicCalendarIDHandler")
	}
	if o.GetPublicHealthHandler == nil {
		unregistered = append(unregistered, "GetPublicHealthHandler")
	}
	if o.GetPublicScheduleHandler == nil {
		unregistered = append(unregistered, "GetPublicScheduleHandler")
	}
	if o.GetRolesHandler == nil {
		unregistered = append(unregistered, "GetRolesHandler")
	}
	if o.GetScheduleHandler == nil {
		unregistered = append(unregistered, "GetScheduleHandler")
	}
	if o.GetShowsHandler == nil {
		unregistered = append(unregistered, "GetShowsHandler")
	}
	if o.GetShowsShowSlugSummaryHandler == nil {
		unregistered = append(unregistered, "GetShowsShowSlugSummaryHandler")
	}
	if o.PostAvailabilitiesHandler == nil {
		unregistered = append(unregistered, "PostAvailabilitiesHandler")
	}
	if o.PostEventsHandler == nil {
		unregistered = append(unregistered, "PostEventsHandler")
	}
	if o.PostEventsIDHandler == nil {
		unregistered = append(unregistered, "PostEventsIDHandler")
	}
	if o.PostMeHandler == nil {
		unregistered = append(unregistered, "PostMeHandler")
	}
	if o.PostPersonnelAssignHandler == nil {
		unregistered = append(unregistered, "PostPersonnelAssignHandler")
	}
	if o.PostRolesHandler == nil {
		unregistered = append(unregistered, "PostRolesHandler")
	}
	if o.PostShowsHandler == nil {
		unregistered = append(unregistered, "PostShowsHandler")
	}
	if o.PutRolesIDHandler == nil {
		unregistered = append(unregistered, "PutRolesIDHandler")
	}

	if len(unregistered) > 0 {
		return fmt.Errorf("missing registration: %s", strings.Join(unregistered, ", "))
	}

	return nil
}

// ServeErrorFor gets a error handler for a given operation id
func (o *GoBackendAPI) ServeErrorFor(operationID string) func(http.ResponseWriter, *http.Request, error) {
	return o.ServeError
}

// AuthenticatorsFor gets the authenticators for the specified security schemes
func (o *GoBackendAPI) AuthenticatorsFor(schemes map[string]spec.SecurityScheme) map[string]runtime.Authenticator {
	return nil
}

// Authorizer returns the registered authorizer
func (o *GoBackendAPI) Authorizer() runtime.Authorizer {
	return nil
}

// ConsumersFor gets the consumers for the specified media types.
// MIME type parameters are ignored here.
func (o *GoBackendAPI) ConsumersFor(mediaTypes []string) map[string]runtime.Consumer {
	result := make(map[string]runtime.Consumer, len(mediaTypes))
	for _, mt := range mediaTypes {
		switch mt {
		case "application/json":
			result["application/json"] = o.JSONConsumer
		}

		if c, ok := o.customConsumers[mt]; ok {
			result[mt] = c
		}
	}
	return result
}

// ProducersFor gets the producers for the specified media types.
// MIME type parameters are ignored here.
func (o *GoBackendAPI) ProducersFor(mediaTypes []string) map[string]runtime.Producer {
	result := make(map[string]runtime.Producer, len(mediaTypes))
	for _, mt := range mediaTypes {
		switch mt {
		case "application/json":
			result["application/json"] = o.JSONProducer
		case "text/calendar":
			result["text/calendar"] = o.TextCalendarProducer
		}

		if p, ok := o.customProducers[mt]; ok {
			result[mt] = p
		}
	}
	return result
}

// HandlerFor gets a http.Handler for the provided operation method and path
func (o *GoBackendAPI) HandlerFor(method, path string) (http.Handler, bool) {
	if o.handlers == nil {
		return nil, false
	}
	um := strings.ToUpper(method)
	if _, ok := o.handlers[um]; !ok {
		return nil, false
	}
	if path == "/" {
		path = ""
	}
	h, ok := o.handlers[um][path]
	return h, ok
}

// Context returns the middleware context for the go backend API
func (o *GoBackendAPI) Context() *middleware.Context {
	if o.context == nil {
		o.context = middleware.NewRoutableContext(o.spec, o, nil)
	}

	return o.context
}

func (o *GoBackendAPI) initHandlerCache() {
	o.Context() // don't care about the result, just that the initialization happened
	if o.handlers == nil {
		o.handlers = make(map[string]map[string]http.Handler)
	}

	if o.handlers["DELETE"] == nil {
		o.handlers["DELETE"] = make(map[string]http.Handler)
	}
	o.handlers["DELETE"]["/events/{id}"] = NewDeleteEventsID(o.context, o.DeleteEventsIDHandler)
	if o.handlers["GET"] == nil {
		o.handlers["GET"] = make(map[string]http.Handler)
	}
	o.handlers["GET"]["/availabilities"] = NewGetAvailabilities(o.context, o.GetAvailabilitiesHandler)
	if o.handlers["GET"] == nil {
		o.handlers["GET"] = make(map[string]http.Handler)
	}
	o.handlers["GET"]["/me"] = NewGetMe(o.context, o.GetMeHandler)
	if o.handlers["GET"] == nil {
		o.handlers["GET"] = make(map[string]http.Handler)
	}
	o.handlers["GET"]["/personnel/assignable"] = NewGetPersonnelAssignable(o.context, o.GetPersonnelAssignableHandler)
	if o.handlers["GET"] == nil {
		o.handlers["GET"] = make(map[string]http.Handler)
	}
	o.handlers["GET"]["/personnel/assigned"] = NewGetPersonnelAssigned(o.context, o.GetPersonnelAssignedHandler)
	if o.handlers["GET"] == nil {
		o.handlers["GET"] = make(map[string]http.Handler)
	}
	o.handlers["GET"]["/public/calendar/{id}"] = NewGetPublicCalendarID(o.context, o.GetPublicCalendarIDHandler)
	if o.handlers["GET"] == nil {
		o.handlers["GET"] = make(map[string]http.Handler)
	}
	o.handlers["GET"]["/public/health"] = NewGetPublicHealth(o.context, o.GetPublicHealthHandler)
	if o.handlers["GET"] == nil {
		o.handlers["GET"] = make(map[string]http.Handler)
	}
	o.handlers["GET"]["/public/schedule"] = NewGetPublicSchedule(o.context, o.GetPublicScheduleHandler)
	if o.handlers["GET"] == nil {
		o.handlers["GET"] = make(map[string]http.Handler)
	}
	o.handlers["GET"]["/roles"] = NewGetRoles(o.context, o.GetRolesHandler)
	if o.handlers["GET"] == nil {
		o.handlers["GET"] = make(map[string]http.Handler)
	}
	o.handlers["GET"]["/schedule"] = NewGetSchedule(o.context, o.GetScheduleHandler)
	if o.handlers["GET"] == nil {
		o.handlers["GET"] = make(map[string]http.Handler)
	}
	o.handlers["GET"]["/shows"] = NewGetShows(o.context, o.GetShowsHandler)
	if o.handlers["GET"] == nil {
		o.handlers["GET"] = make(map[string]http.Handler)
	}
	o.handlers["GET"]["/shows/{showSlug}/summary"] = NewGetShowsShowSlugSummary(o.context, o.GetShowsShowSlugSummaryHandler)
	if o.handlers["POST"] == nil {
		o.handlers["POST"] = make(map[string]http.Handler)
	}
	o.handlers["POST"]["/availabilities"] = NewPostAvailabilities(o.context, o.PostAvailabilitiesHandler)
	if o.handlers["POST"] == nil {
		o.handlers["POST"] = make(map[string]http.Handler)
	}
	o.handlers["POST"]["/events"] = NewPostEvents(o.context, o.PostEventsHandler)
	if o.handlers["POST"] == nil {
		o.handlers["POST"] = make(map[string]http.Handler)
	}
	o.handlers["POST"]["/events/{id}"] = NewPostEventsID(o.context, o.PostEventsIDHandler)
	if o.handlers["POST"] == nil {
		o.handlers["POST"] = make(map[string]http.Handler)
	}
	o.handlers["POST"]["/me"] = NewPostMe(o.context, o.PostMeHandler)
	if o.handlers["POST"] == nil {
		o.handlers["POST"] = make(map[string]http.Handler)
	}
	o.handlers["POST"]["/personnel/assign"] = NewPostPersonnelAssign(o.context, o.PostPersonnelAssignHandler)
	if o.handlers["POST"] == nil {
		o.handlers["POST"] = make(map[string]http.Handler)
	}
	o.handlers["POST"]["/roles"] = NewPostRoles(o.context, o.PostRolesHandler)
	if o.handlers["POST"] == nil {
		o.handlers["POST"] = make(map[string]http.Handler)
	}
	o.handlers["POST"]["/shows"] = NewPostShows(o.context, o.PostShowsHandler)
	if o.handlers["PUT"] == nil {
		o.handlers["PUT"] = make(map[string]http.Handler)
	}
	o.handlers["PUT"]["/roles/{id}"] = NewPutRolesID(o.context, o.PutRolesIDHandler)
}

// Serve creates a http handler to serve the API over HTTP
// can be used directly in http.ListenAndServe(":8000", api.Serve(nil))
func (o *GoBackendAPI) Serve(builder middleware.Builder) http.Handler {
	o.Init()

	if o.Middleware != nil {
		return o.Middleware(builder)
	}
	if o.useSwaggerUI {
		return o.context.APIHandlerSwaggerUI(builder)
	}
	return o.context.APIHandler(builder)
}

// Init allows you to just initialize the handler cache, you can then recompose the middleware as you see fit
func (o *GoBackendAPI) Init() {
	if len(o.handlers) == 0 {
		o.initHandlerCache()
	}
}

// RegisterConsumer allows you to add (or override) a consumer for a media type.
func (o *GoBackendAPI) RegisterConsumer(mediaType string, consumer runtime.Consumer) {
	o.customConsumers[mediaType] = consumer
}

// RegisterProducer allows you to add (or override) a producer for a media type.
func (o *GoBackendAPI) RegisterProducer(mediaType string, producer runtime.Producer) {
	o.customProducers[mediaType] = producer
}

// AddMiddlewareFor adds a http middleware to existing handler
func (o *GoBackendAPI) AddMiddlewareFor(method, path string, builder middleware.Builder) {
	um := strings.ToUpper(method)
	if path == "/" {
		path = ""
	}
	o.Init()
	if h, ok := o.handlers[um][path]; ok {
		o.handlers[um][path] = builder(h)
	}
}
