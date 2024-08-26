package csv

import (
	"bytes"
	encodingCsv "encoding/csv"
)

type CSVContact struct {
	Pronoun               string
	FirstName             string
	LastName              string
	PreferredName         string
	Phone                 string
	Email                 string
	DOB                   string
	WWC                   string
	EmergencyPhone        string
	EmergencyName         string
	EmergencyRelationship string
}

func (c *CSVContact) GetCSVRow() []string {
	return []string{
		c.Pronoun,
		c.FirstName,
		c.LastName,
		c.PreferredName,
		c.Phone,
		c.Email,
		c.DOB,
		c.WWC,
		c.EmergencyPhone,
		c.EmergencyName,
		c.EmergencyRelationship,
	}
}

type CSVContacts struct {
	Contacts []CSVContact
}

func (g *CSVContacts) GetString() (string, error) {
	header := CSVContact{
		Pronoun:               "Pronoun",
		FirstName:             "First name",
		LastName:              "Last name",
		PreferredName:         "Preferred first name",
		Phone:                 "Phone",
		Email:                 "Email",
		DOB:                   "Date of birth",
		WWC:                   "Working with children check",
		EmergencyPhone:        "Emergency phone",
		EmergencyName:         "Emergency name",
		EmergencyRelationship: "Emergency relationship",
	}

	b := new(bytes.Buffer)
	w := encodingCsv.NewWriter(b)

	rows := [][]string{header.GetCSVRow()}
	for _, c := range g.Contacts {
		rows = append(rows, c.GetCSVRow())
	}
	w.WriteAll(rows)

	if err := w.Error(); err != nil {
		return "", err
	}
	return b.String(), nil
}
