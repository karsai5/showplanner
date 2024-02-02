package availabilities_mailbox

import (
	"encoding/json"
	"fmt"
	"log/slog"
	"strings"

	"github.com/ThreeDotsLabs/watermill/message"
	"showplanner.io/pkg/convert"
	"showplanner.io/pkg/helpers"
	"showplanner.io/pkg/notifications"
	"showplanner.io/pkg/permissions"
	"showplanner.io/pkg/postoffice/letters"
)

var cachedLetters []letters.UpdatedAvailabilityEnrichedLetter

func handleEmailNotification(msg *message.Message) (err error) {
	defer func() {
		if err != nil {
			slog.Error(fmt.Sprintf("Error: %s", err.Error()))
			err = fmt.Errorf("While sending email: %w", err)
		}
	}()

	letter := letters.UpdatedAvailabilityEnrichedLetter{}

	err = json.Unmarshal(msg.Payload, &letter)
	if err != nil {
		return err
	}

	cachedLetters = append(cachedLetters, letter)

	debounced(sendEmailNotificationOfAvailabilities)

	return nil
}

func sendEmailNotificationOfAvailabilities() {
	groupedUpdates := make(map[uint][]string)
	showNames := make(map[uint]string)
	for _, l := range cachedLetters {
		groupedUpdates[l.ShowId] = helpers.RemoveDuplicate(append(groupedUpdates[l.ShowId], l.Name))
		showNames[l.ShowId] = l.ShowName
	}

	emailBodies := make(map[uint]string)
	for id, name := range showNames {
		emailBodies[id] = fmt.Sprintf("%s\nUpdated by the following people: %s\n", name, strings.Join(groupedUpdates[id], ", "))
	}

	peopleToEmail := make(map[string][]uint)
	for id, _ := range showNames {
		users, err := permissions.GetUsersThatHavePermission(permissions.Rostering.Permission(convert.UintToString(&id)))
		if err != nil {
			slog.Error("Couldn't get users with permission")
			return
		}
		for _, u := range users {
			peopleToEmail[u.Email] = append(peopleToEmail[u.Email], id)
		}
	}

	for email, shows := range peopleToEmail {
		body := "The following shows have had their availabilities updated\n\n"
		for _, showId := range shows {
			body = body + emailBodies[showId]
		}
		notifications.SendEmail(notifications.Email{
			ToEmail: email,
			Subject: "Availabilities Updated",
			Body:    body,
		})
	}
	cachedLetters = []letters.UpdatedAvailabilityEnrichedLetter{}
}
