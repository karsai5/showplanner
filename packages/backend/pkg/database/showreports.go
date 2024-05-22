package database

import uuid "github.com/satori/go.uuid"

func SaveShowReport(sr ShowReport) (ShowReport, error) {
	res := db.Save(&sr)
	return sr, res.Error
}

func GetShowReportsForUser(userId uuid.UUID) ([]ShowReport, error) {
	srs := []ShowReport{}
	res := db.Preload("CreatedBy").Where("created_by_id = ?", userId).Find(&srs)
	return srs, res.Error
}

func GetShowReport(id uuid.UUID) (ShowReport, error) {
	sr := ShowReport{}
	res := db.Preload("CreatedBy").First(&sr, id)
	return sr, res.Error
}
