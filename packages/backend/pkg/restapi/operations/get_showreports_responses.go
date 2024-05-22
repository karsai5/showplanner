// Code generated by go-swagger; DO NOT EDIT.

package operations

// This file was generated by the swagger tool.
// Editing this file might prove futile when you re-run the swagger generate command

import (
	"net/http"

	"github.com/go-openapi/runtime"

	"showplanner.io/pkg/models"
)

// GetShowreportsOKCode is the HTTP code returned for type GetShowreportsOK
const GetShowreportsOKCode int = 200

/*
GetShowreportsOK OK

swagger:response getShowreportsOK
*/
type GetShowreportsOK struct {

	/*
	  In: Body
	*/
	Payload []*models.ShowReportSummaryDTO `json:"body,omitempty"`
}

// NewGetShowreportsOK creates GetShowreportsOK with default headers values
func NewGetShowreportsOK() *GetShowreportsOK {

	return &GetShowreportsOK{}
}

// WithPayload adds the payload to the get showreports o k response
func (o *GetShowreportsOK) WithPayload(payload []*models.ShowReportSummaryDTO) *GetShowreportsOK {
	o.Payload = payload
	return o
}

// SetPayload sets the payload to the get showreports o k response
func (o *GetShowreportsOK) SetPayload(payload []*models.ShowReportSummaryDTO) {
	o.Payload = payload
}

// WriteResponse to the client
func (o *GetShowreportsOK) WriteResponse(rw http.ResponseWriter, producer runtime.Producer) {

	rw.WriteHeader(200)
	payload := o.Payload
	if payload == nil {
		// return empty array
		payload = make([]*models.ShowReportSummaryDTO, 0, 50)
	}

	if err := producer.Produce(rw, payload); err != nil {
		panic(err) // let the recovery middleware deal with this
	}
}

// GetShowreportsUnauthorizedCode is the HTTP code returned for type GetShowreportsUnauthorized
const GetShowreportsUnauthorizedCode int = 401

/*
GetShowreportsUnauthorized Error

swagger:response getShowreportsUnauthorized
*/
type GetShowreportsUnauthorized struct {

	/*
	  In: Body
	*/
	Payload *models.Error `json:"body,omitempty"`
}

// NewGetShowreportsUnauthorized creates GetShowreportsUnauthorized with default headers values
func NewGetShowreportsUnauthorized() *GetShowreportsUnauthorized {

	return &GetShowreportsUnauthorized{}
}

// WithPayload adds the payload to the get showreports unauthorized response
func (o *GetShowreportsUnauthorized) WithPayload(payload *models.Error) *GetShowreportsUnauthorized {
	o.Payload = payload
	return o
}

// SetPayload sets the payload to the get showreports unauthorized response
func (o *GetShowreportsUnauthorized) SetPayload(payload *models.Error) {
	o.Payload = payload
}

// WriteResponse to the client
func (o *GetShowreportsUnauthorized) WriteResponse(rw http.ResponseWriter, producer runtime.Producer) {

	rw.WriteHeader(401)
	if o.Payload != nil {
		payload := o.Payload
		if err := producer.Produce(rw, payload); err != nil {
			panic(err) // let the recovery middleware deal with this
		}
	}
}

// GetShowreportsNotFoundCode is the HTTP code returned for type GetShowreportsNotFound
const GetShowreportsNotFoundCode int = 404

/*
GetShowreportsNotFound Error

swagger:response getShowreportsNotFound
*/
type GetShowreportsNotFound struct {

	/*
	  In: Body
	*/
	Payload *models.Error `json:"body,omitempty"`
}

// NewGetShowreportsNotFound creates GetShowreportsNotFound with default headers values
func NewGetShowreportsNotFound() *GetShowreportsNotFound {

	return &GetShowreportsNotFound{}
}

// WithPayload adds the payload to the get showreports not found response
func (o *GetShowreportsNotFound) WithPayload(payload *models.Error) *GetShowreportsNotFound {
	o.Payload = payload
	return o
}

// SetPayload sets the payload to the get showreports not found response
func (o *GetShowreportsNotFound) SetPayload(payload *models.Error) {
	o.Payload = payload
}

// WriteResponse to the client
func (o *GetShowreportsNotFound) WriteResponse(rw http.ResponseWriter, producer runtime.Producer) {

	rw.WriteHeader(404)
	if o.Payload != nil {
		payload := o.Payload
		if err := producer.Produce(rw, payload); err != nil {
			panic(err) // let the recovery middleware deal with this
		}
	}
}

// GetShowreportsInternalServerErrorCode is the HTTP code returned for type GetShowreportsInternalServerError
const GetShowreportsInternalServerErrorCode int = 500

/*
GetShowreportsInternalServerError Error

swagger:response getShowreportsInternalServerError
*/
type GetShowreportsInternalServerError struct {

	/*
	  In: Body
	*/
	Payload *models.Error `json:"body,omitempty"`
}

// NewGetShowreportsInternalServerError creates GetShowreportsInternalServerError with default headers values
func NewGetShowreportsInternalServerError() *GetShowreportsInternalServerError {

	return &GetShowreportsInternalServerError{}
}

// WithPayload adds the payload to the get showreports internal server error response
func (o *GetShowreportsInternalServerError) WithPayload(payload *models.Error) *GetShowreportsInternalServerError {
	o.Payload = payload
	return o
}

// SetPayload sets the payload to the get showreports internal server error response
func (o *GetShowreportsInternalServerError) SetPayload(payload *models.Error) {
	o.Payload = payload
}

// WriteResponse to the client
func (o *GetShowreportsInternalServerError) WriteResponse(rw http.ResponseWriter, producer runtime.Producer) {

	rw.WriteHeader(500)
	if o.Payload != nil {
		payload := o.Payload
		if err := producer.Produce(rw, payload); err != nil {
			panic(err) // let the recovery middleware deal with this
		}
	}
}
