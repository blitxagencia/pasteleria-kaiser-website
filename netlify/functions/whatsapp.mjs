/* =============================================================
   Webhook de WhatsApp · Pastelería Kaiser
   Netlify Function (formato v2). Endpoint en producción:
   https://pasteleriakaiser.cl/.netlify/functions/whatsapp

   Una sola función atiende las TRES sucursales. Se distingue por
   el `phone_number_id` que Meta manda en cada webhook, así que no
   hay tres copias del mismo código esperando desincronizarse.

   Variables de entorno (Netlify → Site settings → Environment
   variables). NUNCA en el código: ya pasó una vez que un .env
   quedó rastreado por git (log 2026-07-23).

     WA_VERIFY_TOKEN     inventado por nosotros, se pega igual en Meta
     WA_APP_SECRET       Meta → Configuración de la app → Clave secreta
     WA_TOKEN            token de acceso para enviar mensajes
     WA_PHONE_ID_PH      id del número de Padre Hurtado
     WA_PHONE_ID_PE      id del número de Peñaflor
     WA_PHONE_ID_HU      id del número de Huechuraba
   ============================================================= */

import { createHmac, timingSafeEqual } from "node:crypto";
import { datosDe, sucursalDesdeNumero } from "../lib/datos.mjs";
import { clasificar, responder, mensajeFueraDeHorario } from "../lib/cerebro.mjs";

const GRAPH = "https://graph.facebook.com/v21.0";

export default async (req) => {
  if (req.method === "GET") return verificarWebhook(req);
  if (req.method === "POST") return recibirMensaje(req);
  return new Response("Method not allowed", { status: 405 });
};

/* ---------- GET · el apretón de manos con Meta ----------
   Meta llama una sola vez al guardar el webhook. Si el token no
   calza hay que devolver 403, no 200: contestar que sí a un token
   equivocado deja el endpoint abierto a cualquiera. */
function verificarWebhook(req) {
  const url = new URL(req.url);
  const modo = url.searchParams.get("hub.mode");
  const token = url.searchParams.get("hub.verify_token");
  const challenge = url.searchParams.get("hub.challenge");

  if (modo === "subscribe" && token && token === process.env.WA_VERIFY_TOKEN) {
    return new Response(challenge, { status: 200 });
  }
  return new Response("Forbidden", { status: 403 });
}

/* ---------- Firma ----------
   Sin esto, cualquiera que sepa la URL puede mandarnos un POST
   inventado y hacer que el bot le escriba a quien quiera, con
   nuestro número y a nombre del cliente. La URL no es un secreto:
   la firma sí. */
function firmaValida(cuerpoCrudo, cabecera) {
  const secreto = process.env.WA_APP_SECRET;
  if (!secreto || !cabecera) return false;

  const esperado = "sha256=" + createHmac("sha256", secreto).update(cuerpoCrudo).digest("hex");
  const a = Buffer.from(esperado);
  const b = Buffer.from(cabecera);
  // Longitudes distintas romperían timingSafeEqual con una excepción.
  return a.length === b.length && timingSafeEqual(a, b);
}

/* ---------- POST · llegó un mensaje ---------- */
async function recibirMensaje(req) {
  const cuerpoCrudo = await req.text();

  if (!firmaValida(cuerpoCrudo, req.headers.get("x-hub-signature-256"))) {
    return new Response("Firma inválida", { status: 401 });
  }

  let cuerpo;
  try {
    cuerpo = JSON.parse(cuerpoCrudo);
  } catch {
    return new Response("JSON inválido", { status: 400 });
  }

  /* A Meta se le responde 200 SIEMPRE y rápido. Si devolvemos error
     o demoramos, reintenta el mismo mensaje y el cliente recibe la
     respuesta dos y tres veces. Los problemas se registran, no se
     le devuelven a Meta. */
  try {
    await procesar(cuerpo);
  } catch (error) {
    console.error("[whatsapp] error procesando:", error);
  }
  return new Response("EVENT_RECEIVED", { status: 200 });
}

async function procesar(cuerpo) {
  for (const entrada of cuerpo.entry || []) {
    for (const cambio of entrada.changes || []) {
      const valor = cambio.value || {};
      const phoneNumberId = valor.metadata?.phone_number_id;

      // `messages` en inglés: es el nombre que manda Meta, no se traduce.
      for (const mensaje of valor.messages || []) {
        await atender(mensaje, phoneNumberId, valor);
      }
    }
  }
}

async function atender(mensaje, phoneNumberId, valor) {
  const codigo = sucursalDesdeNumero(phoneNumberId);
  if (!codigo) {
    console.error("[whatsapp] phone_number_id sin sucursal:", phoneNumberId);
    return;
  }

  const sucursal = await datosDe(codigo);
  const de = mensaje.from;

  /* Audios, fotos, ubicaciones y stickers no se interpretan: se
     escalan. Un audio "adivinado" es la peor forma de equivocarse,
     porque el cliente cree que lo entendieron. */
  if (mensaje.type !== "text") {
    await enviarTexto(
      de,
      phoneNumberId,
      "Gracias por su mensaje. Se lo paso a la persona encargada para que " +
        "lo vea bien y le responda a la brevedad."
    );
    registrar({ sucursal: codigo, tipo: "C", motivo: `no_texto:${mensaje.type}`, avisar: true });
    return;
  }

  const texto = mensaje.text?.body || "";
  const clasificacion = clasificar(texto);
  const respuesta = responder(clasificacion, sucursal);

  /* Fuera de horario se antepone el aviso: el cliente tiene que
     saber que no le va a contestar una persona en este minuto. */
  const fueraDeHorario = mensajeFueraDeHorario(sucursal);
  const partes = [];
  if (fueraDeHorario && clasificacion.tipo !== "A") partes.push(fueraDeHorario);
  partes.push(respuesta.texto);

  await enviarTexto(de, phoneNumberId, partes.join("\n\n"));

  registrar({
    sucursal: codigo,
    tipo: clasificacion.tipo,
    motivo: respuesta.motivo,
    avisar: respuesta.avisarEncargado,
    perfil: valor.contacts?.[0]?.profile?.name || null,
  });

  /* ⚠️ PENDIENTE · el handoff al encargado.
     Con el camino C (número propio del bot) el encargado NO ve esta
     conversación en su celular, cosa que sí pasaba con Coexistence.
     Hasta que se decida cómo avisarle (email = $0, o WhatsApp fuera
     de ventana, que se paga), esto solo queda registrado. */
  if (respuesta.avisarEncargado) {
    console.warn("[whatsapp] REQUIERE ENCARGADO", { sucursal: codigo, de, texto });
  }
}

/* ---------- Envío ---------- */
async function enviarTexto(para, phoneNumberId, texto) {
  const respuesta = await fetch(`${GRAPH}/${phoneNumberId}/messages`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${process.env.WA_TOKEN}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      messaging_product: "whatsapp",
      to: para,
      type: "text",
      text: { body: texto, preview_url: false },
    }),
  });

  if (!respuesta.ok) {
    console.error("[whatsapp] fallo al enviar:", respuesta.status, await respuesta.text());
  }
  return respuesta.ok;
}

/* ---------- Métricas ----------
   Estas líneas son las que después arman el informe mensual al
   cliente. La métrica que vende la renovación es el tiempo de
   primera respuesta, y con el bot es inmediato por definición. */
function registrar(evento) {
  console.log("[whatsapp] " + JSON.stringify({ ...evento, ts: new Date().toISOString() }));
}

export const config = { path: "/.netlify/functions/whatsapp" };
