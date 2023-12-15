package dschedule

import (
	"go-backend/database"
	"go-backend/models"
	"time"

	"github.com/go-openapi/strfmt"
)

func mapCreateEventDTOtoEvent(dto *models.CreateEventDTO) (database.Event, error) {
	layout := "2006-01-02T15:04:05.000Z"
	start, err := time.Parse(layout, *dto.Start)
	if err != nil {
		return database.Event{}, err
	}

	return database.Event{
		Start:  start,
		ShowID: uint(*dto.ShowID),
	}, nil
}

func mapEventToEventDTO(event *database.Event) *models.EventDTO {
	return &models.EventDTO{
		CurtainsUp: strfmt.DateTime{},
		End:        strfmt.DateTime{},
		ID:         getIdPointer(event.ID),
		ShowID:     int64(event.ShowID),
		Shortnote:  "",
		Start:      (*strfmt.DateTime)(&event.Start),
	}
}

func mapEventsToEventsDTO(events *[]database.Event) []*models.EventDTO {
	var mappedEvents []*models.EventDTO
	for _, event := range *events {
		mappedEvents = append(mappedEvents, mapEventToEventDTO(&event))
	}
	return mappedEvents
}

func getIdPointer(n uint) *int64 {
	id := int64(n)
	return &id
}
