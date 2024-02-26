// Code generated by go-swagger; DO NOT EDIT.

package operations

// This file was generated by the swagger tool.
// Editing this file might prove futile when you re-run the swagger generate command

import (
	"net/http"

	"github.com/go-openapi/runtime"

	"showplanner.io/pkg/models"
)

// PostPersonnelAssignOKCode is the HTTP code returned for type PostPersonnelAssignOK
const PostPersonnelAssignOKCode int = 200

/*
PostPersonnelAssignOK OK

swagger:response postPersonnelAssignOK
*/
type PostPersonnelAssignOK struct {
}

// NewPostPersonnelAssignOK creates PostPersonnelAssignOK with default headers values
func NewPostPersonnelAssignOK() *PostPersonnelAssignOK {

	return &PostPersonnelAssignOK{}
}

// WriteResponse to the client
func (o *PostPersonnelAssignOK) WriteResponse(rw http.ResponseWriter, producer runtime.Producer) {

	rw.Header().Del(runtime.HeaderContentType) //Remove Content-Type on empty responses

	rw.WriteHeader(200)
}

// PostPersonnelAssignUnauthorizedCode is the HTTP code returned for type PostPersonnelAssignUnauthorized
const PostPersonnelAssignUnauthorizedCode int = 401

/*
PostPersonnelAssignUnauthorized Error

swagger:response postPersonnelAssignUnauthorized
*/
type PostPersonnelAssignUnauthorized struct {

	/*
	  In: Body
	*/
	Payload *models.Error `json:"body,omitempty"`
}

// NewPostPersonnelAssignUnauthorized creates PostPersonnelAssignUnauthorized with default headers values
func NewPostPersonnelAssignUnauthorized() *PostPersonnelAssignUnauthorized {

	return &PostPersonnelAssignUnauthorized{}
}

// WithPayload adds the payload to the post personnel assign unauthorized response
func (o *PostPersonnelAssignUnauthorized) WithPayload(payload *models.Error) *PostPersonnelAssignUnauthorized {
	o.Payload = payload
	return o
}

// SetPayload sets the payload to the post personnel assign unauthorized response
func (o *PostPersonnelAssignUnauthorized) SetPayload(payload *models.Error) {
	o.Payload = payload
}

// WriteResponse to the client
func (o *PostPersonnelAssignUnauthorized) WriteResponse(rw http.ResponseWriter, producer runtime.Producer) {

	rw.WriteHeader(401)
	if o.Payload != nil {
		payload := o.Payload
		if err := producer.Produce(rw, payload); err != nil {
			panic(err) // let the recovery middleware deal with this
		}
	}
}

// PostPersonnelAssignInternalServerErrorCode is the HTTP code returned for type PostPersonnelAssignInternalServerError
const PostPersonnelAssignInternalServerErrorCode int = 500

/*
PostPersonnelAssignInternalServerError Error

swagger:response postPersonnelAssignInternalServerError
*/
type PostPersonnelAssignInternalServerError struct {

	/*
	  In: Body
	*/
	Payload *models.Error `json:"body,omitempty"`
}

// NewPostPersonnelAssignInternalServerError creates PostPersonnelAssignInternalServerError with default headers values
func NewPostPersonnelAssignInternalServerError() *PostPersonnelAssignInternalServerError {

	return &PostPersonnelAssignInternalServerError{}
}

// WithPayload adds the payload to the post personnel assign internal server error response
func (o *PostPersonnelAssignInternalServerError) WithPayload(payload *models.Error) *PostPersonnelAssignInternalServerError {
	o.Payload = payload
	return o
}

// SetPayload sets the payload to the post personnel assign internal server error response
func (o *PostPersonnelAssignInternalServerError) SetPayload(payload *models.Error) {
	o.Payload = payload
}

// WriteResponse to the client
func (o *PostPersonnelAssignInternalServerError) WriteResponse(rw http.ResponseWriter, producer runtime.Producer) {

	rw.WriteHeader(500)
	if o.Payload != nil {
		payload := o.Payload
		if err := producer.Produce(rw, payload); err != nil {
			panic(err) // let the recovery middleware deal with this
		}
	}
}
