package permissions

import (
	"net/http"
	"strconv"
)

type ShowPermission struct {
	perm string
}

func (sp ShowPermission) Permission(showId string) string {
	return "show:" + showId + ":" + sp.perm
}

func (sp ShowPermission) HasPermission(permissionHandler IPermissionsHandler, r *http.Request, showId uint) (bool, error) {
	id := strconv.Itoa(int(showId))
	return permissionHandler.HasPermission(r, sp.Permission(id))
}

type Permission struct {
	perm string
}

func (sp Permission) HasPermission(permissionsHandler IPermissionsHandler, r *http.Request) (bool, error) {
	return permissionsHandler.HasPermission(r, sp.perm)
}

func (sp Permission) Permission() string {
	return sp.perm
}
