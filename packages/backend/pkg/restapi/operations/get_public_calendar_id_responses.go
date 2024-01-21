// Code generated by go-swagger; DO NOT EDIT.

package operations

// This file was generated by the swagger tool.
// Editing this file might prove futile when you re-run the swagger generate command

import (
	"net/http"

	"github.com/go-openapi/runtime"

	"showplanner.io/pkg/models"
)

// GetPublicCalendarIDOKCode is the HTTP code returned for type GetPublicCalendarIDOK
const GetPublicCalendarIDOKCode int = 200

/*
GetPublicCalendarIDOK OK

swagger:response getPublicCalendarIdOK
*/
type GetPublicCalendarIDOK struct {

	/*
	  In: Body
	*/
	Payload string `json:"body,omitempty"`
}

// NewGetPublicCalendarIDOK creates GetPublicCalendarIDOK with default headers values
func NewGetPublicCalendarIDOK() *GetPublicCalendarIDOK {

	return &GetPublicCalendarIDOK{}
}

// WithPayload adds the payload to the get public calendar Id o k response
func (o *GetPublicCalendarIDOK) WithPayload(payload string) *GetPublicCalendarIDOK {
	o.Payload = payload
	return o
}

// SetPayload sets the payload to the get public calendar Id o k response
func (o *GetPublicCalendarIDOK) SetPayload(payload string) {
	o.Payload = payload
}

// WriteResponse to the client
func (o *GetPublicCalendarIDOK) WriteResponse(rw http.ResponseWriter, producer runtime.Producer) {

	rw.WriteHeader(200)
	payload := o.Payload
	if err := producer.Produce(rw, payload); err != nil {
		panic(err) // let the recovery middleware deal with this
	}
}

// GetPublicCalendarIDNotFoundCode is the HTTP code returned for type GetPublicCalendarIDNotFound
const GetPublicCalendarIDNotFoundCode int = 404

/*
GetPublicCalendarIDNotFound Error

swagger:response getPublicCalendarIdNotFound
*/
type GetPublicCalendarIDNotFound struct {

	/*
	  In: Body
	*/
	Payload *models.Error `json:"body,omitempty"`
}

// NewGetPublicCalendarIDNotFound creates GetPublicCalendarIDNotFound with default headers values
func NewGetPublicCalendarIDNotFound() *GetPublicCalendarIDNotFound {

	return &GetPublicCalendarIDNotFound{}
}

// WithPayload adds the payload to the get public calendar Id not found response
func (o *GetPublicCalendarIDNotFound) WithPayload(payload *models.Error) *GetPublicCalendarIDNotFound {
	o.Payload = payload
	return o
}

// SetPayload sets the payload to the get public calendar Id not found response
func (o *GetPublicCalendarIDNotFound) SetPayload(payload *models.Error) {
	o.Payload = payload
}

// WriteResponse to the client
func (o *GetPublicCalendarIDNotFound) WriteResponse(rw http.ResponseWriter, producer runtime.Producer) {

	rw.WriteHeader(404)
	if o.Payload != nil {
		payload := o.Payload
		if err := producer.Produce(rw, payload); err != nil {
			panic(err) // let the recovery middleware deal with this
		}
	}
}

// GetPublicCalendarIDInternalServerErrorCode is the HTTP code returned for type GetPublicCalendarIDInternalServerError
const GetPublicCalendarIDInternalServerErrorCode int = 500

/*
GetPublicCalendarIDInternalServerError Error

swagger:response getPublicCalendarIdInternalServerError
*/
type GetPublicCalendarIDInternalServerError struct {

	/*
	  In: Body
	*/
	Payload *models.Error `json:"body,omitempty"`
}

// NewGetPublicCalendarIDInternalServerError creates GetPublicCalendarIDInternalServerError with default headers values
func NewGetPublicCalendarIDInternalServerError() *GetPublicCalendarIDInternalServerError {

	return &GetPublicCalendarIDInternalServerError{}
}

// WithPayload adds the payload to the get public calendar Id internal server error response
func (o *GetPublicCalendarIDInternalServerError) WithPayload(payload *models.Error) *GetPublicCalendarIDInternalServerError {
	o.Payload = payload
	return o
}

// SetPayload sets the payload to the get public calendar Id internal server error response
func (o *GetPublicCalendarIDInternalServerError) SetPayload(payload *models.Error) {
	o.Payload = payload
}

// WriteResponse to the client
func (o *GetPublicCalendarIDInternalServerError) WriteResponse(rw http.ResponseWriter, producer runtime.Producer) {

	rw.WriteHeader(500)
	if o.Payload != nil {
		payload := o.Payload
		if err := producer.Produce(rw, payload); err != nil {
			panic(err) // let the recovery middleware deal with this
		}
	}
}