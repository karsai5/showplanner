package permissions

import (
	"github.com/supertokens/supertokens-golang/recipe/userroles"
)

type GeneralRole struct {
	Name        string
	Key         string
	Permissions []string
}

func (r GeneralRole) Initialise() {
	_, err := userroles.CreateNewRoleOrAddPermissions(r.Key, r.Permissions, nil)
	if err != nil {
		println("Error occured while inialising default permissions for '" + r.Key + "': " + err.Error())
	}
}

type ShowRole struct {
	Name        string
	key         string
	Permissions []ShowPermission
}

func (r ShowRole) Key(showId string) string {
	return "show:" + showId + ":" + r.key
}

func (r ShowRole) Initialise(showId string) {
	perms := []string{}
	key := r.Key(showId)
	for _, v := range r.Permissions {
		perms = append(perms, v.Permission(showId))
	}
	_, err := userroles.CreateNewRoleOrAddPermissions(key, perms, nil)
	if err != nil {
		println("Error occured while inialising default permissions for '" + key + "': " + err.Error())
	}
}
