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

func MapArray[X any, Y any](items []X, fn func(X) Y) []Y {
	array := []Y{}
	for _, item := range items {
		array = append(array, fn(item))
	}
	return array
}

func MapArrayOfPointer[X any, Y any](items []X, fn func(X) Y) []*Y {
	array := []*Y{}
	for _, item := range items {
		mappedItem := fn(item)
		array = append(array, &mappedItem)
	}
	return array
}
