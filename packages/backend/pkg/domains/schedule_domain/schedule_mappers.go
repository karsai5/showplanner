package schedule_domain

import (
	"showplanner.io/pkg/conv"
	"showplanner.io/pkg/database"
	"showplanner.io/pkg/restapi/dtos"
)

func mapAvailabilityDTO(a database.Availability) dtos.AvailabilityDTO {
	return dtos.AvailabilityDTO{
		PersonID:  conv.UUIDToStrmFmtUUID(a.PersonID),
		EventID:   conv.UintToInt64(a.EventID),
		Available: &a.Available,
	}
}
