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

func doGetRolesForPerson(uint, uuid.UUID) ([]database.Role, error) {
	return []database.Role{}, nil
}

func doGetShowsForUser(id uuid.UUID) ([]database.Show, error) {
	return []database.Show{mockShow}, nil
}

func mockEvents(events []database.Event) func(showId uint, userId uuid.UUID) ([]database.Event, error) {
	return func(showId uint, userId uuid.UUID) ([]database.Event, error) {
		return events, nil
	}
}

func TestDividerEventsAreSkipped(t *testing.T) {
	mockDb := database.MockDatabase{
		DoGetRolesForPerson: doGetRolesForPerson,
		DoGetShowsForUser:   doGetShowsForUser,
		DoGetEventsWithAvailabilityAndAssignmentsForUser: mockEvents([]database.Event{
			{
				Start:      time.Now(),
				End:        &time.Time{},
				CurtainsUp: &time.Time{},
				ShowID:     mockShow.ID,
				Show:       mockShow,
				Options: database.EventOptions{
					Divider:            true,
					AttendanceRequired: false,
				},
			},
		}),
	}

	ical := iCalendar{
		UserId:                   [16]byte{},
		Db:                       &mockDb,
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

func TestEventWithNoRolesIsHiddenIfHideEventsIsTrue(t *testing.T) {
	personId := uuid.NewV4()

	mockDb := database.MockDatabase{
		DoGetRolesForPerson: doGetRolesForPerson,
		DoGetShowsForUser:   doGetShowsForUser,
		DoGetEventsWithAvailabilityAndAssignmentsForUser: mockEvents([]database.Event{
			{
				Start:          time.Now(),
				CurtainsUp:     conv.Pointer(time.Now()),
				Availabilities: []database.Availability{},
				Options:        database.EventOptions{},
			},
		}),
	}

	ical := iCalendar{
		UserId:                   personId,
		Db:                       &mockDb,
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

func TestEventWithNoRolesHasCorrectDescriptionIfHideEventsIsFalse(t *testing.T) {
	personId := uuid.NewV4()

	mockDb := database.MockDatabase{
		DoGetRolesForPerson: doGetRolesForPerson,
		DoGetShowsForUser:   doGetShowsForUser,
		DoGetEventsWithAvailabilityAndAssignmentsForUser: mockEvents([]database.Event{
			{
				Start:          time.Now(),
				CurtainsUp:     conv.Pointer(time.Now()),
				Availabilities: []database.Availability{},
				Options:        database.EventOptions{},
			},
		}),
	}

	ical := iCalendar{
		UserId: personId,
		Db:     &mockDb,
	}

	// Act
	result, err := ical.CreateCalendarForPerson()

	// Assert
	if err != nil {
		t.Errorf("Expected no error, got %v", err)
	}
	expectPropertyToEqual(t, result, "SUMMARY", "Show 1 - Not required - Test show")
}

func TestUnattendingEventIsHiddenIfHideEventsIsTrue(t *testing.T) {
	personId := uuid.NewV4()
	startTime, _ := time.Parse("2006-01-02", "2021-01-01")

	mockDb := database.MockDatabase{
		DoGetRolesForPerson: doGetRolesForPerson,
		DoGetShowsForUser:   doGetShowsForUser,
		DoGetEventsWithAvailabilityAndAssignmentsForUser: mockEvents([]database.Event{
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
		}),
	}

	ical := iCalendar{
		UserId:                   personId,
		Db:                       &mockDb,
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

	mockDb := database.MockDatabase{
		DoGetRolesForPerson: doGetRolesForPerson,
		DoGetShowsForUser:   doGetShowsForUser,
		DoGetEventsWithAvailabilityAndAssignmentsForUser: mockEvents([]database.Event{
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
		}),
	}

	ical := iCalendar{
		UserId:                   personId,
		HideEventsNotRequiredFor: false,
		Db:                       &mockDb,
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
	mockDb := database.MockDatabase{
		DoGetRolesForPerson: doGetRolesForPerson,
		DoGetShowsForUser:   doGetShowsForUser,
		DoGetEventsWithAvailabilityAndAssignmentsForUser: mockEvents([]database.Event{
			{
				Start:          startTime,
				Name:           conv.Pointer("Test event"),
				Availabilities: []database.Availability{},
				Options: database.EventOptions{
					AttendanceRequired: true,
				},
			},
		}),
	}

	ical := iCalendar{
		UserId:                   personId,
		HideEventsNotRequiredFor: true,
		Db:                       &mockDb,
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
	mockDb := database.MockDatabase{
		DoGetRolesForPerson: doGetRolesForPerson,
		DoGetShowsForUser:   doGetShowsForUser,
		DoGetEventsWithAvailabilityAndAssignmentsForUser: mockEvents([]database.Event{
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
		}),
	}

	ical := iCalendar{
		UserId:                   personId,
		HideEventsNotRequiredFor: true,
		Db:                       &mockDb,
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

func TestSummaryShouldIncludeRoles(t *testing.T) {
	personId := uuid.NewV4()
	eventId := uint(0)

	mockDb := database.MockDatabase{
		DoGetRolesForPerson: func(showId uint, personId uuid.UUID) ([]database.Role, error) {
			return []database.Role{
				{ // base role
					Name:     "Show role",
					PersonID: &personId,
				},
			}, nil
		},
		DoGetShowsForUser: doGetShowsForUser,
		DoGetEventsWithAvailabilityAndAssignmentsForUser: mockEvents([]database.Event{
			{
				Model: gorm.Model{
					ID: eventId,
				},
				Start: time.Now(),
				Name:  conv.Pointer("Test event"),
				Assignments: []database.Assignment{
					{ // assignment
						PersonID: personId,
						Role: database.Role{
							Name: "Assigned role",
						},
					},
				},
				Shadows: []database.Shadow{
					{ // shadow
						PersonID: personId,
						EventID:  eventId,
						RoleID:   0,
						Role: database.Role{
							Name:   "Shadow role",
							Person: &database.Person{},
						},
					},
				},
			},
		}),
	}

	ical := iCalendar{
		UserId:                   personId,
		HideEventsNotRequiredFor: true,
		Db:                       &mockDb,
	}

	// Act
	result, err := ical.CreateCalendarForPerson()

	// Assert
	if err != nil {
		t.Errorf("Expected no error, got %v", err)
	}

	expected := "Test event - Show role\\, Assigned role\\, Shadow role (shadowing) - Test show"
	expectPropertyToEqual(t, result, "SUMMARY", expected)
}

func expectPropertyToEqual(t *testing.T, result string, key string, expected string) {
	if actual := getProperty(result, key); actual != expected {
		t.Errorf("Expected '%v', got '%v'", expected, actual)
	}
}

func getProperty(s string, key string) string {
	lines := strings.Split(s, "\n")
	matchingLines := []string{}
	found := false
	for _, l := range lines {
		if !found && strings.Contains(l, key) {
			matchingLines = append(matchingLines, strings.TrimRight(strings.Split(l, key+":")[1], "\r\n"))
			found = true
			continue
		}
		if found {
			if strings.HasPrefix(l, "  ") {
				matchingLines = append(matchingLines, strings.TrimRight(l[2:], "\r\n"))
			} else {
				break
			}
		}
	}

	return strings.TrimSpace(strings.Join(matchingLines, " "))
}
