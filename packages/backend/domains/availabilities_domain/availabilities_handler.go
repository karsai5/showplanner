package availabilities_domain

import (
	"go-backend/domains/events_domain"
	"go-backend/domains/permissions"
	"go-backend/models"
	"go-backend/restapi/operations"
	"go-backend/utils"

	"github.com/go-openapi/runtime/middleware"
)

var HandleUpdateAvailability = operations.PostAvailabilitiesHandlerFunc(func(params operations.PostAvailabilitiesParams) middleware.Responder {
	userId := permissions.UserId(params.HTTPRequest)

	if params.Availability.UserID != &userId {
		return &operations.PostAvailabilitiesUnauthorized{
			Payload: &models.Error{
				Message: utils.GetStringPointer("Cannot update an availability for another user"),
			},
		}
	}

	event, err := events_domain.GetEvent(uint(*params.Availability.EventID))

	if err != nil {
		return &operations.PostAvailabilitiesInternalServerError{}
	}

	if hasPerm, _ := permissions.ViewEvents.HasPermission(event.ShowID, params.HTTPRequest); !hasPerm {
		return &operations.PostAvailabilitiesUnauthorized{
			Payload: &models.Error{
				Message: utils.GetStringPointer("Cannot update an availability for a show you are not assigned to"),
			},
		}
	}

	availability, err := UpdateAvailability(userId, uint(*params.Availability.EventID), *params.Availability.Available)

	if err != nil {
		return &operations.PostAvailabilitiesInternalServerError{}
	}

	return &operations.PostAvailabilitiesOK{
		Payload: mapToAvailabilityDTO(*availability),
	}
})
