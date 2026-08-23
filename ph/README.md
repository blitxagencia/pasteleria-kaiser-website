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

**Real (de las cartas de Padre Hurtado que pasó Ian):**
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

4,8★ y 135 reseñas en Google (link que pasó Ian) — mismo valor en las 3 sucursales, porque Google no diferencia el listado por sucursal. Hay una sección "Lo que dicen nuestros clientes" con 3 reseñas reales (Antonia Paz, Linsay Reyes, Katherine Atenas — traducidas al español), la misma selección en `ph/`, `pe/` y `hu/`. El dato vive en `data/content.js` → `biz.rating`, `biz.reviewCount`, `biz.reviewsUrl` y el arreglo `resenas`.

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

| Archivo | Plato | Catálogo |
|---|---|---|
| `torta-panqueque.jpg` | Locura Kaiser | Tortas, pág. 3 |
| `torta-milhojas.jpg` | Mil Hojas de la Casa | Tortas, pág. 8 |
| `real-chocopaste.jpg` | Chocopaste | Tortas, pág. 6 |
| `real-choconuez.jpg` | Choconuez | Tortas, pág. 6 |
| `real-selvanegra.jpg` | Selva Negra | Tortas, pág. 6 |
| `cheesecake.jpg` | Cheesecake de Frutos Rojos | Pie, pág. 3 |
| `kuchen.jpg` | Kuchen de Nuez | Pie, pág. 2 |
| `pie-limon.jpg` | Pie de Limón | Pie, pág. 2 |
| `canapes.jpg` | Canapés Premium | Coctel, pág. 6 |
| `tapaditos.jpg` | Tapaditos | Coctel, pág. 3 |
| `pizzetas.jpg` | Mini Pizzetas | Coctel, pág. 2 |
| `brochetas.jpg` | Brochetas de frutas | Coctel, pág. 4 |

⚠️ **No inventes el emparejamiento.** En los PDF el nombre de cada torta está como *imagen*, no
como texto, así que un `grep` no lo encuentra: hay que mirar la página. Los 55 recortes que
sobraron quedaron sin usar; si hace falta uno más, se sacan del mismo PDF.

`torta-chocolate.jpg` se borró: era de stock y **ningún archivo lo referenciaba**.

## Pendiente
- **`hero.jpg`** — la foto más grande de los catálogos es de 619 px de ancho y el hero ocupa la
  pantalla completa. Estirarla se vería borrosa. **Pedirle a Nicolás una foto apaisada del
  mostrador o de la vitrina**, mínimo 1600 px de ancho.
- **`nosotros.jpg`** — misma historia: debería ser el local o el equipo, no una torta.
- **Tortas sin azúcar / light** — el catálogo trae 3 (pág. 10) que el sitio **todavía no lista**.

---
Sitio por BlitX · julio 2026. Parte del sitio combinado en `../` (selector de sucursales).
