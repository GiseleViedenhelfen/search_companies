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
		"root:%s@tcp(mail_database:%s)/", os.Getenv("DB_ROOTPASS"),
		os.Getenv("DB_PORT"),
	)
	fmt.Println(dns)
	conn, err := sql.Open("mysql", dns)
	if err != nil {
		log.Fatalln("Some error occured while creating connection", err)
	}
	queries := []string{"ALTER USER 'root'@'localhost'",
		fmt.Sprintf("GRANT ALL PRIVILEGES ON *.* TO %s;", os.Getenv("DB_USER")),
		fmt.Sprintf("CREATE DATABASE IF NOT EXISTS %s;", os.Getenv("DB_NAME")),
		fmt.Sprintf("USE %s;", os.Getenv("DB_NAME")),
		`CREATE TABLE IF NOT EXISTS todos (
			id  int not null AUTO_INCREMENT,
			mail varchar(255) not null,
			cnpj varchar(255) not null,
			subscribed int default 0,
			corporateName varchar(255) default null,
			mainActivity varchar(255) default null,
			legalForm varchar(255) default null,
			phone varchar(255) default null,
			PRIMARY KEY (mail))`,
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
		"%s:%s@tcp(mail_database:%s)/%s", os.Getenv("DB_USER"), os.Getenv("DB_PASSWORD"),
		os.Getenv("DB_PORT"), os.Getenv("DB_NAME"),
	)
	conn, err = sql.Open("mysql", dns)
	if err != nil {
		log.Fatalln("something went wrong while creating connection", err)
	}
	err = conn.Ping()
	return conn, err
}
