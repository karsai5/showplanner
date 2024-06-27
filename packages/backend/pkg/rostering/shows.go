package rostering

import (
	"fmt"

	uuid "github.com/satori/go.uuid"
	"showplanner.io/pkg/conv"
	"showplanner.io/pkg/database"
	"showplanner.io/pkg/permissions"
	"showplanner.io/pkg/postoffice"
	"showplanner.io/pkg/postoffice/letters"
	"showplanner.io/pkg/postoffice/topics"
)

func addToShow(showId int64, userId uuid.UUID) (err error) {
	defer func() {
		if err != nil {
			err = fmt.Errorf("while adding person to show: %w", err)
		}
	}()

	user, err := permissions.GetUserById(userId)
	if err != nil {
		return err
	}

	show, err := database.GetShowById(showId)
	if err != nil {
		return err
	}

	database.AddPersonToShow(show.ID, userId)

	err = permissions.GiveRole(permissions.ShowMember.Key(fmt.Sprint(showId)), userId)
	if err != nil {
		return err
	}

	postoffice.PublishLetter(topics.UserAddedToShow, letters.UserAddedToShowLetter{
		Email:    user.Email,
		ShowName: show.Name,
		ShowSlug: show.Slug,
		ShowId:   conv.UintToString(&show.ID),
	})
	return nil
}
