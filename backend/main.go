package main

import (
	"fmt"
	"log"
	"net/http"

	"recordo-backend/config"
	"recordo-backend/handlers"
	"recordo-backend/middleware"
	"recordo-backend/services"
	"recordo-backend/store"
)

func main() {
	// 1. Cargar Configuración guiada por variables de entorno
	cfg := config.LoadConfig()

	// 2. Inicializar Almacenamiento (Thread-safe MemoryStore / DB Hook)
	st := store.NewMemoryStore(cfg)

	// 3. Inicializar Servicios
	soulSvc := services.NewSoulService()
	kapsoSvc := services.NewKapsoService(cfg)
	paymentSvc := services.NewPaymentService(cfg)

	// 4. Inicializar Handlers de la API
	api := handlers.NewAPIHandler(cfg, st, soulSvc, kapsoSvc, paymentSvc)

	// 5. Configurar Enrutador Multiplexor HTTP
	mux := http.NewServeMux()

	// Rutas públicas de la API
	mux.HandleFunc("/api/health", api.HealthCheck)
	mux.HandleFunc("/api/traceability", api.GetTraceability)
	mux.HandleFunc("/api/soul/config", api.SaveSoulConfig)
	mux.HandleFunc("/api/payments/checkout", api.CreateCheckout)
	mux.HandleFunc("/api/whatsapp/webhook", api.HandleWhatsAppWebhook)
	mux.HandleFunc("/api/whatsapp/send-prompt", api.SendWhatsAppTestPrompt)
	mux.HandleFunc("/api/reviews", api.SubmitReview)
	mux.HandleFunc("/api/auth/login", api.Login)
	mux.HandleFunc("/api/user/design-feedback", api.AddDesignFeedback)
	mux.HandleFunc("/api/user/approve-print", api.ApproveForPrint)



	// 6. Aplicar Middlewares de CORS Dinámico y Logger
	handlerWithMiddleware := middleware.DynamicCORSMiddleware(cfg, middleware.RequestLogger(mux))

	log.Printf("🚀 Servidor Backend Recordo iniciado en el puerto :%s", cfg.Port)
	log.Printf("📱 Proveedor WhatsApp API: KAPSO (Modo Activo: %t)", cfg.KapsoAPIKey != "")
	log.Printf("📌 Health Check URL: http://localhost:%s/api/health", cfg.Port)

	if err := http.ListenAndServe(fmt.Sprintf(":%s", cfg.Port), handlerWithMiddleware); err != nil {
		log.Fatalf("Fatal: Error al iniciar el servidor backend: %v", err)
	}
}
