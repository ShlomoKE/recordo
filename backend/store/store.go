package store

import (
	"fmt"
	"log"
	"sync"
	"time"

	"recordo-backend/config"
	"recordo-backend/models"
)

type Store interface {
	GetBookByPhone(phone string) (*models.MemoryBook, error)
	GetDefaultBook() *models.MemoryBook
	UpdateSoulConfig(soul models.AgentSoul) (*models.MemoryBook, error)
	RecordKapsoAnswer(fromPhone, textAnswer, audioURL string, photoURLs []string) (*models.MemoryBook, error)
	SaveReview(rev models.ReviewSubmission) error
	AddDesignFeedback(fb models.DesignFeedback) (*models.MemoryBook, error)
	ApproveForPrint(req models.PrintApprovalRequest) (*models.MemoryBook, error)
}

type MemoryStore struct {
	mu     sync.RWMutex
	cfg    *config.Config
	book   *models.MemoryBook
	reviews []models.ReviewSubmission
}

func NewMemoryStore(cfg *config.Config) *MemoryStore {
	now := time.Now()
	lastWeek := now.AddDate(0, 0, -7)
	twoWeeksAgo := now.AddDate(0, 0, -14)

	initialBook := &models.MemoryBook{
		ID:              "REC-2026-8841",
		RecipientName:   "Doña Beatriz López",
		GiverName:       "Familia López Hernández",
		GiverEmail:      "contacto@familialopez.mx",
		GiverPhone:      "+525512345678",
		RecipientPhone:  "+525598765432",
		Status:          "active",
		ProgressPercent: 68,
		TotalQuestions:  24,
		AnsweredCount:   16,
		SoulConfig: models.AgentSoul{
			Tone:             models.SoulCalidoMexicano,
			LanguageStyle:    "Español Mexicano Empático",
			UseColloquialism: true,
			EmpathyLevel:     9,
			CustomPrompt:     "Habla con respeto y calidez mexicana, recordando la época de oro del cine nacional.",
		},
		IsPrinted:       true,
		PrintStatus:     "editing",
		CreatedAt:       now.AddDate(0, -2, 0),
		Chapters: []models.Chapter{
			{
				ID:    "chap-1",
				Title: "Capítulo I: Infancia y los primeros recuerdos en el pueblo",
				Order: 1,
				Questions: []models.Question{
					{
						ID:         "q-1",
						PromptText: "¿Cómo era la casa donde creciste y a qué jugabas con tus hermanos por las tardes?",
						Status:     "answered",
						SentAt:     &twoWeeksAgo,
						AnsweredAt: &lastWeek,
						AnswerText: "Crecí en una casita con patio grande de nopales y bugambilias en Pátzcuaro. Mis hermanos y yo jugábamos a las canicas y a la traes...",
						AudioURL:   "https://storage.recordo.mx/audio/b-lopez-q1.mp3",
						PhotoURLs:  []string{"https://images.unsplash.com/photo-1544717305-2782549b5136?auto=format&fit=crop&w=600&q=80"},
					},
					{
						ID:         "q-2",
						PromptText: "¿Cuál era la receta o platillo favorito que preparaban tus abuelos los domingos?",
						Status:     "answered",
						SentAt:     &lastWeek,
						AnsweredAt: &now,
						AnswerText: "Mi abuela hacía un mole de olla con elote tierno recién cortado que olía a gloria por toda la calle...",
						AudioURL:   "https://storage.recordo.mx/audio/b-lopez-q2.mp3",
						PhotoURLs:  []string{"https://images.unsplash.com/photo-1565299585323-38d6b0865b47?auto=format&fit=crop&w=600&q=80"},
					},
				},
			},
			{
				ID:    "chap-2",
				Title: "Capítulo II: La Juventud, Primeros Sueños y Amores",
				Order: 2,
				Questions: []models.Question{
					{
						ID:         "q-3",
						PromptText: "¿Cómo conociste al gran amor de tu vida y qué sintieron en su primera cita?",
						Status:     "sent",
						SentAt:     &now,
						AnswerText: "",
					},
				},
			},
		},
	}

	if cfg.DatabaseURL != "" {
		log.Printf("🔌 DATABASE_URL detectada. Preparado driver PostgreSQL en Railway: %s", cfg.DatabaseURL)
	}

	return &MemoryStore{
		cfg:  cfg,
		book: initialBook,
	}
}

func (s *MemoryStore) GetBookByPhone(phone string) (*models.MemoryBook, error) {
	s.mu.RLock()
	defer s.mu.RUnlock()
	return s.book, nil
}

func (s *MemoryStore) GetDefaultBook() *models.MemoryBook {
	s.mu.RLock()
	defer s.mu.RUnlock()
	return s.book
}

func (s *MemoryStore) UpdateSoulConfig(soul models.AgentSoul) (*models.MemoryBook, error) {
	s.mu.Lock()
	defer s.mu.Unlock()
	s.book.SoulConfig = soul
	return s.book, nil
}

func (s *MemoryStore) RecordKapsoAnswer(fromPhone, textAnswer, audioURL string, photoURLs []string) (*models.MemoryBook, error) {
	s.mu.Lock()
	defer s.mu.Unlock()

	now := time.Now()
	// Actualizar primera pregunta pendiente
	for cIdx := range s.book.Chapters {
		for qIdx := range s.book.Chapters[cIdx].Questions {
			if s.book.Chapters[cIdx].Questions[qIdx].Status != "answered" {
				s.book.Chapters[cIdx].Questions[qIdx].Status = "answered"
				s.book.Chapters[cIdx].Questions[qIdx].AnsweredAt = &now
				if textAnswer != "" {
					s.book.Chapters[cIdx].Questions[qIdx].AnswerText = textAnswer
				}
				if audioURL != "" {
					s.book.Chapters[cIdx].Questions[qIdx].AudioURL = audioURL
				}
				if len(photoURLs) > 0 {
					s.book.Chapters[cIdx].Questions[qIdx].PhotoURLs = append(s.book.Chapters[cIdx].Questions[qIdx].PhotoURLs, photoURLs...)
				}
				s.book.AnsweredCount++
				s.book.ProgressPercent = (s.book.AnsweredCount * 100) / s.book.TotalQuestions
				log.Printf("✅ Pregunta %s respondida por %s vía Kapso Webhook", s.book.Chapters[cIdx].Questions[qIdx].ID, fromPhone)
				return s.book, nil
			}
		}
	}

	return s.book, fmt.Errorf("no hay preguntas pendientes para responder")
}

func (s *MemoryStore) SaveReview(rev models.ReviewSubmission) error {
	s.mu.Lock()
	defer s.mu.Unlock()
	s.reviews = append(s.reviews, rev)
	return nil
}

func (s *MemoryStore) AddDesignFeedback(fb models.DesignFeedback) (*models.MemoryBook, error) {
	s.mu.Lock()
	defer s.mu.Unlock()
	fb.ID = fmt.Sprintf("FB-%d", time.Now().Unix())
	fb.CreatedAt = time.Now()
	fb.Status = "in_review"
	s.book.DesignFeedbacks = append(s.book.DesignFeedbacks, fb)
	log.Printf("✍️ Nueva sugerencia de diseño agregada al libro %s: categoría=%s", s.book.ID, fb.Category)
	return s.book, nil
}

func (s *MemoryStore) ApproveForPrint(req models.PrintApprovalRequest) (*models.MemoryBook, error) {
	s.mu.Lock()
	defer s.mu.Unlock()

	now := time.Now()
	s.book.IsPrinted = true
	s.book.PrintStatus = "approved_for_print"
	s.book.PrintApprovedAt = &now
	if req.ShippingAddress != "" {
		s.book.ShippingAddress = fmt.Sprintf("%s, %s", req.ShippingAddress, req.CityStateZip)
	}

	log.Printf("🖨️ Libro %s APROBADO PARA IMPRENTA por %s. Dirección: %s", s.book.ID, req.ApprovedBy, s.book.ShippingAddress)
	return s.book, nil
}

