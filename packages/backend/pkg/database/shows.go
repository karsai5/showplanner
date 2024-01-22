package database

import (
	"fmt"

	uuid "github.com/satori/go.uuid"
	"gorm.io/gorm"
)

func GetAllShows() ([]Show, error) {
	var shows []Show
	result := db.Find(&shows)

	return shows, result.Error
}

func GetShowsForUser(id uuid.UUID) ([]Show, error) {
	person := Person{}
	res := db.Preload("Shows.Events").First(&person, id)
	return person.Shows, res.Error
}

func AddPersonToShow(showId uint, id uuid.UUID) error {
	var show = Show{Model: gorm.Model{ID: showId}}
	person, err := GetPerson(id)
	if err != nil {
		return fmt.Errorf("while adding person to show: %w", err)
	}

	err = db.Model(&show).Association("People").Append(&person)

	if err != nil {
		return fmt.Errorf("while adding person to show: %w", err)
	}

	return nil
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
