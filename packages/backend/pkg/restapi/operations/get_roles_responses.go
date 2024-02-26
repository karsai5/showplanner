// Code generated by go-swagger; DO NOT EDIT.

package operations

// This file was generated by the swagger tool.
// Editing this file might prove futile when you re-run the swagger generate command

import (
	"net/http"

	"github.com/go-openapi/runtime"

	"showplanner.io/pkg/models"
)

// GetRolesOKCode is the HTTP code returned for type GetRolesOK
const GetRolesOKCode int = 200

/*
GetRolesOK OK

swagger:response getRolesOK
*/
type GetRolesOK struct {

	/*
	  In: Body
	*/
	Payload []*models.RoleDTO `json:"body,omitempty"`
}

// NewGetRolesOK creates GetRolesOK with default headers values
func NewGetRolesOK() *GetRolesOK {

	return &GetRolesOK{}
}

// WithPayload adds the payload to the get roles o k response
func (o *GetRolesOK) WithPayload(payload []*models.RoleDTO) *GetRolesOK {
	o.Payload = payload
	return o
}

// SetPayload sets the payload to the get roles o k response
func (o *GetRolesOK) SetPayload(payload []*models.RoleDTO) {
	o.Payload = payload
}

// WriteResponse to the client
func (o *GetRolesOK) WriteResponse(rw http.ResponseWriter, producer runtime.Producer) {

	rw.WriteHeader(200)
	payload := o.Payload
	if payload == nil {
		// return empty array
		payload = make([]*models.RoleDTO, 0, 50)
	}

	if err := producer.Produce(rw, payload); err != nil {
		panic(err) // let the recovery middleware deal with this
	}
}

// GetRolesUnauthorizedCode is the HTTP code returned for type GetRolesUnauthorized
const GetRolesUnauthorizedCode int = 401

/*
GetRolesUnauthorized Error

swagger:response getRolesUnauthorized
*/
type GetRolesUnauthorized struct {

	/*
	  In: Body
	*/
	Payload *models.Error `json:"body,omitempty"`
}

// NewGetRolesUnauthorized creates GetRolesUnauthorized with default headers values
func NewGetRolesUnauthorized() *GetRolesUnauthorized {

	return &GetRolesUnauthorized{}
}

// WithPayload adds the payload to the get roles unauthorized response
func (o *GetRolesUnauthorized) WithPayload(payload *models.Error) *GetRolesUnauthorized {
	o.Payload = payload
	return o
}

// SetPayload sets the payload to the get roles unauthorized response
func (o *GetRolesUnauthorized) SetPayload(payload *models.Error) {
	o.Payload = payload
}

// WriteResponse to the client
func (o *GetRolesUnauthorized) WriteResponse(rw http.ResponseWriter, producer runtime.Producer) {

	rw.WriteHeader(401)
	if o.Payload != nil {
		payload := o.Payload
		if err := producer.Produce(rw, payload); err != nil {
			panic(err) // let the recovery middleware deal with this
		}
	}
}

// GetRolesInternalServerErrorCode is the HTTP code returned for type GetRolesInternalServerError
const GetRolesInternalServerErrorCode int = 500

/*
GetRolesInternalServerError Error

swagger:response getRolesInternalServerError
*/
type GetRolesInternalServerError struct {

	/*
	  In: Body
	*/
	Payload *models.Error `json:"body,omitempty"`
}

// NewGetRolesInternalServerError creates GetRolesInternalServerError with default headers values
func NewGetRolesInternalServerError() *GetRolesInternalServerError {

	return &GetRolesInternalServerError{}
}

// WithPayload adds the payload to the get roles internal server error response
func (o *GetRolesInternalServerError) WithPayload(payload *models.Error) *GetRolesInternalServerError {
	o.Payload = payload
	return o
}

// SetPayload sets the payload to the get roles internal server error response
func (o *GetRolesInternalServerError) SetPayload(payload *models.Error) {
	o.Payload = payload
}

// WriteResponse to the client
func (o *GetRolesInternalServerError) WriteResponse(rw http.ResponseWriter, producer runtime.Producer) {

	rw.WriteHeader(500)
	if o.Payload != nil {
		payload := o.Payload
		if err := producer.Produce(rw, payload); err != nil {
			panic(err) // let the recovery middleware deal with this
		}
	}
}
