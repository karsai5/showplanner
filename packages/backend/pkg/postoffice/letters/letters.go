package letters

import uuid "github.com/satori/go.uuid"

type BaseLetter struct {
	event string
}

type UpdatedAvailabilityLetter struct {
	BaseLetter
	UserId       uuid.UUID
	EventId      uint
	Availability bool
}

type UserFilledInProfileLetter struct {
	Email            string
	FirstName        string
	LastName         string
	HearAboutUs      string
	PreviousWork     string
	ReasonForCrewing string
}

type NewUserLetter struct {
	Email string
}

type UserAddedToShowLetter struct {
	Email    string
	ShowName string
	ShowSlug string
	ShowId   string
}
