// Code generated by go-swagger; DO NOT EDIT.

package operations

// This file was generated by the swagger tool.
// Editing this file might prove futile when you re-run the swagger generate command

import (
	"net/http"

	"github.com/go-openapi/runtime"

	"showplanner.io/pkg/restapi/dtos"
)

// GetPublicScheduleOKCode is the HTTP code returned for type GetPublicScheduleOK
const GetPublicScheduleOKCode int = 200

/*
GetPublicScheduleOK OK

swagger:response getPublicScheduleOK
*/
type GetPublicScheduleOK struct {

	/*
	  In: Body
	*/
	Payload *GetPublicScheduleOKBody `json:"body,omitempty"`
}

// NewGetPublicScheduleOK creates GetPublicScheduleOK with default headers values
func NewGetPublicScheduleOK() *GetPublicScheduleOK {

	return &GetPublicScheduleOK{}
}

// WithPayload adds the payload to the get public schedule o k response
func (o *GetPublicScheduleOK) WithPayload(payload *GetPublicScheduleOKBody) *GetPublicScheduleOK {
	o.Payload = payload
	return o
}

// SetPayload sets the payload to the get public schedule o k response
func (o *GetPublicScheduleOK) SetPayload(payload *GetPublicScheduleOKBody) {
	o.Payload = payload
}

// WriteResponse to the client
func (o *GetPublicScheduleOK) WriteResponse(rw http.ResponseWriter, producer runtime.Producer) {

	rw.WriteHeader(200)
	if o.Payload != nil {
		payload := o.Payload
		if err := producer.Produce(rw, payload); err != nil {
			panic(err) // let the recovery middleware deal with this
		}
	}
}

// GetPublicScheduleInternalServerErrorCode is the HTTP code returned for type GetPublicScheduleInternalServerError
const GetPublicScheduleInternalServerErrorCode int = 500

/*
GetPublicScheduleInternalServerError Error

swagger:response getPublicScheduleInternalServerError
*/
type GetPublicScheduleInternalServerError struct {

	/*
	  In: Body
	*/
	Payload *dtos.Error `json:"body,omitempty"`
}

// NewGetPublicScheduleInternalServerError creates GetPublicScheduleInternalServerError with default headers values
func NewGetPublicScheduleInternalServerError() *GetPublicScheduleInternalServerError {

	return &GetPublicScheduleInternalServerError{}
}

// WithPayload adds the payload to the get public schedule internal server error response
func (o *GetPublicScheduleInternalServerError) WithPayload(payload *dtos.Error) *GetPublicScheduleInternalServerError {
	o.Payload = payload
	return o
}

// SetPayload sets the payload to the get public schedule internal server error response
func (o *GetPublicScheduleInternalServerError) SetPayload(payload *dtos.Error) {
	o.Payload = payload
}

// WriteResponse to the client
func (o *GetPublicScheduleInternalServerError) WriteResponse(rw http.ResponseWriter, producer runtime.Producer) {

	rw.WriteHeader(500)
	if o.Payload != nil {
		payload := o.Payload
		if err := producer.Produce(rw, payload); err != nil {
			panic(err) // let the recovery middleware deal with this
		}
	}
}
