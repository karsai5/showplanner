package database

func GetAllShows() ([]Show, error) {
	var shows []Show
	result := db.Find(&shows)

	return shows, result.Error
}

func GetShowBySlug(slug string) (Show, error) {
	show := Show{}
	res := db.First(&show, "slug = ?", slug)

	return show, res.Error
}

func GetShowById(showId string) (Show, error) {
	show := Show{}
	res := db.First(&show, showId)

	return show, res.Error
}

func CreateShow(show Show) (Show, error) {
	res := db.Create(&show)
	return show, res.Error
}
