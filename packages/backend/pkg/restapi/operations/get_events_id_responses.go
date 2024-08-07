// Code generated by go-swagger; DO NOT EDIT.

package operations

// This file was generated by the swagger tool.
// Editing this file might prove futile when you re-run the swagger generate command

import (
	"net/http"

	"github.com/go-openapi/runtime"

	"showplanner.io/pkg/restapi/dtos"
)

// GetEventsIDOKCode is the HTTP code returned for type GetEventsIDOK
const GetEventsIDOKCode int = 200

/*
GetEventsIDOK OK

swagger:response getEventsIdOK
*/
type GetEventsIDOK struct {

	/*
	  In: Body
	*/
	Payload *dtos.EventDTO `json:"body,omitempty"`
}

// NewGetEventsIDOK creates GetEventsIDOK with default headers values
func NewGetEventsIDOK() *GetEventsIDOK {

	return &GetEventsIDOK{}
}

// WithPayload adds the payload to the get events Id o k response
func (o *GetEventsIDOK) WithPayload(payload *dtos.EventDTO) *GetEventsIDOK {
	o.Payload = payload
	return o
}

// SetPayload sets the payload to the get events Id o k response
func (o *GetEventsIDOK) SetPayload(payload *dtos.EventDTO) {
	o.Payload = payload
}

// WriteResponse to the client
func (o *GetEventsIDOK) WriteResponse(rw http.ResponseWriter, producer runtime.Producer) {

	rw.WriteHeader(200)
	if o.Payload != nil {
		payload := o.Payload
		if err := producer.Produce(rw, payload); err != nil {
			panic(err) // let the recovery middleware deal with this
		}
	}
}

// GetEventsIDUnauthorizedCode is the HTTP code returned for type GetEventsIDUnauthorized
const GetEventsIDUnauthorizedCode int = 401

/*
GetEventsIDUnauthorized Error

swagger:response getEventsIdUnauthorized
*/
type GetEventsIDUnauthorized struct {

	/*
	  In: Body
	*/
	Payload *dtos.Error `json:"body,omitempty"`
}

// NewGetEventsIDUnauthorized creates GetEventsIDUnauthorized with default headers values
func NewGetEventsIDUnauthorized() *GetEventsIDUnauthorized {

	return &GetEventsIDUnauthorized{}
}

// WithPayload adds the payload to the get events Id unauthorized response
func (o *GetEventsIDUnauthorized) WithPayload(payload *dtos.Error) *GetEventsIDUnauthorized {
	o.Payload = payload
	return o
}

// SetPayload sets the payload to the get events Id unauthorized response
func (o *GetEventsIDUnauthorized) SetPayload(payload *dtos.Error) {
	o.Payload = payload
}

// WriteResponse to the client
func (o *GetEventsIDUnauthorized) WriteResponse(rw http.ResponseWriter, producer runtime.Producer) {

	rw.WriteHeader(401)
	if o.Payload != nil {
		payload := o.Payload
		if err := producer.Produce(rw, payload); err != nil {
			panic(err) // let the recovery middleware deal with this
		}
	}
}

// GetEventsIDNotFoundCode is the HTTP code returned for type GetEventsIDNotFound
const GetEventsIDNotFoundCode int = 404

/*
GetEventsIDNotFound Error

swagger:response getEventsIdNotFound
*/
type GetEventsIDNotFound struct {

	/*
	  In: Body
	*/
	Payload *dtos.Error `json:"body,omitempty"`
}

// NewGetEventsIDNotFound creates GetEventsIDNotFound with default headers values
func NewGetEventsIDNotFound() *GetEventsIDNotFound {

	return &GetEventsIDNotFound{}
}

// WithPayload adds the payload to the get events Id not found response
func (o *GetEventsIDNotFound) WithPayload(payload *dtos.Error) *GetEventsIDNotFound {
	o.Payload = payload
	return o
}

// SetPayload sets the payload to the get events Id not found response
func (o *GetEventsIDNotFound) SetPayload(payload *dtos.Error) {
	o.Payload = payload
}

// WriteResponse to the client
func (o *GetEventsIDNotFound) WriteResponse(rw http.ResponseWriter, producer runtime.Producer) {

	rw.WriteHeader(404)
	if o.Payload != nil {
		payload := o.Payload
		if err := producer.Produce(rw, payload); err != nil {
			panic(err) // let the recovery middleware deal with this
		}
	}
}

// GetEventsIDInternalServerErrorCode is the HTTP code returned for type GetEventsIDInternalServerError
const GetEventsIDInternalServerErrorCode int = 500

/*
GetEventsIDInternalServerError Error

swagger:response getEventsIdInternalServerError
*/
type GetEventsIDInternalServerError struct {

	/*
	  In: Body
	*/
	Payload *dtos.Error `json:"body,omitempty"`
}

// NewGetEventsIDInternalServerError creates GetEventsIDInternalServerError with default headers values
func NewGetEventsIDInternalServerError() *GetEventsIDInternalServerError {

	return &GetEventsIDInternalServerError{}
}

// WithPayload adds the payload to the get events Id internal server error response
func (o *GetEventsIDInternalServerError) WithPayload(payload *dtos.Error) *GetEventsIDInternalServerError {
	o.Payload = payload
	return o
}

// SetPayload sets the payload to the get events Id internal server error response
func (o *GetEventsIDInternalServerError) SetPayload(payload *dtos.Error) {
	o.Payload = payload
}

// WriteResponse to the client
func (o *GetEventsIDInternalServerError) WriteResponse(rw http.ResponseWriter, producer runtime.Producer) {

	rw.WriteHeader(500)
	if o.Payload != nil {
		payload := o.Payload
		if err := producer.Produce(rw, payload); err != nil {
			panic(err) // let the recovery middleware deal with this
		}
	}
}
