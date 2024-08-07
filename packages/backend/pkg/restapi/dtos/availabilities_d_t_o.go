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
)

// AvailabilitiesDTO availabilities d t o
//
// swagger:model AvailabilitiesDTO
type AvailabilitiesDTO struct {

	// events
	Events []*AvailabilitiesDTOEventsItems0 `json:"events"`

	// people
	People []*PersonSummaryDTO `json:"people"`
}

// Validate validates this availabilities d t o
func (m *AvailabilitiesDTO) Validate(formats strfmt.Registry) error {
	var res []error

	if err := m.validateEvents(formats); err != nil {
		res = append(res, err)
	}

	if err := m.validatePeople(formats); err != nil {
		res = append(res, err)
	}

	if len(res) > 0 {
		return errors.CompositeValidationError(res...)
	}
	return nil
}

func (m *AvailabilitiesDTO) validateEvents(formats strfmt.Registry) error {
	if swag.IsZero(m.Events) { // not required
		return nil
	}

	for i := 0; i < len(m.Events); i++ {
		if swag.IsZero(m.Events[i]) { // not required
			continue
		}

		if m.Events[i] != nil {
			if err := m.Events[i].Validate(formats); err != nil {
				if ve, ok := err.(*errors.Validation); ok {
					return ve.ValidateName("events" + "." + strconv.Itoa(i))
				} else if ce, ok := err.(*errors.CompositeError); ok {
					return ce.ValidateName("events" + "." + strconv.Itoa(i))
				}
				return err
			}
		}

	}

	return nil
}

func (m *AvailabilitiesDTO) validatePeople(formats strfmt.Registry) error {
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

// ContextValidate validate this availabilities d t o based on the context it is used
func (m *AvailabilitiesDTO) ContextValidate(ctx context.Context, formats strfmt.Registry) error {
	var res []error

	if err := m.contextValidateEvents(ctx, formats); err != nil {
		res = append(res, err)
	}

	if err := m.contextValidatePeople(ctx, formats); err != nil {
		res = append(res, err)
	}

	if len(res) > 0 {
		return errors.CompositeValidationError(res...)
	}
	return nil
}

func (m *AvailabilitiesDTO) contextValidateEvents(ctx context.Context, formats strfmt.Registry) error {

	for i := 0; i < len(m.Events); i++ {

		if m.Events[i] != nil {

			if swag.IsZero(m.Events[i]) { // not required
				return nil
			}

			if err := m.Events[i].ContextValidate(ctx, formats); err != nil {
				if ve, ok := err.(*errors.Validation); ok {
					return ve.ValidateName("events" + "." + strconv.Itoa(i))
				} else if ce, ok := err.(*errors.CompositeError); ok {
					return ce.ValidateName("events" + "." + strconv.Itoa(i))
				}
				return err
			}
		}

	}

	return nil
}

func (m *AvailabilitiesDTO) contextValidatePeople(ctx context.Context, formats strfmt.Registry) error {

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
func (m *AvailabilitiesDTO) MarshalBinary() ([]byte, error) {
	if m == nil {
		return nil, nil
	}
	return swag.WriteJSON(m)
}

// UnmarshalBinary interface implementation
func (m *AvailabilitiesDTO) UnmarshalBinary(b []byte) error {
	var res AvailabilitiesDTO
	if err := swag.ReadJSON(b, &res); err != nil {
		return err
	}
	*m = res
	return nil
}

// AvailabilitiesDTOEventsItems0 availabilities d t o events items0
//
// swagger:model AvailabilitiesDTOEventsItems0
type AvailabilitiesDTOEventsItems0 struct {
	EventDTO

	// availabilities
	Availabilities []*AvailabilityDTO `json:"availabilities"`
}

// UnmarshalJSON unmarshals this object from a JSON structure
func (m *AvailabilitiesDTOEventsItems0) UnmarshalJSON(raw []byte) error {
	// AO0
	var aO0 EventDTO
	if err := swag.ReadJSON(raw, &aO0); err != nil {
		return err
	}
	m.EventDTO = aO0

	// AO1
	var dataAO1 struct {
		Availabilities []*AvailabilityDTO `json:"availabilities"`
	}
	if err := swag.ReadJSON(raw, &dataAO1); err != nil {
		return err
	}

	m.Availabilities = dataAO1.Availabilities

	return nil
}

// MarshalJSON marshals this object to a JSON structure
func (m AvailabilitiesDTOEventsItems0) MarshalJSON() ([]byte, error) {
	_parts := make([][]byte, 0, 2)

	aO0, err := swag.WriteJSON(m.EventDTO)
	if err != nil {
		return nil, err
	}
	_parts = append(_parts, aO0)
	var dataAO1 struct {
		Availabilities []*AvailabilityDTO `json:"availabilities"`
	}

	dataAO1.Availabilities = m.Availabilities

	jsonDataAO1, errAO1 := swag.WriteJSON(dataAO1)
	if errAO1 != nil {
		return nil, errAO1
	}
	_parts = append(_parts, jsonDataAO1)
	return swag.ConcatJSON(_parts...), nil
}

// Validate validates this availabilities d t o events items0
func (m *AvailabilitiesDTOEventsItems0) Validate(formats strfmt.Registry) error {
	var res []error

	// validation for a type composition with EventDTO
	if err := m.EventDTO.Validate(formats); err != nil {
		res = append(res, err)
	}

	if err := m.validateAvailabilities(formats); err != nil {
		res = append(res, err)
	}

	if len(res) > 0 {
		return errors.CompositeValidationError(res...)
	}
	return nil
}

func (m *AvailabilitiesDTOEventsItems0) validateAvailabilities(formats strfmt.Registry) error {

	if swag.IsZero(m.Availabilities) { // not required
		return nil
	}

	for i := 0; i < len(m.Availabilities); i++ {
		if swag.IsZero(m.Availabilities[i]) { // not required
			continue
		}

		if m.Availabilities[i] != nil {
			if err := m.Availabilities[i].Validate(formats); err != nil {
				if ve, ok := err.(*errors.Validation); ok {
					return ve.ValidateName("availabilities" + "." + strconv.Itoa(i))
				} else if ce, ok := err.(*errors.CompositeError); ok {
					return ce.ValidateName("availabilities" + "." + strconv.Itoa(i))
				}
				return err
			}
		}

	}

	return nil
}

// ContextValidate validate this availabilities d t o events items0 based on the context it is used
func (m *AvailabilitiesDTOEventsItems0) ContextValidate(ctx context.Context, formats strfmt.Registry) error {
	var res []error

	// validation for a type composition with EventDTO
	if err := m.EventDTO.ContextValidate(ctx, formats); err != nil {
		res = append(res, err)
	}

	if err := m.contextValidateAvailabilities(ctx, formats); err != nil {
		res = append(res, err)
	}

	if len(res) > 0 {
		return errors.CompositeValidationError(res...)
	}
	return nil
}

func (m *AvailabilitiesDTOEventsItems0) contextValidateAvailabilities(ctx context.Context, formats strfmt.Registry) error {

	for i := 0; i < len(m.Availabilities); i++ {

		if m.Availabilities[i] != nil {

			if swag.IsZero(m.Availabilities[i]) { // not required
				return nil
			}

			if err := m.Availabilities[i].ContextValidate(ctx, formats); err != nil {
				if ve, ok := err.(*errors.Validation); ok {
					return ve.ValidateName("availabilities" + "." + strconv.Itoa(i))
				} else if ce, ok := err.(*errors.CompositeError); ok {
					return ce.ValidateName("availabilities" + "." + strconv.Itoa(i))
				}
				return err
			}
		}

	}

	return nil
}

// MarshalBinary interface implementation
func (m *AvailabilitiesDTOEventsItems0) MarshalBinary() ([]byte, error) {
	if m == nil {
		return nil, nil
	}
	return swag.WriteJSON(m)
}

// UnmarshalBinary interface implementation
func (m *AvailabilitiesDTOEventsItems0) UnmarshalBinary(b []byte) error {
	var res AvailabilitiesDTOEventsItems0
	if err := swag.ReadJSON(b, &res); err != nil {
		return err
	}
	*m = res
	return nil
}
