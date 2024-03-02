package events_domain

import (
	"sort"
	"strconv"
	"time"

	"showplanner.io/pkg/conv"
	"showplanner.io/pkg/database"
	"showplanner.io/pkg/models"

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

func NameEventsWithCurtainsUp[E models.EventWithCurtainsUp](events []E) {
	var showEvents []E
	for _, event := range events {
		if (event).GetCurtainsUp() != nil {
			showEvents = append(showEvents, event)
		}
	}

	sort.Slice(showEvents, func(i, j int) bool {
		iCurtainsUp := *timep(*showEvents[i].GetCurtainsUp())
		jCurtainsUp := *timep(*showEvents[j].GetCurtainsUp())
		return iCurtainsUp.Before(jCurtainsUp)
	})

	for i, event := range showEvents {
		if event.IsNameEmpty() {
			name := "Show " + strconv.Itoa(i+1)
			event.SetName(name)
		}
	}
}

func MapEventToEventDTO(e database.Event) models.EventDTO {
	start := strfmt.DateTime(e.Start)

	me := models.EventDTO{
		ID:         conv.UintToInt64(e.ID),
		ShowID:     int64(e.ShowID),
		Start:      &start,
		CurtainsUp: conv.TimeToDateTime(e.CurtainsUp),
		End:        conv.TimeToDateTime(e.End),
		NameRaw:    e.Name,
		Name:       e.Name,
		Shortnote:  e.ShortNote,
		Address:    e.Address,
	}

	return me
}
