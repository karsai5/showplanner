// Code generated by go-swagger; DO NOT EDIT.

package models

// This file was generated by the swagger tool.
// Editing this file might prove futile when you re-run the swagger generate command

import (
	"context"
	"encoding/json"
	"strconv"

	"github.com/go-openapi/errors"
	"github.com/go-openapi/strfmt"
	"github.com/go-openapi/swag"
	"github.com/go-openapi/validate"
)

// RosterDTO roster d t o
//
// swagger:model rosterDTO
type RosterDTO struct {

	// events
	Events []*RosterDTOEventsItems0 `json:"events"`

	// roles
	Roles []*RoleDTO `json:"roles"`
}

// Validate validates this roster d t o
func (m *RosterDTO) Validate(formats strfmt.Registry) error {
	var res []error

	if err := m.validateEvents(formats); err != nil {
		res = append(res, err)
	}

	if err := m.validateRoles(formats); err != nil {
		res = append(res, err)
	}

	if len(res) > 0 {
		return errors.CompositeValidationError(res...)
	}
	return nil
}

func (m *RosterDTO) validateEvents(formats strfmt.Registry) error {
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

func (m *RosterDTO) validateRoles(formats strfmt.Registry) error {
	if swag.IsZero(m.Roles) { // not required
		return nil
	}

	for i := 0; i < len(m.Roles); i++ {
		if swag.IsZero(m.Roles[i]) { // not required
			continue
		}

		if m.Roles[i] != nil {
			if err := m.Roles[i].Validate(formats); err != nil {
				if ve, ok := err.(*errors.Validation); ok {
					return ve.ValidateName("roles" + "." + strconv.Itoa(i))
				} else if ce, ok := err.(*errors.CompositeError); ok {
					return ce.ValidateName("roles" + "." + strconv.Itoa(i))
				}
				return err
			}
		}

	}

	return nil
}

// ContextValidate validate this roster d t o based on the context it is used
func (m *RosterDTO) ContextValidate(ctx context.Context, formats strfmt.Registry) error {
	var res []error

	if err := m.contextValidateEvents(ctx, formats); err != nil {
		res = append(res, err)
	}

	if err := m.contextValidateRoles(ctx, formats); err != nil {
		res = append(res, err)
	}

	if len(res) > 0 {
		return errors.CompositeValidationError(res...)
	}
	return nil
}

func (m *RosterDTO) contextValidateEvents(ctx context.Context, formats strfmt.Registry) error {

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

func (m *RosterDTO) contextValidateRoles(ctx context.Context, formats strfmt.Registry) error {

	for i := 0; i < len(m.Roles); i++ {

		if m.Roles[i] != nil {

			if swag.IsZero(m.Roles[i]) { // not required
				return nil
			}

			if err := m.Roles[i].ContextValidate(ctx, formats); err != nil {
				if ve, ok := err.(*errors.Validation); ok {
					return ve.ValidateName("roles" + "." + strconv.Itoa(i))
				} else if ce, ok := err.(*errors.CompositeError); ok {
					return ce.ValidateName("roles" + "." + strconv.Itoa(i))
				}
				return err
			}
		}

	}

	return nil
}

// MarshalBinary interface implementation
func (m *RosterDTO) MarshalBinary() ([]byte, error) {
	if m == nil {
		return nil, nil
	}
	return swag.WriteJSON(m)
}

// UnmarshalBinary interface implementation
func (m *RosterDTO) UnmarshalBinary(b []byte) error {
	var res RosterDTO
	if err := swag.ReadJSON(b, &res); err != nil {
		return err
	}
	*m = res
	return nil
}

// RosterDTOEventsItems0 roster d t o events items0
//
// swagger:model RosterDTOEventsItems0
type RosterDTOEventsItems0 struct {
	EventDTO

	// assignments
	Assignments *RosterDTOEventsItems0AO1Assignments `json:"assignments,omitempty"`

	// availabilities
	Availabilities *RosterDTOEventsItems0AO1Availabilities `json:"availabilities,omitempty"`

	// A map of shadows to roleId
	Shadows map[string][]ShadowDTO `json:"shadows,omitempty"`
}

// UnmarshalJSON unmarshals this object from a JSON structure
func (m *RosterDTOEventsItems0) UnmarshalJSON(raw []byte) error {
	// AO0
	var aO0 EventDTO
	if err := swag.ReadJSON(raw, &aO0); err != nil {
		return err
	}
	m.EventDTO = aO0

	// AO1
	var dataAO1 struct {
		Assignments *RosterDTOEventsItems0AO1Assignments `json:"assignments,omitempty"`

		Availabilities *RosterDTOEventsItems0AO1Availabilities `json:"availabilities,omitempty"`

		Shadows map[string][]ShadowDTO `json:"shadows,omitempty"`
	}
	if err := swag.ReadJSON(raw, &dataAO1); err != nil {
		return err
	}

	m.Assignments = dataAO1.Assignments

	m.Availabilities = dataAO1.Availabilities

	m.Shadows = dataAO1.Shadows

	return nil
}

// MarshalJSON marshals this object to a JSON structure
func (m RosterDTOEventsItems0) MarshalJSON() ([]byte, error) {
	_parts := make([][]byte, 0, 2)

	aO0, err := swag.WriteJSON(m.EventDTO)
	if err != nil {
		return nil, err
	}
	_parts = append(_parts, aO0)
	var dataAO1 struct {
		Assignments *RosterDTOEventsItems0AO1Assignments `json:"assignments,omitempty"`

		Availabilities *RosterDTOEventsItems0AO1Availabilities `json:"availabilities,omitempty"`

		Shadows map[string][]ShadowDTO `json:"shadows,omitempty"`
	}

	dataAO1.Assignments = m.Assignments

	dataAO1.Availabilities = m.Availabilities

	dataAO1.Shadows = m.Shadows

	jsonDataAO1, errAO1 := swag.WriteJSON(dataAO1)
	if errAO1 != nil {
		return nil, errAO1
	}
	_parts = append(_parts, jsonDataAO1)
	return swag.ConcatJSON(_parts...), nil
}

// Validate validates this roster d t o events items0
func (m *RosterDTOEventsItems0) Validate(formats strfmt.Registry) error {
	var res []error

	// validation for a type composition with EventDTO
	if err := m.EventDTO.Validate(formats); err != nil {
		res = append(res, err)
	}

	if err := m.validateAssignments(formats); err != nil {
		res = append(res, err)
	}

	if err := m.validateAvailabilities(formats); err != nil {
		res = append(res, err)
	}

	if err := m.validateShadows(formats); err != nil {
		res = append(res, err)
	}

	if len(res) > 0 {
		return errors.CompositeValidationError(res...)
	}
	return nil
}

func (m *RosterDTOEventsItems0) validateAssignments(formats strfmt.Registry) error {

	if swag.IsZero(m.Assignments) { // not required
		return nil
	}

	if m.Assignments != nil {
		if err := m.Assignments.Validate(formats); err != nil {
			if ve, ok := err.(*errors.Validation); ok {
				return ve.ValidateName("assignments")
			} else if ce, ok := err.(*errors.CompositeError); ok {
				return ce.ValidateName("assignments")
			}
			return err
		}
	}

	return nil
}

func (m *RosterDTOEventsItems0) validateAvailabilities(formats strfmt.Registry) error {

	if swag.IsZero(m.Availabilities) { // not required
		return nil
	}

	if m.Availabilities != nil {
		if err := m.Availabilities.Validate(formats); err != nil {
			if ve, ok := err.(*errors.Validation); ok {
				return ve.ValidateName("availabilities")
			} else if ce, ok := err.(*errors.CompositeError); ok {
				return ce.ValidateName("availabilities")
			}
			return err
		}
	}

	return nil
}

func (m *RosterDTOEventsItems0) validateShadows(formats strfmt.Registry) error {

	if swag.IsZero(m.Shadows) { // not required
		return nil
	}

	for k := range m.Shadows {

		if err := validate.Required("shadows"+"."+k, "body", m.Shadows[k]); err != nil {
			return err
		}

		for i := 0; i < len(m.Shadows[k]); i++ {

			if err := m.Shadows[k][i].Validate(formats); err != nil {
				if ve, ok := err.(*errors.Validation); ok {
					return ve.ValidateName("shadows" + "." + k + "." + strconv.Itoa(i))
				} else if ce, ok := err.(*errors.CompositeError); ok {
					return ce.ValidateName("shadows" + "." + k + "." + strconv.Itoa(i))
				}
				return err
			}

		}

	}

	return nil
}

// ContextValidate validate this roster d t o events items0 based on the context it is used
func (m *RosterDTOEventsItems0) ContextValidate(ctx context.Context, formats strfmt.Registry) error {
	var res []error

	// validation for a type composition with EventDTO
	if err := m.EventDTO.ContextValidate(ctx, formats); err != nil {
		res = append(res, err)
	}

	if err := m.contextValidateAssignments(ctx, formats); err != nil {
		res = append(res, err)
	}

	if err := m.contextValidateAvailabilities(ctx, formats); err != nil {
		res = append(res, err)
	}

	if err := m.contextValidateShadows(ctx, formats); err != nil {
		res = append(res, err)
	}

	if len(res) > 0 {
		return errors.CompositeValidationError(res...)
	}
	return nil
}

func (m *RosterDTOEventsItems0) contextValidateAssignments(ctx context.Context, formats strfmt.Registry) error {

	if m.Assignments != nil {

		if swag.IsZero(m.Assignments) { // not required
			return nil
		}

		if err := m.Assignments.ContextValidate(ctx, formats); err != nil {
			if ve, ok := err.(*errors.Validation); ok {
				return ve.ValidateName("assignments")
			} else if ce, ok := err.(*errors.CompositeError); ok {
				return ce.ValidateName("assignments")
			}
			return err
		}
	}

	return nil
}

func (m *RosterDTOEventsItems0) contextValidateAvailabilities(ctx context.Context, formats strfmt.Registry) error {

	if m.Availabilities != nil {

		if swag.IsZero(m.Availabilities) { // not required
			return nil
		}

		if err := m.Availabilities.ContextValidate(ctx, formats); err != nil {
			if ve, ok := err.(*errors.Validation); ok {
				return ve.ValidateName("availabilities")
			} else if ce, ok := err.(*errors.CompositeError); ok {
				return ce.ValidateName("availabilities")
			}
			return err
		}
	}

	return nil
}

func (m *RosterDTOEventsItems0) contextValidateShadows(ctx context.Context, formats strfmt.Registry) error {

	for k := range m.Shadows {

		for i := 0; i < len(m.Shadows[k]); i++ {

			if swag.IsZero(m.Shadows[k][i]) { // not required
				return nil
			}

			if err := m.Shadows[k][i].ContextValidate(ctx, formats); err != nil {
				if ve, ok := err.(*errors.Validation); ok {
					return ve.ValidateName("shadows" + "." + k + "." + strconv.Itoa(i))
				} else if ce, ok := err.(*errors.CompositeError); ok {
					return ce.ValidateName("shadows" + "." + k + "." + strconv.Itoa(i))
				}
				return err
			}

		}

	}

	return nil
}

// MarshalBinary interface implementation
func (m *RosterDTOEventsItems0) MarshalBinary() ([]byte, error) {
	if m == nil {
		return nil, nil
	}
	return swag.WriteJSON(m)
}

// UnmarshalBinary interface implementation
func (m *RosterDTOEventsItems0) UnmarshalBinary(b []byte) error {
	var res RosterDTOEventsItems0
	if err := swag.ReadJSON(b, &res); err != nil {
		return err
	}
	*m = res
	return nil
}

// RosterDTOEventsItems0AO1Assignments A map of assignments to roleId
//
// swagger:model RosterDTOEventsItems0AO1Assignments
type RosterDTOEventsItems0AO1Assignments struct {

	// default
	Default *RosterAssignedDTO `json:"default,omitempty"`

	// roster d t o events items0 a o1 assignments
	// Required: true
	RosterDTOEventsItems0AO1Assignments map[string]*RosterAssignedDTO `json:"-"`
}

// UnmarshalJSON unmarshals this object with additional properties from JSON
func (m *RosterDTOEventsItems0AO1Assignments) UnmarshalJSON(data []byte) error {
	// stage 1, bind the properties
	var stage1 struct {

		// default
		Default *RosterAssignedDTO `json:"default,omitempty"`
	}
	if err := json.Unmarshal(data, &stage1); err != nil {
		return err
	}
	var rcv RosterDTOEventsItems0AO1Assignments

	rcv.Default = stage1.Default
	*m = rcv

	// stage 2, remove properties and add to map
	stage2 := make(map[string]json.RawMessage)
	if err := json.Unmarshal(data, &stage2); err != nil {
		return err
	}

	delete(stage2, "default")
	// stage 3, add additional properties values
	if len(stage2) > 0 {
		result := make(map[string]*RosterAssignedDTO)
		for k, v := range stage2 {
			var toadd *RosterAssignedDTO
			if err := json.Unmarshal(v, toadd); err != nil {
				return err
			}
			result[k] = toadd
		}
		m.RosterDTOEventsItems0AO1Assignments = result
	}

	return nil
}

// MarshalJSON marshals this object with additional properties into a JSON object
func (m RosterDTOEventsItems0AO1Assignments) MarshalJSON() ([]byte, error) {
	var stage1 struct {

		// default
		Default *RosterAssignedDTO `json:"default,omitempty"`
	}

	stage1.Default = m.Default

	// make JSON object for known properties
	props, err := json.Marshal(stage1)
	if err != nil {
		return nil, err
	}

	if len(m.RosterDTOEventsItems0AO1Assignments) == 0 { // no additional properties
		return props, nil
	}

	// make JSON object for the additional properties
	additional, err := json.Marshal(m.RosterDTOEventsItems0AO1Assignments)
	if err != nil {
		return nil, err
	}

	if len(props) < 3 { // "{}": only additional properties
		return additional, nil
	}

	// concatenate the 2 objects
	return swag.ConcatJSON(props, additional), nil
}

// Validate validates this roster d t o events items0 a o1 assignments
func (m *RosterDTOEventsItems0AO1Assignments) Validate(formats strfmt.Registry) error {
	var res []error

	if err := m.validateDefault(formats); err != nil {
		res = append(res, err)
	}

	for k := range m.RosterDTOEventsItems0AO1Assignments {

		if err := validate.Required("assignments"+"."+k, "body", m.RosterDTOEventsItems0AO1Assignments[k]); err != nil {
			return err
		}
		if val, ok := m.RosterDTOEventsItems0AO1Assignments[k]; ok {
			if val != nil {
				if err := val.Validate(formats); err != nil {
					if ve, ok := err.(*errors.Validation); ok {
						return ve.ValidateName("assignments" + "." + k)
					} else if ce, ok := err.(*errors.CompositeError); ok {
						return ce.ValidateName("assignments" + "." + k)
					}
					return err
				}
			}
		}

	}

	if len(res) > 0 {
		return errors.CompositeValidationError(res...)
	}
	return nil
}

func (m *RosterDTOEventsItems0AO1Assignments) validateDefault(formats strfmt.Registry) error {
	if swag.IsZero(m.Default) { // not required
		return nil
	}

	if m.Default != nil {
		if err := m.Default.Validate(formats); err != nil {
			if ve, ok := err.(*errors.Validation); ok {
				return ve.ValidateName("assignments" + "." + "default")
			} else if ce, ok := err.(*errors.CompositeError); ok {
				return ce.ValidateName("assignments" + "." + "default")
			}
			return err
		}
	}

	return nil
}

// ContextValidate validate this roster d t o events items0 a o1 assignments based on the context it is used
func (m *RosterDTOEventsItems0AO1Assignments) ContextValidate(ctx context.Context, formats strfmt.Registry) error {
	var res []error

	if err := m.contextValidateDefault(ctx, formats); err != nil {
		res = append(res, err)
	}

	for k := range m.RosterDTOEventsItems0AO1Assignments {

		if val, ok := m.RosterDTOEventsItems0AO1Assignments[k]; ok {
			if val != nil {
				if err := val.ContextValidate(ctx, formats); err != nil {
					return err
				}
			}
		}

	}

	if len(res) > 0 {
		return errors.CompositeValidationError(res...)
	}
	return nil
}

func (m *RosterDTOEventsItems0AO1Assignments) contextValidateDefault(ctx context.Context, formats strfmt.Registry) error {

	if m.Default != nil {

		if swag.IsZero(m.Default) { // not required
			return nil
		}

		if err := m.Default.ContextValidate(ctx, formats); err != nil {
			if ve, ok := err.(*errors.Validation); ok {
				return ve.ValidateName("assignments" + "." + "default")
			} else if ce, ok := err.(*errors.CompositeError); ok {
				return ce.ValidateName("assignments" + "." + "default")
			}
			return err
		}
	}

	return nil
}

// MarshalBinary interface implementation
func (m *RosterDTOEventsItems0AO1Assignments) MarshalBinary() ([]byte, error) {
	if m == nil {
		return nil, nil
	}
	return swag.WriteJSON(m)
}

// UnmarshalBinary interface implementation
func (m *RosterDTOEventsItems0AO1Assignments) UnmarshalBinary(b []byte) error {
	var res RosterDTOEventsItems0AO1Assignments
	if err := swag.ReadJSON(b, &res); err != nil {
		return err
	}
	*m = res
	return nil
}

// RosterDTOEventsItems0AO1Availabilities A map of availabilities to personId
//
// swagger:model RosterDTOEventsItems0AO1Availabilities
type RosterDTOEventsItems0AO1Availabilities struct {

	// default
	Default *AvailabilityDTO `json:"default,omitempty"`

	// roster d t o events items0 a o1 availabilities
	// Required: true
	RosterDTOEventsItems0AO1Availabilities map[string]*AvailabilityDTO `json:"-"`
}

// UnmarshalJSON unmarshals this object with additional properties from JSON
func (m *RosterDTOEventsItems0AO1Availabilities) UnmarshalJSON(data []byte) error {
	// stage 1, bind the properties
	var stage1 struct {

		// default
		Default *AvailabilityDTO `json:"default,omitempty"`
	}
	if err := json.Unmarshal(data, &stage1); err != nil {
		return err
	}
	var rcv RosterDTOEventsItems0AO1Availabilities

	rcv.Default = stage1.Default
	*m = rcv

	// stage 2, remove properties and add to map
	stage2 := make(map[string]json.RawMessage)
	if err := json.Unmarshal(data, &stage2); err != nil {
		return err
	}

	delete(stage2, "default")
	// stage 3, add additional properties values
	if len(stage2) > 0 {
		result := make(map[string]*AvailabilityDTO)
		for k, v := range stage2 {
			var toadd *AvailabilityDTO
			if err := json.Unmarshal(v, toadd); err != nil {
				return err
			}
			result[k] = toadd
		}
		m.RosterDTOEventsItems0AO1Availabilities = result
	}

	return nil
}

// MarshalJSON marshals this object with additional properties into a JSON object
func (m RosterDTOEventsItems0AO1Availabilities) MarshalJSON() ([]byte, error) {
	var stage1 struct {

		// default
		Default *AvailabilityDTO `json:"default,omitempty"`
	}

	stage1.Default = m.Default

	// make JSON object for known properties
	props, err := json.Marshal(stage1)
	if err != nil {
		return nil, err
	}

	if len(m.RosterDTOEventsItems0AO1Availabilities) == 0 { // no additional properties
		return props, nil
	}

	// make JSON object for the additional properties
	additional, err := json.Marshal(m.RosterDTOEventsItems0AO1Availabilities)
	if err != nil {
		return nil, err
	}

	if len(props) < 3 { // "{}": only additional properties
		return additional, nil
	}

	// concatenate the 2 objects
	return swag.ConcatJSON(props, additional), nil
}

// Validate validates this roster d t o events items0 a o1 availabilities
func (m *RosterDTOEventsItems0AO1Availabilities) Validate(formats strfmt.Registry) error {
	var res []error

	if err := m.validateDefault(formats); err != nil {
		res = append(res, err)
	}

	for k := range m.RosterDTOEventsItems0AO1Availabilities {

		if err := validate.Required("availabilities"+"."+k, "body", m.RosterDTOEventsItems0AO1Availabilities[k]); err != nil {
			return err
		}
		if val, ok := m.RosterDTOEventsItems0AO1Availabilities[k]; ok {
			if val != nil {
				if err := val.Validate(formats); err != nil {
					if ve, ok := err.(*errors.Validation); ok {
						return ve.ValidateName("availabilities" + "." + k)
					} else if ce, ok := err.(*errors.CompositeError); ok {
						return ce.ValidateName("availabilities" + "." + k)
					}
					return err
				}
			}
		}

	}

	if len(res) > 0 {
		return errors.CompositeValidationError(res...)
	}
	return nil
}

func (m *RosterDTOEventsItems0AO1Availabilities) validateDefault(formats strfmt.Registry) error {
	if swag.IsZero(m.Default) { // not required
		return nil
	}

	if m.Default != nil {
		if err := m.Default.Validate(formats); err != nil {
			if ve, ok := err.(*errors.Validation); ok {
				return ve.ValidateName("availabilities" + "." + "default")
			} else if ce, ok := err.(*errors.CompositeError); ok {
				return ce.ValidateName("availabilities" + "." + "default")
			}
			return err
		}
	}

	return nil
}

// ContextValidate validate this roster d t o events items0 a o1 availabilities based on the context it is used
func (m *RosterDTOEventsItems0AO1Availabilities) ContextValidate(ctx context.Context, formats strfmt.Registry) error {
	var res []error

	if err := m.contextValidateDefault(ctx, formats); err != nil {
		res = append(res, err)
	}

	for k := range m.RosterDTOEventsItems0AO1Availabilities {

		if val, ok := m.RosterDTOEventsItems0AO1Availabilities[k]; ok {
			if val != nil {
				if err := val.ContextValidate(ctx, formats); err != nil {
					return err
				}
			}
		}

	}

	if len(res) > 0 {
		return errors.CompositeValidationError(res...)
	}
	return nil
}

func (m *RosterDTOEventsItems0AO1Availabilities) contextValidateDefault(ctx context.Context, formats strfmt.Registry) error {

	if m.Default != nil {

		if swag.IsZero(m.Default) { // not required
			return nil
		}

		if err := m.Default.ContextValidate(ctx, formats); err != nil {
			if ve, ok := err.(*errors.Validation); ok {
				return ve.ValidateName("availabilities" + "." + "default")
			} else if ce, ok := err.(*errors.CompositeError); ok {
				return ce.ValidateName("availabilities" + "." + "default")
			}
			return err
		}
	}

	return nil
}

// MarshalBinary interface implementation
func (m *RosterDTOEventsItems0AO1Availabilities) MarshalBinary() ([]byte, error) {
	if m == nil {
		return nil, nil
	}
	return swag.WriteJSON(m)
}

// UnmarshalBinary interface implementation
func (m *RosterDTOEventsItems0AO1Availabilities) UnmarshalBinary(b []byte) error {
	var res RosterDTOEventsItems0AO1Availabilities
	if err := swag.ReadJSON(b, &res); err != nil {
		return err
	}
	*m = res
	return nil
}
