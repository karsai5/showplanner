package availabilities_mailbox

import (
	"encoding/json"
	"fmt"
	"log/slog"
	"strings"

	"github.com/ThreeDotsLabs/watermill/message"
	"showplanner.io/pkg/config"
	"showplanner.io/pkg/conv"
	"showplanner.io/pkg/database"
	"showplanner.io/pkg/helpers"
	"showplanner.io/pkg/logger"
	"showplanner.io/pkg/notifications"
	"showplanner.io/pkg/permissions"
	"showplanner.io/pkg/postoffice/letters"
)

var cachedLetters []letters.UpdatedAvailabilityLetter

func handleEmailNotification(msg *message.Message) (err error) {
	defer func() {
		if err != nil {
			slog.Error(fmt.Sprintf("Error: %s", err.Error()))
			err = fmt.Errorf("While sending email: %w", err)
		}
	}()

	letter := letters.UpdatedAvailabilityLetter{}

	err = json.Unmarshal(msg.Payload, &letter)
	if err != nil {
		return err
	}

	cachedLetters = append(cachedLetters, letter)

	debounced(sendEmailNotificationOfAvailabilities)

	return nil
}

func sendEmailNotificationOfAvailabilities() {
	shows := make(map[uint]database.Show)
	groupedNames := make(map[uint][]string)
	for _, l := range cachedLetters {
		event, err := database.GetEventWithShow(l.EventId)
		if err != nil {
			logger.Error("While sending email notification", err)
			return
		}

		person, err := database.GetPerson(l.UserId)
		if err != nil {
			logger.Error("While sending email notification", err)
			return
		}

		shows[event.Show.ID] = event.Show
		groupedNames[event.Show.ID] = helpers.RemoveDuplicate(append(groupedNames[event.Show.ID], fmt.Sprintf("%s %s", person.FirstName, person.LastName)))
	}

	for _, show := range shows {
		emails, err := getManagerEmailsForShow(show.ID)
		if err != nil {
			logger.Error("While sending email notification", err)
			return
		}

		sendEmailForShow(show, groupedNames[show.ID], emails)
	}
	cachedLetters = []letters.UpdatedAvailabilityLetter{}
}

func sendEmailForShow(show database.Show, namesOfPeopleWithUpdates []string, emailsOfManagers []string) {

	namesList := ""
	for _, name := range namesOfPeopleWithUpdates {
		namesList = namesList + fmt.Sprintf(" - %s\n", name)
	}

	notifications.SendEmail(notifications.Email{
		ToEmail: strings.Join(emailsOfManagers, ", "),
		Subject: fmt.Sprintf("[%s] Availabilities updated", show.Name),
		Body: fmt.Sprintf(`The following people have changed their availabilites for %s:

%s

View availabilites at %s/shows/%s/availabilities`, show.Slug, namesList, config.FRONTEND_URL, show.Slug),
	})
}

func getManagerEmailsForShow(id uint) ([]string, error) {
	emails := []string{}
	users, err := permissions.GetUsersThatHavePermission(permissions.Rostering.Permission(conv.UintToString(&id)))
	if err != nil {
		return emails, err
	}
	for _, u := range users {
		emails = append(emails, u.Email)
	}
	return emails, nil
}
