// Code generated by go-swagger; DO NOT EDIT.

package dtos

// This file was generated by the swagger tool.
// Editing this file might prove futile when you re-run the swagger generate command

import (
	"context"

	"github.com/go-openapi/errors"
	"github.com/go-openapi/strfmt"
	"github.com/go-openapi/swag"
	"github.com/go-openapi/validate"
)

// RosterWarningDTO roster warning d t o
//
// swagger:model rosterWarningDTO
type RosterWarningDTO struct {

	// anchor
	// Required: true
	Anchor string `json:"anchor"`

	// id
	// Required: true
	ID string `json:"id"`

	// message
	// Required: true
	Message string `json:"message"`
}

// Validate validates this roster warning d t o
func (m *RosterWarningDTO) Validate(formats strfmt.Registry) error {
	var res []error

	if err := m.validateAnchor(formats); err != nil {
		res = append(res, err)
	}

	if err := m.validateID(formats); err != nil {
		res = append(res, err)
	}

	if err := m.validateMessage(formats); err != nil {
		res = append(res, err)
	}

	if len(res) > 0 {
		return errors.CompositeValidationError(res...)
	}
	return nil
}

func (m *RosterWarningDTO) validateAnchor(formats strfmt.Registry) error {

	if err := validate.RequiredString("anchor", "body", m.Anchor); err != nil {
		return err
	}

	return nil
}

func (m *RosterWarningDTO) validateID(formats strfmt.Registry) error {

	if err := validate.RequiredString("id", "body", m.ID); err != nil {
		return err
	}

	return nil
}

func (m *RosterWarningDTO) validateMessage(formats strfmt.Registry) error {

	if err := validate.RequiredString("message", "body", m.Message); err != nil {
		return err
	}

	return nil
}

// ContextValidate validates this roster warning d t o based on context it is used
func (m *RosterWarningDTO) ContextValidate(ctx context.Context, formats strfmt.Registry) error {
	return nil
}

// MarshalBinary interface implementation
func (m *RosterWarningDTO) MarshalBinary() ([]byte, error) {
	if m == nil {
		return nil, nil
	}
	return swag.WriteJSON(m)
}

// UnmarshalBinary interface implementation
func (m *RosterWarningDTO) UnmarshalBinary(b []byte) error {
	var res RosterWarningDTO
	if err := swag.ReadJSON(b, &res); err != nil {
		return err
	}
	*m = res
	return nil
}
