package rostering

import (
	"fmt"

	uuid "github.com/satori/go.uuid"
	"showplanner.io/pkg/conv"
	"showplanner.io/pkg/database"
	"showplanner.io/pkg/permissions"
	"showplanner.io/pkg/rostering/emails"
)

func invitePersonToShow(person database.Person, show database.Show, invitingPerson database.Person) error {
	invitation, err := addInvitationToDatabase(show.ID, person.ID, invitingPerson.ID)
	if err != nil {
		return err
	}

	err = sendInvitationEmail(invitation.ID)
	return err
}

func sendInvitationEmail(invitationId uuid.UUID) error {
	invitation, err := getInvitation(invitationId)
	if err != nil {
		return err
	}

	err = emails.SendInvitationEmail(emails.InvitationEmail{
		Email:         invitation.Person.Email,
		ShowName:      invitation.Show.Name,
		NameOfInviter: invitation.CreatedBy.GetFullName(),
	})

	return err
}

// Adds a person to a show and deletes the invitation
func acceptInvitation(invitationId uuid.UUID) error {
	db := database.GetDatabase()
	invitation := database.Invitation{}
	res := db.First(&invitation, invitationId)

	if res.Error != nil || invitation.PersonID == nil {
		return res.Error
	}

	err := AddPersonToShow(int64(invitation.ShowID), *invitation.PersonID)

	if err != nil {
		return err
	}

	db.Delete(&invitation)

	return nil
}

func deleteInvitation(invitationId uuid.UUID) error {
	db := database.GetDatabase()
	invitation := database.Invitation{}
	res := db.First(&invitation, invitationId)

	if res.Error != nil {
		return res.Error
	}

	db.Delete(&invitation)

	return nil
}

func addInvitationToDatabase(showId uint, userId uuid.UUID, createdBy uuid.UUID) (database.Invitation, error) {
	db := database.GetDatabase()

	invitation := database.Invitation{
		ShowID:      showId,
		PersonID:    &userId,
		CreatedByID: createdBy,
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
	res := db.Preload("Person").Preload("Show").Where("person_id = ?", personId).Find(&invitations)

	return invitations, res.Error
}

func getInvitation(invitationId uuid.UUID) (database.Invitation, error) {
	db := database.GetDatabase()

	invitation := database.Invitation{}
	res := db.Preload("Person").Preload("Show").Preload("CreatedBy").First(&invitation, invitationId)

	return invitation, res.Error
}

func AddPersonToShow(showId int64, userId uuid.UUID) (err error) {
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

	emails.SendWelcomeToShowEmail(emails.WelcomeToShowEmail{
		Email:    user.Email,
		ShowName: show.Name,
		ShowSlug: show.Slug,
		ShowId:   conv.UintToString(&show.ID),
	})
	return nil
}
