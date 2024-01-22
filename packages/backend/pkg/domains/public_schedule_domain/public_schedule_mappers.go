package public_schedule_domain

import (
	"showplanner.io/pkg/convert"
	"showplanner.io/pkg/database"
	"showplanner.io/pkg/models"

	"github.com/go-openapi/strfmt"
)

func mapEventsToPublicEventsDTO(events []database.Event) (mappedEvents []*models.EventPublicDTO) {
	for _, event := range events {
		mappedEvent := mapEventToEventPublicDTO(event)
		mappedEvents = append(mappedEvents, &mappedEvent)
	}

	return mappedEvents
}

func mapEventToEventPublicDTO(e database.Event) models.EventPublicDTO {
	start := strfmt.DateTime(e.Start)

	me := models.EventPublicDTO{
		ID:         convert.UintToInt64(e.ID),
		ShowID:     int64(e.ShowID),
		Start:      &start,
		CurtainsUp: convert.TimeToDateTime(e.CurtainsUp),
		End:        convert.TimeToDateTime(e.End),
		NameRaw:    e.Name,
		Name:       e.Name,
	}

	return me
}
