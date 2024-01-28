package availabilities_domain

import (
	"showplanner.io/pkg/convert"
	"showplanner.io/pkg/database"
	"showplanner.io/pkg/domains/events_domain"
	"showplanner.io/pkg/logger"
	"showplanner.io/pkg/models"
	"showplanner.io/pkg/permissions"
	"showplanner.io/pkg/restapi/operations"

	"github.com/go-openapi/runtime/middleware"
)

func SetupHandlers(api *operations.GoBackendAPI) {
	api.PostAvailabilitiesHandler = handleUpdateAvailability
	api.GetAvailabilitiesHandler = handleGetAvailabilities
}

var handleGetAvailabilities = operations.GetAvailabilitiesHandlerFunc(func(params operations.GetAvailabilitiesParams) middleware.Responder {
	hasPerm, err := permissions.Rostering.HasPermission(uint(params.ShowID), params.HTTPRequest)

	if err != nil {
		logger.Error("Getting availabilites", err)
		return &operations.GetAvailabilitiesInternalServerError{}
	}
	if !hasPerm {
		return &operations.GetAvailabilitiesUnauthorized{}
	}

	people, err := database.GetPeopleAssignedToShow(uint(params.ShowID))
	if err != nil {
		logger.Error("Getting availabilites", err)
		return &operations.GetAvailabilitiesInternalServerError{}
	}
	events, err := database.GetEventsWithAvailabilities(uint(params.ShowID))
	if err != nil {
		logger.Error("Getting availabilites", err)
		return &operations.GetAvailabilitiesInternalServerError{}
	}

	mappedPeople := convert.MapArrayOfPointer(people, mapPerson)

	// 1. go through events
	// 2. create availabilities array in order of people

	mappedEvents := []*models.AvailabilitiesDTOEventsItems0{}

	for _, event := range events {
		availabilities := []*models.AvailabilityDTO{}
		for _, person := range mappedPeople {
			availabilities = append(availabilities, findAvailability(event.Availabilities, person.ID))
		}
		mappedEvents = append(mappedEvents, &models.AvailabilitiesDTOEventsItems0{
			EventDTO:       events_domain.MapEventToEventDTO(event),
			Availabilities: availabilities,
		})
	}

	events_domain.NameEventsWithCurtainsUp(mappedEvents)

	dto := models.AvailabilitiesDTO{
		People: mappedPeople,
		Events: mappedEvents,
	}

	return &operations.GetAvailabilitiesOK{
		Payload: &dto,
	}
})

var handleUpdateAvailability = operations.PostAvailabilitiesHandlerFunc(func(params operations.PostAvailabilitiesParams) middleware.Responder {
	userId, err := permissions.GetUserId(params.HTTPRequest)
	if err != nil {
		logger.Error("Could not udpate availabilities", err)
		return &operations.PostAvailabilitiesInternalServerError{}
	}

	if params.Availability.PersonID.String() != userId.String() {
		return &operations.PostAvailabilitiesUnauthorized{
			Payload: &models.Error{
				Message: convert.GetPointer("Cannot update an availability for another user"),
			},
		}
	}

	event, err := database.GetEvent(uint(*params.Availability.EventID))

	if err != nil {
		return &operations.PostAvailabilitiesInternalServerError{}
	}

	if hasPerm, _ := permissions.ViewEvents.HasPermission(event.ShowID, params.HTTPRequest); !hasPerm {
		return &operations.PostAvailabilitiesUnauthorized{
			Payload: &models.Error{
				Message: convert.GetPointer("Cannot update an availability for a show you are not assigned to"),
			},
		}
	}

	availability, err := database.UpdateAvailability(userId, uint(*params.Availability.EventID), *params.Availability.Available)

	if err != nil {
		return &operations.PostAvailabilitiesInternalServerError{}
	}

	return &operations.PostAvailabilitiesOK{
		Payload: mapToAvailabilityDTO(*availability),
	}
})
