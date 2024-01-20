// Code generated by go-swagger; DO NOT EDIT.

package operations

// This file was generated by the swagger tool.
// Editing this file might prove futile when you re-run the generate command

import (
	"net/http"

	"github.com/go-openapi/runtime/middleware"
)

// PostEventsIDHandlerFunc turns a function with the right signature into a post events ID handler
type PostEventsIDHandlerFunc func(PostEventsIDParams) middleware.Responder

// Handle executing the request and returning a response
func (fn PostEventsIDHandlerFunc) Handle(params PostEventsIDParams) middleware.Responder {
	return fn(params)
}

// PostEventsIDHandler interface for that can handle valid post events ID params
type PostEventsIDHandler interface {
	Handle(PostEventsIDParams) middleware.Responder
}

// NewPostEventsID creates a new http.Handler for the post events ID operation
func NewPostEventsID(ctx *middleware.Context, handler PostEventsIDHandler) *PostEventsID {
	return &PostEventsID{Context: ctx, Handler: handler}
}

/*
	PostEventsID swagger:route POST /events/{id} postEventsId

Update event
*/
type PostEventsID struct {
	Context *middleware.Context
	Handler PostEventsIDHandler
}

func (o *PostEventsID) ServeHTTP(rw http.ResponseWriter, r *http.Request) {
	route, rCtx, _ := o.Context.RouteInfo(r)
	if rCtx != nil {
		*r = *rCtx
	}
	var Params = NewPostEventsIDParams()
	if err := o.Context.BindValidRequest(r, route, &Params); err != nil { // bind params
		o.Context.Respond(rw, r, route.Produces, route, err)
		return
	}

	res := o.Handler.Handle(Params) // actually handle the request
	o.Context.Respond(rw, r, route.Produces, route, res)

}