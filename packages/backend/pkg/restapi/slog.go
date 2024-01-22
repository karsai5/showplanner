package restapi

import (
	"log/slog"

	slogsentry "github.com/samber/slog-sentry"
	"showplanner.io/pkg/config"
)

func setupSlog() {
	logger := slog.New(slogsentry.Option{Level: getLogLevel()}.NewSentryHandler())
	slog.SetDefault(logger)
}

func getLogLevel() slog.Level {
	switch level := config.LOG_LEVEL; level {
	case "DEBUG":
		return slog.LevelDebug
	case "INFO":
		return slog.LevelInfo
	case "WARN":
		return slog.LevelWarn
	case "ERROR":
		return slog.LevelError
	default:
		return slog.LevelInfo
	}
}
