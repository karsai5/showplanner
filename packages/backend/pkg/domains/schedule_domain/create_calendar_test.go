package schedule_domain

import (
	"strings"
	"testing"
	"time"

	uuid "github.com/satori/go.uuid"
	"gorm.io/gorm"
	"showplanner.io/pkg/conv"
	"showplanner.io/pkg/database"
)

var mockShow = database.Show{
	Model: gorm.Model{
		ID: 0,
	},
	Name:    "Test show",
	Company: "Test company",
	Slug:    "test-slug",
}

type mockDatabaseShows struct {
	events []database.Event
}

// GetEventsWithAvailabilityAndAssignmentsForUser implements database.IDatabaseShows.
func (m *mockDatabaseShows) GetEventsWithAvailabilityAndAssignmentsForUser(showId uint, userId uuid.UUID) ([]database.Event, error) {
	return m.events, nil
}

// GetShowsForUser implements database.IDatabaseShows.
func (m *mockDatabaseShows) GetShowsForUser(id uuid.UUID) ([]database.Show, error) {
	return []database.Show{mockShow}, nil
}

func TestDividerEventsAreSkipped(t *testing.T) {
	startTime, _ := time.Parse("2006-01-02", "2021-01-01")
	ical := iCalendar{
		UserId: [16]byte{},
		Db: &mockDatabaseShows{
			events: []database.Event{
				{
					Start:      startTime,
					End:        &time.Time{},
					CurtainsUp: &time.Time{},
					ShowID:     mockShow.ID,
					Show:       mockShow,
					Options: database.EventOptions{
						Divider:            true,
						AttendanceRequired: false,
					},
				},
			},
		},
		HideEventsNotRequiredFor: false,
	}

	// Act
	result, err := ical.CreateCalendarForPerson()

	// Assert
	if err != nil {
		t.Errorf("Expected no error, got %v", err)
	}

	constainsEvent := strings.Contains(result, "BEGIN:VEVENT")

	if constainsEvent {
		t.Errorf("Expected to skip event, but found BEGIN:VEVENT")
	}
}

func TestUnattendingEventIsHiddenIfHideEventsIsTrue(t *testing.T) {
	personId := uuid.NewV4()
	startTime, _ := time.Parse("2006-01-02", "2021-01-01")
	ical := iCalendar{
		UserId: personId,
		Db: &mockDatabaseShows{
			events: []database.Event{
				{
					Start: startTime,
					Availabilities: []database.Availability{
						{
							PersonID:  personId,
							Available: false,
						},
					},
					Options: database.EventOptions{
						AttendanceRequired: true,
					},
				},
			},
		},
		HideEventsNotRequiredFor: true,
	}

	// Act
	result, err := ical.CreateCalendarForPerson()

	// Assert
	if err != nil {
		t.Errorf("Expected no error, got %v", err)
	}
	if strings.Contains(result, "BEGIN:VEVENT") {
		t.Errorf("Expected to skip event, but found BEGIN:VEVENT")
	}
}

func TestUnAttendingEventHasCorrectSummary(t *testing.T) {
	personId := uuid.NewV4()
	startTime, _ := time.Parse("2006-01-02", "2021-01-01")
	ical := iCalendar{
		UserId:                   personId,
		HideEventsNotRequiredFor: false,
		Db: &mockDatabaseShows{
			events: []database.Event{
				{
					Start: startTime,
					Name:  conv.Pointer("Test event"),
					Availabilities: []database.Availability{
						{
							PersonID:  personId,
							Available: false,
						},
					},
					Options: database.EventOptions{
						AttendanceRequired: true,
					},
				},
			},
		},
	}

	// Act
	result, err := ical.CreateCalendarForPerson()

	// Assert
	if err != nil {
		t.Errorf("Expected no error, got %v", err)
	}
	expected := "Test event - Not attending - Test show"
	summary := getProperty(result, "SUMMARY")

	if expected != summary {
		t.Errorf("Expected '%v', got '%v'", expected, summary)
	}
}

func TestAttendingUnknownEventHasCorrectSummary(t *testing.T) {
	personId := uuid.NewV4()
	startTime, _ := time.Parse("2006-01-02", "2021-01-01")
	ical := iCalendar{
		UserId:                   personId,
		HideEventsNotRequiredFor: true,
		Db: &mockDatabaseShows{
			events: []database.Event{
				{
					Start:          startTime,
					Name:           conv.Pointer("Test event"),
					Availabilities: []database.Availability{},
					Options: database.EventOptions{
						AttendanceRequired: true,
					},
				},
			},
		},
	}

	// Act
	result, err := ical.CreateCalendarForPerson()

	// Assert
	if err != nil {
		t.Errorf("Expected no error, got %v", err)
	}

	expected := "Test event - Attendance unknown - Test show"
	summary := getProperty(result, "SUMMARY")

	if expected != summary {
		t.Errorf("Expected '%v', got '%v'", expected, summary)
	}
}

func TestAttendingEventHasCorrectSummary(t *testing.T) {
	personId := uuid.NewV4()
	startTime, _ := time.Parse("2006-01-02", "2021-01-01")
	ical := iCalendar{
		UserId:                   personId,
		HideEventsNotRequiredFor: true,
		Db: &mockDatabaseShows{
			events: []database.Event{
				{
					Start: startTime,
					Name:  conv.Pointer("Test event"),
					Availabilities: []database.Availability{
						{
							PersonID:  personId,
							Available: true,
						},
					},
					Options: database.EventOptions{
						AttendanceRequired: true,
					},
				},
			},
		},
	}

	// Act
	result, err := ical.CreateCalendarForPerson()

	// Assert
	if err != nil {
		t.Errorf("Expected no error, got %v", err)
	}

	expected := "Test event - Attending - Test show"
	summary := getProperty(result, "SUMMARY")

	if expected != summary {
		t.Errorf("Expected '%v', got '%v'", expected, summary)
	}
}

func getProperty(s string, key string) string {
	lines := strings.Split(s, "\n")
	for _, l := range lines {
		if strings.Contains(l, key) {
			return strings.TrimSpace(strings.Split(l, key+":")[1])
		}
	}
	panic("Property not found")
}
