FROM golang:1.19

WORKDIR /app

COPY go.mod go.sum ./

RUN go mod download

ADD cmd cmd
ADD database database 
ADD domains domains 
ADD models models 
ADD restapi restapi 
ADD utils utils 

RUN CGO_ENABLED=0 GOOS=linux go build ./cmd/go-backend-server

COPY Makefile ./

EXPOSE 8080

CMD ["make", "serve-with-wait"]

