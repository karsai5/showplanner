// Code generated by go-swagger; DO NOT EDIT.

package operations

// This file was generated by the swagger tool.
// Editing this file might prove futile when you re-run the swagger generate command

import (
	"net/http"

	"github.com/go-openapi/errors"
	"github.com/go-openapi/runtime/middleware"
	"github.com/go-openapi/strfmt"
)

// NewGetShowsShowSlugParams creates a new GetShowsShowSlugParams object
//
// There are no default values defined in the spec.
func NewGetShowsShowSlugParams() GetShowsShowSlugParams {

	return GetShowsShowSlugParams{}
}

// GetShowsShowSlugParams contains all the bound params for the get shows show slug operation
// typically these are obtained from a http.Request
//
// swagger:parameters GetShowsShowSlug
type GetShowsShowSlugParams struct {

	// HTTP Request Object
	HTTPRequest *http.Request `json:"-"`

	/*Slug of show
	  Required: true
	  In: path
	*/
	ShowSlug string
}

// BindRequest both binds and validates a request, it assumes that complex things implement a Validatable(strfmt.Registry) error interface
// for simple values it will use straight method calls.
//
// To ensure default values, the struct must have been initialized with NewGetShowsShowSlugParams() beforehand.
func (o *GetShowsShowSlugParams) BindRequest(r *http.Request, route *middleware.MatchedRoute) error {
	var res []error

	o.HTTPRequest = r

	rShowSlug, rhkShowSlug, _ := route.Params.GetOK("showSlug")
	if err := o.bindShowSlug(rShowSlug, rhkShowSlug, route.Formats); err != nil {
		res = append(res, err)
	}
	if len(res) > 0 {
		return errors.CompositeValidationError(res...)
	}
	return nil
}

// bindShowSlug binds and validates parameter ShowSlug from path.
func (o *GetShowsShowSlugParams) bindShowSlug(rawData []string, hasKey bool, formats strfmt.Registry) error {
	var raw string
	if len(rawData) > 0 {
		raw = rawData[len(rawData)-1]
	}

	// Required: true
	// Parameter is provided by construction from the route
	o.ShowSlug = raw

	return nil
}
