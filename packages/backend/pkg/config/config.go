package config

var APP_ENV = getEnvVariable("APP_ENV", false)
var IsProd = APP_ENV == "PROD"
var IsDev = APP_ENV != "PROD"

// Emails
var SMTP_HOST = getEnvVariable("SMTP_HOST", true)
var SMTP_USER = getEnvVariable("SMTP_USER", true)
var SMTP_PASS = getEnvVariable("SMTP_PASS", true)

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
