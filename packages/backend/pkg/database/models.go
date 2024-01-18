package database

import (
	"time"

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
