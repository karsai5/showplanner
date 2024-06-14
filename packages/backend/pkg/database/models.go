package database

import (
	"fmt"
	"time"

	"github.com/go-openapi/strfmt"
	uuid "github.com/satori/go.uuid"
	"gorm.io/gorm"
	"showplanner.io/pkg/conv"
	"showplanner.io/pkg/models"
)

type EventOptions struct {
	Divider            bool
	AttendanceRequired bool
}

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
	ShowReport     *ShowReport
	ShowTimer      *ShowTimer
	Options        EventOptions `gorm:"embedded;embeddedPrefix:options_"`
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

func (e *Event) GetCalculatedName() (string, error) {
	if e.Name != nil && *e.Name != "" {
		return *e.Name, nil
	}
	if e.CurtainsUp == nil {
		return "", nil
	}
	events, err := GetEventsWithCurtainsUp(e.ShowID)
	if err != nil {
		return "", err
	}
	for i, match := range events {
		if match.ID == e.ID {
			return fmt.Sprintf("Show %d", i+1), nil
		}
	}
	return "", nil
}

func (e *Event) MapToEventDTO() models.EventDTO {
	start := strfmt.DateTime(e.Start)

	dto := models.EventDTO{
		ID:        conv.UintToInt64(e.ID),
		ShowID:    int64(e.ShowID),
		Start:     &start,
		NameRaw:   e.Name,
		Name:      e.Name,
		Shortnote: e.ShortNote,
		Address:   e.Address,
		Options: &models.EventOptionsDTO{
			Divider:            conv.Pointer(e.Options.Divider),
			AttendanceRequired: conv.Pointer(e.Options.AttendanceRequired),
		},
	}

	if e.CurtainsUp != nil {
		dto.CurtainsUp = conv.TimeToDateTime(e.CurtainsUp)
	}

	if e.End != nil {
		dto.End = conv.TimeToDateTime(e.End)
	}

	if e.ShowReport != nil {
		dto.ShowReport = conv.UUIDToStrmFmtUUID(e.ShowReport.ID)
	}

	if e.ShowTimer != nil {
		dto.ShowTimer = conv.UUIDToStrmFmtUUID(e.ShowTimer.ID)
	}

	return dto
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

type ShowTimer struct {
	ID        uuid.UUID `gorm:"type:uuid;primary_key;"`
	CreatedAt time.Time
	UpdatedAt time.Time
	DeletedAt *time.Time `gorm:"index"`

	ExpectedCurtainsUp *time.Time

	ShowStart     *time.Time
	ShowEnd       *time.Time
	IntervalStart *time.Time
	IntervalEnd   *time.Time

	HouseOpen          *time.Time
	ActOneFOHClearance *time.Time
	ActTwoFOHClearance *time.Time

	// linked event
	EventID *uint
	Event   *Event

	// linked person
	CreatedById uuid.UUID
	CreatedBy   Person
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
