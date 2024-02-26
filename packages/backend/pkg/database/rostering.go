package database

import (
	"errors"

	uuid "github.com/satori/go.uuid"
)

func GetAvailability(userId uuid.UUID, eventId uint) (*Availability, error) {
	var availabilities []Availability
	res := db.Where("person_id = ? AND event_id = ?", userId, eventId).Find(&availabilities)

	if len(availabilities) > 1 {
		return nil, errors.New("Too many availabilities returned")
	}

	if res.Error != nil {
		return nil, res.Error
	}

	if len(availabilities) == 0 {
		return nil, res.Error
	}

	return &availabilities[0], res.Error
}

func UpdateAvailability(userId uuid.UUID, eventId uint, available bool) (*Availability, error) {
	existingAvailability, err := GetAvailability(userId, eventId)
	if err != nil {
		return nil, err
	}

	newAvailability := Availability{
		PersonID:  userId,
		EventID:   eventId,
		Available: available,
	}

	if existingAvailability != nil {
		newAvailability.ID = existingAvailability.ID
	}

	res := db.Save(&newAvailability)

	return &newAvailability, res.Error
}

func GetRoles(showId uint) ([]Role, error) {
	show := Show{}
	res := db.Preload("Roles").Find(&show, showId)
	return show.Roles, res.Error
}

func CreateRole(role Role) (Role, error) {
	res := db.Create(&role)
	return role, res.Error
}
