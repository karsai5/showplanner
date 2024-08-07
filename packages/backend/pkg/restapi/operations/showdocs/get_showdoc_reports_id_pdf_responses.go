// Code generated by go-swagger; DO NOT EDIT.

package showdocs

// This file was generated by the swagger tool.
// Editing this file might prove futile when you re-run the swagger generate command

import (
	"io"
	"net/http"

	"github.com/go-openapi/runtime"

	"showplanner.io/pkg/restapi/dtos"
)

// GetShowdocReportsIDPdfOKCode is the HTTP code returned for type GetShowdocReportsIDPdfOK
const GetShowdocReportsIDPdfOKCode int = 200

/*
GetShowdocReportsIDPdfOK A PDF file

swagger:response getShowdocReportsIdPdfOK
*/
type GetShowdocReportsIDPdfOK struct {

	/*
	  In: Body
	*/
	Payload io.ReadCloser `json:"body,omitempty"`
}

// NewGetShowdocReportsIDPdfOK creates GetShowdocReportsIDPdfOK with default headers values
func NewGetShowdocReportsIDPdfOK() *GetShowdocReportsIDPdfOK {

	return &GetShowdocReportsIDPdfOK{}
}

// WithPayload adds the payload to the get showdoc reports Id pdf o k response
func (o *GetShowdocReportsIDPdfOK) WithPayload(payload io.ReadCloser) *GetShowdocReportsIDPdfOK {
	o.Payload = payload
	return o
}

// SetPayload sets the payload to the get showdoc reports Id pdf o k response
func (o *GetShowdocReportsIDPdfOK) SetPayload(payload io.ReadCloser) {
	o.Payload = payload
}

// WriteResponse to the client
func (o *GetShowdocReportsIDPdfOK) WriteResponse(rw http.ResponseWriter, producer runtime.Producer) {

	rw.WriteHeader(200)
	payload := o.Payload
	if err := producer.Produce(rw, payload); err != nil {
		panic(err) // let the recovery middleware deal with this
	}
}

// GetShowdocReportsIDPdfUnauthorizedCode is the HTTP code returned for type GetShowdocReportsIDPdfUnauthorized
const GetShowdocReportsIDPdfUnauthorizedCode int = 401

/*
GetShowdocReportsIDPdfUnauthorized Error

swagger:response getShowdocReportsIdPdfUnauthorized
*/
type GetShowdocReportsIDPdfUnauthorized struct {

	/*
	  In: Body
	*/
	Payload *dtos.Error `json:"body,omitempty"`
}

// NewGetShowdocReportsIDPdfUnauthorized creates GetShowdocReportsIDPdfUnauthorized with default headers values
func NewGetShowdocReportsIDPdfUnauthorized() *GetShowdocReportsIDPdfUnauthorized {

	return &GetShowdocReportsIDPdfUnauthorized{}
}

// WithPayload adds the payload to the get showdoc reports Id pdf unauthorized response
func (o *GetShowdocReportsIDPdfUnauthorized) WithPayload(payload *dtos.Error) *GetShowdocReportsIDPdfUnauthorized {
	o.Payload = payload
	return o
}

// SetPayload sets the payload to the get showdoc reports Id pdf unauthorized response
func (o *GetShowdocReportsIDPdfUnauthorized) SetPayload(payload *dtos.Error) {
	o.Payload = payload
}

// WriteResponse to the client
func (o *GetShowdocReportsIDPdfUnauthorized) WriteResponse(rw http.ResponseWriter, producer runtime.Producer) {

	rw.WriteHeader(401)
	if o.Payload != nil {
		payload := o.Payload
		if err := producer.Produce(rw, payload); err != nil {
			panic(err) // let the recovery middleware deal with this
		}
	}
}

// GetShowdocReportsIDPdfNotFoundCode is the HTTP code returned for type GetShowdocReportsIDPdfNotFound
const GetShowdocReportsIDPdfNotFoundCode int = 404

/*
GetShowdocReportsIDPdfNotFound Error

swagger:response getShowdocReportsIdPdfNotFound
*/
type GetShowdocReportsIDPdfNotFound struct {

	/*
	  In: Body
	*/
	Payload *dtos.Error `json:"body,omitempty"`
}

// NewGetShowdocReportsIDPdfNotFound creates GetShowdocReportsIDPdfNotFound with default headers values
func NewGetShowdocReportsIDPdfNotFound() *GetShowdocReportsIDPdfNotFound {

	return &GetShowdocReportsIDPdfNotFound{}
}

// WithPayload adds the payload to the get showdoc reports Id pdf not found response
func (o *GetShowdocReportsIDPdfNotFound) WithPayload(payload *dtos.Error) *GetShowdocReportsIDPdfNotFound {
	o.Payload = payload
	return o
}

// SetPayload sets the payload to the get showdoc reports Id pdf not found response
func (o *GetShowdocReportsIDPdfNotFound) SetPayload(payload *dtos.Error) {
	o.Payload = payload
}

// WriteResponse to the client
func (o *GetShowdocReportsIDPdfNotFound) WriteResponse(rw http.ResponseWriter, producer runtime.Producer) {

	rw.WriteHeader(404)
	if o.Payload != nil {
		payload := o.Payload
		if err := producer.Produce(rw, payload); err != nil {
			panic(err) // let the recovery middleware deal with this
		}
	}
}

// GetShowdocReportsIDPdfInternalServerErrorCode is the HTTP code returned for type GetShowdocReportsIDPdfInternalServerError
const GetShowdocReportsIDPdfInternalServerErrorCode int = 500

/*
GetShowdocReportsIDPdfInternalServerError Error

swagger:response getShowdocReportsIdPdfInternalServerError
*/
type GetShowdocReportsIDPdfInternalServerError struct {

	/*
	  In: Body
	*/
	Payload *dtos.Error `json:"body,omitempty"`
}

// NewGetShowdocReportsIDPdfInternalServerError creates GetShowdocReportsIDPdfInternalServerError with default headers values
func NewGetShowdocReportsIDPdfInternalServerError() *GetShowdocReportsIDPdfInternalServerError {

	return &GetShowdocReportsIDPdfInternalServerError{}
}

// WithPayload adds the payload to the get showdoc reports Id pdf internal server error response
func (o *GetShowdocReportsIDPdfInternalServerError) WithPayload(payload *dtos.Error) *GetShowdocReportsIDPdfInternalServerError {
	o.Payload = payload
	return o
}

// SetPayload sets the payload to the get showdoc reports Id pdf internal server error response
func (o *GetShowdocReportsIDPdfInternalServerError) SetPayload(payload *dtos.Error) {
	o.Payload = payload
}

// WriteResponse to the client
func (o *GetShowdocReportsIDPdfInternalServerError) WriteResponse(rw http.ResponseWriter, producer runtime.Producer) {

	rw.WriteHeader(500)
	if o.Payload != nil {
		payload := o.Payload
		if err := producer.Produce(rw, payload); err != nil {
			panic(err) // let the recovery middleware deal with this
		}
	}
}
