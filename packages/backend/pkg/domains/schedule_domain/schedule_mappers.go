package schedule_domain

import (
	"showplanner.io/pkg/database"
	"showplanner.io/pkg/models"
	"showplanner.io/pkg/utils"
)

func mapAvailabilityDTO(a database.Availability) models.AvailabilityDTO {
	return models.AvailabilityDTO{
		UserID:    &a.UserID,
		EventID:   utils.GetIdPointer(a.EventID),
		Available: &a.Available,
	}
}
