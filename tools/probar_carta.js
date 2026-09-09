/* Pruebas de la carta de Padre Hurtado.
 *
 * Se corre asi, desde la raiz del repo:   node tools/probar_carta.js
 *
 * Por que existe. La carta tiene tres reglas que se pisan entre ellas y que un
 * ojo humano no alcanza a revisar producto por producto cada vez que cambian
 * los precios:
 *
 *   escala del grupo  ->  el precio normal segun cuantas personas
 *   item.precios      ->  esa torta cuesta distinto en ese tamaño
 *   item.omite        ->  esa torta no viene en un tamaño que el grupo si tiene
 *   item.tope         ->  esa torta no pasa de N personas
 *
 * Cuando `tope` se dejo de respetar, el carrito ofrecio 30, 35, 40 y 50
 * personas para tortas que llegan hasta 25, con la ficha diciendo "hasta 25
 * pers." justo al lado. El pedido que salia por WhatsApp pedia un tamaño que
 * no se hace.
 *
 * No copia la logica: EXTRAE las funciones reales de main.js y las evalua.
 * Una prueba que reimplementa lo que prueba no prueba nada.
 */
const fs = require("fs");
const path = require("path");
const raiz = path.join(__dirname, "..");

const window = {};
eval(fs.readFileSync(path.join(raiz, "ph/data/content.js"), "utf8"));
const D = window.KAISER;

const src = fs.readFileSync(process.argv[2] || path.join(raiz, "ph/js/main.js"), "utf8");
function extraer(nombre) {
  const i = src.indexOf("function " + nombre + "(");
  if (i < 0) throw new Error("no encontre la funcion " + nombre);
  let prof = 0;
  for (let k = src.indexOf("{", i); k < src.length; k++) {
    if (src[k] === "{") prof++;
    else if (src[k] === "}") { prof--; if (prof === 0) return src.slice(i, k + 1); }
  }
  throw new Error("no se cierra la funcion " + nombre);
}
eval(extraer("scaleObj"));
eval(extraer("mergedScale"));

let fallos = 0, revisados = 0, conTope = 0;
const ok = (c, m) => { revisados++; if (!c) { fallos++; console.log("FALLA: " + m); } };

const buscar = (n) => {
  for (const sec of D.carta || []) for (const gr of sec.grupos || [])
    for (const it of gr.items || []) if (it.n === n) return [it, gr];
  throw new Error("no existe el producto " + n);
};

/* --- Barrido: cada producto de la carta contra su propia ficha --- */
for (const sec of D.carta || []) {
  for (const gr of sec.grupos || []) {
    if (!gr.precio) continue;
    for (const it of gr.items || []) {
      const sc = mergedScale(it, gr.precio);
      if (!sc) continue;
      if (it.tope) {
        conTope++;
        const sobra = Object.keys(sc).map(Number).filter(n => n > Number(it.tope));
        ok(sobra.length === 0,
           `${it.n}: dice "hasta ${it.tope} pers." y el carrito ofrece ${sobra.join(", ")}`);
      }
      if (it.omite) for (const o of it.omite)
        ok(!(o in sc), `${it.n}: omite ${o} personas y el carrito lo sigue ofreciendo`);
      if (it.precios) for (const k of Object.keys(it.precios))
        if (k in sc) ok(sc[k] === it.precios[k],
          `${it.n}: ${k}p deberia costar ${it.precios[k]} y el carrito cobra ${sc[k]}`);
    }
  }
}

/* --- Las tres que llegan hasta 25 personas --- */
for (const nombre of ["Torta de Frutas", "Panqueque Maracuyá", "Panqueque Merengue Lúcuma"]) {
  const [it, gr] = buscar(nombre);
  const sc = mergedScale(it, gr.precio);
  ok(Math.max(...Object.keys(sc).map(Number)) === 25, `${nombre}: el tamaño maximo debe ser 25`);
  ok(sc["25"] === 45000, `${nombre}: 25p debe costar 45000 y da ${sc["25"]}`);
}

/* --- El 25p no es uno solo por grupo: la excepcion pisa la escala, y solo ahi --- */
const [selva, grSelva] = buscar("Selva Negra");
const scSelva = mergedScale(selva, grSelva.precio);
ok(scSelva["25"] === 46500, "Selva Negra: 25p debe costar 46500 (excepcion del item)");
ok(scSelva["50"] === 75000, "Selva Negra: 50p debe costar 75000 (escala del grupo)");
const [lucuma, grLuc] = buscar("Lúcuma Manjar");
ok(mergedScale(lucuma, grLuc.precio)["25"] === 43500, "Lúcuma Manjar: 25p debe costar 43500");
const [tresSabores, grTres] = buscar("Hoja Tres Sabores");
ok(mergedScale(tresSabores, grTres.precio)["25"] === 45000,
   "Hoja Tres Sabores: 25p se queda en la escala del grupo, 45000");

/* --- Estas dos dejaron de hacerse en 15 personas; la Carrot Cake sigue --- */
for (const nombre of ["Torta Tropical", "Red Velvet"]) {
  const [it, gr] = buscar(nombre);
  ok(!("15" in mergedScale(it, gr.precio)), `${nombre}: no debe ofrecer 15 personas`);
}
const [carrot, grCarrot] = buscar("Carrot Cake");
ok("15" in mergedScale(carrot, grCarrot.precio), "Carrot Cake: si debe ofrecer 15 personas");

/* --- Las dos escalas que no se movieron --- */
ok(D.escalaHojaLight["25"] === 57000, "Mil hojas light: el 25p sigue en 57000");
ok(D.escalaTortas["10"] === 31500, "El tamaño de 10 personas se mantuvo en 31500");

console.log(`\n${revisados - fallos}/${revisados} comprobaciones OK · ${conTope} productos con tope`);
if (fallos) process.exit(1);
