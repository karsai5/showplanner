package database

import (
	"time"

	"github.com/go-openapi/strfmt"
	uuid "github.com/satori/go.uuid"
	"gorm.io/gorm"
	"showplanner.io/pkg/convert"
)

type Event struct {
	gorm.Model
	Start          time.Time
	End            *time.Time
	CurtainsUp     *time.Time
	ShowID         uint
	Show           Show
	Name           *string
	ShortNote      *string
	Address        *string
	Availabilities []Availability
}

func (e *Event) GetCurtainsUp() *strfmt.DateTime {
	return convert.TimeToDateTime(e.CurtainsUp)
}

func (e *Event) SetName(name string) {
	e.Name = &name
}

func (e *Event) IsNameEmpty() bool {
	return e.Name == nil || *e.Name == ""
}

type Show struct {
	gorm.Model
	Name    string
	Company string
	Slug    string `gorm:"unique"`
	Events  []Event
	Roles   []Role
	People  []Person `gorm:"many2many:show_people;"`
}

type Availability struct {
	gorm.Model
	PersonID  uuid.UUID `gorm:"uniqueIndex:unique_a`
	EventID   uint      `gorm:"uniqueIndex:unique_a`
	Available bool
}

type Person struct {
	ID        uuid.UUID `gorm:"type:uuid;primary_key;"`
	CreatedAt time.Time
	UpdatedAt time.Time
	DeletedAt *time.Time `gorm:"index"`

	Pronoun               *string
	FirstName             string
	LastName              string
	PreferredName         *string
	Email                 string
	Phone                 string
	WWC                   *string
	DOB                   string
	Allergies             string
	EmergencyPhone        string
	EmergencyName         string
	EmergencyRelationship string
	HearAboutUs           *string
	PreviousWork          *string
	ReasonForCrewing      *string

	Shows []Show `gorm:"many2many:show_people;"`
}

type Role struct {
	gorm.Model
	ShowID   uint
	Show     Show
	PersonID *uuid.UUID
	Person   *Person
	Name     string
}
