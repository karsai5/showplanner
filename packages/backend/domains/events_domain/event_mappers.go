package events_domain

import (
	"go-backend/database"
	"go-backend/models"
	"time"

	"github.com/go-openapi/strfmt"
)

func mapEventsToEventsDTO(events []database.Event) []*models.EventDTO {
	var mappedEvents []*models.EventDTO
	for _, event := range events {
		mappedEvent := mapEventToEventDTO(event)
		mappedEvents = append(mappedEvents, &mappedEvent)
	}
	return mappedEvents
}

func mapEventToEventDTO(e database.Event) models.EventDTO {
	start := strfmt.DateTime(e.Start)

	me := models.EventDTO{
		ID:         getIdPointer(e.ID),
		ShowID:     int64(e.ShowID),
		Shortnote:  e.ShortNote,
		Start:      &start,
		CurtainsUp: getDateTime(e.CurtainsUp),
		End:        getDateTime(e.End),
		Name:       e.Name,
		Address:    e.Address,
	}

	return me
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
