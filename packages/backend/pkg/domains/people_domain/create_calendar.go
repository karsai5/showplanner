package people_domain

import (
	"fmt"
	"time"

	ics "github.com/arran4/golang-ical"
	uuid "github.com/satori/go.uuid"
	"showplanner.io/pkg/config"
	"showplanner.io/pkg/database"
	"showplanner.io/pkg/domains/events_domain"
)

func createCalendarForPerson(id uuid.UUID) (_ string, err error) {
	defer func() {
		if err != nil {
			err = fmt.Errorf("in creating calednar for '%s': %w", id.String(), err)
		}
	}()

	shows, err := database.GetShowsForUser(id)

	if err != nil {
		return "", err
	}

	cal := ics.NewCalendar()

	for _, show := range shows {
		events := []*database.Event{}
		for i := range show.Events {
			events = append(events, &show.Events[i])
		}

		events_domain.NameEventsWithCurtainsUp(events)

		for _, e := range events {
			event := cal.AddEvent(fmt.Sprintf("%v@showplanner.io", e.ID))
			event.SetCreatedTime(time.Now())
			event.SetDtStampTime(time.Now())
			event.SetModifiedAt(time.Now())
			event.SetStartAt(e.Start)
			event.SetURL(fmt.Sprintf("%s/shows/%s", config.FRONTEND_URL, show.Slug))
			if e.End != nil {
				event.SetEndAt(*e.End)
			}
			event.SetSummary(fmt.Sprintf("%s", show.Name))
			if e.Name != nil {
				event.SetSummary(fmt.Sprintf("%s - %s", *e.Name, show.Name))
			}
			if e.Address != nil {
				event.SetLocation(*e.Address)
			}
		}
	}

	return cal.Serialize(), nil
}
