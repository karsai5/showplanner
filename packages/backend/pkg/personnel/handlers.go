package personnel

import (
	"errors"
	"fmt"
	"net/http"

	"github.com/go-openapi/runtime"
	"github.com/go-openapi/runtime/middleware"
	uuid "github.com/satori/go.uuid"
	"github.com/supertokens/supertokens-golang/recipe/session"
	"gorm.io/gorm"
	"showplanner.io/pkg/conv"
	"showplanner.io/pkg/database"
	"showplanner.io/pkg/logger"
	"showplanner.io/pkg/models"
	"showplanner.io/pkg/permissions"
	"showplanner.io/pkg/postoffice"
	"showplanner.io/pkg/postoffice/letters"
	"showplanner.io/pkg/postoffice/topics"
	"showplanner.io/pkg/restapi/operations"
	"showplanner.io/pkg/restapi/operations/personnel"
)

func SetupHandlers(api *operations.GoBackendAPI) {
	api.PersonnelGetPersonnelPeopleHandler = handleGetAllPeople
	api.PersonnelPostPersonnelPeoplePersonIDImpersonateHandler = handleImpersonate
	api.PersonnelPostMeHandler = postMeHandler
	api.PersonnelGetMeHandler = getMeHandler
}

var handleGetAllPeople = personnel.GetPersonnelPeopleHandlerFunc(func(params personnel.GetPersonnelPeopleParams) middleware.Responder {
	logError := logger.CreateLogErrorFunc("Getting all personnel", &personnel.GetPersonnelPeopleInternalServerError{})

	hasPerm, err := permissions.HasRole(params.HTTPRequest, "admin")

	if err != nil {
		return logError(&err)
	}
	if !hasPerm {
		return &personnel.GetPersonnelPeopleUnauthorized{}
	}

	people, err := database.GetAllPeople()

	if err != nil {
		return logError(&err)
	}
	return &personnel.GetPersonnelPeopleOK{
		Payload: &models.ArrayOfPersonSummaryDTO{
			People: conv.MapArrayOfPointer(people, func(p database.Person) models.PersonSummaryDTO {
				dto := p.MapToPersonSummaryDTO()
				dto.Private = &models.PersonSummaryDTOPrivate{
					Email: p.Email,
				}
				return dto
			}),
		},
	}
})

var handleImpersonate = personnel.PostPersonnelPeoplePersonIDImpersonateHandlerFunc(func(params personnel.PostPersonnelPeoplePersonIDImpersonateParams) middleware.Responder {
	logErr := logger.CreateLogErrorFunc("impersonating", &personnel.PostPersonnelPeoplePersonIDImpersonateInternalServerError{})
	userId, err := uuid.FromString(params.PersonID)
	if err != nil {
		return logErr(&err)
	}
	user, err := permissions.GetUserById(userId)
	if err != nil {
		return logErr(&err)
	}
	if user == nil {
		return logErr(conv.Pointer(fmt.Errorf("person does not exist")))
	}

	return middleware.ResponderFunc(func(w http.ResponseWriter, p runtime.Producer) {
		_, err = session.CreateNewSession(params.HTTPRequest, w, "public", user.ID, map[string]interface{}{
			"isImpersonation": true,
		}, nil)
	})
})

var postMeHandler = personnel.PostMeHandlerFunc(func(params personnel.PostMeParams) middleware.Responder {
	userId, err := permissions.GetUserId(params.HTTPRequest)

	if err != nil {
		logger.Error("Could not update me details", err)
		return &personnel.GetMeInternalServerError{}
	}

	user, err := permissions.GetUserById(userId)

	if err != nil {
		logger.Error("Could not update me details", err)
		return &personnel.GetMeInternalServerError{}
	}

	p := params.PersonalDetails

	person := database.Person{
		ID:                    userId,
		Pronoun:               p.Pronoun,
		FirstName:             *p.FirstName,
		LastName:              *p.LastName,
		PreferredName:         p.PreferredName,
		Email:                 user.Email,
		Phone:                 *p.Phone,
		WWC:                   p.Wwc,
		DOB:                   *p.Dob,
		Allergies:             *p.Allergies,
		EmergencyPhone:        *p.EmergencyPhone,
		EmergencyName:         *p.EmergencyName,
		EmergencyRelationship: *p.EmergencyRelationship,
		HearAboutUs:           p.HearAboutUs,
		PreviousWork:          p.PreviousWork,
		ReasonForCrewing:      p.ReasonForCrewing,
	}

	_, getPersonError := database.GetPerson(userId)
	_, err = database.UpdatePerson(person)

	if err != nil {
		logger.Error("Could not update me details", err)
		return &personnel.PostMeInternalServerError{}
	}

	if getPersonError != nil && errors.Is(getPersonError, gorm.ErrRecordNotFound) {

		user, err := permissions.GetUserById(userId)
		if err != nil {
			logger.Error("Could not send admin new user notification", err)
		}

		postoffice.PublishLetter(topics.UserFilledInProfile, letters.UserFilledInProfileLetter{
			Email:            user.Email,
			FirstName:        person.FirstName,
			LastName:         person.LastName,
			HearAboutUs:      *person.HearAboutUs,
			PreviousWork:     *person.PreviousWork,
			ReasonForCrewing: *person.ReasonForCrewing,
		})
	}

	return &personnel.PostMeOK{}
})

var getMeHandler = personnel.GetMeHandlerFunc(func(params personnel.GetMeParams) middleware.Responder {
	userId, err := permissions.GetUserId(params.HTTPRequest)
	if err != nil {
		logger.Error("Could not get me detaisl", err)
		return &personnel.GetMeInternalServerError{}
	}

	person, err := database.GetPerson(userId)

	if err != nil {
		if errors.Is(err, gorm.ErrRecordNotFound) {
			return &personnel.GetMeNotFound{}
		}
		logger.Error("Could not get me details", err)
		return &personnel.GetMeInternalServerError{}
	}

	return &personnel.GetMeOK{
		Payload: &models.MeDetailsDTO{
			FirstName: person.FirstName,
			Email:     person.Email,
		},
	}
})