package database

import (
	"errors"

	uuid "github.com/satori/go.uuid"
	"gorm.io/gorm"
	"gorm.io/gorm/clause"
	"showplanner.io/pkg/conv"
)

func GetAvailability(userId uuid.UUID, eventId uint) (*Availability, error) {
	var availabilities []Availability
	res := db.Where("person_id = ? AND event_id = ?", userId, eventId).Find(&availabilities)

	if len(availabilities) > 1 {
		return nil, errors.New("Too many availabilities returned")
	}

	if res.Error != nil {
		return nil, res.Error
	}

	if len(availabilities) == 0 {
		return nil, res.Error
	}

	return &availabilities[0], res.Error
}

func UpdateAvailability(userId uuid.UUID, eventId uint, available bool) (*Availability, error) {
	existingAvailability, err := GetAvailability(userId, eventId)
	if err != nil {
		return nil, err
	}

	newAvailability := Availability{
		PersonID:  userId,
		EventID:   eventId,
		Available: available,
	}

	if existingAvailability != nil {
		newAvailability.ID = existingAvailability.ID
	}

	res := db.Save(&newAvailability)

	return &newAvailability, res.Error
}

func (d *Database) GetRolesForShow(showId uint) ([]Role, error) {
	roles := []Role{}
	res := db.Order("sort, id").Where("show_id = ?", showId).Preload("Person").Find(&roles)
	return roles, res.Error
}

func (d *Database) UpdateSortOrderOfRole(roleId uint, sortorder uint) error {
	role := &Role{Model: gorm.Model{ID: roleId}}
	res := db.Model(&role).Update("sort", sortorder)
	return res.Error
}

func DeleteRole(id uint) error {
	res := db.Delete(&Role{}, id)
	return res.Error
}

func GetRole(roleId uint) (Role, error) {
	role := Role{}
	res := db.Find(&role, roleId)
	return role, res.Error
}

func (d *Database) GetRolesForPerson(showId uint, personId uuid.UUID) ([]Role, error) {
	roles := []Role{}
	res := db.Where(&Role{PersonID: conv.Pointer(personId), ShowID: showId}).Find(&roles)
	return roles, res.Error
}

func CreateRole(role Role) (Role, error) {
	res := db.Create(&role)
	return role, res.Error
}

func UpdateRole(id uint, role Role) (Role, error) {
	updatedRole := Role{
		Model: gorm.Model{
			ID: id,
		},
	}
	res := db.Model(&updatedRole).Select("PersonID", "Name").Updates(role)
	return updatedRole, res.Error
}

func CreateAssignment(assignment Assignment) (Assignment, error) {
	res := db.Create(&assignment)
	if res.Error != nil {
		return assignment, res.Error
	}

	res = db.Preload(clause.Associations).Find(&assignment, assignment.ID)
	return assignment, res.Error
}

func GetShadow(id uint) (Shadow, error) {
	shadow := Shadow{}
	res := db.Preload(clause.Associations).Find(&shadow, id)
	return shadow, res.Error
}

func CreateShadow(shadow Shadow) (Shadow, error) {
	res := db.Create(&shadow)
	return shadow, res.Error
}

func DeleteShadow(id uint) error {
	res := db.Delete(&Shadow{}, id)
	return res.Error
}

func GetAssignment(id uint) (Assignment, error) {
	assignment := Assignment{}
	res := db.Preload(clause.Associations).Find(&assignment, id)
	return assignment, res.Error
}

func DeleteAssignment(id uint) error {
	res := db.Delete(&Assignment{}, id)
	return res.Error
}

func UpdateAssignment(id uint, assignment Assignment) (Assignment, error) {
	updatedAssignment := Assignment{
		Model: gorm.Model{
			ID: id,
		},
	}
	res := db.Model(&updatedAssignment).Updates(assignment)
	return updatedAssignment, res.Error
}
