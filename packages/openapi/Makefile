generate: validate
	(cd ../backend; make generate)
	(cd ../frontend; yarn generate)

validate:
	swagger validate openapi.yaml

serve: validate
	swagger serve --flavor=swagger openapi.yaml
