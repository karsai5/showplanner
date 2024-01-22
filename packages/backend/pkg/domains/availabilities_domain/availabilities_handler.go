package availabilities_domain

import (
	"log/slog"

	"showplanner.io/pkg/convert"
	"showplanner.io/pkg/database"
	"showplanner.io/pkg/models"
	"showplanner.io/pkg/permissions"
	"showplanner.io/pkg/restapi/operations"

	"github.com/go-openapi/runtime/middleware"
)

var HandleUpdateAvailability = operations.PostAvailabilitiesHandlerFunc(func(params operations.PostAvailabilitiesParams) middleware.Responder {
	userId, err := permissions.GetUserId(params.HTTPRequest)
	if err != nil {
		slog.Error("While updating availabilites", "err", err)
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
