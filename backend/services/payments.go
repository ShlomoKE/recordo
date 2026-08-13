package services

import (
	"fmt"
	"strings"
	"time"

	"recordo-backend/config"
	"recordo-backend/models"
)

type PaymentService struct {
	cfg *config.Config
}

func NewPaymentService(cfg *config.Config) *PaymentService {
	return &PaymentService{cfg: cfg}
}

type CheckoutResult struct {
	OrderID     string  `json:"order_id"`
	PlanID      string  `json:"plan_id"`
	Gateway     string  `json:"gateway"`
	OriginalCost float64 `json:"original_cost_mxn"`
	FinalCost   float64 `json:"final_cost_mxn"`
	CheckoutURL string  `json:"checkout_url"`
}

func (p *PaymentService) CreateCheckout(req models.CheckoutRequest) (*CheckoutResult, error) {
	var basePrice float64
	switch strings.ToLower(req.PlanID) {
	case "digital":
		basePrice = 1499.0
	case "deluxe":
		basePrice = 4299.0
	default:
		// Default: hardcover
		basePrice = 2899.0
	}

	finalPrice := basePrice
	if strings.ToUpper(strings.TrimSpace(req.DiscountCode)) == "RECORDO-RESEÑA-15OFF" {
		finalPrice = basePrice * 0.85
	}

	orderID := fmt.Sprintf("REC-%d", time.Now().Unix())
	gateway := strings.ToLower(req.PaymentGateway)

	var checkoutURL string
	if gateway == "stripe" {
		if p.cfg.StripeSecretKey != "" {
			checkoutURL = fmt.Sprintf("https://checkout.stripe.com/pay/session?client_reference_id=%s", orderID)
		} else {
			checkoutURL = fmt.Sprintf("https://checkout.stripe.com/c/pay/cs_test_recordo_%s", orderID)
		}
	} else {
		// MercadoPago
		if p.cfg.MercadoPagoAccessToken != "" {
			checkoutURL = fmt.Sprintf("https://www.mercadopago.com.mx/checkout/v1/redirect?pref_id=%s", orderID)
		} else {
			checkoutURL = fmt.Sprintf("https://www.mercadopago.com.mx/checkout/v1/redirect?pref_id=RECORDO-MP-%s", orderID)
		}
	}

	return &CheckoutResult{
		OrderID:      orderID,
		PlanID:       req.PlanID,
		Gateway:      gateway,
		OriginalCost: basePrice,
		FinalCost:    finalPrice,
		CheckoutURL:  checkoutURL,
	}, nil
}
