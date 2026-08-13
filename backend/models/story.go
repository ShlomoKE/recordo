package models

import "time"

// SoulTone define el tono narrativo del agente entrevistador por WhatsApp
type SoulTone string

const (
	SoulPrimeraPersona  SoulTone = "primera_persona"   // "Yo crecí en Michoacán..."
	SoulTerceraPersona SoulTone = "tercera_persona"  // "Don Roberto nació en 1948..."
	SoulCalidoMexicano  SoulTone = "calido_mexicano"   // Estilo entrañable y hogareño
	SoulCronica        SoulTone = "cronica_periodistica" // Enfoque histórico y detallado
)

// AgentSoul representa la configuración de la personalidad de la IA entrevistadora
type AgentSoul struct {
	Tone             SoulTone `json:"tone"`
	LanguageStyle    string   `json:"language_style"`   // "Español Mexicano Cálido"
	UseColloquialism bool     `json:"use_colloquialism"` // expresiones mexicanas
	EmpathyLevel     int      `json:"empathy_level"`    // 1-10
	CustomPrompt     string   `json:"custom_prompt,omitempty"`
}

// MemoryBook representa un libro de recuerdos en proceso
type MemoryBook struct {
	ID              string           `json:"id"`
	RecipientName   string           `json:"recipient_name"`   // p.ej. "Abuela Martha"
	GiverName       string           `json:"giver_name"`       // p.ej. "Familia González"
	GiverEmail      string           `json:"giver_email"`
	GiverPhone      string           `json:"giver_phone"`
	RecipientPhone  string           `json:"recipient_phone"`
	Status          string           `json:"status"`            // "active", "completed", "paused"
	ProgressPercent int              `json:"progress_percent"`
	TotalQuestions  int              `json:"total_questions"`
	AnsweredCount   int              `json:"answered_count"`
	SoulConfig      AgentSoul        `json:"soul_config"`
	IsCorporate     bool             `json:"is_corporate"`
	CompanyName     string           `json:"company_name,omitempty"`
	IsPrinted       bool             `json:"is_printed"`        // Indica si se solicitó versión impresa
	PrintStatus     string           `json:"print_status"`      // "editing", "approved_for_print", "in_printing", "shipped"
	PrintApprovedAt *time.Time       `json:"print_approved_at,omitempty"`
	ShippingAddress string           `json:"shipping_address,omitempty"`
	DesignFeedbacks []DesignFeedback `json:"design_feedbacks,omitempty"`
	CreatedAt       time.Time        `json:"created_at"`
	Chapters        []Chapter        `json:"chapters,omitempty"`
}

// DesignFeedback representa una sugerencia de cambio de diseño por parte de la familia
type DesignFeedback struct {
	ID          string    `json:"id"`
	ChapterID   string    `json:"chapter_id,omitempty"`
	PageNum     int       `json:"page_num,omitempty"`
	Category    string    `json:"category"` // "cover", "typography", "photo", "text_correction"
	Comment     string    `json:"comment"`
	Status      string    `json:"status"`   // "pending", "in_review", "applied"
	CreatedAt   time.Time `json:"created_at"`
}

// PrintApprovalRequest payload para autorizar la impresión editorial final
type PrintApprovalRequest struct {
	BookID          string `json:"book_id"`
	ApprovedBy      string `json:"approved_by"`
	ShippingAddress string `json:"shipping_address"`
	CityStateZip    string `json:"city_state_zip"`
	RecipientPhone  string `json:"recipient_phone"`
	Notes           string `json:"notes,omitempty"`
}

// Chapter representa un capítulo temático del libro
type Chapter struct {
	ID        string     `json:"id"`
	Title     string     `json:"title"`
	Order     int        `json:"order"`
	Questions []Question `json:"questions"`
}

// Question representa una pregunta semanal de WhatsApp
type Question struct {
	ID          string     `json:"id"`
	PromptText  string     `json:"prompt_text"`
	Status      string     `json:"status"` // "sent", "answered", "pending"
	SentAt      *time.Time `json:"sent_at,omitempty"`
	AnsweredAt  *time.Time `json:"answered_at,omitempty"`
	AnswerText  string     `json:"answer_text,omitempty"`
	AudioURL    string     `json:"audio_url,omitempty"`
	PhotoURLs   []string   `json:"photo_urls,omitempty"`
}

// CheckoutRequest payload para pasarelas de pago
type CheckoutRequest struct {
	PlanID         string   `json:"plan_id"`         // "digital", "hardcover", "deluxe"
	PaymentGateway string   `json:"payment_gateway"` // "stripe" o "mercadopago"
	GiverName      string   `json:"giver_name"`
	GiverEmail     string   `json:"giver_email"`
	GiverPhone     string   `json:"giver_phone"`
	RecipientName  string   `json:"recipient_name"`
	RecipientPhone string   `json:"recipient_phone"`
	SoulTone       SoulTone `json:"soul_tone"`
	DiscountCode   string   `json:"discount_code,omitempty"`
	IsCorporate    bool     `json:"is_corporate"`
	CompanyName    string   `json:"company_name,omitempty"`
}

// ReviewSubmission representa una reseña grabada por el cliente
type ReviewSubmission struct {
	ID           string `json:"id"`
	CustomerName string `json:"customer_name"`
	MediaType    string `json:"media_type"` // "audio" o "video"
	MediaURL     string `json:"media_url"`
	Rating       int    `json:"rating"`
	Comment      string `json:"comment"`
	DiscountCode string `json:"discount_code_granted"`
}

// KapsoSendMessageRequest estructura para enviar mensajes mediante la API de Kapso
type KapsoSendMessageRequest struct {
	ToPhone     string `json:"to_phone"`
	MessageType string `json:"message_type"` // "text", "audio", "image"
	Content     string `json:"content"`
	MediaURL    string `json:"media_url,omitempty"`
}

// KapsoWebhookPayload representa la notificación recibida cuando Kapso envía un evento de WhatsApp
type KapsoWebhookPayload struct {
	EventID   string `json:"event_id"`
	EventType string `json:"event_type"` // "message_received", "message_status"
	FromPhone string `json:"from_phone"`
	ToPhone   string `json:"to_phone"`
	Message   struct {
		ID        string   `json:"id"`
		Type      string   `json:"type"` // "text", "audio", "image"
		TextBody  string   `json:"text_body,omitempty"`
		AudioURL  string   `json:"audio_url,omitempty"`
		PhotoURLs []string `json:"photo_urls,omitempty"`
		Timestamp int64    `json:"timestamp"`
	} `json:"message"`
}

// LoginRequest y AuthResponse para inicio de sesión en el Portal de la Familia
type LoginRequest struct {
	CodeOrEmail string `json:"code_or_email"`
}

type AuthResponse struct {
	Success bool        `json:"success"`
	Token   string      `json:"token,omitempty"`
	Message string      `json:"message"`
	Book    *MemoryBook `json:"book,omitempty"`
}


