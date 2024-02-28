package models

type Company struct {
	Id                int `json:"id"`
	Mail              string    `json:"mail"`
	Cnpj              string    `json:"cnpj"`
	Subscribed        int       `json:"subscribed"`
	MailsSent         int       `json:"mails_sent"`
	CorporateName     string    `json:"corporate_name"`
	MainActivity      string    `json:"main_activity"`
	LegalForm         string    `json:"legal_form"`
	Phone             string    `json:"phone"`
	RegisteredCapital string    `json:"registered_capital"`
}
type Resp struct {
	Status  int
	Message string
}
