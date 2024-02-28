package handlers

import (
	"encoding/json"
	"fmt"
	"log"
	"net/http"

	"github.com/GiseleViedenhelfen/search_companies/pkg/models"
)

func Create(w http.ResponseWriter, r *http.Request) {
	var company models.Company
	err := json.NewDecoder(r.Body).Decode(&company)
	if err != nil {
		log.Printf("Some error occured while decoding json: %v", err)
		w.WriteHeader(http.StatusBadRequest)
		return
	}
	id, err := models.Insert(company)
	resp := response(id, err, w)
	w.Header().Add("Content-Type", "application/json")
	json.NewEncoder(w).Encode(resp)
}
func response(id int64, err error, w http.ResponseWriter) (resp models.Resp) {
	switch {
	case err != nil:
		w.WriteHeader(http.StatusInternalServerError)
		resp = models.Resp{
			Status:  http.StatusInternalServerError,
			Message: fmt.Sprintf("Some error occured: %v", err),
		}
	default:
		w.WriteHeader(http.StatusCreated)
		resp = models.Resp{
			Status:  http.StatusCreated,
			Message: "success!",
		}
	}
	return
}
