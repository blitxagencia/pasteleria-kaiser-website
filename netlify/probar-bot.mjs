/* =============================================================
   Banco de pruebas del bot · corre SIN Meta, sin cuenta, sin red.

     node netlify/probar-bot.mjs           todas las sucursales
     node netlify/probar-bot.mjs ph        solo una

   Para qué sirve: leer las respuestas como las va a leer un
   cliente de Kaiser, antes de que exista el número. Si un mensaje
   suena a robot o dice algo que no corresponde, se arregla acá y
   no en producción.
   ============================================================= */

import { datosDe, SUCURSALES, estaAbierto, horarioEsConfiable } from "./lib/datos.mjs";
import { clasificar, responder, mensajeFueraDeHorario } from "./lib/cerebro.mjs";

const CASOS = [
  // --- Deben responderse solos (tipo B) ---
  ["¿a qué hora abren?", "B"],
  ["hola, cual es la direccion?", "B"],
  ["dónde quedan ustedes", "B"],
  ["hola! qué sabores de torta tienen?", "B"],
  ["me pasas la carta porfa", "B"],
  ["cuanto vale una torta", "B"],

  // --- Deben escalar sí o sí (tipo C) ---
  ["me pueden hacer una torta para el sábado?", "C"],
  ["tienen disponible para mañana?", "C"],
  ["hacen despacho a domicilio?", "C"],
  ["quiero una torta personalizada con foto", "C"],
  ["tienen tortas sin azúcar para diabéticos?", "C"],
  ["hacen tortas de matrimonio?", "C"],
  ["cotización al por mayor para mi empresa", "C"],
  ["aweonao", "C"],
  ["", "C"],

  // --- La trampa: pregunta fácil + compromiso ---
  ["a qué hora abren? y me alcanzan a hacer una torta para mañana?", "C"],
  ["cuánto vale una torta de 25 y la tienen para el domingo?", "C"],

  // --- Pide humano (tipo D) ---
  ["quiero hablar con una persona", "D"],
  ["me pueden llamar?", "D"],

  // --- Pedido armado en el sitio (tipo A) ---
  [
    "¡Hola Pastelería Kaiser! Me gustaría encargar:\n\n" +
      "• 1x Torta Panqueque Manjar (15 personas) · $39.000 c/u\n\n" +
      "Total referencial: $39.000\n\n" +
      "Quedo atento/a para confirmar disponibilidad, tamaños y fecha. ¡Gracias!",
    "A",
  ],
];

const COLOR = { ok: "\x1b[32m", mal: "\x1b[31m", tenue: "\x1b[90m", fin: "\x1b[0m" };

async function probar(codigo) {
  const sucursal = await datosDe(codigo);
  const confiable = horarioEsConfiable(sucursal.contenido);

  console.log(`\n${"═".repeat(70)}`);
  console.log(`  ${sucursal.nombre.toUpperCase()}  ·  ${sucursal.contenido.biz.direccion}`);
  console.log(
    `  Horario: ${confiable ? "confirmado" : "⚠️  PLACEHOLDER (el bot NO lo responde)"}` +
      `   ·   Ahora: ${{ true: "abierto", false: "cerrado", null: "no se sabe" }[estaAbierto(sucursal.contenido)]}`
  );
  console.log("═".repeat(70));

  let fallos = 0;

  for (const [mensaje, esperado] of CASOS) {
    const clasificacion = clasificar(mensaje);
    const respuesta = responder(clasificacion, sucursal);
    const bien = clasificacion.tipo === esperado;
    if (!bien) fallos++;

    const marca = bien ? `${COLOR.ok}✓${COLOR.fin}` : `${COLOR.mal}✗${COLOR.fin}`;
    const visible = mensaje.split("\n")[0].slice(0, 52) || "(mensaje vacío)";

    console.log(
      `\n${marca} [${clasificacion.tipo}${bien ? "" : ` esperaba ${esperado}`}] "${visible}"` +
        `${respuesta.avisarEncargado ? `  ${COLOR.tenue}→ avisa al encargado${COLOR.fin}` : ""}`
    );
    console.log(
      COLOR.tenue +
        respuesta.texto.split("\n").map((l) => "     │ " + l).join("\n") +
        COLOR.fin
    );
  }

  const fuera = mensajeFueraDeHorario(sucursal);
  console.log(
    `\n${COLOR.tenue}  Aviso de fuera de horario: ${
      fuera ? "se antepondría ahora mismo" : "no aplica (abierto o sin horario confiable)"
    }${COLOR.fin}`
  );

  return fallos;
}

const pedidas = process.argv.slice(2).filter((a) => SUCURSALES[a]);
const codigos = pedidas.length ? pedidas : Object.keys(SUCURSALES);

let total = 0;
for (const codigo of codigos) total += await probar(codigo);

console.log(`\n${"═".repeat(70)}`);
if (total === 0) {
  console.log(`${COLOR.ok}  Los ${CASOS.length * codigos.length} casos clasificaron como se esperaba.${COLOR.fin}`);
} else {
  console.log(`${COLOR.mal}  ${total} casos clasificaron distinto de lo esperado.${COLOR.fin}`);
}
console.log(`${"═".repeat(70)}\n`);
process.exit(total === 0 ? 0 : 1);
