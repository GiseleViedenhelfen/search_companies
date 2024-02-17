package models

import (
	"fmt"

	"github.com/GiseleViedenhelfen/search_companies/pkg/api/db"
)

func Insert(company Company) (id int64, err error) {
	conn, err := db.OpenConnection()
	if err != nil {
			return
	}
	defer conn.Close()
	mail, err := IsEmailNew(company.Mail)
	if err != nil {
			return
	}
	if mail > 0 {
			return id, fmt.Errorf("email %s already exists", company.Mail)
	}
	stmt, err := conn.Prepare(`INSERT INTO companies
			(mail, cnpj, corporate_name, main_activity, registered_capital, legal_form, phone)
			VALUES ( ?, ?, ?, ?, ?, ?, ?)`,
	)

	if err != nil {
			return
	}
	defer stmt.Close()
	result, err := stmt.Exec(company.Mail, company.Cnpj,company.CorporateName,
		company.MainActivity, company.RegisteredCapital, company.LegalForm, company.Phone)
	if err != nil {
			return
	}
	id, err = result.LastInsertId()
	if err != nil {
			return
	}
	return
}
