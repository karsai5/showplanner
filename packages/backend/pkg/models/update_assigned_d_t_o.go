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

// UpdateAssignedDTO update assigned d t o
//
// swagger:model updateAssignedDTO
type UpdateAssignedDTO struct {

	// person Id
	// Required: true
	// Format: uuid
	PersonID *strfmt.UUID `json:"personId"`
}

// Validate validates this update assigned d t o
func (m *UpdateAssignedDTO) Validate(formats strfmt.Registry) error {
	var res []error

	if err := m.validatePersonID(formats); err != nil {
		res = append(res, err)
	}

	if len(res) > 0 {
		return errors.CompositeValidationError(res...)
	}
	return nil
}

func (m *UpdateAssignedDTO) validatePersonID(formats strfmt.Registry) error {

	if err := validate.Required("personId", "body", m.PersonID); err != nil {
		return err
	}

	if err := validate.FormatOf("personId", "body", "uuid", m.PersonID.String(), formats); err != nil {
		return err
	}

	return nil
}

// ContextValidate validates this update assigned d t o based on context it is used
func (m *UpdateAssignedDTO) ContextValidate(ctx context.Context, formats strfmt.Registry) error {
	return nil
}

// MarshalBinary interface implementation
func (m *UpdateAssignedDTO) MarshalBinary() ([]byte, error) {
	if m == nil {
		return nil, nil
	}
	return swag.WriteJSON(m)
}

// UnmarshalBinary interface implementation
func (m *UpdateAssignedDTO) UnmarshalBinary(b []byte) error {
	var res UpdateAssignedDTO
	if err := swag.ReadJSON(b, &res); err != nil {
		return err
	}
	*m = res
	return nil
}
