package middleware

import (
	"net/http"
	"strings"

	"showplanner.io/pkg/config"

	"github.com/supertokens/supertokens-golang/supertokens"
)

func CorsMiddleware(next http.Handler) http.Handler {
	return http.HandlerFunc(func(writer http.ResponseWriter, r *http.Request) {
		writer.Header().Set("Access-Control-Allow-Origin", config.FRONTEND_URL)
		writer.Header().Set("Access-Control-Allow-Credentials", "true")
		writer.Header().Set("Access-Control-Allow-Methods", "GET, POST, OPTIONS, PUT, DELETE")
		if r.Method == "OPTIONS" {
			// we add content-type + other headers used by SuperTokens
			writer.Header().Set("Access-Control-Allow-Headers",
				strings.Join(append([]string{"Content-Type"},
					supertokens.GetAllCORSHeaders()...), ","))
			writer.Write([]byte(""))
		} else {
			next.ServeHTTP(writer, r)
		}
	})
}
