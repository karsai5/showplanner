// Code generated by go-swagger; DO NOT EDIT.

package operations

// This file was generated by the swagger tool.
// Editing this file might prove futile when you re-run the swagger generate command

import (
	"net/http"

	"github.com/go-openapi/errors"
	"github.com/go-openapi/runtime"
	"github.com/go-openapi/runtime/middleware"
	"github.com/go-openapi/validate"

	"showplanner.io/pkg/restapi/dtos"
)

// NewPostAvailabilitiesParams creates a new PostAvailabilitiesParams object
//
// There are no default values defined in the spec.
func NewPostAvailabilitiesParams() PostAvailabilitiesParams {

	return PostAvailabilitiesParams{}
}

// PostAvailabilitiesParams contains all the bound params for the post availabilities operation
// typically these are obtained from a http.Request
//
// swagger:parameters PostAvailabilities
type PostAvailabilitiesParams struct {

	// HTTP Request Object
	HTTPRequest *http.Request `json:"-"`

	/*The availability to create or update
	  In: body
	*/
	Availability *dtos.AvailabilityDTO
}

// BindRequest both binds and validates a request, it assumes that complex things implement a Validatable(strfmt.Registry) error interface
// for simple values it will use straight method calls.
//
// To ensure default values, the struct must have been initialized with NewPostAvailabilitiesParams() beforehand.
func (o *PostAvailabilitiesParams) BindRequest(r *http.Request, route *middleware.MatchedRoute) error {
	var res []error

	o.HTTPRequest = r

	if runtime.HasBody(r) {
		defer r.Body.Close()
		var body dtos.AvailabilityDTO
		if err := route.Consumer.Consume(r.Body, &body); err != nil {
			res = append(res, errors.NewParseError("availability", "body", "", err))
		} else {
			// validate body object
			if err := body.Validate(route.Formats); err != nil {
				res = append(res, err)
			}

			ctx := validate.WithOperationRequest(r.Context())
			if err := body.ContextValidate(ctx, route.Formats); err != nil {
				res = append(res, err)
			}

			if len(res) == 0 {
				o.Availability = &body
			}
		}
	}
	if len(res) > 0 {
		return errors.CompositeValidationError(res...)
	}
	return nil
}
