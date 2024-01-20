package people

import (
	"fmt"
	"time"

	ics "github.com/arran4/golang-ical"
	uuid "github.com/satori/go.uuid"
	"showplanner.io/pkg/database"
	"showplanner.io/pkg/domains/events_domain"
	"showplanner.io/pkg/utils"
)

var frontendUrl = utils.GetEnvVariable("FRONTEND_URL", true)

func createCalendarForPerson(id uuid.UUID) (_ string, err error) {
	defer func() {
		if err != nil {
			err = fmt.Errorf("in creating ical string: %w", err)
		}
	}()

	shows, err := database.GetShowsWithEventsForUser(id)

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
			println(e.ID)
			event := cal.AddEvent(fmt.Sprintf("%v@showplanner.io", e.ID))
			event.SetCreatedTime(time.Now())
			event.SetDtStampTime(time.Now())
			event.SetModifiedAt(time.Now())
			event.SetStartAt(e.Start)
			event.SetURL(fmt.Sprintf("%s/shows/%s", frontendUrl, show.Slug))
			if e.End != nil {
				event.SetEndAt(*e.End)
			}
			if e.Name != nil {
				event.SetSummary(*e.Name)
			}
			if e.Address != nil {
				event.SetLocation(*e.Address)
			}
		}
	}

	return cal.Serialize(), nil
}
