package restapi

import (
	"log"

	"showplanner.io/pkg/config"

	"github.com/getsentry/sentry-go"
)

func initSentry() {
	err := sentry.Init(sentry.ClientOptions{
		Dsn: config.SENTRY_DSN,
		// Set TracesSampleRate to 1.0 to capture 100%
		// of transactions for performance monitoring.
		// We recommend adjusting this value in production,
		EnableTracing:    true,
		TracesSampleRate: 1.0,
	})
	if err != nil {
		log.Fatalf("sentry.Init: %s", err)
	}
}
