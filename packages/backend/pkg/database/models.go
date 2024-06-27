package database

import (
	"fmt"
	"time"

	"showplanner.io/pkg/restapi/dtos"

	"github.com/go-openapi/strfmt"
	uuid "github.com/satori/go.uuid"
	"gorm.io/gorm"
	"showplanner.io/pkg/conv"
)

type EventOptions struct {
	Divider            bool
	AttendanceRequired bool
}

type Event struct {
	gorm.Model
	Start          time.Time
	End            *time.Time
	CurtainsUp     *time.Time
	ShowID         uint
	Show           Show
	Name           *string
	ShortNote      *string
	Address        *string
	Availabilities []Availability
	Assignments    []Assignment
	Shadows        []Shadow
	ShowReport     *ShowReport
	ShowTimer      *ShowTimer
	Options        EventOptions `gorm:"embedded;embeddedPrefix:options_"`
}

func (e *Event) GetCurtainsUp() *strfmt.DateTime {
	return conv.TimeToDateTime(e.CurtainsUp)
}

func (e *Event) SetName(name string) {
	e.Name = &name
}

func (e *Event) IsNameEmpty() bool {
	return e.Name == nil || *e.Name == ""
}

func (e *Event) GetCalculatedName() (string, error) {
	if e.Name != nil && *e.Name != "" {
		return *e.Name, nil
	}
	if e.CurtainsUp == nil {
		return "", nil
	}
	events, err := GetEventsWithCurtainsUp(e.ShowID)
	if err != nil {
		return "", err
	}
	for i, match := range events {
		if match.ID == e.ID {
			return fmt.Sprintf("Show %d", i+1), nil
		}
	}
	return "", nil
}

func (e *Event) MapToEventDTO() dtos.EventDTO {
	start := strfmt.DateTime(e.Start)

	dto := dtos.EventDTO{
		ID:        conv.UintToInt64(e.ID),
		ShowID:    int64(e.ShowID),
		Start:     &start,
		NameRaw:   e.Name,
		Name:      e.Name,
		Shortnote: e.ShortNote,
		Address:   e.Address,
		Options: &dtos.EventOptionsDTO{
			Divider:            conv.Pointer(e.Options.Divider),
			AttendanceRequired: conv.Pointer(e.Options.AttendanceRequired),
		},
	}

	if e.CurtainsUp != nil {
		dto.CurtainsUp = conv.TimeToDateTime(e.CurtainsUp)
	}

	if e.End != nil {
		dto.End = conv.TimeToDateTime(e.End)
	}

	if e.ShowReport != nil {
		dto.ShowReport = conv.UUIDToStrmFmtUUID(e.ShowReport.ID)
	}

	if e.ShowTimer != nil {
		dto.ShowTimer = conv.UUIDToStrmFmtUUID(e.ShowTimer.ID)
	}

	return dto
}

type Show struct {
	gorm.Model
	Name    string
	Company string
	Slug    string `gorm:"unique"`
	Events  []Event
	Roles   []Role
	People  []Person `gorm:"many2many:show_people;"`
	ImageID *uint
	Image   *Media
}

func (show *Show) MapToDTO() dtos.ShowDTO {
	mappedShow := dtos.ShowDTO{
		ID:      conv.UintToInt64(show.ID),
		Name:    &show.Name,
		Slug:    &show.Slug,
		Company: &show.Company,
		Start:   nil,
		End:     nil,
	}

	if len(show.Events) > 0 {
		start := show.Events[0].Start
		end := show.Events[0].Start
		for _, e := range show.Events {
			if e.Start.Before(start) {
				start = e.Start
			}
			if e.Start.After(end) {
				end = e.Start
			}
		}
		mappedShow.Start = conv.TimeToDateTime(&start)
		mappedShow.End = conv.TimeToDateTime(&end)
	}

	if show.Image != nil {
		mappedShow.Image = conv.Pointer(show.Image.MapToDTO())
	}

	return mappedShow
}

func (show *Show) MapToSummaryDTO() dtos.ShowSummaryDTO {
	return dtos.ShowSummaryDTO{
		ID:      conv.UintToInt64(show.ID),
		Name:    &show.Name,
		Slug:    &show.Slug,
		Company: &show.Company,
	}
}

type Availability struct {
	gorm.Model
	PersonID  uuid.UUID
	EventID   uint
	Available bool
}

type Assignment struct {
	gorm.Model
	PersonID uuid.UUID
	EventID  uint
	RoleID   uint
	Event    Event
	Person   Person
	Role     Role
}

type Shadow struct {
	gorm.Model
	PersonID uuid.UUID
	EventID  uint
	RoleID   uint
	Event    Event
	Person   Person
	Role     Role
}

type Person struct {
	ID        uuid.UUID `gorm:"type:uuid;primary_key;"`
	CreatedAt time.Time
	UpdatedAt time.Time
	DeletedAt *time.Time `gorm:"index"`

	Pronoun               *string
	FirstName             string
	LastName              string
	PreferredName         *string
	Email                 string
	Phone                 string
	WWC                   *string
	DOB                   string
	Allergies             string
	EmergencyPhone        string
	EmergencyName         string
	EmergencyRelationship string
	HearAboutUs           *string
	PreviousWork          *string
	ReasonForCrewing      *string

	Shows []Show `gorm:"many2many:show_people;"`
}

func (p *Person) GetFirstName() string {
	if p.PreferredName != nil && *p.PreferredName != "" {
		return *p.PreferredName
	}
	return p.FirstName
}

func (p *Person) GetFullName() string {
	return fmt.Sprintf("%s %s", p.GetFirstName(), p.LastName)
}

func (p *Person) MapToPersonSummaryDTO() dtos.PersonSummaryDTO {
	dto := dtos.PersonSummaryDTO{
		FirstName: &p.FirstName,
		ID:        conv.UUIDToStrmFmtUUID(p.ID),
		LastName:  &p.LastName,
		Private:   nil,
	}
	if p.PreferredName != nil {
		dto.PreferredName = *p.PreferredName
	}
	return dto
}

type ShowTimer struct {
	ID        uuid.UUID `gorm:"type:uuid;primary_key;"`
	CreatedAt time.Time
	UpdatedAt time.Time
	DeletedAt *time.Time `gorm:"index"`

	ExpectedCurtainsUp *time.Time

	ShowStart     *time.Time
	ShowEnd       *time.Time
	IntervalStart *time.Time
	IntervalEnd   *time.Time

	HouseOpen          *time.Time
	ActOneFOHClearance *time.Time
	ActTwoFOHClearance *time.Time

	// linked event
	EventID *uint
	Event   *Event

	// linked person
	CreatedById uuid.UUID
	CreatedBy   Person
}

func (st *ShowTimer) MapToSummaryDTO() dtos.ShowTimerSummaryDTO {
	return dtos.ShowTimerSummaryDTO{
		ID:        *conv.UUIDToStrmFmtUUID(st.ID),
		ShowStart: conv.TimeToDateTime(st.ShowStart),
		ShowEnd:   conv.TimeToDateTime(st.ShowEnd),
	}
}

func (st *ShowTimer) MapToDTO() dtos.ShowTimerDTO {
	dto := dtos.ShowTimerDTO{
		ID: *conv.UUIDToStrmFmtUUID(st.ID),
		UpdateShowTimerDTO: dtos.UpdateShowTimerDTO{
			ActOneFOHClearance: mapTimeIfExists(st.ActOneFOHClearance),
			ActTwoFOHClearance: mapTimeIfExists(st.ActTwoFOHClearance),
			HouseOpen:          mapTimeIfExists(st.HouseOpen),
			IntervalEnd:        mapTimeIfExists(st.IntervalEnd),
			IntervalStart:      mapTimeIfExists(st.IntervalStart),
			ShowEnd:            mapTimeIfExists(st.ShowEnd),
			ShowStart:          mapTimeIfExists(st.ShowStart),
			ExpectedCurtainsUp: mapTimeIfExists(st.ExpectedCurtainsUp),
		},
	}
	if st.EventID != nil {
		dto.EventID = conv.UintToInt64(*st.EventID)
	}
	return dto
}

type ShowReport struct {
	ID        uuid.UUID `gorm:"type:uuid;primary_key"`
	CreatedAt time.Time
	UpdatedAt time.Time
	DeletedAt *time.Time `gorm:"index"`

	Title    string
	Subtitle string

	ShowStart     *time.Time
	ShowEnd       *time.Time
	IntervalStart *time.Time
	IntervalEnd   *time.Time

	HouseOpen          *time.Time
	ActOneFOHClearance *time.Time
	ActTwoFOHClearance *time.Time

	Notes string

	// linked event
	EventID *uint
	Event   *Event

	// linked person
	CreatedById uuid.UUID
	CreatedBy   Person
}

func (sr *ShowReport) MapToSummaryDTO() dtos.ShowReportSummaryDTO {
	sr.GenerateDetailsFromEvent()
	return dtos.ShowReportSummaryDTO{
		LastUpdated: strfmt.DateTime(sr.UpdatedAt),
		ID:          *conv.UUIDToStrmFmtUUID(sr.ID),
		Title:       sr.Title,
	}
}

func (sr *ShowReport) MapToDTO() dtos.ShowReportDTO {
	sr.GenerateDetailsFromEvent()
	dto := dtos.ShowReportDTO{
		ID: *conv.UUIDToStrmFmtUUID(sr.ID),
		UpdateShowreportDTO: dtos.UpdateShowreportDTO{
			ActOneFOHClearance: mapTimeIfExists(sr.ActOneFOHClearance),
			ActTwoFOHClearance: mapTimeIfExists(sr.ActTwoFOHClearance),
			HouseOpen:          mapTimeIfExists(sr.HouseOpen),
			IntervalEnd:        mapTimeIfExists(sr.IntervalEnd),
			IntervalStart:      mapTimeIfExists(sr.IntervalStart),
			Notes:              &sr.Notes,
			ShowEnd:            mapTimeIfExists(sr.ShowEnd),
			ShowStart:          mapTimeIfExists(sr.ShowStart),
			Subtitle:           conv.Pointer(sr.Subtitle),
			Title:              conv.Pointer(sr.Title),
		},
	}
	if sr.EventID != nil {
		dto.EventID = conv.UintToInt64(*sr.EventID)
	}
	return dto
}

type Role struct {
	gorm.Model
	ShowID   uint
	Show     Show
	PersonID *uuid.UUID
	Person   *Person
	Name     string
}

type Media struct {
	gorm.Model
	Key string `gorm:"unique"`
}

func (e *Media) GetUrl() string {
	return ""
}

func (media *Media) MapToDTO() dtos.MediaDTO {
	return dtos.MediaDTO{
		ID:  conv.UintToInt64(media.ID),
		Key: &media.Key,
		URL: conv.Pointer(media.GetUrl()),
	}
}

// An invitation to a person to join a show.
// If the person already exists in the system, the PersonID will be set.
// If the person does not exist, the email will be set.
type Invitation struct {
	gorm.Model

	ShowID uint
	Show   Show

	PersonID *uuid.UUID
	Person   *Person
	Email    *string
}

func (i *Invitation) MapToInvitationDTO() dtos.InvitationDTO {
	dto := dtos.InvitationDTO{
		ID: int64(i.ID),
	}

	if i.PersonID != nil {
		dto.Person = conv.Pointer(i.Person.MapToPersonSummaryDTO())
	}

	return dto
}

func mapTimeIfExists(t *time.Time) *strfmt.DateTime {
	if t == nil {
		return nil
	}
	return (*strfmt.DateTime)(t)
}
func mapStrfmtTimeIfExists(t *strfmt.DateTime) *time.Time {
	if t == nil {
		return nil
	}
	return (*time.Time)(t)
}
