package rostering_domain

import (
	"slices"

	"github.com/go-openapi/strfmt"
	"showplanner.io/pkg/convert"
	"showplanner.io/pkg/database"
	"showplanner.io/pkg/domains/events_domain"
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

func mapToEventWithAvailabilities(people []database.Person) func(event database.Event) models.AvailabilitiesDTOEventsItems0 {
	return func(event database.Event) models.AvailabilitiesDTOEventsItems0 {
		availabilities := []*models.AvailabilityDTO{}
		for _, person := range people {
			availabilities = append(availabilities, findAvailability(event.Availabilities, *convert.UUIDToStrmFmtUUID(person.ID)))
		}

		return models.AvailabilitiesDTOEventsItems0{
			EventDTO:       events_domain.MapEventToEventDTO(event),
			Availabilities: availabilities,
		}
	}
}

func mapToEventWithAssignments(roles []database.Role) func(event database.Event) models.RosterDTOEventsItems0 {
	return func(event database.Event) models.RosterDTOEventsItems0 {
		assignments := []*models.RosterAssignedDTO{}
		for _, role := range roles {
			assignment := models.RosterAssignedDTO{
				Available: nil,
				Cover:     convert.GetPointer(false),
			}

			if role.Person != nil {
				assignment.Person = convert.GetPointer(mapPerson(*role.Person))

				availablilityIdx := slices.IndexFunc(event.Availabilities, func(a database.Availability) bool {
					return a.PersonID == *role.PersonID
				})
				if availablilityIdx >= 0 {
					assignment.Available = &event.Availabilities[availablilityIdx].Available
				}
			}
			assignments = append(assignments, &assignment)
		}
		return models.RosterDTOEventsItems0{
			EventDTO:    events_domain.MapEventToEventDTO(event),
			Assignments: assignments,
		}
	}
}

func mapPerson(person database.Person) models.PersonSummaryDTO {
	return models.PersonSummaryDTO{
		FirstName: person.FirstName,
		ID:        *convert.UUIDToStrmFmtUUID(person.ID),
		LastName:  person.LastName,
	}
}

func mapToRoleDTO(role database.Role) models.RoleDTO {
	var person *models.PersonSummaryDTO
	if role.Person != nil {
		person = convert.GetPointer(mapPerson(*role.Person))
	}
	return models.RoleDTO{
		ID:     int64(role.ID),
		Name:   role.Name,
		Person: person,
	}
}

func mapToAssignmentDTO(a database.Assignment) models.AssignedDTO {
	return models.AssignedDTO{
		EventID: convert.UintToInt64(a.EventID),
		Person:  convert.GetPointer(mapPerson(a.Person)),
		RoleID:  convert.UintToInt64(a.RoleID),
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
