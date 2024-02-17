package routes

import (
	"net/http"

	"github.com/GiseleViedenhelfen/search_companies/pkg/api/handlers"
)

func handleRoot(w http.ResponseWriter, r *http.Request) {
	switch r.Method {
	case "GET":
		handlers.List(w, r)
	case "POST":
		handlers.Create(w, r)
	default:
		http.Error(w, "Method not allowed", http.StatusMethodNotAllowed)
	}
}

func handleSent(w http.ResponseWriter, r *http.Request) {
	switch r.Method {
	case "GET":
		handlers.NotSentList(w, r)
	case "PATCH":
		handlers.UpdateMailSent(w, r)
	default:
		http.Error(w, "Method not allowed", http.StatusMethodNotAllowed)
	}
}

func HandleRoutes(router  *http.ServeMux) {
	router.HandleFunc("/", handleRoot)
	router.HandleFunc("/sent/", handleSent)
}
	


