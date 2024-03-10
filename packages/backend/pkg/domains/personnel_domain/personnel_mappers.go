package personnel_domain

import (
	"showplanner.io/pkg/conv"
	"showplanner.io/pkg/database"
	"showplanner.io/pkg/models"
)

func MapToPersonSummaryDTO(person database.Person) models.PersonSummaryDTO {
	dto := models.PersonSummaryDTO{
		FirstName: &person.FirstName,
		ID:        conv.UUIDToStrmFmtUUID(person.ID),
		LastName:  &person.LastName,
	}
	if person.PreferredName != nil {
		dto.PreferredName = *person.PreferredName
	}
	return dto
}
