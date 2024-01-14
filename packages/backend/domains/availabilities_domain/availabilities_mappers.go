package availabilities_domain

import (
	"go-backend/database"
	"go-backend/models"
	"go-backend/utils"
)

func mapToAvailabilityDTO(availability database.Availability) *models.AvailabilityDTO {
	dto := models.AvailabilityDTO{
		UserID: &availability.UserID,
		EventID: utils.GetIdPointer(availability.EventID),
		Available: &availability.Available,
	}
	return &dto
}
