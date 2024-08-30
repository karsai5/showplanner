// Code generated by go-swagger; DO NOT EDIT.

package shows

// This file was generated by the swagger tool.
// Editing this file might prove futile when you re-run the swagger generate command

import (
	"net/http"

	"github.com/go-openapi/errors"
	"github.com/go-openapi/runtime/middleware"
	"github.com/go-openapi/strfmt"
	"github.com/go-openapi/swag"
)

// NewGetShowsShowIDPeopleCsvGoogleParams creates a new GetShowsShowIDPeopleCsvGoogleParams object
//
// There are no default values defined in the spec.
func NewGetShowsShowIDPeopleCsvGoogleParams() GetShowsShowIDPeopleCsvGoogleParams {

	return GetShowsShowIDPeopleCsvGoogleParams{}
}

// GetShowsShowIDPeopleCsvGoogleParams contains all the bound params for the get shows show ID people csv google operation
// typically these are obtained from a http.Request
//
// swagger:parameters GetShowsShowIDPeopleCsvGoogle
type GetShowsShowIDPeopleCsvGoogleParams struct {

	// HTTP Request Object
	HTTPRequest *http.Request `json:"-"`

	/*
	  Required: true
	  In: path
	*/
	ShowID int64
}

// BindRequest both binds and validates a request, it assumes that complex things implement a Validatable(strfmt.Registry) error interface
// for simple values it will use straight method calls.
//
// To ensure default values, the struct must have been initialized with NewGetShowsShowIDPeopleCsvGoogleParams() beforehand.
func (o *GetShowsShowIDPeopleCsvGoogleParams) BindRequest(r *http.Request, route *middleware.MatchedRoute) error {
	var res []error

	o.HTTPRequest = r

	rShowID, rhkShowID, _ := route.Params.GetOK("showId")
	if err := o.bindShowID(rShowID, rhkShowID, route.Formats); err != nil {
		res = append(res, err)
	}
	if len(res) > 0 {
		return errors.CompositeValidationError(res...)
	}
	return nil
}

// bindShowID binds and validates parameter ShowID from path.
func (o *GetShowsShowIDPeopleCsvGoogleParams) bindShowID(rawData []string, hasKey bool, formats strfmt.Registry) error {
	var raw string
	if len(rawData) > 0 {
		raw = rawData[len(rawData)-1]
	}

	// Required: true
	// Parameter is provided by construction from the route

	value, err := swag.ConvertInt64(raw)
	if err != nil {
		return errors.InvalidType("showId", "path", "int64", raw)
	}
	o.ShowID = value

	return nil
}