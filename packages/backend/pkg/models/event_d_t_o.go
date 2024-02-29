// Code generated by go-swagger; DO NOT EDIT.

package models

// This file was generated by the swagger tool.
// Editing this file might prove futile when you re-run the swagger generate command

import (
	"context"

	"github.com/go-openapi/errors"
	"github.com/go-openapi/strfmt"
	"github.com/go-openapi/swag"
	"github.com/go-openapi/validate"
)

// EventDTO event d t o
//
// swagger:model eventDTO
type EventDTO struct {

	// address
	Address *string `json:"address,omitempty"`

	// curtains up
	// Format: date-time
	CurtainsUp *strfmt.DateTime `json:"curtainsUp,omitempty"`

	// end
	// Format: date-time
	End *strfmt.DateTime `json:"end,omitempty"`

	// id
	// Required: true
	ID *int64 `json:"id"`

	// name
	Name *string `json:"name,omitempty"`

	// name raw
	NameRaw *string `json:"nameRaw,omitempty"`

	// shortnote
	Shortnote *string `json:"shortnote,omitempty"`

	// show Id
	ShowID int64 `json:"showId,omitempty"`

	// start
	// Required: true
	// Format: date-time
	Start *strfmt.DateTime `json:"start"`
}

// Validate validates this event d t o
func (m *EventDTO) Validate(formats strfmt.Registry) error {
	var res []error

	if err := m.validateCurtainsUp(formats); err != nil {
		res = append(res, err)
	}

	if err := m.validateEnd(formats); err != nil {
		res = append(res, err)
	}

	if err := m.validateID(formats); err != nil {
		res = append(res, err)
	}

	if err := m.validateStart(formats); err != nil {
		res = append(res, err)
	}

	if len(res) > 0 {
		return errors.CompositeValidationError(res...)
	}
	return nil
}

func (m *EventDTO) validateCurtainsUp(formats strfmt.Registry) error {
	if swag.IsZero(m.CurtainsUp) { // not required
		return nil
	}

	if err := validate.FormatOf("curtainsUp", "body", "date-time", m.CurtainsUp.String(), formats); err != nil {
		return err
	}

	return nil
}

func (m *EventDTO) validateEnd(formats strfmt.Registry) error {
	if swag.IsZero(m.End) { // not required
		return nil
	}

	if err := validate.FormatOf("end", "body", "date-time", m.End.String(), formats); err != nil {
		return err
	}

	return nil
}

func (m *EventDTO) validateID(formats strfmt.Registry) error {

	if err := validate.Required("id", "body", m.ID); err != nil {
		return err
	}

	return nil
}

func (m *EventDTO) validateStart(formats strfmt.Registry) error {

	if err := validate.Required("start", "body", m.Start); err != nil {
		return err
	}

	if err := validate.FormatOf("start", "body", "date-time", m.Start.String(), formats); err != nil {
		return err
	}

	return nil
}

// ContextValidate validates this event d t o based on context it is used
func (m *EventDTO) ContextValidate(ctx context.Context, formats strfmt.Registry) error {
	return nil
}

// MarshalBinary interface implementation
func (m *EventDTO) MarshalBinary() ([]byte, error) {
	if m == nil {
		return nil, nil
	}
	return swag.WriteJSON(m)
}

// UnmarshalBinary interface implementation
func (m *EventDTO) UnmarshalBinary(b []byte) error {
	var res EventDTO
	if err := swag.ReadJSON(b, &res); err != nil {
		return err
	}
	*m = res
	return nil
}
