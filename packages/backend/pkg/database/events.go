package database

import uuid "github.com/satori/go.uuid"

func CreateEvent(event Event) (Event, error) {
	res := db.Create(&event)
	return event, res.Error
}

func UpdateEvent(id uint, event Event) (Event, error) {
	updatedEvent := Event{}
	res := db.Where("ID = ?", id).Model(&updatedEvent).Omit("ShowId").Updates(event)
	return updatedEvent, res.Error
}

func GetEvents(showId uint) ([]Event, error) {
	var events []Event
	res := db.Where("show_id = ?", showId).Find(&events)

	return events, res.Error
}

func GetEventsWithAvailabilityForUser(showId uint, userId uuid.UUID) ([]Event, error) {
	var events []Event
	res := db.Preload("Availabilities", "user_id = ?", userId).Where("show_id = ?", showId).Find(&events)

	return events, res.Error
}

func GetEvent(id uint) (Event, error) {
	existingEvent := Event{}
	res := db.First(&existingEvent, id)
	return existingEvent, res.Error
}

func DeleteEvent(id uint) error {
	res := db.Delete(&Event{}, id)
	return res.Error
}
