// Code generated by go-swagger; DO NOT EDIT.

package rostering

// This file was generated by the swagger tool.
// Editing this file might prove futile when you re-run the swagger generate command

import (
	"net/http"

	"github.com/go-openapi/runtime"

	"showplanner.io/pkg/restapi/dtos"
)

// PostShowsShowIDRolesSetorderOKCode is the HTTP code returned for type PostShowsShowIDRolesSetorderOK
const PostShowsShowIDRolesSetorderOKCode int = 200

/*
PostShowsShowIDRolesSetorderOK OK

swagger:response postShowsShowIdRolesSetorderOK
*/
type PostShowsShowIDRolesSetorderOK struct {
}

// NewPostShowsShowIDRolesSetorderOK creates PostShowsShowIDRolesSetorderOK with default headers values
func NewPostShowsShowIDRolesSetorderOK() *PostShowsShowIDRolesSetorderOK {

	return &PostShowsShowIDRolesSetorderOK{}
}

// WriteResponse to the client
func (o *PostShowsShowIDRolesSetorderOK) WriteResponse(rw http.ResponseWriter, producer runtime.Producer) {

	rw.Header().Del(runtime.HeaderContentType) //Remove Content-Type on empty responses

	rw.WriteHeader(200)
}

// PostShowsShowIDRolesSetorderUnauthorizedCode is the HTTP code returned for type PostShowsShowIDRolesSetorderUnauthorized
const PostShowsShowIDRolesSetorderUnauthorizedCode int = 401

/*
PostShowsShowIDRolesSetorderUnauthorized Error

swagger:response postShowsShowIdRolesSetorderUnauthorized
*/
type PostShowsShowIDRolesSetorderUnauthorized struct {

	/*
	  In: Body
	*/
	Payload *dtos.Error `json:"body,omitempty"`
}

// NewPostShowsShowIDRolesSetorderUnauthorized creates PostShowsShowIDRolesSetorderUnauthorized with default headers values
func NewPostShowsShowIDRolesSetorderUnauthorized() *PostShowsShowIDRolesSetorderUnauthorized {

	return &PostShowsShowIDRolesSetorderUnauthorized{}
}

// WithPayload adds the payload to the post shows show Id roles setorder unauthorized response
func (o *PostShowsShowIDRolesSetorderUnauthorized) WithPayload(payload *dtos.Error) *PostShowsShowIDRolesSetorderUnauthorized {
	o.Payload = payload
	return o
}

// SetPayload sets the payload to the post shows show Id roles setorder unauthorized response
func (o *PostShowsShowIDRolesSetorderUnauthorized) SetPayload(payload *dtos.Error) {
	o.Payload = payload
}

// WriteResponse to the client
func (o *PostShowsShowIDRolesSetorderUnauthorized) WriteResponse(rw http.ResponseWriter, producer runtime.Producer) {

	rw.WriteHeader(401)
	if o.Payload != nil {
		payload := o.Payload
		if err := producer.Produce(rw, payload); err != nil {
			panic(err) // let the recovery middleware deal with this
		}
	}
}

// PostShowsShowIDRolesSetorderInternalServerErrorCode is the HTTP code returned for type PostShowsShowIDRolesSetorderInternalServerError
const PostShowsShowIDRolesSetorderInternalServerErrorCode int = 500

/*
PostShowsShowIDRolesSetorderInternalServerError Error

swagger:response postShowsShowIdRolesSetorderInternalServerError
*/
type PostShowsShowIDRolesSetorderInternalServerError struct {

	/*
	  In: Body
	*/
	Payload *dtos.Error `json:"body,omitempty"`
}

// NewPostShowsShowIDRolesSetorderInternalServerError creates PostShowsShowIDRolesSetorderInternalServerError with default headers values
func NewPostShowsShowIDRolesSetorderInternalServerError() *PostShowsShowIDRolesSetorderInternalServerError {

	return &PostShowsShowIDRolesSetorderInternalServerError{}
}

// WithPayload adds the payload to the post shows show Id roles setorder internal server error response
func (o *PostShowsShowIDRolesSetorderInternalServerError) WithPayload(payload *dtos.Error) *PostShowsShowIDRolesSetorderInternalServerError {
	o.Payload = payload
	return o
}

// SetPayload sets the payload to the post shows show Id roles setorder internal server error response
func (o *PostShowsShowIDRolesSetorderInternalServerError) SetPayload(payload *dtos.Error) {
	o.Payload = payload
}

// WriteResponse to the client
func (o *PostShowsShowIDRolesSetorderInternalServerError) WriteResponse(rw http.ResponseWriter, producer runtime.Producer) {

	rw.WriteHeader(500)
	if o.Payload != nil {
		payload := o.Payload
		if err := producer.Produce(rw, payload); err != nil {
			panic(err) // let the recovery middleware deal with this
		}
	}
}
