package middleware

import (
	"net/http"

	"github.com/getsentry/sentry-go"
	"showplanner.io/pkg/permissions"
)

func SentryUserMiddleware(handlerToWrap http.Handler) *SentryUser {
	return &SentryUser{handlerToWrap}
}

type SentryUser struct {
	handler http.Handler
}

func (ve *SentryUser) ServeHTTP(w http.ResponseWriter, r *http.Request) {
	id, err := permissions.GetUserId(r)
	if err == nil {
		sentry.ConfigureScope(func(scope *sentry.Scope) {
			scope.SetUser(sentry.User{IPAddress: r.RemoteAddr})
		})
	}

	sentry.ConfigureScope(func(scope *sentry.Scope) {
		scope.SetUser(sentry.User{
			IPAddress: r.RemoteAddr,
			ID:        id.String(),
		})
	})
	ve.handler.ServeHTTP(w, r)
}
