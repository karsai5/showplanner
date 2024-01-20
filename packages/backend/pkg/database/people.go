package database

import uuid "github.com/satori/go.uuid"

func UpdatePerson(person Person) (Person, error) {
	res := db.Create(&person)
	return person, res.Error
}

func GetPerson(id uuid.UUID) (Person, error) {
	person := Person{}
	res := db.First(&person, id)
	return person, res.Error
}
