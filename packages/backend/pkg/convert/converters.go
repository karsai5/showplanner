package convert

import (
	"strconv"
	"time"

	"github.com/go-openapi/strfmt"
	uuid "github.com/satori/go.uuid"
)

func UintToString(number *uint) string {
	return strconv.FormatUint(uint64(*number), 10)
}

func UintToInt64(n uint) *int64 {
	id := int64(n)
	return &id
}

func GetPointer[T any](x T) *T {
	y := x
	return &y
}

func TimeToDateTime(t *time.Time) *strfmt.DateTime {
	if t == nil {
		return nil
	}
	dt := strfmt.DateTime(*t)
	return &dt
}

func UUIDToStrmFmtUUID(id uuid.UUID) *strfmt.UUID {
	convertedUUID := strfmt.UUID(id.String())
	return &convertedUUID
}
