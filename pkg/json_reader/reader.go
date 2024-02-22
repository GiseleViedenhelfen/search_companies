package jsonreader

import (
	"encoding/json"
	"log"
	"os"

	"github.com/GiseleViedenhelfen/search_companies/pkg/models"
)

func Reader()(companies []models.Company, err error) {
	filePath := "./data.json"

	data, err := os.ReadFile(filePath)
	if err != nil {
		log.Fatalf("Error reading file: %v", err)
		return
	}
	err = json.Unmarshal(data, &companies)
	if err != nil {
		log.Fatalf("Error unmarshalling JSON: %v", err)
		return 
	}
	return 
}
