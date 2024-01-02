package events_domain

import "go-backend/database"

var db = database.GetDatabase()

func CreateEvent(event database.Event) (database.Event, error) {
	res := db.Create(&event)
	return event, res.Error
}

func GetEvents(showId uint) ([]database.Event, error) {
	var events []database.Event
	res := db.Where("show_id = ?", showId).Find(&events)

	return events, res.Error
}
