package database

import (
	"sync"

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

func initDB() *gorm.DB {
	db, err := gorm.Open(sqlite.Open("test.db"), &gorm.Config{})
	if err != nil {
		panic("failed to connect to database")
	}

	err = db.AutoMigrate(&Event{})
	if err != nil {
		panic("Failed to migrate event")
	}

	err = db.AutoMigrate(&Show{})
	if err != nil {
		panic("Failed to migrate show")
	}

	return db
}
