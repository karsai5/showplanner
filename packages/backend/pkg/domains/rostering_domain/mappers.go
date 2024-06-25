package rostering_domain

import (
	"showplanner.io/pkg/domains/people_domain_old"
	"slices"
	"strconv"

	"github.com/go-openapi/strfmt"
	"showplanner.io/pkg/conv"
	"showplanner.io/pkg/database"
	"showplanner.io/pkg/models"
)

func mapToAvailabilityDTO(availability database.Availability) models.AvailabilityDTO {
	personId := strfmt.UUID(availability.PersonID.String())
	dto := models.AvailabilityDTO{
		PersonID:  &personId,
		EventID:   conv.UintToInt64(availability.EventID),
		Available: &availability.Available,
	}
	return dto
}

func mapToEventWithAvailabilities(people []database.Person) func(event database.Event) models.AvailabilitiesDTOEventsItems0 {
	return func(event database.Event) models.AvailabilitiesDTOEventsItems0 {
		availabilities := []*models.AvailabilityDTO{}
		for _, person := range people {
			availabilities = append(availabilities, findAvailability(event.Availabilities, *conv.UUIDToStrmFmtUUID(person.ID)))
		}

		return models.AvailabilitiesDTOEventsItems0{
			EventDTO:       event.MapToEventDTO(),
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
				Cover:        conv.Pointer(false),
				Person:       &models.PersonSummaryDTO{},
			}

			if role.Person != nil {
				fillPersonAndAvailabilityData(&dto, *role.Person, event)
			}

			assignmentIdx := slices.IndexFunc(event.Assignments, func(a database.Assignment) bool { return a.RoleID == role.ID })
			if assignmentIdx >= 0 {
				assignment := event.Assignments[assignmentIdx]
				dto.AssignmentID = conv.UintToInt64(assignment.ID)
				fillPersonAndAvailabilityData(&dto, assignment.Person, event)
				if role.Person != nil {
					dto.Cover = conv.Pointer(true)
				}
			}
			assignments[strconv.Itoa(int(role.ID))] = &dto
		}
		return models.RosterDTOEventsItems0{
			EventDTO: event.MapToEventDTO(),
			Assignments: &models.RosterDTOEventsItems0AO1Assignments{
				RosterDTOEventsItems0AO1Assignments: assignments,
			},
			Availabilities: &models.RosterDTOEventsItems0AO1Availabilities{
				RosterDTOEventsItems0AO1Availabilities: mapAvailabilityToMap(event.Availabilities),
			},
			Shadows: mapShadowsToMap(event),
		}
	}
}

func mapShadowsToMap(event database.Event) map[string][]models.ShadowDTO {
	dictionary := map[string][]models.ShadowDTO{}
	for _, s := range event.Shadows {
		roleId := strconv.Itoa(int(s.RoleID))

		val, ok := dictionary[roleId]
		if ok {
			dictionary[roleId] = append(val, mapToShadowDTO(s, event))
		} else {
			dictionary[roleId] = []models.ShadowDTO{mapToShadowDTO(s, event)}
		}
	}
	return dictionary
}

func mapAvailabilityToMap(availabilities []database.Availability) map[string]*models.AvailabilityDTO {
	dictionary := map[string]*models.AvailabilityDTO{}
	for _, a := range availabilities {
		dictionary[a.PersonID.String()] = conv.Pointer(mapToAvailabilityDTO(a))
	}
	return dictionary
}

func fillPersonAndAvailabilityData(dto *models.RosterAssignedDTO, person database.Person, event database.Event) {
	dto.Person = conv.Pointer(people_domain_old.MapToPersonSummaryDTO(person))
	availablilityIdx := slices.IndexFunc(event.Availabilities, func(a database.Availability) bool { return a.PersonID == person.ID })
	if availablilityIdx >= 0 {
		dto.Available = &event.Availabilities[availablilityIdx].Available
	} else {
		dto.Available = nil
	}
}

func mapToRoleDTO(role database.Role) models.RoleDTO {
	var person *models.PersonSummaryDTO
	if role.Person != nil {
		person = conv.Pointer(people_domain_old.MapToPersonSummaryDTO(*role.Person))
	}
	return models.RoleDTO{
		ID:     int64(role.ID),
		Name:   role.Name,
		Person: person,
	}
}

func mapToShadowDTO(shadow database.Shadow, event database.Event) models.ShadowDTO {
	dto := models.ShadowDTO{
		Available: nil,
		ID:        conv.UintToInt64(shadow.ID),
		Person:    conv.Pointer(people_domain_old.MapToPersonSummaryDTO(shadow.Person)),
	}

	availabilityIdx := slices.IndexFunc(event.Availabilities, func(a database.Availability) bool { return shadow.Person.ID == a.PersonID })
	if availabilityIdx >= 0 {
		dto.Available = &event.Availabilities[availabilityIdx].Available
	}

	return dto
}

func mapToAssignedDTO(a database.Assignment) models.AssignedDTO {
	return models.AssignedDTO{
		EventID: conv.UintToInt64(a.EventID),
		Person:  conv.Pointer(people_domain_old.MapToPersonSummaryDTO(a.Person)),
		RoleID:  conv.UintToInt64(a.RoleID),
	}
}

func findAvailability(availabilities []database.Availability, personId strfmt.UUID) *models.AvailabilityDTO {
	for i := range availabilities {
		if availabilities[i].PersonID.String() == personId.String() {
			return conv.Pointer(mapToAvailabilityDTO(availabilities[i]))
		}
	}
	return nil
}
