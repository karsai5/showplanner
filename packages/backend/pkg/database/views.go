package database

import "gorm.io/gorm"

func setupViews(db *gorm.DB) error {
	return execDBCommands(db, []string{
		// Search string concats firstname, lastname, preferred name, and email without domain
		"drop view if exists people_search",
		`
    create view people_search as
      select lower(concat_ws(' ',p.first_name, p.last_name, p.preferred_name, split_part(p.email, '@', 1))) as search_string, 
      p.first_name, p.last_name, p.preferred_name, p.id 
      from people p;
    `,
	})
}
