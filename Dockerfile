FROM golang:1.21.6

WORKDIR /usr/src/app
COPY go.mod ./
RUN go mod tidy && go install github.com/cosmtrek/air@latest
COPY . .

CMD ["air", "cmd/main.go", "-b", "0.0.0.0"]
