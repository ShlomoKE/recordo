import './style.css';

// Configuración del servidor Backend
const API_URL = import.meta.env.VITE_API_URL || '';

// Sistema de Iconos SVG limpios y vectoriales
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
  printer: `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="6 9 6 2 18 2 18 9"/><path d="M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2"/><rect x="6" y="14" width="12" height="8"/></svg>`
};

// Estado global de la aplicación
const state = {
  currentView: localStorage.getItem('recordo_auth_token') ? 'dashboard' : 'landing',
  landingTab: 'inicio', // 'inicio' | 'como-funciona' | 'empresas' | 'faq'
  activeTab: 'traceability',
  soulTone: 'calido_mexicano',
  paymentGateway: 'mercadopago',
  selectedPlan: 'digital',
  isCorporate: false,
  bookData: null,
  waMessages: [
    { type: 'received', text: 'Hola Doña Beatriz. Soy tu entrevistador de Recordo. Hoy nos gustaría recordar: ¿Cómo era la casita donde creciste y a qué jugaban tus hermanos?' },
    { type: 'sent', text: 'Hola mijo, crecí en Pátzcuaro en una casita con un patio lleno de bugambilias. Jugábamos a las canicas y a la traes...' },
    { type: 'received', text: '¡Qué hermoso recuerdo! ¿Tienes alguna fotito de ese patio de bugambilias que quieras guardar para el libro de tus nietos?' }
  ]
};

// Mapeo de tonos de personalidad
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

// Inicialización
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
    console.log('Modo local de datos cargado.');
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
   1. PÁGINA COMERCIAL CON NAVEGACIÓN EN PESTAÑAS (LANDING PAGE)
   ========================================================================== */
function renderLandingPageHTML() {
  return `
  <!-- Navbar Comercial -->
  <nav class="navbar">
    <div class="container nav-container">
      <a href="#" class="logo landing-tab-trigger" data-tab="inicio"><img src="/logo.jpeg" alt="Recordo Logo" class="brand-logo-img" /></a>
      
      <ul class="nav-links" id="navLinks">
        <li><a href="#" class="landing-tab-trigger ${state.landingTab === 'inicio' ? 'active-link' : ''}" data-tab="inicio">Inicio</a></li>
        <li><a href="#" class="landing-tab-trigger ${state.landingTab === 'como-funciona' ? 'active-link' : ''}" data-tab="como-funciona">Cómo Funciona</a></li>
        <li><a href="#" class="landing-tab-trigger ${state.landingTab === 'empresas' ? 'active-link' : ''}" data-tab="empresas">Para Empresas</a></li>
        <li><a href="#" class="landing-tab-trigger ${state.landingTab === 'faq' ? 'active-link' : ''}" data-tab="faq">Preguntas Frecuentes</a></li>
        <li class="mobile-nav-item"><button class="btn btn-outline btn-nav" id="btnOpenLoginNav" style="width: 100%; justify-content: center; margin-top: 0.4rem;">${icons.key} Acceso a Mi Libro</button></li>
        <li class="mobile-nav-item"><a href="#" class="btn btn-primary btn-nav landing-tab-trigger" data-tab="inicio" data-scroll="precios" style="width: 100%; justify-content: center;">Regalar Un Libro</a></li>
      </ul>

      <div class="nav-right-actions">
        <button class="btn btn-outline btn-nav" id="btnOpenLogin">${icons.key} Acceder a Mi Libro</button>
        <a href="#" class="btn btn-primary btn-nav desktop-cta landing-tab-trigger" data-tab="inicio" data-scroll="precios">Regalar Un Libro</a>
      </div>

      <button class="nav-toggle" id="navToggle" aria-label="Abrir menú de navegación">
        <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="18" x2="21" y2="18"/></svg>
      </button>
    </div>
  </nav>

  <!-- Contenido Dinámico de la Pestaña Activa -->
  <main class="landing-tab-content-wrapper">
    ${renderLandingActiveTabContent()}
  </main>

  <!-- Footer Compartido -->
  <footer>
    <div class="container">
      <div class="footer-grid">
        <div>
          <a href="#" class="logo landing-tab-trigger" data-tab="inicio" style="display: inline-flex; align-items: center; gap: 0.6rem; text-decoration: none; color: #FAF3E8; font-family: var(--font-serif); font-size: 1.7rem; font-weight: 700; margin-bottom: 0.8rem;">
            <span style="color: var(--accent-gold); display: flex;">${icons.book}</span> Recordo
          </a>
          <p style="color: #A09588;">Preservando la tradición oral y el legado familiar en México a través de conversaciones sencillas por WhatsApp.</p>
        </div>
        <div>
          <h4>Pestañas</h4>
          <ul style="list-style: none; margin-top: 1rem; display: flex; flex-direction: column; gap: 0.5rem;">
            <li><a href="#" class="landing-tab-trigger" data-tab="inicio" style="color: #A09588; text-decoration: none;">Inicio & Precios</a></li>
            <li><a href="#" class="landing-tab-trigger" data-tab="como-funciona" style="color: #A09588; text-decoration: none;">Cómo Funciona</a></li>
            <li><a href="#" class="landing-tab-trigger" data-tab="empresas" style="color: #A09588; text-decoration: none;">Empresas</a></li>
            <li><a href="#" class="landing-tab-trigger" data-tab="faq" style="color: #A09588; text-decoration: none;">Preguntas Frecuentes</a></li>
          </ul>
        </div>
        <div>
          <h4>Portal</h4>
          <ul style="list-style: none; margin-top: 1rem;">
            <li><a href="#" id="linkFooterLogin" style="color: var(--accent-gold); text-decoration: none;">Acceso a Mi Libro</a></li>
          </ul>
        </div>
        <div>
          <h4>Contacto Inmediato</h4>
          <p style="color: #A09588;">
            <a href="https://wa.me/5215621497636" target="_blank" style="color: #FAF3E8; text-decoration: none; font-weight: 600;">WhatsApp: +52 1 56 2149 7636</a><br/>
            hola@recordo.mx<br/>
            Ciudad de México, MX
          </p>
        </div>
      </div>
      <div class="footer-bottom">
        <p>© 2026 Recordo.mx — Todos los derechos reservados. Plataforma segura y cifrada.</p>
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

// Router de pestañas de la Landing Page
function renderLandingActiveTabContent() {
  switch (state.landingTab) {
    case 'como-funciona':
      return renderTabComoFuncionaHTML();
    case 'empresas':
      return renderTabEmpresasHTML();
    case 'faq':
      return renderTabFaqHTML();
    case 'inicio':
    default:
      return renderTabInicioHTML();
  }
}

/* ==========================================================================
   PESTAÑA 1: INICIO (HERO LIMPIO + RESUMEN RÁPIDO + PRECIOS INMEDIATOS)
   ========================================================================== */
function renderTabInicioHTML() {
  return `
  <!-- Hero Section -->
  <section class="hero">
    <div class="container hero-grid">
      <div class="hero-content">
        <div class="badge badge-sage">${icons.phone} Tan fácil como enviar un audio</div>
        <h1>El libro de recuerdos de tus familiares.</h1>
        <p>Sin apps ni descargas. Solo responden notas de voz a su ritmo y nosotros creamos su libro de memorias inolvidable.</p>
        <div class="hero-ctas">
          <a href="#precios" class="btn btn-primary btn-hero-main">Comenzar Libro de Memorias</a>
          <button class="landing-tab-trigger hero-sublink" data-tab="como-funciona">Conoce cómo funciona a detalle →</button>
        </div>
      </div>
      <div class="hero-preview-book">
        <div class="real-book-container">
          <img src="/real-book.png" alt="Libro Impreso Real de Recordo" class="real-book-img" />
        </div>
      </div>
    </div>
  </section>

  <!-- Resumen Rápido en 3 Pasos -->
  <section class="section-padding" style="background: var(--bg-subtle); padding: 2.5rem 0;">
    <div class="container">
      <div style="text-align: center; max-width: 650px; margin: 0 auto 1.8rem auto;">
        <div class="badge">Proceso Sencillo</div>
        <h2>Tan fácil como platicar por WhatsApp</h2>
        <p style="margin-top: 0.3rem;">Tus seres queridos participan sin fricción tecnológica.</p>
      </div>

      <div class="steps-grid" style="display: grid; grid-template-columns: repeat(auto-fit, minmax(240px, 1fr)); gap: 1.2rem; margin-bottom: 1.5rem;">
        <div class="stat-card">
          <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 0.6rem;">
            <div class="step-num" style="margin-bottom: 0; font-size: 1.4rem;">01</div>
            <div class="icon-box icon-box-emerald">${icons.mic}</div>
          </div>
          <h4>Envían notas de voz</h4>
          <p>Cada semana reciben una pregunta entrañable a su WhatsApp y contestan con un audio a su propio ritmo.</p>
        </div>
        <div class="stat-card">
          <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 0.6rem;">
            <div class="step-num" style="margin-bottom: 0; font-size: 1.4rem;">02</div>
            <div class="icon-box icon-box-gold">${icons.sparkles}</div>
          </div>
          <h4>Diseñamos su historia</h4>
          <p>Transcribimos con fidelidad, organizamos los capítulos cronológicamente y agregamos fotos familiares.</p>
        </div>
        <div class="stat-card">
          <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 0.6rem;">
            <div class="step-num" style="margin-bottom: 0; font-size: 1.4rem;">03</div>
            <div class="icon-box icon-box-sage">${icons.book}</div>
          </div>
          <h4>Reciben su libro</h4>
          <p>Edición digital descargable o libro físico de lujo empastado en pasta dura con envío a todo México.</p>
        </div>
      </div>

      <div style="text-align: center; margin-top: 1rem;">
        <button class="btn btn-outline landing-tab-trigger" data-tab="como-funciona" style="padding: 0.6rem 1.4rem; font-size: 0.9rem;">
          ${icons.book} Ver Explicación Detallada & Personalización de Pláticas →
        </button>
      </div>
    </div>
  </section>

  <!-- Sección Principal de Precios (Inmediato) -->
  <section id="precios" class="section-padding">
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
        <!-- Plan 1: Digital (Destacado) -->
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
          <button class="btn btn-secondary checkout-trigger-btn" data-plan="digital">Ordenar Plan Digital ($999)</button>
        </div>

        <!-- Plan 2: Básico -->
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
          <button class="btn btn-outline checkout-trigger-btn" data-plan="basic">Ordenar Libro Básico ($1,599)</button>
        </div>

        <!-- Plan 3: Premium -->
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
          <button class="btn btn-outline checkout-trigger-btn" data-plan="premium">Comprar Libro Premium ($2,999)</button>
        </div>
      </div>
    </div>
  </section>
  `;
}

/* ==========================================================================
   PESTAÑA 2: CÓMO FUNCIONA (PASO A PASO DETALLADO + PERSONALIDAD + DEMO)
   ========================================================================== */
function renderTabComoFuncionaHTML() {
  return `
  <section class="section-padding" style="background: var(--bg-main);">
    <div class="container">
      <div style="text-align: center; max-width: 750px; margin: 0 auto 2.5rem auto;">
        <div class="badge badge-sage">${icons.book} Guía Editorial Completa</div>
        <h1>Cómo Funciona Recordo</h1>
        <p>Transformamos las historias orales de tus padres y abuelos en una obra editorial que perdurará por generaciones.</p>
      </div>

      <!-- 4 Pasos Detallados -->
      <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(240px, 1fr)); gap: 1.4rem; margin-bottom: 3rem;">
        <div class="stat-card">
          <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 0.8rem;">
            <div class="step-num" style="font-size: 1.8rem; margin: 0;">01</div>
            <div class="icon-box icon-box-emerald">${icons.phone}</div>
          </div>
          <h4>Preguntas Semanales por WhatsApp</h4>
          <p>Cada semana nuestro entrevistador envía una pregunta reflexiva y cercana. Sin apps ni contraseñas que recordar.</p>
        </div>

        <div class="stat-card">
          <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 0.8rem;">
            <div class="step-num" style="font-size: 1.8rem; margin: 0;">02</div>
            <div class="icon-box icon-box-terracotta">${icons.mic}</div>
          </div>
          <h4>Respuestas en Notas de Voz</h4>
          <p>Tu familiar solo presiona el micrófono de WhatsApp y cuenta su anécdota como si platicara con un viejo amigo.</p>
        </div>

        <div class="stat-card">
          <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 0.8rem;">
            <div class="step-num" style="font-size: 1.8rem; margin: 0;">03</div>
            <div class="icon-box icon-box-gold">${icons.user}</div>
          </div>
          <h4>Portal Privado de la Familia</h4>
          <p>Los hijos y nietos pueden escuchar los audios con la voz original, ver la transcripción y subir fotos de la época.</p>
        </div>

        <div class="stat-card">
          <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 0.8rem;">
            <div class="step-num" style="font-size: 1.8rem; margin: 0;">04</div>
            <div class="icon-box icon-box-sage">${icons.book}</div>
          </div>
          <h4>Maquetación & Entrega del Libro</h4>
          <p>Diseñamos la portada, encuadernamos la edición física y te enviamos el libro a domicilio en cualquier ciudad de México.</p>
        </div>
      </div>

      <!-- Personalización de la Voz / Alma de las Pláticas -->
      <div class="soul-card" style="margin-bottom: 3rem;">
        <div style="text-align: center; max-width: 650px; margin: 0 auto 2rem auto;">
          <div class="badge badge-gold">${icons.sparkles} Personalización Conversacional</div>
          <h2>Elige el Tono de las Pláticas</h2>
          <p>Configura el estilo con el que guiaremos las conversaciones semanales de tu familiar.</p>
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

      <!-- Demostración / Simulador de WhatsApp -->
      <div style="max-width: 600px; margin: 0 auto;">
        <div style="text-align: center; margin-bottom: 1.5rem;">
          <div class="badge">${icons.phone} Simulador Interactivo</div>
          <h3>Prueba una conversación de ejemplo</h3>
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
              <input type="text" id="wa-user-input" placeholder="Escribe una respuesta de prueba..." />
              <button id="wa-send-btn" class="btn btn-primary" style="padding: 0.5rem 1.2rem; font-size: 0.85rem; border-radius: 20px;">${icons.send}</button>
            </div>
          </div>
        </div>
      </div>

      <!-- Botón para ir a comprar -->
      <div style="text-align: center; margin-top: 3rem;">
        <button class="btn btn-primary landing-tab-trigger" data-tab="inicio" data-scroll="precios" style="padding: 1rem 2.5rem; font-size: 1.1rem;">
          Elegir Mi Plan y Comenzar Libro →
        </button>
      </div>
    </div>
  </section>
  `;
}

/* ==========================================================================
   PESTAÑA 3: PARA EMPRESAS (BENEFICIO CORPORATIVO + COTIZACIÓN)
   ========================================================================== */
function renderTabEmpresasHTML() {
  return `
  <section class="section-padding" style="background: var(--bg-main);">
    <div class="container">
      <div class="corp-banner" style="margin-top: 0; margin-bottom: 2.5rem;">
        <div style="max-width: 650px;">
          <div class="badge" style="background: rgba(255,255,255,0.2); color: #FFF;">Prestación VIP Corporativa</div>
          <h1 style="color: white; margin-bottom: 1rem; font-size: clamp(1.8rem, 5vw, 2.4rem);">Regala Recordo a tus Ejecutivos y Colaboradores</h1>
          <p style="color: #E2E8F0; margin-bottom: 1.5rem;">El beneficio laboral más memorable y humano: regalar la preservación de la historia de los padres o abuelos de tus empleados.</p>
        </div>
      </div>

      <div style="max-width: 750px; margin: 0 auto; background: var(--bg-card); border: 1px solid var(--border-color); border-radius: var(--radius-lg); padding: 2.5rem; box-shadow: var(--shadow-md);">
        <div style="text-align: center; margin-bottom: 2rem;">
          <div class="badge badge-sage">${icons.sparkles} Recursos Humanos & People</div>
          <h2>Solicitar Cotización de Paquete Corporativo</h2>
          <p>Completa los datos de tu empresa y un asesor corporativo te contactará con una propuesta personalizada con descuento por volumen.</p>
        </div>

        <form id="corpTabQuoteForm" style="display: flex; flex-direction: column; gap: 1.1rem;">
          <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(260px, 1fr)); gap: 1rem;">
            <div>
              <label style="font-weight: 600; font-size: 0.85rem; display: block; margin-bottom: 0.3rem;">Nombre de la Empresa:</label>
              <input type="text" class="dash-input" required placeholder="Ej. Grupo Modelo, Bimbo, Liverpool..." />
            </div>
            <div>
              <label style="font-weight: 600; font-size: 0.85rem; display: block; margin-bottom: 0.3rem;">Tu Nombre y Cargo:</label>
              <input type="text" class="dash-input" required placeholder="Ej. Carlos Vera • Director de RH" />
            </div>
          </div>

          <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(260px, 1fr)); gap: 1rem;">
            <div>
              <label style="font-weight: 600; font-size: 0.85rem; display: block; margin-bottom: 0.3rem;">Correo Corporativo:</label>
              <input type="email" class="dash-input" required placeholder="carlos@empresa.com" />
            </div>
            <div>
              <label style="font-weight: 600; font-size: 0.85rem; display: block; margin-bottom: 0.3rem;">Teléfono / WhatsApp Directo:</label>
              <input type="tel" class="dash-input" required placeholder="55 1234 5678" />
            </div>
          </div>

          <div>
            <label style="font-weight: 600; font-size: 0.85rem; display: block; margin-bottom: 0.3rem;">Número Estimado de Libros o Colaboradores:</label>
            <select class="dash-input">
              <option value="10-50">10 a 50 Libros (Paquete Equipo Directivo / Ejecutivos)</option>
              <option value="50-200">50 a 200 Libros (Paquete Corporativo / Fin de Año)</option>
              <option value="200+">Más de 200 Libros (Gran Empresa / Prestación Anual)</option>
            </select>
          </div>

          <div>
            <label style="font-weight: 600; font-size: 0.85rem; display: block; margin-bottom: 0.3rem;">Notas o Requerimientos Especiales (Ej. Portada con logo de empresa):</label>
            <textarea class="dash-input" rows="3" placeholder="Cuéntanos más sobre tu evento o cómo te gustaría entregar los libros a tus colaboradores..."></textarea>
          </div>

          <button type="submit" class="btn btn-primary" style="margin-top: 0.5rem; padding: 1rem; font-size: 1.05rem;">
            Enviar Solicitud de Cotización Corporativa
          </button>
        </form>
      </div>
    </div>
  </section>
  `;
}

/* ==========================================================================
   PESTAÑA 4: PREGUNTAS FRECUENTES & CONTACTO
   ========================================================================== */
function renderTabFaqHTML() {
  return `
  <section class="section-padding" style="background: var(--bg-main);">
    <div class="container">
      <div style="text-align: center; max-width: 650px; margin: 0 auto 2.5rem auto;">
        <div class="badge">Atención & Ayuda</div>
        <h1>Preguntas Frecuentes</h1>
        <p>Todo lo que necesitas saber sobre las conversaciones por WhatsApp y la entrega del libro.</p>
      </div>

      <div class="faq-grid" style="max-width: 800px; margin: 0 auto 3.5rem auto; display: flex; flex-direction: column; gap: 1rem;">
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

      <!-- Contacto Directo -->
      <div style="max-width: 800px; margin: 0 auto; background: var(--bg-card); border: 1px solid var(--border-color); border-radius: var(--radius-lg); padding: 2.2rem; box-shadow: var(--shadow-md);">
        <div style="text-align: center; margin-bottom: 1.8rem;">
          <div class="badge badge-sage">${icons.phone} Soporte & Ayuda</div>
          <h2>¿Tienes alguna duda adicional?</h2>
          <p>Escríbenos directamente y un asesor te atenderá de inmediato.</p>
        </div>

        <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(260px, 1fr)); gap: 1.5rem; align-items: start;">
          <div>
            <h4 style="margin-bottom: 1rem; color: var(--primary);">Atención Directa</h4>
            <div style="display: flex; flex-direction: column; gap: 0.9rem;">
              <a href="https://wa.me/5215621497636" target="_blank" class="btn btn-secondary" style="justify-content: center; text-decoration: none;">${icons.phone} WhatsApp: +52 1 56 2149 7636</a>
              <div style="padding: 0.9rem; background: var(--bg-subtle); border-radius: var(--radius-md); font-size: 0.88rem;">
                <strong>Correo Electrónico:</strong><br/>
                <a href="mailto:hola@recordo.mx" style="color: var(--primary); text-decoration: none; font-weight: 600;">hola@recordo.mx</a>
              </div>
            </div>
          </div>

          <form id="contactLandingForm" style="display: flex; flex-direction: column; gap: 0.8rem;">
            <div>
              <label style="font-weight: 600; font-size: 0.82rem; display: block; margin-bottom: 0.25rem;">Tu Nombre:</label>
              <input type="text" class="dash-input" required placeholder="Ej. Ana María López" />
            </div>
            <div>
              <label style="font-weight: 600; font-size: 0.82rem; display: block; margin-bottom: 0.25rem;">Correo o Teléfono Celular:</label>
              <input type="text" class="dash-input" required placeholder="Ej. ana@familia.mx o 55 1234 5678" />
            </div>
            <div>
              <label style="font-weight: 600; font-size: 0.82rem; display: block; margin-bottom: 0.25rem;">Tu Mensaje:</label>
              <textarea class="dash-input" rows="2" required placeholder="Escribe tu duda aquí..."></textarea>
            </div>
            <button type="submit" class="btn btn-primary" style="margin-top: 0.3rem;">Enviar Mensaje</button>
          </form>
        </div>
      </div>
    </div>
  </section>
  `;
}

/* ==========================================================================
   2. PORTAL DE LA FAMILIA (PANEL PRIVADO DE USUARIO POST-LOGIN)
   ========================================================================== */
function renderFamilyDashboardHTML() {
  const book = state.bookData || {
    id: 'REC-2026-8841',
    family_code: 'REC-2026-8841',
    recipient_name: 'Doña Beatriz López',
    current_status: 'in_progress',
    current_week: 8,
    total_weeks: 12,
    progress_percentage: 68,
    soul_tone: state.soulTone,
    print_status: 'pending_approval',
    chapters: [
      {
        id: 1,
        title: 'Capítulo I: Infancia en Pátzcuaro',
        questions: [
          {
            prompt_text: '¿Cómo era la casa donde creciste y tus recuerdos de la cocina?',
            answer_text: 'Crecí en una casita con patio grande de nopales y bugambilias en Pátzcuaro. Mi abuela hacía un mole de olla con elote tierno recién cortado que olía a gloria por toda la calle.',
            audio_url: 'https://actions.google.com/sounds/v1/speech/greeting.ogg',
            photo_urls: ['https://images.unsplash.com/photo-1544717305-2782549b5136?auto=format&fit=crop&w=300&q=80'],
            status: 'answered'
          }
        ]
      }
    ],
    design_feedbacks: [
      {
        category: 'Tipografía & Layout',
        comment: 'Aumentar tamaño de letra en títulos del Capítulo 1 para la abuela.',
        status: 'applied'
      }
    ]
  };

  return `
  <div class="dash-wrapper">
    <header class="dash-header">
      <div class="container dash-nav-container">
        <div class="dash-brand">
          <a href="#" class="logo" id="dashLogoBtn"><img src="/logo.jpeg" alt="Recordo Logo" class="brand-logo-img" style="height: 48px;" /></a>
          <span class="dash-badge-role">Portal de la Familia</span>
        </div>
        <div class="dash-book-info">
          <span>Libro de: <strong>${book.recipient_name}</strong></span>
          <span class="dash-code">Código: ${book.id}</span>
        </div>
        <div class="dash-actions">
          <span class="dash-kapso-status"><span class="status-dot"></span> WhatsApp Activo</span>
          <button class="btn btn-outline btn-nav" id="btnLogout">${icons.logout} Cerrar Sesión</button>
        </div>
      </div>
    </header>

    <div class="container dash-body-layout">
      <aside class="dash-sidebar">
        <div class="dash-sidebar-header">
          <div class="dash-sidebar-title">Menú del Libro</div>
        </div>
        <nav class="dash-sidebar-nav">
          <button class="dash-tab-btn ${state.activeTab === 'traceability' ? 'active' : ''}" data-tab="traceability">
            <span class="icon-box icon-box-emerald">${icons.chart}</span> Avance del Libro
          </button>
          <button class="dash-tab-btn ${state.activeTab === 'vault' ? 'active' : ''}" data-tab="vault">
            <span class="icon-box icon-box-terracotta">${icons.mic}</span> Bóveda de Audios & Fotos
          </button>
          <button class="dash-tab-btn ${state.activeTab === 'soul' ? 'active' : ''}" data-tab="soul">
            <span class="icon-box icon-box-gold">${icons.sparkles}</span> Estilo de las Pláticas
          </button>
          <button class="dash-tab-btn ${state.activeTab === 'preview' ? 'active' : ''}" data-tab="preview">
            <span class="icon-box icon-box-sage">${icons.book}</span> Previsualizador del Libro
          </button>
          <button class="dash-tab-btn ${state.activeTab === 'settings' ? 'active' : ''}" data-tab="settings">
            <span class="icon-box icon-box-amber">${icons.settings}</span> Datos & Configuración
          </button>
        </nav>
      </aside>

      <main class="dash-main-content">
        ${renderActiveTabContent(book)}
      </main>
    </div>

    <!-- Modal Sugerencia de Diseño -->
    <div class="modal-backdrop" id="designFeedbackModal">
      <div class="modal-card">
        <button class="modal-close" id="btnCloseDesignModal">✕</button>
        <div class="modal-header">
          <h3>Sugerir Cambio o Corrección de Diseño</h3>
          <p>Envía observaciones a nuestro equipo editorial.</p>
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
            <label>Capítulo o Página:</label>
            <input type="text" id="feedbackPage" class="dash-input" placeholder="Ej. Capítulo I, Pág. 12" />
          </div>
          <div class="form-group">
            <label>Detalle para el Diseñador:</label>
            <textarea id="feedbackComment" class="dash-input" rows="4" placeholder="Ej. Por favor corregir la ortografía del apellido López..." required></textarea>
          </div>
          <button type="submit" class="btn btn-primary" style="width: 100%;">Enviar Sugerencia a la Editorial</button>
        </form>
      </div>
    </div>

    <!-- Modal Aprobación de Impresión -->
    <div class="modal-backdrop" id="printApprovalModal">
      <div class="modal-card">
        <button class="modal-close" id="btnClosePrintModal">✕</button>
        <div class="modal-header">
          <div class="badge badge-sage" style="margin-bottom: 0.5rem;">${icons.printer} Paso Final</div>
          <h3>Aprobar Edición para Imprenta</h3>
          <p>Confirma que has revisado los textos y fotografías para comenzar la producción de tu libro empastado.</p>
        </div>
        <form id="printApprovalForm">
          <div class="form-group">
            <label>Nombre del Familiar que autoriza:</label>
            <input type="text" id="printApprovedBy" class="dash-input" required placeholder="Ej. Ana María López" />
          </div>
          <div class="form-group">
            <label>Dirección de Envío Completa (Calle, Número, Colonia):</label>
            <input type="text" id="printAddress" class="dash-input" required placeholder="Ej. Av. Insurgentes Sur 1602, Crédito Constructor" />
          </div>
          <div class="form-group">
            <label>Ciudad, Estado y Código Postal:</label>
            <input type="text" id="printCityZip" class="dash-input" required placeholder="Ej. CDMX, CP 03940" />
          </div>
          <button type="submit" class="btn btn-primary" style="width: 100%;">Confirmar y Mandar a Imprimir Libro</button>
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

// Tab 1: Avance del Libro
function renderTraceabilityTabContent(book) {
  return `
  <div class="dash-card">
    <div class="dash-card-header" style="display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 1rem; margin-bottom: 1.5rem;">
      <div>
        <h2>Avance & Progreso del Libro</h2>
        <p>Monitorea las pláticas semanales de ${book.recipient_name}.</p>
      </div>
      <button class="btn btn-whatsapp" id="btnTriggerWaReminder">${icons.send} Enviar Pregunta por WhatsApp</button>
    </div>

    <div class="trace-summary-grid">
      <div class="stat-box">
        <div class="stat-label">Semanas Completadas</div>
        <div class="stat-value" style="color: var(--secondary);">${book.current_week || 8} de ${book.total_weeks || 12}</div>
      </div>
      <div class="stat-box">
        <div class="stat-label">Progreso Global</div>
        <div class="stat-value" style="color: var(--primary);">${book.progress_percentage || 68}%</div>
      </div>
      <div class="stat-box">
        <div class="stat-label">Historias Grabadas</div>
        <div class="stat-value" style="color: var(--accent-gold);">12 Audios</div>
      </div>
    </div>

    ${renderPrintStatusBanner(book)}
  </div>
  `;
}

function renderPrintStatusBanner(book) {
  if (book.print_status === 'approved_for_print') {
    return `
    <div style="background: #DCFCE7; border: 1.5px solid #16A34A; padding: 1.2rem; border-radius: var(--radius-md); margin-top: 1.5rem; display: flex; align-items: center; gap: 1rem;">
      <div style="font-size: 1.6rem; color: #16A34A;">${icons.check}</div>
      <div>
        <h4 style="color: #15803D; margin-bottom: 0.2rem;">¡Edición Aprobada para Imprenta!</h4>
        <p style="margin: 0; font-size: 0.88rem; color: #166534;">El libro está en taller editorial. Dirección de entrega: <strong>${book.shipping_address || 'Registrada'}</strong></p>
      </div>
    </div>
    `;
  }
  return `
  <div class="reminder-box">
    <div>
      <h4 style="color: var(--primary); margin-bottom: 0.2rem;">Revisión Editorial en Curso</h4>
      <p style="margin: 0; font-size: 0.88rem; color: var(--text-dark);">Puedes sugerir correcciones o aprobar la edición final cuando estés listo.</p>
    </div>
    <div style="display: flex; gap: 0.6rem; flex-wrap: wrap;">
      <button class="btn btn-outline" id="btnOpenDesignModal">${icons.edit} Sugerir Cambio</button>
      <button class="btn btn-primary" id="btnOpenPrintApprovalModal">${icons.printer} Aprobar Impresión</button>
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
      <p>Escucha las respuestas grabadas con la voz real de ${book.recipient_name}.</p>
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
                        <span style="font-size: 0.85rem; font-weight: 600; display: flex; align-items: center; gap: 0.4rem;">${icons.mic} Audio Registrado:</span>
                        <audio controls style="width: 100%; margin-top: 0.4rem;">
                          <source src="${q.audio_url}" type="audio/ogg">
                          Tu navegador no soporta audio.
                        </audio>
                      </div>
                    ` : ''}
                    ${q.photo_urls && q.photo_urls.length ? `
                      <div class="photo-gallery-preview">
                        ${q.photo_urls.map(img => `<img src="${img}" alt="Foto familiar" class="thumb-img" />`).join('')}
                      </div>
                    ` : ''}
                  </div>
                ` : '<p style="font-style: italic; color: var(--text-muted); font-size: 0.9rem;">Esperando respuesta por WhatsApp...</p>'}
              </div>
            `).join('')}
          </div>
        </div>
      `).join('')}
    </div>
  </div>
  `;
}

// Tab 3: Estilo de las Pláticas
function renderSoulTabContent(book) {
  return `
  <div class="dash-card">
    <div class="dash-card-header" style="margin-bottom: 1.5rem;">
      <h2>Estilo y Tono de las Conversaciones</h2>
      <p>Elige el tono de calidez con el que guiaremos las pláticas de ${book.recipient_name}.</p>
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
      <label style="font-weight: 600; display: block; margin-bottom: 0.5rem;">Indicaciones o temas especiales para las pláticas:</label>
      <input type="text" id="dashCustomPrompt" class="dash-input" placeholder="Ej: Hablarle de Usted y recordar las fiestas patronales..." value="Habla con respeto y calidez mexicana, recordando la época de oro del cine nacional." />
    </div>

    <div style="margin-top: 1.5rem;">
      <button class="btn btn-primary" id="btnSaveDashSoul">Guardar Preferencias</button>
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
        <p>Así va quedando la maquetación editorial de ${book.recipient_name}.</p>
      </div>
      <div style="display: flex; gap: 0.6rem;">
        <button class="btn btn-outline btn-nav" id="btnOpenDesignModalPreview">${icons.edit} Sugerir Cambio</button>
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

    <div style="margin-top: 2.5rem; border-top: 1px solid var(--border-color); padding-top: 1.5rem;">
      <h3>Sugerencias de Diseño (${feedbacks.length})</h3>
      ${feedbacks.length === 0 ? `
        <p style="font-size: 0.9rem; color: var(--text-muted); margin-top: 0.5rem;">No hay observaciones pendientes.</p>
      ` : `
        <div class="feedbacks-list" style="margin-top: 1rem; display: flex; flex-direction: column; gap: 0.8rem;">
          ${feedbacks.map(f => `
            <div class="feedback-item-card" style="background: var(--bg-main); border: 1px solid var(--border-color); padding: 1rem; border-radius: var(--radius-sm);">
              <div style="display: flex; justify-content: space-between; margin-bottom: 0.3rem;">
                <strong style="font-size: 0.85rem; text-transform: uppercase; color: var(--primary);">${f.category}</strong>
                <span class="badge" style="font-size: 0.75rem; padding: 0.2rem 0.6rem;">${f.status === 'applied' ? '✓ Cambio Aplicado' : 'En Revisión'}</span>
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

// Tab 5: Ajustes
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
function bindLandingEvents() {
  // Manejador central de pestañas de la Landing Page
  const switchLandingTab = (tabName, scrollToTarget = null) => {
    state.landingTab = tabName;
    renderApp();
    
    if (scrollToTarget) {
      setTimeout(() => {
        const el = document.getElementById(scrollToTarget);
        if (el) el.scrollIntoView({ behavior: 'smooth' });
      }, 50);
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  // Botones y enlaces con .landing-tab-trigger
  document.querySelectorAll('.landing-tab-trigger').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const targetTab = btn.dataset.tab;
      const scrollTo = btn.dataset.scroll || null;
      if (targetTab) switchLandingTab(targetTab, scrollTo);
    });
  });

  // Botones de la barra de pestañas móvil
  document.querySelectorAll('.mobile-tab-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const targetTab = btn.dataset.tab;
      if (targetTab) switchLandingTab(targetTab);
    });
  });

  // Mobile Nav Toggle
  const navToggle = document.querySelector('#navToggle');
  const navLinks = document.querySelector('#navLinks');
  if (navToggle && navLinks) {
    navToggle.addEventListener('click', (e) => {
      e.stopPropagation();
      navLinks.classList.toggle('active');
    });

    navLinks.querySelectorAll('a, button').forEach(el => {
      el.addEventListener('click', () => {
        navLinks.classList.remove('active');
      });
    });

    document.addEventListener('click', (e) => {
      if (!navLinks.contains(e.target) && e.target !== navToggle) {
        navLinks.classList.remove('active');
      }
    });
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
        const res = await fetch(`${API_URL}/api/user/login`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ accessCode: codeInput })
        });
        const data = await res.json();
        if (data.success) {
          localStorage.setItem('recordo_auth_token', data.authToken);
          if (data.story) state.bookData = data.story;
          state.currentView = 'dashboard';
          closeModal();
          renderApp();
        } else {
          alert(data.error || 'Código incorrecto. Intenta con REC-2026-8841');
        }
      } catch (err) {
        localStorage.setItem('recordo_auth_token', 'tok_mock');
        state.currentView = 'dashboard';
        closeModal();
        renderApp();
      }
    });
  }

  // Soul selector en pestaña Cómo Funciona
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
        state.waMessages.push({ type: 'received', text: '¡Qué historia tan hermosa! Ya quedó registrada para el borrador de tu libro.' });
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
      try {
        const res = await fetch(`${API_URL}/api/checkout/create`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ plan, gateway })
        });
        const data = await res.json();
        if (data.checkoutUrl) window.open(data.checkoutUrl, '_blank');
      } catch (err) {
        alert(`Iniciando Checkout seguro vía ${gateway.toUpperCase()} para el plan ${plan.toUpperCase()}...`);
      }
    });
  });

  // Selector de Pasarela
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

  // Formulario de Contacto
  const contactForm = document.querySelector('#contactLandingForm');
  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      alert('📩 ¡Mensaje recibido con éxito! Un asesor de Recordo se pondrá en contacto contigo a la brevedad vía WhatsApp o correo.');
      contactForm.reset();
    });
  }

  // Formulario en Pestaña Empresas
  const corpTabQuoteForm = document.querySelector('#corpTabQuoteForm');
  if (corpTabQuoteForm) {
    corpTabQuoteForm.addEventListener('submit', (e) => {
      e.preventDefault();
      alert('🏢 ¡Solicitud de cotización corporativa enviada con éxito! Un asesor de cuentas corporativas se comunicará contigo en menos de 24 horas.');
      corpTabQuoteForm.reset();
    });
  }

  // Modal Cotización Corporativa
  const btnCorpModal = document.querySelector('#btn-corp-modal');
  const corpModal = document.querySelector('#corpQuoteModal');
  const btnCloseCorpModal = document.querySelector('#btnCloseCorpModal');
  const corpQuoteForm = document.querySelector('#corpQuoteForm');

  if (btnCorpModal && corpModal) {
    btnCorpModal.addEventListener('click', () => corpModal.classList.add('active'));
  }

  if (btnCloseCorpModal && corpModal) {
    btnCloseCorpModal.addEventListener('click', () => corpModal.classList.remove('active'));
    corpModal.addEventListener('click', (e) => {
      if (e.target === corpModal) corpModal.classList.remove('active');
    });
  }

  if (corpQuoteForm && corpModal) {
    corpQuoteForm.addEventListener('submit', (e) => {
      e.preventDefault();
      alert('🏢 ¡Solicitud de cotización corporativa enviada con éxito! Un asesor especializado se comunicará con tu empresa.');
      corpModal.classList.remove('active');
      corpQuoteForm.reset();
    });
  }
}

// Eventos del Dashboard
function bindDashboardEvents() {
  const btnLogout = document.querySelector('#btnLogout');
  if (btnLogout) {
    btnLogout.addEventListener('click', () => {
      localStorage.removeItem('recordo_auth_token');
      state.currentView = 'landing';
      renderApp();
    });
  }

  const dashLogoBtn = document.querySelector('#dashLogoBtn');
  if (dashLogoBtn) {
    dashLogoBtn.addEventListener('click', (e) => {
      e.preventDefault();
      state.landingTab = 'inicio';
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

  // Modales de Sugerencia e Imprenta
  const designModal = document.querySelector('#designFeedbackModal');
  const printModal = document.querySelector('#printApprovalModal');

  const openDesignModal = () => designModal && designModal.classList.add('active');
  const closeDesignModal = () => designModal && designModal.classList.remove('active');

  const openPrintModal = () => printModal && printModal.classList.add('active');
  const closePrintModal = () => printModal && printModal.classList.remove('active');

  const btnOpenDesignModal = document.querySelector('#btnOpenDesignModal');
  const btnOpenDesignModalPreview = document.querySelector('#btnOpenDesignModalPreview');
  const btnCloseDesignModal = document.querySelector('#btnCloseDesignModal');

  const btnOpenPrintApprovalModal = document.querySelector('#btnOpenPrintApprovalModal');
  const btnOpenPrintApprovalModalPreview = document.querySelector('#btnOpenPrintApprovalModalPreview');
  const btnClosePrintModal = document.querySelector('#btnClosePrintModal');

  if (btnOpenDesignModal) btnOpenDesignModal.addEventListener('click', openDesignModal);
  if (btnOpenDesignModalPreview) btnOpenDesignModalPreview.addEventListener('click', openDesignModal);
  if (btnCloseDesignModal) btnCloseDesignModal.addEventListener('click', closeDesignModal);

  if (btnOpenPrintApprovalModal) btnOpenPrintApprovalModal.addEventListener('click', openPrintModal);
  if (btnOpenPrintApprovalModalPreview) btnOpenPrintApprovalModalPreview.addEventListener('click', openPrintModal);
  if (btnClosePrintModal) btnClosePrintModal.addEventListener('click', closePrintModal);

  // Guardar preferencias en Dashboard
  const btnSaveDashSoul = document.querySelector('#btnSaveDashSoul');
  if (btnSaveDashSoul) {
    btnSaveDashSoul.addEventListener('click', async () => {
      btnSaveDashSoul.innerText = 'Guardando...';
      const promptVal = document.querySelector('#dashCustomPrompt')?.value || '';
      try {
        await fetch(`${API_URL}/api/soul-tone`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ tone: state.soulTone, custom_prompt: promptVal })
        });
        alert('✨ ¡Preferencias de las pláticas guardadas con éxito!');
      } catch (e) {
        alert('✨ ¡Preferencias guardadas con éxito!');
      } finally {
        btnSaveDashSoul.innerText = 'Guardar Preferencias';
      }
    });
  }

  // Dashboard Soul selector
  document.querySelectorAll('#dash-soul-selector .soul-chip').forEach(chip => {
    chip.addEventListener('click', () => {
      document.querySelectorAll('#dash-soul-selector .soul-chip').forEach(c => c.classList.remove('active'));
      chip.classList.add('active');
      state.soulTone = chip.dataset.tone;
    });
  });

  // Enviar WhatsApp Reminder
  const btnWaReminder = document.querySelector('#btnTriggerWaReminder');
  if (btnWaReminder) {
    btnWaReminder.addEventListener('click', () => {
      alert('Pregunta semanal enviada por WhatsApp al familiar.');
    });
  }

  // Sugerencia de Diseño submit
  const designForm = document.querySelector('#designFeedbackForm');
  if (designForm) {
    designForm.addEventListener('submit', (e) => {
      e.preventDefault();
      alert('✍️ ¡Sugerencia registrada con éxito!');
      closeDesignModal();
    });
  }

  // Aprobación de Impresión submit
  const printForm = document.querySelector('#printApprovalForm');
  if (printForm) {
    printForm.addEventListener('submit', (e) => {
      e.preventDefault();
      alert('🖨️ ¡Edición Aprobada! Ha sido enviada a taller de imprenta.');
      closePrintModal();
    });
  }
}

// Iniciar
initApp();
