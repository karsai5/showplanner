package restapi

import (
	"go-backend/pkg/utils"
	"log"

	"github.com/getsentry/sentry-go"
)

func initSentry() {
	err := sentry.Init(sentry.ClientOptions{
		Dsn: utils.GetEnvVariable("SENTRY_DSN", utils.IsProd()),
		// Set TracesSampleRate to 1.0 to capture 100%
		// of transactions for performance monitoring.
		// We recommend adjusting this value in production,
		TracesSampleRate: 1.0,
	})
	if err != nil {
		log.Fatalf("sentry.Init: %s", err)
	}
}
