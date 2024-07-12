package rostering_domain

import (
	"slices"
	"strconv"

	dto2 "showplanner.io/pkg/restapi/dtos"

	"github.com/go-openapi/strfmt"
	"showplanner.io/pkg/conv"
	"showplanner.io/pkg/database"
)

func mapToAvailabilityDTO(availability database.Availability) dto2.AvailabilityDTO {
	personId := strfmt.UUID(availability.PersonID.String())
	dto := dto2.AvailabilityDTO{
		PersonID:  &personId,
		EventID:   conv.UintToInt64(availability.EventID),
		Available: &availability.Available,
	}
	return dto
}

func mapToEventWithAvailabilities(people []database.Person) func(event database.Event) dto2.AvailabilitiesDTOEventsItems0 {
	return func(event database.Event) dto2.AvailabilitiesDTOEventsItems0 {
		availabilities := []*dto2.AvailabilityDTO{}
		for _, person := range people {
			availabilities = append(availabilities, findAvailability(event.Availabilities, *conv.UUIDToStrmFmtUUID(person.ID)))
		}

		return dto2.AvailabilitiesDTOEventsItems0{
			EventDTO:       event.MapToEventDTO(),
			Availabilities: availabilities,
		}
	}
}

func mapToEventWithAssignments(roles []database.Role) func(event database.Event) dto2.RosterDTOEventsItems0 {
	return func(event database.Event) dto2.RosterDTOEventsItems0 {
		assignments := map[string]*dto2.RosterAssignedDTO{}
		for _, role := range roles {
			dto := dto2.RosterAssignedDTO{
				AssignmentID: nil,
				Available:    nil,
				Cover:        conv.Pointer(false),
				Person:       &dto2.PersonSummaryDTO{},
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
		return dto2.RosterDTOEventsItems0{
			EventDTO: event.MapToEventDTO(),
			Assignments: &dto2.RosterDTOEventsItems0AO1Assignments{
				RosterDTOEventsItems0AO1Assignments: assignments,
			},
			Availabilities: &dto2.RosterDTOEventsItems0AO1Availabilities{
				RosterDTOEventsItems0AO1Availabilities: mapAvailabilityToMap(event.Availabilities),
			},
			Shadows: mapShadowsToMap(event),
		}
	}
}

func mapShadowsToMap(event database.Event) map[string][]dto2.ShadowDTO {
	dictionary := map[string][]dto2.ShadowDTO{}
	for _, s := range event.Shadows {
		roleId := strconv.Itoa(int(s.RoleID))

		val, ok := dictionary[roleId]
		if ok {
			dictionary[roleId] = append(val, mapToShadowDTO(s, event))
		} else {
			dictionary[roleId] = []dto2.ShadowDTO{mapToShadowDTO(s, event)}
		}
	}
	return dictionary
}

func mapAvailabilityToMap(availabilities []database.Availability) map[string]*dto2.AvailabilityDTO {
	dictionary := map[string]*dto2.AvailabilityDTO{}
	for _, a := range availabilities {
		dictionary[a.PersonID.String()] = conv.Pointer(mapToAvailabilityDTO(a))
	}
	return dictionary
}

func fillPersonAndAvailabilityData(dto *dto2.RosterAssignedDTO, person database.Person, event database.Event) {
	dto.Person = conv.Pointer(person.MapToPersonSummaryDTO())
	availablilityIdx := slices.IndexFunc(event.Availabilities, func(a database.Availability) bool { return a.PersonID == person.ID })
	if availablilityIdx >= 0 {
		dto.Available = &event.Availabilities[availablilityIdx].Available
	} else {
		dto.Available = nil
	}
}

func mapToRoleDTO(role database.Role) dto2.RoleDTO {
	var person *dto2.PersonSummaryDTO
	if role.Person != nil {
		person = conv.Pointer(role.Person.MapToPersonSummaryDTO())
	}
	return dto2.RoleDTO{
		ID:     int64(role.ID),
		Name:   role.Name,
		Person: person,
	}
}

func mapToShadowDTO(shadow database.Shadow, event database.Event) dto2.ShadowDTO {
	dto := dto2.ShadowDTO{
		Available: nil,
		ID:        conv.UintToInt64(shadow.ID),
		Person:    conv.Pointer(shadow.Person.MapToPersonSummaryDTO()),
	}

	availabilityIdx := slices.IndexFunc(event.Availabilities, func(a database.Availability) bool { return shadow.Person.ID == a.PersonID })
	if availabilityIdx >= 0 {
		dto.Available = &event.Availabilities[availabilityIdx].Available
	}

	return dto
}

func mapToAssignedDTO(a database.Assignment) dto2.AssignedDTO {
	return dto2.AssignedDTO{
		EventID: conv.UintToInt64(a.EventID),
		Person:  conv.Pointer(a.Person.MapToPersonSummaryDTO()),
		RoleID:  conv.UintToInt64(a.RoleID),
	}
}

func findAvailability(availabilities []database.Availability, personId strfmt.UUID) *dto2.AvailabilityDTO {
	for i := range availabilities {
		if availabilities[i].PersonID.String() == personId.String() {
			return conv.Pointer(mapToAvailabilityDTO(availabilities[i]))
		}
	}
	return nil
}
