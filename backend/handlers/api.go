package handlers

import (
	"encoding/json"
	"fmt"
	"net/http"
	"time"

	"recordo-backend/config"
	"recordo-backend/models"
	"recordo-backend/services"
	"recordo-backend/store"
)

type APIHandler struct {
	cfg            *config.Config
	store          store.Store
	soulService    *services.SoulService
	kapsoService   *services.KapsoService
	paymentService *services.PaymentService
}

func NewAPIHandler(
	cfg *config.Config,
	st store.Store,
	soulSvc *services.SoulService,
	kapsoSvc *services.KapsoService,
	paySvc *services.PaymentService,
) *APIHandler {
	return &APIHandler{
		cfg:            cfg,
		store:          st,
		soulService:    soulSvc,
		kapsoService:   kapsoSvc,
		paymentService: paySvc,
	}
}

func (h *APIHandler) HealthCheck(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(map[string]interface{}{
		"status":      "healthy",
		"service":     "Recordo Backend API (Kapso & Railway Ready)",
		"timestamp":   time.Now().Format(time.RFC3339),
		"environment": h.cfg.Environment,
		"kapso_mode":  h.cfg.KapsoAPIKey != "",
	})
}

func (h *APIHandler) GetTraceability(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json")

	phone := r.URL.Query().Get("phone")
	var book *models.MemoryBook
	if phone != "" {
		b, err := h.store.GetBookByPhone(phone)
		if err == nil && b != nil {
			book = b
		}
	}
	if book == nil {
		book = h.store.GetDefaultBook()
	}

	json.NewEncoder(w).Encode(book)
}

func (h *APIHandler) SaveSoulConfig(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json")

	if r.Method != http.MethodPost {
		http.Error(w, "Method not allowed", http.StatusMethodNotAllowed)
		return
	}

	var soul models.AgentSoul
	if err := json.NewDecoder(r.Body).Decode(&soul); err != nil {
		http.Error(w, err.Error(), http.StatusBadRequest)
		return
	}

	updatedBook, err := h.store.UpdateSoulConfig(soul)
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}

	samplePrompt := h.soulService.GetSamplePrompt(soul)

	response := map[string]interface{}{
		"success":       true,
		"message":       "Configuración del Alma del Agente actualizada con éxito",
		"soul":          updatedBook.SoulConfig,
		"sample_prompt": samplePrompt,
	}

	json.NewEncoder(w).Encode(response)
}

func (h *APIHandler) CreateCheckout(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json")

	if r.Method != http.MethodPost {
		http.Error(w, "Method not allowed", http.StatusMethodNotAllowed)
		return
	}

	var req models.CheckoutRequest
	if err := json.NewDecoder(r.Body).Decode(&req); err != nil {
		http.Error(w, err.Error(), http.StatusBadRequest)
		return
	}

	res, err := h.paymentService.CreateCheckout(req)
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}

	json.NewEncoder(w).Encode(map[string]interface{}{
		"success":            true,
		"order_id":           res.OrderID,
		"gateway":            res.Gateway,
		"original_cost_mxn":  res.OriginalCost,
		"final_cost_mxn":     res.FinalCost,
		"checkout_url":       res.CheckoutURL,
		"message":            "Redirigiendo a la pasarela de pago...",
	})
}

func (h *APIHandler) HandleWhatsAppWebhook(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json")

	// Endpoint para Webhook de Kapso WhatsApp API
	if r.Method == http.MethodGet {
		mode := r.URL.Query().Get("hub.mode")
		token := r.URL.Query().Get("hub.verify_token")
		challenge := r.URL.Query().Get("hub.challenge")

		if mode == "subscribe" && token == h.cfg.KapsoWebhookSecret {
			w.WriteHeader(http.StatusOK)
			w.Write([]byte(challenge))
			return
		}
		http.Error(w, "Forbidden - Invalid Kapso Verify Token", http.StatusForbidden)
		return
	}

	if r.Method == http.MethodPost {
		payload, err := h.kapsoService.ProcessWebhook(r)
		if err != nil {
			http.Error(w, err.Error(), http.StatusBadRequest)
			return
		}

		// Registrar respuesta si se recibe un mensaje de WhatsApp
		if payload.EventType == "message_received" || payload.Message.TextBody != "" || payload.Message.AudioURL != "" {
			h.store.RecordKapsoAnswer(
				payload.FromPhone,
				payload.Message.TextBody,
				payload.Message.AudioURL,
				payload.Message.PhotoURLs,
			)
		}

		json.NewEncoder(w).Encode(map[string]interface{}{
			"status":  "received",
			"provider": "Kapso WhatsApp API",
			"event_id": payload.EventID,
		})
		return
	}

	http.Error(w, "Method not allowed", http.StatusMethodNotAllowed)
}

func (h *APIHandler) SendWhatsAppTestPrompt(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json")

	if r.Method != http.MethodPost {
		http.Error(w, "Method not allowed", http.StatusMethodNotAllowed)
		return
	}

	var req struct {
		ToPhone      string `json:"to_phone"`
		QuestionText string `json:"question_text"`
	}

	if err := json.NewDecoder(r.Body).Decode(&req); err != nil {
		http.Error(w, err.Error(), http.StatusBadRequest)
		return
	}

	book := h.store.GetDefaultBook()
	prompt := h.soulService.GenerateInterviewPrompt(book.SoulConfig, book.RecipientName, req.QuestionText)

	msgID, err := h.kapsoService.SendMessage(req.ToPhone, prompt)
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}

	json.NewEncoder(w).Encode(map[string]interface{}{
		"success":       true,
		"provider":      "Kapso WhatsApp API",
		"message_id":    msgID,
		"prompt_sent":   prompt,
		"recipient":     req.ToPhone,
	})
}

func (h *APIHandler) SubmitReview(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json")

	if r.Method != http.MethodPost {
		http.Error(w, "Method not allowed", http.StatusMethodNotAllowed)
		return
	}

	var rev models.ReviewSubmission
	if err := json.NewDecoder(r.Body).Decode(&rev); err != nil {
		http.Error(w, err.Error(), http.StatusBadRequest)
		return
	}

	rev.ID = fmt.Sprintf("REV-%d", time.Now().Unix())
	rev.DiscountCode = "RECORDO-RESEÑA-15OFF"

	if err := h.store.SaveReview(rev); err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}

	json.NewEncoder(w).Encode(map[string]interface{}{
		"success":       true,
		"message":       "¡Gracias por tu testimonio en audio/video! Código de descuento otorgado.",
		"discount_code": rev.DiscountCode,
	})
}

func (h *APIHandler) Login(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json")

	if r.Method != http.MethodPost {
		http.Error(w, "Method not allowed", http.StatusMethodNotAllowed)
		return
	}

	var req models.LoginRequest
	if err := json.NewDecoder(r.Body).Decode(&req); err != nil {
		http.Error(w, err.Error(), http.StatusBadRequest)
		return
	}

	book := h.store.GetDefaultBook()

	json.NewEncoder(w).Encode(models.AuthResponse{
		Success: true,
		Token:   fmt.Sprintf("tok_recordo_%d", time.Now().Unix()),
		Message: "Sesión iniciada con éxito en el Portal de la Familia",
		Book:    book,
	})
}

func (h *APIHandler) AddDesignFeedback(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json")

	if r.Method != http.MethodPost {
		http.Error(w, "Method not allowed", http.StatusMethodNotAllowed)
		return
	}

	var fb models.DesignFeedback
	if err := json.NewDecoder(r.Body).Decode(&fb); err != nil {
		http.Error(w, err.Error(), http.StatusBadRequest)
		return
	}

	updatedBook, err := h.store.AddDesignFeedback(fb)
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}

	json.NewEncoder(w).Encode(map[string]interface{}{
		"success": true,
		"message": "Sugerencia de diseño enviada al equipo editorial de Recordo.",
		"book":    updatedBook,
	})
}

func (h *APIHandler) ApproveForPrint(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json")

	if r.Method != http.MethodPost {
		http.Error(w, "Method not allowed", http.StatusMethodNotAllowed)
		return
	}

	var req models.PrintApprovalRequest
	if err := json.NewDecoder(r.Body).Decode(&req); err != nil {
		http.Error(w, err.Error(), http.StatusBadRequest)
		return
	}

	updatedBook, err := h.store.ApproveForPrint(req)
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}

	json.NewEncoder(w).Encode(map[string]interface{}{
		"success":      true,
		"message":      "¡Libro Aprobado! La orden ha sido enviada al taller de impresión editorial.",
		"print_status": updatedBook.PrintStatus,
		"book":         updatedBook,
	})
}


