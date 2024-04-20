package shows_domain

import (
	"showplanner.io/pkg/conv"
	"showplanner.io/pkg/database"
	"showplanner.io/pkg/models"
)

func int64p(n uint) *int64 {
	number := int64(n)
	return &number
}

func MapShow(show database.Show) *models.ShowDTO {
	mappedShow := &models.ShowDTO{
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

	return mappedShow
}

func MapShowSummary(show database.Show) *models.ShowSummaryDTO {
	return &models.ShowSummaryDTO{
		ID:      int64p(show.ID),
		Name:    &show.Name,
		Slug:    &show.Slug,
		Company: &show.Company,
	}
}
