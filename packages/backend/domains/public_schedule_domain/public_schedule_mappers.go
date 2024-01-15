package public_schedule_domain

import (
	"go-backend/database"
	"go-backend/models"
	"go-backend/utils"

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
