package events_domain

import (
	"go-backend/database"
	"go-backend/models"
	"time"

	"github.com/go-openapi/strfmt"
)

func mapCreateEventDTOtoEvent(dto *models.CreateEventDTO) (database.Event, error) {
	return database.Event{
		Start:      time.Time(*dto.Start),
		End:        time.Time(dto.End),
		CurtainsUp: time.Time(dto.CurtainsUp),
		ShowID:     uint(*dto.ShowID),
	}, nil
}

func mapEventToEventDTO(e database.Event) models.EventDTO {
	start := strfmt.DateTime(e.Start)

	me := models.EventDTO{
		ID:         getIdPointer(e.ID),
		ShowID:     int64(e.ShowID),
		Shortnote:  "",
		Start:      &start,
		CurtainsUp: getDateTime(e.CurtainsUp),
		End:        getDateTime(e.End),
	}

	return me
}

func mapEventsToEventsDTO(events []database.Event) []*models.EventDTO {
	var mappedEvents []*models.EventDTO
	for _, event := range events {
		mappedEvent := mapEventToEventDTO(event)
		mappedEvents = append(mappedEvents, &mappedEvent)
	}
	return mappedEvents
}

func getIdPointer(n uint) *int64 {
	id := int64(n)
	return &id
}

func getDateTime(t time.Time) *strfmt.DateTime {
	if t.IsZero() {
		return nil
	}
	dt := strfmt.DateTime(t)
	return &dt
}
