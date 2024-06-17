package googlecsv

import (
	"bytes"
	"encoding/csv"
	"fmt"
)

type CustomField struct {
	Name  string
	Value string
}

type Contact struct {
	FirstName    string
	LastName     string
	Phone        string
	Email        string
	Dob          string
	Notes        string
	CustomFields []CustomField
}

func (c *Contact) AddCustomField(name, value string) {
	c.CustomFields = append(c.CustomFields, CustomField{name, value})
}
func (c *Contact) GetCSVRow(sizeWithoutCustomFields int) []string {
	row := make([]string, sizeWithoutCustomFields)
	row[0] = fmt.Sprintf("%s %s", c.FirstName, c.LastName)
	row[1] = c.FirstName
	row[3] = c.LastName
	row[15] = c.Dob
	row[26] = c.Notes
	row[30] = "Home"
	row[31] = c.Email
	row[32] = "Mobile"
	row[33] = c.Phone

	for _, cf := range c.CustomFields {
		row = append(row, cf.Name, cf.Value)
	}
	return row
}

type GoogleCSV struct {
	contacts []Contact
}

func (g *GoogleCSV) AddContact(contact Contact) {
	g.contacts = append(g.contacts, contact)
}

func (g *GoogleCSV) GetString() (string, error) {
	headers := []string{"Name", "Given Name", "Additional Name", "Family Name", "Yomi Name", "Given Name Yomi", "Additional Name Yomi", "Family Name Yomi", "Name Prefix", "Name Suffix", "Initials", "Nickname", "Short Name", "Maiden Name", "File As", "Birthday", "Gender", "Location", "Billing Information", "Directory Server", "Mileage", "Occupation", "Hobby", "Sensitivity", "Priority", "Subject", "Notes", "Language", "Photo", "Group Membership", "E-mail 1 - Type", "E-mail 1 - Value", "Phone 1 - Type", "Phone 1 - Value"}

	sizeWithoutCustomFields := len(headers)

	headers = append(headers, g.getCustomFieldHeaders()...)

	b := new(bytes.Buffer)
	w := csv.NewWriter(b)

	rows := [][]string{headers}
	for _, c := range g.contacts {
		rows = append(rows, c.GetCSVRow(sizeWithoutCustomFields))
	}
	w.WriteAll(rows)

	if err := w.Error(); err != nil {
		return "", err
	}
	return b.String(), nil
}

func (g *GoogleCSV) getCustomFieldHeaders() []string {
	max := 0
	for _, c := range g.contacts {
		if len(c.CustomFields) > max {
			max = len(c.CustomFields)
		}
	}

	headers := []string{}
	for i := 0; i < max; i++ {
		headers = append(headers, fmt.Sprintf("Custom Field %d - Type", i+1), fmt.Sprintf("Custom Field %d - Value", i+1))
	}

	return headers
}
