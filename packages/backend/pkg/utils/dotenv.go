package utils

import (
	"log"
	"os"

	"github.com/joho/godotenv"
)

func GetEnvVariable(key string, required bool) string {
	godotenv.Load(".env")
	result, ok := os.LookupEnv(key)
	if !ok && required {
		log.Fatalf("Environment variable required: " + key)
	}
	return result
}

func IsProd() bool {
	return GetEnvVariable("APP_ENV", false) == "PROD"
}

func IsDev() bool {
	return GetEnvVariable("APP_ENV", false) != "PROD"
}
