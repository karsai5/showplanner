package availabilities_domain

import (
	"showplanner.io/pkg/database"
	"showplanner.io/pkg/models"
	"showplanner.io/pkg/permissions"
	"showplanner.io/pkg/restapi/operations"
	"showplanner.io/pkg/utils"

	"github.com/go-openapi/runtime/middleware"
)

var HandleUpdateAvailability = operations.PostAvailabilitiesHandlerFunc(func(params operations.PostAvailabilitiesParams) middleware.Responder {
	userId := permissions.UserId(params.HTTPRequest)

	if *params.Availability.UserID != userId {
		return &operations.PostAvailabilitiesUnauthorized{
			Payload: &models.Error{
				Message: utils.GetStringPointer("Cannot update an availability for another user. " + *params.Availability.UserID + "!=" + userId),
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
				Message: utils.GetStringPointer("Cannot update an availability for a show you are not assigned to"),
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
