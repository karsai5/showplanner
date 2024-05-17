// Code generated by go-swagger; DO NOT EDIT.

package operations

// This file was generated by the swagger tool.
// Editing this file might prove futile when you re-run the swagger generate command

import (
	"net/http"

	"github.com/go-openapi/runtime"

	"showplanner.io/pkg/models"
)

// PostImpersonateOKCode is the HTTP code returned for type PostImpersonateOK
const PostImpersonateOKCode int = 200

/*
PostImpersonateOK OK

swagger:response postImpersonateOK
*/
type PostImpersonateOK struct {
}

// NewPostImpersonateOK creates PostImpersonateOK with default headers values
func NewPostImpersonateOK() *PostImpersonateOK {

	return &PostImpersonateOK{}
}

// WriteResponse to the client
func (o *PostImpersonateOK) WriteResponse(rw http.ResponseWriter, producer runtime.Producer) {

	rw.Header().Del(runtime.HeaderContentType) //Remove Content-Type on empty responses

	rw.WriteHeader(200)
}

// PostImpersonateUnauthorizedCode is the HTTP code returned for type PostImpersonateUnauthorized
const PostImpersonateUnauthorizedCode int = 401

/*
PostImpersonateUnauthorized Error

swagger:response postImpersonateUnauthorized
*/
type PostImpersonateUnauthorized struct {

	/*
	  In: Body
	*/
	Payload *models.Error `json:"body,omitempty"`
}

// NewPostImpersonateUnauthorized creates PostImpersonateUnauthorized with default headers values
func NewPostImpersonateUnauthorized() *PostImpersonateUnauthorized {

	return &PostImpersonateUnauthorized{}
}

// WithPayload adds the payload to the post impersonate unauthorized response
func (o *PostImpersonateUnauthorized) WithPayload(payload *models.Error) *PostImpersonateUnauthorized {
	o.Payload = payload
	return o
}

// SetPayload sets the payload to the post impersonate unauthorized response
func (o *PostImpersonateUnauthorized) SetPayload(payload *models.Error) {
	o.Payload = payload
}

// WriteResponse to the client
func (o *PostImpersonateUnauthorized) WriteResponse(rw http.ResponseWriter, producer runtime.Producer) {

	rw.WriteHeader(401)
	if o.Payload != nil {
		payload := o.Payload
		if err := producer.Produce(rw, payload); err != nil {
			panic(err) // let the recovery middleware deal with this
		}
	}
}

// PostImpersonateInternalServerErrorCode is the HTTP code returned for type PostImpersonateInternalServerError
const PostImpersonateInternalServerErrorCode int = 500

/*
PostImpersonateInternalServerError Internal server error

swagger:response postImpersonateInternalServerError
*/
type PostImpersonateInternalServerError struct {
}

// NewPostImpersonateInternalServerError creates PostImpersonateInternalServerError with default headers values
func NewPostImpersonateInternalServerError() *PostImpersonateInternalServerError {

	return &PostImpersonateInternalServerError{}
}

// WriteResponse to the client
func (o *PostImpersonateInternalServerError) WriteResponse(rw http.ResponseWriter, producer runtime.Producer) {

	rw.Header().Del(runtime.HeaderContentType) //Remove Content-Type on empty responses

	rw.WriteHeader(500)
}
