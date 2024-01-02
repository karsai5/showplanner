package events_domain

import "go-backend/database"

var db = database.GetDatabase()

func CreateEvent(event database.Event) (database.Event, error) {
	res := db.Create(&event)
	return event, res.Error
}

func UpdateEvent(id uint, event database.Event) (database.Event, error) {
	updatedEvent := database.Event{}
	println("updating event")
	println(event.Name)
	res := db.Where("ID = ?", id).Model(&updatedEvent).Omit("ShowId").Updates(event)
	return updatedEvent, res.Error
}

func GetEvents(showId uint) ([]database.Event, error) {
	var events []database.Event
	res := db.Where("show_id = ?", showId).Find(&events)

	return events, res.Error
}
