package dtos

import (
	"github.com/go-openapi/strfmt"
)

func (e *ScheduleEventDTO) GetCurtainsUp() *strfmt.DateTime {
	return e.CurtainsUp
}

func (e *ScheduleEventDTO) SetName(name string) {
	e.Name = &name
}

func (e *ScheduleEventDTO) IsNameEmpty() bool {
	return e.Name == nil || *e.Name == ""
}

func (e *EventDTO) GetCurtainsUp() *strfmt.DateTime {
	return e.CurtainsUp
}

func (e *EventDTO) SetName(name string) {
	e.Name = &name
}

func (e *EventDTO) IsNameEmpty() bool {
	return e.Name == nil || *e.Name == ""
}

func (e *EventPublicDTO) GetCurtainsUp() *strfmt.DateTime {
	return e.CurtainsUp
}

func (e *EventPublicDTO) SetName(name string) {
	e.Name = &name
}

func (e *EventPublicDTO) IsNameEmpty() bool {
	return e.Name == nil || *e.Name == ""
}

type EventWithCurtainsUp interface {
	GetCurtainsUp() *strfmt.DateTime
	SetName(name string)
	IsNameEmpty() bool
}
