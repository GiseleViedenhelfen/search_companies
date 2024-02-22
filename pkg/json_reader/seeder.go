package jsonreader

import (
	"fmt"

	"github.com/GiseleViedenhelfen/search_companies/pkg/models"
)

func InsertData(companies []models.Company) {
	for _, v := range companies {
		_, err :=	models.Insert(v)
		if err != nil {
			fmt.Println("error", err)
		}
	}
}