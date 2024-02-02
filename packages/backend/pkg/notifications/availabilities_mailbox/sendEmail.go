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
		groupedUpdates[l.ShowId] = helpers.RemoveDuplicate(append(groupedUpdates[l.ShowId], fmt.Sprintf(" - %s", l.Name)))
		showNames[l.ShowId] = l.ShowName
	}

	emailBodies := make(map[uint]string)
	for id, name := range showNames {
		emailBodies[id] = fmt.Sprintf("The following people have changed their availabilities for %s: \n\n%s", name, strings.Join(groupedUpdates[id], "\n"))
	}

	showToMangersEmails := make(map[uint][]string)
	for id := range showNames {
		users, err := permissions.GetUsersThatHavePermission(permissions.Rostering.Permission(convert.UintToString(&id)))
		if err != nil {
			slog.Error("Couldn't get users with permission")
			return
		}
		for _, u := range users {
			showToMangersEmails[id] = append(showToMangersEmails[id], u.Email)
		}
	}

	for showId, emails := range showToMangersEmails {
		notifications.SendEmail(notifications.Email{
			ToEmail: strings.Join(emails, ", "),
			Subject: fmt.Sprintf("[%s] Availabilities updated", showNames[showId]),
			Body:    emailBodies[showId],
		})
	}

	cachedLetters = []letters.UpdatedAvailabilityEnrichedLetter{}
}
