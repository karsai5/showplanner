package middleware

import (
	"net/http"

	"github.com/getsentry/sentry-go"
)

func ErrorMiddleware(handlerToWrap http.Handler) *Error {
	return &Error{handlerToWrap}
}

type Error struct {
	handler http.Handler
}

func (ve *Error) ServeHTTP(w http.ResponseWriter, r *http.Request) {
	defer sentry.Recover()

	ve.handler.ServeHTTP(w, r)
}
