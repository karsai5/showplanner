// Code generated by go-swagger; DO NOT EDIT.

package rostering

// This file was generated by the swagger tool.
// Editing this file might prove futile when you re-run the generate command

import (
	"net/http"

	"github.com/go-openapi/runtime/middleware"
)

// PostInvitationsIDNotifyHandlerFunc turns a function with the right signature into a post invitations ID notify handler
type PostInvitationsIDNotifyHandlerFunc func(PostInvitationsIDNotifyParams) middleware.Responder

// Handle executing the request and returning a response
func (fn PostInvitationsIDNotifyHandlerFunc) Handle(params PostInvitationsIDNotifyParams) middleware.Responder {
	return fn(params)
}

// PostInvitationsIDNotifyHandler interface for that can handle valid post invitations ID notify params
type PostInvitationsIDNotifyHandler interface {
	Handle(PostInvitationsIDNotifyParams) middleware.Responder
}

// NewPostInvitationsIDNotify creates a new http.Handler for the post invitations ID notify operation
func NewPostInvitationsIDNotify(ctx *middleware.Context, handler PostInvitationsIDNotifyHandler) *PostInvitationsIDNotify {
	return &PostInvitationsIDNotify{Context: ctx, Handler: handler}
}

/*
	PostInvitationsIDNotify swagger:route POST /invitations/{id}/notify rostering postInvitationsIdNotify

Re send invitation email
*/
type PostInvitationsIDNotify struct {
	Context *middleware.Context
	Handler PostInvitationsIDNotifyHandler
}

func (o *PostInvitationsIDNotify) ServeHTTP(rw http.ResponseWriter, r *http.Request) {
	route, rCtx, _ := o.Context.RouteInfo(r)
	if rCtx != nil {
		*r = *rCtx
	}
	var Params = NewPostInvitationsIDNotifyParams()
	if err := o.Context.BindValidRequest(r, route, &Params); err != nil { // bind params
		o.Context.Respond(rw, r, route.Produces, route, err)
		return
	}

	res := o.Handler.Handle(Params) // actually handle the request
	o.Context.Respond(rw, r, route.Produces, route, res)

}
