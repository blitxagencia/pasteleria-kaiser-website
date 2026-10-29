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
  return { D, tamanos, extraer };
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

/* --- Casos concretos de Huechuraba, contra el comunicado de don Víctor
       (rige desde el martes 27-oct-2026; "en Huechuraba los precios son por
       tamaño y no por sabor") y sus respuestas del 24-oct --- */
const hu = cargar("hu");
// Los kuchen se buscan en su sección (hasta el 28-oct, "Pie Limón" era torta y también pie).
const buscarHu = (n, secId) => {
  for (const sec of hu.D.carta || []) if (!secId || sec.id === secId) for (const gr of sec.grupos || [])
    for (const it of gr.items || []) if (it.n === n) return [it, gr];
  throw new Error("hu: no existe el producto " + n);
};
// Las opciones del carrito salen del buildOpts real, con todo lo que usa.
const fnsHu = ["clp", "scaleObj", "scaleRange", "tamanosPermitidos", "parseCLP", "minUnits", "allowsMix", "buildOpts"];
const huFns = new Function("D", fnsHu.map((n) => hu.extraer(n, true)).join(";\n") +
  "; return {" + fnsHu.join(",") + "};")(hu.D);
const opcionesHu = (n) => { const [it, gr] = buscarHu(n, "kuchen"); return huFns.buildOpts(it, gr.precio, gr.nota)
  .map((o) => (o.label ? o.label + " " : "") + o.price).join(" | "); };

const escalaNuevaHu = { "10-12": 31500, "15-20": 38000, "25": 47500, "30": 53000, "35": 58000, "40": 63000, "50": 69000 };
for (const k of Object.keys(escalaNuevaHu))
  ok(hu.D.escalaTortas[k] === escalaNuevaHu[k], `hu · tortas de ${k} personas: ${escalaNuevaHu[k]}`);
ok(Object.keys(hu.D.escalaTortas).length === 7, "hu · la escala de tortas tiene los 7 tamaños, ni más ni menos");
ok(hu.D.tamanos.every((t) => hu.D.escalaTortas[t.personas]), "hu · cada fila de la tabla de tamaños tiene su precio");

const tortasHu = hu.D.carta.find((s) => s.id === "tortas");
for (const gr of tortasHu.grupos)
  if (gr.nombre !== "Torta baja en azúcar")
    ok(gr.precio === "escalaTortas", `hu · ${gr.nombre}: mismo precio que todas (por tamaño, no por sabor)`);
{
  const [it, gr] = buscarHu("Torta baja en azúcar");
  const sc = hu.tamanos(it, gr.precio);
  ok(Object.keys(sc).length === 2 && sc["10-12"] === 39000 && sc["25"] === 59000,
     "hu · torta baja en azúcar: solo 10-12 ($39.000) y 25 ($59.000)");
  ok(/^10-12 y 25 personas/.test(huFns.scaleRange(sc)),
     "hu · el encabezado de la baja en azúcar no hace creer que hay de 15-20: " + huFns.scaleRange(sc));
}

// La Bizcocho Zanahoria solo viene en 10-12, 15-20 y 25 (don Víctor, 29-oct): el agente le
// ofrecía hasta 50 a un cliente.
{
  const [it, gr] = buscarHu("Bizcocho Zanahoria", "tortas");
  const opc = huFns.buildOpts(it, gr.precio, gr.nota).map((o) => o.label + " " + o.price).sort().join(" | ");
  ok(opc === "10-12 personas 31500 | 15-20 personas 38000 | 25 personas 47500",
     "hu · Bizcocho Zanahoria: solo 10-12, 15-20 y 25 personas (es " + opc + ")");
}

for (const n of ["Pie Limón", "Pie de Maracuyá", "Kuchen de Nuez"])
  ok(opcionesHu(n) === "Chico (6 a 8 trozos) 19500 | Grande (10 a 12 trozos) 26000", `hu · ${n}: ${opcionesHu(n)}`);
ok(opcionesHu("Cheesecake de Frutos Rojos") === "Chico (8 trozos) 21000 | Grande (10 a 12 trozos) 27000",
   "hu · Cheesecake de Frutos Rojos, chico de 8 trozos: " + opcionesHu("Cheesecake de Frutos Rojos"));
for (const n of ["Streusel de Frambuesa", "Streusel de Arándanos", "Kuchen de Manzana",
                 "Tartaleta de Frutas", "Tartaleta de Frutillas", "Tartaleta de Arándanos"])
  ok(opcionesHu(n) === "19500", `hu · ${n}: igual que el kuchen y pie chico, 19500 (es ${opcionesHu(n)})`);
ok(opcionesHu("Mix Kaiser") === "20000", "hu · Mix Kaiser: 20000");
// Ninguna torta con el mismo nombre que un kuchen (28-oct): el carrito mandaba "1x Pie Limón
// (50 personas)" y el agente lo leía como el pie, "no hay formato para 50 personas".
{
  const nombres = (id) => hu.D.carta.find((s) => s.id === id).grupos.flatMap((g) => g.items.map((i) => i.n));
  const repetidos = nombres("tortas").filter((n) => nombres("kuchen").includes(n));
  ok(!repetidos.length && nombres("tortas").includes("Torta Pie Limón"),
     "hu · ninguna torta se llama igual que un kuchen (la torta es \"Torta Pie Limón\")" +
     (repetidos.length ? ": " + repetidos.join(", ") : ""));
}
ok(opcionesHu("Cheesecake New York") === "36000", "hu · Cheesecake New York: 36000");

// Ningún precio viejo en tortas ni kuchen (47.500 y 59.000 no: hoy son la de 25 y la baja en azúcar de 25).
const textoHu = JSON.stringify([hu.D.escalaTortas, tortasHu, hu.D.carta.find((s) => s.id === "kuchen")]);
for (const viejo of ["28000", "34500", "43500", "52500", "64000", "$15.500", "$22.000", "$16.500", "$30.000", "$3.700", "$2.800"])
  ok(!textoHu.includes(viejo), `hu · no queda el precio viejo ${viejo}`);
for (const trozo of ["torta $4.000", "pie o kuchen $3.200", "Cheesecake New York $3.500"])
  ok(tortasHu.nota.includes(trozo), `hu · la nota de tortas trae el trozo: ${trozo}`);

/* Coctelería de Huechuraba desde el 27-oct: la carta impresa marcada a mano por
   don Víctor y sus respuestas del mismo día. Cada producto con lo que cobra el
   carrito (50 y 100 unidades donde el mínimo es 50), y la lista completa: que no
   sobre ni falte ninguno. */
const COCTEL_HU = {
  "Canapés Premium surtidos": "100u 48000", "Canapés solo de camarón": "100u 55000",
  "Filetitos de pollo a la mostaza": "100u 63000", "Pasta casera de ave y pimiento": "100u 46000",
  "Pasta de ave palta": "100u 56000", "Churrasco italiano": "100u 64000",
  "Lomito italiano": "100u 64000", "Jamón de pavo y palmito": "100u 59000",
  "Queso chanco": "100u 50000", "Queso fresco": "100u 49000",
  "Mini pastelitos surtidos": "50u 24000 | 100u 48000",
  "Camarón y queso": "50u 25000 | 100u 50000", "Espinacas a la crema": "50u 21500 | 100u 43000",
  "Salame y queso": "50u 21500 | 100u 43000", "Choclo y champiñón": "50u 21500 | 100u 43000",
  "Napolitana": "50u 27000 | 100u 54000", "De verduras": "50u 27000 | 100u 54000",
  "Mini sopaipillas de cóctel": "50u 22500 | 100u 45000",
  // Se mantienen (don Víctor, 27-oct).
  "Mini hamburguesas caseras": "100u 89000", "Bolitas de carne": "50u 44500 | 100u 89000",
  "Cubitos de queso crema apanado": "50u 30500 | 100u 61000",
  "Brochetas de frutas": "50u 36000 | 100u 72000",
  "Carne con chorrillo": "50u 41500 | 100u 83000", "Pollo con pulpa de cerdo": "50u 37000 | 100u 74000",
  "Tomate cherry, queso de cabra y albahaca": "50u 23500 | 100u 47000",
  "Salmón ahumado": "50u 38000 | 100u 76000", "Queso crema y salame": "50u 25000 | 100u 50000",
  "Ricotta y tomate cherry": "50u 30500 | 100u 61000", "Queso de cabra": "50u 34000 | 100u 68000",
};
const coctelHu = hu.D.carta.find((s) => s.id === "cocteleria");
const enSitioHu = [];
for (const gr of coctelHu.grupos) for (const it of gr.items) {
  enSitioHu.push(it.n);
  const real = huFns.buildOpts(it, null, gr.nota).map((o) => `${o.units}u ${o.price}`).join(" | ");
  ok(COCTEL_HU[it.n] === real, `hu · coctelería · ${it.n}: ${real} (esperado ${COCTEL_HU[it.n]})`);
}
ok(enSitioHu.length === Object.keys(COCTEL_HU).length && Object.keys(COCTEL_HU).every((n) => enSitioHu.includes(n)),
   "hu · la coctelería trae justo esos productos (sin ceviche ni pastel de jaiba, con ave palta y canapés de camarón)");
{
  const pb = coctelHu.grupos.find((g) => g.nombre === "Petit Bouche");
  ok(/2 variedades/.test(pb.nota) && /proporcional/.test(pb.nota) && !huFns.allowsMix(pb.nota),
     "hu · petit bouche: 2 variedades en 100, proporcional, y se puede pedir 50 de una sola");
  const cabra = coctelHu.grupos.flatMap((g) => g.items).find((i) => i.n === "Queso de cabra");
  ok(/temporada/.test(cabra.d) && /disponibilidad/.test(cabra.d), "hu · bruscheta de queso de cabra: solo de temporada");
}

console.log(`\n${revisados - fallos}/${revisados} comprobaciones OK · ${conTope} productos con tope en las 3 sucursales`);
if (fallos) process.exit(1);
