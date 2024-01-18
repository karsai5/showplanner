package schedule_domain

import (
	"go-backend/pkg/database"
	"go-backend/pkg/models"
	"go-backend/pkg/utils"
)

func mapAvailabilityDTO(a database.Availability) models.AvailabilityDTO {
	return models.AvailabilityDTO{
		UserID:    &a.UserID,
		EventID:   utils.GetIdPointer(a.EventID),
		Available: &a.Available,
	}
}
