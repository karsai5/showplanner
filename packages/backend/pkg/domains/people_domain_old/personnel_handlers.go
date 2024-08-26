package people_domain_old

import (
	"sort"
	"strings"

	"showplanner.io/pkg/restapi/dtos"

	"github.com/go-openapi/runtime/middleware"
	"showplanner.io/pkg/conv"
	"showplanner.io/pkg/database"
	"showplanner.io/pkg/logger"
	"showplanner.io/pkg/permissions"
	"showplanner.io/pkg/restapi/operations"
)

var handleAssignedPersonnel = operations.GetPersonnelAssignedHandlerFunc(func(params operations.GetPersonnelAssignedParams) middleware.Responder {
	logError := logger.CreateLogErrorFunc("Getting assigned people", &operations.GetPersonnelAssignedInternalServerError{})

	hasPerm, err := permissions.ViewPersonnel.HasPermission(&permissions.SupertokensPermissionsHandler{}, params.HTTPRequest, uint(params.ShowID))
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

	return &operations.GetPersonnelAssignedOK{
		Payload: conv.MapArrayOfPointer(people, func(p database.Person) dtos.PersonDTOWithEmail { return p.MapToPersonDTOWithEmail() }),
	}
})
