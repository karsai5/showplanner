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

// PersonUpdateDTO person update d t o
//
// swagger:model PersonUpdateDTO
type PersonUpdateDTO struct {

	// allergies
	// Required: true
	Allergies *string `json:"allergies"`

	// dob
	// Required: true
	Dob *string `json:"dob"`

	// email
	// Required: true
	Email *string `json:"email"`

	// emergency name
	// Required: true
	EmergencyName *string `json:"emergencyName"`

	// emergency phone
	// Required: true
	EmergencyPhone *string `json:"emergencyPhone"`

	// emergency relationship
	// Required: true
	EmergencyRelationship *string `json:"emergencyRelationship"`

	// first name
	// Required: true
	FirstName *string `json:"firstName"`

	// hear about us
	HearAboutUs string `json:"hearAboutUs,omitempty"`

	// last name
	// Required: true
	LastName *string `json:"lastName"`

	// phone
	// Required: true
	Phone *string `json:"phone"`

	// previous work
	PreviousWork string `json:"previousWork,omitempty"`

	// pronoun
	Pronoun string `json:"pronoun,omitempty"`

	// reason for crewing
	ReasonForCrewing string `json:"reasonForCrewing,omitempty"`

	// wwc
	Wwc string `json:"wwc,omitempty"`
}

// Validate validates this person update d t o
func (m *PersonUpdateDTO) Validate(formats strfmt.Registry) error {
	var res []error

	if err := m.validateAllergies(formats); err != nil {
		res = append(res, err)
	}

	if err := m.validateDob(formats); err != nil {
		res = append(res, err)
	}

	if err := m.validateEmail(formats); err != nil {
		res = append(res, err)
	}

	if err := m.validateEmergencyName(formats); err != nil {
		res = append(res, err)
	}

	if err := m.validateEmergencyPhone(formats); err != nil {
		res = append(res, err)
	}

	if err := m.validateEmergencyRelationship(formats); err != nil {
		res = append(res, err)
	}

	if err := m.validateFirstName(formats); err != nil {
		res = append(res, err)
	}

	if err := m.validateLastName(formats); err != nil {
		res = append(res, err)
	}

	if err := m.validatePhone(formats); err != nil {
		res = append(res, err)
	}

	if len(res) > 0 {
		return errors.CompositeValidationError(res...)
	}
	return nil
}

func (m *PersonUpdateDTO) validateAllergies(formats strfmt.Registry) error {

	if err := validate.Required("allergies", "body", m.Allergies); err != nil {
		return err
	}

	return nil
}

func (m *PersonUpdateDTO) validateDob(formats strfmt.Registry) error {

	if err := validate.Required("dob", "body", m.Dob); err != nil {
		return err
	}

	return nil
}

func (m *PersonUpdateDTO) validateEmail(formats strfmt.Registry) error {

	if err := validate.Required("email", "body", m.Email); err != nil {
		return err
	}

	return nil
}

func (m *PersonUpdateDTO) validateEmergencyName(formats strfmt.Registry) error {

	if err := validate.Required("emergencyName", "body", m.EmergencyName); err != nil {
		return err
	}

	return nil
}

func (m *PersonUpdateDTO) validateEmergencyPhone(formats strfmt.Registry) error {

	if err := validate.Required("emergencyPhone", "body", m.EmergencyPhone); err != nil {
		return err
	}

	return nil
}

func (m *PersonUpdateDTO) validateEmergencyRelationship(formats strfmt.Registry) error {

	if err := validate.Required("emergencyRelationship", "body", m.EmergencyRelationship); err != nil {
		return err
	}

	return nil
}

func (m *PersonUpdateDTO) validateFirstName(formats strfmt.Registry) error {

	if err := validate.Required("firstName", "body", m.FirstName); err != nil {
		return err
	}

	return nil
}

func (m *PersonUpdateDTO) validateLastName(formats strfmt.Registry) error {

	if err := validate.Required("lastName", "body", m.LastName); err != nil {
		return err
	}

	return nil
}

func (m *PersonUpdateDTO) validatePhone(formats strfmt.Registry) error {

	if err := validate.Required("phone", "body", m.Phone); err != nil {
		return err
	}

	return nil
}

// ContextValidate validates this person update d t o based on context it is used
func (m *PersonUpdateDTO) ContextValidate(ctx context.Context, formats strfmt.Registry) error {
	return nil
}

// MarshalBinary interface implementation
func (m *PersonUpdateDTO) MarshalBinary() ([]byte, error) {
	if m == nil {
		return nil, nil
	}
	return swag.WriteJSON(m)
}

// UnmarshalBinary interface implementation
func (m *PersonUpdateDTO) UnmarshalBinary(b []byte) error {
	var res PersonUpdateDTO
	if err := swag.ReadJSON(b, &res); err != nil {
		return err
	}
	*m = res
	return nil
}
