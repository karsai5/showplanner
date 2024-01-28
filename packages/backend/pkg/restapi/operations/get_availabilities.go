// Code generated by go-swagger; DO NOT EDIT.

package operations

// This file was generated by the swagger tool.
// Editing this file might prove futile when you re-run the generate command

import (
	"net/http"

	"github.com/go-openapi/runtime/middleware"
)

// GetAvailabilitiesHandlerFunc turns a function with the right signature into a get availabilities handler
type GetAvailabilitiesHandlerFunc func(GetAvailabilitiesParams) middleware.Responder

// Handle executing the request and returning a response
func (fn GetAvailabilitiesHandlerFunc) Handle(params GetAvailabilitiesParams) middleware.Responder {
	return fn(params)
}

// GetAvailabilitiesHandler interface for that can handle valid get availabilities params
type GetAvailabilitiesHandler interface {
	Handle(GetAvailabilitiesParams) middleware.Responder
}

// NewGetAvailabilities creates a new http.Handler for the get availabilities operation
func NewGetAvailabilities(ctx *middleware.Context, handler GetAvailabilitiesHandler) *GetAvailabilities {
	return &GetAvailabilities{Context: ctx, Handler: handler}
}

/*
	GetAvailabilities swagger:route GET /availabilities getAvailabilities

Returns availabilities for all the members of a show
*/
type GetAvailabilities struct {
	Context *middleware.Context
	Handler GetAvailabilitiesHandler
}

func (o *GetAvailabilities) ServeHTTP(rw http.ResponseWriter, r *http.Request) {
	route, rCtx, _ := o.Context.RouteInfo(r)
	if rCtx != nil {
		*r = *rCtx
	}
	var Params = NewGetAvailabilitiesParams()
	if err := o.Context.BindValidRequest(r, route, &Params); err != nil { // bind params
		o.Context.Respond(rw, r, route.Produces, route, err)
		return
	}

	res := o.Handler.Handle(Params) // actually handle the request
	o.Context.Respond(rw, r, route.Produces, route, res)

}
