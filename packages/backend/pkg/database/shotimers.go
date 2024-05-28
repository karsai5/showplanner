package database

import uuid "github.com/satori/go.uuid"

func SaveShowTimer(showTimer ShowTimer) (ShowTimer, error) {
	res := db.Save(&showTimer)
	return showTimer, res.Error
}

func GetShowTimer(id uuid.UUID) (ShowTimer, error) {
	showTimer := ShowTimer{}
	res := db.Preload("CreatedBy").First(&showTimer, id)
	return showTimer, res.Error
}

func GetShowTimersForUser(userId uuid.UUID) ([]ShowTimer, error) {
	showTimers := []ShowTimer{}
	res := db.Preload("CreatedBy").Where("created_by_id = ?", userId).Find(&showTimers)
	return showTimers, res.Error
}
