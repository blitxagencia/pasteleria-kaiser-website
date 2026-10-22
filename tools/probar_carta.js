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

/* --- Casos concretos de Padre Hurtado, contra las láminas del 22-oct-2026
       (antes, el catálogo del 8-sep). Desde el 22-oct llega hasta 30 personas. --- */
const ph = cargar("ph");
const buscar = (n) => {
  for (const sec of ph.D.carta || []) for (const gr of sec.grupos || [])
    for (const it of gr.items || []) if (it.n === n) return [it, gr];
  throw new Error("no existe el producto " + n);
};
const escalaDe = (n) => { const [it, gr] = buscar(n); return ph.tamanos(it, gr.precio); };

/* "Por el momento llegaremos hasta 30 personas" (Nicolás): ninguna torta pasa de 30. */
for (const sec of ph.D.carta || []) for (const gr of sec.grupos || []) {
  if (!gr.precio) continue;
  for (const it of gr.items || [])
    ok(Object.keys(ph.tamanos(it, gr.precio) || {}).every((k) => parseInt(k, 10) <= 30),
       `ph · ${it.n}: ningún tamaño sobre 30 personas`);
}
ok((ph.D.tamanos || []).every((t) => parseInt(t.personas, 10) <= 30),
   "ph · la tabla de tamaños llega hasta 30");

/* Las que antes llegaban a 25 y ahora llegan a 30. */
for (const nombre of ["Torta de Frutas", "Panqueque Maracuyá", "Panqueque Merengue Lúcuma"]) {
  const sc = escalaDe(nombre);
  ok(sc["30"] === 59000 && sc["25"] === 47000, `ph · ${nombre}: llega a 30 (59000) y 25p 47000`);
}

/* El 15 y el 25 no son uno solo por grupo: la excepcion pisa la escala, y solo ahi. */
ok(escalaDe("Selva Negra")["25"] === 48500 && escalaDe("Selva Negra")["15"] === 41500,
   "ph · Selva Negra: 25p 48500 (excepcion del item) y 15p 41500 (escala)");
ok(escalaDe("Lúcuma Manjar")["25"] === 46000 && escalaDe("Lúcuma Manjar")["15"] === 40000,
   "ph · Lúcuma Manjar: 15p 40000 y 25p 46000");
ok(escalaDe("Hoja Frambuesa")["15"] === 43500, "ph · Hoja Frambuesa: 15p 43500");
ok(escalaDe("Hoja Tres Sabores")["25"] === 47000,
   "ph · Hoja Tres Sabores: 25p se queda en la escala del grupo, 47000");
ok(!("15" in escalaDe("Chocopaste")), "ph · Chocopaste: no viene en 15 personas (confirmado el 22-oct)");

/* Desde el 22-oct la Carrot Cake tampoco viene en 15. */
for (const nombre of ["Torta Tropical", "Red Velvet", "Carrot Cake"])
  ok(!("15" in escalaDe(nombre)), `ph · ${nombre}: no debe ofrecer 15 personas`);
ok(escalaDe("Carrot Cake")["10"] === 37000, "ph · Carrot Cake: 10p 37000");
ok(!(ph.D.carta || []).some((sec) => (sec.grupos || []).some((gr) => (gr.items || []).some((it) => /yogurt/i.test(it.n)))),
   "ph · la Torta de Yogurt ya no se hace: salió de la carta (22-oct)");

ok(ph.D.escalaHojaLight["25"] === 60000, "ph · Mil hojas light: el 25p en 60000");
ok(ph.D.escalaTortas["10"] === 33500, "ph · el tamaño de 10 personas en 33500");

/* --- Casos concretos de Peñaflor, contra su lista de precios de octubre 2026
       (cargada el 16-oct; antes, la del 14-sep) --- */
const pe = cargar("pe");
const escalaPe = (n) => {
  for (const sec of pe.D.carta || []) for (const gr of sec.grupos || [])
    for (const it of gr.items || []) if (it.n === n) return pe.tamanos(it, gr.precio);
  throw new Error("pe: no existe el producto " + n);
};
ok(escalaPe("Tres Sabores")["10"] === 30500 && escalaPe("Tres Sabores")["30"] === 56000,
   "pe · Tres Sabores: 10p 30500 y desde 30 su propio precio (30p 56000)");
ok(escalaPe("Mil Hojas Frambuesa")["15"] === 41500 && escalaPe("Mil Hojas Frambuesa")["50"] === 77000,
   "pe · Mil Hojas Frambuesa: va con precio premium (15p 41500, 50p 77000)");
ok(escalaPe("Almendra (también la llaman Plátano)")["50"] === 72000
   && escalaPe("Almendra (también la llaman Plátano)")["40"] === 65000,
   "pe · Almendra: ya no tiene precio propio, va con la escala (40p 65000, 50p 72000)");
ok(escalaPe("Torta Helada de Frambuesa")["50"] === 72000, "pe · la helada de frambuesa llega a 50 personas");
ok(Math.max(...Object.keys(escalaPe("Torta Helada de Maracuyá")).map(Number)) === 25,
   "pe · las otras heladas: la lista de octubre no trae precio sobre 25");
for (const nombre of ["Torta de Durazno", "4 Leches de Bizcocho", "Torta de Piña", "Mil Hojas Frambuesa Sin Azúcar"])
  ok(!("15" in escalaPe(nombre)), `pe · ${nombre}: no debe ofrecer 15 personas`);
for (const nombre of ["Torta Tropical", "Red Velvet"])
  ok("15" in escalaPe(nombre), `pe · ${nombre}: desde octubre sí viene en 15 personas`);
ok(escalaPe("Red Velvet")["10"] === 32500, "pe · Red Velvet: 10p debe costar 32500");
for (const nombre of ["Menta", "Torta de Frutas", "Torta Sin Azúcar Semifrío"])
  ok(JSON.stringify(escalaPe(nombre)) === "{}", `pe · ${nombre}: sin precio en la lista de octubre, no se vende por el carrito`);
ok(JSON.stringify(escalaPe("Manjar Nuez")) === '{"10":30500,"15":35500,"25":42500,"30":54000,"50":72000}',
   "pe · Manjar Nuez: sin 35 ni 40 personas");
ok(Math.max(...Object.keys(escalaPe("3 Leches")).map(Number)) === 25, "pe · 3 Leches: hasta 25 personas");

console.log(`\n${revisados - fallos}/${revisados} comprobaciones OK · ${conTope} productos con tope en las 3 sucursales`);
if (fallos) process.exit(1);
