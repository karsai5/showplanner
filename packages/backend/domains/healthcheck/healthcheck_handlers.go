package healthcheck

import (
	"go-backend/models"
	"go-backend/restapi/operations"

	"github.com/go-openapi/runtime/middleware"
)

var HealthCheckHander = operations.GetPublicHealthHandlerFunc(func(_ operations.GetPublicHealthParams) middleware.Responder {
	message := "Hello"
	return &operations.GetHealthOK{Payload: &models.HealthCheck{Message: &message}}
})
