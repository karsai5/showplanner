// Code generated by go-swagger; DO NOT EDIT.

package operations

// This file was generated by the swagger tool.
// Editing this file might prove futile when you re-run the swagger generate command

import (
	"net/http"

	"github.com/go-openapi/runtime"

	"showplanner.io/pkg/models"
)

// GetShowsOKCode is the HTTP code returned for type GetShowsOK
const GetShowsOKCode int = 200

/*
GetShowsOK OK

swagger:response getShowsOK
*/
type GetShowsOK struct {

	/*
	  In: Body
	*/
	Payload []*models.ShowDTO `json:"body,omitempty"`
}

// NewGetShowsOK creates GetShowsOK with default headers values
func NewGetShowsOK() *GetShowsOK {

	return &GetShowsOK{}
}

// WithPayload adds the payload to the get shows o k response
func (o *GetShowsOK) WithPayload(payload []*models.ShowDTO) *GetShowsOK {
	o.Payload = payload
	return o
}

// SetPayload sets the payload to the get shows o k response
func (o *GetShowsOK) SetPayload(payload []*models.ShowDTO) {
	o.Payload = payload
}

// WriteResponse to the client
func (o *GetShowsOK) WriteResponse(rw http.ResponseWriter, producer runtime.Producer) {

	rw.WriteHeader(200)
	payload := o.Payload
	if payload == nil {
		// return empty array
		payload = make([]*models.ShowDTO, 0, 50)
	}

	if err := producer.Produce(rw, payload); err != nil {
		panic(err) // let the recovery middleware deal with this
	}
}

// GetShowsUnauthorizedCode is the HTTP code returned for type GetShowsUnauthorized
const GetShowsUnauthorizedCode int = 401

/*
GetShowsUnauthorized Error

swagger:response getShowsUnauthorized
*/
type GetShowsUnauthorized struct {

	/*
	  In: Body
	*/
	Payload *models.Error `json:"body,omitempty"`
}

// NewGetShowsUnauthorized creates GetShowsUnauthorized with default headers values
func NewGetShowsUnauthorized() *GetShowsUnauthorized {

	return &GetShowsUnauthorized{}
}

// WithPayload adds the payload to the get shows unauthorized response
func (o *GetShowsUnauthorized) WithPayload(payload *models.Error) *GetShowsUnauthorized {
	o.Payload = payload
	return o
}

// SetPayload sets the payload to the get shows unauthorized response
func (o *GetShowsUnauthorized) SetPayload(payload *models.Error) {
	o.Payload = payload
}

// WriteResponse to the client
func (o *GetShowsUnauthorized) WriteResponse(rw http.ResponseWriter, producer runtime.Producer) {

	rw.WriteHeader(401)
	if o.Payload != nil {
		payload := o.Payload
		if err := producer.Produce(rw, payload); err != nil {
			panic(err) // let the recovery middleware deal with this
		}
	}
}

// GetShowsInternalServerErrorCode is the HTTP code returned for type GetShowsInternalServerError
const GetShowsInternalServerErrorCode int = 500

/*
GetShowsInternalServerError Error

swagger:response getShowsInternalServerError
*/
type GetShowsInternalServerError struct {

	/*
	  In: Body
	*/
	Payload *models.Error `json:"body,omitempty"`
}

// NewGetShowsInternalServerError creates GetShowsInternalServerError with default headers values
func NewGetShowsInternalServerError() *GetShowsInternalServerError {

	return &GetShowsInternalServerError{}
}

// WithPayload adds the payload to the get shows internal server error response
func (o *GetShowsInternalServerError) WithPayload(payload *models.Error) *GetShowsInternalServerError {
	o.Payload = payload
	return o
}

// SetPayload sets the payload to the get shows internal server error response
func (o *GetShowsInternalServerError) SetPayload(payload *models.Error) {
	o.Payload = payload
}

// WriteResponse to the client
func (o *GetShowsInternalServerError) WriteResponse(rw http.ResponseWriter, producer runtime.Producer) {

	rw.WriteHeader(500)
	if o.Payload != nil {
		payload := o.Payload
		if err := producer.Produce(rw, payload); err != nil {
			panic(err) // let the recovery middleware deal with this
		}
	}
}
