package restapi

import (
	"log"

	"github.com/newrelic/go-agent/v3/newrelic"
	"showplanner.io/pkg/config"
)

func initNewrelic() {
	if config.IsProd {
		_, err := newrelic.NewApplication(
			newrelic.ConfigAppName("ShowPlanner backend"),
			newrelic.ConfigLicense(config.NEWRELIC_LICENSE),
			newrelic.ConfigAppLogForwardingEnabled(true),
		)

		if err != nil {
			log.Fatalf("newrelic.Init: %s", err)
		}
	}
}
