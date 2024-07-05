package database

import (
	"fmt"

	uuid "github.com/satori/go.uuid"
	"gorm.io/gorm"
)

type IDatabaseShows interface {
	GetShowsForUser(id uuid.UUID) ([]Show, error)
	GetEventsWithAvailabilityAndAssignmentsForUser(showId uint, userId uuid.UUID) ([]Event, error)
}

type DatabaseShows struct {
}

func (d *DatabaseShows) GetShowsForUser(id uuid.UUID) ([]Show, error) {
	person := Person{}
	res := db.Preload("Shows.Events").Preload("Shows.Image").First(&person, id)
	return person.Shows, res.Error
}

func (d *DatabaseShows) GetEventsWithAvailabilityAndAssignmentsForUser(showId uint, userId uuid.UUID) ([]Event, error) {
	var events []Event
	res := db.Preload("Availabilities", "person_id = ?", userId).Preload("ShowReport").Preload("ShowTimer").Preload("Shadows.Role.Person").Preload("Shadows.Person").Preload("Assignments").Preload("Assignments.Role.Person").Preload("Assignments.Person").Where("show_id = ?", showId).Find(&events)

	return events, res.Error
}

func GetAllShows() ([]Show, error) {
	var shows []Show
	result := db.Find(&shows)

	return shows, result.Error
}

func GetShowsForUser(id uuid.UUID) ([]Show, error) {
	person := Person{}
	res := db.Preload("Shows.Events").Preload("Shows.Image").First(&person, id)
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

func RemovePersonFromShow(showId uint, id uuid.UUID) (err error) {
	defer func() {
		if err != nil {
			err = fmt.Errorf("while removing person from show: %w", err)
		}
	}()

	var show = Show{Model: gorm.Model{ID: showId}}
	person, err := GetPerson(id)
	if err != nil {
		return fmt.Errorf("while getting person: %w", err)
	}

	err = db.Model(&show).Association("People").Delete(&person)

	if err != nil {
		return fmt.Errorf("while deleting person from association: %w", err)
	}

	return nil
}

func RemovePersonAssignmentsFromShow(showId uint, id uuid.UUID) (err error) {
	defer func() {
		if err != nil {
			err = fmt.Errorf("while removing persons assignments from show: %w", err)
		}
	}()

	assignments := []Assignment{}
	res := db.Joins("Event").Where("person_id = ? AND show_id = ?", id, showId).Find(&assignments)

	if res.Error != nil {
		return fmt.Errorf("while getting assignments: %w", err)
	}

	for _, assignment := range assignments {
		err = db.Delete(&assignment).Error
		if err != nil {
			return fmt.Errorf("while deleting assignment: %w", err)
		}
	}

	return nil
}

func RemovePersonRoleAssignmentsFromShow(showId uint, id uuid.UUID) (err error) {
	defer func() {
		if err != nil {
			err = fmt.Errorf("while removing persons role assignment from show: %w", err)
		}
	}()

	roles := []Role{}
	res := db.Where("show_id = ? AND person_id = ?", showId, id).Find(&roles)
	if res.Error != nil {
		return fmt.Errorf("while getting roles: %w", err)
	}

	for _, role := range roles {
		res := db.Model(&role).Association("Person").Clear()

		if res != nil {
			return fmt.Errorf("while clearing role association: %w", res)
		}
	}

	return nil
}

func GetShowBySlug(slug string) (Show, error) {
	show := Show{}
	res := db.First(&show, "slug = ?", slug)

	return show, res.Error
}

func GetShowById(showId int64) (Show, error) {
	show := Show{}
	res := db.First(&show, showId)

	return show, res.Error
}

func GetShowByIdWithPeople(showId int64) (Show, error) {
	show := Show{}
	res := db.Preload("People").First(&show, showId)

	return show, res.Error
}

func CreateShow(show Show) (Show, error) {
	res := db.Create(&show)
	return show, res.Error
}
