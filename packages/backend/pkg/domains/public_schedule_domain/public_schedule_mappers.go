package public_schedule_domain

import (
	"showplanner.io/pkg/conv"
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
		ID:         conv.UintToInt64(e.ID),
		ShowID:     int64(e.ShowID),
		Start:      &start,
		CurtainsUp: conv.TimeToDateTime(e.CurtainsUp),
		End:        conv.TimeToDateTime(e.End),
		NameRaw:    e.Name,
		Name:       e.Name,
		Options:    &models.EventOptionsDTO{},
	}

	if e.Options.Divider {
		me.Options.Divider = conv.Pointer(e.Options.Divider)
	}

	return me
}
