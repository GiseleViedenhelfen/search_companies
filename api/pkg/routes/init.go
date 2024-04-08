package routes

import (
	"fmt"
	"log"
	"net/http"
	"os"
	"github.com/joho/godotenv"
)


func ApiRunner() {
	err := godotenv.Load()
	if err != nil {
		log.Fatalf("Some error occured while getting .env file. Err: %s", err)
	}
	p := os.Getenv("PORT")
	router := http.NewServeMux()
	HandleRoutes(router)

	server := http.Server{
		Addr:    fmt.Sprintf(":%v", p),
		Handler: router,
	}
	log.Printf("Server starting on port %v\n", p)
	log.Fatal(server.ListenAndServe())
}
