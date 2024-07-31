package database

import (
	uuid "github.com/satori/go.uuid"
	"gorm.io/gorm"
	"gorm.io/gorm/clause"
)

func CreateEvent(event Event) (Event, error) {
	res := db.Create(&event)
	return event, res.Error
}

func UpdateEvent(id uint, updates Event) (Event, error) {
	event := Event{
		Model: gorm.Model{
			ID: id,
		},
	}
	res := db.Model(&event).Select("start", "end", "curtains_up", "name", "short_note", "address", "options_divider", "options_user_input_type").Updates(updates)
	return event, res.Error
}

func GetEvents(showId uint) ([]Event, error) {
	var events []Event
	res := db.Order("start").Where("show_id = ?", showId).Find(&events)

	return events, res.Error
}

func GetEventsWithCurtainsUp(showId uint) ([]Event, error) {
	var events []Event
	res := db.Order("start").Where("show_id = ? AND curtains_up IS NOT NULL", showId).Find(&events)

	return events, res.Error
}

func GetEventsWithAvailabilityAndAssignmentsForUser(showId uint, userId uuid.UUID) ([]Event, error) {
	var events []Event
	res := db.Preload("Availabilities", "person_id = ?", userId).Preload("ShowReport").Preload("ShowTimer").Preload("Shadows.Role.Person").Preload("Shadows.Person").Preload("Assignments").Preload("Assignments.Role.Person").Preload("Assignments.Person").Where("show_id = ?", showId).Find(&events)

	return events, res.Error
}

func GetEventsWithAvailabilities(showId uint) ([]Event, error) {
	var events []Event
	res := db.Preload("Availabilities").Where("show_id = ?", showId).Find(&events)

	return events, res.Error
}

func GetEventsPreloaded(showId uint) ([]Event, error) {
	var events []Event
	res := db.Preload("Shadows.Person").Preload("Assignments.Person").Preload(clause.Associations).Where("show_id = ?", showId).Find(&events)

	return events, res.Error
}

func GetEventsForRoster(showId uint) ([]Event, error) {
	var events []Event
	res := db.Preload("Shadows.Person").Preload("Assignments.Person").Preload(clause.Associations).Where("show_id = ?", showId).Where("options_user_input_type = ?", "availability").Find(&events)

	return events, res.Error
}

func GetEvent(id uint) (Event, error) {
	existingEvent := Event{}
	res := db.Preload("Show").Preload("ShowReport").Preload("ShowTimer").First(&existingEvent, id)
	return existingEvent, res.Error
}

func GetEventWithShow(id uint) (Event, error) {
	existingEvent := Event{}
	res := db.Preload("Show").First(&existingEvent, id)
	return existingEvent, res.Error
}

func DeleteEvent(id uint) error {
	res := db.Delete(&Event{}, id)
	return res.Error
}
