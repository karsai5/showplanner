package personnel_domain

import (
	"sort"
	"strings"

	"github.com/go-openapi/runtime/middleware"
	uuid "github.com/satori/go.uuid"
	"showplanner.io/pkg/conv"
	"showplanner.io/pkg/database"
	"showplanner.io/pkg/logger"
	"showplanner.io/pkg/models"
	"showplanner.io/pkg/permissions"
	"showplanner.io/pkg/restapi/operations"
)

func SetupHandlers(api *operations.GoBackendAPI) {
	api.GetPersonnelAssignedHandler = handleAssignedPersonnel
	api.GetPersonnelAssignableHandler = handleAssignablePersonnel
	api.PostPersonnelAssignHandler = handleAddPersonToShow
}

var handleAddPersonToShow = operations.PostPersonnelAssignHandlerFunc(func(params operations.PostPersonnelAssignParams) middleware.Responder {
	hasPerm, err := permissions.EditPersonnel.HasPermission(uint(params.ShowID), params.HTTPRequest)
	if err != nil {
		logger.Error("Adding person to show", err)
		return &operations.PostPersonnelAssignInternalServerError{}
	}
	if !hasPerm {
		return &operations.PostPersonnelAssignUnauthorized{}
	}

	personId, err := uuid.FromString(params.PersonID.String())
	if err != nil {
		logger.Error("Adding person to show", err)
		return &operations.PostPersonnelAssignInternalServerError{}
	}

	err = AddToShow(params.ShowID, personId)

	if err != nil {
		logger.Error("Adding person to show", err)
		return &operations.PostPersonnelAssignInternalServerError{}
	}
	return &operations.PostPersonnelAssignOK{}
})

var handleAssignedPersonnel = operations.GetPersonnelAssignedHandlerFunc(func(params operations.GetPersonnelAssignedParams) middleware.Responder {
	hasPerm, err := permissions.ViewPersonnel.HasPermission(uint(params.ShowID), params.HTTPRequest)
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

	sort.Slice(people, func(i, j int) bool {
		personI := strings.ToLower(strings.Join([]string{people[i].FirstName, people[i].LastName}, ""))
		personJ := strings.ToLower(strings.Join([]string{people[j].FirstName, people[j].LastName}, ""))
		return personI < personJ
	})

	mappedPeople := conv.MapArrayOfPointer(people, func(person database.Person) models.PersonSummaryDTO {
		return models.PersonSummaryDTO{
			FirstName: person.FirstName,
			ID:        *conv.UUIDToStrmFmtUUID(person.ID),
			LastName:  person.LastName,
		}
	})

	return &operations.GetPersonnelAssignedOK{
		Payload: &models.ArrayOfPersonSummaryDTO{
			People: mappedPeople,
		},
	}
})

var handleAssignablePersonnel = operations.GetPersonnelAssignableHandlerFunc(func(params operations.GetPersonnelAssignableParams) middleware.Responder {
	logError := logger.CreateLogErrorFunc("Getting roster", &operations.GetPersonnelAssignableInternalServerError{})
	hasPerm, err := permissions.ViewPersonnel.HasPermission(uint(params.ShowID), params.HTTPRequest)
	if err != nil {
		return logError(&err)
	}
	if !hasPerm {
		return &operations.GetAvailabilitiesUnauthorized{}
	}

	people, err := database.GetPeopleNotAssignedToShow(uint(params.ShowID))
	if err != nil {
		return logError(&err)
	}

	sort.Slice(people, func(i, j int) bool {
		personI := strings.Join([]string{people[i].FirstName, people[i].LastName}, "")
		personJ := strings.Join([]string{people[j].FirstName, people[j].LastName}, "")
		return personI < personJ
	})

	mappedPeople := conv.MapArrayOfPointer(people, func(person database.Person) models.PersonSummaryDTO {
		return models.PersonSummaryDTO{
			FirstName: person.FirstName,
			ID:        *conv.UUIDToStrmFmtUUID(person.ID),
			LastName:  person.LastName,
		}
	})

	return &operations.GetPersonnelAssignableOK{
		Payload: &models.ArrayOfPersonSummaryDTO{
			People: mappedPeople,
		},
	}
})
