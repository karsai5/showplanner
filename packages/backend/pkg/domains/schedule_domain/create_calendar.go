package schedule_domain

import (
	"errors"
	"fmt"
	"strings"
	"time"

	ics "github.com/arran4/golang-ical"
	uuid "github.com/satori/go.uuid"
	"gorm.io/gorm"
	"showplanner.io/pkg/config"
	"showplanner.io/pkg/conv"
	"showplanner.io/pkg/database"
	"showplanner.io/pkg/models"
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
		createEventsForShow(cal, show, id)
	}

	return cal.Serialize(), nil
}

func createEventsForShow(cal *ics.Calendar, show database.Show, userId uuid.UUID) error {
	events, err := database.GetEventsWithAvailabilityAndAssignmentsForUser(show.ID, userId)
	if err != nil {
		return err
	}

	eventPointers := conv.MapArrayOfPointer(events, func(e database.Event) database.Event { return e })
	NameEventsWithCurtainsUp(eventPointers)

	roles, err := database.GetRolesForPerson(show.ID, userId)

	if err != nil && !errors.Is(err, gorm.ErrRecordNotFound) {
		return err
	}

	for _, e := range eventPointers {
		mappedRoles := MapRoles(roles, *e, userId)

		event := cal.AddEvent(fmt.Sprintf("%v@showplanner.io", e.ID))
		event.SetCreatedTime(time.Now())
		event.SetDtStampTime(time.Now())
		event.SetModifiedAt(time.Now())
		event.SetStartAt(e.Start)
		event.SetURL(fmt.Sprintf("%s/shows/%s", config.FRONTEND_URL, show.Slug))
		if e.End != nil {
			event.SetEndAt(*e.End)
		}
		event.SetSummary(getEventSummary(show, *e, mappedRoles))
		if e.Address != nil {
			event.SetLocation(*e.Address)
		}
		event.SetDescription(getDescription(show, *e, mappedRoles))
	}

	return nil
}

func getDescription(show database.Show, event database.Event, mappedRoles []*models.ScheduleEventDTORolesItems0) string {
	sBuilder := []string{}

	if event.CurtainsUp != nil {
		sBuilder = append(sBuilder, fmt.Sprintf("%s show\n", event.CurtainsUp.Format("3:04pm")))
	}

	for _, r := range mappedRoles {
		if r.CoveredBy != nil {
			sBuilder = append(sBuilder, fmt.Sprintf("Not required for %s, covered by %s %s", *r.Name, *r.CoveredBy.FirstName, *r.CoveredBy.LastName))
		} else {
			asBuilder := []string{fmt.Sprintf("Assigned to %s", *r.Name)}

			if r.ShadowedBy != nil {
				for _, shadow := range r.ShadowedBy {
					asBuilder = append(asBuilder, fmt.Sprintf("shadowed by %s %s", *shadow.FirstName, *shadow.LastName))
				}
			}

			sBuilder = append(sBuilder, strings.Join(asBuilder, ", "))
		}

		if r.Type == COVERING {
			cover := *r.Covering
			sBuilder = append(sBuilder, fmt.Sprintf("Covering %s %s as %s", *cover.FirstName, *cover.LastName, *r.Name))
		}
		if r.Type == SHADOWING {
			shadowing := *r.Shadowing
			sBuilder = append(sBuilder, fmt.Sprintf("Shadowing %s %s as %s", *shadowing.FirstName, *shadowing.LastName, *r.Name))
		}
	}
	return strings.Join(sBuilder, "\n")
}

func getEventSummary(show database.Show, event database.Event, mappedRoles []*models.ScheduleEventDTORolesItems0) string {
	summaryArray := []string{}
	if event.Name != nil {
		summaryArray = append(summaryArray, *event.Name)
	}
	if !isUserRequired(mappedRoles) && event.CurtainsUp != nil {
		summaryArray = append(summaryArray, "Not required")
	} else {
		for _, r := range mappedRoles {
			summaryArray = append(summaryArray, *r.Name)
		}
	}
	summaryArray = append(summaryArray, show.Name)
	return strings.Join(summaryArray, " - ")
}

func isUserRequired(mappedRoles []*models.ScheduleEventDTORolesItems0) bool {
	if len(mappedRoles) == 0 {
		return false
	}
	for _, role := range mappedRoles {
		if role.CoveredBy == nil {
			return true
		}
	}
	return false
}
