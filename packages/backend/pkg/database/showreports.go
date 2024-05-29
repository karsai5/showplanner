package database

import (
	"fmt"

	"github.com/forPelevin/gomoji"
	uuid "github.com/satori/go.uuid"
)

func SaveShowReport(sr ShowReport) (ShowReport, error) {
	res := db.Save(&sr)
	return sr, res.Error
}

func GetShowReportsForUser(userId uuid.UUID) ([]ShowReport, error) {
	srs := []ShowReport{}
	res := db.Preload("CreatedBy").Where("created_by_id = ?", userId).Find(&srs)
	return srs, res.Error
}

func GetShowReport(id uuid.UUID) (ShowReport, error) {
	sr := ShowReport{}
	res := db.Preload("CreatedBy").First(&sr, id)
	return sr, res.Error
}

func GetShowReportForEvent(eventId uint) (ShowReport, error) {
	sr := ShowReport{}
	res := db.Preload("CreatedBy").Where("event_id = ?", eventId).First(&sr)
	return sr, res.Error
}

func (sr *ShowReport) GenerateDetailsFromEvent() {
	if sr.EventID == nil {
		return
	}

	e, err := GetEvent(*sr.EventID)
	if err != nil {
		panic(fmt.Sprintf("Could not get event: %s", err.Error()))
	}

	sr.Title = sr.getTitle(e)
	sr.Subtitle = sr.getSubtitle(e)

	if e.ShowTimer != nil {
		sr.ShowStart = e.ShowTimer.ShowStart
		sr.ShowEnd = e.ShowTimer.ShowEnd
		sr.IntervalStart = e.ShowTimer.IntervalStart
		sr.IntervalEnd = e.ShowTimer.IntervalEnd
		sr.HouseOpen = e.ShowTimer.HouseOpen
		sr.ActOneFOHClearance = e.ShowTimer.ActOneFOHClearance
		sr.ActTwoFOHClearance = e.ShowTimer.ActTwoFOHClearance
	}
}

func (sr *ShowReport) getTitle(e Event) (title string) {
	defer func() {
		title = gomoji.RemoveEmojis(title)
	}()

	calculatedName, err := e.GetCalculatedName()
	if err != nil {
		panic(fmt.Sprintf("Could not get event name: %s", err.Error()))
	}

	return fmt.Sprintf("%s - %s Report", e.Show.Name, calculatedName)
}

var timeFormat = "Monday 3pm, 2 January 2006"

func (sr *ShowReport) getSubtitle(e Event) (subtitle string) {
	defer func() {
		subtitle = gomoji.RemoveEmojis(subtitle)
	}()
	subtitle = e.Start.Format(timeFormat)
	if e.CurtainsUp != nil {
		subtitle = e.CurtainsUp.Format(timeFormat)
	}
	return subtitle
}
