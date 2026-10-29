# Pastelería Kaiser · Sucursal Huechuraba · Sitio web

Sitio estático de una página (HTML + CSS + JS, sin build). Se abre con doble clic en `index.html`.
Carta, dirección, horario y contacto actualizados el 2026-07-27 con la info real que Ian sacó del catálogo de WhatsApp de la sucursal (carpeta `Pasteleria Kaiser_Huechuraba` en su Desktop).

## Cómo abrirlo
Doble clic en `index.html`. Funciona sin servidor ni internet (salvo el mapa y las tipografías de Google).

## Estructura
```
hu/
├─ index.html          estructura de la página
├─ css/styles.css      diseño (paleta, tipografías, layout) — igual al de PH
├─ js/main.js          arma la carta y las interacciones desde los datos
├─ data/content.js     ← TODO el contenido editable vive acá
└─ assets/img/         fotos (ver "Qué falta" abajo)
```

## Qué falta por completar

**Real (del catálogo de WhatsApp, 2026-07-27 — pero es la carta real de Huechuraba):**
- **Carta completa y propia** de Huechuraba: 20 tortas de panqueque/chocolate, 5 mil hojas, 3 heladas/light, 2 de bizcocho, 12 kuchen/pie/tartaleta/cheesecake, y 15 grupos de coctelería. Distinta de la de Padre Hurtado — ya no comparten carta.
- **Precios reales: lista nueva desde el martes 27-oct-2026** (comunicado de don Víctor, con sus respuestas del 24-oct). Las tortas van por tamaño y no por sabor: 10-12 $31.500 · 15-20 $38.000 · 25 $47.500 · 30 $53.000 · 35 $58.000 · 40 $63.000 · 50 $69.000. Torta baja en azúcar (de hoja, la única de la sucursal), solo 10-12 $39.000 y 25 $59.000. Kuchen, pie y tartaleta $19.500; Pie Limón, Pie de Maracuyá y Kuchen de Nuez en chico (6 a 8 trozos) $19.500 o grande (10 a 12 trozos) $26.000; Cheesecake de Frutos Rojos en chico (8 trozos) $21.000 o grande (10 a 12 trozos) $27.000; Mix Kaiser $20.000; Cheesecake New York, un solo tamaño de 10 trozos, $36.000. Por trozo: torta $4.000, pie o kuchen $3.200, Cheesecake New York $3.500. A quien encargó antes del 27 se le respeta el precio anterior. La coctelería también sube el 27 (carta impresa marcada por don Víctor): canapés $48.000 (o solo de camarón $55.000), tapaditos de $46.000 a $64.000 (más la pasta de ave palta, $56.000), mini pastelitos $48.000 (6 variedades, con la mini tartaleta de frutas: don Víctor, 29-oct), petit bouche de camarón $50.000 y los otros $43.000 (2 variedades en 100, proporcional), mini pizzas $54.000, sopaipillas $45.000, crostinis $76.000 y $50.000, bruschetas $61.000 y $68.000 (la de queso de cabra, de temporada); brochetas, mini hamburguesas, bolitas y queso crema apanado no cambian. Ceviche y pastel de jaiba no se venden en Huechuraba. Antes rigió la lista del 02-sep-2025 (tortas de $28.000 a $64.000, kuchen $15.500), con la corrección de Benjamín del 10-oct-2026 (pies en dos tamaños y el New York).
- **Dirección real:** Quilapán 6898, Huechuraba.
- **Horario** (ver nota abajo): Lunes cerrado · Martes a sábado 12:00–19:30 · Domingo 12:00–19:00.
- **Correo real:** Dkaiserhuechuraba@gmail.com (agregado en el footer y en una tarjeta de contacto nueva en "Ubicación" — Huechuraba es la única sucursal con este dato por ahora).
- **Web:** www.pasteleriakaiser.cl (misma de la marca).
- **WhatsApp real: +56 9 7623 5401** (agregado 2026-07-27). Con esto el sitio ya puede usarse para vender de verdad — era el último bloqueante.

**PENDIENTE:**
- **Instagram / TikTok / Facebook** → todavía no confirmadas; siguen como `pendiente_hu`. Confirmar si la sucursal tiene redes propias.
- **Confirmar horario y dirección con la sucursal** → salieron del catálogo de WhatsApp. Son datos concretos y por eso quedaron cargados, pero conviene validarlos antes de darlos por definitivos.
- **Fotos reales recortadas** → el catálogo tiene foto de cada producto, pero están dentro de imágenes de catálogo (varias fotos + texto por captura), no como archivos individuales listos para usar. El sitio sigue mostrando fotos genéricas por categoría hasta que alguien recorte las fotos reales de cada producto y las guarde en `assets/img/` con el nombre correspondiente.

## Valoración y reseñas (real, 2026-07-27)

4,8★ y 135 reseñas en Google — mismo valor en las 3 sucursales, porque Google no diferencia el listado por sucursal (Ian lo confirmó con el link de Google). Hay una sección nueva "Lo que dicen nuestros clientes" con 3 reseñas reales (Antonia Paz, Linsay Reyes, Katherine Atenas — traducidas al español desde el inglés/español original de Google), la misma selección en `ph/`, `pe/` y `hu/`. El dato vive en `data/content.js` → `biz.rating`, `biz.reviewCount`, `biz.reviewsUrl` y el arreglo `resenas`.

## Cómo actualizar (sin tocar código)

Todo en **`data/content.js`**, igual que en el sitio de PH — ver ahí los detalles de cómo cambiar carta, horario, contacto y fotos.

---
Sitio por BlitX · julio 2026. Parte del sitio combinado en `../` (selector de sucursales).
