// Code generated by go-swagger; DO NOT EDIT.

package operations

// This file was generated by the swagger tool.
// Editing this file might prove futile when you re-run the swagger generate command

import (
	"io"
	"net/http"

	"github.com/go-openapi/runtime"

	"showplanner.io/pkg/models"
)

// GetShowreportsIDPdfOKCode is the HTTP code returned for type GetShowreportsIDPdfOK
const GetShowreportsIDPdfOKCode int = 200

/*
GetShowreportsIDPdfOK A PDF file

swagger:response getShowreportsIdPdfOK
*/
type GetShowreportsIDPdfOK struct {

	/*
	  In: Body
	*/
	Payload io.ReadCloser `json:"body,omitempty"`
}

// NewGetShowreportsIDPdfOK creates GetShowreportsIDPdfOK with default headers values
func NewGetShowreportsIDPdfOK() *GetShowreportsIDPdfOK {

	return &GetShowreportsIDPdfOK{}
}

// WithPayload adds the payload to the get showreports Id pdf o k response
func (o *GetShowreportsIDPdfOK) WithPayload(payload io.ReadCloser) *GetShowreportsIDPdfOK {
	o.Payload = payload
	return o
}

// SetPayload sets the payload to the get showreports Id pdf o k response
func (o *GetShowreportsIDPdfOK) SetPayload(payload io.ReadCloser) {
	o.Payload = payload
}

// WriteResponse to the client
func (o *GetShowreportsIDPdfOK) WriteResponse(rw http.ResponseWriter, producer runtime.Producer) {

	rw.WriteHeader(200)
	payload := o.Payload
	if err := producer.Produce(rw, payload); err != nil {
		panic(err) // let the recovery middleware deal with this
	}
}

// GetShowreportsIDPdfUnauthorizedCode is the HTTP code returned for type GetShowreportsIDPdfUnauthorized
const GetShowreportsIDPdfUnauthorizedCode int = 401

/*
GetShowreportsIDPdfUnauthorized Error

swagger:response getShowreportsIdPdfUnauthorized
*/
type GetShowreportsIDPdfUnauthorized struct {

	/*
	  In: Body
	*/
	Payload *models.Error `json:"body,omitempty"`
}

// NewGetShowreportsIDPdfUnauthorized creates GetShowreportsIDPdfUnauthorized with default headers values
func NewGetShowreportsIDPdfUnauthorized() *GetShowreportsIDPdfUnauthorized {

	return &GetShowreportsIDPdfUnauthorized{}
}

// WithPayload adds the payload to the get showreports Id pdf unauthorized response
func (o *GetShowreportsIDPdfUnauthorized) WithPayload(payload *models.Error) *GetShowreportsIDPdfUnauthorized {
	o.Payload = payload
	return o
}

// SetPayload sets the payload to the get showreports Id pdf unauthorized response
func (o *GetShowreportsIDPdfUnauthorized) SetPayload(payload *models.Error) {
	o.Payload = payload
}

// WriteResponse to the client
func (o *GetShowreportsIDPdfUnauthorized) WriteResponse(rw http.ResponseWriter, producer runtime.Producer) {

	rw.WriteHeader(401)
	if o.Payload != nil {
		payload := o.Payload
		if err := producer.Produce(rw, payload); err != nil {
			panic(err) // let the recovery middleware deal with this
		}
	}
}

// GetShowreportsIDPdfNotFoundCode is the HTTP code returned for type GetShowreportsIDPdfNotFound
const GetShowreportsIDPdfNotFoundCode int = 404

/*
GetShowreportsIDPdfNotFound Error

swagger:response getShowreportsIdPdfNotFound
*/
type GetShowreportsIDPdfNotFound struct {

	/*
	  In: Body
	*/
	Payload *models.Error `json:"body,omitempty"`
}

// NewGetShowreportsIDPdfNotFound creates GetShowreportsIDPdfNotFound with default headers values
func NewGetShowreportsIDPdfNotFound() *GetShowreportsIDPdfNotFound {

	return &GetShowreportsIDPdfNotFound{}
}

// WithPayload adds the payload to the get showreports Id pdf not found response
func (o *GetShowreportsIDPdfNotFound) WithPayload(payload *models.Error) *GetShowreportsIDPdfNotFound {
	o.Payload = payload
	return o
}

// SetPayload sets the payload to the get showreports Id pdf not found response
func (o *GetShowreportsIDPdfNotFound) SetPayload(payload *models.Error) {
	o.Payload = payload
}

// WriteResponse to the client
func (o *GetShowreportsIDPdfNotFound) WriteResponse(rw http.ResponseWriter, producer runtime.Producer) {

	rw.WriteHeader(404)
	if o.Payload != nil {
		payload := o.Payload
		if err := producer.Produce(rw, payload); err != nil {
			panic(err) // let the recovery middleware deal with this
		}
	}
}

// GetShowreportsIDPdfInternalServerErrorCode is the HTTP code returned for type GetShowreportsIDPdfInternalServerError
const GetShowreportsIDPdfInternalServerErrorCode int = 500

/*
GetShowreportsIDPdfInternalServerError Error

swagger:response getShowreportsIdPdfInternalServerError
*/
type GetShowreportsIDPdfInternalServerError struct {

	/*
	  In: Body
	*/
	Payload *models.Error `json:"body,omitempty"`
}

// NewGetShowreportsIDPdfInternalServerError creates GetShowreportsIDPdfInternalServerError with default headers values
func NewGetShowreportsIDPdfInternalServerError() *GetShowreportsIDPdfInternalServerError {

	return &GetShowreportsIDPdfInternalServerError{}
}

// WithPayload adds the payload to the get showreports Id pdf internal server error response
func (o *GetShowreportsIDPdfInternalServerError) WithPayload(payload *models.Error) *GetShowreportsIDPdfInternalServerError {
	o.Payload = payload
	return o
}

// SetPayload sets the payload to the get showreports Id pdf internal server error response
func (o *GetShowreportsIDPdfInternalServerError) SetPayload(payload *models.Error) {
	o.Payload = payload
}

// WriteResponse to the client
func (o *GetShowreportsIDPdfInternalServerError) WriteResponse(rw http.ResponseWriter, producer runtime.Producer) {

	rw.WriteHeader(500)
	if o.Payload != nil {
		payload := o.Payload
		if err := producer.Produce(rw, payload); err != nil {
			panic(err) // let the recovery middleware deal with this
		}
	}
}
