package database

import (
	"fmt"
	"go-backend/utils"
	"log"
	"sync"

	"gorm.io/driver/postgres"
	"gorm.io/driver/sqlite"
	"gorm.io/gorm"
)

var lock = &sync.Mutex{}

var database *gorm.DB

func GetDatabase() *gorm.DB {
	if database == nil {
		lock.Lock()
		defer lock.Unlock()
		if database == nil {
			database = initDB()
		}
	}
	return database
}

func getSQLiteDatabase() *gorm.DB {
	db, err := gorm.Open(sqlite.Open("test.db"), &gorm.Config{})
	if err != nil {
		log.Fatalf("Failed to connect to database: %s", err.Error())
	}
	return db
}

func getPostgresDatabase() *gorm.DB {
	host := utils.GetEnvVariable("POSTGRES_HOST", true)
	user := utils.GetEnvVariable("POSTGRES_USER", true)
	database := utils.GetEnvVariable("POSTGRES_DB", true)
	password := utils.GetEnvVariable("POSTGRES_PASSWORD", true)
	tz := utils.GetEnvVariable("POSTGRES_TIMEZONE", true)

	dsn := fmt.Sprintf("host=%s user=%s password=%s dbname=%s port=5432 sslmode=disable TimeZone=%s", host, user, password, database, tz)
	db, err := gorm.Open(postgres.Open(dsn), &gorm.Config{})
	if err != nil {
		log.Fatalf("Failed to connect to database: %s", err.Error())
	}
	return db
}

func initDB() *gorm.DB {
	var db *gorm.DB
	pg_host := utils.GetEnvVariable("POSTGRES_HOST", false)
	if pg_host != "" {
		db = getPostgresDatabase()
	} else {
		db = getSQLiteDatabase()
	}

	err := db.AutoMigrate(&Event{})
	if err != nil {
		panic("Failed to migrate event")
	}

	err = db.AutoMigrate(&Show{})
	if err != nil {
		panic("Failed to migrate show")
	}

	err = db.AutoMigrate(&Availability{})
	if err != nil {
		panic("Failed to migrate availabilities")
	}

	return db
}
