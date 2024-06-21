package people_domain

import (
	uuid "github.com/satori/go.uuid"
	"showplanner.io/pkg/database"
)

func inviteExistingUserToShow(showId uint, userId uuid.UUID) error {
	_, err := addInvitationToDatabase(showId, userId)
	// TODO: Send email
	return err
}

func addInvitationToDatabase(showId uint, userId uuid.UUID) (database.Invitation, error) {
	db := database.GetDatabase()

	invitation := database.Invitation{
		ShowID:   showId,
		Show:     database.Show{},
		PersonID: &userId,
	}
	res := db.Create(&invitation)

	return invitation, res.Error
}
