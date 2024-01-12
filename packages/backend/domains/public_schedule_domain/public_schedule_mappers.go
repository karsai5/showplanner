package public_schedule_domain

import (
	"go-backend/database"
	"go-backend/models"
	"go-backend/utils"
	"sort"
	"strconv"

	"github.com/go-openapi/strfmt"
)

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

func mapEventToEventPublicDTO(e database.Event) models.EventPublicDTO {
	start := strfmt.DateTime(e.Start)

	me := models.EventPublicDTO{
		ID:         utils.GetIdPointer(e.ID),
		ShowID:     int64(e.ShowID),
		Start:      &start,
		CurtainsUp: utils.GetDateTime(e.CurtainsUp),
		End:        utils.GetDateTime(e.End),
		NameRaw:    e.Name,
		Name:       e.Name,
	}

	return me
}
