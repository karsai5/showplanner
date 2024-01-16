watch:
	nodemon -e go --signal SIGTERM --exec 'make' build-and-serve

watch-swagger:
	nodemon -e yaml --exec 'make' generate

generate:
	swagger validate openapi.yaml
	swagger generate server -f openapi.yaml -A go-backend -P models.Principal

build: build-cli build-server

build-server:
	go build ./cmd/go-backend-server
build-cli:
	go build ./cmd/go-backend-cli

serve:
	./go-backend-server --host localhost --port 8080

test:
	go test ./...

serve-with-wait:
	sleep 5 
	make serve

lint:
	golangci-lint run

build-and-serve: build serve
	make build
	make serve

serve-swagger:
	swagger validate openapi.yaml
	swagger serve --flavor=swagger openapi.yaml

develop:
	concurrently "make watch-swagger" "make watch" "docker compose up"
