package schedule_domain

import (
	"showplanner.io/pkg/convert"
	"showplanner.io/pkg/database"
	"showplanner.io/pkg/models"
)

func mapAvailabilityDTO(a database.Availability) models.AvailabilityDTO {
	return models.AvailabilityDTO{
		PersonID:  convert.UUIDToStrmFmtUUID(a.PersonID),
		EventID:   convert.UintToInt64(a.EventID),
		Available: &a.Available,
	}
}
