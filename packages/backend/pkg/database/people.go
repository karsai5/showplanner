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

func (d *Database) GetPerson(id uuid.UUID) (Person, error) {
	person := Person{}
	res := db.First(&person, id)
	return person, res.Error
}

func GetPersonByEmail(email string) (Person, error) {
	person := Person{}
	res := db.Where("LOWER(email) = LOWER(?)", email).First(&person)
	return person, res.Error
}

func GetPeopleAssignedToShow(id uint) ([]Person, error) {
	show := Show{}
	res := db.Preload("People").Find(&show, id)
	return show.People, res.Error
}

func (d *Database) GetPeopleAssignedToShow(id uint) ([]Person, error) {
	show := Show{}
	res := db.Preload("People").Find(&show, id)
	return show.People, res.Error
}

func GetAllPeople() (people []Person, err error) {
	res := db.Find(&people).Order("firstName DESC")
	err = res.Error
	return people, err
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

func SearchForPeople(search string) ([]Person, error) {
	psr := []Person{}
	res := db.Raw(`select id, first_name, last_name, preferred_name, email from people_search 
    where search_string like lower('%`+search+`%') 
    or email = ? 
    order by search_string`, search).Scan(&psr)
	return psr, res.Error
}
