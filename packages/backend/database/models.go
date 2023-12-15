package database

import (
	"time"

	"gorm.io/gorm"
)

type Event struct {
	gorm.Model
	Start  time.Time
	ShowID uint
}

type Show struct {
	gorm.Model
	Name    string
	Company string
	Slug    string `gorm:"unique"`
	Events  []Event
}
