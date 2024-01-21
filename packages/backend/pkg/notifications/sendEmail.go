package notifications

import (
	"showplanner.io/pkg/utils"

	"gopkg.in/gomail.v2"
)

type Email struct {
	ToEmail string
	Subject string
	Body    string
}

func SendEmail(email Email) error {
	host := utils.GetEnvVariable("SMTP_HOST", true)
	username := utils.GetEnvVariable("SMTP_USER", true)
	password := utils.GetEnvVariable("SMTP_PASS", true)

	m := gomail.NewMessage()
	m.SetHeader("From", "ShowPlanner.io <noreply@showplanner.io>")
	m.SetHeader("To", email.ToEmail)
	m.SetHeader("Subject", email.Subject)
	m.SetBody("text/plain", email.Body)

	d := gomail.NewDialer(host, 587, username, password)

	if err := d.DialAndSend(m); err != nil {
		return err
	}
	return nil
}
