// Code generated by go-swagger; DO NOT EDIT.

package showdocs

// This file was generated by the swagger tool.
// Editing this file might prove futile when you re-run the swagger generate command

import (
	"net/http"

	"github.com/go-openapi/runtime"

	"showplanner.io/pkg/restapi/dtos"
)

// GetShowdocTimersOKCode is the HTTP code returned for type GetShowdocTimersOK
const GetShowdocTimersOKCode int = 200

/*
GetShowdocTimersOK OK

swagger:response getShowdocTimersOK
*/
type GetShowdocTimersOK struct {

	/*
	  In: Body
	*/
	Payload []*dtos.ShowTimerSummaryDTO `json:"body,omitempty"`
}

// NewGetShowdocTimersOK creates GetShowdocTimersOK with default headers values
func NewGetShowdocTimersOK() *GetShowdocTimersOK {

	return &GetShowdocTimersOK{}
}

// WithPayload adds the payload to the get showdoc timers o k response
func (o *GetShowdocTimersOK) WithPayload(payload []*dtos.ShowTimerSummaryDTO) *GetShowdocTimersOK {
	o.Payload = payload
	return o
}

// SetPayload sets the payload to the get showdoc timers o k response
func (o *GetShowdocTimersOK) SetPayload(payload []*dtos.ShowTimerSummaryDTO) {
	o.Payload = payload
}

// WriteResponse to the client
func (o *GetShowdocTimersOK) WriteResponse(rw http.ResponseWriter, producer runtime.Producer) {

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

// GetShowdocTimersUnauthorizedCode is the HTTP code returned for type GetShowdocTimersUnauthorized
const GetShowdocTimersUnauthorizedCode int = 401

/*
GetShowdocTimersUnauthorized Error

swagger:response getShowdocTimersUnauthorized
*/
type GetShowdocTimersUnauthorized struct {

	/*
	  In: Body
	*/
	Payload *dtos.Error `json:"body,omitempty"`
}

// NewGetShowdocTimersUnauthorized creates GetShowdocTimersUnauthorized with default headers values
func NewGetShowdocTimersUnauthorized() *GetShowdocTimersUnauthorized {

	return &GetShowdocTimersUnauthorized{}
}

// WithPayload adds the payload to the get showdoc timers unauthorized response
func (o *GetShowdocTimersUnauthorized) WithPayload(payload *dtos.Error) *GetShowdocTimersUnauthorized {
	o.Payload = payload
	return o
}

// SetPayload sets the payload to the get showdoc timers unauthorized response
func (o *GetShowdocTimersUnauthorized) SetPayload(payload *dtos.Error) {
	o.Payload = payload
}

// WriteResponse to the client
func (o *GetShowdocTimersUnauthorized) WriteResponse(rw http.ResponseWriter, producer runtime.Producer) {

	rw.WriteHeader(401)
	if o.Payload != nil {
		payload := o.Payload
		if err := producer.Produce(rw, payload); err != nil {
			panic(err) // let the recovery middleware deal with this
		}
	}
}

// GetShowdocTimersNotFoundCode is the HTTP code returned for type GetShowdocTimersNotFound
const GetShowdocTimersNotFoundCode int = 404

/*
GetShowdocTimersNotFound Error

swagger:response getShowdocTimersNotFound
*/
type GetShowdocTimersNotFound struct {

	/*
	  In: Body
	*/
	Payload *dtos.Error `json:"body,omitempty"`
}

// NewGetShowdocTimersNotFound creates GetShowdocTimersNotFound with default headers values
func NewGetShowdocTimersNotFound() *GetShowdocTimersNotFound {

	return &GetShowdocTimersNotFound{}
}

// WithPayload adds the payload to the get showdoc timers not found response
func (o *GetShowdocTimersNotFound) WithPayload(payload *dtos.Error) *GetShowdocTimersNotFound {
	o.Payload = payload
	return o
}

// SetPayload sets the payload to the get showdoc timers not found response
func (o *GetShowdocTimersNotFound) SetPayload(payload *dtos.Error) {
	o.Payload = payload
}

// WriteResponse to the client
func (o *GetShowdocTimersNotFound) WriteResponse(rw http.ResponseWriter, producer runtime.Producer) {

	rw.WriteHeader(404)
	if o.Payload != nil {
		payload := o.Payload
		if err := producer.Produce(rw, payload); err != nil {
			panic(err) // let the recovery middleware deal with this
		}
	}
}

// GetShowdocTimersInternalServerErrorCode is the HTTP code returned for type GetShowdocTimersInternalServerError
const GetShowdocTimersInternalServerErrorCode int = 500

/*
GetShowdocTimersInternalServerError Error

swagger:response getShowdocTimersInternalServerError
*/
type GetShowdocTimersInternalServerError struct {

	/*
	  In: Body
	*/
	Payload *dtos.Error `json:"body,omitempty"`
}

// NewGetShowdocTimersInternalServerError creates GetShowdocTimersInternalServerError with default headers values
func NewGetShowdocTimersInternalServerError() *GetShowdocTimersInternalServerError {

	return &GetShowdocTimersInternalServerError{}
}

// WithPayload adds the payload to the get showdoc timers internal server error response
func (o *GetShowdocTimersInternalServerError) WithPayload(payload *dtos.Error) *GetShowdocTimersInternalServerError {
	o.Payload = payload
	return o
}

// SetPayload sets the payload to the get showdoc timers internal server error response
func (o *GetShowdocTimersInternalServerError) SetPayload(payload *dtos.Error) {
	o.Payload = payload
}

// WriteResponse to the client
func (o *GetShowdocTimersInternalServerError) WriteResponse(rw http.ResponseWriter, producer runtime.Producer) {

	rw.WriteHeader(500)
	if o.Payload != nil {
		payload := o.Payload
		if err := producer.Produce(rw, payload); err != nil {
			panic(err) // let the recovery middleware deal with this
		}
	}
}
