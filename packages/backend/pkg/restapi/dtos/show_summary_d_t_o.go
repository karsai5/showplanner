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

// ShowSummaryDTO show summary d t o
//
// swagger:model showSummaryDTO
type ShowSummaryDTO struct {

	// company
	// Required: true
	Company *string `json:"company"`

	// id
	// Required: true
	ID *int64 `json:"id"`

	// is roster released
	IsRosterReleased *bool `json:"isRosterReleased,omitempty"`

	// name
	// Required: true
	Name *string `json:"name"`

	// slug
	// Required: true
	Slug *string `json:"slug"`
}

// Validate validates this show summary d t o
func (m *ShowSummaryDTO) Validate(formats strfmt.Registry) error {
	var res []error

	if err := m.validateCompany(formats); err != nil {
		res = append(res, err)
	}

	if err := m.validateID(formats); err != nil {
		res = append(res, err)
	}

	if err := m.validateName(formats); err != nil {
		res = append(res, err)
	}

	if err := m.validateSlug(formats); err != nil {
		res = append(res, err)
	}

	if len(res) > 0 {
		return errors.CompositeValidationError(res...)
	}
	return nil
}

func (m *ShowSummaryDTO) validateCompany(formats strfmt.Registry) error {

	if err := validate.Required("company", "body", m.Company); err != nil {
		return err
	}

	return nil
}

func (m *ShowSummaryDTO) validateID(formats strfmt.Registry) error {

	if err := validate.Required("id", "body", m.ID); err != nil {
		return err
	}

	return nil
}

func (m *ShowSummaryDTO) validateName(formats strfmt.Registry) error {

	if err := validate.Required("name", "body", m.Name); err != nil {
		return err
	}

	return nil
}

func (m *ShowSummaryDTO) validateSlug(formats strfmt.Registry) error {

	if err := validate.Required("slug", "body", m.Slug); err != nil {
		return err
	}

	return nil
}

// ContextValidate validates this show summary d t o based on context it is used
func (m *ShowSummaryDTO) ContextValidate(ctx context.Context, formats strfmt.Registry) error {
	return nil
}

// MarshalBinary interface implementation
func (m *ShowSummaryDTO) MarshalBinary() ([]byte, error) {
	if m == nil {
		return nil, nil
	}
	return swag.WriteJSON(m)
}

// UnmarshalBinary interface implementation
func (m *ShowSummaryDTO) UnmarshalBinary(b []byte) error {
	var res ShowSummaryDTO
	if err := swag.ReadJSON(b, &res); err != nil {
		return err
	}
	*m = res
	return nil
}
