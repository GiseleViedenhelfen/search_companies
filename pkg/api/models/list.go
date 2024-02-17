package models

import (
	"fmt"
	"strings"

	"github.com/GiseleViedenhelfen/search_companies/pkg/api/db"
)

func NotSentList() (companies []Company, err error) {
	companies, err = genericList("SELECT * FROM companies where mails_sent = 0")
	return
}
func List() (companies []Company, err error) {
	companies, err = genericList("SELECT * FROM companies")
	return
}
func Get(id int64) (company []Company, err error) {
	query := fmt.Sprintf(`SELECT * FROM companies WHERE id=%d`, id)
	company, err = genericList(query)
	return
	
}
func IsEmailNew(email string) (companies int, err error) {
	email = strings.ToLower(email)
	query := fmt.Sprintf("SELECT * FROM companies where mail = '%s'", email)
	response, err := genericList(query)

	if err != nil {
		return
	}
	return len(response), err
}
func genericList(query string) (companies []Company, err error) {
	conn, err := db.OpenConnection()
	if err != nil {
		return
	}
	defer conn.Close()
	stmt, err := conn.Prepare(query)
	if err != nil {
		return
	}
	defer stmt.Close()
	rows, err := conn.Query(query)
	for rows.Next() {
		var company Company
		err = rows.Scan(
			&company.Id, &company.Mail, &company.Cnpj, &company.Subscribed, &company.MailsSent,
			&company.CorporateName, &company.MainActivity, &company.LegalForm,
			&company.Phone, &company.RegisteredCapital,
		)
		if err != nil {
			continue
		}
		companies = append(companies, company)
	}
	return
}
