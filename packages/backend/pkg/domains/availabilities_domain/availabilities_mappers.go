package availabilities_domain

import (
	"github.com/go-openapi/strfmt"
	"showplanner.io/pkg/convert"
	"showplanner.io/pkg/database"
	"showplanner.io/pkg/models"
)

func mapToAvailabilityDTO(availability database.Availability) *models.AvailabilityDTO {
	personId := strfmt.UUID(availability.PersonID.String())
	dto := models.AvailabilityDTO{
		PersonID:  &personId,
		EventID:   convert.UintToInt64(availability.EventID),
		Available: &availability.Available,
	}
	return &dto
}
