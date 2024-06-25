package showtimers

import (
	dto2 "showplanner.io/pkg/restapi/dtos"
	"time"

	"github.com/go-openapi/strfmt"
	uuid "github.com/satori/go.uuid"
	"showplanner.io/pkg/conv"
	"showplanner.io/pkg/database"
)

func mapShowTimerToDatabase(id uuid.UUID, createdByID uuid.UUID, dto dto2.UpdateShowTimerDTO) database.ShowTimer {
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

func mapShowTimerToSummaryDTO(sr database.ShowTimer) dto2.ShowTimerSummaryDTO {
	return dto2.ShowTimerSummaryDTO{
		ID:        *conv.UUIDToStrmFmtUUID(sr.ID),
		ShowStart: mapTimeIfExists(sr.ShowStart),
		ShowEnd:   mapTimeIfExists(sr.ShowEnd),
	}
}

func mapShowTimerToDTO(sr database.ShowTimer) dto2.ShowTimerDTO {
	dto := dto2.ShowTimerDTO{
		ID: *conv.UUIDToStrmFmtUUID(sr.ID),
		UpdateShowTimerDTO: dto2.UpdateShowTimerDTO{
			ActOneFOHClearance: mapTimeIfExists(sr.ActOneFOHClearance),
			ActTwoFOHClearance: mapTimeIfExists(sr.ActTwoFOHClearance),
			HouseOpen:          mapTimeIfExists(sr.HouseOpen),
			IntervalEnd:        mapTimeIfExists(sr.IntervalEnd),
			IntervalStart:      mapTimeIfExists(sr.IntervalStart),
			ShowEnd:            mapTimeIfExists(sr.ShowEnd),
			ShowStart:          mapTimeIfExists(sr.ShowStart),
			ExpectedCurtainsUp: mapTimeIfExists(sr.ExpectedCurtainsUp),
		},
	}
	if sr.EventID != nil {
		dto.EventID = conv.UintToInt64(*sr.EventID)
	}

	return dto
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
