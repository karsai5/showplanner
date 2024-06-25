package rostering_domain

import (
	"showplanner.io/pkg/conv"
	"showplanner.io/pkg/database"
	"showplanner.io/pkg/domains/people_domain"
	"showplanner.io/pkg/domains/schedule_domain"
	"showplanner.io/pkg/logger"
	"showplanner.io/pkg/models"
	"showplanner.io/pkg/permissions"
	"showplanner.io/pkg/postoffice"
	"showplanner.io/pkg/postoffice/letters"
	"showplanner.io/pkg/postoffice/topics"
	"showplanner.io/pkg/restapi/operations"

	"github.com/go-openapi/runtime/middleware"
)

var handleGetAvailabilities = operations.GetAvailabilitiesHandlerFunc(func(params operations.GetAvailabilitiesParams) middleware.Responder {
	logError := logger.CreateLogErrorFunc("Getting roster", &operations.GetAvailabilitiesInternalServerError{})
	hasPerm, err := permissions.Rostering.HasPermission(uint(params.ShowID), params.HTTPRequest)

	if err != nil {
		return logError(&err)
	}
	if !hasPerm {
		return &operations.GetAvailabilitiesUnauthorized{}
	}

	people, err := database.GetPeopleAssignedToShow(uint(params.ShowID))
	if err != nil {
		return logError(&err)
	}
	events, err := database.GetEventsWithAvailabilities(uint(params.ShowID))
	if err != nil {
		return logError(&err)
	}

	mappedPeople := conv.MapArrayOfPointer(people, people_domain.MapToPersonSummaryDTO)
	mappedEvents := conv.MapArrayOfPointer(events, mapToEventWithAvailabilities(people))

	schedule_domain.NameEventsWithCurtainsUp(mappedEvents)

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
				Message: conv.Pointer("Cannot update an availability for another user"),
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
				Message: conv.Pointer("Cannot update an availability for a show you are not assigned to"),
			},
		}
	}

	availability, err := database.UpdateAvailability(userId, uint(*params.Availability.EventID), *params.Availability.Available)

	if err != nil {
		return &operations.PostAvailabilitiesInternalServerError{}
	}

	postoffice.PublishLetter(topics.UpdatedAvailability, letters.UpdatedAvailabilityLetter{
		UserId:       userId,
		EventId:      event.ID,
		Availability: false,
	})

	return &operations.PostAvailabilitiesOK{
		Payload: conv.Pointer(mapToAvailabilityDTO(*availability)),
	}
})
