package notifications

import (
	"log/slog"

	"showplanner.io/pkg/config"

	"gopkg.in/gomail.v2"
)

type Email struct {
	ToEmail string
	Subject string
	Body    string
}

func SendEmail(email Email) error {
	if !config.IsProd {
		showEmailInConsole(email)
		return nil
	}

	m := gomail.NewMessage()
	m.SetHeader("From", "ShowPlanner.io <noreply@showplanner.io>")
	m.SetHeader("To", email.ToEmail)
	m.SetHeader("Subject", email.Subject)
	m.SetBody("text/plain", email.Body)

	d := gomail.NewDialer(config.SMTP_HOST, 587, config.SMTP_USER, config.SMTP_PASS)

	if err := d.DialAndSend(m); err != nil {
		return err
	}
	return nil
}

func showEmailInConsole(email Email) {
	slog.Info("Sent email", "to", email.ToEmail, "subject", email.Subject)
	slog.Info(email.Body)
}
