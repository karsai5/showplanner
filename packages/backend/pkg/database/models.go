package database

import (
	"time"

	"github.com/go-openapi/strfmt"
	uuid "github.com/satori/go.uuid"
	"gorm.io/gorm"
	"showplanner.io/pkg/conv"
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
	Assignments    []Assignment
	Shadows        []Shadow
}

func (e *Event) GetCurtainsUp() *strfmt.DateTime {
	return conv.TimeToDateTime(e.CurtainsUp)
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
	ImageID *uint
	Image   *Media
}

type Availability struct {
	gorm.Model
	PersonID  uuid.UUID `gorm:"uniqueIndex:unique_a`
	EventID   uint      `gorm:"uniqueIndex:unique_a`
	Available bool
}

type Assignment struct {
	gorm.Model
	PersonID uuid.UUID
	EventID  uint `gorm:"uniqueIndex:unique_assignment`
	RoleID   uint `gorm:"uniqueIndex:unique_assignment`
	Event    Event
	Person   Person
	Role     Role
}

type Shadow struct {
	gorm.Model
	PersonID uuid.UUID `gorm:"uniqueIndex:unique_shadow`
	EventID  uint      `gorm:"uniqueIndex:unique_shadow`
	RoleID   uint      `gorm:"uniqueIndex:unique_shadow`
	Event    Event
	Person   Person
	Role     Role
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

type ShowReport struct {
	ID        uuid.UUID `gorm:"type:uuid;primary_key;"`
	CreatedAt time.Time
	UpdatedAt time.Time
	DeletedAt *time.Time `gorm:"index"`

	Title    string
	Subtitle string

	ShowStart     *time.Time
	ShowEnd       *time.Time
	IntervalStart *time.Time
	IntervalEnd   *time.Time

	HouseOpen          *time.Time
	ActOneFOHClearance *time.Time
	ActTwoFOHClearance *time.Time

	Notes string

	// linked event
	EventID *uint
	Event   *Event

	// linked person
	CreatedById uuid.UUID
	CreatedBy   Person
}

type Role struct {
	gorm.Model
	ShowID   uint
	Show     Show
	PersonID *uuid.UUID
	Person   *Person
	Name     string
}

type Media struct {
	gorm.Model
	Key string `gorm:"unique"`
}

func (e *Media) GetUrl() string {
	return ""
}
