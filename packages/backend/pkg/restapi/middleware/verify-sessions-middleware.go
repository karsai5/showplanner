package middleware

import (
	"net/http"
	"regexp"

	"github.com/supertokens/supertokens-golang/recipe/session"
)

func VerifiedEndpointHandlerMiddleware(handlerToWrap http.Handler) *VerifiedEndpoint {
	return &VerifiedEndpoint{handlerToWrap}
}

type VerifiedEndpoint struct {
	handler http.Handler
}

// ServeHTTP handles the request by passing it to the real
// handler and logging the request details
func (ve *VerifiedEndpoint) ServeHTTP(w http.ResponseWriter, r *http.Request) {
	publicEndpoint, err := regexp.Match(`^/v1/public.*$`, []byte(r.URL.Path))
	if err != nil {
		panic("Error with regex: " + err.Error())
	}

	if !publicEndpoint {
		session.VerifySession(nil, ve.handler.ServeHTTP).ServeHTTP(w, r)
	} else {
		ve.handler.ServeHTTP(w, r)
	}
}
