// Cloudflare Pages Function: API Router for Recordo
// Runs 100% Serverless on Cloudflare Workers Edge Network

// In-Memory Data Store for Cloudflare Worker Instance
const store = {
  story: {
    id: "story-101",
    familyCode: "REC-2026-8841",
    protagonistName: "Doña Beatriz López",
    status: "EN_ENTREVISTAS",
    currentWeek: 8,
    totalWeeks: 12,
    progressPercentage: 68,
    soulTone: "MEXICAN_WARMTH",
    whatsappNumber: "+52 55 1234 5678",
    printApproval: {
      isApproved: false,
      approvedAt: "",
      approvedBy: "",
      paperType: "Couché Mate 135g",
      coverType: "Pasta Dura Empastada Tela Terracota",
      copiesCount: 1,
      shippingAddress: "Av. Insurgentes Sur 1602, Crédito Constructor, CDMX",
      trackingStatus: "EN_MAQUETACION_FINAL"
    },
    designFeedbacks: [
      {
        id: "fb-1",
        createdAt: "2026-08-10T14:30:00Z",
        category: "Tipografía & Layout",
        comment: "Por favor aumenten un poco el tamaño de letra en los títulos del Capítulo 2 para facilitar la lectura de la abuela.",
        status: "RESUELTO"
      }
    ],
    chapters: [
      {
        id: "cap-1",
        title: "Capítulo 1: La Infancia en Pátzcuaro",
        summary: "Relato entrañable sobre las tardes de lluvia y la cocina de la abuela.",
        audioCount: 4,
        photoCount: 6,
        isCompleted: true
      },
      {
        id: "cap-2",
        title: "Capítulo 2: El Primer Amor y la Juventud",
        summary: "Memorias de las fiestas de pueblo y el encuentro en la plaza principal.",
        audioCount: 5,
        photoCount: 8,
        isCompleted: true
      },
      {
        id: "cap-3",
        title: "Capítulo 3: Fundando la Familia López",
        summary: "En desarrollo. Pláticas semanales en curso sobre los primeros hijos.",
        audioCount: 3,
        photoCount: 4,
        isCompleted: false
      }
    ],
    reviews: []
  }
};

const soulTones = {
  MEXICAN_WARMTH: {
    id: "MEXICAN_WARMTH",
    title: "Cálido Tradicional Mexicano",
    samplePrompt: "«Hola Doña Beatriz, ¡qué alegría saludarle! Hoy queremos platicar de aquellas tardes de domingo en el pueblo. ¿Qué era lo que más le gustaba cocinar a su abuelita?»"
  },
  FIRST_PERSON_INTIMATE: {
    id: "FIRST_PERSON_INTIMATE",
    title: "Primera Persona Íntima",
    samplePrompt: "«Recuerdo como si fuera ayer las calles de tierra y el sonido de las campanas al atardecer...»"
  },
  FORMAL_BIOGRAPHICAL: {
    id: "FORMAL_BIOGRAPHICAL",
    title: "Biográfico Formal",
    samplePrompt: "«Beatriz nació en el verano de 1948 en Pátzcuaro, Michoacán, en el seno de una familia trabajadora...»"
  },
  JOURNALISTIC_CHRONICLE: {
    id: "JOURNALISTIC_CHRONICLE",
    title: "Crónica Periodística",
    samplePrompt: "«Eran los años cincuenta en México. Un país en transformación visto a través de los ojos de una joven...»"
  }
};

// Helper for JSON Response
function jsonResponse(data, status = 200) {
  return new Response(JSON.stringify(data), {
    status,
    headers: {
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type, Authorization"
    }
  });
}

// Router for onRequest in Cloudflare Pages Functions
export async function onRequest(context) {
  const { request } = context;
  const url = new URL(request.url);
  const pathname = url.pathname;
  const method = request.method;

  // Handle CORS Preflight
  if (method === "OPTIONS") {
    return jsonResponse({ ok: true });
  }

  // 1. Health Check
  if (pathname === "/api/health") {
    return jsonResponse({
      status: "ok",
      service: "recordo-cloudflare-edge-api",
      provider: "kapso-whatsapp-engine",
      timestamp: new Date().toISOString()
    });
  }

  // 2. Auth Login
  if (pathname === "/api/user/login" && method === "POST") {
    try {
      const body = await request.json();
      if (body.accessCode === "REC-2026-8841" || body.accessCode === store.story.familyCode) {
        return jsonResponse({
          success: true,
          authToken: "cf-token-" + Date.now(),
          story: store.story
        });
      }
      return jsonResponse({ error: "Código de acceso incorrecto. Verifique su invitación." }, 401);
    } catch (e) {
      return jsonResponse({ error: "Invalid JSON payload" }, 400);
    }
  }

  // 3. Traceability
  if (pathname === "/api/traceability") {
    return jsonResponse({
      success: true,
      story: store.story,
      availableTones: soulTones
    });
  }

  // 4. Save Soul Tone
  if (pathname === "/api/soul-tone" && method === "POST") {
    try {
      const body = await request.json();
      if (body.tone && soulTones[body.tone]) {
        store.story.soulTone = body.tone;
        return jsonResponse({
          success: true,
          currentTone: body.tone,
          samplePrompt: soulTones[body.tone].samplePrompt
        });
      }
      return jsonResponse({ error: "Tono no válido" }, 400);
    } catch (e) {
      return jsonResponse({ error: "Invalid JSON" }, 400);
    }
  }

  // 5. Add Design Feedback
  if (pathname === "/api/user/design-feedback" && method === "POST") {
    try {
      const body = await request.json();
      const feedback = {
        id: "fb-" + Date.now(),
        createdAt: new Date().toISOString(),
        category: body.category || "General",
        comment: body.comment || "",
        status: "PENDIENTE"
      };
      store.story.designFeedbacks.unshift(feedback);
      return jsonResponse({
        success: true,
        message: "Sugerencia registrada con éxito",
        feedback
      });
    } catch (e) {
      return jsonResponse({ error: "Invalid payload" }, 400);
    }
  }

  // 6. Approve Print
  if (pathname === "/api/user/approve-print" && method === "POST") {
    try {
      const body = await request.json();
      store.story.printApproval.isApproved = true;
      store.story.printApproval.approvedAt = new Date().toISOString();
      store.story.printApproval.approvedBy = body.approvedBy || "Familiar Autorizado";
      store.story.printApproval.trackingStatus = "ENVIADO_A_IMPRENTA";
      return jsonResponse({
        success: true,
        message: "¡Edición aprobada! Ha sido enviada al taller de impresión.",
        printApproval: store.story.printApproval
      });
    } catch (e) {
      return jsonResponse({ error: "Invalid payload" }, 400);
    }
  }

  // 7. Checkout Links
  if (pathname === "/api/checkout/create" && method === "POST") {
    try {
      const body = await request.json();
      const gateway = body.gateway || "mercadopago";
      const plan = body.plan || "hardcover";
      
      const redirectUrl = gateway === "mercadopago" 
        ? "https://www.mercadopago.com.mx/checkout/v1/redirect?pref_id=recordo-" + plan
        : "https://checkout.stripe.com/c/pay/recordo-" + plan;

      return jsonResponse({
        success: true,
        gateway,
        plan,
        checkoutUrl: redirectUrl
      });
    } catch (e) {
      return jsonResponse({ error: "Invalid request" }, 400);
    }
  }

  // 8. WhatsApp Webhook
  if (pathname === "/api/whatsapp/webhook" && method === "POST") {
    try {
      const body = await request.json();
      return jsonResponse({
        success: true,
        received: true,
        status: "processed"
      });
    } catch (e) {
      return jsonResponse({ error: "Invalid webhook payload" }, 400);
    }
  }

  // 9. Submit Review
  if (pathname === "/api/review" && method === "POST") {
    try {
      const body = await request.json();
      const review = {
        id: "rev-" + Date.now(),
        author: body.author || "Anónimo",
        type: body.type || "audio",
        mediaUrl: body.mediaUrl || "",
        discountCode: "RECORDO-15OFF-" + Math.floor(Math.random() * 9000 + 1000)
      };
      store.story.reviews.push(review);
      return jsonResponse({
        success: true,
        message: "Reseña registrada con éxito",
        review
      });
    } catch (e) {
      return jsonResponse({ error: "Invalid review payload" }, 400);
    }
  }

  // Default Not Found
  return jsonResponse({ error: "Endpoint no encontrado", path: pathname }, 404);
}
