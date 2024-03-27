package db

import (
	"database/sql"
	"fmt"
	"log"
	"os"

	_ "github.com/go-sql-driver/mysql"
)

func CreateInitDB() (err error) {
	dns := fmt.Sprintf(
		"root:%s@tcp(172.17.0.2:%s)/", os.Getenv("DB_ROOTPASS"),
		os.Getenv("DB_PORT"),
	)
	conn, err := sql.Open("mysql", dns)
	if err != nil {
		log.Fatalln("Some error occured while creating connection", err)
	}
	queries := []string{
		"ALTER USER 'root'@'localhost'",
		fmt.Sprintf("GRANT ALL PRIVILEGES ON *.* TO %s;", os.Getenv("DB_USER")),
		fmt.Sprintf("CREATE DATABASE IF NOT EXISTS %s;", os.Getenv("DB_NAME")),
		fmt.Sprintf("USE %s;", os.Getenv("DB_NAME")),
		`CREATE TABLE IF NOT EXISTS companies (
			id  int AUTO_INCREMENT,
			mail varchar(255) not null,
			cnpj varchar(255) not null,
			subscribed int default 1,
			mails_sent int default 0,
			corporate_name varchar(255) default null,
			main_activity varchar(255) default null,
			legal_form varchar(255) default null,
			phone varchar(255) default null,
			registered_capital varchar(255) default null,
			PRIMARY KEY (id))`,
	}
	for _, v := range queries {
		execQueries(v, conn)

	}
	return
}
func execQueries(query string, conn *sql.DB) (err error) {
	_, err = conn.Exec(query)
	if err != nil {
		res := "Some error occured while executing query:" + query
		log.Fatalln(res, err)
		return
	}
	return
}
func OpenConnection() (conn *sql.DB, err error) {

	dns := fmt.Sprintf(
		"%s:%s@tcp(172.17.0.2:%s)/%s", os.Getenv("DB_USER"), os.Getenv("DB_PASSWORD"),
		os.Getenv("DB_PORT"), os.Getenv("DB_NAME"),
	)
	conn, err = sql.Open("mysql", dns)
	if err != nil {
		log.Fatalln("something went wrong while creating connection", err)
	}
	err = conn.Ping()
	return conn, err
}
