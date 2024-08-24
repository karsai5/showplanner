// Code generated by go-swagger; DO NOT EDIT.

package rostering

// This file was generated by the swagger tool.
// Editing this file might prove futile when you re-run the generate command

import (
	"net/http"

	"github.com/go-openapi/runtime/middleware"
)

// GetInvitationsIDHandlerFunc turns a function with the right signature into a get invitations ID handler
type GetInvitationsIDHandlerFunc func(GetInvitationsIDParams) middleware.Responder

// Handle executing the request and returning a response
func (fn GetInvitationsIDHandlerFunc) Handle(params GetInvitationsIDParams) middleware.Responder {
	return fn(params)
}

// GetInvitationsIDHandler interface for that can handle valid get invitations ID params
type GetInvitationsIDHandler interface {
	Handle(GetInvitationsIDParams) middleware.Responder
}

// NewGetInvitationsID creates a new http.Handler for the get invitations ID operation
func NewGetInvitationsID(ctx *middleware.Context, handler GetInvitationsIDHandler) *GetInvitationsID {
	return &GetInvitationsID{Context: ctx, Handler: handler}
}

/*
	GetInvitationsID swagger:route GET /invitations/{id} shows getInvitationsId

View invitation
*/
type GetInvitationsID struct {
	Context *middleware.Context
	Handler GetInvitationsIDHandler
}

func (o *GetInvitationsID) ServeHTTP(rw http.ResponseWriter, r *http.Request) {
	route, rCtx, _ := o.Context.RouteInfo(r)
	if rCtx != nil {
		*r = *rCtx
	}
	var Params = NewGetInvitationsIDParams()
	if err := o.Context.BindValidRequest(r, route, &Params); err != nil { // bind params
		o.Context.Respond(rw, r, route.Produces, route, err)
		return
	}

	res := o.Handler.Handle(Params) // actually handle the request
	o.Context.Respond(rw, r, route.Produces, route, res)

}
