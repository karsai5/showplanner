package permissions

import (
	"errors"
	"net/http"

	"github.com/supertokens/supertokens-golang/recipe/session"
	"github.com/supertokens/supertokens-golang/recipe/session/claims"
	"github.com/supertokens/supertokens-golang/recipe/userroles/userrolesclaims"
)

func HasRole(r *http.Request, role string) (bool, error) {
	sessionContainer := session.GetSessionFromRequestContext(r.Context())

	if sessionContainer == nil {
		return false, errors.New("Cannot find session")
	}

	err := sessionContainer.AssertClaims([]claims.SessionClaimValidator{
		userrolesclaims.UserRoleClaimValidators.Includes(role, nil, nil),
	})

	if err != nil {
		return false, nil
	}

	return true, nil
}

func UserId(r *http.Request) string {
	sessionContainer := session.GetSessionFromRequestContext(r.Context())
	return sessionContainer.GetUserID()
}

func GetUser(r *http.Request) string {
	sessionContainer := session.GetSessionFromRequestContext(r.Context())
	return sessionContainer.GetUserID()
}

func HasPermission(r *http.Request, permission string) (bool, error) {
	sessionContainer := session.GetSessionFromRequestContext(r.Context())

	if sessionContainer == nil {
		return false, errors.New("Cannot find session")
	}

	err := sessionContainer.AssertClaims([]claims.SessionClaimValidator{
		userrolesclaims.PermissionClaimValidators.Includes(permission, nil, nil),
	})

	if err != nil {
		return false, nil
	}

	return true, nil
}
