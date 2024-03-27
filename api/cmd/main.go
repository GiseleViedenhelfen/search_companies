package main

import (
	"log"

	"github.com/GiseleViedenhelfen/search_companies/pkg/db"
	jsonreader "github.com/GiseleViedenhelfen/search_companies/pkg/json_reader"
	"github.com/GiseleViedenhelfen/search_companies/pkg/routes"
	"github.com/joho/godotenv"
)

func main() {
	err := godotenv.Load()
	if err != nil {
		log.Fatalf("Some error occured while getting .env file. Err: %s", err)

	}
	err = db.CreateInitDB()
	if err != nil {
		log.Fatalf("Some error occured while creating database. Err: %s", err)
	}
	data, err := jsonreader.Reader()
	if err != nil {
		log.Fatalln("Some error occured getting data from json file")
	}
	jsonreader.InsertData(data)
	routes.ApiRunner()
}
