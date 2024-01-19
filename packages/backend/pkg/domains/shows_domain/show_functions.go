package shows_domain

import (
	"showplanner.io/pkg/database"
)

var db = database.GetDatabase()

func GetAllShows() ([]database.Show, error) {
	var shows []database.Show
	result := db.Find(&shows)

	return shows, result.Error
}

func GetShowBySlug(slug string) (database.Show, error) {
	show := database.Show{}
	res := db.First(&show, "slug = ?", slug)

	return show, res.Error
}

func GetShowById(showId string) (database.Show, error) {
	show := database.Show{}
	res := db.First(&show, showId)

	return show, res.Error
}

func CreateShow(show database.Show) (database.Show, error) {
	res := db.Create(&show)
	return show, res.Error
}
