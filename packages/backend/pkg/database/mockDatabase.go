package database

import uuid "github.com/satori/go.uuid"

type MockDatabase struct {
	DoGetShowsForUser                                func(id uuid.UUID) ([]Show, error)
	DoGetEventsWithAvailabilityAndAssignmentsForUser func(showId uint, userId uuid.UUID) ([]Event, error)
	DoGetRolesForPerson                              func(showId uint, personId uuid.UUID) ([]Role, error)
}

// GetEventsWithAvailabilityAndAssignmentsForUser implements I
func (m *MockDatabase) GetEventsWithAvailabilityAndAssignmentsForUser(showId uint, userId uuid.UUID) ([]Event, error) {
	if m.DoGetEventsWithAvailabilityAndAssignmentsForUser == nil {
		panic("GetEventsWithAvailabilityAndAssignmentsForUser is not implemented")
	}
	return m.DoGetEventsWithAvailabilityAndAssignmentsForUser(showId, userId)
}

// GetRolesForPerson implements I
func (m *MockDatabase) GetRolesForPerson(showId uint, personId uuid.UUID) ([]Role, error) {
	if m.DoGetRolesForPerson == nil {
		panic("GetRolesForPerson is not implemented")
	}
	return m.DoGetRolesForPerson(showId, personId)
}

// GetShowsForUser implements I
func (m *MockDatabase) GetShowsForUser(id uuid.UUID) ([]Show, error) {
	if m.DoGetShowsForUser == nil {
		panic("GetShowsForUser is not implemented")
	}
	return m.DoGetShowsForUser(id)
}

var _ IDatabase = &MockDatabase{}
