// Code generated by go-swagger; DO NOT EDIT.

package operations

// This file was generated by the swagger tool.
// Editing this file might prove futile when you re-run the generate command

import (
	"net/http"

	"github.com/go-openapi/runtime/middleware"
)

// GetRosterHandlerFunc turns a function with the right signature into a get roster handler
type GetRosterHandlerFunc func(GetRosterParams) middleware.Responder

// Handle executing the request and returning a response
func (fn GetRosterHandlerFunc) Handle(params GetRosterParams) middleware.Responder {
	return fn(params)
}

// GetRosterHandler interface for that can handle valid get roster params
type GetRosterHandler interface {
	Handle(GetRosterParams) middleware.Responder
}

// NewGetRoster creates a new http.Handler for the get roster operation
func NewGetRoster(ctx *middleware.Context, handler GetRosterHandler) *GetRoster {
	return &GetRoster{Context: ctx, Handler: handler}
}

/*
	GetRoster swagger:route GET /roster getRoster

Returns roster for a show
*/
type GetRoster struct {
	Context *middleware.Context
	Handler GetRosterHandler
}

func (o *GetRoster) ServeHTTP(rw http.ResponseWriter, r *http.Request) {
	route, rCtx, _ := o.Context.RouteInfo(r)
	if rCtx != nil {
		*r = *rCtx
	}
	var Params = NewGetRosterParams()
	if err := o.Context.BindValidRequest(r, route, &Params); err != nil { // bind params
		o.Context.Respond(rw, r, route.Produces, route, err)
		return
	}

	res := o.Handler.Handle(Params) // actually handle the request
	o.Context.Respond(rw, r, route.Produces, route, res)

}
