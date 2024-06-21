package restapi

import (
	"fmt"
	"log/slog"
	"strconv"

	"showplanner.io/pkg/database"
	"showplanner.io/pkg/permissions"
)

func initialiseRoles() {
	initialiseGeneralRoles()
	initaliseShowRoles()
}

func initialiseGeneralRoles() {
	slog.Info("Initialising general roles")
	for _, role := range permissions.Roles {
		role.Initialise()
	}
	slog.Info(fmt.Sprintf("Initialised %d general roles", len(permissions.Roles)))
}

func initaliseShowRoles() {
	slog.Info("Initialising show roles")
	shows, err := database.GetAllShows()

	if err != nil {
		panic("Error getting shows: " + err.Error())
	}

	count := 0
	for _, show := range shows {
		showId := strconv.FormatUint(uint64(show.ID), 10)
		for _, role := range permissions.ShowRoles {
			role.Initialise(showId)
			count++
		}
	}

	slog.Info(fmt.Sprintf("Initialised %d show roles", count))
}
