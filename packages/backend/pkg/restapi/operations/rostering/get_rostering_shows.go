// Code generated by go-swagger; DO NOT EDIT.

package rostering

// This file was generated by the swagger tool.
// Editing this file might prove futile when you re-run the generate command

import (
	"net/http"

	"github.com/go-openapi/runtime/middleware"
)

// GetRosteringShowsHandlerFunc turns a function with the right signature into a get rostering shows handler
type GetRosteringShowsHandlerFunc func(GetRosteringShowsParams) middleware.Responder

// Handle executing the request and returning a response
func (fn GetRosteringShowsHandlerFunc) Handle(params GetRosteringShowsParams) middleware.Responder {
	return fn(params)
}

// GetRosteringShowsHandler interface for that can handle valid get rostering shows params
type GetRosteringShowsHandler interface {
	Handle(GetRosteringShowsParams) middleware.Responder
}

// NewGetRosteringShows creates a new http.Handler for the get rostering shows operation
func NewGetRosteringShows(ctx *middleware.Context, handler GetRosteringShowsHandler) *GetRosteringShows {
	return &GetRosteringShows{Context: ctx, Handler: handler}
}

/*
	GetRosteringShows swagger:route GET /rostering/shows rostering getRosteringShows

Returns a list of shows
*/
type GetRosteringShows struct {
	Context *middleware.Context
	Handler GetRosteringShowsHandler
}

func (o *GetRosteringShows) ServeHTTP(rw http.ResponseWriter, r *http.Request) {
	route, rCtx, _ := o.Context.RouteInfo(r)
	if rCtx != nil {
		*r = *rCtx
	}
	var Params = NewGetRosteringShowsParams()
	if err := o.Context.BindValidRequest(r, route, &Params); err != nil { // bind params
		o.Context.Respond(rw, r, route.Produces, route, err)
		return
	}

	res := o.Handler.Handle(Params) // actually handle the request
	o.Context.Respond(rw, r, route.Produces, route, res)

}