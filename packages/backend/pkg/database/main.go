package database

import (
	"fmt"
	"log"
	"sync"

	"showplanner.io/pkg/config"

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

var db = GetDatabase()

func getSQLiteDatabase() *gorm.DB {
	db, err := gorm.Open(sqlite.Open("test.db"), &gorm.Config{})
	if err != nil {
		log.Fatalf("Failed to connect to database: %s", err.Error())
	}
	return db
}

func getPostgresDatabase() *gorm.DB {
	host := config.POSTGRES_HOST
	user := config.POSTGRES_USER
	database := config.POSTGRES_DB
	password := config.POSTGRES_PASSWORD
	tz := config.POSTGRES_TIMEZONE

	dsn := fmt.Sprintf("host=%s user=%s password=%s dbname=%s port=5432 sslmode=disable TimeZone=%s", host, user, password, database, tz)
	db, err := gorm.Open(postgres.Open(dsn), &gorm.Config{})
	if err != nil {
		log.Fatalf("Failed to connect to database: %s", err.Error())
	}
	return db
}

func initDB() *gorm.DB {
	var db *gorm.DB
	pg_host := config.POSTGRES_HOST
	if pg_host != "" {
		db = getPostgresDatabase()
	} else {
		db = getSQLiteDatabase()
	}

	err := db.AutoMigrate(
		&Event{},
		&Show{},
		&Availability{},
		&Person{},
		&Role{},
		&Assignment{},
		&Shadow{},
		&Media{},
		&ShowReport{},
		&ShowTimer{},
		&Invitation{},
	)
	if err != nil {
		panic("Failed to run migrations")
	}

	return db
}
