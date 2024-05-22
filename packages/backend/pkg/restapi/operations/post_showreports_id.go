// Code generated by go-swagger; DO NOT EDIT.

package operations

// This file was generated by the swagger tool.
// Editing this file might prove futile when you re-run the generate command

import (
	"net/http"

	"github.com/go-openapi/runtime/middleware"
)

// PostShowreportsIDHandlerFunc turns a function with the right signature into a post showreports ID handler
type PostShowreportsIDHandlerFunc func(PostShowreportsIDParams) middleware.Responder

// Handle executing the request and returning a response
func (fn PostShowreportsIDHandlerFunc) Handle(params PostShowreportsIDParams) middleware.Responder {
	return fn(params)
}

// PostShowreportsIDHandler interface for that can handle valid post showreports ID params
type PostShowreportsIDHandler interface {
	Handle(PostShowreportsIDParams) middleware.Responder
}

// NewPostShowreportsID creates a new http.Handler for the post showreports ID operation
func NewPostShowreportsID(ctx *middleware.Context, handler PostShowreportsIDHandler) *PostShowreportsID {
	return &PostShowreportsID{Context: ctx, Handler: handler}
}

/*
	PostShowreportsID swagger:route POST /showreports/{id} postShowreportsId

Adds a person to a show
*/
type PostShowreportsID struct {
	Context *middleware.Context
	Handler PostShowreportsIDHandler
}

func (o *PostShowreportsID) ServeHTTP(rw http.ResponseWriter, r *http.Request) {
	route, rCtx, _ := o.Context.RouteInfo(r)
	if rCtx != nil {
		*r = *rCtx
	}
	var Params = NewPostShowreportsIDParams()
	if err := o.Context.BindValidRequest(r, route, &Params); err != nil { // bind params
		o.Context.Respond(rw, r, route.Produces, route, err)
		return
	}

	res := o.Handler.Handle(Params) // actually handle the request
	o.Context.Respond(rw, r, route.Produces, route, res)

}
