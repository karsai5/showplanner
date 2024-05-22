generate: validate generate-backend generate-frontend

generate-backend:
	(cd ../backend; make generate)

generate-frontend:
	(cd ../frontend; yarn generate)

validate:
	swagger validate openapi.yaml

serve: validate
	swagger serve --flavor=swagger openapi.yaml

watch:
	nodemon -e yaml --exec 'make' generate
