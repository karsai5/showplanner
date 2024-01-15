package schedule_domain

import (
	"go-backend/database"
	"go-backend/models"
	"go-backend/utils"
)

func mapAvailabilityDTO(a database.Availability) models.AvailabilityDTO {
	return models.AvailabilityDTO{
		UserID:    &a.UserID,
		EventID:   utils.GetIdPointer(a.EventID),
		Available: &a.Available,
	}
}
