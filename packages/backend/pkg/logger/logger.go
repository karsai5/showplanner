package logger

import (
	"context"
	"fmt"
	"log/slog"
	"runtime"
	"time"

	"github.com/getsentry/sentry-go"
	"github.com/go-openapi/runtime/middleware"
)

var logger = slog.Default()

func Infof(format string, args ...any) {
	if !logger.Enabled(context.Background(), slog.LevelInfo) {
		return
	}
	var pcs [1]uintptr
	runtime.Callers(2, pcs[:]) // skip [Callers, Infof]
	r := slog.NewRecord(time.Now(), slog.LevelInfo, fmt.Sprintf(format, args...), pcs[0])
	_ = logger.Handler().Handle(context.Background(), r)
}

func Error(message string, err error) {
	if !logger.Enabled(context.Background(), slog.LevelError) {
		return
	}
	var pcs [1]uintptr
	wrappedError := fmt.Errorf("%s: %w", message, err)
	runtime.Callers(2, pcs[:]) // skip [Callers, Infof]
	r := slog.NewRecord(time.Now(), slog.LevelError, wrappedError.Error(), pcs[0])
	_ = logger.Handler().Handle(context.Background(), r)
	sentry.CaptureException(wrappedError)
}

func CreateLogErrorFunc(text string, response middleware.Responder) func(err *error) middleware.Responder {
	return func(err *error) middleware.Responder {
		if err != nil {
			logger.Error(text, *err)
		} else {
			slog.Error(text)
		}
		return response
	}
}
