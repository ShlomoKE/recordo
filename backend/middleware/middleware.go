package middleware

import (
	"log"
	"net/http"
	"strings"
	"time"

	"recordo-backend/config"
)

// DynamicCORSMiddleware gestiona cabeceras CORS guiadas por la configuración
func DynamicCORSMiddleware(cfg *config.Config, next http.Handler) http.Handler {
	return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		origin := r.Header.Get("Origin")
		allowOrigin := "*"

		if origin != "" {
			for _, allowed := range cfg.CORSAllowedOrigins {
				if allowed == "*" || strings.EqualFold(allowed, origin) {
					allowOrigin = origin
					break
				}
			}
		}

		w.Header().Set("Access-Control-Allow-Origin", allowOrigin)
		w.Header().Set("Access-Control-Allow-Methods", "GET, POST, OPTIONS, PUT, DELETE")
		w.Header().Set("Access-Control-Allow-Headers", "Content-Type, Authorization, X-Requested-With")

		if r.Method == http.MethodOptions {
			w.WriteHeader(http.StatusOK)
			return
		}

		next.ServeHTTP(w, r)
	})
}

// RequestLogger logs de tiempo de ejecución y método HTTP
func RequestLogger(next http.Handler) http.Handler {
	return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		start := time.Now()
		next.ServeHTTP(w, r)
		log.Printf("📡 %s %s - %v", r.Method, r.URL.Path, time.Since(start))
	})
}
