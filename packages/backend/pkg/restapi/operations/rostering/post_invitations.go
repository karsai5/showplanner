// Code generated by go-swagger; DO NOT EDIT.

package rostering

// This file was generated by the swagger tool.
// Editing this file might prove futile when you re-run the generate command

import (
	"net/http"

	"github.com/go-openapi/runtime/middleware"
)

// PostInvitationsHandlerFunc turns a function with the right signature into a post invitations handler
type PostInvitationsHandlerFunc func(PostInvitationsParams) middleware.Responder

// Handle executing the request and returning a response
func (fn PostInvitationsHandlerFunc) Handle(params PostInvitationsParams) middleware.Responder {
	return fn(params)
}

// PostInvitationsHandler interface for that can handle valid post invitations params
type PostInvitationsHandler interface {
	Handle(PostInvitationsParams) middleware.Responder
}

// NewPostInvitations creates a new http.Handler for the post invitations operation
func NewPostInvitations(ctx *middleware.Context, handler PostInvitationsHandler) *PostInvitations {
	return &PostInvitations{Context: ctx, Handler: handler}
}

/*
	PostInvitations swagger:route POST /invitations/ shows postInvitations

Invites a person to a show
*/
type PostInvitations struct {
	Context *middleware.Context
	Handler PostInvitationsHandler
}

func (o *PostInvitations) ServeHTTP(rw http.ResponseWriter, r *http.Request) {
	route, rCtx, _ := o.Context.RouteInfo(r)
	if rCtx != nil {
		*r = *rCtx
	}
	var Params = NewPostInvitationsParams()
	if err := o.Context.BindValidRequest(r, route, &Params); err != nil { // bind params
		o.Context.Respond(rw, r, route.Produces, route, err)
		return
	}

	res := o.Handler.Handle(Params) // actually handle the request
	o.Context.Respond(rw, r, route.Produces, route, res)

}
