// Code generated by go-swagger; DO NOT EDIT.

package rostering

// This file was generated by the swagger tool.
// Editing this file might prove futile when you re-run the swagger generate command

import (
	"net/http"

	"github.com/go-openapi/runtime"

	"showplanner.io/pkg/restapi/dtos"
)

// GetShowsShowSlugSummaryOKCode is the HTTP code returned for type GetShowsShowSlugSummaryOK
const GetShowsShowSlugSummaryOKCode int = 200

/*
GetShowsShowSlugSummaryOK Show

swagger:response getShowsShowSlugSummaryOK
*/
type GetShowsShowSlugSummaryOK struct {

	/*
	  In: Body
	*/
	Payload *dtos.ShowSummaryDTO `json:"body,omitempty"`
}

// NewGetShowsShowSlugSummaryOK creates GetShowsShowSlugSummaryOK with default headers values
func NewGetShowsShowSlugSummaryOK() *GetShowsShowSlugSummaryOK {

	return &GetShowsShowSlugSummaryOK{}
}

// WithPayload adds the payload to the get shows show slug summary o k response
func (o *GetShowsShowSlugSummaryOK) WithPayload(payload *dtos.ShowSummaryDTO) *GetShowsShowSlugSummaryOK {
	o.Payload = payload
	return o
}

// SetPayload sets the payload to the get shows show slug summary o k response
func (o *GetShowsShowSlugSummaryOK) SetPayload(payload *dtos.ShowSummaryDTO) {
	o.Payload = payload
}

// WriteResponse to the client
func (o *GetShowsShowSlugSummaryOK) WriteResponse(rw http.ResponseWriter, producer runtime.Producer) {

	rw.WriteHeader(200)
	if o.Payload != nil {
		payload := o.Payload
		if err := producer.Produce(rw, payload); err != nil {
			panic(err) // let the recovery middleware deal with this
		}
	}
}

// GetShowsShowSlugSummaryUnauthorizedCode is the HTTP code returned for type GetShowsShowSlugSummaryUnauthorized
const GetShowsShowSlugSummaryUnauthorizedCode int = 401

/*
GetShowsShowSlugSummaryUnauthorized Error

swagger:response getShowsShowSlugSummaryUnauthorized
*/
type GetShowsShowSlugSummaryUnauthorized struct {

	/*
	  In: Body
	*/
	Payload *dtos.Error `json:"body,omitempty"`
}

// NewGetShowsShowSlugSummaryUnauthorized creates GetShowsShowSlugSummaryUnauthorized with default headers values
func NewGetShowsShowSlugSummaryUnauthorized() *GetShowsShowSlugSummaryUnauthorized {

	return &GetShowsShowSlugSummaryUnauthorized{}
}

// WithPayload adds the payload to the get shows show slug summary unauthorized response
func (o *GetShowsShowSlugSummaryUnauthorized) WithPayload(payload *dtos.Error) *GetShowsShowSlugSummaryUnauthorized {
	o.Payload = payload
	return o
}

// SetPayload sets the payload to the get shows show slug summary unauthorized response
func (o *GetShowsShowSlugSummaryUnauthorized) SetPayload(payload *dtos.Error) {
	o.Payload = payload
}

// WriteResponse to the client
func (o *GetShowsShowSlugSummaryUnauthorized) WriteResponse(rw http.ResponseWriter, producer runtime.Producer) {

	rw.WriteHeader(401)
	if o.Payload != nil {
		payload := o.Payload
		if err := producer.Produce(rw, payload); err != nil {
			panic(err) // let the recovery middleware deal with this
		}
	}
}

// GetShowsShowSlugSummaryNotFoundCode is the HTTP code returned for type GetShowsShowSlugSummaryNotFound
const GetShowsShowSlugSummaryNotFoundCode int = 404

/*
GetShowsShowSlugSummaryNotFound Error

swagger:response getShowsShowSlugSummaryNotFound
*/
type GetShowsShowSlugSummaryNotFound struct {

	/*
	  In: Body
	*/
	Payload *dtos.Error `json:"body,omitempty"`
}

// NewGetShowsShowSlugSummaryNotFound creates GetShowsShowSlugSummaryNotFound with default headers values
func NewGetShowsShowSlugSummaryNotFound() *GetShowsShowSlugSummaryNotFound {

	return &GetShowsShowSlugSummaryNotFound{}
}

// WithPayload adds the payload to the get shows show slug summary not found response
func (o *GetShowsShowSlugSummaryNotFound) WithPayload(payload *dtos.Error) *GetShowsShowSlugSummaryNotFound {
	o.Payload = payload
	return o
}

// SetPayload sets the payload to the get shows show slug summary not found response
func (o *GetShowsShowSlugSummaryNotFound) SetPayload(payload *dtos.Error) {
	o.Payload = payload
}

// WriteResponse to the client
func (o *GetShowsShowSlugSummaryNotFound) WriteResponse(rw http.ResponseWriter, producer runtime.Producer) {

	rw.WriteHeader(404)
	if o.Payload != nil {
		payload := o.Payload
		if err := producer.Produce(rw, payload); err != nil {
			panic(err) // let the recovery middleware deal with this
		}
	}
}

// GetShowsShowSlugSummaryInternalServerErrorCode is the HTTP code returned for type GetShowsShowSlugSummaryInternalServerError
const GetShowsShowSlugSummaryInternalServerErrorCode int = 500

/*
GetShowsShowSlugSummaryInternalServerError Error

swagger:response getShowsShowSlugSummaryInternalServerError
*/
type GetShowsShowSlugSummaryInternalServerError struct {

	/*
	  In: Body
	*/
	Payload *dtos.Error `json:"body,omitempty"`
}

// NewGetShowsShowSlugSummaryInternalServerError creates GetShowsShowSlugSummaryInternalServerError with default headers values
func NewGetShowsShowSlugSummaryInternalServerError() *GetShowsShowSlugSummaryInternalServerError {

	return &GetShowsShowSlugSummaryInternalServerError{}
}

// WithPayload adds the payload to the get shows show slug summary internal server error response
func (o *GetShowsShowSlugSummaryInternalServerError) WithPayload(payload *dtos.Error) *GetShowsShowSlugSummaryInternalServerError {
	o.Payload = payload
	return o
}

// SetPayload sets the payload to the get shows show slug summary internal server error response
func (o *GetShowsShowSlugSummaryInternalServerError) SetPayload(payload *dtos.Error) {
	o.Payload = payload
}

// WriteResponse to the client
func (o *GetShowsShowSlugSummaryInternalServerError) WriteResponse(rw http.ResponseWriter, producer runtime.Producer) {

	rw.WriteHeader(500)
	if o.Payload != nil {
		payload := o.Payload
		if err := producer.Produce(rw, payload); err != nil {
			panic(err) // let the recovery middleware deal with this
		}
	}
}
