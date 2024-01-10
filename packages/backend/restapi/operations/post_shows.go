// Code generated by go-swagger; DO NOT EDIT.

package operations

// This file was generated by the swagger tool.
// Editing this file might prove futile when you re-run the generate command

import (
	"net/http"

	"github.com/go-openapi/runtime/middleware"
)

// PostShowsHandlerFunc turns a function with the right signature into a post shows handler
type PostShowsHandlerFunc func(PostShowsParams) middleware.Responder

// Handle executing the request and returning a response
func (fn PostShowsHandlerFunc) Handle(params PostShowsParams) middleware.Responder {
	return fn(params)
}

// PostShowsHandler interface for that can handle valid post shows params
type PostShowsHandler interface {
	Handle(PostShowsParams) middleware.Responder
}

// NewPostShows creates a new http.Handler for the post shows operation
func NewPostShows(ctx *middleware.Context, handler PostShowsHandler) *PostShows {
	return &PostShows{Context: ctx, Handler: handler}
}

/*
	PostShows swagger:route POST /shows postShows

Creates a show
*/
type PostShows struct {
	Context *middleware.Context
	Handler PostShowsHandler
}

func (o *PostShows) ServeHTTP(rw http.ResponseWriter, r *http.Request) {
	route, rCtx, _ := o.Context.RouteInfo(r)
	if rCtx != nil {
		*r = *rCtx
	}
	var Params = NewPostShowsParams()
	if err := o.Context.BindValidRequest(r, route, &Params); err != nil { // bind params
		o.Context.Respond(rw, r, route.Produces, route, err)
		return
	}

	res := o.Handler.Handle(Params) // actually handle the request
	o.Context.Respond(rw, r, route.Produces, route, res)

}
