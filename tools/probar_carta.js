/* Pruebas de las cartas de las tres sucursales.
 *
 * Se corre asi, desde la raiz del repo:   node tools/probar_carta.js
 *
 * Por que existe. Cada carta tiene reglas que se pisan entre ellas y que un
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
 * no se hace. Pasaba en las tres sucursales.
 *
 * No copia la logica: EXTRAE las funciones reales de cada main.js y las
 * evalua. Una prueba que reimplementa lo que prueba no prueba nada.
 *
 * Las tres cartas no comparten codigo: Padre Hurtado resuelve los tamaños con
 * `mergedScale` (necesita `precios` y `omite`, que las otras no usan) y las
 * otras dos con `tamanosPermitidos`. La prueba usa la que cada una tenga.
 */
const fs = require("fs");
const path = require("path");
const raiz = path.join(__dirname, "..");

let fallos = 0, revisados = 0, conTope = 0;
const ok = (c, m) => { revisados++; if (!c) { fallos++; console.log("FALLA: " + m); } };

function cargar(suc, mainAlternativo) {
  const window = {};
  eval(fs.readFileSync(path.join(raiz, suc, "data/content.js"), "utf8"));
  const src = fs.readFileSync(mainAlternativo || path.join(raiz, suc, "js/main.js"), "utf8");

  function extraer(nombre, obligatoria) {
    const i = src.indexOf("function " + nombre + "(");
    if (i < 0) {
      if (obligatoria) throw new Error(`${suc}: no encontre la funcion ${nombre}`);
      return null;
    }
    let prof = 0;
    for (let k = src.indexOf("{", i); k < src.length; k++) {
      if (src[k] === "{") prof++;
      else if (src[k] === "}") { prof--; if (prof === 0) return src.slice(i, k + 1); }
    }
    throw new Error(`${suc}: no se cierra la funcion ${nombre}`);
  }

  const D = window.KAISER;
  const alcance = { D };
  const definir = (codigo) => new Function("D", codigo + "; return " + codigo.slice(9, codigo.indexOf("(")).trim() + ";")(D);

  const scaleObj = definir(extraer("scaleObj", true));
  const fnMerged = extraer("mergedScale", false);
  const fnPermitidos = extraer("tamanosPermitidos", false);
  if (!fnMerged && !fnPermitidos) {
    throw new Error(`${suc}: el carrito no filtra por tope de ninguna forma`);
  }

  let tamanos;
  if (fnMerged) {
    const mergedScale = new Function("D", "scaleObj",
      fnMerged + "; return mergedScale;")(D, scaleObj);
    tamanos = (it, escala) => mergedScale(it, escala);
  } else {
    const permitidos = new Function(fnPermitidos + "; return tamanosPermitidos;")();
    tamanos = (it, escala) => {
      const sc = scaleObj(escala);
      if (!sc) return null;
      const out = {};
      permitidos(it, sc).forEach((k) => { out[k] = sc[k]; });
      return out;
    };
  }
  return { D, tamanos };
}

/* --- Barrido de las tres: cada producto contra su propia ficha --- */
for (const suc of ["ph", "pe", "hu"]) {
  const { D, tamanos } = cargar(suc);
  for (const sec of D.carta || []) {
    for (const gr of sec.grupos || []) {
      if (!gr.precio) continue;
      for (const it of gr.items || []) {
        const sc = tamanos(it, gr.precio);
        if (!sc) continue;
        if (it.tope) {
          conTope++;
          const sobra = Object.keys(sc).map(Number).filter((n) => n > Number(it.tope));
          ok(sobra.length === 0,
             `${suc} · ${it.n}: dice "hasta ${it.tope} pers." y el carrito ofrece ${sobra.join(", ")}`);
        }
        if (it.omite) for (const o of it.omite)
          ok(!(o in sc), `${suc} · ${it.n}: omite ${o} personas y el carrito lo sigue ofreciendo`);
        if (it.precios) for (const k of Object.keys(it.precios))
          if (k in sc) ok(sc[k] === it.precios[k],
            `${suc} · ${it.n}: ${k}p deberia costar ${it.precios[k]} y el carrito cobra ${sc[k]}`);
      }
    }
  }
}

/* --- Casos concretos de Padre Hurtado, contra el catalogo del 8-sep-2026 --- */
const ph = cargar("ph");
const buscar = (n) => {
  for (const sec of ph.D.carta || []) for (const gr of sec.grupos || [])
    for (const it of gr.items || []) if (it.n === n) return [it, gr];
  throw new Error("no existe el producto " + n);
};
const escalaDe = (n) => { const [it, gr] = buscar(n); return ph.tamanos(it, gr.precio); };

for (const nombre of ["Torta de Frutas", "Panqueque Maracuyá", "Panqueque Merengue Lúcuma"]) {
  const sc = escalaDe(nombre);
  ok(Math.max(...Object.keys(sc).map(Number)) === 25, `ph · ${nombre}: el tamaño maximo debe ser 25`);
  ok(sc["25"] === 45000, `ph · ${nombre}: 25p debe costar 45000 y da ${sc["25"]}`);
}

/* El 25p no es uno solo por grupo: la excepcion pisa la escala, y solo ahi. */
ok(escalaDe("Selva Negra")["25"] === 46500, "ph · Selva Negra: 25p debe costar 46500 (excepcion del item)");
ok(escalaDe("Selva Negra")["50"] === 75000, "ph · Selva Negra: 50p debe costar 75000 (escala del grupo)");
ok(escalaDe("Lúcuma Manjar")["25"] === 43500, "ph · Lúcuma Manjar: 25p debe costar 43500");
ok(escalaDe("Hoja Tres Sabores")["25"] === 45000,
   "ph · Hoja Tres Sabores: 25p se queda en la escala del grupo, 45000");

/* Estas dos dejaron de hacerse en 15 personas; la Carrot Cake sigue. */
for (const nombre of ["Torta Tropical", "Red Velvet"])
  ok(!("15" in escalaDe(nombre)), `ph · ${nombre}: no debe ofrecer 15 personas`);
ok("15" in escalaDe("Carrot Cake"), "ph · Carrot Cake: si debe ofrecer 15 personas");

/* Las dos escalas que no se movieron. */
ok(ph.D.escalaHojaLight["25"] === 57000, "ph · Mil hojas light: el 25p sigue en 57000");
ok(ph.D.escalaTortas["10"] === 31500, "ph · el tamaño de 10 personas se mantuvo en 31500");

console.log(`\n${revisados - fallos}/${revisados} comprobaciones OK · ${conTope} productos con tope en las 3 sucursales`);
if (fallos) process.exit(1);
