watch:
	nodemon -e go --signal SIGTERM --exec 'make build-and-serve || exit 1'

watch-test:
	nodemon -e go --signal SIGTERM --exec 'make test || exit 1'

watch-swagger:
	nodemon -e yaml --exec 'make' generate

generate:
	rm -rf pkg/restapi/dto/*_d_t_o.go pkg/restapi/operations
	swagger generate server -f ../openapi/openapi.yaml -A go-backend -P models.Principal --model-package="pkg/restapi/dtos" --server-package="pkg/restapi"

generate-mocks:
	mockery

build: build-cli build-server

build-image:
	docker build --platform="linux/amd64" -t karsai5/showplanner-backend:latest .
publish: build-image
	docker push karsai5/showplanner-backend:latest

build-server:
	go build ./cmd/go-backend-server || exit 1
build-cli:
	go build ./cmd/go-backend-cli || exit 1

serve:
	./go-backend-server --host localhost --port 8080

serve-in-container:
	./go-backend-server --host '' --port 8080

test:
	go test ./...

lint:
	golangci-lint run

build-and-serve: build serve
	make build
	make serve

develop:
	concurrently "make watch-swagger" "make watch" "docker compose up"
