package shows_domain

import (
	"showplanner.io/pkg/conv"
	"showplanner.io/pkg/database"
	"showplanner.io/pkg/domains/media_domain"
	dto2 "showplanner.io/pkg/restapi/dtos"
)

func int64p(n uint) *int64 {
	number := int64(n)
	return &number
}

func MapShow(show database.Show) *dto2.ShowDTO {
	mappedShow := &dto2.ShowDTO{
		ID:      int64p(show.ID),
		Name:    &show.Name,
		Slug:    &show.Slug,
		Company: &show.Company,
		Start:   nil,
		End:     nil,
	}

	if len(show.Events) > 0 {
		start := show.Events[0].Start
		end := show.Events[0].Start
		for _, e := range show.Events {
			if e.Start.Before(start) {
				start = e.Start
			}
			if e.Start.After(end) {
				end = e.Start
			}
		}
		mappedShow.Start = conv.TimeToDateTime(&start)
		mappedShow.End = conv.TimeToDateTime(&end)
	}

	if show.Image != nil {
		mappedShow.Image = conv.Pointer(media_domain.MapToMediaDTO(*show.Image))
	}

	return mappedShow
}

func MapShowSummary(show database.Show) *dto2.ShowSummaryDTO {
	return &dto2.ShowSummaryDTO{
		ID:      int64p(show.ID),
		Name:    &show.Name,
		Slug:    &show.Slug,
		Company: &show.Company,
	}
}
