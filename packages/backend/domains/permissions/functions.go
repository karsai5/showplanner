package permissions

import (
	"errors"
	"fmt"
	"net/http"
	"strings"

	"github.com/golang-jwt/jwt/v5"
)

func HasRole(r *http.Request, role string) (bool, error) {
	roles, _, err := getRolesAndPermissions(r)
	if err != nil {
		return false, err
	}

	if contains(roles, role) {
		return true, nil
	}
	return false, nil
}

func HasPermissionOrAdmin(r *http.Request, permission string) (bool, error) {
	roles, permissions, err := getRolesAndPermissions(r)
	if err != nil {
		return false, err
	}

	if contains(roles, Admin.Key) {
		return true, nil
	}

	if contains(permissions, permission) {
		return true, nil
	}
	return false, nil
}

func getRolesAndPermissions(r *http.Request) (roles []string, permissions []string, err error) {
	tokenString := strings.ReplaceAll(r.Header.Get("Authorization"), "Bearer ", "")

	token, _ := jwt.Parse(tokenString, func(token *jwt.Token) (interface{}, error) {
		if _, ok := token.Method.(*jwt.SigningMethodHMAC); !ok {
			return nil, fmt.Errorf("unexpected signing method: %v", token.Header["alg"])
		}
		return []byte("secret key"), nil
	})

	if token == nil {
		return nil, nil, errors.New("No JWT token")
	}

	claims := token.Claims.(jwt.MapClaims)
	permissions = []string{}
	roles = []string{}

	stPerm := claims["st-perm"].(map[string]interface{})
	stRole := claims["st-role"].(map[string]interface{})

	untypedPermissions := stPerm["v"].([]interface{})
	untypedRoles := stRole["v"].([]interface{})

	for _, perm := range untypedPermissions {
		permissions = append(permissions, perm.(string))
	}

	for _, r := range untypedRoles {
		roles = append(roles, r.(string))
	}
	return roles, permissions, nil
}

func contains(s []string, e string) bool {
	for _, a := range s {
		if a == e {
			return true
		}
	}
	return false
}
