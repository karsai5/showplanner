FROM golang:1.21

WORKDIR /app

RUN apt update
RUN apt install -y pandoc texlive texlive-latex-extra tzdata

ENV TZ=Australia/Sydney

COPY go.mod go.sum ./

RUN go mod download

ADD cmd cmd
ADD pkg pkg

RUN CGO_ENABLED=0 GOOS=linux go build ./cmd/go-backend-server
RUN CGO_ENABLED=0 GOOS=linux go build ./cmd/go-backend-cli

COPY template.tex ./

COPY Makefile ./

EXPOSE 8080

CMD ["make", "serve-in-container"]

