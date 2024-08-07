package showdoc

import (
	"showplanner.io/pkg/restapi/dtos"
	"time"

	"github.com/go-openapi/strfmt"
	uuid "github.com/satori/go.uuid"
	"showplanner.io/pkg/conv"
	"showplanner.io/pkg/database"
)

func mapShowReportToDatabase(id uuid.UUID, createdByID uuid.UUID, dto dtos.UpdateShowreportDTO) database.ShowReport {
	sr := database.ShowReport{
		ID:                 id,
		Title:              mapStringIfExists(dto.Title),
		Subtitle:           mapStringIfExists(dto.Subtitle),
		ShowStart:          mapStrfmtTimeIfExists(dto.ShowStart),
		ShowEnd:            mapStrfmtTimeIfExists(dto.ShowEnd),
		IntervalStart:      mapStrfmtTimeIfExists(dto.IntervalStart),
		IntervalEnd:        mapStrfmtTimeIfExists(dto.IntervalEnd),
		HouseOpen:          mapStrfmtTimeIfExists(dto.HouseOpen),
		ActOneFOHClearance: mapStrfmtTimeIfExists(dto.ActOneFOHClearance),
		ActTwoFOHClearance: mapStrfmtTimeIfExists(dto.ActTwoFOHClearance),
		Notes:              mapStringIfExists(dto.Notes),

		CreatedById: createdByID,
	}
	if dto.EventID != nil {
		sr.EventID = conv.Pointer(uint(*dto.EventID))
	}
	return sr
}

func mapShowTimerToDatabase(id uuid.UUID, createdByID uuid.UUID, dto dtos.UpdateShowTimerDTO) database.ShowTimer {
	st := database.ShowTimer{
		ID:                 id,
		ShowStart:          mapStrfmtTimeIfExists(dto.ShowStart),
		ShowEnd:            mapStrfmtTimeIfExists(dto.ShowEnd),
		IntervalStart:      mapStrfmtTimeIfExists(dto.IntervalStart),
		IntervalEnd:        mapStrfmtTimeIfExists(dto.IntervalEnd),
		HouseOpen:          mapStrfmtTimeIfExists(dto.HouseOpen),
		ActOneFOHClearance: mapStrfmtTimeIfExists(dto.ActOneFOHClearance),
		ActTwoFOHClearance: mapStrfmtTimeIfExists(dto.ActTwoFOHClearance),
		ExpectedCurtainsUp: mapStrfmtTimeIfExists(dto.ExpectedCurtainsUp),

		CreatedById: createdByID,
	}
	if dto.EventID != nil {
		st.EventID = conv.Pointer(uint(*dto.EventID))
	}
	return st
}

func mapStringIfExists(s *string) string {
	if s == nil {
		return ""
	}
	return *s
}

func mapTimeIfExists(t *time.Time) *strfmt.DateTime {
	if t == nil {
		return nil
	}
	return (*strfmt.DateTime)(t)
}

func mapStrfmtTimeIfExists(t *strfmt.DateTime) *time.Time {
	if t == nil {
		return nil
	}
	return (*time.Time)(t)
}
