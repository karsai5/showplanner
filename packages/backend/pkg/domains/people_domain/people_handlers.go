package people_domain

import (
	"errors"
	"fmt"
	"log/slog"
	"net/http"

	"github.com/go-openapi/runtime"
	"github.com/go-openapi/runtime/middleware"
	uuid "github.com/satori/go.uuid"
	"gorm.io/gorm"
	"showplanner.io/pkg/database"
	"showplanner.io/pkg/domains/users_domain"
	"showplanner.io/pkg/models"
	"showplanner.io/pkg/notifications"
	"showplanner.io/pkg/permissions"
	"showplanner.io/pkg/restapi/operations"
)

func SetupHandlers(api *operations.GoBackendAPI) {
	api.PostMeHandler = operations.PostMeHandlerFunc(func(params operations.PostMeParams) middleware.Responder {
		userId := permissions.UserId(params.HTTPRequest)
		uuid, err := uuid.FromString(userId)

		if err != nil {
			slog.Error(fmt.Errorf("Error updating personal details: %w", err).Error())
			return &operations.PostMeInternalServerError{}
		}

		p := params.PersonalDetails

		person := database.Person{
			ID:                    uuid,
			Pronoun:               p.Pronoun,
			FirstName:             *p.FirstName,
			LastName:              *p.LastName,
			Email:                 *p.Email,
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

		_, getPersonError := database.GetPerson(uuid)
		_, err = database.UpdatePerson(person)

		if err != nil {
			slog.Error(fmt.Errorf("Error updating personal details: %w", err).Error())
			return &operations.PostMeInternalServerError{}
		}

		if getPersonError != nil && errors.Is(getPersonError, gorm.ErrRecordNotFound) {

			user, err := users_domain.GetUserById(userId)
			if err != nil {
				slog.Error(fmt.Errorf("While sending new admin user notification: %w", err).Error())
			}

			notifications.SendAdminNewUserEmailNotification(notifications.AdminNewUserEmailNotification{
				Email:            user.Email,
				FirstName:        person.FirstName,
				LastName:         person.LastName,
				HearAboutUs:      person.HearAboutUs,
				PreviousWork:     person.PreviousWork,
				ReasonForCrewing: person.ReasonForCrewing,
			})
		}

		return &operations.PostMeOK{}
	})

	api.GetMeHandler = operations.GetMeHandlerFunc(func(params operations.GetMeParams) middleware.Responder {
		userId := permissions.UserId(params.HTTPRequest)
		uuid, err := uuid.FromString(userId)

		if err != nil {
			slog.Error(fmt.Errorf("Error getting me details: %w", err).Error())
			return &operations.GetMeInternalServerError{}
		}

		person, err := database.GetPerson(uuid)

		if err != nil {
			if errors.Is(err, gorm.ErrRecordNotFound) {
				return &operations.GetMeNotFound{}
			}
			slog.Error(fmt.Errorf("Error getting me details: %w", err).Error())
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
		userId := params.ID
		id, err := uuid.FromString(userId)

		if err != nil {
			slog.Error(fmt.Errorf("Error getting calendar: %w", err).Error())
			return &operations.GetMeInternalServerError{}
		}

		calendarString, err := createCalendarForPerson(id)

		if err != nil {
			slog.Error(fmt.Errorf("Error getting calendar: %w", err).Error())
			return &operations.GetMeInternalServerError{}
		}

		return middleware.ResponderFunc(func(w http.ResponseWriter, p runtime.Producer) {
			w.Write([]byte(calendarString))
		})
	})
}
