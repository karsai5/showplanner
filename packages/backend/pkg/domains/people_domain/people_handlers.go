package people_domain

import (
	"errors"
	"net/http"

	"github.com/go-openapi/runtime"
	"github.com/go-openapi/runtime/middleware"
	uuid "github.com/satori/go.uuid"
	"gorm.io/gorm"
	"showplanner.io/pkg/database"
	"showplanner.io/pkg/logger"
	"showplanner.io/pkg/models"
	"showplanner.io/pkg/permissions"
	"showplanner.io/pkg/postoffice"
	"showplanner.io/pkg/postoffice/letters"
	"showplanner.io/pkg/postoffice/topics"
	"showplanner.io/pkg/restapi/operations"
)

func SetupHandlers(api *operations.GoBackendAPI) {
	api.PostMeHandler = operations.PostMeHandlerFunc(func(params operations.PostMeParams) middleware.Responder {
		userId, err := permissions.GetUserId(params.HTTPRequest)

		if err != nil {
			logger.Error("Could not update me details", err)
			return &operations.GetMeInternalServerError{}
		}

		user, err := permissions.GetUserById(userId)

		if err != nil {
			logger.Error("Could not update me details", err)
			return &operations.GetMeInternalServerError{}
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
			return &operations.PostMeInternalServerError{}
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

		return &operations.PostMeOK{}
	})

	api.GetMeHandler = operations.GetMeHandlerFunc(func(params operations.GetMeParams) middleware.Responder {
		userId, err := permissions.GetUserId(params.HTTPRequest)
		if err != nil {
			logger.Error("Could not get me detaisl", err)
			return &operations.GetMeInternalServerError{}
		}

		person, err := database.GetPerson(userId)

		if err != nil {
			if errors.Is(err, gorm.ErrRecordNotFound) {
				return &operations.GetMeNotFound{}
			}
			logger.Error("Could not get me details", err)
			return &operations.GetMeInternalServerError{}
		}

		return &operations.GetMeOK{
			Payload: &models.MeDetailsDTO{
				FirstName: person.FirstName,
				Email:     person.Email,
			},
		}
	})

	api.GetPublicCalendarIDHandler = operations.GetPublicCalendarIDHandlerFunc(func(params operations.GetPublicCalendarIDParams) middleware.Responder {
		userId, err := uuid.FromString(params.ID)
		if err != nil {
			logger.Error("Error getting calendar", err)
			return &operations.GetMeInternalServerError{}
		}

		calendarString, err := createCalendarForPerson(userId)

		if err != nil && errors.Is(err, gorm.ErrRecordNotFound) {
			return &operations.GetPublicCalendarIDNotFound{}
		}
		if err != nil {
			logger.Error("Error getting calendar", err)
			return &operations.GetPublicCalendarIDInternalServerError{}
		}

		return middleware.ResponderFunc(func(w http.ResponseWriter, p runtime.Producer) {
			w.Write([]byte(calendarString))
		})
	})
}
