// Code generated by go-swagger; DO NOT EDIT.

package operations

// This file was generated by the swagger tool.
// Editing this file might prove futile when you re-run the generate command

import (
	"net/http"

	"github.com/go-openapi/runtime/middleware"
)

// PostMediaUploadHandlerFunc turns a function with the right signature into a post media upload handler
type PostMediaUploadHandlerFunc func(PostMediaUploadParams) middleware.Responder

// Handle executing the request and returning a response
func (fn PostMediaUploadHandlerFunc) Handle(params PostMediaUploadParams) middleware.Responder {
	return fn(params)
}

// PostMediaUploadHandler interface for that can handle valid post media upload params
type PostMediaUploadHandler interface {
	Handle(PostMediaUploadParams) middleware.Responder
}

// NewPostMediaUpload creates a new http.Handler for the post media upload operation
func NewPostMediaUpload(ctx *middleware.Context, handler PostMediaUploadHandler) *PostMediaUpload {
	return &PostMediaUpload{Context: ctx, Handler: handler}
}

/*
	PostMediaUpload swagger:route POST /media/upload postMediaUpload

PostMediaUpload post media upload API
*/
type PostMediaUpload struct {
	Context *middleware.Context
	Handler PostMediaUploadHandler
}

func (o *PostMediaUpload) ServeHTTP(rw http.ResponseWriter, r *http.Request) {
	route, rCtx, _ := o.Context.RouteInfo(r)
	if rCtx != nil {
		*r = *rCtx
	}
	var Params = NewPostMediaUploadParams()
	if err := o.Context.BindValidRequest(r, route, &Params); err != nil { // bind params
		o.Context.Respond(rw, r, route.Produces, route, err)
		return
	}

	res := o.Handler.Handle(Params) // actually handle the request
	o.Context.Respond(rw, r, route.Produces, route, res)

}