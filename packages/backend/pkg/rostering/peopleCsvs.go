package rostering

import (
	"fmt"

	"showplanner.io/pkg/csv"
	"showplanner.io/pkg/database"
)

func getContactCSV(people []database.Person) (string, error) {
	csvContacts := csv.CSVContacts{
		Contacts: []csv.CSVContact{},
	}
	for _, p := range people {
		c := csv.CSVContact{
			FirstName:             p.FirstName,
			LastName:              p.LastName,
			Phone:                 p.Phone,
			Email:                 p.Email,
			DOB:                   p.DOB,
			EmergencyPhone:        p.EmergencyPhone,
			EmergencyName:         p.EmergencyName,
			EmergencyRelationship: p.EmergencyRelationship,
		}
		if p.Pronoun != nil {
			c.Pronoun = *p.Pronoun
		}
		if p.PreferredName != nil {
			c.PreferredName = *p.PreferredName
		}
		if p.WWC != nil {
			c.WWC = *p.WWC
		}
		csvContacts.Contacts = append(csvContacts.Contacts, c)
	}
	return csvContacts.GetString()
}

func getGoogleCSV(people []database.Person, showName string) (string, error) {
	g := csv.GoogleCSV{}
	for _, p := range people {
		c := csv.GoogleContact{
			FirstName: p.GetFirstName(),
			LastName:  p.LastName,
			Phone:     p.Phone,
			Email:     p.Email,
			Dob:       p.DOB,
			Notes:     fmt.Sprintf("Emergency contact: %s / %s / %s\nAllergies: %s", p.EmergencyName, p.EmergencyRelationship, p.EmergencyPhone, p.Allergies),
		}
		c.AddCustomField("Show", showName)
		g.AddContact(c)
	}
	return g.GetString()
}
