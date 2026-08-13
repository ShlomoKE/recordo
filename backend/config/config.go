package config

import (
	"os"
	"strings"
)

// Config almacena toda la configuración de la aplicación leída desde variables de entorno
type Config struct {
	Port                 string
	Environment          string
	DatabaseURL          string
	FrontendURL          string
	CORSAllowedOrigins   []string
	
	// Kapso WhatsApp API Config
	KapsoAPIKey          string
	KapsoPhoneNumberID   string
	KapsoWebhookSecret   string
	KapsoBaseURL         string

	// Pasarelas de Pago Config
	StripeSecretKey      string
	MercadoPagoAccessToken string
}

// LoadConfig lee las variables de entorno con valores por defecto seguros para desarrollo local y producción en Railway
func LoadConfig() *Config {
	port := getEnv("PORT", "8080")
	env := getEnv("ENVIRONMENT", "development")
	dbURL := getEnv("DATABASE_URL", "")
	frontendURL := getEnv("FRONTEND_URL", "http://localhost:5173")
	
	corsOriginsStr := getEnv("CORS_ALLOWED_ORIGINS", "http://localhost:5173,http://localhost:3000,http://127.0.0.1:5173")
	origins := strings.Split(corsOriginsStr, ",")
	for i := range origins {
		origins[i] = strings.TrimSpace(origins[i])
	}

	return &Config{
		Port:                 port,
		Environment:          env,
		DatabaseURL:          dbURL,
		FrontendURL:          frontendURL,
		CORSAllowedOrigins:   origins,
		
		KapsoAPIKey:          getEnv("KAPSO_API_KEY", ""),
		KapsoPhoneNumberID:   getEnv("KAPSO_PHONE_NUMBER_ID", ""),
		KapsoWebhookSecret:   getEnv("KAPSO_WEBHOOK_SECRET", "recordo_kapso_verify_secret"),
		KapsoBaseURL:         getEnv("KAPSO_BASE_URL", "https://api.kapso.ai"),

		StripeSecretKey:      getEnv("STRIPE_SECRET_KEY", ""),
		MercadoPagoAccessToken: getEnv("MERCADOPAGO_ACCESS_TOKEN", ""),
	}
}

func getEnv(key, fallback string) string {
	if value, exists := os.LookupEnv(key); exists && strings.TrimSpace(value) != "" {
		return strings.TrimSpace(value)
	}
	return fallback
}
