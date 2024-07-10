package database

import uuid "github.com/satori/go.uuid"

//go:generate mockery --name IDatabase
type IDatabase interface {
	GetShowsForUser(id uuid.UUID) ([]Show, error)
	GetEventsWithAvailabilityAndAssignmentsForUser(showId uint, userId uuid.UUID) ([]Event, error)
	GetRolesForPerson(showId uint, personId uuid.UUID) ([]Role, error)

	UpdateShow(show Show) (Show, error)
}

type Database struct{}

// UpdateShow implements IDatabase.
func (d *Database) UpdateShow(show Show) (Show, error) {
	panic("unimplemented")
}

var _ = IDatabase(&Database{})
