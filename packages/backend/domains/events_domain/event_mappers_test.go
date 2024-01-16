package events_domain_test

import (
	"go-backend/domains/events_domain"
	"go-backend/models"
	"testing"
	"time"

	"github.com/go-openapi/strfmt"
)

func createEvent(s string) models.EventDTO {
	t, err := time.Parse(time.RFC3339, s)
	if err != nil {
		panic("Could not parse time")
	}

	dateTime := strfmt.DateTime(t)
	return models.EventDTO{
		CurtainsUp: &dateTime,
	}
}

func TestNameEventsWithCurtainsUp(t *testing.T) {
	t.Run("name events in order of curtains up", func(t *testing.T) {
		event1 := createEvent("2024-01-16T15:30:00Z")
		event2 := createEvent("2024-01-16T17:00:00Z")

		events := []*models.EventDTO{&event2, &event1}

		events_domain.NameEventsWithCurtainsUp(events)

		got := *event1.Name
		want := "Show 1"
		if got != want {
			t.Errorf("got %q wanted %q", got, want)
		}

		got = *event2.Name
		want = "Show 2"
		if got != want {
			t.Errorf("got %q wanted %q", got, want)
		}
	})

	t.Run("do not name events that already have names", func(t *testing.T) {
		event1 := createEvent("2024-01-16T15:30:00Z")
		event1Name := "Super cool event"
		event1.Name = &event1Name

		event2 := createEvent("2024-01-16T17:00:00Z")

		events := []*models.EventDTO{&event2, &event1}

		events_domain.NameEventsWithCurtainsUp(events)

		got := *event1.Name
		want := event1Name
		if got != want {
			t.Errorf("got %q wanted %q", got, want)
		}

		got = *event2.Name
		want = "Show 2"
		if got != want {
			t.Errorf("got %q wanted %q", got, want)
		}
	})

	t.Run("do not name events if they do not have curtains up", func(t *testing.T) {
		event1 := models.EventDTO{}
		event2 := models.EventDTO{}

		events := []*models.EventDTO{&event2, &event1}

		events_domain.NameEventsWithCurtainsUp(events)

		if event1.Name != nil {
			t.Errorf("Event name is not nil")
		}

		if event2.Name != nil {
			t.Errorf("Event name is not nil")
		}
	})
}
