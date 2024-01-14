package availabilities_domain

import (
	"errors"
	"go-backend/database"
)

var db = database.GetDatabase()

func GetAvailability(userId string, eventId uint) (*database.Availability, error) {
	var availabilities []database.Availability
	res := db.Where("user_id = ? AND event_id = ?", userId, eventId).Find(&availabilities)

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

func UpdateAvailability(userId string, eventId uint, available bool) (*database.Availability, error) {
	existingAvailability, err := GetAvailability(userId, eventId)
	if err != nil {
		return nil, err
	}

	newAvailability := database.Availability{
		UserID:    userId,
		EventID:   eventId,
		Available: available,
	}

	if existingAvailability != nil {
		newAvailability.ID = existingAvailability.ID
	}

	res := db.Save(&newAvailability)

	return &newAvailability, res.Error
}
