// Code generated by go-swagger; DO NOT EDIT.

package dtos

// This file was generated by the swagger tool.
// Editing this file might prove futile when you re-run the swagger generate command

import (
	"context"
	"strconv"

	"github.com/go-openapi/errors"
	"github.com/go-openapi/strfmt"
	"github.com/go-openapi/swag"
	"github.com/go-openapi/validate"
)

// RosterAssignedDTO roster assigned d t o
//
// swagger:model rosterAssignedDTO
type RosterAssignedDTO struct {

	// assignment Id
	AssignmentID *int64 `json:"assignmentId,omitempty"`

	// available
	// Required: true
	Available *bool `json:"available"`

	// cover
	// Required: true
	Cover *bool `json:"cover"`

	// person
	// Required: true
	Person *PersonSummaryDTO `json:"person"`

	// warnings
	Warnings []*RosterWarningDTO `json:"warnings"`
}

// Validate validates this roster assigned d t o
func (m *RosterAssignedDTO) Validate(formats strfmt.Registry) error {
	var res []error

	if err := m.validateAvailable(formats); err != nil {
		res = append(res, err)
	}

	if err := m.validateCover(formats); err != nil {
		res = append(res, err)
	}

	if err := m.validatePerson(formats); err != nil {
		res = append(res, err)
	}

	if err := m.validateWarnings(formats); err != nil {
		res = append(res, err)
	}

	if len(res) > 0 {
		return errors.CompositeValidationError(res...)
	}
	return nil
}

func (m *RosterAssignedDTO) validateAvailable(formats strfmt.Registry) error {

	if err := validate.Required("available", "body", m.Available); err != nil {
		return err
	}

	return nil
}

func (m *RosterAssignedDTO) validateCover(formats strfmt.Registry) error {

	if err := validate.Required("cover", "body", m.Cover); err != nil {
		return err
	}

	return nil
}

func (m *RosterAssignedDTO) validatePerson(formats strfmt.Registry) error {

	if err := validate.Required("person", "body", m.Person); err != nil {
		return err
	}

	if m.Person != nil {
		if err := m.Person.Validate(formats); err != nil {
			if ve, ok := err.(*errors.Validation); ok {
				return ve.ValidateName("person")
			} else if ce, ok := err.(*errors.CompositeError); ok {
				return ce.ValidateName("person")
			}
			return err
		}
	}

	return nil
}

func (m *RosterAssignedDTO) validateWarnings(formats strfmt.Registry) error {
	if swag.IsZero(m.Warnings) { // not required
		return nil
	}

	for i := 0; i < len(m.Warnings); i++ {
		if swag.IsZero(m.Warnings[i]) { // not required
			continue
		}

		if m.Warnings[i] != nil {
			if err := m.Warnings[i].Validate(formats); err != nil {
				if ve, ok := err.(*errors.Validation); ok {
					return ve.ValidateName("warnings" + "." + strconv.Itoa(i))
				} else if ce, ok := err.(*errors.CompositeError); ok {
					return ce.ValidateName("warnings" + "." + strconv.Itoa(i))
				}
				return err
			}
		}

	}

	return nil
}

// ContextValidate validate this roster assigned d t o based on the context it is used
func (m *RosterAssignedDTO) ContextValidate(ctx context.Context, formats strfmt.Registry) error {
	var res []error

	if err := m.contextValidatePerson(ctx, formats); err != nil {
		res = append(res, err)
	}

	if err := m.contextValidateWarnings(ctx, formats); err != nil {
		res = append(res, err)
	}

	if len(res) > 0 {
		return errors.CompositeValidationError(res...)
	}
	return nil
}

func (m *RosterAssignedDTO) contextValidatePerson(ctx context.Context, formats strfmt.Registry) error {

	if m.Person != nil {

		if err := m.Person.ContextValidate(ctx, formats); err != nil {
			if ve, ok := err.(*errors.Validation); ok {
				return ve.ValidateName("person")
			} else if ce, ok := err.(*errors.CompositeError); ok {
				return ce.ValidateName("person")
			}
			return err
		}
	}

	return nil
}

func (m *RosterAssignedDTO) contextValidateWarnings(ctx context.Context, formats strfmt.Registry) error {

	for i := 0; i < len(m.Warnings); i++ {

		if m.Warnings[i] != nil {

			if swag.IsZero(m.Warnings[i]) { // not required
				return nil
			}

			if err := m.Warnings[i].ContextValidate(ctx, formats); err != nil {
				if ve, ok := err.(*errors.Validation); ok {
					return ve.ValidateName("warnings" + "." + strconv.Itoa(i))
				} else if ce, ok := err.(*errors.CompositeError); ok {
					return ce.ValidateName("warnings" + "." + strconv.Itoa(i))
				}
				return err
			}
		}

	}

	return nil
}

// MarshalBinary interface implementation
func (m *RosterAssignedDTO) MarshalBinary() ([]byte, error) {
	if m == nil {
		return nil, nil
	}
	return swag.WriteJSON(m)
}

// UnmarshalBinary interface implementation
func (m *RosterAssignedDTO) UnmarshalBinary(b []byte) error {
	var res RosterAssignedDTO
	if err := swag.ReadJSON(b, &res); err != nil {
		return err
	}
	*m = res
	return nil
}
