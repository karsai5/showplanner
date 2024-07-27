package schedule_domain

import (
	dto2 "showplanner.io/pkg/restapi/dtos"
	"sort"
	"strconv"
	"time"

	"github.com/go-openapi/strfmt"
	"showplanner.io/pkg/database"
)

func mapToDatabaseEvent(dto dto2.CreateEventDTO) database.Event {
	event := database.Event{
		ShowID:     uint(*dto.ShowID),
		Start:      time.Time(*dto.Start),
		End:        (*time.Time)(dto.End),
		CurtainsUp: (*time.Time)(dto.CurtainsUp),
		Name:       dto.Name,
		ShortNote:  dto.Shortnote,
		Address:    dto.Address,
		Options: database.EventOptions{
			UserInputType: database.UserInputType(dto.Options.UserInput),
		},
	}

	if dto.Options != nil {
		if dto.Options.Divider != nil {
			event.Options.Divider = *dto.Options.Divider
		}
	}

	return event
}

func timep(stringTime strfmt.DateTime) *time.Time {
	time := time.Time(stringTime)
	return &time
}

type Event interface {
	int64 | float64
}

func NameEventsWithCurtainsUp[E dto2.EventWithCurtainsUp](events []E) {
	var showEvents []E
	for _, event := range events {
		if (event).GetCurtainsUp() != nil {
			showEvents = append(showEvents, event)
		}
	}

	sort.Slice(showEvents, func(i, j int) bool {
		iCurtainsUp := *timep(*showEvents[i].GetCurtainsUp())
		jCurtainsUp := *timep(*showEvents[j].GetCurtainsUp())
		return iCurtainsUp.Before(jCurtainsUp)
	})

	for i, event := range showEvents {
		if event.IsNameEmpty() {
			name := "Show " + strconv.Itoa(i+1)
			event.SetName(name)
		}
	}
}
