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

type UpdatedAvailabilityEnrichedLetter struct {
	BaseLetter
	UserId        uuid.UUID
	Name          string
	ShowId        uint
	ShowName      string
	EventId       uint
	EventDateTime string
	Availability  bool
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
