// Code generated by go-swagger; DO NOT EDIT.

package operations

// This file was generated by the swagger tool.
// Editing this file might prove futile when you re-run the swagger generate command

import (
	"net/http"

	"github.com/go-openapi/runtime"

	"showplanner.io/pkg/restapi/dtos"
)

// DeleteEventsIDOKCode is the HTTP code returned for type DeleteEventsIDOK
const DeleteEventsIDOKCode int = 200

/*
DeleteEventsIDOK OK

swagger:response deleteEventsIdOK
*/
type DeleteEventsIDOK struct {
}

// NewDeleteEventsIDOK creates DeleteEventsIDOK with default headers values
func NewDeleteEventsIDOK() *DeleteEventsIDOK {

	return &DeleteEventsIDOK{}
}

// WriteResponse to the client
func (o *DeleteEventsIDOK) WriteResponse(rw http.ResponseWriter, producer runtime.Producer) {

	rw.Header().Del(runtime.HeaderContentType) //Remove Content-Type on empty responses

	rw.WriteHeader(200)
}

// DeleteEventsIDUnauthorizedCode is the HTTP code returned for type DeleteEventsIDUnauthorized
const DeleteEventsIDUnauthorizedCode int = 401

/*
DeleteEventsIDUnauthorized Error

swagger:response deleteEventsIdUnauthorized
*/
type DeleteEventsIDUnauthorized struct {

	/*
	  In: Body
	*/
	Payload *dtos.Error `json:"body,omitempty"`
}

// NewDeleteEventsIDUnauthorized creates DeleteEventsIDUnauthorized with default headers values
func NewDeleteEventsIDUnauthorized() *DeleteEventsIDUnauthorized {

	return &DeleteEventsIDUnauthorized{}
}

// WithPayload adds the payload to the delete events Id unauthorized response
func (o *DeleteEventsIDUnauthorized) WithPayload(payload *dtos.Error) *DeleteEventsIDUnauthorized {
	o.Payload = payload
	return o
}

// SetPayload sets the payload to the delete events Id unauthorized response
func (o *DeleteEventsIDUnauthorized) SetPayload(payload *dtos.Error) {
	o.Payload = payload
}

// WriteResponse to the client
func (o *DeleteEventsIDUnauthorized) WriteResponse(rw http.ResponseWriter, producer runtime.Producer) {

	rw.WriteHeader(401)
	if o.Payload != nil {
		payload := o.Payload
		if err := producer.Produce(rw, payload); err != nil {
			panic(err) // let the recovery middleware deal with this
		}
	}
}

// DeleteEventsIDNotFoundCode is the HTTP code returned for type DeleteEventsIDNotFound
const DeleteEventsIDNotFoundCode int = 404

/*
DeleteEventsIDNotFound Error

swagger:response deleteEventsIdNotFound
*/
type DeleteEventsIDNotFound struct {

	/*
	  In: Body
	*/
	Payload *dtos.Error `json:"body,omitempty"`
}

// NewDeleteEventsIDNotFound creates DeleteEventsIDNotFound with default headers values
func NewDeleteEventsIDNotFound() *DeleteEventsIDNotFound {

	return &DeleteEventsIDNotFound{}
}

// WithPayload adds the payload to the delete events Id not found response
func (o *DeleteEventsIDNotFound) WithPayload(payload *dtos.Error) *DeleteEventsIDNotFound {
	o.Payload = payload
	return o
}

// SetPayload sets the payload to the delete events Id not found response
func (o *DeleteEventsIDNotFound) SetPayload(payload *dtos.Error) {
	o.Payload = payload
}

// WriteResponse to the client
func (o *DeleteEventsIDNotFound) WriteResponse(rw http.ResponseWriter, producer runtime.Producer) {

	rw.WriteHeader(404)
	if o.Payload != nil {
		payload := o.Payload
		if err := producer.Produce(rw, payload); err != nil {
			panic(err) // let the recovery middleware deal with this
		}
	}
}

// DeleteEventsIDInternalServerErrorCode is the HTTP code returned for type DeleteEventsIDInternalServerError
const DeleteEventsIDInternalServerErrorCode int = 500

/*
DeleteEventsIDInternalServerError Error

swagger:response deleteEventsIdInternalServerError
*/
type DeleteEventsIDInternalServerError struct {

	/*
	  In: Body
	*/
	Payload *dtos.Error `json:"body,omitempty"`
}

// NewDeleteEventsIDInternalServerError creates DeleteEventsIDInternalServerError with default headers values
func NewDeleteEventsIDInternalServerError() *DeleteEventsIDInternalServerError {

	return &DeleteEventsIDInternalServerError{}
}

// WithPayload adds the payload to the delete events Id internal server error response
func (o *DeleteEventsIDInternalServerError) WithPayload(payload *dtos.Error) *DeleteEventsIDInternalServerError {
	o.Payload = payload
	return o
}

// SetPayload sets the payload to the delete events Id internal server error response
func (o *DeleteEventsIDInternalServerError) SetPayload(payload *dtos.Error) {
	o.Payload = payload
}

// WriteResponse to the client
func (o *DeleteEventsIDInternalServerError) WriteResponse(rw http.ResponseWriter, producer runtime.Producer) {

	rw.WriteHeader(500)
	if o.Payload != nil {
		payload := o.Payload
		if err := producer.Produce(rw, payload); err != nil {
			panic(err) // let the recovery middleware deal with this
		}
	}
}
