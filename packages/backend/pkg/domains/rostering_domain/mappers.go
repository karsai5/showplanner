package rostering_domain

import (
	"slices"
	"strconv"

	"github.com/go-openapi/strfmt"
	"showplanner.io/pkg/convert"
	"showplanner.io/pkg/database"
	"showplanner.io/pkg/domains/events_domain"
	"showplanner.io/pkg/models"
)

func mapToAvailabilityDTO(availability database.Availability) models.AvailabilityDTO {
	personId := strfmt.UUID(availability.PersonID.String())
	dto := models.AvailabilityDTO{
		PersonID:  &personId,
		EventID:   convert.UintToInt64(availability.EventID),
		Available: &availability.Available,
	}
	return dto
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
		assignments := map[string]*models.RosterAssignedDTO{}
		for _, role := range roles {
			dto := models.RosterAssignedDTO{
				AssignmentID: nil,
				Available:    nil,
				Cover:        convert.GetPointer(false),
				Person:       &models.PersonSummaryDTO{},
			}

			if role.Person != nil {
				fillPersonAndAvailabilityData(&dto, *role.Person, event)
			}

			assignmentIdx := slices.IndexFunc(event.Assignments, func(a database.Assignment) bool { return a.RoleID == role.ID })
			if assignmentIdx >= 0 {
				assignment := event.Assignments[assignmentIdx]
				dto.AssignmentID = convert.UintToInt64(assignment.ID)
				fillPersonAndAvailabilityData(&dto, assignment.Person, event)
				if role.Person != nil {
					dto.Cover = convert.GetPointer(true)
				}
			}
			assignments[strconv.Itoa(int(role.ID))] = &dto
		}
		return models.RosterDTOEventsItems0{
			EventDTO: events_domain.MapEventToEventDTO(event),
			Assignments: &models.RosterDTOEventsItems0AO1Assignments{
				RosterDTOEventsItems0AO1Assignments: assignments,
			},
			Availabilities: &models.RosterDTOEventsItems0AO1Availabilities{
				RosterDTOEventsItems0AO1Availabilities: mapAvailabilityToMap(event.Availabilities),
			},
		}
	}
}

func mapAvailabilityToMap(availabilities []database.Availability) map[string]*models.AvailabilityDTO {
	dictionary := map[string]*models.AvailabilityDTO{}
	for _, a := range availabilities {
		dictionary[a.PersonID.String()] = convert.GetPointer(mapToAvailabilityDTO(a))
	}
	return dictionary
}

func fillPersonAndAvailabilityData(dto *models.RosterAssignedDTO, person database.Person, event database.Event) {
	dto.Person = convert.GetPointer(mapPerson(person))
	availablilityIdx := slices.IndexFunc(event.Availabilities, func(a database.Availability) bool { return a.PersonID == person.ID })
	if availablilityIdx >= 0 {
		dto.Available = &event.Availabilities[availablilityIdx].Available
	} else {
		dto.Available = nil
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

func mapToAssignedDTO(a database.Assignment) models.AssignedDTO {
	return models.AssignedDTO{
		EventID: convert.UintToInt64(a.EventID),
		Person:  convert.GetPointer(mapPerson(a.Person)),
		RoleID:  convert.UintToInt64(a.RoleID),
	}
}

func findAvailability(availabilities []database.Availability, personId strfmt.UUID) *models.AvailabilityDTO {
	for i := range availabilities {
		if availabilities[i].PersonID.String() == personId.String() {
			return convert.GetPointer(mapToAvailabilityDTO(availabilities[i]))
		}
	}
	return nil
}
