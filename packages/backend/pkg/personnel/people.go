package personnel

import "showplanner.io/pkg/database"

type searchOptions struct {
	showId *int64
}

func searchForPeople(s string, options *searchOptions) ([]database.Person, error) {
	people, err := database.SearchForPeople(s)
	if err != nil {
		return nil, err
	}

	if options != nil && options.showId != nil {
		people, err = filterByShowId(people, *options.showId)
		if err != nil {
			return nil, err
		}
	}

	if len(people) > 10 {
		people = people[:10]
	}
	return people, err
}

func filterByShowId(people []database.Person, showId int64) ([]database.Person, error) {
	filtered := []database.Person{}
	show, err := database.GetShowByIdWithPeople(showId)

	if err != nil {
		return nil, err
	}

	for _, p := range people {
		if !ifShowContainsPerson(show, p) {
			filtered = append(filtered, p)
		}
	}
	return filtered, nil
}

func ifShowContainsPerson(show database.Show, person database.Person) bool {
	for _, p := range show.People {
		if p.ID == person.ID {
			return true
		}
	}
	return false
}
