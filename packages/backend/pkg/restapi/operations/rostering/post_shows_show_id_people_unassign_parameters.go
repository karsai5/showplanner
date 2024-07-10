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
	"github.com/go-openapi/validate"
)

// NewPostShowsShowIDPeopleUnassignParams creates a new PostShowsShowIDPeopleUnassignParams object
//
// There are no default values defined in the spec.
func NewPostShowsShowIDPeopleUnassignParams() PostShowsShowIDPeopleUnassignParams {

	return PostShowsShowIDPeopleUnassignParams{}
}

// PostShowsShowIDPeopleUnassignParams contains all the bound params for the post shows show ID people unassign operation
// typically these are obtained from a http.Request
//
// swagger:parameters PostShowsShowIDPeopleUnassign
type PostShowsShowIDPeopleUnassignParams struct {

	// HTTP Request Object
	HTTPRequest *http.Request `json:"-"`

	/*
	  Required: true
	  In: query
	*/
	PersonID strfmt.UUID
	/*
	  Required: true
	  In: path
	*/
	ShowID int64
}

// BindRequest both binds and validates a request, it assumes that complex things implement a Validatable(strfmt.Registry) error interface
// for simple values it will use straight method calls.
//
// To ensure default values, the struct must have been initialized with NewPostShowsShowIDPeopleUnassignParams() beforehand.
func (o *PostShowsShowIDPeopleUnassignParams) BindRequest(r *http.Request, route *middleware.MatchedRoute) error {
	var res []error

	o.HTTPRequest = r

	qs := runtime.Values(r.URL.Query())

	qPersonID, qhkPersonID, _ := qs.GetOK("personId")
	if err := o.bindPersonID(qPersonID, qhkPersonID, route.Formats); err != nil {
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

// bindPersonID binds and validates parameter PersonID from query.
func (o *PostShowsShowIDPeopleUnassignParams) bindPersonID(rawData []string, hasKey bool, formats strfmt.Registry) error {
	if !hasKey {
		return errors.Required("personId", "query", rawData)
	}
	var raw string
	if len(rawData) > 0 {
		raw = rawData[len(rawData)-1]
	}

	// Required: true
	// AllowEmptyValue: false

	if err := validate.RequiredString("personId", "query", raw); err != nil {
		return err
	}

	// Format: uuid
	value, err := formats.Parse("uuid", raw)
	if err != nil {
		return errors.InvalidType("personId", "query", "strfmt.UUID", raw)
	}
	o.PersonID = *(value.(*strfmt.UUID))

	if err := o.validatePersonID(formats); err != nil {
		return err
	}

	return nil
}

// validatePersonID carries on validations for parameter PersonID
func (o *PostShowsShowIDPeopleUnassignParams) validatePersonID(formats strfmt.Registry) error {

	if err := validate.FormatOf("personId", "query", "uuid", o.PersonID.String(), formats); err != nil {
		return err
	}
	return nil
}

// bindShowID binds and validates parameter ShowID from path.
func (o *PostShowsShowIDPeopleUnassignParams) bindShowID(rawData []string, hasKey bool, formats strfmt.Registry) error {
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