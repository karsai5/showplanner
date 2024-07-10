// Code generated by go-swagger; DO NOT EDIT.

package rostering

// This file was generated by the swagger tool.
// Editing this file might prove futile when you re-run the swagger generate command

import (
	"net/http"

	"github.com/go-openapi/errors"
	"github.com/go-openapi/runtime"
	"github.com/go-openapi/runtime/middleware"
	"github.com/go-openapi/strfmt"
	"github.com/go-openapi/swag"
)

// NewPostShowsShowIDRosterReleaseParams creates a new PostShowsShowIDRosterReleaseParams object
//
// There are no default values defined in the spec.
func NewPostShowsShowIDRosterReleaseParams() PostShowsShowIDRosterReleaseParams {

	return PostShowsShowIDRosterReleaseParams{}
}

// PostShowsShowIDRosterReleaseParams contains all the bound params for the post shows show ID roster release operation
// typically these are obtained from a http.Request
//
// swagger:parameters PostShowsShowIDRosterRelease
type PostShowsShowIDRosterReleaseParams struct {

	// HTTP Request Object
	HTTPRequest *http.Request `json:"-"`

	/*
	  In: query
	*/
	SendEmail *bool
	/*
	  Required: true
	  In: path
	*/
	ShowID int64
}

// BindRequest both binds and validates a request, it assumes that complex things implement a Validatable(strfmt.Registry) error interface
// for simple values it will use straight method calls.
//
// To ensure default values, the struct must have been initialized with NewPostShowsShowIDRosterReleaseParams() beforehand.
func (o *PostShowsShowIDRosterReleaseParams) BindRequest(r *http.Request, route *middleware.MatchedRoute) error {
	var res []error

	o.HTTPRequest = r

	qs := runtime.Values(r.URL.Query())

	qSendEmail, qhkSendEmail, _ := qs.GetOK("sendEmail")
	if err := o.bindSendEmail(qSendEmail, qhkSendEmail, route.Formats); err != nil {
		res = append(res, err)
	}

	rShowID, rhkShowID, _ := route.Params.GetOK("showId")
	if err := o.bindShowID(rShowID, rhkShowID, route.Formats); err != nil {
		res = append(res, err)
	}
	if len(res) > 0 {
		return errors.CompositeValidationError(res...)
	}
	return nil
}

// bindSendEmail binds and validates parameter SendEmail from query.
func (o *PostShowsShowIDRosterReleaseParams) bindSendEmail(rawData []string, hasKey bool, formats strfmt.Registry) error {
	var raw string
	if len(rawData) > 0 {
		raw = rawData[len(rawData)-1]
	}

	// Required: false
	// AllowEmptyValue: false

	if raw == "" { // empty values pass all other validations
		return nil
	}

	value, err := swag.ConvertBool(raw)
	if err != nil {
		return errors.InvalidType("sendEmail", "query", "bool", raw)
	}
	o.SendEmail = &value

	return nil
}

// bindShowID binds and validates parameter ShowID from path.
func (o *PostShowsShowIDRosterReleaseParams) bindShowID(rawData []string, hasKey bool, formats strfmt.Registry) error {
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
