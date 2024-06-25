package people_domain_old

import (
	"showplanner.io/pkg/conv"
	"showplanner.io/pkg/database"
	"showplanner.io/pkg/restapi/dtos"
)

func MapToPersonSummaryDTO(person database.Person) dtos.PersonSummaryDTO {
	dto := dtos.PersonSummaryDTO{
		FirstName: &person.FirstName,
		ID:        conv.UUIDToStrmFmtUUID(person.ID),
		LastName:  &person.LastName,
		Private:   nil,
	}
	if person.PreferredName != nil {
		dto.PreferredName = *person.PreferredName
	}
	return dto
}

func MapToPersonSummaryDTOWithEmail(p database.Person) dtos.PersonSummaryDTO {
	dto := MapToPersonSummaryDTO(p)
	dto.Private = &dtos.PersonSummaryDTOPrivate{
		Email: p.Email,
	}
	return dto
}

func MapToPersonSummaryDTOWithPrivateInfo(p database.Person) dtos.PersonSummaryDTO {
	dto := MapToPersonSummaryDTO(p)
	dto.Private = &dtos.PersonSummaryDTOPrivate{
		Allergies: p.Allergies,
		Dob:       p.DOB,
		Email:     p.Email,
		EmergencyContact: &dtos.PersonSummaryDTOPrivateEmergencyContact{
			Name:         p.EmergencyName,
			Phone:        p.EmergencyPhone,
			Relationship: p.EmergencyRelationship,
		},
		Phone: p.Phone,
		Wwc:   p.WWC,
	}
	return dto
}
