package database

import uuid "github.com/satori/go.uuid"

type IDatabase interface {
	GetShowsForUser(id uuid.UUID) ([]Show, error)
	GetEventsWithAvailabilityAndAssignmentsForUser(showId uint, userId uuid.UUID) ([]Event, error)
	GetEventsPreloaded(showId uint) ([]Event, error)
	GetRolesForPerson(showId uint, personId uuid.UUID) ([]Role, error)

	UpdateShow(showId uint, show Show) (Show, error)
	UpdateRosterReleaseStatus(showId uint, released bool) error
	GetShowById(showId uint) (Show, error)

	GetPeopleAssignedToShow(id uint) ([]Person, error)
	GetPerson(id uuid.UUID) (Person, error)

	GetRolesForShow(showId uint) ([]Role, error)
	GetEventsForRoster(showId uint) ([]Event, error)

	UpdateSortOrderOfRole(roleId uint, sortorder uint) error
}

type Database struct{}

var _ = IDatabase(&Database{})
