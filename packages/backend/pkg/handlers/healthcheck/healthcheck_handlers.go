package healthcheck

import (
	"go-backend/pkg/models"
	"go-backend/pkg/restapi/operations"

	"github.com/go-openapi/runtime/middleware"
)

var HealthCheckHander = operations.GetPublicHealthHandlerFunc(func(_ operations.GetPublicHealthParams) middleware.Responder {
	message := "Hello"
	return &operations.GetPublicHealthOK{Payload: &models.HealthCheck{Message: &message}}
})
