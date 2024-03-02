package schedule_domain

import (
	"showplanner.io/pkg/conv"
	"showplanner.io/pkg/database"
	"showplanner.io/pkg/models"
)

func mapAvailabilityDTO(a database.Availability) models.AvailabilityDTO {
	return models.AvailabilityDTO{
		PersonID:  conv.UUIDToStrmFmtUUID(a.PersonID),
		EventID:   conv.UintToInt64(a.EventID),
		Available: &a.Available,
	}
}
