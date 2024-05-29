package showtimers

import (
	"time"

	"github.com/go-openapi/strfmt"
	uuid "github.com/satori/go.uuid"
	"showplanner.io/pkg/conv"
	"showplanner.io/pkg/database"
	"showplanner.io/pkg/models"
)

func mapShowTimerToDatabase(id uuid.UUID, createdByID uuid.UUID, dto models.UpdateShowTimerDTO) database.ShowTimer {
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

func mapShowTimerToSummaryDTO(sr database.ShowTimer) models.ShowTimerSummaryDTO {
	return models.ShowTimerSummaryDTO{
		ID:        *conv.UUIDToStrmFmtUUID(sr.ID),
		ShowStart: mapTimeIfExists(sr.ShowStart),
		ShowEnd:   mapTimeIfExists(sr.ShowEnd),
	}
}

func mapShowTimerToDTO(sr database.ShowTimer) models.ShowTimerDTO {
	dto := models.ShowTimerDTO{
		ID: *conv.UUIDToStrmFmtUUID(sr.ID),
		UpdateShowTimerDTO: models.UpdateShowTimerDTO{
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
