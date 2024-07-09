package database

import uuid "github.com/satori/go.uuid"

type IDatabase interface {
	GetShowsForUser(id uuid.UUID) ([]Show, error)
	GetEventsWithAvailabilityAndAssignmentsForUser(showId uint, userId uuid.UUID) ([]Event, error)
	GetRolesForPerson(showId uint, personId uuid.UUID) ([]Role, error)
}

type Database struct {
}
