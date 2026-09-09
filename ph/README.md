# Pastelería Kaiser · Sucursal Padre Hurtado · Sitio web

Sitio estático de una página (HTML + CSS + JS, sin build). Se abre con doble clic en `index.html`.
Parte del sitio combinado en `../` (selector de sucursales) junto con `pe/` (Peñaflor) y `hu/` (Huechuraba) — las 3 sucursales ya están incluidas.

## Cómo abrirlo
Doble clic en `index.html`. Funciona sin servidor ni internet (salvo el mapa y las tipografías de Google).

## Estructura
```
ph/
├─ index.html          estructura de la página
├─ css/styles.css      diseño (paleta, tipografías, layout)
├─ js/main.js          arma la carta y las interacciones desde los datos
├─ data/content.js     ← TODO el contenido editable vive acá
└─ assets/img/         fotos
```

## Qué es REAL vs REFERENCIAL

**Real (de las cartas de Padre Hurtado de la sucursal):**
- Toda la carta: Tortas (panqueque, chocolate, mil hojas, heladas, bizcocho), Kuchen y Pie, Coctelería completa.
- Todos los precios y la tabla de tamaños.
- Dirección, WhatsApp (+569 74899392), Instagram (@pasteleriakaiserph), lema y año 2005.
- **Logo** real (recortado de la carta oficial). Para mejor calidad, reemplazar `assets/img/logo.png` por el PNG limpio.
- **Todas las fotos de producto son reales.** Salen de los catálogos oficiales en PDF que mandó
  Constanza el 18-ago-2026 (ver abajo).

**Referencial (cambiar cuando haya foto real):**
- **`hero.jpg` y `nosotros.jpg`** → siguen siendo de stock (Unsplash). Los catálogos no traen
  ninguna foto lo bastante grande para el hero, que ocupa el ancho completo. Ver abajo.
*(El horario y las fotos de producto dejaron de ser referenciales.)*

## Horario · REAL y confirmado

**Vigente desde el miércoles 2026-08-19**, confirmado por Nicolás el 2026-08-17:

- Lunes: **Cerrado**
- Martes: **12:00 – 20:00**
- Miércoles a sábado: **09:00 – 20:00**
- Domingo: **11:45 – 19:30**

*Antes de esa fecha era: martes a sábado 11:45 – 20:00, domingo igual.*

Vive en `data/content.js` → `horario`, y de ahí sale también el indicador "Abierto ahora".

⚠️ **`content.js` es la única fuente.** El agente de WhatsApp lee este mismo archivo con
`node tools/build_carta.js` (repo `AgenteKaiser`), que regenera `sucursales/ph.json` y
`sucursales/ph.carta.md`. **Si editas el horario a mano en el agente, quedan dos versiones y el
bot le dice al cliente algo distinto de lo que muestra la web.** Ya pasó una vez.

## Valoración y reseñas (real, 2026-07-27)

**4,4★ y 36 reseñas** en Google, las de Padre Hurtado. *(Este párrafo decía 4,8★ y 135 reseñas, que era el dato de las 3 sucursales juntas; desde el commit `9312688` cada sucursal apunta a las suyas.)* Hay una sección "Lo que dicen nuestros clientes" con 3 reseñas reales (Antonia Paz, Linsay Reyes, Katherine Atenas — traducidas al español), la misma selección en `ph/`, `pe/` y `hu/`. El dato vive en `data/content.js` → `biz.rating`, `biz.reviewCount`, `biz.reviewsUrl` y el arreglo `resenas`.

## Cómo actualizar (sin tocar código)

Todo en **`data/content.js`**:
- **Precios / platos** → edita el texto dentro de cada grupo de `carta`.
- **Horario** → objeto `horario.dias` (formato 24h) y `horario.resumen`. Pon `placeholder: false` cuando sea el real.
- **Contacto / redes** → objeto `biz`.
- **Especialidades destacadas** → arreglo `especialidades`.

### Cambiar una foto por la real
1. Guarda la foto real en `assets/img/` con el **mismo nombre** del archivo que reemplaza (ej. `torta-panqueque.jpg`).
2. Listo, el sitio la toma sola. (No hace falta editar código.)

Todas las cajas usan `object-fit: cover`, así que **cualquier proporción funciona**: la foto se
recorta al centro. No hace falta recortarla antes.

## Fotos de producto · de dónde salió cada una

Extraídas de los tres catálogos PDF oficiales de Padre Hurtado que mandó Constanza el
**18-ago-2026** (*Catálogo de Tortas PH 2025*, *Catálogo de pie PH 2025*,
*Catálogo de coctel PH DIC2024*). Son fotos de Kaiser, no de stock.

**Las 44 miniaturas de `carta/` llevan el nombre del producto**, así que el emparejamiento se
lee solo: `carta/selva-negra.jpg` es la Selva Negra. Estas 6 son la excepción, porque además se
usan grandes en una tarjeta destacada o en la cabecera de una sección:

| Archivo | Plato | Catálogo | Se usa además en |
|---|---|---|---|
| `torta-panqueque.jpg` | Locura Kaiser | Tortas, pág. 3 | Destacada + cabecera de Tortas |
| `real-selvanegra.jpg` | Selva Negra | Tortas, pág. 6 | Destacada |
| `torta-milhojas.jpg` | Mil Hojas de la Casa | Tortas, pág. 8 | Destacada |
| `cheesecake.jpg` | Cheesecake de Frutos Rojos | Pie, pág. 3 | Destacada |
| `kuchen.jpg` | Kuchen de Nuez | Pie, pág. 2 | Cabecera de Kuchen y Pie |
| `canapes.jpg` | Canapés Premium | Coctel, pág. 6 | Cabecera de Coctelería |

⚠️ **No inventes el emparejamiento.** En los PDF el nombre de cada torta está como *imagen*, no
como texto, así que un `grep` no lo encuentra: hay que mirar la página.

**Archivos que se borraron y por qué**, para que nadie los ande buscando:

- `torta-chocolate.jpg` — era de stock y **ningún archivo lo referenciaba**
- `real-chocopaste.jpg`, `real-choconuez.jpg`, `pie-limon.jpg`, `pizzetas.jpg`, `tapaditos.jpg`,
  `brochetas.jpg` — se usaban **solo** en una caja de 88 px, así que pesaban entre 16 y 42 KB
  para nada. Los reemplaza su miniatura de `carta/`, que pesa unos 9 KB

### `assets/img/carta/` · dos tamaños por producto

| Carpeta | Tamaño | Cuándo se descarga |
|---|---|---|
| `carta/<slug>.jpg` | **176 × 176**, recorte al centro | Siempre, pero con `loading="lazy"`: solo las que el visitante alcanza a ver |
| `carta/grande/<slug>.jpg` | Tamaño nativo (250 a 900 px) | **Solo si hace clic** en la foto |

**Por qué 176 y no 500.** La caja donde se muestran (`.i-thumb`) mide **88 × 88 px**. El doble
cubre pantallas retina y **cualquier pixel de más es peso que el cliente paga y nunca ve**.

**Por qué hay dos versiones.** Ampliar una miniatura de 176 px se vería borrosa, y bajar la
versión grande de entrada costaría más de 1 MB que casi nadie mira. Con las dos, la lista pesa
poco y quien quiera mirar de cerca recibe la foto buena.

Cuentas de hoy: **1.177 KB al entrar** (repartidos y diferidos) y **1.375 KB más solo al hacer
clic**. Antes de todo esto la carpeta pesaba **3.130 KB** y solo 12 productos tenían foto.

### 🔴 La rotación, que es la trampa de estos PDF

**Siete fotos están colocadas giradas dentro del PDF.** La primera versión del extractor leía el
ancho como `abs(ctm[0])`, que en una imagen girada 90° vale **cero**: las daba por invisibles y
las guardaba derechas cuando iban de lado. Salió a la luz porque `pie-limon` y
`cheesecake-new-york` aparecieron acostadas en la página.

Lo correcto es leer la matriz completa:

```
ancho = hypot(a, b)      alto = hypot(c, d)      giro = atan2(b, a)
```

Está resuelto en `tools/fotos_carta.py` (fuera de este repo, en el scratchpad de trabajo).
**Si alguna vez se vuelven a extraer fotos de un PDF, revisar el giro antes de publicar.**

### Foto de grupo, para los surtidos

Cuando el catálogo trae **una foto del surtido** en vez de una por variedad, esa foto va al
**grupo** (`grupos[].img`) y no a un ítem. Colgarla de "Tapadito de queso chanco" diría que ese
tapadito se ve así, y la foto muestra cuatro distintos.

Hoy la usan **Tapaditos** y **Petit Bouche**.

### Los 9 productos sin foto propia, y por qué

Los 7 tapaditos y los 2 petit bouche. **No es que falten fotos: es que el catálogo no las tiene
por variedad.** Los dos grupos sí muestran su foto de surtido en la cabecera.

### Fotos ampliables

Todas las fotos de la carta y las tarjetas destacadas se abren en grande al hacer clic
(`class="ampliable"` + `data-full`). El visor se arma solo en `main.js` → `wireZoom()`, funciona
con teclado (Enter, Escape) y **engancha por delegación**: un solo listener en el documento, no
uno por foto, porque las fotos se vuelven a dibujar al cambiar de pestaña de la carta.

### Cómo cambiar o agregar una foto

1. Guarda el JPG en `carta/` **y** una versión grande en `carta/grande/`, con el mismo nombre.
2. Agrégale `img: "assets/img/carta/<archivo>.jpg"` al ítem en `data/content.js`.

No hay que tocar código: el visor y el `lazy` salen solos.

Los ítems que apuntan a un archivo grande de `assets/img/` en vez de a `carta/` lo hacen a
propósito: esa imagen ya se descarga para la tarjeta destacada o la cabecera de sección, así que
reusarla no cuesta bytes extra.

## Pendiente
- **`hero.jpg`** — la foto más grande de los catálogos es de 619 px de ancho y el hero ocupa la
  pantalla completa. Estirarla se vería borrosa. **Pedirle a Nicolás una foto apaisada del
  mostrador o de la vitrina**, mínimo 1600 px de ancho.
- **`nosotros.jpg`** — misma historia: debería ser el local o el equipo, no una torta.
- **Tortas sin azúcar / light** — el catálogo trae 3 (pág. 10) que el sitio **todavía no lista**.

---
Sitio por BlitX · julio 2026. Parte del sitio combinado en `../` (selector de sucursales).
