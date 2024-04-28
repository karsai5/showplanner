package database

func GetMedia(id uint) (Media, error) {
	media := Media{}
	res := db.Find(&media, id)
	return media, res.Error
}

func GetMediaByKey(key string) (Media, error) {
	media := Media{}
	res := db.Where("key = ?", key).First(&media)
	return media, res.Error
}

func CreateMedia(media Media) (Media, error) {
	res := db.Create(&media)
	return media, res.Error
}
