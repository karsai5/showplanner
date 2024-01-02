package events_domain

import (
	"go-backend/database"
	"go-backend/models"
	"sort"
	"strconv"
	"time"

	"github.com/go-openapi/strfmt"
)

func mapEventsToEventsDTO(events []database.Event) []*models.EventDTO {
	var mappedEvents []*models.EventDTO
	var showEvents []database.Event

	for _, event := range events {
		if !event.CurtainsUp.IsZero() {
			showEvents = append(showEvents, event)
		} else {
			mappedEvent := mapEventToEventDTO(event)
			mappedEvents = append(mappedEvents, &mappedEvent)
		}
	}

	sort.Slice(showEvents, func(i, j int) bool {
		return showEvents[i].CurtainsUp.Before(showEvents[j].CurtainsUp)
	})

	for i, event := range showEvents {
		mappedEvent := mapEventToEventDTO(event)
		if mappedEvent.Name == "" {
			mappedEvent.Name = "Show " + strconv.Itoa(i+1)
		}
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

type ByCurtainsUp []database.Event

func (a ByCurtainsUp) Len() int           { return len(a) }
func (a ByCurtainsUp) Swap(i, j int)      { a[i], a[j] = a[j], a[i] }
func (a ByCurtainsUp) Less(i, j int) bool { return a[i].CurtainsUp.Before(a[j].CurtainsUp) }
