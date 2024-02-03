// Code generated by go-swagger; DO NOT EDIT.

package models

// This file was generated by the swagger tool.
// Editing this file might prove futile when you re-run the swagger generate command

import (
	"context"
	"strconv"

	"github.com/go-openapi/errors"
	"github.com/go-openapi/strfmt"
	"github.com/go-openapi/swag"
)

// PersonnelDTO personnel d t o
//
// swagger:model PersonnelDTO
type PersonnelDTO struct {

	// people
	People []*PersonSummaryDTO `json:"people"`
}

// Validate validates this personnel d t o
func (m *PersonnelDTO) Validate(formats strfmt.Registry) error {
	var res []error

	if err := m.validatePeople(formats); err != nil {
		res = append(res, err)
	}

	if len(res) > 0 {
		return errors.CompositeValidationError(res...)
	}
	return nil
}

func (m *PersonnelDTO) validatePeople(formats strfmt.Registry) error {
	if swag.IsZero(m.People) { // not required
		return nil
	}

	for i := 0; i < len(m.People); i++ {
		if swag.IsZero(m.People[i]) { // not required
			continue
		}

		if m.People[i] != nil {
			if err := m.People[i].Validate(formats); err != nil {
				if ve, ok := err.(*errors.Validation); ok {
					return ve.ValidateName("people" + "." + strconv.Itoa(i))
				} else if ce, ok := err.(*errors.CompositeError); ok {
					return ce.ValidateName("people" + "." + strconv.Itoa(i))
				}
				return err
			}
		}

	}

	return nil
}

// ContextValidate validate this personnel d t o based on the context it is used
func (m *PersonnelDTO) ContextValidate(ctx context.Context, formats strfmt.Registry) error {
	var res []error

	if err := m.contextValidatePeople(ctx, formats); err != nil {
		res = append(res, err)
	}

	if len(res) > 0 {
		return errors.CompositeValidationError(res...)
	}
	return nil
}

func (m *PersonnelDTO) contextValidatePeople(ctx context.Context, formats strfmt.Registry) error {

	for i := 0; i < len(m.People); i++ {

		if m.People[i] != nil {

			if swag.IsZero(m.People[i]) { // not required
				return nil
			}

			if err := m.People[i].ContextValidate(ctx, formats); err != nil {
				if ve, ok := err.(*errors.Validation); ok {
					return ve.ValidateName("people" + "." + strconv.Itoa(i))
				} else if ce, ok := err.(*errors.CompositeError); ok {
					return ce.ValidateName("people" + "." + strconv.Itoa(i))
				}
				return err
			}
		}

	}

	return nil
}

// MarshalBinary interface implementation
func (m *PersonnelDTO) MarshalBinary() ([]byte, error) {
	if m == nil {
		return nil, nil
	}
	return swag.WriteJSON(m)
}

// UnmarshalBinary interface implementation
func (m *PersonnelDTO) UnmarshalBinary(b []byte) error {
	var res PersonnelDTO
	if err := swag.ReadJSON(b, &res); err != nil {
		return err
	}
	*m = res
	return nil
}
