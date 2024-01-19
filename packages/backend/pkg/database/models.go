package database

import (
	"time"

	uuid "github.com/satori/go.uuid"
	"gorm.io/gorm"
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

type Show struct {
	gorm.Model
	Name    string
	Company string
	Slug    string `gorm:"unique"`
	Events  []Event
}

type Availability struct {
	gorm.Model
	UserID    string `gorm:"uniqueIndex:unique_availability`
	EventID   uint   `gorm:"uniqueIndex:unique_availability`
	Available bool
}

type Person struct {
	ID        uuid.UUID `gorm:"type:uuid;primary_key;"`
	CreatedAt time.Time
	UpdatedAt time.Time
	DeletedAt *time.Time `gorm:"index"`

	Pronoun               string
	FirstName             string
	LastName              string
	Email                 string
	Phone                 string
	WWC                   string
	DOB                   string
	Allergies             string
	EmergencyPhone        string
	EmergencyName         string
	EmergencyRelationship string
	HearAboutUs           string
	PreviousWork          string
	ReasonForCrewing      string
}
