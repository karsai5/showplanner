// Code generated by go-swagger; DO NOT EDIT.

package dtos

// This file was generated by the swagger tool.
// Editing this file might prove futile when you re-run the swagger generate command

import (
	"context"

	"github.com/go-openapi/strfmt"
	"github.com/go-openapi/swag"
)

// RosterWarningDTO roster warning d t o
//
// swagger:model rosterWarningDTO
type RosterWarningDTO struct {

	// anchor
	Anchor string `json:"anchor,omitempty"`

	// id
	ID string `json:"id,omitempty"`

	// message
	Message string `json:"message,omitempty"`
}

// Validate validates this roster warning d t o
func (m *RosterWarningDTO) Validate(formats strfmt.Registry) error {
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
