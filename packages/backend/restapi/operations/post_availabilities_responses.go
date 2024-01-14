// Code generated by go-swagger; DO NOT EDIT.

package operations

// This file was generated by the swagger tool.
// Editing this file might prove futile when you re-run the swagger generate command

import (
	"net/http"

	"github.com/go-openapi/runtime"

	"go-backend/models"
)

// PostAvailabilitiesOKCode is the HTTP code returned for type PostAvailabilitiesOK
const PostAvailabilitiesOKCode int = 200

/*
PostAvailabilitiesOK OK

swagger:response postAvailabilitiesOK
*/
type PostAvailabilitiesOK struct {

	/*
	  In: Body
	*/
	Payload *models.AvailabilityDTO `json:"body,omitempty"`
}

// NewPostAvailabilitiesOK creates PostAvailabilitiesOK with default headers values
func NewPostAvailabilitiesOK() *PostAvailabilitiesOK {

	return &PostAvailabilitiesOK{}
}

// WithPayload adds the payload to the post availabilities o k response
func (o *PostAvailabilitiesOK) WithPayload(payload *models.AvailabilityDTO) *PostAvailabilitiesOK {
	o.Payload = payload
	return o
}

// SetPayload sets the payload to the post availabilities o k response
func (o *PostAvailabilitiesOK) SetPayload(payload *models.AvailabilityDTO) {
	o.Payload = payload
}

// WriteResponse to the client
func (o *PostAvailabilitiesOK) WriteResponse(rw http.ResponseWriter, producer runtime.Producer) {

	rw.WriteHeader(200)
	if o.Payload != nil {
		payload := o.Payload
		if err := producer.Produce(rw, payload); err != nil {
			panic(err) // let the recovery middleware deal with this
		}
	}
}

// PostAvailabilitiesUnauthorizedCode is the HTTP code returned for type PostAvailabilitiesUnauthorized
const PostAvailabilitiesUnauthorizedCode int = 401

/*
PostAvailabilitiesUnauthorized Error

swagger:response postAvailabilitiesUnauthorized
*/
type PostAvailabilitiesUnauthorized struct {

	/*
	  In: Body
	*/
	Payload *models.Error `json:"body,omitempty"`
}

// NewPostAvailabilitiesUnauthorized creates PostAvailabilitiesUnauthorized with default headers values
func NewPostAvailabilitiesUnauthorized() *PostAvailabilitiesUnauthorized {

	return &PostAvailabilitiesUnauthorized{}
}

// WithPayload adds the payload to the post availabilities unauthorized response
func (o *PostAvailabilitiesUnauthorized) WithPayload(payload *models.Error) *PostAvailabilitiesUnauthorized {
	o.Payload = payload
	return o
}

// SetPayload sets the payload to the post availabilities unauthorized response
func (o *PostAvailabilitiesUnauthorized) SetPayload(payload *models.Error) {
	o.Payload = payload
}

// WriteResponse to the client
func (o *PostAvailabilitiesUnauthorized) WriteResponse(rw http.ResponseWriter, producer runtime.Producer) {

	rw.WriteHeader(401)
	if o.Payload != nil {
		payload := o.Payload
		if err := producer.Produce(rw, payload); err != nil {
			panic(err) // let the recovery middleware deal with this
		}
	}
}

// PostAvailabilitiesInternalServerErrorCode is the HTTP code returned for type PostAvailabilitiesInternalServerError
const PostAvailabilitiesInternalServerErrorCode int = 500

/*
PostAvailabilitiesInternalServerError Internal server error

swagger:response postAvailabilitiesInternalServerError
*/
type PostAvailabilitiesInternalServerError struct {
}

// NewPostAvailabilitiesInternalServerError creates PostAvailabilitiesInternalServerError with default headers values
func NewPostAvailabilitiesInternalServerError() *PostAvailabilitiesInternalServerError {

	return &PostAvailabilitiesInternalServerError{}
}

// WriteResponse to the client
func (o *PostAvailabilitiesInternalServerError) WriteResponse(rw http.ResponseWriter, producer runtime.Producer) {

	rw.Header().Del(runtime.HeaderContentType) //Remove Content-Type on empty responses

	rw.WriteHeader(500)
}
