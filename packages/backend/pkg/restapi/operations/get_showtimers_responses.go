// Code generated by go-swagger; DO NOT EDIT.

package operations

// This file was generated by the swagger tool.
// Editing this file might prove futile when you re-run the swagger generate command

import (
	"net/http"

	"github.com/go-openapi/runtime"

	"showplanner.io/pkg/restapi/dtos"
)

// GetShowtimersOKCode is the HTTP code returned for type GetShowtimersOK
const GetShowtimersOKCode int = 200

/*
GetShowtimersOK OK

swagger:response getShowtimersOK
*/
type GetShowtimersOK struct {

	/*
	  In: Body
	*/
	Payload []*dtos.ShowTimerSummaryDTO `json:"body,omitempty"`
}

// NewGetShowtimersOK creates GetShowtimersOK with default headers values
func NewGetShowtimersOK() *GetShowtimersOK {

	return &GetShowtimersOK{}
}

// WithPayload adds the payload to the get showtimers o k response
func (o *GetShowtimersOK) WithPayload(payload []*dtos.ShowTimerSummaryDTO) *GetShowtimersOK {
	o.Payload = payload
	return o
}

// SetPayload sets the payload to the get showtimers o k response
func (o *GetShowtimersOK) SetPayload(payload []*dtos.ShowTimerSummaryDTO) {
	o.Payload = payload
}

// WriteResponse to the client
func (o *GetShowtimersOK) WriteResponse(rw http.ResponseWriter, producer runtime.Producer) {

	rw.WriteHeader(200)
	payload := o.Payload
	if payload == nil {
		// return empty array
		payload = make([]*dtos.ShowTimerSummaryDTO, 0, 50)
	}

	if err := producer.Produce(rw, payload); err != nil {
		panic(err) // let the recovery middleware deal with this
	}
}

// GetShowtimersUnauthorizedCode is the HTTP code returned for type GetShowtimersUnauthorized
const GetShowtimersUnauthorizedCode int = 401

/*
GetShowtimersUnauthorized Error

swagger:response getShowtimersUnauthorized
*/
type GetShowtimersUnauthorized struct {

	/*
	  In: Body
	*/
	Payload *dtos.Error `json:"body,omitempty"`
}

// NewGetShowtimersUnauthorized creates GetShowtimersUnauthorized with default headers values
func NewGetShowtimersUnauthorized() *GetShowtimersUnauthorized {

	return &GetShowtimersUnauthorized{}
}

// WithPayload adds the payload to the get showtimers unauthorized response
func (o *GetShowtimersUnauthorized) WithPayload(payload *dtos.Error) *GetShowtimersUnauthorized {
	o.Payload = payload
	return o
}

// SetPayload sets the payload to the get showtimers unauthorized response
func (o *GetShowtimersUnauthorized) SetPayload(payload *dtos.Error) {
	o.Payload = payload
}

// WriteResponse to the client
func (o *GetShowtimersUnauthorized) WriteResponse(rw http.ResponseWriter, producer runtime.Producer) {

	rw.WriteHeader(401)
	if o.Payload != nil {
		payload := o.Payload
		if err := producer.Produce(rw, payload); err != nil {
			panic(err) // let the recovery middleware deal with this
		}
	}
}

// GetShowtimersNotFoundCode is the HTTP code returned for type GetShowtimersNotFound
const GetShowtimersNotFoundCode int = 404

/*
GetShowtimersNotFound Error

swagger:response getShowtimersNotFound
*/
type GetShowtimersNotFound struct {

	/*
	  In: Body
	*/
	Payload *dtos.Error `json:"body,omitempty"`
}

// NewGetShowtimersNotFound creates GetShowtimersNotFound with default headers values
func NewGetShowtimersNotFound() *GetShowtimersNotFound {

	return &GetShowtimersNotFound{}
}

// WithPayload adds the payload to the get showtimers not found response
func (o *GetShowtimersNotFound) WithPayload(payload *dtos.Error) *GetShowtimersNotFound {
	o.Payload = payload
	return o
}

// SetPayload sets the payload to the get showtimers not found response
func (o *GetShowtimersNotFound) SetPayload(payload *dtos.Error) {
	o.Payload = payload
}

// WriteResponse to the client
func (o *GetShowtimersNotFound) WriteResponse(rw http.ResponseWriter, producer runtime.Producer) {

	rw.WriteHeader(404)
	if o.Payload != nil {
		payload := o.Payload
		if err := producer.Produce(rw, payload); err != nil {
			panic(err) // let the recovery middleware deal with this
		}
	}
}

// GetShowtimersInternalServerErrorCode is the HTTP code returned for type GetShowtimersInternalServerError
const GetShowtimersInternalServerErrorCode int = 500

/*
GetShowtimersInternalServerError Error

swagger:response getShowtimersInternalServerError
*/
type GetShowtimersInternalServerError struct {

	/*
	  In: Body
	*/
	Payload *dtos.Error `json:"body,omitempty"`
}

// NewGetShowtimersInternalServerError creates GetShowtimersInternalServerError with default headers values
func NewGetShowtimersInternalServerError() *GetShowtimersInternalServerError {

	return &GetShowtimersInternalServerError{}
}

// WithPayload adds the payload to the get showtimers internal server error response
func (o *GetShowtimersInternalServerError) WithPayload(payload *dtos.Error) *GetShowtimersInternalServerError {
	o.Payload = payload
	return o
}

// SetPayload sets the payload to the get showtimers internal server error response
func (o *GetShowtimersInternalServerError) SetPayload(payload *dtos.Error) {
	o.Payload = payload
}

// WriteResponse to the client
func (o *GetShowtimersInternalServerError) WriteResponse(rw http.ResponseWriter, producer runtime.Producer) {

	rw.WriteHeader(500)
	if o.Payload != nil {
		payload := o.Payload
		if err := producer.Produce(rw, payload); err != nil {
			panic(err) // let the recovery middleware deal with this
		}
	}
}
