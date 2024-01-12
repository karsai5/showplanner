package utils

import (
	"strconv"
	"time"

	"github.com/go-openapi/strfmt"
)

func ConvertUintToString(number *uint) string {
	return strconv.FormatUint(uint64(*number), 10)
}

func GetIdPointer(n uint) *int64 {
	id := int64(n)
	return &id
}

func GetDateTime(t *time.Time) *strfmt.DateTime {
	if t == nil {
		return nil
	}
	dt := strfmt.DateTime(*t)
	return &dt
}
