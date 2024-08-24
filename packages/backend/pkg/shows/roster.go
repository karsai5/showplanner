package shows

import (
	"fmt"

	"showplanner.io/pkg/database"
	"showplanner.io/pkg/shows/emails"
)

func sendEmailNotifyingThatRosterHasBeenReleased(db database.IDatabase, showId uint) (err error) {
	defer func() {
		if err != nil {
			err = fmt.Errorf("while sending email notifying that roster was released: %w", err)
		}
	}()

	show, err := db.GetShowById(showId)

	assignedPeople, err := db.GetPeopleAssignedToShow(showId)
	if err != nil {
		return err
	}

	for _, p := range assignedPeople {
		emails.SendRosterReleasedEmail(emails.RosterReleasedEmail{
			Email:    p.Email,
			ShowName: show.Name,
			ShowSlug: show.Slug,
		})
	}

	return nil
}
