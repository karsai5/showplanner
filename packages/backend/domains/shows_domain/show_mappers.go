package shows_domain

import (
	"go-backend/database"
	"go-backend/models"
)

func MapShows(shows []database.Show) []*models.ShowDTO {
	mappedShows := []*models.ShowDTO{}
	for _, show := range shows {
		mappedShows = append(mappedShows, MapShow(show))
	}
	return mappedShows
}

func int64p(n uint) *int64 {
	number := int64(n)
	return &number
}

func MapShow(show database.Show) *models.ShowDTO {
	return &models.ShowDTO{
		ID:      int64p(show.ID),
		Name:    &show.Name,
		Slug:    &show.Slug,
		Company: &show.Company,
	}
}
