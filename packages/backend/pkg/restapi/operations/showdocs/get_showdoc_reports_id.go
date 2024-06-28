// Code generated by go-swagger; DO NOT EDIT.

package showdocs

// This file was generated by the swagger tool.
// Editing this file might prove futile when you re-run the generate command

import (
	"net/http"

	"github.com/go-openapi/runtime/middleware"
)

// GetShowdocReportsIDHandlerFunc turns a function with the right signature into a get showdoc reports ID handler
type GetShowdocReportsIDHandlerFunc func(GetShowdocReportsIDParams) middleware.Responder

// Handle executing the request and returning a response
func (fn GetShowdocReportsIDHandlerFunc) Handle(params GetShowdocReportsIDParams) middleware.Responder {
	return fn(params)
}

// GetShowdocReportsIDHandler interface for that can handle valid get showdoc reports ID params
type GetShowdocReportsIDHandler interface {
	Handle(GetShowdocReportsIDParams) middleware.Responder
}

// NewGetShowdocReportsID creates a new http.Handler for the get showdoc reports ID operation
func NewGetShowdocReportsID(ctx *middleware.Context, handler GetShowdocReportsIDHandler) *GetShowdocReportsID {
	return &GetShowdocReportsID{Context: ctx, Handler: handler}
}

/*
	GetShowdocReportsID swagger:route GET /showdoc/reports/{id} showdocs getShowdocReportsId

Gets a particular show report
*/
type GetShowdocReportsID struct {
	Context *middleware.Context
	Handler GetShowdocReportsIDHandler
}

func (o *GetShowdocReportsID) ServeHTTP(rw http.ResponseWriter, r *http.Request) {
	route, rCtx, _ := o.Context.RouteInfo(r)
	if rCtx != nil {
		*r = *rCtx
	}
	var Params = NewGetShowdocReportsIDParams()
	if err := o.Context.BindValidRequest(r, route, &Params); err != nil { // bind params
		o.Context.Respond(rw, r, route.Produces, route, err)
		return
	}

	res := o.Handler.Handle(Params) // actually handle the request
	o.Context.Respond(rw, r, route.Produces, route, res)

}