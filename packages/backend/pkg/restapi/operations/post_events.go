// Code generated by go-swagger; DO NOT EDIT.

package operations

// This file was generated by the swagger tool.
// Editing this file might prove futile when you re-run the generate command

import (
	"net/http"

	"github.com/go-openapi/runtime/middleware"
)

// PostEventsHandlerFunc turns a function with the right signature into a post events handler
type PostEventsHandlerFunc func(PostEventsParams) middleware.Responder

// Handle executing the request and returning a response
func (fn PostEventsHandlerFunc) Handle(params PostEventsParams) middleware.Responder {
	return fn(params)
}

// PostEventsHandler interface for that can handle valid post events params
type PostEventsHandler interface {
	Handle(PostEventsParams) middleware.Responder
}

// NewPostEvents creates a new http.Handler for the post events operation
func NewPostEvents(ctx *middleware.Context, handler PostEventsHandler) *PostEvents {
	return &PostEvents{Context: ctx, Handler: handler}
}

/*
	PostEvents swagger:route POST /events postEvents

Creates an event
*/
type PostEvents struct {
	Context *middleware.Context
	Handler PostEventsHandler
}

func (o *PostEvents) ServeHTTP(rw http.ResponseWriter, r *http.Request) {
	route, rCtx, _ := o.Context.RouteInfo(r)
	if rCtx != nil {
		*r = *rCtx
	}
	var Params = NewPostEventsParams()
	if err := o.Context.BindValidRequest(r, route, &Params); err != nil { // bind params
		o.Context.Respond(rw, r, route.Produces, route, err)
		return
	}

	res := o.Handler.Handle(Params) // actually handle the request
	o.Context.Respond(rw, r, route.Produces, route, res)

}