// Code generated by go-swagger; DO NOT EDIT.

package operations

// This file was generated by the swagger tool.
// Editing this file might prove futile when you re-run the swagger generate command

import (
	"net/http"

	"github.com/go-openapi/runtime"

	"showplanner.io/pkg/models"
)

// PostEventsIDOKCode is the HTTP code returned for type PostEventsIDOK
const PostEventsIDOKCode int = 200

/*
PostEventsIDOK Show

swagger:response postEventsIdOK
*/
type PostEventsIDOK struct {

	/*
	  In: Body
	*/
	Payload *models.ShowDTO `json:"body,omitempty"`
}

// NewPostEventsIDOK creates PostEventsIDOK with default headers values
func NewPostEventsIDOK() *PostEventsIDOK {

	return &PostEventsIDOK{}
}

// WithPayload adds the payload to the post events Id o k response
func (o *PostEventsIDOK) WithPayload(payload *models.ShowDTO) *PostEventsIDOK {
	o.Payload = payload
	return o
}

// SetPayload sets the payload to the post events Id o k response
func (o *PostEventsIDOK) SetPayload(payload *models.ShowDTO) {
	o.Payload = payload
}

// WriteResponse to the client
func (o *PostEventsIDOK) WriteResponse(rw http.ResponseWriter, producer runtime.Producer) {

	rw.WriteHeader(200)
	if o.Payload != nil {
		payload := o.Payload
		if err := producer.Produce(rw, payload); err != nil {
			panic(err) // let the recovery middleware deal with this
		}
	}
}

// PostEventsIDUnauthorizedCode is the HTTP code returned for type PostEventsIDUnauthorized
const PostEventsIDUnauthorizedCode int = 401

/*
PostEventsIDUnauthorized Error

swagger:response postEventsIdUnauthorized
*/
type PostEventsIDUnauthorized struct {

	/*
	  In: Body
	*/
	Payload *models.Error `json:"body,omitempty"`
}

// NewPostEventsIDUnauthorized creates PostEventsIDUnauthorized with default headers values
func NewPostEventsIDUnauthorized() *PostEventsIDUnauthorized {

	return &PostEventsIDUnauthorized{}
}

// WithPayload adds the payload to the post events Id unauthorized response
func (o *PostEventsIDUnauthorized) WithPayload(payload *models.Error) *PostEventsIDUnauthorized {
	o.Payload = payload
	return o
}

// SetPayload sets the payload to the post events Id unauthorized response
func (o *PostEventsIDUnauthorized) SetPayload(payload *models.Error) {
	o.Payload = payload
}

// WriteResponse to the client
func (o *PostEventsIDUnauthorized) WriteResponse(rw http.ResponseWriter, producer runtime.Producer) {

	rw.WriteHeader(401)
	if o.Payload != nil {
		payload := o.Payload
		if err := producer.Produce(rw, payload); err != nil {
			panic(err) // let the recovery middleware deal with this
		}
	}
}

// PostEventsIDNotFoundCode is the HTTP code returned for type PostEventsIDNotFound
const PostEventsIDNotFoundCode int = 404

/*
PostEventsIDNotFound Error

swagger:response postEventsIdNotFound
*/
type PostEventsIDNotFound struct {

	/*
	  In: Body
	*/
	Payload *models.Error `json:"body,omitempty"`
}

// NewPostEventsIDNotFound creates PostEventsIDNotFound with default headers values
func NewPostEventsIDNotFound() *PostEventsIDNotFound {

	return &PostEventsIDNotFound{}
}

// WithPayload adds the payload to the post events Id not found response
func (o *PostEventsIDNotFound) WithPayload(payload *models.Error) *PostEventsIDNotFound {
	o.Payload = payload
	return o
}

// SetPayload sets the payload to the post events Id not found response
func (o *PostEventsIDNotFound) SetPayload(payload *models.Error) {
	o.Payload = payload
}

// WriteResponse to the client
func (o *PostEventsIDNotFound) WriteResponse(rw http.ResponseWriter, producer runtime.Producer) {

	rw.WriteHeader(404)
	if o.Payload != nil {
		payload := o.Payload
		if err := producer.Produce(rw, payload); err != nil {
			panic(err) // let the recovery middleware deal with this
		}
	}
}