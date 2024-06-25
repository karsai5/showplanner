package people_domain

import (
	"fmt"

	"showplanner.io/pkg/database"
	googlecsv "showplanner.io/pkg/google_csv"
)

func getGoogleCSV(people []database.Person, showName string) (string, error) {
	g := googlecsv.GoogleCSV{}
	for _, p := range people {
		c := googlecsv.Contact{
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
