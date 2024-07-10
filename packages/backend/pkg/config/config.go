package config

import (
	"log"
	"os"
	"strings"

	"github.com/joho/godotenv"
)

var IsTest = strings.HasSuffix(os.Args[0], ".test")

func getEnvVariable(key string, required bool) string {
	godotenv.Load(".env")
	result, ok := os.LookupEnv(key)
	if !ok && required && !IsTest {
		log.Fatalf("Environment variable required: " + key)
	}
	return result
}

var APP_ENV = getEnvVariable("APP_ENV", false)
var IsProd = APP_ENV == "PROD"
var IsDev = APP_ENV != "PROD"

// Emails
var SMTP_HOST = getEnvVariable("SMTP_HOST", IsProd)
var SMTP_USER = getEnvVariable("SMTP_USER", IsProd)
var SMTP_PASS = getEnvVariable("SMTP_PASS", IsProd)

var AWS_ACCESS_KEY_ID = getEnvVariable("AWS_ACCESS_KEY_ID", IsProd)
var AWS_SECRET_ACCESS_KEY = getEnvVariable("AWS_SECRET_ACCESS_KEY", IsProd)
var AWS_BUCKET = getEnvVariable("AWS_BUCKET", true)

var KAFKA_URL = getEnvVariable("KAFKA_URL", true)

// Database
var POSTGRES_HOST = getEnvVariable("POSTGRES_HOST", false)
var POSTGRES_USER = getEnvVariable("POSTGRES_USER", true)
var POSTGRES_DB = getEnvVariable("POSTGRES_DB", true)
var POSTGRES_PASSWORD = getEnvVariable("POSTGRES_PASSWORD", true)
var POSTGRES_TIMEZONE = getEnvVariable("POSTGRES_TIMEZONE", true)

// Supertokens
var API_KEY = getEnvVariable("API_KEY", true)
var SUPERTOKENS_URL = getEnvVariable("SUPERTOKENS_URL", true)
var API_URL = getEnvVariable("API_URL", true)

// Logins
var GOOGLE_ID = getEnvVariable("GOOGLE_ID", false)
var GOOGLE_SECRET = getEnvVariable("GOOGLE_SECRET", false)

// Sentry
var SENTRY_DSN = getEnvVariable("SENTRY_DSN", IsProd)

var FRONTEND_URL = getEnvVariable("FRONTEND_URL", true)
var ADMIN_EMAIL = getEnvVariable("ADMIN_EMAIL", true)
var COOKIE_DOMAIN = getEnvVariable("COOKIE_DOMAIN", true)
var LOG_LEVEL = getEnvVariable("LOG_LEVEL", false)
