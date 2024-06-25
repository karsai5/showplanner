package database

import "gorm.io/gorm"

func setupIndexes(db *gorm.DB) error {
	return execDBCommands(db, []string{
		// Assignments
		"DROP INDEX IF EXISTS unique_assignment",
		"CREATE UNIQUE INDEX unique_assignment ON assignments USING btree (event_id, role_id) WHERE deleted_at IS NULL",
		// Availabilities
		"DROP INDEX IF EXISTS unique_a",
		"CREATE UNIQUE INDEX unique_a ON availabilities USING btree (person_id, event_id) WHERE deleted_at is NULL",
		// Shadows
		"DROP INDEX IF EXISTS unique_shadow",
		"CREATE UNIQUE INDEX unique_shadow ON public.shadows USING btree (person_id, event_id, role_id) WHERE deleted_at IS NULL",
		// Invitations
		"DROP INDEX IF EXISTS unique_invitation_to_email",
		"CREATE UNIQUE INDEX unique_invitation_to_email ON public.invitations USING btree (show_id, email) WHERE deleted_at IS NULL",
		"DROP INDEX IF EXISTS unique_invitation_to_person",
		"CREATE UNIQUE INDEX unique_invitation_to_person ON public.invitations USING btree (show_id, person_id) WHERE deleted_at IS NULL",
	})
}

func execDBCommands(db *gorm.DB, commands []string) error {
	for _, command := range commands {
		res := db.Exec(command)
		if res.Error != nil {
			return res.Error
		}
	}

	return nil
}
