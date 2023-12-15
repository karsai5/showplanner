package shows_domain

import (
	"go-backend/database"
	"go-backend/models"
)

func MapShows(shows []database.Show) []*models.BaseShowDTO {
	mappedShows := []*models.BaseShowDTO{}
	for _, show := range shows {
		mappedShows = append(mappedShows, MapShow(show))
	}
	return mappedShows
}

func MapShow(show database.Show) *models.BaseShowDTO {
	return &models.BaseShowDTO{
		ID:      int64(show.ID),
		Name:    &show.Name,
		Slug:    &show.Slug,
		Company: &show.Company,
	}
}

func MapEnrichedShow(show database.Show) *models.ShowDTO {
	return &models.ShowDTO{
		BaseShowDTO: models.BaseShowDTO{
			Name:    &show.Name,
			Slug:    &show.Slug,
			Company: &show.Company,
		},
	}
}
