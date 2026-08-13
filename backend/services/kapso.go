package services

import (
	"bytes"
	"encoding/json"
	"fmt"
	"io"
	"log"
	"net/http"
	"time"

	"recordo-backend/config"
	"recordo-backend/models"
)

// KapsoService maneja el envío de mensajes por WhatsApp vía la API de Kapso y el procesamiento de Webhooks
type KapsoService struct {
	cfg *config.Config
}

func NewKapsoService(cfg *config.Config) *KapsoService {
	return &KapsoService{cfg: cfg}
}

// SendMessage transmite un mensaje por WhatsApp consumiendo la API de Kapso
func (k *KapsoService) SendMessage(toPhone, textContent string) (string, error) {
	if k.cfg.KapsoAPIKey == "" {
		log.Printf("[KAPSO DEV MODE] Mensaje simulado a %s: %s", toPhone, textContent)
		return fmt.Sprintf("kapso_mock_msg_%d", time.Now().UnixNano()), nil
	}

	url := fmt.Sprintf("%s/v1/messages", k.cfg.KapsoBaseURL)
	payload := map[string]interface{}{
		"phone_number_id": k.cfg.KapsoPhoneNumberID,
		"to":              toPhone,
		"type":            "text",
		"text": map[string]string{
			"body": textContent,
		},
	}

	bodyBytes, err := json.Marshal(payload)
	if err != nil {
		return "", fmt.Errorf("error marshalling kapso payload: %w", err)
	}

	req, err := http.NewRequest(http.MethodPost, url, bytes.NewBuffer(bodyBytes))
	if err != nil {
		return "", fmt.Errorf("error creating request to kapso: %w", err)
	}

	req.Header.Set("Content-Type", "application/json")
	req.Header.Set("Authorization", fmt.Sprintf("Bearer %s", k.cfg.KapsoAPIKey))

	client := &http.Client{Timeout: 10 * time.Second}
	resp, err := client.Do(req)
	if err != nil {
		return "", fmt.Errorf("error invoking kapso API: %w", err)
	}
	defer resp.Body.Close()

	if resp.StatusCode >= 400 {
		resBody, _ := io.ReadAll(resp.Body)
		return "", fmt.Errorf("kapso API error status %d: %s", resp.StatusCode, string(resBody))
	}

	var kapsoResp struct {
		MessageID string `json:"message_id"`
		Status    string `json:"status"`
	}
	if err := json.NewDecoder(resp.Body).Decode(&kapsoResp); err == nil && kapsoResp.MessageID != "" {
		return kapsoResp.MessageID, nil
	}

	return fmt.Sprintf("kapso_msg_%d", time.Now().Unix()), nil
}

// ProcessWebhook decodea un webhook entrante enviado por Kapso cuando el usuario responde por WhatsApp
func (k *KapsoService) ProcessWebhook(r *http.Request) (*models.KapsoWebhookPayload, error) {
	var payload models.KapsoWebhookPayload
	if err := json.NewDecoder(r.Body).Decode(&payload); err != nil {
		return nil, fmt.Errorf("error decoding Kapso webhook: %w", err)
	}
	return &payload, nil
}
