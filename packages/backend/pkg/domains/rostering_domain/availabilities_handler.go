package rostering_domain

import (
	"log/slog"

	"showplanner.io/pkg/convert"
	"showplanner.io/pkg/database"
	"showplanner.io/pkg/domains/events_domain"
	"showplanner.io/pkg/logger"
	"showplanner.io/pkg/models"
	"showplanner.io/pkg/permissions"
	"showplanner.io/pkg/postoffice"
	"showplanner.io/pkg/postoffice/letters"
	"showplanner.io/pkg/postoffice/topics"
	"showplanner.io/pkg/restapi/operations"

	"github.com/go-openapi/runtime/middleware"
)

func SetupHandlers(api *operations.GoBackendAPI) {
	api.PostAvailabilitiesHandler = handleUpdateAvailability
	api.GetAvailabilitiesHandler = handleGetAvailabilities
	api.PostRolesHandler = handleCreateRole
	api.GetRolesHandler = handleGetRoles
	api.PutRolesIDHandler = handleUpdateRole
}

func createLogErrorFunc(text string, response middleware.Responder) func(err *error) middleware.Responder {
	return func(err *error) middleware.Responder {
		if err != nil {
			logger.Error(text, *err)
		} else {
			slog.Error(text)
		}
		return response
	}
}

var handleUpdateRole = operations.PutRolesIDHandlerFunc(func(params operations.PutRolesIDParams) middleware.Responder {
	logError := createLogErrorFunc("Updating role", &operations.PutRolesIDInternalServerError{})
	role, err := database.GetRole(uint(params.ID))

	if err != nil {
		return logError(&err)
	}

	hasPerm, err := permissions.Rostering.HasPermission(role.ShowID, params.HTTPRequest)
	if err != nil {
		return logError(&err)
	}
	if !hasPerm {
		return &operations.GetAvailabilitiesUnauthorized{}
	}

	role, err = database.UpdateRole(uint(params.ID), database.Role{
		Name: params.RoleDetails.Name,
	})

	if err != nil {
		return logError(&err)
	}

	return &operations.PutRolesIDOK{Payload: convert.GetPointer(mapToRoleDTO(role))}
})

var handleCreateRole = operations.PostRolesHandlerFunc(func(params operations.PostRolesParams) middleware.Responder {
	hasPerm, err := permissions.Rostering.HasPermission(uint(params.RoleDetails.ShowID), params.HTTPRequest)

	if err != nil {
		logger.Error("Creating role", err)
		return &operations.GetAvailabilitiesInternalServerError{}
	}
	if !hasPerm {
		return &operations.GetAvailabilitiesUnauthorized{}
	}

	role, err := database.CreateRole(database.Role{
		ShowID:   uint(params.RoleDetails.ShowID),
		PersonID: nil,
		Name:     params.RoleDetails.Name,
	})

	if err != nil {
		logger.Error("Creating role", err)
		return &operations.GetRolesInternalServerError{}
	}

	mappedRole := mapToRoleDTO(role)
	return &operations.PostRolesOK{Payload: &mappedRole}
})

var handleGetRoles = operations.GetRolesHandlerFunc(func(params operations.GetRolesParams) middleware.Responder {
	hasPerm, err := permissions.Rostering.HasPermission(uint(params.ShowID), params.HTTPRequest)

	if err != nil {
		logger.Error("Getting availabilites", err)
		return &operations.GetAvailabilitiesInternalServerError{}
	}
	if !hasPerm {
		return &operations.GetAvailabilitiesUnauthorized{}
	}

	roles, err := database.GetRoles(uint(params.ShowID))

	if err != nil {
		logger.Error("Getting Roles", err)
		return &operations.GetRolesInternalServerError{}
	}

	mappedRoles := convert.MapArrayOfPointer(roles, mapToRoleDTO)

	return &operations.GetRolesOK{
		Payload: mappedRoles,
	}
})

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

	postoffice.PublishLetter(topics.UpdatedAvailability, letters.UpdatedAvailabilityLetter{
		UserId:       userId,
		EventId:      event.ID,
		Availability: false,
	})

	return &operations.PostAvailabilitiesOK{
		Payload: mapToAvailabilityDTO(*availability),
	}
})
