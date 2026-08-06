/* =============================================================
   El cerebro del bot · ETAPA 1 (sin IA)

   Clasifica el mensaje que llega y decide qué responder.
   Etapa 1 usa palabras clave a propósito: lo riesgoso de este
   proyecto es la plomería (que el mensaje entre y salga por el
   número real), no la inteligencia. Si se le pone el modelo antes
   de probar la conexión, cuando falle no se sabe si fue el modelo
   o el webhook.

   LAS CINCO REGLAS QUE ESTE ARCHIVO NO PUEDE ROMPER
   1. Nunca inventar un precio.
   2. Nunca confirmar disponibilidad ni una fecha.
   3. Nunca cerrar el pedido como definitivo.
   4. Nunca inventar productos.
   5. Siempre hay salida a humano.

   Ante cualquier duda: escalar. El sistema NUNCA adivina.
   ============================================================= */

import { estaAbierto, resumenHorario, horarioEsConfiable } from "./datos.mjs";

/* Quita acentos y baja a minúsculas: la gente escribe "direccion",
   "dirección" y "DIRECCION" y las tres son la misma pregunta. */
export function normalizar(texto) {
  return String(texto || "")
    .toLowerCase()
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .trim();
}

const contiene = (t, palabras) => palabras.some((p) => t.includes(p));

/* ---------- Tipo A · pedido armado en el sitio ----------
   Firma exacta que escribe `cartToWhatsApp()` en js/main.js.
   Son dos marcas juntas porque ningún cliente escribiría las dos
   por casualidad. Si el sitio cambia ese texto, hay que cambiar
   esto: está anotado en el README de netlify/. */
const FIRMA_PEDIDO = ["me gustaria encargar", "total referencial"];

const esPedidoDelSitio = (t) => FIRMA_PEDIDO.every((f) => t.includes(f));

/* ---------- Tipo D · quiere una persona ---------- */
const PIDE_HUMANO = [
  "hablar con", "con una persona", "con alguien", "con el encargado",
  "con la encargada", "con el dueno", "con la duena", "atencion humana",
  "un humano", "una persona real", "llamar", "me llaman", "telefono",
];

/* ---------- Tipo B · preguntas de dato fijo ---------- */
const INTENCIONES = {
  horario: [
    "horario", "a que hora", "hasta que hora", "que hora abren", "que hora cierran",
    "abren", "cierran", "estan abiertos", "estan atendiendo", "atienden hoy",
    "abierto hoy", "hasta cuando atienden",
  ],
  direccion: [
    "direccion", "donde estan", "donde quedan", "donde se ubican", "ubicacion",
    "como llego", "en que calle", "por donde queda", "mapa",
  ],
  catalogo: [
    "sabores", "que sabores", "catalogo", "la carta", "el menu", "que tienen",
    "que venden", "variedades", "que tortas", "lista de precios", "precios",
    "precio", "cuanto vale", "cuanto sale", "cuanto cuesta", "valor de",
  ],
};

/* ---------- Señales que OBLIGAN a un humano ----------

   Estas mandan aunque el mensaje también traiga una pregunta de
   dato fijo. Es la regla 2, y es la más fácil de romper sin darse
   cuenta: "¿a qué hora abren y me pueden hacer una torta para el
   sábado?" trae una pregunta contestable y una que compromete
   producción. Si el bot responde solo la fácil, el cliente cree
   que le contestaron y la importante queda muerta. */
const OBLIGAN_HUMANO = {
  fecha: [
    "manana", "pasado manana", "hoy dia", "este sabado", "este domingo",
    "el sabado", "el domingo", "el lunes", "el martes", "el miercoles",
    "el jueves", "el viernes", "para el", "para la fecha", "fecha",
    "con cuanta anticipacion", "cuanto antes", "urgente", "para cuando",
  ],
  /* ⚠️ Ojo con las palabras cortas: "queda" y "quedan" sueltas parecen
     preguntas de stock, pero "¿dónde quedan ustedes?" es una pregunta
     de dirección y quedaba escalada por error. Van con acompañante. */
  disponibilidad: [
    "alcanzan", "pueden hacer", "podrian hacer", "tienen disponible",
    "hay disponible", "les queda", "les quedan", "queda alguna",
    "quedan tortas", "todavia tienen", "aun tienen", "me la tienen",
    "se puede pedir", "aceptan pedidos", "toman pedidos",
  ],
  entrega: ["despacho", "delivery", "envio", "envian", "llevan a", "reparto", "domicilio"],
  especial: [
    "personalizada", "personalizado", "diseno", "con foto", "tematica",
    "sin azucar", "sin gluten", "celiaco", "vegana", "vegano", "alergia",
    "matrimonio", "novios", "por mayor", "al por mayor", "mayorista",
  ],
};

function motivosDeEscalar(t) {
  return Object.entries(OBLIGAN_HUMANO)
    .filter(([, palabras]) => contiene(t, palabras))
    .map(([motivo]) => motivo);
}

/**
 * Clasifica un mensaje entrante.
 * @returns {{tipo: "A"|"B"|"C"|"D", intenciones: string[], motivos: string[]}}
 */
export function clasificar(texto) {
  const t = normalizar(texto);

  if (!t) return { tipo: "C", intenciones: [], motivos: ["vacio"] };
  if (esPedidoDelSitio(t)) return { tipo: "A", intenciones: [], motivos: [] };
  if (contiene(t, PIDE_HUMANO)) return { tipo: "D", intenciones: [], motivos: [] };

  const intenciones = Object.entries(INTENCIONES)
    .filter(([, palabras]) => contiene(t, palabras))
    .map(([nombre]) => nombre);

  const motivos = motivosDeEscalar(t);

  // Una señal de humano gana SIEMPRE, aunque haya datos que sí se saben.
  if (motivos.length) return { tipo: "C", intenciones, motivos };
  if (intenciones.length) return { tipo: "B", intenciones, motivos: [] };

  // No se entendió: se escala. El fallback nunca es adivinar.
  return { tipo: "C", intenciones: [], motivos: ["sin_coincidencia"] };
}

/* =============================================================
   Respuestas · voz humana, pocos emojis, sin guiones largos.
   Cada mensaje mueve al cliente un paso.
   ============================================================= */

function bloqueHorario(sucursal) {
  const { contenido } = sucursal;

  // El candado: horario no confirmado = no se responde, se escala.
  if (!horarioEsConfiable(contenido)) return null;

  const resumen = resumenHorario(contenido);
  const abierto = estaAbierto(contenido);
  const estado = abierto ? "Ahora estamos abiertos." : "Ahora estamos cerrados.";
  return `${estado}\n\nNuestro horario es:\n${resumen}`;
}

function bloqueDireccion(sucursal) {
  const { biz } = sucursal.contenido;
  const mapa = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(biz.mapsQuery)}`;
  return `Nos encuentra en ${biz.direccion}.\n\nAcá le dejo el mapa: ${mapa}`;
}

function bloqueCatalogo(sucursal) {
  return (
    "Acá puede ver toda la carta con los precios según el tamaño, y si quiere deja " +
    `su pedido armado desde ahí:\n${sucursal.url}`
  );
}

/* ⚠️ Por qué el bot NO cotiza un precio, ni siquiera "el de la tabla":
   una misma torta cuesta distinto según la cantidad de personas, y hay
   cuatro escaleras de precios diferentes. Sin saber QUÉ producto quiere,
   cualquier número es una adivinanza con cara de dato. Mandarlo al
   catálogo es más seguro Y vende más: ahí puede armar el pedido, que es
   justo lo que hace que llegue ordenado. */

const CIERRE_ESCALADO =
  "Eso lo tengo que confirmar con la persona encargada para no darle un dato " +
  "equivocado. Le respondemos a la brevedad por acá mismo.";

/**
 * Arma la respuesta para un mensaje ya clasificado.
 * @returns {{texto: string, avisarEncargado: boolean, motivo: string}}
 */
export function responder(clasificacion, sucursal) {
  const { tipo, intenciones, motivos } = clasificacion;

  if (tipo === "A") {
    return {
      texto:
        "Recibimos su pedido, gracias por preferirnos.\n\n" +
        "Ya le avisamos a la persona encargada. En un rato le confirma la " +
        "disponibilidad y la fecha, y le manda el link para pagar.\n\n" +
        "Cualquier cosa que quiera cambiar, escríbanos por acá no más.",
      avisarEncargado: true,
      motivo: "pedido_del_sitio",
    };
  }

  if (tipo === "D") {
    return {
      texto:
        "Por supuesto, le aviso al encargado ahora mismo. Se comunica con " +
        "usted en cuanto pueda.",
      avisarEncargado: true,
      motivo: "pidio_humano",
    };
  }

  if (tipo === "B") {
    const bloques = [];
    let hubo_dato_no_confiable = false;

    for (const intencion of intenciones) {
      if (intencion === "horario") {
        const b = bloqueHorario(sucursal);
        if (b) bloques.push(b);
        else hubo_dato_no_confiable = true;
      }
      if (intencion === "direccion") bloques.push(bloqueDireccion(sucursal));
      if (intencion === "catalogo") bloques.push(bloqueCatalogo(sucursal));
    }

    // Si alguna parte no se pudo responder con un dato confiable,
    // se responde lo que sí se sabe y se escala el resto.
    if (hubo_dato_no_confiable) {
      bloques.push(CIERRE_ESCALADO);
      return {
        texto: bloques.join("\n\n"),
        avisarEncargado: true,
        motivo: "dato_no_confirmado",
      };
    }

    if (bloques.length) {
      return { texto: bloques.join("\n\n"), avisarEncargado: false, motivo: "dato_fijo" };
    }
  }

  // Tipo C y cualquier caso que no calzó: escalar.
  // Si el mensaje traía además una pregunta contestable, se responde
  // igual: contestar lo que se sabe no obliga a callar el resto.
  const extras = [];
  for (const intencion of intenciones) {
    if (intencion === "direccion") extras.push(bloqueDireccion(sucursal));
    if (intencion === "catalogo") extras.push(bloqueCatalogo(sucursal));
    if (intencion === "horario") {
      const b = bloqueHorario(sucursal);
      if (b) extras.push(b);
    }
  }

  return {
    texto: [...extras, CIERRE_ESCALADO].join("\n\n"),
    avisarEncargado: true,
    motivo: motivos.join(",") || "no_clasificado",
  };
}

/** Mensaje de fuera de horario. El que más vende: un pedido que llega
 *  a las 22:00 y se responde al otro día a mediodía muchas veces ya se
 *  compró en otra parte. */
export function mensajeFueraDeHorario(sucursal) {
  if (!horarioEsConfiable(sucursal.contenido)) return null;
  if (estaAbierto(sucursal.contenido) !== false) return null;

  return (
    "Gracias por escribirnos. Ahora el local está cerrado, pero su mensaje " +
    "no se pierde: lo vemos a primera hora.\n\n" +
    `Si quiere ir dejando su pedido armado desde ya, acá puede hacerlo:\n${sucursal.url}`
  );
}
