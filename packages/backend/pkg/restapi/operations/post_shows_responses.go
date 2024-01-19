// Code generated by go-swagger; DO NOT EDIT.

package operations

// This file was generated by the swagger tool.
// Editing this file might prove futile when you re-run the swagger generate command

import (
	"net/http"

	"github.com/go-openapi/runtime"

	"showplanner.io/pkg/models"
)

// PostShowsOKCode is the HTTP code returned for type PostShowsOK
const PostShowsOKCode int = 200

/*
PostShowsOK OK

swagger:response postShowsOK
*/
type PostShowsOK struct {

	/*
	  In: Body
	*/
	Payload *models.ShowDTO `json:"body,omitempty"`
}

// NewPostShowsOK creates PostShowsOK with default headers values
func NewPostShowsOK() *PostShowsOK {

	return &PostShowsOK{}
}

// WithPayload adds the payload to the post shows o k response
func (o *PostShowsOK) WithPayload(payload *models.ShowDTO) *PostShowsOK {
	o.Payload = payload
	return o
}

// SetPayload sets the payload to the post shows o k response
func (o *PostShowsOK) SetPayload(payload *models.ShowDTO) {
	o.Payload = payload
}

// WriteResponse to the client
func (o *PostShowsOK) WriteResponse(rw http.ResponseWriter, producer runtime.Producer) {

	rw.WriteHeader(200)
	if o.Payload != nil {
		payload := o.Payload
		if err := producer.Produce(rw, payload); err != nil {
			panic(err) // let the recovery middleware deal with this
		}
	}
}

// PostShowsBadRequestCode is the HTTP code returned for type PostShowsBadRequest
const PostShowsBadRequestCode int = 400

/*
PostShowsBadRequest Error

swagger:response postShowsBadRequest
*/
type PostShowsBadRequest struct {

	/*
	  In: Body
	*/
	Payload *models.Error `json:"body,omitempty"`
}

// NewPostShowsBadRequest creates PostShowsBadRequest with default headers values
func NewPostShowsBadRequest() *PostShowsBadRequest {

	return &PostShowsBadRequest{}
}

// WithPayload adds the payload to the post shows bad request response
func (o *PostShowsBadRequest) WithPayload(payload *models.Error) *PostShowsBadRequest {
	o.Payload = payload
	return o
}

// SetPayload sets the payload to the post shows bad request response
func (o *PostShowsBadRequest) SetPayload(payload *models.Error) {
	o.Payload = payload
}

// WriteResponse to the client
func (o *PostShowsBadRequest) WriteResponse(rw http.ResponseWriter, producer runtime.Producer) {

	rw.WriteHeader(400)
	if o.Payload != nil {
		payload := o.Payload
		if err := producer.Produce(rw, payload); err != nil {
			panic(err) // let the recovery middleware deal with this
		}
	}
}

// PostShowsUnauthorizedCode is the HTTP code returned for type PostShowsUnauthorized
const PostShowsUnauthorizedCode int = 401

/*
PostShowsUnauthorized Error

swagger:response postShowsUnauthorized
*/
type PostShowsUnauthorized struct {

	/*
	  In: Body
	*/
	Payload *models.Error `json:"body,omitempty"`
}

// NewPostShowsUnauthorized creates PostShowsUnauthorized with default headers values
func NewPostShowsUnauthorized() *PostShowsUnauthorized {

	return &PostShowsUnauthorized{}
}

// WithPayload adds the payload to the post shows unauthorized response
func (o *PostShowsUnauthorized) WithPayload(payload *models.Error) *PostShowsUnauthorized {
	o.Payload = payload
	return o
}

// SetPayload sets the payload to the post shows unauthorized response
func (o *PostShowsUnauthorized) SetPayload(payload *models.Error) {
	o.Payload = payload
}

// WriteResponse to the client
func (o *PostShowsUnauthorized) WriteResponse(rw http.ResponseWriter, producer runtime.Producer) {

	rw.WriteHeader(401)
	if o.Payload != nil {
		payload := o.Payload
		if err := producer.Produce(rw, payload); err != nil {
			panic(err) // let the recovery middleware deal with this
		}
	}
}

// PostShowsInternalServerErrorCode is the HTTP code returned for type PostShowsInternalServerError
const PostShowsInternalServerErrorCode int = 500

/*
PostShowsInternalServerError Internal server error

swagger:response postShowsInternalServerError
*/
type PostShowsInternalServerError struct {
}

// NewPostShowsInternalServerError creates PostShowsInternalServerError with default headers values
func NewPostShowsInternalServerError() *PostShowsInternalServerError {

	return &PostShowsInternalServerError{}
}

// WriteResponse to the client
func (o *PostShowsInternalServerError) WriteResponse(rw http.ResponseWriter, producer runtime.Producer) {

	rw.Header().Del(runtime.HeaderContentType) //Remove Content-Type on empty responses

	rw.WriteHeader(500)
}
