package people_domain

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

var handleAddPersonToShow = operations.PostPersonnelAssignHandlerFunc(func(params operations.PostPersonnelAssignParams) middleware.Responder {
	hasPerm, err := permissions.AddPersonnel.HasPermission(uint(params.ShowID), params.HTTPRequest)
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

var handleAssignablePersonnelGoogle = operations.GetPersonnelAssignedGoogleContactsCSVHandlerFunc(func(params operations.GetPersonnelAssignedGoogleContactsCSVParams) middleware.Responder {
	logError := logger.CreateLogErrorFunc("Getting people assigned to show as google csv", &operations.GetPersonnelAssignedGoogleContactsCSVInternalServerError{})

	hasPermViewPersonnel, err := permissions.ViewPersonnel.HasPermission(uint(params.ShowID), params.HTTPRequest)
	if err != nil {
		return logError(&err)
	}
	hasPermViewPrivateInfo, err := permissions.ViewPrivatePersonnelDetails.HasPermission(uint(params.ShowID), params.HTTPRequest)
	if err != nil {
		return logError(&err)
	}

	if !hasPermViewPersonnel || !hasPermViewPrivateInfo {
		return &operations.GetPersonnelAssignedUnauthorized{}
	}

	people, err := database.GetPeopleAssignedToShow(uint(params.ShowID))
	if err != nil {
		return logError(&err)
	}

	show, err := database.GetShowById(params.ShowID)
	if err != nil {
		return logError(&err)
	}

	csvString, err := getGoogleCSV(people, show.Name)
	if err != nil {
		return logError(&err)
	}

	return &operations.GetPersonnelAssignedGoogleContactsCSVOK{
		Payload: csvString,
	}
})

var handleAssignedPersonnel = operations.GetPersonnelAssignedHandlerFunc(func(params operations.GetPersonnelAssignedParams) middleware.Responder {
	logError := logger.CreateLogErrorFunc("Getting assigned people", &operations.GetPersonnelAssignedInternalServerError{})

	hasPerm, err := permissions.ViewPersonnel.HasPermission(uint(params.ShowID), params.HTTPRequest)
	if err != nil {
		return logError(&err)
	}
	if !hasPerm {
		return &operations.GetPersonnelAssignedUnauthorized{}
	}

	people, err := database.GetPeopleAssignedToShow(uint(params.ShowID))

	if err != nil {
		return logError(&err)
	}

	sort.Slice(people, func(i, j int) bool {
		personI := strings.ToLower(strings.Join([]string{people[i].FirstName, people[i].LastName}, ""))
		personJ := strings.ToLower(strings.Join([]string{people[j].FirstName, people[j].LastName}, ""))
		return personI < personJ
	})

	hasPerm, err = permissions.ViewPrivatePersonnelDetails.HasPermission(uint(params.ShowID), params.HTTPRequest)
	if err != nil {
		return logError(&err)
	}

	personMapper := MapToPersonSummaryDTO
	if hasPerm {
		personMapper = MapToPersonSummaryDTOWithPrivateInfo
	}

	return &operations.GetPersonnelAssignedOK{
		Payload: &models.ArrayOfPersonSummaryDTO{
			People: conv.MapArrayOfPointer(people, personMapper),
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

	return &operations.GetPersonnelAssignableOK{
		Payload: &models.ArrayOfPersonSummaryDTO{
			People: conv.MapArrayOfPointer(people, MapToPersonSummaryDTO),
		},
	}
})

var handleGetPersonnel = operations.GetPersonnelHandlerFunc(func(params operations.GetPersonnelParams) middleware.Responder {
	logError := logger.CreateLogErrorFunc("Getting all personnel", &operations.GetPersonnelInternalServerError{})

	hasPerm, err := permissions.HasRole(params.HTTPRequest, "admin")

	if err != nil {
		return logError(&err)
	}
	if !hasPerm {
		return &operations.GetPersonnelUnauthorized{}
	}

	people, err := database.GetAllPeople()

	if err != nil {
		return logError(&err)
	}
	return &operations.GetPersonnelOK{
		Payload: &models.ArrayOfPersonSummaryDTO{
			People: conv.MapArrayOfPointer(people, MapToPersonSummaryDTOWithEmail),
		},
	}
})
