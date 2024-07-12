// Code generated by go-swagger; DO NOT EDIT.

package operations

// This file was generated by the swagger tool.
// Editing this file might prove futile when you re-run the swagger generate command

import (
	"net/http"

	"github.com/go-openapi/runtime"

	"showplanner.io/pkg/restapi/dtos"
)

// GetPersonnelAssignedOKCode is the HTTP code returned for type GetPersonnelAssignedOK
const GetPersonnelAssignedOKCode int = 200

/*
GetPersonnelAssignedOK OK

swagger:response getPersonnelAssignedOK
*/
type GetPersonnelAssignedOK struct {

	/*
	  In: Body
	*/
	Payload []*dtos.PersonDTOWithEmail `json:"body,omitempty"`
}

// NewGetPersonnelAssignedOK creates GetPersonnelAssignedOK with default headers values
func NewGetPersonnelAssignedOK() *GetPersonnelAssignedOK {

	return &GetPersonnelAssignedOK{}
}

// WithPayload adds the payload to the get personnel assigned o k response
func (o *GetPersonnelAssignedOK) WithPayload(payload []*dtos.PersonDTOWithEmail) *GetPersonnelAssignedOK {
	o.Payload = payload
	return o
}

// SetPayload sets the payload to the get personnel assigned o k response
func (o *GetPersonnelAssignedOK) SetPayload(payload []*dtos.PersonDTOWithEmail) {
	o.Payload = payload
}

// WriteResponse to the client
func (o *GetPersonnelAssignedOK) WriteResponse(rw http.ResponseWriter, producer runtime.Producer) {

	rw.WriteHeader(200)
	payload := o.Payload
	if payload == nil {
		// return empty array
		payload = make([]*dtos.PersonDTOWithEmail, 0, 50)
	}

	if err := producer.Produce(rw, payload); err != nil {
		panic(err) // let the recovery middleware deal with this
	}
}

// GetPersonnelAssignedUnauthorizedCode is the HTTP code returned for type GetPersonnelAssignedUnauthorized
const GetPersonnelAssignedUnauthorizedCode int = 401

/*
GetPersonnelAssignedUnauthorized Error

swagger:response getPersonnelAssignedUnauthorized
*/
type GetPersonnelAssignedUnauthorized struct {

	/*
	  In: Body
	*/
	Payload *dtos.Error `json:"body,omitempty"`
}

// NewGetPersonnelAssignedUnauthorized creates GetPersonnelAssignedUnauthorized with default headers values
func NewGetPersonnelAssignedUnauthorized() *GetPersonnelAssignedUnauthorized {

	return &GetPersonnelAssignedUnauthorized{}
}

// WithPayload adds the payload to the get personnel assigned unauthorized response
func (o *GetPersonnelAssignedUnauthorized) WithPayload(payload *dtos.Error) *GetPersonnelAssignedUnauthorized {
	o.Payload = payload
	return o
}

// SetPayload sets the payload to the get personnel assigned unauthorized response
func (o *GetPersonnelAssignedUnauthorized) SetPayload(payload *dtos.Error) {
	o.Payload = payload
}

// WriteResponse to the client
func (o *GetPersonnelAssignedUnauthorized) WriteResponse(rw http.ResponseWriter, producer runtime.Producer) {

	rw.WriteHeader(401)
	if o.Payload != nil {
		payload := o.Payload
		if err := producer.Produce(rw, payload); err != nil {
			panic(err) // let the recovery middleware deal with this
		}
	}
}

// GetPersonnelAssignedInternalServerErrorCode is the HTTP code returned for type GetPersonnelAssignedInternalServerError
const GetPersonnelAssignedInternalServerErrorCode int = 500

/*
GetPersonnelAssignedInternalServerError Error

swagger:response getPersonnelAssignedInternalServerError
*/
type GetPersonnelAssignedInternalServerError struct {

	/*
	  In: Body
	*/
	Payload *dtos.Error `json:"body,omitempty"`
}

// NewGetPersonnelAssignedInternalServerError creates GetPersonnelAssignedInternalServerError with default headers values
func NewGetPersonnelAssignedInternalServerError() *GetPersonnelAssignedInternalServerError {

	return &GetPersonnelAssignedInternalServerError{}
}

// WithPayload adds the payload to the get personnel assigned internal server error response
func (o *GetPersonnelAssignedInternalServerError) WithPayload(payload *dtos.Error) *GetPersonnelAssignedInternalServerError {
	o.Payload = payload
	return o
}

// SetPayload sets the payload to the get personnel assigned internal server error response
func (o *GetPersonnelAssignedInternalServerError) SetPayload(payload *dtos.Error) {
	o.Payload = payload
}

// WriteResponse to the client
func (o *GetPersonnelAssignedInternalServerError) WriteResponse(rw http.ResponseWriter, producer runtime.Producer) {

	rw.WriteHeader(500)
	if o.Payload != nil {
		payload := o.Payload
		if err := producer.Produce(rw, payload); err != nil {
			panic(err) // let the recovery middleware deal with this
		}
	}
}
