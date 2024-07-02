// Code generated by go-swagger; DO NOT EDIT.

package rostering

// This file was generated by the swagger tool.
// Editing this file might prove futile when you re-run the swagger generate command

import (
	"net/http"

	"github.com/go-openapi/runtime"

	"showplanner.io/pkg/restapi/dtos"
)

// DeleteInvitationsIDOKCode is the HTTP code returned for type DeleteInvitationsIDOK
const DeleteInvitationsIDOKCode int = 200

/*
DeleteInvitationsIDOK OK

swagger:response deleteInvitationsIdOK
*/
type DeleteInvitationsIDOK struct {
}

// NewDeleteInvitationsIDOK creates DeleteInvitationsIDOK with default headers values
func NewDeleteInvitationsIDOK() *DeleteInvitationsIDOK {

	return &DeleteInvitationsIDOK{}
}

// WriteResponse to the client
func (o *DeleteInvitationsIDOK) WriteResponse(rw http.ResponseWriter, producer runtime.Producer) {

	rw.Header().Del(runtime.HeaderContentType) //Remove Content-Type on empty responses

	rw.WriteHeader(200)
}

// DeleteInvitationsIDUnauthorizedCode is the HTTP code returned for type DeleteInvitationsIDUnauthorized
const DeleteInvitationsIDUnauthorizedCode int = 401

/*
DeleteInvitationsIDUnauthorized Error

swagger:response deleteInvitationsIdUnauthorized
*/
type DeleteInvitationsIDUnauthorized struct {

	/*
	  In: Body
	*/
	Payload *dtos.Error `json:"body,omitempty"`
}

// NewDeleteInvitationsIDUnauthorized creates DeleteInvitationsIDUnauthorized with default headers values
func NewDeleteInvitationsIDUnauthorized() *DeleteInvitationsIDUnauthorized {

	return &DeleteInvitationsIDUnauthorized{}
}

// WithPayload adds the payload to the delete invitations Id unauthorized response
func (o *DeleteInvitationsIDUnauthorized) WithPayload(payload *dtos.Error) *DeleteInvitationsIDUnauthorized {
	o.Payload = payload
	return o
}

// SetPayload sets the payload to the delete invitations Id unauthorized response
func (o *DeleteInvitationsIDUnauthorized) SetPayload(payload *dtos.Error) {
	o.Payload = payload
}

// WriteResponse to the client
func (o *DeleteInvitationsIDUnauthorized) WriteResponse(rw http.ResponseWriter, producer runtime.Producer) {

	rw.WriteHeader(401)
	if o.Payload != nil {
		payload := o.Payload
		if err := producer.Produce(rw, payload); err != nil {
			panic(err) // let the recovery middleware deal with this
		}
	}
}

// DeleteInvitationsIDInternalServerErrorCode is the HTTP code returned for type DeleteInvitationsIDInternalServerError
const DeleteInvitationsIDInternalServerErrorCode int = 500

/*
DeleteInvitationsIDInternalServerError Error

swagger:response deleteInvitationsIdInternalServerError
*/
type DeleteInvitationsIDInternalServerError struct {

	/*
	  In: Body
	*/
	Payload *dtos.Error `json:"body,omitempty"`
}

// NewDeleteInvitationsIDInternalServerError creates DeleteInvitationsIDInternalServerError with default headers values
func NewDeleteInvitationsIDInternalServerError() *DeleteInvitationsIDInternalServerError {

	return &DeleteInvitationsIDInternalServerError{}
}

// WithPayload adds the payload to the delete invitations Id internal server error response
func (o *DeleteInvitationsIDInternalServerError) WithPayload(payload *dtos.Error) *DeleteInvitationsIDInternalServerError {
	o.Payload = payload
	return o
}

// SetPayload sets the payload to the delete invitations Id internal server error response
func (o *DeleteInvitationsIDInternalServerError) SetPayload(payload *dtos.Error) {
	o.Payload = payload
}

// WriteResponse to the client
func (o *DeleteInvitationsIDInternalServerError) WriteResponse(rw http.ResponseWriter, producer runtime.Producer) {

	rw.WriteHeader(500)
	if o.Payload != nil {
		payload := o.Payload
		if err := producer.Produce(rw, payload); err != nil {
			panic(err) // let the recovery middleware deal with this
		}
	}
}