package database

import (
	"fmt"

	"showplanner.io/pkg/restapi/dtos"
)

type Warning struct {
	message string
	eventId uint
	roleId  uint
}

type Warnings struct {
	Warnings []Warning
}

func (w *Warnings) GenerateWarnings(event Event, role Role, assignment dtos.RosterAssignedDTO) {
	for _, generator := range warningGenerators {
		w.Warnings = append(w.Warnings, generator.GenerateWarnings(event, role, assignment)...)
	}
}

func (w *Warnings) GetWarnings() []*dtos.RosterWarningDTO {
	warnings := []*dtos.RosterWarningDTO{}
	for _, warning := range w.Warnings {
		warnings = append(warnings, &dtos.RosterWarningDTO{
			Anchor:  "anchor",
			ID:      "id",
			Message: warning.message,
		})
	}
	return warnings
}

type WarningGenerator interface {
	GenerateWarnings(event Event, role Role, assignment dtos.RosterAssignedDTO) []Warning
}

var warningGenerators = []WarningGenerator{
	&UnavailabilityWarningGenerator{},
}

type UnavailabilityWarningGenerator struct{}

func (*UnavailabilityWarningGenerator) GenerateWarnings(event Event, role Role, assignment dtos.RosterAssignedDTO) []Warning {
	warnings := []Warning{}

	if assignment.Person.ID != nil {
		name := *assignment.Person.FirstName
		if assignment.Person.PreferredName != "" {
			name = fmt.Sprintf("%s %s", name, *&assignment.Person.PreferredName)
		}
		if assignment.Available != nil && !*assignment.Available {

			warnings = append(warnings, Warning{
				message: fmt.Sprintf("%s is unavailable", name),
				eventId: 0,
				roleId:  0,
			})
		}
		if assignment.Available == nil {

			warnings = append(warnings, Warning{
				message: fmt.Sprintf("%s has unknown availability", name),
				eventId: 0,
				roleId:  0,
			})
		}
	}

	return warnings
}
