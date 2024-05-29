package showreports

import (
	"time"

	"github.com/go-openapi/strfmt"
	uuid "github.com/satori/go.uuid"
	"showplanner.io/pkg/conv"
	"showplanner.io/pkg/database"
	"showplanner.io/pkg/models"
)

func mapShowReportToSummaryDTO(sr database.ShowReport) models.ShowReportSummaryDTO {
	sr.GenerateDetailsFromEvent()
	return models.ShowReportSummaryDTO{
		LastUpdated: strfmt.DateTime(sr.UpdatedAt),
		ID:          *conv.UUIDToStrmFmtUUID(sr.ID),
		Title:       sr.Title,
	}
}

func mapShowReportToDatabase(id uuid.UUID, createdByID uuid.UUID, dto models.UpdateShowreportDTO) database.ShowReport {
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

func mapShowReportToDTO(sr database.ShowReport) models.ShowReportDTO {
	sr.GenerateDetailsFromEvent()
	dto := models.ShowReportDTO{
		ID: *conv.UUIDToStrmFmtUUID(sr.ID),
		UpdateShowreportDTO: models.UpdateShowreportDTO{
			ActOneFOHClearance: mapTimeIfExists(sr.ActOneFOHClearance),
			ActTwoFOHClearance: mapTimeIfExists(sr.ActTwoFOHClearance),
			HouseOpen:          mapTimeIfExists(sr.HouseOpen),
			IntervalEnd:        mapTimeIfExists(sr.IntervalEnd),
			IntervalStart:      mapTimeIfExists(sr.IntervalStart),
			Notes:              &sr.Notes,
			ShowEnd:            mapTimeIfExists(sr.ShowEnd),
			ShowStart:          mapTimeIfExists(sr.ShowStart),
			Subtitle:           conv.Pointer(sr.Subtitle),
			Title:              conv.Pointer(sr.Title),
		},
	}
	if sr.EventID != nil {
		dto.EventID = conv.UintToInt64(*sr.EventID)
	}
	return dto
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
