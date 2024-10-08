package permissions

import (
	"errors"
	"fmt"
	"net/http"

	uuid "github.com/satori/go.uuid"
	"github.com/supertokens/supertokens-golang/recipe/session"
	"github.com/supertokens/supertokens-golang/recipe/session/claims"
	"github.com/supertokens/supertokens-golang/recipe/userroles/userrolesclaims"
)

// Checks that all methods are implemented
var _ = IPermissionsHandler(&SupertokensPermissionsHandler{})

type SupertokensPermissionsHandler struct {
}

// GetUserId implements IPermissionsHandler.
func (s *SupertokensPermissionsHandler) GetUserId(r *http.Request) (uuid.UUID, error) {
	sessionContainer := session.GetSessionFromRequestContext(r.Context())
	if sessionContainer == nil {
		return uuid.UUID{}, fmt.Errorf("Could not get session container from request")
	}
	userId, err := uuid.FromString(sessionContainer.GetUserID())
	if err != nil {
		return uuid.UUID{}, fmt.Errorf("While getting userId from request: %w", err)
	}
	return userId, nil
}

// HasPermission implements IPermissionsHandler.
func (s *SupertokensPermissionsHandler) HasPermission(r *http.Request, permission string) (bool, error) {
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

// HasRole implements IPermissionsHandler.
func (s *SupertokensPermissionsHandler) HasRole(r *http.Request, role string) (bool, error) {
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
