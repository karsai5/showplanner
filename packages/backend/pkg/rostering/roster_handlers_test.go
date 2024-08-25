package rostering

import (
	"net/http"
	"net/http/httptest"
	"testing"
	"time"

	"github.com/stretchr/testify/mock"
	"gorm.io/gorm"
	"showplanner.io/pkg/conv"
	"showplanner.io/pkg/database"
	"showplanner.io/pkg/permissions"
	"showplanner.io/pkg/permissions/mocks/github.com/go-openapi/runtime"
	"showplanner.io/pkg/restapi/dtos"
	"showplanner.io/pkg/restapi/operations/shows"
)

var show database.Show = database.Show{
	ImageID: nil,
	Image:   nil,
	Model: gorm.Model{
		ID:        0,
		CreatedAt: time.Now(),
		UpdatedAt: time.Now(),
	},
	Name:    "",
	Company: "",
	Slug:    "",
	Events:  []database.Event{},
	Roles:   []database.Role{},
	People:  []database.Person{},
	Options: database.ShowOptions{},
}

func TestIfTheUserDoesNotHavePermissionReturnAnError(t *testing.T) {
	mockDb := database.NewMockIDatabase(t)
	mockPh := permissions.NewMockIPermissionsHandler(t)
	mockProducer := runtime.NewMockProducer(t)

	mockDb.EXPECT().GetShowById(mock.Anything).Return(show, nil)
	mockPh.EXPECT().HasPermission(mock.Anything, mock.Anything).Return(false, nil)

	w := httptest.NewRecorder()

	handleGetRoster(mockDb, mockPh).Handle(shows.GetShowsShowIDRosterParams{
		HTTPRequest: &http.Request{},
		ShowID:      1,
	}).WriteResponse(w, mockProducer)

	if w.Code != 401 {
		t.Errorf("Expected 401, got %d", w.Code)
	}
}

func TestThatRolesForShowAreReturned(t *testing.T) {
	mockDb := database.NewMockIDatabase(t)
	mockPh := permissions.NewMockIPermissionsHandler(t)
	mockProducer := runtime.NewMockProducer(t)

	mockPh.EXPECT().HasPermission(mock.Anything, mock.Anything).Return(true, nil)
	mockDb.EXPECT().GetEventsForRoster(mock.Anything).Return([]database.Event{}, nil)
	mockProducer.EXPECT().Produce(mock.Anything, mock.Anything).Return(nil)

	mockDb.EXPECT().GetShowById(uint(42)).Return(database.Show{
		ImageID: new(uint),
		Image:   &database.Media{},
		Model:   gorm.Model{ID: 42, CreatedAt: time.Time{}, UpdatedAt: time.Time{}},
		Name:    "",
		Company: "",
		Slug:    "",
		Events:  []database.Event{},
		Roles:   []database.Role{},
		People:  []database.Person{},
		Options: database.ShowOptions{},
	}, nil)

	roles := []database.Role{
		database.Role{
			Model:  gorm.Model{},
			ShowID: 42,
			Show:   show,
			Name:   "cool role",
		},
	}
	mockDb.EXPECT().GetRolesForShow(uint(42)).Return(roles, nil)

	w := httptest.NewRecorder()

	handleGetRoster(mockDb, mockPh).Handle(shows.GetShowsShowIDRosterParams{
		HTTPRequest: &http.Request{},
		ShowID:      42,
	}).WriteResponse(w, mockProducer)

	if w.Code != 200 {
		t.Errorf("Expected 200, got %d", w.Code)
	}

	firstRole := mockProducer.Calls[0].Arguments[1].(*dtos.RosterDTO).Roles[0]
	if firstRole.Name != "cool role" {
		t.Errorf("Expected 'cool role', got %s", firstRole.Name)
	}
}

func TestThatEventsForShowAreReturned(t *testing.T) {
	mockDb := database.NewMockIDatabase(t)
	mockPh := permissions.NewMockIPermissionsHandler(t)
	mockProducer := runtime.NewMockProducer(t)

	mockPh.EXPECT().HasPermission(mock.Anything, mock.Anything).Return(true, nil)
	mockDb.EXPECT().GetRolesForShow(mock.Anything).Return([]database.Role{}, nil)
	mockProducer.EXPECT().Produce(mock.Anything, mock.Anything).Return(nil)

	mockDb.EXPECT().GetShowById(uint(42)).Return(database.Show{
		ImageID: new(uint),
		Image:   &database.Media{},
		Model:   gorm.Model{ID: 42, CreatedAt: time.Time{}, UpdatedAt: time.Time{}},
		Name:    "",
		Company: "",
		Slug:    "",
		Events:  []database.Event{},
		Roles:   []database.Role{},
		People:  []database.Person{},
		Options: database.ShowOptions{},
	}, nil)

	events := []database.Event{
		{
			Model:          gorm.Model{},
			Start:          time.Time{},
			ShowID:         42,
			Show:           show,
			Name:           conv.Pointer("cool event"),
			Availabilities: []database.Availability{},
			Assignments:    []database.Assignment{},
			Shadows:        []database.Shadow{},
			Options:        database.EventOptions{},
		},
	}

	mockDb.EXPECT().GetEventsForRoster(uint(42)).Return(events, nil)

	w := httptest.NewRecorder()

	handleGetRoster(mockDb, mockPh).Handle(shows.GetShowsShowIDRosterParams{
		HTTPRequest: &http.Request{},
		ShowID:      42,
	}).WriteResponse(w, mockProducer)

	if w.Code != 200 {
		t.Errorf("Expected 200, got %d", w.Code)
	}

	firstEvent := mockProducer.Calls[0].Arguments[1].(*dtos.RosterDTO).Events[0]
	if *firstEvent.Name != "cool event" {
		t.Errorf("Expected 'cool event', got %s", *firstEvent.Name)
	}
}
