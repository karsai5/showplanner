package database

import (
	uuid "github.com/satori/go.uuid"
)

func UpdatePerson(person Person) (Person, error) {
	res := db.Create(&person)
	return person, res.Error
}

func GetPerson(id uuid.UUID) (Person, error) {
	person := Person{}
	res := db.First(&person, id)
	return person, res.Error
}

func GetPeopleAssignedToShow(id uint) ([]Person, error) {
	show := Show{}
	res := db.Preload("People").Find(&show, id)
	return show.People, res.Error
}

func GetPeopleNotAssignedToShow(id uint) ([]Person, error) {
	people := []Person{}
	res := db.Preload("Shows", "id = ?", id).Find(&people)

	peopleNotAssignedToShow := []Person{}
	for _, p := range people {
		if len(p.Shows) == 0 {
			peopleNotAssignedToShow = append(peopleNotAssignedToShow, p)
		}
	}

	return peopleNotAssignedToShow, res.Error
}
