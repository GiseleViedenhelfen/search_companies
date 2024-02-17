package main

import (
	"fmt"
	"log"
	"net/http"
	"os"

	"github.com/GiseleViedenhelfen/search_companies/cmd/routes"
	db "github.com/GiseleViedenhelfen/search_companies/pkg/api/db"
	"github.com/joho/godotenv"
)


func main() {
	err := godotenv.Load()
	if err != nil {
		log.Fatalf("Some error occured while getting .env file. Err: %s", err)
		
	}
	p := os.Getenv("PORT")
	err = db.CreateInitDB()
	if err != nil {
		log.Fatalf("Some error occured while creating database. Err: %s", err)
	}
	router := http.NewServeMux()
	routes.HandleRoutes(router)

	server := http.Server{
		Addr:    fmt.Sprintf(":%v", p),
		Handler: router,
	}

	log.Printf("Server starting on port %v\n", p)
	log.Fatal(server.ListenAndServe())
}
