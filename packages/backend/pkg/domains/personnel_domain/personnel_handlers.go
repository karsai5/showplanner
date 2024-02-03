package personnel_domain

import (
	"github.com/go-openapi/runtime/middleware"
	"showplanner.io/pkg/convert"
	"showplanner.io/pkg/database"
	"showplanner.io/pkg/logger"
	"showplanner.io/pkg/models"
	"showplanner.io/pkg/permissions"
	"showplanner.io/pkg/restapi/operations"
)

func SetupHandlers(api *operations.GoBackendAPI) {
	api.GetPersonnelHandler = handlePersonnel
}

var handlePersonnel = operations.GetPersonnelHandlerFunc(func(params operations.GetPersonnelParams) middleware.Responder {
	hasPerm, err := permissions.ManagePersonnel.HasPermission(uint(params.ShowID), params.HTTPRequest)
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

	mappedPeople := convert.MapArrayOfPointer(people, func(person database.Person) models.PersonSummaryDTO {
		return models.PersonSummaryDTO{
			FirstName: person.FirstName,
			ID:        *convert.UUIDToStrmFmtUUID(person.ID),
			LastName:  person.LastName,
		}
	})

	return &operations.GetPersonnelOK{
		Payload: &models.PersonnelDTO{
			People: mappedPeople,
		},
	}
})
