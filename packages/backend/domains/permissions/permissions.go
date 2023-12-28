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

func (sp ShowPermission) HasPermission(showId uint, r *http.Request) (bool, error) {
	id := strconv.Itoa(int(showId))
	return HasPermissionOrAdmin(r, sp.Permission(id))
}

type Permission struct {
	perm string
}

func (sp Permission) HasPermission(r *http.Request) (bool, error) {
	return HasPermissionOrAdmin(r, sp.perm)
}

func (sp Permission) Permission() string {
	return sp.perm
}
