package events_domain

import (
	"go-backend/database"
	"go-backend/models"
	"sort"
	"strconv"
	"time"

	"github.com/go-openapi/strfmt"
)

func mapToDatabaseEvent(dto models.CreateEventDTO) database.Event {
	return database.Event{
		ShowID:     uint(*dto.ShowID),
		Start:      time.Time(*dto.Start),
		End:        (*time.Time)(dto.End),
		CurtainsUp: (*time.Time)(dto.CurtainsUp),
		Name:       dto.Name,
		ShortNote:  dto.Shortnote,
		Address:    dto.Address,
	}
}

func timep(stringTime strfmt.DateTime) *time.Time {
	time := time.Time(stringTime)
	return &time
}

type Event interface {
	int64 | float64
}

func mapEventsToPublicEventsDTO(events []database.Event) (mappedEvents []*models.EventPublicDTO) {
	var showEvents []database.Event

	for _, event := range events {
		if event.CurtainsUp != nil {
			showEvents = append(showEvents, event)
		} else {
			mappedEvent := mapEventToEventPublicDTO(event)
			mappedEvents = append(mappedEvents, &mappedEvent)
		}
	}

	sort.Slice(showEvents, func(i, j int) bool {
		return showEvents[i].CurtainsUp.Before(*showEvents[j].CurtainsUp)
	})

	for i, event := range showEvents {
		mappedEvent := mapEventToEventPublicDTO(event)
		if mappedEvent.Name == nil || *mappedEvent.Name == "" {
			name := "Show " + strconv.Itoa(i+1)
			mappedEvent.Name = &name
		}
		mappedEvents = append(mappedEvents, &mappedEvent)
	}

	return mappedEvents
}

func mapEventsToEventsDTO(events []database.Event) (mappedEvents []*models.EventDTO) {
	var showEvents []database.Event

	for _, event := range events {
		if event.CurtainsUp != nil {
			showEvents = append(showEvents, event)
		} else {
			mappedEvent := mapEventToEventDTO(event)
			mappedEvents = append(mappedEvents, &mappedEvent)
		}
	}

	sort.Slice(showEvents, func(i, j int) bool {
		return showEvents[i].CurtainsUp.Before(*showEvents[j].CurtainsUp)
	})

	for i, event := range showEvents {
		mappedEvent := mapEventToEventDTO(event)
		if mappedEvent.Name == nil || *mappedEvent.Name == "" {
			name := "Show " + strconv.Itoa(i+1)
			mappedEvent.Name = &name
		}
		mappedEvents = append(mappedEvents, &mappedEvent)
	}

	return mappedEvents
}

func mapEventToEventPublicDTO(e database.Event) models.EventPublicDTO {
	start := strfmt.DateTime(e.Start)

	me := models.EventPublicDTO{
		ID:         getIdPointer(e.ID),
		ShowID:     int64(e.ShowID),
		Start:      &start,
		CurtainsUp: getDateTime(e.CurtainsUp),
		End:        getDateTime(e.End),
		NameRaw:    e.Name,
		Name:       e.Name,
	}

	return me
}
func mapEventToEventDTO(e database.Event) models.EventDTO {
	start := strfmt.DateTime(e.Start)

	me := models.EventDTO{
		ID:         getIdPointer(e.ID),
		ShowID:     int64(e.ShowID),
		Start:      &start,
		CurtainsUp: getDateTime(e.CurtainsUp),
		End:        getDateTime(e.End),
		NameRaw:    e.Name,
		Name:       e.Name,
		Shortnote:  e.ShortNote,
		Address:    e.Address,
	}

	return me
}

func getIdPointer(n uint) *int64 {
	id := int64(n)
	return &id
}

func getDateTime(t *time.Time) *strfmt.DateTime {
	if t == nil {
		return nil
	}
	dt := strfmt.DateTime(*t)
	return &dt
}
