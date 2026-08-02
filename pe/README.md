# Pastelería Kaiser · Casa Matriz Peñaflor · Sitio web

Sitio estático de una página (HTML + CSS + JS, sin build). Se abre con doble clic en `index.html`.
Carta, dirección, horario, WhatsApp y correo actualizados el 2026-07-27 con la info real que Ian sacó del catálogo de WhatsApp de la sucursal (carpeta `Pasteleria Kaiser_Peñaflor` en su Desktop). Peñaflor es la **Casa Matriz** de Kaiser, no una sucursal más — lo dice su propio catálogo.

## Cómo abrirlo
Doble clic en `index.html`. Funciona sin servidor ni internet (salvo el mapa y las tipografías de Google).

## Estructura
```
pe/
├─ index.html          estructura de la página
├─ css/styles.css      diseño (paleta, tipografías, layout) — igual al de PH
├─ js/main.js          arma la carta y las interacciones — tiene 1 diferencia vs PH/HU (ver abajo)
├─ data/content.js     ← TODO el contenido editable vive acá
└─ assets/img/         fotos (todavía de stock, ver "Pendiente" abajo)
```

**`js/main.js` tiene un cambio propio de este sitio:** se agregó soporte para una 4ª escala de precios, `escalaTortasPremium` (línea ~20-22, función `scaleObj`). Es porque Trufa, Choconuez, Selva Negra y Pasta de Almendras cuestan más que el resto de las tortas de chocolate en el catálogo real — no es un error, es la única sucursal con esta variación de precio por receta. Si algún día se actualiza `main.js` en `ph/` o `hu/`, no te olvides que este archivo quedó levemente distinto a propósito.

## Qué es REAL vs PENDIENTE

**Real (del catálogo de WhatsApp, 2026-07-27 — no oficial, pero es la carta real de Peñaflor):**
- **Carta completa y propia**: 32 tortas (incluye una escala de precio "premium" para 4 recetas de chocolate), 9 kuchen/pie/tartaleta, y 15 grupos de coctelería (incluye ítems que ni PH ni HU tienen: ceviche, pastel de jaiba, postres individuales por caja).
- **Precios reales de tortas**: escala base $28.500 a $67.000 (10 a 50 personas), escala premium $30.500 a $72.000 para Trufa/Choconuez/Selva Negra/Pasta de Almendras. Heladas, tortas light y bizcocho tope en 25 personas.
- **Precios reales de coctelería**: por 100 unidades salvo indicado (postres individuales por caja de 6/12, pastel de jaiba por 50 unidades).
- **Dirección real:** Av. Miraflores 2103, Peñaflor.
- **Horario real** (no oficial, ver nota abajo): Lunes cerrado · Martes a viernes 11:30–20:00 · Sábado y domingo 10:00–20:00.
- **WhatsApp real: +569 9957 5267.** Este sitio SÍ puede usarse para vender de verdad — a diferencia de HU, acá no falta el número.
- **Instagram real:** @pasteleriadeliciaskaiser_ (aparece así en 2 de las 3 veces que sale en su catálogo; la tercera lo mostraba sin el guion bajo final — usamos la versión más repetida).
- **Correo real:** psdeliciaskaiser@gmail.com (agregado como tarjeta nueva en "Ubicación" y en el footer).
- **Tortas de matrimonio:** su catálogo trae un producto aparte (diseños personalizados, degustación de 4 mini tortas, cobertura fondant o buttercream). No armamos una sección completa para esto —no tenía precios ni fotos individuales— pero se menciona como nota dentro de la sección "Tortas" invitando a escribir por WhatsApp.

**PENDIENTE:**
- **Precio de Kuchen, Pie y Tartaleta** → su catálogo solo daba tamaños (chico 6-8 pers. / grande 10-12 pers.), sin montos. Quedó anotado en la carta como "consultar por WhatsApp" — no se inventó ningún precio.
- **TikTok / Facebook** → no vinieron en la info.
- **Confirmación oficial de horario y dirección** → salió de un catálogo de WhatsApp no oficial (mismo caso que Huechuraba).
- **Fotos reales recortadas** → el catálogo tiene foto de cada producto, pero incrustadas en capturas con texto. El sitio sigue con fotos de stock por categoría hasta que alguien recorte las reales.

## Valoración y reseñas (real, 2026-07-27)

4,8★ y 135 reseñas en Google — mismo valor en las 3 sucursales, porque Google no diferencia el listado por sucursal (Ian lo confirmó con el link de Google). Hay una sección nueva "Lo que dicen nuestros clientes" con 3 reseñas reales (Antonia Paz, Linsay Reyes, Katherine Atenas — traducidas al español desde el inglés/español original de Google), la misma selección en `ph/`, `pe/` y `hu/`. El dato vive en `data/content.js` → `biz.rating`, `biz.reviewCount`, `biz.reviewsUrl` y el arreglo `resenas`.

## Cómo actualizar (sin tocar código)

Todo en **`data/content.js`** — ver ahí los detalles de cómo cambiar carta, horario, contacto y fotos.

---
Sitio por BlitX · julio 2026. Parte del sitio combinado en `../` (selector de sucursales).
