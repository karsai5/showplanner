// Code generated by go-swagger; DO NOT EDIT.

package operations

// This file was generated by the swagger tool.
// Editing this file might prove futile when you re-run the generate command

import (
	"net/http"

	"github.com/go-openapi/runtime/middleware"
)

// GetEventsHandlerFunc turns a function with the right signature into a get events handler
type GetEventsHandlerFunc func(GetEventsParams) middleware.Responder

// Handle executing the request and returning a response
func (fn GetEventsHandlerFunc) Handle(params GetEventsParams) middleware.Responder {
	return fn(params)
}

// GetEventsHandler interface for that can handle valid get events params
type GetEventsHandler interface {
	Handle(GetEventsParams) middleware.Responder
}

// NewGetEvents creates a new http.Handler for the get events operation
func NewGetEvents(ctx *middleware.Context, handler GetEventsHandler) *GetEvents {
	return &GetEvents{Context: ctx, Handler: handler}
}

/*
	GetEvents swagger:route GET /events getEvents

Returns a list of events.
*/
type GetEvents struct {
	Context *middleware.Context
	Handler GetEventsHandler
}

func (o *GetEvents) ServeHTTP(rw http.ResponseWriter, r *http.Request) {
	route, rCtx, _ := o.Context.RouteInfo(r)
	if rCtx != nil {
		*r = *rCtx
	}
	var Params = NewGetEventsParams()
	if err := o.Context.BindValidRequest(r, route, &Params); err != nil { // bind params
		o.Context.Respond(rw, r, route.Produces, route, err)
		return
	}

	res := o.Handler.Handle(Params) // actually handle the request
	o.Context.Respond(rw, r, route.Produces, route, res)

}
