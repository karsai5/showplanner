// Code generated by go-swagger; DO NOT EDIT.

package rostering

// This file was generated by the swagger tool.
// Editing this file might prove futile when you re-run the swagger generate command

import (
	"net/http"

	"github.com/go-openapi/runtime"

	"showplanner.io/pkg/restapi/dtos"
)

// GetInvitationsIDOKCode is the HTTP code returned for type GetInvitationsIDOK
const GetInvitationsIDOKCode int = 200

/*
GetInvitationsIDOK OK

swagger:response getInvitationsIdOK
*/
type GetInvitationsIDOK struct {

	/*
	  In: Body
	*/
	Payload *dtos.InvitationDTO `json:"body,omitempty"`
}

// NewGetInvitationsIDOK creates GetInvitationsIDOK with default headers values
func NewGetInvitationsIDOK() *GetInvitationsIDOK {

	return &GetInvitationsIDOK{}
}

// WithPayload adds the payload to the get invitations Id o k response
func (o *GetInvitationsIDOK) WithPayload(payload *dtos.InvitationDTO) *GetInvitationsIDOK {
	o.Payload = payload
	return o
}

// SetPayload sets the payload to the get invitations Id o k response
func (o *GetInvitationsIDOK) SetPayload(payload *dtos.InvitationDTO) {
	o.Payload = payload
}

// WriteResponse to the client
func (o *GetInvitationsIDOK) WriteResponse(rw http.ResponseWriter, producer runtime.Producer) {

	rw.WriteHeader(200)
	if o.Payload != nil {
		payload := o.Payload
		if err := producer.Produce(rw, payload); err != nil {
			panic(err) // let the recovery middleware deal with this
		}
	}
}

// GetInvitationsIDUnauthorizedCode is the HTTP code returned for type GetInvitationsIDUnauthorized
const GetInvitationsIDUnauthorizedCode int = 401

/*
GetInvitationsIDUnauthorized Error

swagger:response getInvitationsIdUnauthorized
*/
type GetInvitationsIDUnauthorized struct {

	/*
	  In: Body
	*/
	Payload *dtos.Error `json:"body,omitempty"`
}

// NewGetInvitationsIDUnauthorized creates GetInvitationsIDUnauthorized with default headers values
func NewGetInvitationsIDUnauthorized() *GetInvitationsIDUnauthorized {

	return &GetInvitationsIDUnauthorized{}
}

// WithPayload adds the payload to the get invitations Id unauthorized response
func (o *GetInvitationsIDUnauthorized) WithPayload(payload *dtos.Error) *GetInvitationsIDUnauthorized {
	o.Payload = payload
	return o
}

// SetPayload sets the payload to the get invitations Id unauthorized response
func (o *GetInvitationsIDUnauthorized) SetPayload(payload *dtos.Error) {
	o.Payload = payload
}

// WriteResponse to the client
func (o *GetInvitationsIDUnauthorized) WriteResponse(rw http.ResponseWriter, producer runtime.Producer) {

	rw.WriteHeader(401)
	if o.Payload != nil {
		payload := o.Payload
		if err := producer.Produce(rw, payload); err != nil {
			panic(err) // let the recovery middleware deal with this
		}
	}
}

// GetInvitationsIDInternalServerErrorCode is the HTTP code returned for type GetInvitationsIDInternalServerError
const GetInvitationsIDInternalServerErrorCode int = 500

/*
GetInvitationsIDInternalServerError Error

swagger:response getInvitationsIdInternalServerError
*/
type GetInvitationsIDInternalServerError struct {

	/*
	  In: Body
	*/
	Payload *dtos.Error `json:"body,omitempty"`
}

// NewGetInvitationsIDInternalServerError creates GetInvitationsIDInternalServerError with default headers values
func NewGetInvitationsIDInternalServerError() *GetInvitationsIDInternalServerError {

	return &GetInvitationsIDInternalServerError{}
}

// WithPayload adds the payload to the get invitations Id internal server error response
func (o *GetInvitationsIDInternalServerError) WithPayload(payload *dtos.Error) *GetInvitationsIDInternalServerError {
	o.Payload = payload
	return o
}

// SetPayload sets the payload to the get invitations Id internal server error response
func (o *GetInvitationsIDInternalServerError) SetPayload(payload *dtos.Error) {
	o.Payload = payload
}

// WriteResponse to the client
func (o *GetInvitationsIDInternalServerError) WriteResponse(rw http.ResponseWriter, producer runtime.Producer) {

	rw.WriteHeader(500)
	if o.Payload != nil {
		payload := o.Payload
		if err := producer.Produce(rw, payload); err != nil {
			panic(err) // let the recovery middleware deal with this
		}
	}
}
