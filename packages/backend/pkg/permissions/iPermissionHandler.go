package permissions

import (
	"net/http"

	uuid "github.com/satori/go.uuid"
)

//go:generate mockery --name IPermissionsHandler
type IPermissionsHandler interface {
	HasRole(r *http.Request, role string) (bool, error)
	GetUserId(r *http.Request) (uuid.UUID, error)
	HasPermission(r *http.Request, permission string) (bool, error)
}