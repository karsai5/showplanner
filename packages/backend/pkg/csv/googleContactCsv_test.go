package csv_test

import (
	"strings"
	"testing"

	googlecsv "showplanner.io/pkg/csv"
)

func TestCorrectHeaderIsReturned(t *testing.T) {
	g := googlecsv.GoogleCSV{}
	c := googlecsv.GoogleContact{}
	g.AddContact(c)

	wanted := "Name,Given Name,Additional Name,Family Name,Yomi Name,Given Name Yomi,Additional Name Yomi,Family Name Yomi,Name Prefix,Name Suffix,Initials,Nickname,Short Name,Maiden Name,File As,Birthday,Gender,Location,Billing Information,Directory Server,Mileage,Occupation,Hobby,Sensitivity,Priority,Subject,Notes,Language,Photo,Group Membership,E-mail 1 - Type,E-mail 1 - Value,Phone 1 - Type,Phone 1 - Value"

	lines := getLines(t, &g)

	if lines[0] != wanted {
		t.Fatalf("got %q wanted %q", lines[0], wanted)
	}
}
func TestBaseDetailsAreReturned(t *testing.T) {
	g := googlecsv.GoogleCSV{}
	c := googlecsv.GoogleContact{
		FirstName: "John",
		LastName:  "Doe",
		Phone:     "1234567890",
		Email:     "email",
		Dob:       "2000-01-01",
		Notes:     "Notes",
	}
	g.AddContact(c)

	wanted := "John Doe,John,,Doe,,,,,,,,,,,,2000-01-01,,,,,,,,,,,Notes,,,,Home,email,Mobile,1234567890"

	details := getLines(t, &g)[1]
	if details != wanted {
		t.Fatalf("got %q wanted %q", details, wanted)
	}
}

func TestCustomFieldsCanBeAdded(t *testing.T) {
	g := googlecsv.GoogleCSV{}
	c := googlecsv.GoogleContact{
		FirstName: "John",
		LastName:  "Doe",
		Phone:     "1234567890",
		Email:     "",
		Dob:       "2000-01-01",
	}
	c.AddCustomField("test1", "test result")
	c.AddCustomField("test2", "test result 2")
	g.AddContact(c)

	lines := getLines(t, &g)

	wantedHeader := "Custom Field 1 - Type,Custom Field 1 - Value"
	if !strings.Contains(lines[0], wantedHeader) {
		t.Fatalf("Header does not contain custom fields. Expecting %s got: %s", wantedHeader, lines[0])
	}

	wantedValues := "test1,test result,test2,test result 2"
	if !strings.Contains(lines[1], wantedValues) {
		t.Fatalf("Row does not contain custom fields. Expecting %s got: %s", wantedHeader, lines[1])
	}
}

func getLines(t *testing.T, g *googlecsv.GoogleCSV) []string {
	s, err := g.GetString()
	if err != nil {
		t.Fatalf("Error: %v", err)
	}
	return strings.Split(s, "\n")

}
