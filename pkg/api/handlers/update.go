package handlers

import (
	"encoding/json"

	// "fmt"
	// "log"
	"net/http"
	"strconv"

	"github.com/GiseleViedenhelfen/search_companies/pkg/api/models"
)

func UpdateMailSent(w http.ResponseWriter, r *http.Request) {
	id := r.URL.Path[len("/sent/"):]
	if id == "" {
		http.Error(w, "Some error occured while getting id", http.StatusBadRequest)
		return
	}
	idTo64, err := strconv.ParseInt(id, 10, 64)
	if err != nil {
		http.Error(w, "Some error occured while decoding id ", http.StatusBadRequest)
		return
	}
	_, err = models.UpdateMailSent(idTo64)
	resp := response(idTo64, err, w)

	w.Header().Add("Content-Type", "application/json")
	json.NewEncoder(w).Encode(resp)
}
