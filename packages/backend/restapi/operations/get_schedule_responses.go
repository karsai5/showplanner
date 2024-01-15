// Code generated by go-swagger; DO NOT EDIT.

package operations

// This file was generated by the swagger tool.
// Editing this file might prove futile when you re-run the swagger generate command

import (
	"net/http"

	"github.com/go-openapi/runtime"

	"go-backend/models"
)

// GetScheduleOKCode is the HTTP code returned for type GetScheduleOK
const GetScheduleOKCode int = 200

/*
GetScheduleOK OK

swagger:response getScheduleOK
*/
type GetScheduleOK struct {

	/*
	  In: Body
	*/
	Payload []*models.ScheduleEventDTO `json:"body,omitempty"`
}

// NewGetScheduleOK creates GetScheduleOK with default headers values
func NewGetScheduleOK() *GetScheduleOK {

	return &GetScheduleOK{}
}

// WithPayload adds the payload to the get schedule o k response
func (o *GetScheduleOK) WithPayload(payload []*models.ScheduleEventDTO) *GetScheduleOK {
	o.Payload = payload
	return o
}

// SetPayload sets the payload to the get schedule o k response
func (o *GetScheduleOK) SetPayload(payload []*models.ScheduleEventDTO) {
	o.Payload = payload
}

// WriteResponse to the client
func (o *GetScheduleOK) WriteResponse(rw http.ResponseWriter, producer runtime.Producer) {

	rw.WriteHeader(200)
	payload := o.Payload
	if payload == nil {
		// return empty array
		payload = make([]*models.ScheduleEventDTO, 0, 50)
	}

	if err := producer.Produce(rw, payload); err != nil {
		panic(err) // let the recovery middleware deal with this
	}
}

// GetScheduleUnauthorizedCode is the HTTP code returned for type GetScheduleUnauthorized
const GetScheduleUnauthorizedCode int = 401

/*
GetScheduleUnauthorized Error

swagger:response getScheduleUnauthorized
*/
type GetScheduleUnauthorized struct {

	/*
	  In: Body
	*/
	Payload *models.Error `json:"body,omitempty"`
}

// NewGetScheduleUnauthorized creates GetScheduleUnauthorized with default headers values
func NewGetScheduleUnauthorized() *GetScheduleUnauthorized {

	return &GetScheduleUnauthorized{}
}

// WithPayload adds the payload to the get schedule unauthorized response
func (o *GetScheduleUnauthorized) WithPayload(payload *models.Error) *GetScheduleUnauthorized {
	o.Payload = payload
	return o
}

// SetPayload sets the payload to the get schedule unauthorized response
func (o *GetScheduleUnauthorized) SetPayload(payload *models.Error) {
	o.Payload = payload
}

// WriteResponse to the client
func (o *GetScheduleUnauthorized) WriteResponse(rw http.ResponseWriter, producer runtime.Producer) {

	rw.WriteHeader(401)
	if o.Payload != nil {
		payload := o.Payload
		if err := producer.Produce(rw, payload); err != nil {
			panic(err) // let the recovery middleware deal with this
		}
	}
}

// GetScheduleInternalServerErrorCode is the HTTP code returned for type GetScheduleInternalServerError
const GetScheduleInternalServerErrorCode int = 500

/*
GetScheduleInternalServerError Error

swagger:response getScheduleInternalServerError
*/
type GetScheduleInternalServerError struct {

	/*
	  In: Body
	*/
	Payload *models.Error `json:"body,omitempty"`
}

// NewGetScheduleInternalServerError creates GetScheduleInternalServerError with default headers values
func NewGetScheduleInternalServerError() *GetScheduleInternalServerError {

	return &GetScheduleInternalServerError{}
}

// WithPayload adds the payload to the get schedule internal server error response
func (o *GetScheduleInternalServerError) WithPayload(payload *models.Error) *GetScheduleInternalServerError {
	o.Payload = payload
	return o
}

// SetPayload sets the payload to the get schedule internal server error response
func (o *GetScheduleInternalServerError) SetPayload(payload *models.Error) {
	o.Payload = payload
}

// WriteResponse to the client
func (o *GetScheduleInternalServerError) WriteResponse(rw http.ResponseWriter, producer runtime.Producer) {

	rw.WriteHeader(500)
	if o.Payload != nil {
		payload := o.Payload
		if err := producer.Produce(rw, payload); err != nil {
			panic(err) // let the recovery middleware deal with this
		}
	}
}
