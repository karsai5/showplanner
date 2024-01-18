package middleware

import (
	"log"
	"net/http"
	"time"
)

func LogsMiddleware(handlerToWrap http.Handler) *Logs {
	return &Logs{handlerToWrap}
}

type Logs struct {
	handler http.Handler
}

func (ve *Logs) ServeHTTP(w http.ResponseWriter, r *http.Request) {
	start := time.Now()

	ve.handler.ServeHTTP(w, r)

	log.Printf("%s %s %v", r.Method, r.URL.Path, time.Since(start))
}
