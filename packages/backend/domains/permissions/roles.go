package permissions

import (
	"net/http"
	"strconv"

	"github.com/supertokens/supertokens-golang/recipe/userroles"
)

type role struct {
	name        string
	key         string
	permissions []string
}

func (r role) Initalise() {
	_, err := userroles.CreateNewRoleOrAddPermissions(r.key, r.permissions, nil)
	if err != nil {
		println("Error occured while inialising default permissions for '" + r.key + "': " + err.Error())
	}
}

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

var ViewEvents = ShowPermission{perm: "view-events"}
var AddEvents = ShowPermission{perm: "add-events"}

var ViewShow = Permission{perm: "view-shows"}
var AddShow = Permission{perm: "add-show"}

var Roles = []role{Admin}

var Admin = role{
	name:        "Administrator",
	key:         "admin",
	permissions: []string{ViewShow.perm, AddShow.perm},
}

func InitialiseDefaultRoles() {
	for _, role := range Roles {
		role.Initalise()
	}
}
