package rostering

import (
	uuid "github.com/satori/go.uuid"
	"showplanner.io/pkg/database"
)

func inviteExistingUserToShow(showId uint, userId uuid.UUID) error {
	invitation, err := addInvitationToDatabase(showId, userId)
	if err != nil {
		return err
	}
	// TODO: Send email
	err = acceptInvitation(invitation.ID) // TODO: Remove when logic is added for user to accept invitation
	return err
}

// Adds a person to a show and deletes the invitation
func acceptInvitation(invitationId uint) error {
	db := database.GetDatabase()
	invitation := database.Invitation{}
	res := db.First(&invitation, invitationId)

	if res.Error != nil || invitation.PersonID == nil {
		return res.Error
	}

	err := addToShow(int64(invitation.ShowID), *invitation.PersonID)

	if err != nil {
		return err
	}

	db.Delete(&invitation)

	return nil
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

func getInvitationsForShow(showId uint) ([]database.Invitation, error) {
	db := database.GetDatabase()

	var invitations []database.Invitation
	res := db.Preload("Person").Where("show_id = ?", showId).Find(&invitations)

	return invitations, res.Error
}

func getInvitationsForPerson(personId uuid.UUID) ([]database.Invitation, error) {
	db := database.GetDatabase()

	var invitations []database.Invitation
	res := db.Where("person_id = ?", personId).Find(&invitations)

	return invitations, res.Error
}
