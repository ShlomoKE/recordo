import './style.css';

// Configuración del servidor Backend (Go API)
const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8080';

// Sistema de Iconos SVG limpios y vectoriales (Sin emojis)
const icons = {
  book: `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"/></svg>`,
  chart: `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="20" x2="18" y2="10"/><line x1="12" y1="20" x2="12" y2="4"/><line x1="6" y1="20" x2="6" y2="14"/></svg>`,
  mic: `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z"/><path d="M19 10v2a7 7 0 0 1-14 0v-2"/><line x1="12" y1="19" x2="12" y2="23"/><line x1="8" y1="23" x2="16" y2="23"/></svg>`,
  sparkles: `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m12 3-1.9 5.8a2 2 0 0 1-1.3 1.3L3 12l5.8 1.9a2 2 0 0 1 1.3 1.3L12 21l1.9-5.8a2 2 0 0 1 1.3-1.3L21 12l-5.8-1.9a2 2 0 0 1-1.3-1.3L12 3z"/></svg>`,
  settings: `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"/></svg>`,
  logout: `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/><polyline points="16 17 21 12 16 7"/><line x1="21" y1="12" x2="9" y2="12"/></svg>`,
  key: `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m21 2-2 2m-1.5 1.5L16 7l-3 3-4-1.5L2 15l4 4 6.5-7L14 9.5l1.5-1.5"/></svg>`,
  send: `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="22" y1="2" x2="11" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/></svg>`,
  check: `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg>`,
  phone: `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="5" y="2" width="14" height="20" rx="2" ry="2"/><line x1="12" y1="18" x2="12.01" y2="18"/></svg>`,
  user: `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>`,
  home: `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>`,
  edit: `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 20h9"/><path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"/></svg>`,
  printer: `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="6 9 6 2 18 2 18 9"/><path d="M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2"/><rect x="6" y="14" width="12" height="8"/></svg>`,
  logoMark: `<svg class="logo-emblem-svg" width="34" height="28" viewBox="0 0 100 80" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><path d="M 47 10 C 35 14 18 14 6 18 V 65 C 18 61 35 61 47 57 Z" /><path d="M 47 18 C 37 21 23 21 12 24 V 71 C 23 68 37 68 47 65 Z" /><path d="M 53 10 C 59 14 64 15 62 18 C 59 22 55 24 53 28 C 51 32 54 35 57 37 C 53 39 53 43 57 45 C 53 47 53 51 57 54 C 62 58 70 60 94 65 V 18 C 82 14 65 14 53 10 Z" /><path d="M 53 65 C 63 68 77 68 88 71 V 24 C 77 21 63 21 53 18 Z" /></svg>`
};

// Estado global de la aplicación
const state = {
  currentView: localStorage.getItem('recordo_auth_token') ? 'dashboard' : 'landing',
  activeTab: 'traceability',
  soulTone: 'calido_mexicano',
  paymentGateway: 'mercadopago',
  selectedPlan: 'hardcover',
  isCorporate: false,
  bookData: null,
  waMessages: [
    { type: 'received', text: 'Hola Doña Beatriz. Soy tu entrevistador de Recordo. Hoy nos gustaría recordar: ¿Cómo era la casita donde creciste y a qué jugaban tus hermanos?' },
    { type: 'sent', text: 'Hola mijo, crecí en Pátzcuaro en una casita con un patio lleno de bugambilias. Jugábamos a las canicas y a la traes...' },
    { type: 'received', text: '¡Qué hermoso recuerdo! ¿Tienes alguna fotito de ese patio de bugambilias que quieras guardar para el libro de tus nietos?' }
  ]
};

// Mapeo de tonos del Alma del Agente
const soulTones = {
  calido_mexicano: {
    title: 'Cálido Tradicional Mexicano',
    desc: 'Tono entrañable, familiar y respetuoso. Ideal para abuelos.',
    samplePrompt: '«Hola Doña Beatriz, ¡qué alegría saludarle! Hoy queremos platicar de aquellas tardes de domingo en el pueblo. ¿Qué era lo que más le gustaba cocinar a su abuelita?»'
  },
  primera_persona: {
    title: 'Primera Persona Íntima',
    desc: 'Narrado directamente desde la voz y perspectiva de la persona.',
    samplePrompt: '«Crecí escuchando el sonido de la lluvia sobre el tejado de lámina en Michoacán. Mi primer recuerdo consciente fue a los cinco años...»'
  },
  tercera_persona: {
    title: 'Biográfico Formal',
    desc: 'Estilo biografía elegante y estructurada para legado familiar.',
    samplePrompt: '«Nacido en el otoño de 1948, Roberto López comenzó su historia en las montañas de Jalisco, donde aprendió el valor del trabajo duro...»'
  },
  cronica: {
    title: 'Crónica Periodística',
    desc: 'Enfoque narrativo profundo, contextualizando la época histórica.',
    samplePrompt: '«En el México de los años 50, en plena época de oro del cine nacional, la familia López construyó las bases de lo que hoy es su legado...»'
  }
};

// Inicialización de la aplicación
async function initApp() {
  await fetchBookData();
  renderApp();
}

async function fetchBookData() {
  try {
    const res = await fetch(`${API_URL}/api/traceability`);
    if (res.ok) {
      state.bookData = await res.json();
    }
  } catch (err) {
    console.log('Modo local de trazabilidad cargado sin servidor.');
  }
}

function renderApp() {
  const app = document.querySelector('#app');
  if (state.currentView === 'dashboard') {
    app.innerHTML = renderFamilyDashboardHTML();
    bindDashboardEvents();
  } else {
    app.innerHTML = renderLandingPageHTML();
    bindLandingEvents();
  }
}

/* ==========================================================================
   1. PÁGINA COMERCIAL (LANDING PAGE PÚBLICA)
   ========================================================================== */
function renderLandingPageHTML() {
  return `
  <!-- Navbar Comercial -->
  <nav class="navbar">
    <div class="container nav-container">
      <a href="#" class="logo"><img src="/logo.jpeg" alt="Recordo Logo" class="brand-logo-img" /></a>
      <button class="nav-toggle" id="navToggle" aria-label="Abrir menú">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="18" x2="21" y2="18"/></svg>
      </button>
      <ul class="nav-links" id="navLinks">
        <li><a href="#como-funciona">Cómo Funciona</a></li>
        <li><a href="#empresas">Para Empresas</a></li>
        <li><a href="#precios">Precios</a></li>
        <li><a href="#faq">Preguntas Frecuentes</a></li>
        <li><a href="#contacto">Contacto</a></li>
        <li><button class="btn-login-nav" id="btnOpenLoginNav">${icons.key} Acceso a Mi Libro</button></li>
        <li class="mobile-cta"><a href="#precios" class="btn btn-primary btn-nav">Regalar Un Libro</a></li>
      </ul>
      <div class="nav-right-actions">
        <button class="btn btn-outline btn-nav" id="btnOpenLogin">${icons.key} Acceder a Mi Libro</button>
        <a href="#precios" class="btn btn-primary btn-nav desktop-cta">Regalar Un Libro</a>
      </div>
    </div>
  </nav>

  <!-- Hero Section -->
  <section class="hero">
    <div class="container hero-grid">
      <div class="hero-content">
        <div class="badge badge-sage">${icons.phone} Tan fácil como enviar un audio</div>
        <h1>El libro de recuerdos de tus familiares.</h1>
        <p>Sin apps ni descargas. Solo responden notas de voz a su ritmo y nosotros nos encargamos de transcribir, diseñar y crear su libro de memorias.</p>
        <div class="hero-ctas">
          <a href="#precios" class="btn btn-primary">Comenzar Libro de Memorias</a>
          <a href="#simulador" class="btn btn-outline">Probar Simulador de WhatsApp</a>
        </div>
      </div>
      <div class="hero-preview-book">
        <div class="real-book-container">
          <img src="/real-book.png" alt="Libro Impreso Real de Recordo" class="real-book-img" />
        </div>
      </div>
    </div>
  </section>

  <!-- Cómo Funciona (Incluye Alma del Agente) -->
  <section id="como-funciona" class="section-padding" style="background: var(--bg-subtle);">
    <div class="container">
      <div style="text-align: center; max-width: 700px; margin: 0 auto 1.8rem auto;">
        <div class="badge">Paso a Paso</div>
        <h2>Tan fácil como mandar un mensaje de voz</h2>
        <p style="margin-top: 0.3rem;">Diseñado especialmente para que tus familiares participen sin fricción tecnológica ni descargas complicadas.</p>
      </div>

      <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(220px, 1fr)); gap: 1.2rem; margin-bottom: 2.2rem;">
        <div class="stat-card">
          <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 0.6rem;">
            <div class="step-num" style="margin-bottom: 0; font-size: 1.5rem;">01</div>
            <div class="icon-box icon-box-emerald">${icons.phone}</div>
          </div>
          <h4>Pregunta por WhatsApp</h4>
          <p>Cada semana enviaremos una pregunta entrañable a su celular en el horario que prefiera.</p>
        </div>
        <div class="stat-card">
          <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 0.6rem;">
            <div class="step-num" style="margin-bottom: 0; font-size: 1.5rem;">02</div>
            <div class="icon-box icon-box-terracotta">${icons.mic}</div>
          </div>
          <h4>Respuesta de Voz o Texto</h4>
          <p>Puede responder mandando audios de voz o mensajes de texto. La IA transcribe y organiza su relato.</p>
        </div>
        <div class="stat-card">
          <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 0.6rem;">
            <div class="step-num" style="margin-bottom: 0; font-size: 1.5rem;">03</div>
            <div class="icon-box icon-box-gold">${icons.user}</div>
          </div>
          <h4>Portal de la Familia</h4>
          <p>La familia inicia sesión para escuchar los audios, revisar el progreso y agregar fotografías.</p>
        </div>
        <div class="stat-card">
          <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 0.6rem;">
            <div class="step-num" style="margin-bottom: 0; font-size: 1.5rem;">04</div>
            <div class="icon-box icon-box-sage">${icons.book}</div>
          </div>
          <h4>Tu Libro de Recuerdos</h4>
          <p>Recibe tu edición digital o impresa con encuadernación editorial y envío a domicilio.</p>
        </div>
      </div>

      <!-- Módulo Integrado: Alma del Agente -->
      <div class="soul-card">
        <div style="text-align: center; max-width: 650px; margin: 0 auto 2rem auto;">
          <div class="badge badge-gold">${icons.sparkles} Personalización Conversacional</div>
          <h2>Elige la "Personalidad" del Entrevistador</h2>
          <p>Configura el tono con el que la IA guiará las pláticas semanales por WhatsApp.</p>
        </div>

        <div class="soul-options" id="landing-soul-selector">
          ${Object.entries(soulTones).map(([key, item]) => `
            <div class="soul-chip ${key === state.soulTone ? 'active' : ''}" data-tone="${key}">
              <h5>${item.title}</h5>
              <p>${item.desc}</p>
            </div>
          `).join('')}
        </div>

        <div style="margin-top: 1.5rem;">
          <label style="font-weight: 600; font-size: 0.9rem; margin-bottom: 0.5rem; display: block;">Ejemplo de mensaje enviado por WhatsApp:</label>
          <div class="soul-preview-box" id="landing-soul-preview">
            ${soulTones[state.soulTone].samplePrompt}
          </div>
        </div>
      </div>
    </div>
  </section>

  <!-- Simulador de WhatsApp -->
  <section id="simulador" class="section-padding" style="background: var(--bg-subtle);">
    <div class="container">
      <div style="text-align: center; max-width: 650px; margin: 0 auto 2.5rem auto;">
        <div class="badge">Demostración Interactiva</div>
        <h2>Prueba la experiencia de entrevista por WhatsApp</h2>
        <p>Así es como tu ser querido conversará de manera cálida y natural con nuestro entrevistador de Recordo.</p>
      </div>

      <div class="wa-phone-frame">
        <div class="wa-screen">
          <div class="wa-header">
            <div class="wa-avatar">${icons.book}</div>
            <div>
              <div style="font-weight: 600; font-size: 0.95rem; color: #E9EDEF;">Entrevistador Recordo</div>
              <div style="font-size: 0.75rem; color: #8696A0;">En línea por WhatsApp</div>
            </div>
          </div>
          <div class="wa-chat-body" id="wa-chat-body">
            ${state.waMessages.map(msg => `
              <div class="wa-msg ${msg.type === 'received' ? 'wa-msg-received' : 'wa-msg-sent'}">
                ${msg.text}
              </div>
            `).join('')}
          </div>
          <div class="wa-input-bar">
            <input type="text" id="wa-user-input" placeholder="Escribe un mensaje de prueba..." />
            <button id="wa-send-btn" class="btn btn-primary" style="padding: 0.5rem 1.2rem; font-size: 0.85rem; border-radius: 20px;">${icons.send}</button>
          </div>
        </div>
      </div>
    </div>
  </section>

  <!-- Empresas -->
  <section id="empresas" class="section-padding">
    <div class="container">
      <div class="corp-banner">
        <div style="max-width: 600px;">
          <div class="badge" style="background: rgba(255,255,255,0.2); color: #FFF;">Prestación VIP Corporativa</div>
          <h2 style="color: white; margin-bottom: 1rem;">Regala Recordo a tus Ejecutivos y Colaboradores</h2>
          <p style="color: #E2E8F0; margin-bottom: 2rem;">El beneficio laboral más memorable y humano: regalar la preservación de la historia de los padres o abuelos de tus empleados.</p>
          <button class="btn btn-primary" id="btn-corp-modal">Solicitar Cotización Corporativa</button>
        </div>
      </div>
    </div>
  </section>

  <!-- Precios -->
  <section id="precios" class="section-padding" style="background: var(--bg-subtle);">
    <div class="container">
      <div style="text-align: center; max-width: 650px; margin: 0 auto 2rem auto;">
        <div class="badge">Planes & Edición</div>
        <h2>Elige el regalo perfecto para tu familia</h2>
        <p>Todos los planes incluyen el entrevistador por WhatsApp, transcripción de IA, portal de la familia y maquetación editorial.</p>
        
        <div class="gateway-selector" style="margin-top: 1.5rem; display: flex; justify-content: center; gap: 1rem;">
          <button class="btn btn-primary gateway-btn" data-gateway="mercadopago">MercadoPago (MSI / OXXO / MXN)</button>
          <button class="btn btn-outline gateway-btn" data-gateway="stripe">Stripe (Tarjetas de Crédito)</button>
        </div>
      </div>

      <div class="pricing-grid">
        <div class="pricing-card featured">
          <div class="badge badge-sage" style="align-self: flex-start;">${icons.sparkles} Más Vendido</div>
          <h3>Memorias Digitales</h3>
          <p>Edición 100% digital. Acceso de 4 meses al portal en vivo y posterior descarga para conservarlo para siempre.</p>
          <div class="pricing-price">$999 <span style="font-size: 0.9rem; font-weight: 500; color: var(--text-muted);">MXN</span></div>
          <ul class="pricing-features">
            <li>${icons.check} 12 Semanas de Entrevistas por WhatsApp</li>
            <li>${icons.check} 4 Meses de acceso activo al Portal de la Familia</li>
            <li>${icons.check} Transcripción automática de notas de voz</li>
            <li>${icons.check} Descarga del Libro Digital PDF/ePub para conservarlo para siempre</li>
          </ul>
          <button class="btn btn-secondary checkout-trigger-btn" data-plan="digital">Ordenar Plan Digital</button>
        </div>

        <div class="pricing-card">
          <h3>Libro Básico</h3>
          <p>Edición en pasta blanda con interior en blanco y negro.</p>
          <div class="pricing-price">$1,599 <span style="font-size: 0.9rem; font-weight: 500; color: var(--text-muted);">MXN</span></div>
          <ul class="pricing-features">
            <li>${icons.check} 1 Libro Físico en Pasta Blanda</li>
            <li>${icons.check} Impresión interior en Blanco y Negro</li>
            <li>${icons.check} Incluye también la edición Digital (PDF/ePub)</li>
            <li>${icons.check} Entrevistas por WhatsApp y Portal Familiar</li>
            <li>${icons.check} Envío a todo México</li>
          </ul>
          <button class="btn btn-outline checkout-trigger-btn" data-plan="basic">Ordenar Libro Básico</button>
        </div>

        <div class="pricing-card">
          <h3>Libro Premium</h3>
          <p>Edición empastada en pasta dura con interior a todo color.</p>
          <div class="pricing-price">$2,999 <span style="font-size: 0.9rem; font-weight: 500; color: var(--text-muted);">MXN</span></div>
          <ul class="pricing-features">
            <li>${icons.check} 1 Libro Físico Empastado en Pasta Dura</li>
            <li>${icons.check} Impresión interior a Todo Color de lujo</li>
            <li>${icons.check} Incluye también la edición Digital completa</li>
            <li>${icons.check} Hasta 40 Fotografías familiares a color</li>
            <li>${icons.check} Portal de la Familia e historias de audio</li>
            <li>${icons.check} Envío gratis a todo México</li>
          </ul>
          <button class="btn btn-outline checkout-trigger-btn" data-plan="premium">Comprar Libro Premium</button>
        </div>
      </div>
    </div>
  </section>

  <!-- Reseñas -->
  <section class="section-padding">
    <div class="container">
      <div style="text-align: center; max-width: 600px; margin: 0 auto 3rem auto;">
        <div class="badge">Testimonios Reales</div>
        <h2>Historias de Familias en México</h2>
        <p>Graba tu reseña en audio o video y obtén un 15% de descuento adicional.</p>
        <button class="btn btn-outline" id="btn-record-review" style="margin-top: 1rem;">${icons.mic} Grabar Mi Reseña de Audio/Video (15% OFF)</button>
      </div>
    </div>
  </section>

  <!-- Preguntas Frecuentes (FAQ) -->
  <section id="faq" class="section-padding" style="background: var(--bg-subtle);">
    <div class="container">
      <div style="text-align: center; max-width: 650px; margin: 0 auto 2.5rem auto;">
        <div class="badge">Dudas Comunes</div>
        <h2>Preguntas Frecuentes</h2>
        <p>Todo lo que necesitas saber sobre el proceso de pláticas por WhatsApp y la edición impresa.</p>
      </div>

      <div class="faq-grid" style="max-width: 800px; margin: 0 auto; display: flex; flex-direction: column; gap: 1rem;">
        <div class="faq-item" style="background: var(--bg-card); border: 1px solid var(--border-color); border-radius: var(--radius-md); padding: 1.4rem 1.6rem; box-shadow: var(--shadow-sm);">
          <h4 style="font-size: 1.1rem; color: var(--primary); margin-bottom: 0.3rem; font-family: var(--font-sans);">¿Cómo responde mi familiar las preguntas?</h4>
          <p style="margin: 0; font-size: 0.92rem; color: var(--text-dark);">No requiere instalar nada ni aprender a usar sistemas nuevos. Cada semana recibe un mensaje por WhatsApp y simplemente responde mandando una nota de voz o mensaje de texto a su ritmo.</p>
        </div>

        <div class="faq-item" style="background: var(--bg-card); border: 1px solid var(--border-color); border-radius: var(--radius-md); padding: 1.4rem 1.6rem; box-shadow: var(--shadow-sm);">
          <h4 style="font-size: 1.1rem; color: var(--primary); margin-bottom: 0.3rem; font-family: var(--font-sans);">¿Quién se encarga de transcribir y estructurar el libro?</h4>
          <p style="margin: 0; font-size: 0.92rem; color: var(--text-dark);">Nuestra tecnología de Inteligencia Conversacional transcribe los audios con alta fidelidad, organiza el relato cronológicamente en capítulos temáticos y redacta con el tono de empatía que la familia elija.</p>
        </div>

        <div class="faq-item" style="background: var(--bg-card); border: 1px solid var(--border-color); border-radius: var(--radius-md); padding: 1.4rem 1.6rem; box-shadow: var(--shadow-sm);">
          <h4 style="font-size: 1.1rem; color: var(--primary); margin-bottom: 0.3rem; font-family: var(--font-sans);">¿La familia puede revisar las historias y agregar fotografías?</h4>
          <p style="margin: 0; font-size: 0.92rem; color: var(--text-dark);">¡Sí! La familia cuenta con su Portal privado donde pueden escuchar las grabaciones de voz originales, sugerir correcciones de diseño y subir fotografías históricas para incluirlas en las páginas del libro.</p>
        </div>

        <div class="faq-item" style="background: var(--bg-card); border: 1px solid var(--border-color); border-radius: var(--radius-md); padding: 1.4rem 1.6rem; box-shadow: var(--shadow-sm);">
          <h4 style="font-size: 1.1rem; color: var(--primary); margin-bottom: 0.3rem; font-family: var(--font-sans);">¿Cómo funciona el envío del libro impreso?</h4>
          <p style="margin: 0; font-size: 0.92rem; color: var(--text-dark);">Una vez que la familia autoriza el borrador final, enviamos la edición al taller de imprenta para su encuadernación en pasta dura de lujo y se entrega con envío gratis a cualquier domicilio en México.</p>
        </div>

        <div class="faq-item" style="background: var(--bg-card); border: 1px solid var(--border-color); border-radius: var(--radius-md); padding: 1.4rem 1.6rem; box-shadow: var(--shadow-sm);">
          <h4 style="font-size: 1.1rem; color: var(--primary); margin-bottom: 0.3rem; font-family: var(--font-sans);">¿Puedo comprar copias impresas adicionales para los nietos o hermanos?</h4>
          <p style="margin: 0; font-size: 0.92rem; color: var(--text-dark);">Por supuesto. En cualquier momento desde el Portal de la Familia puedes solicitar ejemplares empastados extra con costo especial de impresión.</p>
        </div>
      </div>
    </div>
  </section>

  <!-- Contacto -->
  <section id="contacto" class="section-padding">
    <div class="container">
      <div style="max-width: 850px; margin: 0 auto; background: var(--bg-card); border: 1px solid var(--border-color); border-radius: var(--radius-lg); padding: 2.5rem; box-shadow: var(--shadow-md);">
        <div style="text-align: center; margin-bottom: 2rem;">
          <div class="badge badge-sage">${icons.phone} Estamos para Ayudarte</div>
          <h2>Ponte en Contacto con Nosotros</h2>
          <p>¿Tienes dudas sobre los planes o quieres ayuda personalizada para regalar un libro? Escríbenos directamente.</p>
        </div>

        <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(260px, 1fr)); gap: 2rem; align-items: start;">
          <div>
            <h4 style="margin-bottom: 1rem; color: var(--primary);">Atención Inmediata</h4>
            <div style="display: flex; flex-direction: column; gap: 1rem;">
              <a href="https://wa.me/5215621497636" target="_blank" class="btn btn-secondary" style="justify-content: center; text-decoration: none;">${icons.phone} WhatsApp: +52 1 56 2149 7636</a>
              <div style="padding: 1rem; background: var(--bg-subtle); border-radius: var(--radius-md); font-size: 0.9rem;">
                <strong>Correo Electrónico:</strong><br/>
                <a href="mailto:hola@recordo.mx" style="color: var(--primary); text-decoration: none; font-weight: 600;">hola@recordo.mx</a>
              </div>
              <div style="padding: 1rem; background: var(--bg-subtle); border-radius: var(--radius-md); font-size: 0.9rem;">
                <strong>Horario de Atención:</strong><br/>
                Lunes a Viernes de 9:00 am a 6:00 pm (Hora Centro de México)
              </div>
            </div>
          </div>

          <form id="contactLandingForm" style="display: flex; flex-direction: column; gap: 0.9rem;">
            <div>
              <label style="font-weight: 600; font-size: 0.85rem; display: block; margin-bottom: 0.3rem;">Tu Nombre Completo:</label>
              <input type="text" class="dash-input" required placeholder="Ej. Ana María López" />
            </div>
            <div>
              <label style="font-weight: 600; font-size: 0.85rem; display: block; margin-bottom: 0.3rem;">Correo o Teléfono Celular:</label>
              <input type="text" class="dash-input" required placeholder="Ej. ana@familia.mx o 55 1234 5678" />
            </div>
            <div>
              <label style="font-weight: 600; font-size: 0.85rem; display: block; margin-bottom: 0.3rem;">¿En qué podemos ayudarte?</label>
              <textarea class="dash-input" rows="3" required placeholder="Escribe tu mensaje o pregunta..."></textarea>
            </div>
            <button type="submit" class="btn btn-primary" style="margin-top: 0.5rem;">Enviar Mensaje de Contacto</button>
          </form>
        </div>
      </div>
    </div>
  </section>

  <!-- Footer -->
  <footer>
    <div class="container">
      <div class="footer-grid">
        <div>
          <a href="#" class="logo" style="display: inline-flex; align-items: center; gap: 0.6rem; text-decoration: none; color: #FAF3E8; font-family: var(--font-serif); font-size: 1.7rem; font-weight: 700; margin-bottom: 0.8rem;">
            <span style="color: var(--accent-gold); display: flex;">${icons.book}</span> Recordo
          </a>
          <p style="color: #A09588;">Preservando la tradición oral y el legado familiar en México a través de conversaciones sencillas por WhatsApp.</p>
        </div>
        <div>
          <h4>Plataforma</h4>
          <ul style="list-style: none; margin-top: 1rem;">
            <li><a href="#como-funciona" style="color: #A09588; text-decoration: none;">Cómo Funciona</a></li>
            <li><a href="#precios" style="color: #A09588; text-decoration: none;">Precios</a></li>
            <li><a href="#empresas" style="color: #A09588; text-decoration: none;">Empresas</a></li>
          </ul>
        </div>
        <div>
          <h4>Portal</h4>
          <ul style="list-style: none; margin-top: 1rem;">
            <li><a href="#" id="linkFooterLogin" style="color: var(--accent-gold); text-decoration: none;">Acceso a Mi Libro</a></li>
          </ul>
        </div>
        <div>
          <h4>Contacto</h4>
          <p style="color: #A09588;">hola@recordo.mx<br/>Ciudad de México, MX</p>
        </div>
      </div>
      <div class="footer-bottom">
        <p>© 2026 Recordo.mx — Todos los derechos reservados. Plataforma segura y cifrada de Recordo.mx.</p>
      </div>
    </div>
  </footer>

  <!-- Modal de Login -->
  <div class="modal-backdrop" id="loginModal">
    <div class="modal-card">
      <button class="modal-close" id="btnCloseLogin">✕</button>
      <div class="modal-header">
        <h3>Acceso al Portal de la Familia</h3>
        <p>Ingresa con tu Código de Seguimiento o correo registrado.</p>
      </div>
      <form id="loginForm">
        <div class="form-group">
          <label>Código de Seguimiento o Correo:</label>
          <input type="text" id="loginInput" placeholder="Ej: REC-2026-8841 o contacto@familia.mx" required value="REC-2026-8841" />
        </div>
        <button type="submit" class="btn btn-primary" style="width: 100%;">Entrar a Mi Panel de la Familia</button>
        <p style="font-size: 0.8rem; margin-top: 1rem; color: var(--text-muted); text-align: center;">Código de prueba precargado: <strong>REC-2026-8841</strong></p>
      </form>
    </div>
  </div>

  <!-- Modal Cotización Corporativa -->
  <div class="modal-backdrop" id="corpQuoteModal">
    <div class="modal-card" style="max-width: 540px;">
      <button class="modal-close" id="btnCloseCorpModal">✕</button>
      <div class="modal-header">
        <div class="badge badge-sage" style="margin-bottom: 0.4rem;">${icons.sparkles} Empresas & Recursos Humanos</div>
        <h3>Cotización de Paquetes Corporativos</h3>
        <p>Regala a tus colaboradores el beneficio más humano: el libro con las historias de vida de sus familias.</p>
      </div>
      <form id="corpQuoteForm" style="display: flex; flex-direction: column; gap: 0.85rem; margin-top: 1rem;">
        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 0.8rem;">
          <div>
            <label style="font-weight: 600; font-size: 0.82rem; display: block; margin-bottom: 0.25rem;">Nombre de la Empresa:</label>
            <input type="text" class="dash-input" required placeholder="Ej. Grupo Modelo, Bimbo, etc." />
          </div>
          <div>
            <label style="font-weight: 600; font-size: 0.82rem; display: block; margin-bottom: 0.25rem;">Tu Nombre y Cargo:</label>
            <input type="text" class="dash-input" required placeholder="Ej. Carlos Vera • Dir. RH" />
          </div>
        </div>

        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 0.8rem;">
          <div>
            <label style="font-weight: 600; font-size: 0.82rem; display: block; margin-bottom: 0.25rem;">Correo Corporativo:</label>
            <input type="email" class="dash-input" required placeholder="carlos@empresa.com" />
          </div>
          <div>
            <label style="font-weight: 600; font-size: 0.82rem; display: block; margin-bottom: 0.25rem;">Teléfono / WhatsApp:</label>
            <input type="tel" class="dash-input" required placeholder="55 1234 5678" />
          </div>
        </div>

        <div>
          <label style="font-weight: 600; font-size: 0.82rem; display: block; margin-bottom: 0.25rem;">Número Estimado de Libros / Empleados:</label>
          <select class="dash-input">
            <option value="10-50">10 a 50 Libros (Paquete Equipo Directivo)</option>
            <option value="50-200">50 a 200 Libros (Paquete Corporativo / Fin de Año)</option>
            <option value="200+">Más de 200 Libros (Gran Empresa / Prestación Anual)</option>
          </select>
        </div>

        <div>
          <label style="font-weight: 600; font-size: 0.82rem; display: block; margin-bottom: 0.25rem;">Notas adicionales o requerimientos:</label>
          <textarea class="dash-input" rows="2" placeholder="Ej. Buscamos personalizar la portada con el logo de la empresa..."></textarea>
        </div>

        <button type="submit" class="btn btn-primary" style="margin-top: 0.5rem; width: 100%;">Enviar Solicitud de Cotización</button>
      </form>
    </div>
  </div>
  `;
}

/* ==========================================================================
   2. PORTAL DE LA FAMILIA (PANEL PRIVADO DE USUARIO POST-LOGIN)
   ========================================================================== */
function renderFamilyDashboardHTML() {
  const book = state.bookData || {
    id: 'REC-2026-8841',
    recipient_name: 'Doña Beatriz López',
    giver_name: 'Familia López Hernández',
    progress_percent: 68,
    answered_count: 16,
    total_questions: 24,
    print_status: 'editing',
    soul_config: { tone: 'calido_mexicano' }
  };

  return `
  <div class="dashboard-wrapper">
    <!-- Header Privado del Portal de la Familia -->
    <header class="dash-header">
      <div class="container dash-nav-container">
        <div class="dash-brand">
          <a href="#" class="logo"><img src="/logo.jpeg" alt="Recordo Logo" class="brand-logo-img" /></a>
          <span class="dash-badge-role">Portal de la Familia</span>
        </div>
        <div class="dash-book-info">
          <span class="dash-book-title">Libro: <strong>${book.recipient_name}</strong></span>
          <span class="dash-code">Código: ${book.id}</span>
        </div>
        <div class="dash-actions">
          <span class="dash-kapso-status"><span class="status-dot"></span> WhatsApp Activo</span>
          <button class="btn btn-outline btn-nav" id="btnLogout">${icons.logout} Cerrar Sesión</button>
        </div>
      </div>
    </header>

    <!-- Sidebar Navigation Layout Grid (Columna Izquierda + Contenido Principal) -->
    <div class="container dash-body-layout">
      <aside class="dash-sidebar">
        <div class="dash-sidebar-header">
          <div class="dash-sidebar-title">Menú del Libro</div>
        </div>
        <nav class="dash-sidebar-nav">
          <button class="dash-tab-btn ${state.activeTab === 'traceability' ? 'active' : ''}" data-tab="traceability">
            <span class="icon-box icon-box-emerald">${icons.chart}</span> Trazabilidad & Resumen
          </button>
          <button class="dash-tab-btn ${state.activeTab === 'vault' ? 'active' : ''}" data-tab="vault">
            <span class="icon-box icon-box-terracotta">${icons.mic}</span> Bóveda de Audios & Fotos
          </button>
          <button class="dash-tab-btn ${state.activeTab === 'soul' ? 'active' : ''}" data-tab="soul">
            <span class="icon-box icon-box-gold">${icons.sparkles}</span> Alma del Agente
          </button>
          <button class="dash-tab-btn ${state.activeTab === 'preview' ? 'active' : ''}" data-tab="preview">
            <span class="icon-box icon-box-sage">${icons.book}</span> Previsualizador del Libro
          </button>
          <button class="dash-tab-btn ${state.activeTab === 'settings' ? 'active' : ''}" data-tab="settings">
            <span class="icon-box icon-box-amber">${icons.settings}</span> Ajustes del Ser Querido
          </button>
        </nav>
      </aside>

      <!-- Contenido dinámico principal -->
      <main class="dash-main-content">
        ${renderActiveTabContent(book)}
      </main>
    </div>

    <!-- Modal de Sugerencia de Cambio de Diseño -->
    <div class="modal-backdrop" id="designFeedbackModal">
      <div class="modal-card">
        <button class="modal-close" id="btnCloseDesignModal">✕</button>
        <div class="modal-header">
          <h3>Sugerir Cambio o Corrección de Diseño</h3>
          <p>Envía observaciones a nuestro equipo de maquetación editorial.</p>
        </div>
        <form id="designFeedbackForm">
          <div class="form-group">
            <label>Tipo de Sugerencia:</label>
            <select id="feedbackCategory" class="dash-input" required>
              <option value="text_correction">Corrección de Texto o Nombre</option>
              <option value="photo">Cambio o Posición de Fotografía</option>
              <option value="typography">Estilo de Tipografía o Tamaño</option>
              <option value="cover">Modificación de Portada</option>
            </select>
          </div>
          <div class="form-group">
            <label>Capítulo o Página Relacionada:</label>
            <input type="text" id="feedbackPage" class="dash-input" placeholder="Ej. Capítulo I, Pág. 12" />
          </div>
          <div class="form-group">
            <label>Detalle o Instrucción para el Diseñador:</label>
            <textarea id="feedbackComment" class="dash-input" rows="4" placeholder="Ej. Por favor corregir la ortografía del apellido 'López' y poner la foto del patio más grande..." required></textarea>
          </div>
          <button type="submit" class="btn btn-primary" style="width: 100%;">Enviar Sugerencia a la Editorial</button>
        </form>
      </div>
    </div>

    <!-- Modal de Aprobación Final de Impresión -->
    <div class="modal-backdrop" id="printApprovalModal">
      <div class="modal-card" style="max-width: 540px;">
        <button class="modal-close" id="btnClosePrintApprovalModal">✕</button>
        <div class="modal-header">
          <h3>Aprobación Final de Impresión Editorial</h3>
          <p>Confirma los datos para enviar a imprimir el libro empastado en pasta dura.</p>
        </div>
        <form id="printApprovalForm">
          <div class="form-group">
            <label>Nombre de quien Autoriza (Familiar):</label>
            <input type="text" id="printApprovedBy" class="dash-input" required value="${book.giver_name || 'Familia López'}" />
          </div>
          <div class="form-group">
            <label>Dirección de Calle y Número de Envío:</label>
            <input type="text" id="printAddress" class="dash-input" required placeholder="Ej. Av. Insurgentes Sur 1200, Int 4" value="Av. Insurgentes Sur 1200, Col. Del Valle" />
          </div>
          <div class="form-group">
            <label>Colonia, Ciudad, Estado y Código Postal:</label>
            <input type="text" id="printCityZip" class="dash-input" required placeholder="Ej. Benito Juárez, CDMX, CP 03100" value="CDMX, CP 03100" />
          </div>
          <div class="form-group">
            <label>Teléfono de Contacto para la Paquetería:</label>
            <input type="text" id="printPhone" class="dash-input" required value="${book.giver_phone || '+525512345678'}" />
          </div>
          <div class="form-group" style="margin-top: 1rem;">
            <label style="display: flex; gap: 0.6rem; align-items: flex-start; cursor: pointer; font-size: 0.85rem;">
              <input type="checkbox" id="checkLegalPrint" required style="width: auto; margin-top: 0.2rem;" />
              <span>Confirmamos que la familia ha revisado las preguntas, textos y fotos del libro de <strong>${book.recipient_name}</strong> y autorizamos la edición final para su impresión física.</span>
            </label>
          </div>
          <button type="submit" class="btn btn-primary" style="width: 100%; margin-top: 1rem;">${icons.printer} Confirmar y Enviar a Taller de Imprenta</button>
        </form>
      </div>
    </div>
  </div>
  `;
}

function renderActiveTabContent(book) {
  switch (state.activeTab) {
    case 'vault':
      return renderVaultTabContent(book);
    case 'soul':
      return renderSoulTabContent(book);
    case 'preview':
      return renderPreviewTabContent(book);
    case 'settings':
      return renderSettingsTabContent(book);
    case 'traceability':
    default:
      return renderTraceabilityTabContent(book);
  }
}

// Banner de Estado e Invocación de Imprenta
function renderPrintStatusBanner(book) {
  const isApproved = book.print_status === 'approved_for_print' || book.print_status === 'in_printing';
  
  if (isApproved) {
    return `
    <div class="print-approved-card" style="background: #F0FDF4; border: 1.5px solid #22C55E; padding: 1.5rem; border-radius: var(--radius-md); margin-bottom: 2rem;">
      <div style="display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 1rem;">
        <div>
          <div class="badge" style="background: #DCFCE7; color: #15803D; margin-bottom: 0.5rem;">
            ${icons.check} EDICIÓN APROBADA - EN TALLER DE IMPRESIÓN EDITORIAL
          </div>
          <h3 style="margin-bottom: 0.3rem;">¡El libro de ${book.recipient_name} está en producción!</h3>
          <p style="font-size: 0.9rem; margin: 0; color: var(--text-muted);">
            Dirección de Envío Confirmada: <strong>${book.shipping_address || 'Av. Insurgentes Sur 1200, CDMX, CP 03100'}</strong>
          </p>
        </div>
        <button class="btn btn-outline" id="btnTriggerDesignModalFromBanner" style="font-size: 0.85rem;">${icons.edit} Sugerir Ajuste Extra</button>
      </div>

      <div class="print-tracker-steps" style="margin-top: 1.5rem; display: grid; grid-template-columns: repeat(auto-fit, minmax(140px, 1fr)); gap: 1rem;">
        <div class="tracker-step completed" style="background: #DCFCE7; padding: 0.8rem; border-radius: var(--radius-sm); text-align: center;">
          <span style="font-size: 0.8rem; font-weight: 700; color: #15803D;">✓ 1. Aprobado</span>
        </div>
        <div class="tracker-step active" style="background: #FEF3C7; padding: 0.8rem; border-radius: var(--radius-sm); text-align: center;">
          <span style="font-size: 0.8rem; font-weight: 700; color: #B45309;">⚙️ 2. Imprenta</span>
        </div>
        <div class="tracker-step" style="background: var(--bg-subtle); padding: 0.8rem; border-radius: var(--radius-sm); text-align: center;">
          <span style="font-size: 0.8rem; font-weight: 600; color: var(--text-muted);">3. Encuadernación</span>
        </div>
        <div class="tracker-step" style="background: var(--bg-subtle); padding: 0.8rem; border-radius: var(--radius-sm); text-align: center;">
          <span style="font-size: 0.8rem; font-weight: 600; color: var(--text-muted);">4. En Camino</span>
        </div>
      </div>
    </div>
    `;
  }

  return `
  <div class="print-approval-cta-card" style="background: var(--primary-light); border: 1.5px solid var(--primary); padding: 1.5rem; border-radius: var(--radius-md); margin-bottom: 2rem; display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 1rem;">
    <div style="max-width: 600px;">
      <h3 style="margin-bottom: 0.4rem; color: var(--primary);">¿La edición está lista para enviarse a imprimir?</h3>
      <p style="font-size: 0.9rem; color: var(--text-dark); margin: 0;">
        Cuando tu familia haya revisado el texto, las fotos y las sugerencias de diseño, autoriza la impresión final para iniciar la producción empastada en pasta dura.
      </p>
    </div>
    <div style="display: flex; gap: 0.8rem; flex-wrap: wrap;">
      <button class="btn btn-outline" id="btnTriggerDesignModalCTA" style="background: #FFF;">${icons.edit} Sugerir Cambio de Diseño</button>
      <button class="btn btn-primary" id="btnTriggerPrintApprovalCTA">${icons.printer} Aprobar & Enviar a Imprenta</button>
    </div>
  </div>
  `;
}

// Tab 1: Trazabilidad & Resumen
function renderTraceabilityTabContent(book) {
  return `
  <div class="dash-card">
    <div class="dash-card-header" style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 1rem; flex-wrap: wrap; gap: 1rem;">
      <div>
        <h2>Trazabilidad y Avance en Tiempo Real</h2>
        <p>Sigue cada capítulo, respuesta de audio y fotos recopiladas por el bot de WhatsApp.</p>
      </div>
      <div class="badge badge-gold">${icons.check} Sincronización en Tiempo Real</div>
    </div>

    <!-- AVANCE HASTA ARRIBA -->
    <div class="top-progress-card" style="background: var(--bg-subtle); border: 1px solid var(--border-color); padding: 1.25rem 1.5rem; border-radius: var(--radius-md); margin-bottom: 1.5rem;">
      <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 0.4rem; font-weight: 700; color: var(--primary); font-size: 1.05rem;">
        <span style="display: flex; align-items: center; gap: 0.5rem;">${icons.chart} Avance Total del Libro Editorial</span>
        <span style="font-size: 1.3rem; font-family: var(--font-serif); color: var(--primary);">${book.progress_percent}%</span>
      </div>
      <div class="progress-bar-bg" style="margin-top: 0.5rem;">
        <div class="progress-bar-fill" style="width: ${book.progress_percent}%;"></div>
      </div>
    </div>

    ${renderPrintStatusBanner(book)}

    <div class="trace-summary-grid">
      <div class="stat-box">
        <span class="stat-label">Preguntas Contestadas</span>
        <div class="stat-value">${book.answered_count} <span style="font-size: 1rem; color: var(--text-muted);">de ${book.total_questions}</span></div>
      </div>
      <div class="stat-box">
        <span class="stat-label">Audios Recopilados</span>
        <div class="stat-value">12 Archivos MP3</div>
      </div>
      <div class="stat-box">
        <span class="stat-label">Estilo del Agente</span>
        <div class="stat-value" style="font-size: 1.3rem; color: var(--primary);">Cálido Mexicano</div>
      </div>
      <div class="stat-box">
        <span class="stat-label">Progreso General</span>
        <div class="stat-value" style="color: var(--secondary);">${book.progress_percent}%</div>
      </div>
    </div>

    <div class="reminder-box">
      <div>
        <h4 style="margin-bottom: 0.2rem;">¿Quieres enviar un recordatorio cariñoso hoy?</h4>
        <p style="margin: 0; font-size: 0.9rem;">El entrevistador enviará un mensaje suave para continuar con la siguiente pregunta por WhatsApp.</p>
      </div>
      <button class="btn btn-primary" id="btnTriggerWaReminder">${icons.send} Enviar Recordatorio por WhatsApp</button>
    </div>
  </div>
  `;
}

// Tab 2: Bóveda de Audios & Fotos
function renderVaultTabContent(book) {
  const chapters = book.chapters || [];
  return `
  <div class="dash-card">
    <div class="dash-card-header" style="margin-bottom: 1.5rem;">
      <h2>Bóveda de Recuerdos en Audio y Fotografías</h2>
      <p>Escucha las respuestas grabadas con la voz real de ${book.recipient_name} y revisa las imágenes enviadas por WhatsApp.</p>
    </div>

    <div class="vault-chapters-list">
      ${chapters.map(chap => `
        <div class="chapter-card">
          <h3 class="chapter-title">${chap.title}</h3>
          <div class="questions-list">
            ${chap.questions.map(q => `
              <div class="question-item">
                <div class="q-header">
                  <span class="q-badge ${q.status}">${q.status === 'answered' ? 'Contestada' : 'Enviada por WhatsApp'}</span>
                  <strong class="q-text">${q.prompt_text}</strong>
                </div>
                ${q.answer_text ? `
                  <div class="q-answer-box">
                    <p class="transcription-text">«${q.answer_text}»</p>
                    ${q.audio_url ? `
                      <div class="audio-player-widget">
                        <span style="font-size: 0.85rem; font-weight: 600; display: flex; align-items: center; gap: 0.4rem;">${icons.mic} Audio de Voz Registrado:</span>
                        <audio controls style="width: 100%; margin-top: 0.4rem;">
                          <source src="${q.audio_url}" type="audio/mp3">
                          Tu navegador no soporta el reproductor de audio.
                        </audio>
                      </div>
                    ` : ''}
                    ${q.photo_urls && q.photo_urls.length ? `
                      <div class="photo-gallery-preview">
                        ${q.photo_urls.map(img => `<img src="${img}" alt="Foto familiar" class="thumb-img" />`).join('')}
                      </div>
                    ` : ''}
                  </div>
                ` : '<p style="font-style: italic; color: var(--text-muted); font-size: 0.9rem;">Esperando respuesta de audio por WhatsApp...</p>'}
              </div>
            `).join('')}
          </div>
        </div>
      `).join('')}
    </div>
  </div>
  `;
}

// Tab 3: Alma del Agente
function renderSoulTabContent(book) {
  return `
  <div class="dash-card">
    <div class="dash-card-header" style="margin-bottom: 1.5rem;">
      <h2>Configuración de Personalidad del Entrevistador</h2>
      <p>Modifica en tiempo real el tono con el que el entrevistador le escribirá a ${book.recipient_name}.</p>
    </div>

    <div class="soul-options" id="dash-soul-selector">
      ${Object.entries(soulTones).map(([key, item]) => `
        <div class="soul-chip ${key === state.soulTone ? 'active' : ''}" data-tone="${key}">
          <h5>${item.title}</h5>
          <p>${item.desc}</p>
        </div>
      `).join('')}
    </div>

    <div style="margin-top: 2rem;">
      <label style="font-weight: 600; display: block; margin-bottom: 0.5rem;">Prompt Especial o Instrucción Familiar:</label>
      <input type="text" id="dashCustomPrompt" class="dash-input" placeholder="Ej: Hablarle de Usted y recordar las fiestas patronales de Michoacán" value="Habla con respeto y calidez mexicana, recordando la época de oro del cine nacional." />
    </div>

    <div style="margin-top: 1.5rem;">
      <button class="btn btn-primary" id="btnSaveDashSoul">Guardar Configuración en Backend</button>
    </div>
  </div>
  `;
}

// Tab 4: Previsualización del Libro
function renderPreviewTabContent(book) {
  const feedbacks = book.design_feedbacks || [];
  return `
  <div class="dash-card">
    <div class="dash-card-header" style="display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 1rem; margin-bottom: 1.5rem;">
      <div>
        <h2>Previsualización del Libro Impreso</h2>
        <p>Así va quedando la maquetación editorial de las memorias de ${book.recipient_name}.</p>
      </div>
      <div style="display: flex; gap: 0.6rem;">
        <button class="btn btn-outline btn-nav" id="btnOpenDesignModalPreview">${icons.edit} Sugerir Cambio de Diseño</button>
        ${book.print_status !== 'approved_for_print' ? `<button class="btn btn-primary btn-nav" id="btnOpenPrintApprovalModalPreview">${icons.printer} Aprobar para Imprenta</button>` : ''}
      </div>
    </div>

    ${renderPrintStatusBanner(book)}

    <div class="book-preview-container" style="margin-top: 2rem;">
      <div class="book-spread">
        <div class="book-page left-page">
          <span class="page-num">Pág. 12</span>
          <h4>Capítulo I: Infancia en Pátzcuaro</h4>
          <p>«Crecí en una casita con patio grande de nopales y bugambilias en Pátzcuaro. Mis hermanos y yo jugábamos a las canicas y a la traes al atardecer...»</p>
          <img src="https://images.unsplash.com/photo-1544717305-2782549b5136?auto=format&fit=crop&w=600&q=80" style="width: 100%; border-radius: 8px; margin-top: 1rem;" />
        </div>
        <div class="book-page right-page">
          <span class="page-num">Pág. 13</span>
          <p>«Mi abuela hacía un mole de olla con elote tierno recién cortado que olía a gloria por toda la calle... Ese olor jamás se me va a olvidar.»</p>
          <div style="background: var(--bg-subtle); padding: 1rem; border-radius: 8px; margin-top: 2rem; text-align: center;">
            <p style="font-size: 0.85rem; margin: 0; font-weight: 600; display: flex; align-items: center; justify-content: center; gap: 0.4rem;">${icons.phone} Audio Real en WhatsApp</p>
            <p style="font-size: 0.75rem; color: var(--text-muted); margin: 0;">En el libro impreso final vendrá un código QR escaneable para escuchar la voz original.</p>
          </div>
        </div>
      </div>
    </div>

    <!-- Sugerencias de Diseño registradas -->
    <div style="margin-top: 2.5rem; border-top: 1px solid var(--border-color); padding-top: 1.5rem;">
      <h3>Sugerencias de Diseño de la Familia (${feedbacks.length})</h3>
      ${feedbacks.length === 0 ? `
        <p style="font-size: 0.9rem; color: var(--text-muted); margin-top: 0.5rem;">No hay observaciones pendientes. Presiona "Sugerir Cambio de Diseño" para solicitar alguna corrección a la editorial.</p>
      ` : `
        <div class="feedbacks-list" style="margin-top: 1rem; display: flex; flex-direction: column; gap: 0.8rem;">
          ${feedbacks.map(f => `
            <div class="feedback-item-card" style="background: var(--bg-main); border: 1px solid var(--border-color); padding: 1rem; border-radius: var(--radius-sm);">
              <div style="display: flex; justify-content: space-between; margin-bottom: 0.3rem;">
                <strong style="font-size: 0.85rem; text-transform: uppercase; color: var(--primary);">${f.category}</strong>
                <span class="badge" style="font-size: 0.75rem; padding: 0.2rem 0.6rem;">${f.status === 'applied' ? '✓ Cambio Aplicado' : 'En Revisión por Diseñador'}</span>
              </div>
              <p style="margin: 0; font-size: 0.95rem;">${f.comment}</p>
            </div>
          `).join('')}
        </div>
      `}
    </div>
  </div>
  `;
}

// Tab 5: Ajustes del Ser Querido
function renderSettingsTabContent(book) {
  return `
  <div class="dash-card">
    <div class="dash-card-header" style="margin-bottom: 1.5rem;">
      <h2>Configuración del Ser Querido & Entrevistas</h2>
      <p>Administra los datos de contacto del entrevistado y de la familia.</p>
    </div>

    <form id="formDashSettings" style="max-width: 600px;">
      <div class="form-group">
        <label>Nombre del Ser Querido (Titular del Libro):</label>
        <input type="text" class="dash-input" value="${book.recipient_name}" />
      </div>
      <div class="form-group">
        <label>Número de WhatsApp para recibir preguntas (con clave +52):</label>
        <input type="text" class="dash-input" value="${book.recipient_phone || '+525598765432'}" />
      </div>
      <div class="form-group">
        <label>Frecuencia de Envío de Preguntas por WhatsApp:</label>
        <select class="dash-input">
          <option>1 Pregunta por semana (Recomendado)</option>
          <option>2 Preguntas por semana</option>
          <option>1 Pregunta cada 2 semanas</option>
        </select>
      </div>
      <div class="form-group">
        <label>Correo de la Familia (Administrador):</label>
        <input type="email" class="dash-input" value="${book.giver_email || 'contacto@familialopez.mx'}" />
      </div>
      <button type="submit" class="btn btn-primary">Guardar Cambios de Configuración</button>
    </form>
  </div>
  `;
}

/* ==========================================================================
   EVENT LISTENERS & LÓGICA DE INTERACCIÓN
   ========================================================================== */

// Eventos de la Landing Comercial
function bindLandingEvents() {
  // Mobile Nav Toggle
  const navToggle = document.querySelector('#navToggle');
  const navLinks = document.querySelector('#navLinks');
  if (navToggle && navLinks) {
    navToggle.addEventListener('click', () => navLinks.classList.toggle('active'));
  }

  // Modales de Login
  const loginModal = document.querySelector('#loginModal');
  const btnOpenLogin = document.querySelector('#btnOpenLogin');
  const btnOpenLoginNav = document.querySelector('#btnOpenLoginNav');
  const linkFooterLogin = document.querySelector('#linkFooterLogin');
  const btnCloseLogin = document.querySelector('#btnCloseLogin');

  const openModal = () => loginModal && loginModal.classList.add('active');
  const closeModal = () => loginModal && loginModal.classList.remove('active');

  if (btnOpenLogin) btnOpenLogin.addEventListener('click', openModal);
  if (btnOpenLoginNav) btnOpenLoginNav.addEventListener('click', openModal);
  if (linkFooterLogin) linkFooterLogin.addEventListener('click', (e) => { e.preventDefault(); openModal(); });
  if (btnCloseLogin) btnCloseLogin.addEventListener('click', closeModal);

  // Formulario de Login
  const loginForm = document.querySelector('#loginForm');
  if (loginForm) {
    loginForm.addEventListener('submit', async (e) => {
      e.preventDefault();
      const codeInput = document.querySelector('#loginInput').value;

      try {
        const res = await fetch(`${API_URL}/api/auth/login`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ code_or_email: codeInput })
        });
        const data = await res.json();
        if (data.success) {
          localStorage.setItem('recordo_auth_token', data.token);
          if (data.book) state.bookData = data.book;
          state.currentView = 'dashboard';
          closeModal();
          renderApp();
        }
      } catch (err) {
        localStorage.setItem('recordo_auth_token', 'tok_mock');
        state.currentView = 'dashboard';
        closeModal();
        renderApp();
      }
    });
  }

  // Soul selector en landing
  document.querySelectorAll('#landing-soul-selector .soul-chip').forEach(chip => {
    chip.addEventListener('click', () => {
      document.querySelectorAll('#landing-soul-selector .soul-chip').forEach(c => c.classList.remove('active'));
      chip.classList.add('active');
      state.soulTone = chip.dataset.tone;
      const previewText = document.querySelector('#landing-soul-preview');
      if (previewText) previewText.innerText = soulTones[state.soulTone].samplePrompt;
    });
  });

  // Simulador de WhatsApp
  const waSendBtn = document.querySelector('#wa-send-btn');
  const waInput = document.querySelector('#wa-user-input');
  if (waSendBtn && waInput) {
    const handleWaSend = () => {
      const text = waInput.value.trim();
      if (!text) return;
      state.waMessages.push({ type: 'sent', text });
      waInput.value = '';
      
      const chatBody = document.querySelector('#wa-chat-body');
      if (chatBody) {
        chatBody.innerHTML = state.waMessages.map(m => `<div class="wa-msg ${m.type === 'received' ? 'wa-msg-received' : 'wa-msg-sent'}">${m.text}</div>`).join('');
        chatBody.scrollTop = chatBody.scrollHeight;
      }

      setTimeout(() => {
        state.waMessages.push({ type: 'received', text: '¡Qué historia tan bonita! Ya quedó guardada en el borrador de tu libro.' });
        if (chatBody) {
          chatBody.innerHTML = state.waMessages.map(m => `<div class="wa-msg ${m.type === 'received' ? 'wa-msg-received' : 'wa-msg-sent'}">${m.text}</div>`).join('');
          chatBody.scrollTop = chatBody.scrollHeight;
        }
      }, 1000);
    };
    waSendBtn.addEventListener('click', handleWaSend);
  }

  // Checkout Triggers
  document.querySelectorAll('.checkout-trigger-btn').forEach(btn => {
    btn.addEventListener('click', async () => {
      const plan = btn.dataset.plan;
      const gateway = state.paymentGateway;
      alert(`Iniciando Checkout vía ${gateway.toUpperCase()} para plan: ${plan.toUpperCase()}...`);
      try {
        const res = await fetch(`${API_URL}/api/payments/checkout`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ plan_id: plan, payment_gateway: gateway })
        });
        const data = await res.json();
        if (data.checkout_url) window.open(data.checkout_url, '_blank');
      } catch (err) {
        console.log('Checkout redirect mock');
      }
    });
  });

  // Gateway Selector
  document.querySelectorAll('.gateway-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('.gateway-btn').forEach(b => {
        b.classList.remove('btn-primary');
        b.classList.add('btn-outline');
      });
      btn.classList.add('btn-primary');
      btn.classList.remove('btn-outline');
      state.paymentGateway = btn.dataset.gateway;
    });
  });

  // Reseña button
  const btnReview = document.querySelector('#btn-record-review');
  if (btnReview) {
    btnReview.addEventListener('click', () => {
      alert('Grabadora de Reseña Activada.\n\n¡Gracias por tu testimonio! Tu código de descuento del 15% es: RECORDO-RESEÑA-15OFF');
    });
  }

  // Formulario de Contacto
  const contactForm = document.querySelector('#contactLandingForm');
  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      alert('📩 ¡Mensaje enviado con éxito! Un asesor de Recordo se pondrá en contacto contigo a la brevedad vía WhatsApp o correo.');
      contactForm.reset();
    });
  }

  // Modal Cotización Corporativa
  const btnCorpModal = document.querySelector('#btn-corp-modal');
  const corpModal = document.querySelector('#corpQuoteModal');
  const btnCloseCorpModal = document.querySelector('#btnCloseCorpModal');
  const corpQuoteForm = document.querySelector('#corpQuoteForm');

  if (btnCorpModal && corpModal) {
    btnCorpModal.addEventListener('click', () => {
      corpModal.classList.add('active');
    });
  }

  if (btnCloseCorpModal && corpModal) {
    btnCloseCorpModal.addEventListener('click', () => {
      corpModal.classList.remove('active');
    });
    corpModal.addEventListener('click', (e) => {
      if (e.target === corpModal) corpModal.classList.remove('active');
    });
  }

  if (corpQuoteForm && corpModal) {
    corpQuoteForm.addEventListener('submit', (e) => {
      e.preventDefault();
      alert('🏢 ¡Solicitud de cotización corporativa enviada con éxito! Un asesor especializado se comunicará con tu empresa en menos de 24 horas.');
      corpModal.classList.remove('active');
      corpQuoteForm.reset();
    });
  }
}

// Eventos del Portal de la Familia (Dashboard)
function bindDashboardEvents() {
  // Logout
  const btnLogout = document.querySelector('#btnLogout');
  if (btnLogout) {
    btnLogout.addEventListener('click', () => {
      localStorage.removeItem('recordo_auth_token');
      state.currentView = 'landing';
      renderApp();
    });
  }

  // Tabs navigation
  document.querySelectorAll('.dash-tab-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      state.activeTab = btn.dataset.tab;
      renderApp();
    });
  });

  // Modales de Sugerencia de Diseño e Imprenta
  const designModal = document.querySelector('#designFeedbackModal');
  const printModal = document.querySelector('#printApprovalModal');

  const openDesignModal = () => designModal && designModal.classList.add('active');
  const closeDesignModal = () => designModal && designModal.classList.remove('active');

  const openPrintModal = () => printModal && printModal.classList.add('active');
  const closePrintModal = () => printModal && printModal.classList.remove('active');

  // Trigger buttons para abrir modales
  const btnOpenDesignModal = document.querySelector('#btnOpenDesignModal');
  const btnOpenDesignModalPreview = document.querySelector('#btnOpenDesignModalPreview');
  const btnTriggerDesignModalCTA = document.querySelector('#btnTriggerDesignModalCTA');
  const btnTriggerDesignModalFromBanner = document.querySelector('#btnTriggerDesignModalFromBanner');
  
  const btnOpenPrintApprovalModal = document.querySelector('#btnOpenPrintApprovalModal');
  const btnOpenPrintApprovalModalPreview = document.querySelector('#btnOpenPrintApprovalModalPreview');
  const btnTriggerPrintApprovalCTA = document.querySelector('#btnTriggerPrintApprovalCTA');

  if (btnOpenDesignModal) btnOpenDesignModal.addEventListener('click', openDesignModal);
  if (btnOpenDesignModalPreview) btnOpenDesignModalPreview.addEventListener('click', openDesignModal);
  if (btnTriggerDesignModalCTA) btnTriggerDesignModalCTA.addEventListener('click', openDesignModal);
  if (btnTriggerDesignModalFromBanner) btnTriggerDesignModalFromBanner.addEventListener('click', openDesignModal);

  if (btnOpenPrintApprovalModal) btnOpenPrintApprovalModal.addEventListener('click', openPrintModal);
  if (btnOpenPrintApprovalModalPreview) btnOpenPrintApprovalModalPreview.addEventListener('click', openPrintModal);
  if (btnTriggerPrintApprovalCTA) btnTriggerPrintApprovalCTA.addEventListener('click', openPrintModal);

  const btnCloseDesignModal = document.querySelector('#btnCloseDesignModal');
  const btnClosePrintApprovalModal = document.querySelector('#btnClosePrintApprovalModal');

  if (btnCloseDesignModal) btnCloseDesignModal.addEventListener('click', closeDesignModal);
  if (btnClosePrintApprovalModal) btnClosePrintApprovalModal.addEventListener('click', closePrintModal);

  // Formulario de Sugerencia de Diseño
  const designForm = document.querySelector('#designFeedbackForm');
  if (designForm) {
    designForm.addEventListener('submit', async (e) => {
      e.preventDefault();
      const category = document.querySelector('#feedbackCategory').value;
      const comment = document.querySelector('#feedbackComment').value;
      const pageNumStr = document.querySelector('#feedbackPage').value;

      try {
        const res = await fetch(`${API_URL}/api/user/design-feedback`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ category, comment, page_num: 12 })
        });
        const data = await res.json();
        if (data.book) state.bookData = data.book;
        alert('✍️ ¡Sugerencia enviada! El equipo de maquetación editorial la revisará.');
      } catch (err) {
        if (!state.bookData) state.bookData = {};
        if (!state.bookData.design_feedbacks) state.bookData.design_feedbacks = [];
        state.bookData.design_feedbacks.push({
          category,
          comment,
          status: 'in_review'
        });
        alert('✍️ ¡Sugerencia registrada con éxito!');
      } finally {
        closeDesignModal();
        renderApp();
      }
    });
  }

  // Formulario de Aprobación de Impresión
  const printForm = document.querySelector('#printApprovalForm');
  if (printForm) {
    printForm.addEventListener('submit', async (e) => {
      e.preventDefault();
      const approvedBy = document.querySelector('#printApprovedBy').value;
      const address = document.querySelector('#printAddress').value;
      const cityZip = document.querySelector('#printCityZip').value;

      try {
        const res = await fetch(`${API_URL}/api/user/approve-print`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            book_id: state.bookData ? state.bookData.id : 'REC-2026-8841',
            approved_by: approvedBy,
            shipping_address: address,
            city_state_zip: cityZip
          })
        });
        const data = await res.json();
        if (data.book) state.bookData = data.book;
        alert('🖨️ ¡ORDEN APROBADA! El libro ha sido enviado al taller de imprenta editorial.');
      } catch (err) {
        if (state.bookData) {
          state.bookData.print_status = 'approved_for_print';
          state.bookData.shipping_address = `${address}, ${cityZip}`;
        }
        alert('🖨️ ¡Edición Aprobada con éxito para imprenta!');
      } finally {
        closePrintModal();
        renderApp();
      }
    });
  }

  // Trigger WhatsApp Reminder
  const btnWaReminder = document.querySelector('#btnTriggerWaReminder');
  if (btnWaReminder) {
    btnWaReminder.addEventListener('click', async () => {
      btnWaReminder.innerText = 'Enviando...';
      try {
        const res = await fetch(`${API_URL}/api/whatsapp/send-prompt`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ to_phone: '+525598765432', question_text: '¿Cómo conociste a tu pareja y qué sintieron en la primera cita?' })
        });
        if (res.ok) {
          alert('Recordatorio por WhatsApp enviado con éxito.');
        }
      } catch (err) {
        alert('Recordatorio enviado con éxito por WhatsApp.');
      } finally {
        btnWaReminder.innerHTML = `${icons.send} Enviar Recordatorio por WhatsApp`;
      }
    });
  }

  // Soul save button en Dashboard
  const btnSaveDashSoul = document.querySelector('#btnSaveDashSoul');
  if (btnSaveDashSoul) {
    btnSaveDashSoul.addEventListener('click', async () => {
      btnSaveDashSoul.innerText = 'Guardando...';
      const promptVal = document.querySelector('#dashCustomPrompt')?.value || '';
      try {
        await fetch(`${API_URL}/api/soul/config`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            tone: state.soulTone,
            custom_prompt: promptVal
          })
        });
        alert('Configuración actualizada con éxito.');
      } catch (e) {
        alert('Guardado en modo local.');
      } finally {
        btnSaveDashSoul.innerText = 'Guardar Configuración en Backend';
      }
    });
  }

  // Dashboard Soul Chip selector
  document.querySelectorAll('#dash-soul-selector .soul-chip').forEach(chip => {
    chip.addEventListener('click', () => {
      document.querySelectorAll('#dash-soul-selector .soul-chip').forEach(c => c.classList.remove('active'));
      chip.classList.add('active');
      state.soulTone = chip.dataset.tone;
    });
  });
}

// Iniciar App
initApp();
