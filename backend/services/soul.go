package services

import (
	"fmt"
	"strings"

	"recordo-backend/models"
)

// SoulService maneja la lógica de personalización y generación de preguntas del entrevistador
type SoulService struct{}

func NewSoulService() *SoulService {
	return &SoulService{}
}

// GenerateInterviewPrompt construye dinámicamente la pregunta adaptada al tono y empatía del Agente
func (s *SoulService) GenerateInterviewPrompt(soul models.AgentSoul, recipientName, rawQuestion string) string {
	name := recipientName
	if name == "" {
		name = "estimado(a)"
	}

	var greeting string
	var closing string

	switch soul.Tone {
	case models.SoulCalidoMexicano:
		greeting = fmt.Sprintf("¡Hola %s! 🌸 Qué alegría saludarte hoy.", name)
		closing = "Nos dará muchísimo gusto guardar este hermoso recuerdo en tu libro familiar. 📸 Si tienes alguna foto de esa época, mándanosla por aquí."
		if soul.UseColloquialism {
			greeting = fmt.Sprintf("¡Hola %s! 🌸 Qué bonito platicar contigo hoy.", name)
		}
	case models.SoulPrimeraPersona:
		greeting = fmt.Sprintf("Hola %s. Hoy me gustaría recordar juntos un pedacito de tu vida.", name)
		closing = "Puedes responder tranquilamente con un mensaje de voz si se te hace más cómodo."
	case models.SoulTerceraPersona:
		greeting = fmt.Sprintf("Estimado/a %s, continuamos con la crónica del legado familiar.", name)
		closing = "Agradecemos tu testimonio para la edición formal del libro de memorias."
	case models.SoulCronica:
		greeting = fmt.Sprintf("Hola %s. En el marco de la historia familiar que estamos reconstruyendo:", name)
		closing = "Tus detalles ayudan a contextualizar esta importante época."
	default:
		greeting = fmt.Sprintf("¡Hola %s!", name)
		closing = "Gracias por compartir tus recuerdos con nosotros."
	}

	customInstruction := ""
	if strings.TrimSpace(soul.CustomPrompt) != "" {
		customInstruction = fmt.Sprintf(" (%s)", strings.TrimSpace(soul.CustomPrompt))
	}

	return fmt.Sprintf("%s\n\n%s%s\n\n%s", greeting, rawQuestion, customInstruction, closing)
}

// GetSamplePrompt devuelve una muestra dinámica según la configuración recibida
func (s *SoulService) GetSamplePrompt(soul models.AgentSoul) string {
	sampleQuestion := "¿Cómo era la casita o el barrio donde creciste y a qué jugabas con tus hermanos?"
	return s.GenerateInterviewPrompt(soul, "Doña Beatriz", sampleQuestion)
}
