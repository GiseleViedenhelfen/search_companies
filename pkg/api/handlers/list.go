package handlers

import (
	"encoding/json"
	"log"
	"net/http"

	"github.com/GiseleViedenhelfen/search_companies/pkg/api/models"
)

func List(w http.ResponseWriter, r *http.Request) {
	companies, err := models.List()
	if err != nil {
		log.Printf("Some error occured getting companies aaaaaaaaa: %v", err)
	}
	w.Header().Add("Content-Type", "application/json")
	json.NewEncoder(w).Encode(companies)
}
func NotSentList(w http.ResponseWriter, r *http.Request) {
	companies, err := models.NotSentList()
	if err != nil {
		log.Printf("Some error occured getting companies: %v", err)
	}
	w.Header().Add("Content-Type", "application/json")
	json.NewEncoder(w).Encode(companies)
}