package rostering

import (
	"errors"
	"fmt"

	uuid "github.com/satori/go.uuid"
	"gorm.io/gorm"
	"showplanner.io/pkg/conv"
	"showplanner.io/pkg/database"
	"showplanner.io/pkg/permissions"
	"showplanner.io/pkg/rostering/emails"
)

type invitation struct {
	show           database.Show
	invitingPerson database.Person
	invitedPerson  *database.Person
	email          *string
}

func (i invitation) IsValid() error {
	if i.invitedPerson == nil && i.email == nil {
		return fmt.Errorf("invitation must have either an invited person or an email")
	}
	if i.email != nil {
		_, err := database.GetPersonByEmail(*i.email)
		if err != nil && !errors.Is(err, gorm.ErrRecordNotFound) {
			return err
		}
		if err == nil {
			return fmt.Errorf("person with email %s already exists", *i.email)
		}
	}
	return nil
}

func (i invitation) getInvitedPersonId() *uuid.UUID {
	if i.invitedPerson != nil {
		return &i.invitedPerson.ID
	}
	return nil
}

func invitePersonToShow(i invitation) error {
	err := i.IsValid()
	if err != nil {
		return err
	}

	invitation, err := addInvitationToDatabase(i.show.ID, i.invitingPerson.ID, i.getInvitedPersonId(), i.email)
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
		Email:          invitation.GetEmail(),
		ShowName:       invitation.Show.Name,
		NameOfInviter:  invitation.CreatedBy.GetFullName(),
		IsExistingUser: invitation.PersonID != nil,
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

func addInvitationToDatabase(showId uint, createdBy uuid.UUID, personId *uuid.UUID, email *string) (database.Invitation, error) {
	db := database.GetDatabase()

	invitation := database.Invitation{
		ShowID:      showId,
		PersonID:    personId,
		Email:       email,
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
