# 📖 Proyecto Recordó: Preservación del Legado Familiar en México

**Recordó** es una plataforma tecnológica y servicio editorial diseñado para capturar la tradición oral y las historias de vida de seres queridos (abuelos, padres) en México y Latinoamérica a través de sencillas pláticas por **WhatsApp**, transformándolas en libros de alta calidad editorial.

---

## 🚀 Arquitectura del Proyecto

```text
recordo/
├── backend/                  # Servidor API de Alto Rendimiento en Golang
│   ├── handlers/             # Endpoint APIs (Salud, Trazabilidad, Alma de Agente, Pagos)
│   ├── models/               # Modelos de datos (Libros, Capítulos, Preguntas, Audios)
│   ├── main.go               # Servidor HTTP net/http con CORS y concurrencia
│   └── Dockerfile            # Build multi-stage para Railway / Docker
├── frontend/                 # Aplicación Web Mobile-First
│   ├── src/
│   │   ├── style.css         # Design System (Terracota, Oro, Salvia, Tipografía Editorial)
│   │   └── main.js           # Lógica del Simulador WhatsApp, Soul Customizer, Traceability
│   ├── index.html
│   ├── package.json          # Bundler Vite
│   └── Dockerfile            # Servidor Nginx estático para producción
├── docker-compose.yml        # Orquestador local / Vultr
├── railway.json              # Configuración CI/CD de Railway
└── README.md
```

---

## 🛠️ Cómo Ejecutar Localmente

### Option 1: Con Docker Compose (Recomendado)
```bash
docker-compose up --build
```
- **Frontend Web**: `http://localhost:3000`
- **Backend API Go**: `http://localhost:8080`
- **Healthcheck**: `http://localhost:8080/api/health`

### Option 2: Ejecución Manual

1. **Backend Go**:
```bash
cd backend
go run main.go
```

2. **Frontend Web**:
```bash
cd frontend
npm install
npm run dev
```

---

## 🚂 Despliegue en Railway

1. Conecta el repositorio GitHub a **Railway**.
2. Railway detectará automáticamente el archivo `railway.json` o los `Dockerfile`.
3. El endpoint de verificación de salud en Railway es `/api/health`.

---

## ✨ Características Implementadas
- 📱 **Diseño Web Mobile-First**: Optimizado para abrirse perfectamente desde links recibidos en WhatsApp.
- 🧠 **Personalizador de "Alma" del Agente**: Selector en vivo de tono narrativo (Primera Persona, Biográfico, Cálido Mexicano, Crónica).
- 💬 **Simulador Interactivo de Entrevista por WhatsApp**: Prueba interactiva dentro del sitio web.
- 📊 **Panel de Trazabilidad por WhatsApp**: Avance en tiempo real de capítulos, audios e imágenesy botón de recordatorio.
- 🏢 **Sección Corporativa**: Módulo para empresas que regalan Recordó como prestación VIP.
- 🎥 **Reseñas Grabadas**: Módulo de recolección de testimonios de voz con descuento.
- 💳 **Integración de Pasarelas**: Selector interactivo entre **Stripe** y **MercadoPago** (OXXO / MSI / MXN).
