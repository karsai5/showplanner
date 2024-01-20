package people

import (
	"fmt"
	"log/slog"

	"github.com/go-openapi/runtime/middleware"
	uuid "github.com/satori/go.uuid"
	"showplanner.io/pkg/database"
	"showplanner.io/pkg/models"
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

		_, err = database.UpdatePerson(person)

		if err != nil {
			slog.Error(fmt.Errorf("Error updating personal details: %w", err).Error())
			return &operations.PostMeInternalServerError{}
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
}
