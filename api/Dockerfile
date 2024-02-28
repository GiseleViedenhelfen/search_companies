FROM golang:1.22

WORKDIR /usr/src/app/api
# RUN go install github.com/cosmtrek/air@latest
# RUN  go mod init
COPY go.mod ./
COPY . .
RUN go mod tidy
COPY entrypoint.sh /app/api/entrypoint.sh
RUN chmod +x /app/api/entrypoint.sh
CMD ["/app/api/entrypoint.sh"]