package main

import (
	"fmt"
	"log"

	jsonreader "github.com/GiseleViedenhelfen/search_companies/pkg/json_reader"
	"github.com/GiseleViedenhelfen/search_companies/pkg/routes"
)

func main() {
	data, err := jsonreader.Reader()
	if err != nil {	
		log.Fatalln("Some error occured getting data from json file")
	}
	jsonreader.InsertData(data)
	routes.ApiRunner()
	fmt.Println("texto")
}
