package middleware

import (
	"fmt"
	"log/slog"
	"net/http"
	"time"

	"github.com/getsentry/sentry-go"
)

func LogsMiddleware(handlerToWrap http.Handler) *Logs {
	return &Logs{handlerToWrap}
}

type Logs struct {
	handler http.Handler
}

func (ve *Logs) ServeHTTP(w http.ResponseWriter, r *http.Request) {
	start := time.Now()
	ctx := r.Context()
	hub := sentry.GetHubFromContext(ctx)
	if hub == nil {
		// Check the concurrency guide for more details: https://docs.sentry.io/platforms/go/concurrency/
		hub = sentry.CurrentHub().Clone()
		ctx = sentry.SetHubOnContext(ctx, hub)
	}

	options := []sentry.SpanOption{
		// Set the OP based on values from https://develop.sentry.dev/sdk/performance/span-operations/
		sentry.WithOpName("http.server"),
		sentry.ContinueFromRequest(r),
		sentry.WithTransactionSource(sentry.SourceURL),
	}

	transaction := sentry.StartTransaction(ctx,
		fmt.Sprintf("%s %s", r.Method, r.URL.Path),
		options...,
	)
	defer transaction.Finish()

	ve.handler.ServeHTTP(w, r.WithContext(transaction.Context()))

	slog.Info(fmt.Sprintf("%s %s %v", r.Method, r.URL.Path, time.Since(start)))
}
