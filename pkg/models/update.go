package models

import (
	"fmt"

	"github.com/GiseleViedenhelfen/search_companies/pkg/db"
)

func UpdateMailSent(id int64) (int64, error) {
	conn, err := db.OpenConnection()
	if err != nil {
		return 0, err
	}
	_, err = Get(id)
	if err != nil {
		return 0, err
	}
	query := fmt.Sprintf("UPDATE companies SET mails_sent = mails_sent + 1 where id=%v", id)
	res, err := conn.Exec(query)
	if err != nil {
		return 0, err
	}
	return res.RowsAffected()
}
