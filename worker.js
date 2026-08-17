// Cloudflare Worker for Recordo: Static Assets + Serverless Edge API + DeepSeek Engine

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
    whatsappNumber: "+52 1 56 2149 7636",
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
    systemPrompt: "Eres 'Recordo', un entrevistador entrañable, profundamente respetuoso y cariñoso, especializado en rescatar la historia oral de abuelitos y padres en México. Hablas de 'usted' con fórmulas de cortesía tradicionales mexicanas ('Doña [Nombre]', 'Don [Nombre]', '¡Qué alegría saludarle!'). Tu objetivo es despertar memorias vivas sobre la infancia, la comida, los aromas, las fiestas de pueblo y la familia.",
    samplePrompt: "«Hola Doña Beatriz, ¡qué alegría saludarle! Hoy queremos platicar de aquellas tardes de domingo en el pueblo. ¿Qué era lo que más le gustaba cocinar a su abuelita?»"
  },
  FIRST_PERSON_INTIMATE: {
    id: "FIRST_PERSON_INTIMATE",
    title: "Primera Persona Íntima",
    systemPrompt: "Eres un biógrafo y redactor editorial de memorias íntimas. Formulas preguntas introspectivas y emotivas que invitan al protagonista a revivir sensaciones, olores, anhelos y aprendizajes de vida.",
    samplePrompt: "«Recuerdo como si fuera ayer las calles de tierra y el sonido de las campanas al atardecer...»"
  },
  FORMAL_BIOGRAPHICAL: {
    id: "FORMAL_BIOGRAPHICAL",
    title: "Biográfico Formal",
    systemPrompt: "Eres un historiador y biógrafo profesional. Conduces la entrevista con rigor cronológico, elegancia literaria y respeto al legado histórico de la familia.",
    samplePrompt: "«Beatriz nació en el verano de 1948 en Pátzcuaro, Michoacán, en el seno de una familia trabajadora...»"
  },
  JOURNALISTIC_CHRONICLE: {
    id: "JOURNALISTIC_CHRONICLE",
    title: "Crónica Periodística",
    systemPrompt: "Eres un cronista literario al estilo del periodismo narrativo mexicano. Indagas en el contexto social, musical, cultural y de época (México en los años 40, 50, 60 y 70) que acompañó la vida del entrevistado.",
    samplePrompt: "«Eran los años cincuenta en México. Un país en transformación visto a través de los ojos de una joven...»"
  }
};

// Utilidad para llamadas a la API de DeepSeek
async function callDeepSeek(apiKey, messages, temperature = 0.7) {
  if (!apiKey) {
    throw new Error("DEEPSEEK_API_KEY no está configurada en las variables de entorno de Cloudflare.");
  }

  const response = await fetch("https://api.deepseek.com/v1/chat/completions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${apiKey}`
    },
    body: JSON.stringify({
      model: "deepseek-chat",
      messages,
      temperature,
      max_tokens: 1500
    })
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`Error en DeepSeek API (${response.status}): ${errorText}`);
  }

  const data = await response.json();
  return data.choices[0]?.message?.content || "";
}

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

export default {
  async fetch(request, env, ctx) {
    const url = new URL(request.url);
    const pathname = url.pathname;
    const method = request.method;

    // CORS Preflight
    if (method === "OPTIONS") {
      return jsonResponse({ ok: true });
    }

    /* ==========================================================================
       1. DEEPSEEK AI ENGINE ENDPOINTS
       ========================================================================== */

    // 1.1 Generar Pregunta Semanal por WhatsApp con DeepSeek
    if (pathname === "/api/ai/generate-question" && method === "POST") {
      try {
        const body = await request.json();
        const recipientName = body.recipientName || store.story.protagonistName;
        const topic = body.topic || "Recuerdos de la infancia y la casa familiar";
        const toneKey = body.tone || store.story.soulTone;
        const customInstructions = body.customInstructions || "";

        const toneConfig = soulTones[toneKey] || soulTones.MEXICAN_WARMTH;
        const systemPrompt = `${toneConfig.systemPrompt}
        
INSTRUCCIONES CLAVE:
1. Genera UN SOLO mensaje de WhatsApp cálido, emotivo y directo (máximo 3 párrafos cortos).
2. Saluda por su nombre a ${recipientName}.
3. Invítale a recordar el tema: "${topic}".
4. Anímale a responder mediante una sencilla nota de voz ("Presione el botón de micrófono de WhatsApp y cuénteme...").
${customInstructions ? `5. Indicación especial de la familia: ${customInstructions}` : ""}`;

        let questionText = "";
        if (env.DEEPSEEK_API_KEY) {
          questionText = await callDeepSeek(env.DEEPSEEK_API_KEY, [
            { role: "system", content: systemPrompt },
            { role: "user", content: `Genera la pregunta de esta semana para ${recipientName} sobre el tema "${topic}".` }
          ]);
        } else {
          // Fallback enriquecido si aún no se coloca la API key en Cloudflare
          questionText = `«Hola ${recipientName}, ¡qué alegría saludarle esta semana! Hoy queremos recordar momentos entrañables: ${topic}. ¿Nos podría platicar en una nota de voz cómo era ese recuerdo y qué sentía en aquel momento?»`;
        }

        return jsonResponse({
          success: true,
          recipientName,
          topic,
          tone: toneKey,
          generatedQuestion: questionText,
          provider: env.DEEPSEEK_API_KEY ? "deepseek-chat-live" : "fallback-template"
        });
      } catch (err) {
        return jsonResponse({ error: err.message }, 500);
      }
    }

    // 1.2 Formatear Transcripción de Audio en Capítulo Editorial para el Libro con DeepSeek
    if (pathname === "/api/ai/format-chapter" && method === "POST") {
      try {
        const body = await request.json();
        const rawTranscript = body.rawTranscript || "";
        const recipientName = body.recipientName || store.story.protagonistName;
        const chapterTitle = body.chapterTitle || "Capítulo de Memorias";
        const toneKey = body.tone || store.story.soulTone;

        if (!rawTranscript) {
          return jsonResponse({ error: "rawTranscript es requerido" }, 400);
        }

        const toneConfig = soulTones[toneKey] || soulTones.MEXICAN_WARMTH;
        const systemPrompt = `Eres un editor de libros de memorias de lujo. Tu tarea es tomar la transcripción oral hablada por ${recipientName} y convertirla en una prosa literaria conmovedora, limpia y hermosa para las páginas del libro físico.
        
REGLAS EDITORIALES:
1. Conserva la esencia, anécdotas, nombres y expresiones auténticas de ${recipientName}.
2. Corrige muletillas orales ('este...', 'o sea', repeticiones innecesarias).
3. Estructura el relato en 2 a 3 párrafos elegantes con puntuación impecable.
4. Tono editorial seleccionado: ${toneConfig.title}.`;

        let formattedChapter = "";
        if (env.DEEPSEEK_API_KEY) {
          formattedChapter = await callDeepSeek(env.DEEPSEEK_API_KEY, [
            { role: "system", content: systemPrompt },
            { role: "user", content: `Aquí está la transcripción de ${recipientName} para el '${chapterTitle}':\n\n"${rawTranscript}"\n\nRedáctalo en formato editorial de libro.` }
          ]);
        } else {
          formattedChapter = `«${rawTranscript}»`;
        }

        return jsonResponse({
          success: true,
          recipientName,
          chapterTitle,
          rawTranscript,
          formattedChapter,
          provider: env.DEEPSEEK_API_KEY ? "deepseek-chat-live" : "raw-fallback"
        });
      } catch (err) {
        return jsonResponse({ error: err.message }, 500);
      }
    }

    // 1.3 Respuesta Empática Inmediata de WhatsApp tras recibir Nota de Voz con DeepSeek
    if (pathname === "/api/ai/empathetic-reply" && method === "POST") {
      try {
        const body = await request.json();
        const rawTranscript = body.rawTranscript || "";
        const recipientName = body.recipientName || store.story.protagonistName;
        const toneKey = body.tone || store.story.soulTone;

        const toneConfig = soulTones[toneKey] || soulTones.MEXICAN_WARMTH;
        const systemPrompt = `${toneConfig.systemPrompt}
        
INSTRUCCIÓN:
El familiar acaba de mandar una nota de voz relatando una anécdota. Escribe una respuesta corta de WhatsApp (máximo 2 a 3 frases) agradeciendo con inmenso cariño el relato, mencionando algún detalle de lo que contó y confirmando que su recuerdo ya quedó guardado para el libro de sus nietos.`;

        let replyText = "";
        if (env.DEEPSEEK_API_KEY) {
          replyText = await callDeepSeek(env.DEEPSEEK_API_KEY, [
            { role: "system", content: systemPrompt },
            { role: "user", content: `El familiar ${recipientName} acaba de enviar esta historia: "${rawTranscript}". Responde con calidez inmediata.` }
          ]);
        } else {
          replyText = `¡Qué historia tan hermosa ${recipientName}! Muchísimas gracias por compartir este tesoro. Ya quedó guardado en el borrador de su libro familiar.`;
        }

        return jsonResponse({
          success: true,
          replyText,
          provider: env.DEEPSEEK_API_KEY ? "deepseek-chat-live" : "fallback-template"
        });
      } catch (err) {
        return jsonResponse({ error: err.message }, 500);
      }
    }

    // 1.4 Test de Conexión DeepSeek API
    if (pathname === "/api/ai/test-deepseek") {
      if (!env.DEEPSEEK_API_KEY) {
        return jsonResponse({
          status: "pending_configuration",
          message: "DEEPSEEK_API_KEY no está configurada aún en Cloudflare Settings -> Variables and Secrets."
        });
      }

      try {
        const testResult = await callDeepSeek(env.DEEPSEEK_API_KEY, [
          { role: "user", content: "Di 'Conexión exitosa con Recordo AI' en una frase corta y cálida." }
        ]);
        return jsonResponse({
          status: "connected",
          provider: "DeepSeek API",
          response: testResult
        });
      } catch (err) {
        return jsonResponse({
          status: "error",
          error: err.message
        }, 500);
      }
    }

    /* ==========================================================================
       2. USER, PORTAL & CHECKOUT ENDPOINTS
       ========================================================================== */

    if (pathname === "/api/health") {
      return jsonResponse({
        status: "ok",
        service: "recordo-cloudflare-worker-api",
        deepseek_configured: Boolean(env.DEEPSEEK_API_KEY),
        timestamp: new Date().toISOString()
      });
    }

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

    if (pathname === "/api/traceability") {
      return jsonResponse({
        success: true,
        story: store.story,
        availableTones: soulTones
      });
    }

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

    if (pathname === "/api/user/approve-print" && method === "POST") {
      try {
        const body = await request.json();
        store.story.printApproval.isApproved = true;
        store.story.printApproval.approvedAt = new Date().toISOString();
        store.story.printApproval.approvedBy = body.approvedBy || "Familiar Autorizado";
        store.story.printApproval.trackingStatus = "ENVIADO_A_IMPRENTA";
        return jsonResponse({
          success: true,
          message: "¡Edición aprobada! Ha sido enviada al taller de imprenta.",
          printApproval: store.story.printApproval
        });
      } catch (e) {
        return jsonResponse({ error: "Invalid payload" }, 400);
      }
    }

    if (pathname === "/api/checkout/create" && method === "POST") {
      try {
        const body = await request.json();
        const gateway = body.gateway || "mercadopago";
        const plan = body.plan || "digital";
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

    // Servir archivos estáticos del frontend de Vite
    if (env.ASSETS) {
      return env.ASSETS.fetch(request);
    }

    return new Response("Not found", { status: 404 });
  }
};
