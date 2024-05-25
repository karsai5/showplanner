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

func (sr *ShowReport) GetTitle() (title string) {
	defer func() {
		title = gomoji.RemoveEmojis(title)
	}()

	if sr.EventID == nil {
		if sr.Title == "" {
			return "Show report"
		}
		return sr.Title
	}
	e, err := GetEvent(*sr.EventID)
	if err != nil {
		panic(fmt.Sprintf("Could not get event: %s", err.Error()))
	}
	calculatedName, err := e.GetCalculatedName()
	if err != nil {
		panic(fmt.Sprintf("Could not get event name: %s", err.Error()))
	}

	return fmt.Sprintf("%s - %s Report", e.Show.Name, calculatedName)
}

var timeFormat = "Monday 3pm, 2 January 2006"

func (sr *ShowReport) GetSubtitle() (subtitle string) {
	defer func() {
		subtitle = gomoji.RemoveEmojis(subtitle)
	}()
	if sr.EventID == nil {
		return sr.Subtitle
	}
	e, err := GetEvent(*sr.EventID)
	if err != nil {
		panic(fmt.Sprintf("Could not get event: %s", err.Error()))
	}
	subtitle = e.Start.Format(timeFormat)
	if e.CurtainsUp != nil {
		subtitle = e.CurtainsUp.Format(timeFormat)
	}
	return subtitle
}
