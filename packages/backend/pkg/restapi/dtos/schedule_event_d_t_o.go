// Code generated by go-swagger; DO NOT EDIT.

package dtos

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

// ScheduleEventDTO schedule event d t o
//
// swagger:model scheduleEventDTO
type ScheduleEventDTO struct {
	EventDTO

	// availability
	Availability *AvailabilityDTO `json:"availability,omitempty"`

	// roles
	Roles []*ScheduleEventDTORolesItems0 `json:"roles"`
}

// UnmarshalJSON unmarshals this object from a JSON structure
func (m *ScheduleEventDTO) UnmarshalJSON(raw []byte) error {
	// AO0
	var aO0 EventDTO
	if err := swag.ReadJSON(raw, &aO0); err != nil {
		return err
	}
	m.EventDTO = aO0

	// AO1
	var dataAO1 struct {
		Availability *AvailabilityDTO `json:"availability,omitempty"`

		Roles []*ScheduleEventDTORolesItems0 `json:"roles"`
	}
	if err := swag.ReadJSON(raw, &dataAO1); err != nil {
		return err
	}

	m.Availability = dataAO1.Availability

	m.Roles = dataAO1.Roles

	return nil
}

// MarshalJSON marshals this object to a JSON structure
func (m ScheduleEventDTO) MarshalJSON() ([]byte, error) {
	_parts := make([][]byte, 0, 2)

	aO0, err := swag.WriteJSON(m.EventDTO)
	if err != nil {
		return nil, err
	}
	_parts = append(_parts, aO0)
	var dataAO1 struct {
		Availability *AvailabilityDTO `json:"availability,omitempty"`

		Roles []*ScheduleEventDTORolesItems0 `json:"roles"`
	}

	dataAO1.Availability = m.Availability

	dataAO1.Roles = m.Roles

	jsonDataAO1, errAO1 := swag.WriteJSON(dataAO1)
	if errAO1 != nil {
		return nil, errAO1
	}
	_parts = append(_parts, jsonDataAO1)
	return swag.ConcatJSON(_parts...), nil
}

// Validate validates this schedule event d t o
func (m *ScheduleEventDTO) Validate(formats strfmt.Registry) error {
	var res []error

	// validation for a type composition with EventDTO
	if err := m.EventDTO.Validate(formats); err != nil {
		res = append(res, err)
	}

	if err := m.validateAvailability(formats); err != nil {
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

func (m *ScheduleEventDTO) validateAvailability(formats strfmt.Registry) error {

	if swag.IsZero(m.Availability) { // not required
		return nil
	}

	if m.Availability != nil {
		if err := m.Availability.Validate(formats); err != nil {
			if ve, ok := err.(*errors.Validation); ok {
				return ve.ValidateName("availability")
			} else if ce, ok := err.(*errors.CompositeError); ok {
				return ce.ValidateName("availability")
			}
			return err
		}
	}

	return nil
}

func (m *ScheduleEventDTO) validateRoles(formats strfmt.Registry) error {

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

// ContextValidate validate this schedule event d t o based on the context it is used
func (m *ScheduleEventDTO) ContextValidate(ctx context.Context, formats strfmt.Registry) error {
	var res []error

	// validation for a type composition with EventDTO
	if err := m.EventDTO.ContextValidate(ctx, formats); err != nil {
		res = append(res, err)
	}

	if err := m.contextValidateAvailability(ctx, formats); err != nil {
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

func (m *ScheduleEventDTO) contextValidateAvailability(ctx context.Context, formats strfmt.Registry) error {

	if m.Availability != nil {

		if swag.IsZero(m.Availability) { // not required
			return nil
		}

		if err := m.Availability.ContextValidate(ctx, formats); err != nil {
			if ve, ok := err.(*errors.Validation); ok {
				return ve.ValidateName("availability")
			} else if ce, ok := err.(*errors.CompositeError); ok {
				return ce.ValidateName("availability")
			}
			return err
		}
	}

	return nil
}

func (m *ScheduleEventDTO) contextValidateRoles(ctx context.Context, formats strfmt.Registry) error {

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
func (m *ScheduleEventDTO) MarshalBinary() ([]byte, error) {
	if m == nil {
		return nil, nil
	}
	return swag.WriteJSON(m)
}

// UnmarshalBinary interface implementation
func (m *ScheduleEventDTO) UnmarshalBinary(b []byte) error {
	var res ScheduleEventDTO
	if err := swag.ReadJSON(b, &res); err != nil {
		return err
	}
	*m = res
	return nil
}

// ScheduleEventDTORolesItems0 schedule event d t o roles items0
//
// swagger:model ScheduleEventDTORolesItems0
type ScheduleEventDTORolesItems0 struct {

	// covered by
	CoveredBy *PersonSummaryDTO `json:"coveredBy,omitempty"`

	// covering
	Covering *PersonSummaryDTO `json:"covering,omitempty"`

	// id
	// Required: true
	ID *int64 `json:"id"`

	// name
	// Required: true
	Name *string `json:"name"`

	// shadowed by
	ShadowedBy []*PersonSummaryDTO `json:"shadowedBy"`

	// shadowing
	Shadowing *PersonSummaryDTO `json:"shadowing,omitempty"`

	// type
	// Enum: [baseRole assigned covering shadowing]
	Type string `json:"type,omitempty"`
}

// Validate validates this schedule event d t o roles items0
func (m *ScheduleEventDTORolesItems0) Validate(formats strfmt.Registry) error {
	var res []error

	if err := m.validateCoveredBy(formats); err != nil {
		res = append(res, err)
	}

	if err := m.validateCovering(formats); err != nil {
		res = append(res, err)
	}

	if err := m.validateID(formats); err != nil {
		res = append(res, err)
	}

	if err := m.validateName(formats); err != nil {
		res = append(res, err)
	}

	if err := m.validateShadowedBy(formats); err != nil {
		res = append(res, err)
	}

	if err := m.validateShadowing(formats); err != nil {
		res = append(res, err)
	}

	if err := m.validateType(formats); err != nil {
		res = append(res, err)
	}

	if len(res) > 0 {
		return errors.CompositeValidationError(res...)
	}
	return nil
}

func (m *ScheduleEventDTORolesItems0) validateCoveredBy(formats strfmt.Registry) error {
	if swag.IsZero(m.CoveredBy) { // not required
		return nil
	}

	if m.CoveredBy != nil {
		if err := m.CoveredBy.Validate(formats); err != nil {
			if ve, ok := err.(*errors.Validation); ok {
				return ve.ValidateName("coveredBy")
			} else if ce, ok := err.(*errors.CompositeError); ok {
				return ce.ValidateName("coveredBy")
			}
			return err
		}
	}

	return nil
}

func (m *ScheduleEventDTORolesItems0) validateCovering(formats strfmt.Registry) error {
	if swag.IsZero(m.Covering) { // not required
		return nil
	}

	if m.Covering != nil {
		if err := m.Covering.Validate(formats); err != nil {
			if ve, ok := err.(*errors.Validation); ok {
				return ve.ValidateName("covering")
			} else if ce, ok := err.(*errors.CompositeError); ok {
				return ce.ValidateName("covering")
			}
			return err
		}
	}

	return nil
}

func (m *ScheduleEventDTORolesItems0) validateID(formats strfmt.Registry) error {

	if err := validate.Required("id", "body", m.ID); err != nil {
		return err
	}

	return nil
}

func (m *ScheduleEventDTORolesItems0) validateName(formats strfmt.Registry) error {

	if err := validate.Required("name", "body", m.Name); err != nil {
		return err
	}

	return nil
}

func (m *ScheduleEventDTORolesItems0) validateShadowedBy(formats strfmt.Registry) error {
	if swag.IsZero(m.ShadowedBy) { // not required
		return nil
	}

	for i := 0; i < len(m.ShadowedBy); i++ {
		if swag.IsZero(m.ShadowedBy[i]) { // not required
			continue
		}

		if m.ShadowedBy[i] != nil {
			if err := m.ShadowedBy[i].Validate(formats); err != nil {
				if ve, ok := err.(*errors.Validation); ok {
					return ve.ValidateName("shadowedBy" + "." + strconv.Itoa(i))
				} else if ce, ok := err.(*errors.CompositeError); ok {
					return ce.ValidateName("shadowedBy" + "." + strconv.Itoa(i))
				}
				return err
			}
		}

	}

	return nil
}

func (m *ScheduleEventDTORolesItems0) validateShadowing(formats strfmt.Registry) error {
	if swag.IsZero(m.Shadowing) { // not required
		return nil
	}

	if m.Shadowing != nil {
		if err := m.Shadowing.Validate(formats); err != nil {
			if ve, ok := err.(*errors.Validation); ok {
				return ve.ValidateName("shadowing")
			} else if ce, ok := err.(*errors.CompositeError); ok {
				return ce.ValidateName("shadowing")
			}
			return err
		}
	}

	return nil
}

var scheduleEventDTORolesItems0TypeTypePropEnum []interface{}

func init() {
	var res []string
	if err := json.Unmarshal([]byte(`["baseRole","assigned","covering","shadowing"]`), &res); err != nil {
		panic(err)
	}
	for _, v := range res {
		scheduleEventDTORolesItems0TypeTypePropEnum = append(scheduleEventDTORolesItems0TypeTypePropEnum, v)
	}
}

const (

	// ScheduleEventDTORolesItems0TypeBaseRole captures enum value "baseRole"
	ScheduleEventDTORolesItems0TypeBaseRole string = "baseRole"

	// ScheduleEventDTORolesItems0TypeAssigned captures enum value "assigned"
	ScheduleEventDTORolesItems0TypeAssigned string = "assigned"

	// ScheduleEventDTORolesItems0TypeCovering captures enum value "covering"
	ScheduleEventDTORolesItems0TypeCovering string = "covering"

	// ScheduleEventDTORolesItems0TypeShadowing captures enum value "shadowing"
	ScheduleEventDTORolesItems0TypeShadowing string = "shadowing"
)

// prop value enum
func (m *ScheduleEventDTORolesItems0) validateTypeEnum(path, location string, value string) error {
	if err := validate.EnumCase(path, location, value, scheduleEventDTORolesItems0TypeTypePropEnum, true); err != nil {
		return err
	}
	return nil
}

func (m *ScheduleEventDTORolesItems0) validateType(formats strfmt.Registry) error {
	if swag.IsZero(m.Type) { // not required
		return nil
	}

	// value enum
	if err := m.validateTypeEnum("type", "body", m.Type); err != nil {
		return err
	}

	return nil
}

// ContextValidate validate this schedule event d t o roles items0 based on the context it is used
func (m *ScheduleEventDTORolesItems0) ContextValidate(ctx context.Context, formats strfmt.Registry) error {
	var res []error

	if err := m.contextValidateCoveredBy(ctx, formats); err != nil {
		res = append(res, err)
	}

	if err := m.contextValidateCovering(ctx, formats); err != nil {
		res = append(res, err)
	}

	if err := m.contextValidateShadowedBy(ctx, formats); err != nil {
		res = append(res, err)
	}

	if err := m.contextValidateShadowing(ctx, formats); err != nil {
		res = append(res, err)
	}

	if len(res) > 0 {
		return errors.CompositeValidationError(res...)
	}
	return nil
}

func (m *ScheduleEventDTORolesItems0) contextValidateCoveredBy(ctx context.Context, formats strfmt.Registry) error {

	if m.CoveredBy != nil {

		if swag.IsZero(m.CoveredBy) { // not required
			return nil
		}

		if err := m.CoveredBy.ContextValidate(ctx, formats); err != nil {
			if ve, ok := err.(*errors.Validation); ok {
				return ve.ValidateName("coveredBy")
			} else if ce, ok := err.(*errors.CompositeError); ok {
				return ce.ValidateName("coveredBy")
			}
			return err
		}
	}

	return nil
}

func (m *ScheduleEventDTORolesItems0) contextValidateCovering(ctx context.Context, formats strfmt.Registry) error {

	if m.Covering != nil {

		if swag.IsZero(m.Covering) { // not required
			return nil
		}

		if err := m.Covering.ContextValidate(ctx, formats); err != nil {
			if ve, ok := err.(*errors.Validation); ok {
				return ve.ValidateName("covering")
			} else if ce, ok := err.(*errors.CompositeError); ok {
				return ce.ValidateName("covering")
			}
			return err
		}
	}

	return nil
}

func (m *ScheduleEventDTORolesItems0) contextValidateShadowedBy(ctx context.Context, formats strfmt.Registry) error {

	for i := 0; i < len(m.ShadowedBy); i++ {

		if m.ShadowedBy[i] != nil {

			if swag.IsZero(m.ShadowedBy[i]) { // not required
				return nil
			}

			if err := m.ShadowedBy[i].ContextValidate(ctx, formats); err != nil {
				if ve, ok := err.(*errors.Validation); ok {
					return ve.ValidateName("shadowedBy" + "." + strconv.Itoa(i))
				} else if ce, ok := err.(*errors.CompositeError); ok {
					return ce.ValidateName("shadowedBy" + "." + strconv.Itoa(i))
				}
				return err
			}
		}

	}

	return nil
}

func (m *ScheduleEventDTORolesItems0) contextValidateShadowing(ctx context.Context, formats strfmt.Registry) error {

	if m.Shadowing != nil {

		if swag.IsZero(m.Shadowing) { // not required
			return nil
		}

		if err := m.Shadowing.ContextValidate(ctx, formats); err != nil {
			if ve, ok := err.(*errors.Validation); ok {
				return ve.ValidateName("shadowing")
			} else if ce, ok := err.(*errors.CompositeError); ok {
				return ce.ValidateName("shadowing")
			}
			return err
		}
	}

	return nil
}

// MarshalBinary interface implementation
func (m *ScheduleEventDTORolesItems0) MarshalBinary() ([]byte, error) {
	if m == nil {
		return nil, nil
	}
	return swag.WriteJSON(m)
}

// UnmarshalBinary interface implementation
func (m *ScheduleEventDTORolesItems0) UnmarshalBinary(b []byte) error {
	var res ScheduleEventDTORolesItems0
	if err := swag.ReadJSON(b, &res); err != nil {
		return err
	}
	*m = res
	return nil
}