package healthcheck

import (
	"go-backend/pkg/models"
	"go-backend/pkg/restapi/operations"

	"github.com/go-openapi/runtime/middleware"
)

var HealthCheckHander = operations.GetPublicHealthHandlerFunc(func(_ operations.GetPublicHealthParams) middleware.Responder {
	message := "Hello"
	return &operations.GetHealthOK{Payload: &models.HealthCheck{Message: &message}}
})
