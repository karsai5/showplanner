// Code generated by go-swagger; DO NOT EDIT.

package operations

// This file was generated by the swagger tool.
// Editing this file might prove futile when you re-run the swagger generate command

import (
	"net/http"

	"github.com/go-openapi/runtime"

	"go-backend/models"
)

// GetHealthOKCode is the HTTP code returned for type GetHealthOK
const GetHealthOKCode int = 200

/*
GetHealthOK OK

swagger:response getHealthOK
*/
type GetHealthOK struct {

	/*
	  In: Body
	*/
	Payload *models.HealthCheck `json:"body,omitempty"`
}

// NewGetHealthOK creates GetHealthOK with default headers values
func NewGetHealthOK() *GetHealthOK {

	return &GetHealthOK{}
}

// WithPayload adds the payload to the get health o k response
func (o *GetHealthOK) WithPayload(payload *models.HealthCheck) *GetHealthOK {
	o.Payload = payload
	return o
}

// SetPayload sets the payload to the get health o k response
func (o *GetHealthOK) SetPayload(payload *models.HealthCheck) {
	o.Payload = payload
}

// WriteResponse to the client
func (o *GetHealthOK) WriteResponse(rw http.ResponseWriter, producer runtime.Producer) {

	rw.WriteHeader(200)
	if o.Payload != nil {
		payload := o.Payload
		if err := producer.Produce(rw, payload); err != nil {
			panic(err) // let the recovery middleware deal with this
		}
	}
}
