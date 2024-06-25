// Code generated by go-swagger; DO NOT EDIT.

package personnel

// This file was generated by the swagger tool.
// Editing this file might prove futile when you re-run the swagger generate command

import (
	"net/http"

	"github.com/go-openapi/runtime"

	"showplanner.io/pkg/models"
)

// PostMeOKCode is the HTTP code returned for type PostMeOK
const PostMeOKCode int = 200

/*
PostMeOK OK

swagger:response postMeOK
*/
type PostMeOK struct {
}

// NewPostMeOK creates PostMeOK with default headers values
func NewPostMeOK() *PostMeOK {

	return &PostMeOK{}
}

// WriteResponse to the client
func (o *PostMeOK) WriteResponse(rw http.ResponseWriter, producer runtime.Producer) {

	rw.Header().Del(runtime.HeaderContentType) //Remove Content-Type on empty responses

	rw.WriteHeader(200)
}

// PostMeUnauthorizedCode is the HTTP code returned for type PostMeUnauthorized
const PostMeUnauthorizedCode int = 401

/*
PostMeUnauthorized Error

swagger:response postMeUnauthorized
*/
type PostMeUnauthorized struct {

	/*
	  In: Body
	*/
	Payload *models.Error `json:"body,omitempty"`
}

// NewPostMeUnauthorized creates PostMeUnauthorized with default headers values
func NewPostMeUnauthorized() *PostMeUnauthorized {

	return &PostMeUnauthorized{}
}

// WithPayload adds the payload to the post me unauthorized response
func (o *PostMeUnauthorized) WithPayload(payload *models.Error) *PostMeUnauthorized {
	o.Payload = payload
	return o
}

// SetPayload sets the payload to the post me unauthorized response
func (o *PostMeUnauthorized) SetPayload(payload *models.Error) {
	o.Payload = payload
}

// WriteResponse to the client
func (o *PostMeUnauthorized) WriteResponse(rw http.ResponseWriter, producer runtime.Producer) {

	rw.WriteHeader(401)
	if o.Payload != nil {
		payload := o.Payload
		if err := producer.Produce(rw, payload); err != nil {
			panic(err) // let the recovery middleware deal with this
		}
	}
}

// PostMeInternalServerErrorCode is the HTTP code returned for type PostMeInternalServerError
const PostMeInternalServerErrorCode int = 500

/*
PostMeInternalServerError Internal server error

swagger:response postMeInternalServerError
*/
type PostMeInternalServerError struct {
}

// NewPostMeInternalServerError creates PostMeInternalServerError with default headers values
func NewPostMeInternalServerError() *PostMeInternalServerError {

	return &PostMeInternalServerError{}
}

// WriteResponse to the client
func (o *PostMeInternalServerError) WriteResponse(rw http.ResponseWriter, producer runtime.Producer) {

	rw.Header().Del(runtime.HeaderContentType) //Remove Content-Type on empty responses

	rw.WriteHeader(500)
}