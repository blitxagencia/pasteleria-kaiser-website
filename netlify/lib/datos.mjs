/* =============================================================
   Datos de las sucursales para el bot de WhatsApp.

   REGLA: este archivo NO copia ni un solo dato. Lee los mismos
   `<sucursal>/data/content.js` que usa el sitio.

   Por qué: el 1 de agosto el mismo dato vivía en dos lugares
   (content.js y el HTML escrito a mano) y el cliente vio la
   dirección vieja DOS veces seguidas. Si el bot tuviera su propia
   copia de los precios, algún día cotizaría distinto que la página
   y ese error se paga con el cliente enojado en el mostrador.
   ============================================================= */

import { readFile } from "node:fs/promises";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const RAIZ = join(dirname(fileURLToPath(import.meta.url)), "..", "..");

/* Los content.js son del navegador: hacen `window.KAISER = {...}`.
   No son módulos de Node, así que se evalúan con un `window` de
   mentira. Diez líneas, y a cambio no se duplica ni un precio. */
async function cargarContenido(sucursal) {
  const codigo = await readFile(join(RAIZ, sucursal, "data", "content.js"), "utf8");
  const ventana = {};
  new Function("window", codigo)(ventana);
  if (!ventana.KAISER) {
    throw new Error(`${sucursal}/data/content.js no definió window.KAISER`);
  }
  return ventana.KAISER;
}

/* Mapa de sucursales. La clave `phoneNumberId` la entrega Meta al
   conectar cada número y se configura por variable de entorno:
   una sola función atiende las tres sucursales y se distingue por
   el número al que le escribieron. */
export const SUCURSALES = {
  ph: { carpeta: "ph", nombre: "Padre Hurtado", url: "https://pasteleriakaiser.cl/ph/" },
  pe: { carpeta: "pe", nombre: "Peñaflor", url: "https://pasteleriakaiser.cl/pe/" },
  hu: { carpeta: "hu", nombre: "Huechuraba", url: "https://pasteleriakaiser.cl/hu/" },
};

const cache = new Map();

export async function datosDe(codigo) {
  if (!SUCURSALES[codigo]) throw new Error(`Sucursal desconocida: ${codigo}`);
  if (!cache.has(codigo)) {
    cache.set(codigo, {
      ...SUCURSALES[codigo],
      contenido: await cargarContenido(SUCURSALES[codigo].carpeta),
    });
  }
  return cache.get(codigo);
}

/** Traduce el phone_number_id del webhook a un código de sucursal. */
export function sucursalDesdeNumero(phoneNumberId, env = process.env) {
  const mapa = {
    [env.WA_PHONE_ID_PH || "__sin_configurar_ph"]: "ph",
    [env.WA_PHONE_ID_PE || "__sin_configurar_pe"]: "pe",
    [env.WA_PHONE_ID_HU || "__sin_configurar_hu"]: "hu",
  };
  return mapa[phoneNumberId] || null;
}

/* ---------- Horario ----------

   ⚠️ EL CANDADO MÁS IMPORTANTE DE ESTE ARCHIVO.

   `content.js` marca con `placeholder: true` el horario que nadie
   confirmó (hoy: Padre Hurtado). Ese campo existía y el sitio lo
   ignoraba, así que un horario inventado quedó publicado.

   El bot NO lo ignora: si el horario no está confirmado, no lo
   responde. Prefiere escalar a un humano antes que decir una hora
   que nadie verificó. Es la misma lección del bug de
   `permiteMitadYMitad`: un dato que no se sabe no puede
   comportarse igual que un dato que sí se sabe. */

export function horarioEsConfiable(contenido) {
  return contenido?.horario?.placeholder !== true;
}

const TZ = "America/Santiago";

/** Día de semana (0=domingo) y minutos del día, en hora de Chile. */
export function ahoraEnChile(fecha = new Date()) {
  const partes = new Intl.DateTimeFormat("en-US", {
    timeZone: TZ,
    weekday: "short",
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  }).formatToParts(fecha);

  const valor = (tipo) => partes.find((p) => p.type === tipo)?.value;
  const dias = { Sun: 0, Mon: 1, Tue: 2, Wed: 3, Thu: 4, Fri: 5, Sat: 6 };

  return {
    dia: dias[valor("weekday")],
    minutos: Number(valor("hour")) * 60 + Number(valor("minute")),
  };
}

function aMinutos(hhmm) {
  const [h, m] = String(hhmm).split(":").map(Number);
  return h * 60 + m;
}

/**
 * ¿Está abierto ahora?
 * Devuelve null cuando NO SE SABE (horario placeholder). Nunca
 * false por defecto: "cerrado" y "no tengo el dato" son cosas
 * distintas y confundirlas manda gente a la puerta equivocada.
 */
export function estaAbierto(contenido, fecha = new Date()) {
  if (!horarioEsConfiable(contenido)) return null;

  const { dia, minutos } = ahoraEnChile(fecha);
  const hoy = contenido.horario?.dias?.[dia];
  if (!hoy) return false; // null en los datos = cerrado ese día

  return minutos >= aMinutos(hoy.abre) && minutos < aMinutos(hoy.cierra);
}

/** Texto del horario tal como lo escribió el sitio, o null si no es confiable. */
export function resumenHorario(contenido) {
  if (!horarioEsConfiable(contenido)) return null;
  return (contenido.horario?.resumen || [])
    .map((r) => `${r.etiqueta}: ${r.valor}`)
    .join("\n");
}
