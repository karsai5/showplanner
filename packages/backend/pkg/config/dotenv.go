package config

import (
	"log"
	"os"

	"github.com/joho/godotenv"
)

func getEnvVariable(key string, required bool) string {
	godotenv.Load(".env")
	result, ok := os.LookupEnv(key)
	if !ok && required {
		log.Fatalf("Environment variable required: " + key)
	}
	return result
}
