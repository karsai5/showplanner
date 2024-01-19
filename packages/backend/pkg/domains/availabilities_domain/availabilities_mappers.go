package availabilities_domain

import (
	"showplanner.io/pkg/database"
	"showplanner.io/pkg/models"
	"showplanner.io/pkg/utils"
)

func mapToAvailabilityDTO(availability database.Availability) *models.AvailabilityDTO {
	dto := models.AvailabilityDTO{
		UserID:    &availability.UserID,
		EventID:   utils.GetIdPointer(availability.EventID),
		Available: &availability.Available,
	}
	return &dto
}
