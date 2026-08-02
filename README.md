# Pastelería Kaiser · Sitio combinado (3 sucursales)

Un solo dominio, un selector de sucursal, y 3 sitios completos por debajo. Pensado para que Benjamin apunte el dominio de NIC Chile acá y cada sucursal salga por su propia ruta con su propio WhatsApp.

## Estructura

```
pasteleria-kaiser-website/
├─ index.html          selector "¿En qué sucursal quieres comprar?"
├─ css/selector.css     estilo del selector
├─ assets/img/          logo + foto de fondo (compartidos)
├─ netlify.toml         config de deploy (publish = ".")
├─ ph/                   Sucursal Padre Hurtado — REAL (carta, precios, dirección, WhatsApp)
├─ pe/                   Casa Matriz Peñaflor — REAL y completo (carta, precios, dirección, horario, WhatsApp, correo)
└─ hu/                   Sucursal Huechuraba — REAL y completo (carta, precios, dirección, horario, WhatsApp, correo)
```

Rutas finales, una vez con dominio: `dominio.cl/` (selector) → `dominio.cl/ph`, `dominio.cl/pe`, `dominio.cl/hu`.

## Qué es REAL y qué es PLACEHOLDER

Las 3 sucursales tienen carta, precios, dirección, horario y **WhatsApp real** — las 3 podrían venderse hoy. Lo único que queda pendiente en `pe/` y `hu/` son detalles menores (redes sociales, valoración de Google, fotos reales recortadas), no bloqueantes para vender.

- **`ph/` es el sitio real** que ya se armó con la carta que pasó Ian — sin tocar, intacto.
- **`pe/` — 32 tortas** (con una escala de precio "premium" para 4 recetas), 9 kuchen/pie/tartaleta (sin precio — su catálogo no lo traía) y 15 grupos de coctelería, con dirección (Av. Miraflores 2103), horario, WhatsApp (+569 9957 5267) y correo reales. Peñaflor es la Casa Matriz de la cadena, no una sucursal más. Ver `pe/README.md`, incluido el pequeño cambio que se hizo en su `js/main.js` para soportar la escala de precio premium.
- **`hu/` — 33 tortas**, 11 kuchenes/pie/tartaleta y 15 grupos de coctelería, con dirección (Quilapán 6898), horario, WhatsApp (+56 9 7623 5401) y correo reales. Ver `hu/README.md`.
- Detalle pendiente por sucursal (Instagram/TikTok/Facebook, valoración de Google, fotos reales) en el README de cada carpeta.

## Cómo actualizar cuando llegue la info

Por sucursal, todo vive en `<sucursal>/data/content.js` (mismo patrón que ya usa `ph/`): dirección, WhatsApp, redes, horario y fotos se cambian ahí sin tocar el HTML. Las fotos van en `<sucursal>/assets/img/` con el mismo nombre de archivo que reemplazan.

## Deploy — EN VIVO (2026-07-28)

Deployado por CLI (`netlify deploy --prod --dir .`) al sitio Netlify **`pasteleria-kaiser`** (antes `pasteleria-kaiser-ph` — se renombró, mismo sitio, mismo dominio, no se creó uno nuevo):
- Dominio real: **https://pasteleriakaiser.cl** (ya tenía el dominio de NIC Chile conectado desde antes)
- Fallback Netlify: https://pasteleria-kaiser.netlify.app
- Panel: https://app.netlify.com/projects/pasteleria-kaiser

Un solo sitio, `publish = "."`, sirve el selector en la raíz y las 3 subcarpetas como rutas automáticamente — no hace falta config de rewrites.

**No está git-linked** (deploy directo por CLI) — un `git push` normal a este repo **no** actualiza el sitio. Para volver a publicar después de un cambio, correr desde esta carpeta: `netlify deploy --prod --dir .`

---
Sitio por BlitX · julio 2026.
