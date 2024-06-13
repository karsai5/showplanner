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

	// options
	Options *EventOptionsDTO `json:"options,omitempty"`

	// shortnote
	Shortnote *string `json:"shortnote,omitempty"`

	// show Id
	ShowID int64 `json:"showId,omitempty"`

	// show report
	// Format: uuid
	ShowReport *strfmt.UUID `json:"showReport,omitempty"`

	// show timer
	// Format: uuid
	ShowTimer *strfmt.UUID `json:"showTimer,omitempty"`

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

	if err := m.validateOptions(formats); err != nil {
		res = append(res, err)
	}

	if err := m.validateShowReport(formats); err != nil {
		res = append(res, err)
	}

	if err := m.validateShowTimer(formats); err != nil {
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

func (m *EventDTO) validateOptions(formats strfmt.Registry) error {
	if swag.IsZero(m.Options) { // not required
		return nil
	}

	if m.Options != nil {
		if err := m.Options.Validate(formats); err != nil {
			if ve, ok := err.(*errors.Validation); ok {
				return ve.ValidateName("options")
			} else if ce, ok := err.(*errors.CompositeError); ok {
				return ce.ValidateName("options")
			}
			return err
		}
	}

	return nil
}

func (m *EventDTO) validateShowReport(formats strfmt.Registry) error {
	if swag.IsZero(m.ShowReport) { // not required
		return nil
	}

	if err := validate.FormatOf("showReport", "body", "uuid", m.ShowReport.String(), formats); err != nil {
		return err
	}

	return nil
}

func (m *EventDTO) validateShowTimer(formats strfmt.Registry) error {
	if swag.IsZero(m.ShowTimer) { // not required
		return nil
	}

	if err := validate.FormatOf("showTimer", "body", "uuid", m.ShowTimer.String(), formats); err != nil {
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

// ContextValidate validate this event d t o based on the context it is used
func (m *EventDTO) ContextValidate(ctx context.Context, formats strfmt.Registry) error {
	var res []error

	if err := m.contextValidateOptions(ctx, formats); err != nil {
		res = append(res, err)
	}

	if len(res) > 0 {
		return errors.CompositeValidationError(res...)
	}
	return nil
}

func (m *EventDTO) contextValidateOptions(ctx context.Context, formats strfmt.Registry) error {

	if m.Options != nil {

		if swag.IsZero(m.Options) { // not required
			return nil
		}

		if err := m.Options.ContextValidate(ctx, formats); err != nil {
			if ve, ok := err.(*errors.Validation); ok {
				return ve.ValidateName("options")
			} else if ce, ok := err.(*errors.CompositeError); ok {
				return ce.ValidateName("options")
			}
			return err
		}
	}

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
