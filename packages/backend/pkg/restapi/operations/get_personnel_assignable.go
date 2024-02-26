// Code generated by go-swagger; DO NOT EDIT.

package operations

// This file was generated by the swagger tool.
// Editing this file might prove futile when you re-run the generate command

import (
	"net/http"

	"github.com/go-openapi/runtime/middleware"
)

// GetPersonnelAssignableHandlerFunc turns a function with the right signature into a get personnel assignable handler
type GetPersonnelAssignableHandlerFunc func(GetPersonnelAssignableParams) middleware.Responder

// Handle executing the request and returning a response
func (fn GetPersonnelAssignableHandlerFunc) Handle(params GetPersonnelAssignableParams) middleware.Responder {
	return fn(params)
}

// GetPersonnelAssignableHandler interface for that can handle valid get personnel assignable params
type GetPersonnelAssignableHandler interface {
	Handle(GetPersonnelAssignableParams) middleware.Responder
}

// NewGetPersonnelAssignable creates a new http.Handler for the get personnel assignable operation
func NewGetPersonnelAssignable(ctx *middleware.Context, handler GetPersonnelAssignableHandler) *GetPersonnelAssignable {
	return &GetPersonnelAssignable{Context: ctx, Handler: handler}
}

/*
	GetPersonnelAssignable swagger:route GET /personnel/assignable getPersonnelAssignable

Returns people for a show
*/
type GetPersonnelAssignable struct {
	Context *middleware.Context
	Handler GetPersonnelAssignableHandler
}

func (o *GetPersonnelAssignable) ServeHTTP(rw http.ResponseWriter, r *http.Request) {
	route, rCtx, _ := o.Context.RouteInfo(r)
	if rCtx != nil {
		*r = *rCtx
	}
	var Params = NewGetPersonnelAssignableParams()
	if err := o.Context.BindValidRequest(r, route, &Params); err != nil { // bind params
		o.Context.Respond(rw, r, route.Produces, route, err)
		return
	}

	res := o.Handler.Handle(Params) // actually handle the request
	o.Context.Respond(rw, r, route.Produces, route, res)

}
