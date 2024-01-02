package database

import (
	"time"

	"gorm.io/gorm"
)

type Event struct {
	gorm.Model
	Start      time.Time
	End        *time.Time
	CurtainsUp *time.Time
	ShowID     uint
	Name       *string
	ShortNote  *string
	Address    *string
}

type Show struct {
	gorm.Model
	Name    string
	Company string
	Slug    string `gorm:"unique"`
	Events  []Event
}
