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

func mapPerson(person database.Person) models.PersonSummaryDTO {
	return models.PersonSummaryDTO{
		FirstName: person.FirstName,
		ID:        *convert.UUIDToStrmFmtUUID(person.ID),
		LastName:  person.LastName,
	}
}

func findAvailability(availabilities []database.Availability, personId strfmt.UUID) *models.AvailabilityDTO {
	for i := range availabilities {
		if availabilities[i].PersonID.String() == personId.String() {
			return mapToAvailabilityDTO(availabilities[i])
		}
	}
	return nil
}
