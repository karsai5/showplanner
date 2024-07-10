package schedule_domain

import (
	"errors"
	"fmt"
	"strings"
	"time"

	"showplanner.io/pkg/restapi/dtos"

	ics "github.com/arran4/golang-ical"
	uuid "github.com/satori/go.uuid"
	"gorm.io/gorm"
	"showplanner.io/pkg/config"
	"showplanner.io/pkg/conv"
	"showplanner.io/pkg/database"
)

type ICalOptions struct {
	UserId                   uuid.UUID
	HideEventsNotRequiredFor bool
}

type iCalendar struct {
	Db                       database.IDatabase
	UserId                   uuid.UUID
	HideEventsNotRequiredFor bool
}

func (ical *iCalendar) CreateCalendarForPerson() (_ string, err error) {
	defer func() {
		if err != nil {
			err = fmt.Errorf("in creating calednar for '%s': %w", ical.UserId.String(), err)
		}
	}()

	shows, err := ical.Db.GetShowsForUser(ical.UserId)
	if err != nil {
		return "", err
	}

	cal := ics.NewCalendar()

	for _, show := range shows {
		ical.createEventsForShow(cal, show, ical.UserId)
	}

	return cal.Serialize(), nil
}

func (ical *iCalendar) createEventsForShow(cal *ics.Calendar, show database.Show, userId uuid.UUID) error {
	events, err := ical.Db.GetEventsWithAvailabilityAndAssignmentsForUser(show.ID, userId)
	if err != nil {
		return err
	}

	eventPointers := conv.MapArrayOfPointer(events, func(e database.Event) database.Event { return e })
	NameEventsWithCurtainsUp(eventPointers)

	roles, err := ical.Db.GetRolesForPerson(show.ID, userId)

	if err != nil && !errors.Is(err, gorm.ErrRecordNotFound) {
		return err
	}

	for _, e := range eventPointers {

		if e.Options.Divider {
			continue // skip
		}

		if ical.HideEventsNotRequiredFor {
			if hide, _ := ical.shouldAttendingEventBeHidden(*e); e.Options.AttendanceRequired && hide {
				continue // skip
			}
		}

		rolesForUser := MapRoles(roles, *e, userId)

		// If the user is not required for any roles,
		// and the event is not required,
		// and the event has a curtain time,
		// and we're hiding events not required for, skip
		if (len(rolesForUser) == 0 && !e.Options.AttendanceRequired && e.CurtainsUp != nil) && ical.HideEventsNotRequiredFor {
			continue
		}

		event := cal.AddEvent(fmt.Sprintf("%v@showplanner.io", e.ID))
		event.SetCreatedTime(time.Now())
		event.SetDtStampTime(time.Now())
		event.SetModifiedAt(time.Now())
		event.SetStartAt(e.Start)
		event.SetURL(fmt.Sprintf("%s/shows/%s", config.FRONTEND_URL, show.Slug))
		if e.End != nil {
			event.SetEndAt(*e.End)
		}
		event.SetSummary(ical.getEventSummary(show, *e, rolesForUser))
		if e.Address != nil {
			event.SetLocation(*e.Address)
		}
		event.SetDescription(ical.getDescription(show, *e, rolesForUser))
	}

	return nil
}

func (ical *iCalendar) getDescription(_ database.Show, event database.Event, mappedRoles []*dtos.ScheduleEventDTORolesItems0) string {
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

func (ical iCalendar) getEventSummary(show database.Show, event database.Event, rolesForUser []*dtos.ScheduleEventDTORolesItems0) string {
	summaryArray := []string{}
	if event.Name != nil {
		summaryArray = append(summaryArray, *event.Name)
	}

	ical.addAttendingEventSummaryInformation(&summaryArray, event)

	roleStrings := []string{}
	for _, r := range rolesForUser {
		name := *r.Name
		if r.Shadowing != nil {
			name = name + " (shadowing)"
		}
		roleStrings = append(roleStrings, name)
	}

	if len(roleStrings) > 0 {
		summaryArray = append(summaryArray, strings.Join(roleStrings, ", "))
	} else if !ical.isUserRequiredForRole(rolesForUser) && !event.Options.AttendanceRequired {
		summaryArray = append(summaryArray, "Not required")
	}

	summaryArray = append(summaryArray, show.Name)
	return strings.Join(summaryArray, " - ")
}

func (ical *iCalendar) addAttendingEventSummaryInformation(summaryArray *[]string, e database.Event) {
	if e.Options.AttendanceRequired {
		attendance := ical.findAvailabilityForUserInEvent(e)
		if attendance == nil {
			*summaryArray = append(*summaryArray, "Attendance unknown")
		} else if attendance.Available {
			*summaryArray = append(*summaryArray, "Attending")
		} else {
			*summaryArray = append(*summaryArray, "Not attending")
		}
	}
}

func (ical iCalendar) shouldAttendingEventBeHidden(event database.Event) (bool, error) {
	if !event.Options.AttendanceRequired {
		return false, fmt.Errorf("event %d does not require attendance", event.ID)
	}
	attendance := ical.findAvailabilityForUserInEvent(event)
	if attendance == nil || attendance.Available {
		return false, nil
	}
	return true, nil
}

func (ical iCalendar) isUserRequiredForRole(rolesForUser []*dtos.ScheduleEventDTORolesItems0) bool {
	// If they have no roles
	if len(rolesForUser) == 0 {
		return false
	}
	// If one of their roles DOES NOT have a cover, they're required
	for _, role := range rolesForUser {
		if role.CoveredBy == nil {
			return true
		}
	}
	return false
}

func (ical *iCalendar) findAvailabilityForUserInEvent(event database.Event) *database.Availability {
	for _, a := range event.Availabilities {
		if a.PersonID == ical.UserId {
			return &a
		}
	}
	return nil
}
