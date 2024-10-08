package rostering_domain

import (
	"showplanner.io/pkg/conv"
	"showplanner.io/pkg/database"
	"showplanner.io/pkg/domains/schedule_domain"
	"showplanner.io/pkg/logger"
	"showplanner.io/pkg/permissions"
	"showplanner.io/pkg/postoffice"
	"showplanner.io/pkg/postoffice/letters"
	"showplanner.io/pkg/postoffice/topics"
	"showplanner.io/pkg/restapi/dtos"
	"showplanner.io/pkg/restapi/operations"

	"github.com/go-openapi/runtime/middleware"
)

var ph permissions.IPermissionsHandler = &permissions.SupertokensPermissionsHandler{}

var handleGetAvailabilities = operations.GetAvailabilitiesHandlerFunc(func(params operations.GetAvailabilitiesParams) middleware.Responder {
	logError := logger.CreateLogErrorFunc("Getting roster", &operations.GetAvailabilitiesInternalServerError{})
	hasPerm, err := permissions.Rostering.HasPermission(ph, params.HTTPRequest, uint(params.ShowID))
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

	mappedPeople := conv.MapArrayOfPointer(people, func(p database.Person) dtos.PersonSummaryDTO { return p.MapToPersonSummaryDTO() })
	mappedEvents := conv.MapArrayOfPointer(events, func(event database.Event) dtos.AvailabilitiesDTOEventsItems0 {
		return event.MapToEventWithAvailabilities(people)
	})

	schedule_domain.NameEventsWithCurtainsUp(mappedEvents)

	dto := dtos.AvailabilitiesDTO{
		People: mappedPeople,
		Events: mappedEvents,
	}

	return &operations.GetAvailabilitiesOK{
		Payload: &dto,
	}
})

var handleUpdateAvailability = operations.PostAvailabilitiesHandlerFunc(func(params operations.PostAvailabilitiesParams) middleware.Responder {
	userId, err := ph.GetUserId(params.HTTPRequest)
	if err != nil {
		logger.Error("Could not update availabilities", err)
		return &operations.PostAvailabilitiesInternalServerError{}
	}

	if params.Availability.PersonID.String() != userId.String() {
		return &operations.PostAvailabilitiesUnauthorized{
			Payload: &dtos.Error{
				Message: "Cannot update an availability for another user",
			},
		}
	}

	event, err := database.GetEvent(uint(*params.Availability.EventID))
	if err != nil {
		return &operations.PostAvailabilitiesInternalServerError{}
	}

	if hasPerm, _ := permissions.ViewEvents.HasPermission(ph, params.HTTPRequest, event.ShowID); !hasPerm {
		return &operations.PostAvailabilitiesUnauthorized{
			Payload: &dtos.Error{
				Message: "Cannot update an availability for a show you are not assigned to",
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
		Payload: conv.Pointer((*availability).MapToAvailabilityDTO()),
	}
})
