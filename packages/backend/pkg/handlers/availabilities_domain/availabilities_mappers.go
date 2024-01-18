package availabilities_domain

import (
	"go-backend/pkg/database"
	"go-backend/pkg/models"
	"go-backend/pkg/utils"
)

func mapToAvailabilityDTO(availability database.Availability) *models.AvailabilityDTO {
	dto := models.AvailabilityDTO{
		UserID: &availability.UserID,
		EventID: utils.GetIdPointer(availability.EventID),
		Available: &availability.Available,
	}
	return &dto
}
