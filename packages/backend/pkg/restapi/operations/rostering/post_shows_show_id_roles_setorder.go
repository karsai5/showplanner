// Code generated by go-swagger; DO NOT EDIT.

package rostering

// This file was generated by the swagger tool.
// Editing this file might prove futile when you re-run the generate command

import (
	"net/http"

	"github.com/go-openapi/runtime/middleware"
)

// PostShowsShowIDRolesSetorderHandlerFunc turns a function with the right signature into a post shows show ID roles setorder handler
type PostShowsShowIDRolesSetorderHandlerFunc func(PostShowsShowIDRolesSetorderParams) middleware.Responder

// Handle executing the request and returning a response
func (fn PostShowsShowIDRolesSetorderHandlerFunc) Handle(params PostShowsShowIDRolesSetorderParams) middleware.Responder {
	return fn(params)
}

// PostShowsShowIDRolesSetorderHandler interface for that can handle valid post shows show ID roles setorder params
type PostShowsShowIDRolesSetorderHandler interface {
	Handle(PostShowsShowIDRolesSetorderParams) middleware.Responder
}

// NewPostShowsShowIDRolesSetorder creates a new http.Handler for the post shows show ID roles setorder operation
func NewPostShowsShowIDRolesSetorder(ctx *middleware.Context, handler PostShowsShowIDRolesSetorderHandler) *PostShowsShowIDRolesSetorder {
	return &PostShowsShowIDRolesSetorder{Context: ctx, Handler: handler}
}

/*
	PostShowsShowIDRolesSetorder swagger:route POST /shows/{showId}/roles/setorder rostering postShowsShowIdRolesSetorder

Set the order of the roles for a show
*/
type PostShowsShowIDRolesSetorder struct {
	Context *middleware.Context
	Handler PostShowsShowIDRolesSetorderHandler
}

func (o *PostShowsShowIDRolesSetorder) ServeHTTP(rw http.ResponseWriter, r *http.Request) {
	route, rCtx, _ := o.Context.RouteInfo(r)
	if rCtx != nil {
		*r = *rCtx
	}
	var Params = NewPostShowsShowIDRolesSetorderParams()
	if err := o.Context.BindValidRequest(r, route, &Params); err != nil { // bind params
		o.Context.Respond(rw, r, route.Produces, route, err)
		return
	}

	res := o.Handler.Handle(Params) // actually handle the request
	o.Context.Respond(rw, r, route.Produces, route, res)

}