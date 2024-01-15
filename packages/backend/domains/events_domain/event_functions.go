package events_domain

import (
	"go-backend/database"
)

var db = database.GetDatabase()

func CreateEvent(event database.Event) (database.Event, error) {
	res := db.Create(&event)
	return event, res.Error
}

func UpdateEvent(id uint, event database.Event) (database.Event, error) {
	updatedEvent := database.Event{}
	res := db.Where("ID = ?", id).Model(&updatedEvent).Omit("ShowId").Updates(event)
	return updatedEvent, res.Error
}

func GetEvents(showId uint) ([]database.Event, error) {
	var events []database.Event
	res := db.Where("show_id = ?", showId).Find(&events)

	return events, res.Error
}

func GetEventsWithAvailabilityForUser(showId uint, userId string) ([]database.Event, error) {
	var events []database.Event
	res := db.Preload("Availabilities", "user_id = ?", userId).Where("show_id = ?", showId).Find(&events)

	return events, res.Error
}

func GetEvent(id uint) (database.Event, error) {
	existingEvent := database.Event{}
	res := db.First(&existingEvent, id)
	return existingEvent, res.Error
}

func DeleteEvent(id uint) error {
	res := db.Delete(&database.Event{}, id)
	return res.Error
}
