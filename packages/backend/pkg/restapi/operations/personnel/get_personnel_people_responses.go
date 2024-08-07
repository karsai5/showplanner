// Code generated by go-swagger; DO NOT EDIT.

package personnel

// This file was generated by the swagger tool.
// Editing this file might prove futile when you re-run the swagger generate command

import (
	"net/http"

	"github.com/go-openapi/runtime"

	"showplanner.io/pkg/restapi/dtos"
)

// GetPersonnelPeopleOKCode is the HTTP code returned for type GetPersonnelPeopleOK
const GetPersonnelPeopleOKCode int = 200

/*
GetPersonnelPeopleOK OK

swagger:response getPersonnelPeopleOK
*/
type GetPersonnelPeopleOK struct {

	/*
	  In: Body
	*/
	Payload []*dtos.PersonDTOWithEmail `json:"body,omitempty"`
}

// NewGetPersonnelPeopleOK creates GetPersonnelPeopleOK with default headers values
func NewGetPersonnelPeopleOK() *GetPersonnelPeopleOK {

	return &GetPersonnelPeopleOK{}
}

// WithPayload adds the payload to the get personnel people o k response
func (o *GetPersonnelPeopleOK) WithPayload(payload []*dtos.PersonDTOWithEmail) *GetPersonnelPeopleOK {
	o.Payload = payload
	return o
}

// SetPayload sets the payload to the get personnel people o k response
func (o *GetPersonnelPeopleOK) SetPayload(payload []*dtos.PersonDTOWithEmail) {
	o.Payload = payload
}

// WriteResponse to the client
func (o *GetPersonnelPeopleOK) WriteResponse(rw http.ResponseWriter, producer runtime.Producer) {

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

// GetPersonnelPeopleUnauthorizedCode is the HTTP code returned for type GetPersonnelPeopleUnauthorized
const GetPersonnelPeopleUnauthorizedCode int = 401

/*
GetPersonnelPeopleUnauthorized Error

swagger:response getPersonnelPeopleUnauthorized
*/
type GetPersonnelPeopleUnauthorized struct {

	/*
	  In: Body
	*/
	Payload *dtos.Error `json:"body,omitempty"`
}

// NewGetPersonnelPeopleUnauthorized creates GetPersonnelPeopleUnauthorized with default headers values
func NewGetPersonnelPeopleUnauthorized() *GetPersonnelPeopleUnauthorized {

	return &GetPersonnelPeopleUnauthorized{}
}

// WithPayload adds the payload to the get personnel people unauthorized response
func (o *GetPersonnelPeopleUnauthorized) WithPayload(payload *dtos.Error) *GetPersonnelPeopleUnauthorized {
	o.Payload = payload
	return o
}

// SetPayload sets the payload to the get personnel people unauthorized response
func (o *GetPersonnelPeopleUnauthorized) SetPayload(payload *dtos.Error) {
	o.Payload = payload
}

// WriteResponse to the client
func (o *GetPersonnelPeopleUnauthorized) WriteResponse(rw http.ResponseWriter, producer runtime.Producer) {

	rw.WriteHeader(401)
	if o.Payload != nil {
		payload := o.Payload
		if err := producer.Produce(rw, payload); err != nil {
			panic(err) // let the recovery middleware deal with this
		}
	}
}

// GetPersonnelPeopleInternalServerErrorCode is the HTTP code returned for type GetPersonnelPeopleInternalServerError
const GetPersonnelPeopleInternalServerErrorCode int = 500

/*
GetPersonnelPeopleInternalServerError Error

swagger:response getPersonnelPeopleInternalServerError
*/
type GetPersonnelPeopleInternalServerError struct {

	/*
	  In: Body
	*/
	Payload *dtos.Error `json:"body,omitempty"`
}

// NewGetPersonnelPeopleInternalServerError creates GetPersonnelPeopleInternalServerError with default headers values
func NewGetPersonnelPeopleInternalServerError() *GetPersonnelPeopleInternalServerError {

	return &GetPersonnelPeopleInternalServerError{}
}

// WithPayload adds the payload to the get personnel people internal server error response
func (o *GetPersonnelPeopleInternalServerError) WithPayload(payload *dtos.Error) *GetPersonnelPeopleInternalServerError {
	o.Payload = payload
	return o
}

// SetPayload sets the payload to the get personnel people internal server error response
func (o *GetPersonnelPeopleInternalServerError) SetPayload(payload *dtos.Error) {
	o.Payload = payload
}

// WriteResponse to the client
func (o *GetPersonnelPeopleInternalServerError) WriteResponse(rw http.ResponseWriter, producer runtime.Producer) {

	rw.WriteHeader(500)
	if o.Payload != nil {
		payload := o.Payload
		if err := producer.Produce(rw, payload); err != nil {
			panic(err) // let the recovery middleware deal with this
		}
	}
}
