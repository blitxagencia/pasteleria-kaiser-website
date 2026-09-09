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

## Estado de cada sucursal

Las 3 sucursales tienen carta, precios, dirección, horario y WhatsApp propios. En `pe/` y `hu/` quedan detalles por completar: redes sociales, valoración de Google y las fotos propias de cada producto.

- **`ph/`** es el sitio de Padre Hurtado, el primero que se armó.
- **`pe/` — 32 tortas** (con una escala de precio "premium" para 4 recetas), 9 kuchen/pie/tartaleta (sin precio — su catálogo no lo traía) y 15 grupos de coctelería, con dirección (Av. Miraflores 2103), horario, WhatsApp (+569 9957 5267) y correo reales. Peñaflor es la Casa Matriz de la cadena, no una sucursal más. Ver `pe/README.md`, incluido el pequeño cambio que se hizo en su `js/main.js` para soportar la escala de precio premium.
- **`hu/` — 33 tortas**, 11 kuchenes/pie/tartaleta y 15 grupos de coctelería, con dirección (Quilapán 6898), horario, WhatsApp (+56 9 7623 5401) y correo reales. Ver `hu/README.md`.
- Lo que falta por sucursal (Instagram/TikTok/Facebook, valoración de Google, fotos propias) está en el README de cada carpeta.

## Cómo se publica (leer antes de empujar)

El repo está git-conectado a Netlify: cada push a `main` publica el sitio solo.
Dos cosas que ya costaron una tarde:

1. **El repo tiene que seguir siendo público.** El plan gratuito de Netlify
   permite **un solo contribuidor de Git en repos privados**. Con dos cuentas
   distintas empujando, el deploy queda en `Failed` con *"unrecognized Git
   contributor"* — y Netlify bloquea **antes de compilar**, así que no hay ningún
   log de build que mirar: el repo se ve perfecto y el sitio simplemente no
   cambia. Se probó volver a privado firmando todo con la misma cuenta y tampoco
   alcanzó (Netlify cuenta contribuidores por período de facturación).
2. **Un deploy que ya falló no se reintenta solo.** Arreglar la causa no
   republica nada. Hay que apretar *Retry* en Netlify, o empujar otro commit.

**Verificar siempre**, que no es lo mismo que "hice push":

```
curl -s https://pasteleriakaiser.cl/ph/data/content.js | grep '"15"'
```

Si el cambio tocó `js/main.js` además de los datos, revisar los dos: un
`content.js` nuevo con un `main.js` viejo se ve casi bien y cobra mal.

## Precios: el 25p no es único

Desde el 2026-09-08 la escala del grupo (`escalaTortas`, `escalaBizcocho`, …) es
solo el **valor por defecto**. Cada torta puede traer lo suyo:

- `precios: { "25": 46500 }` — pisa la escala solo en ese tamaño.
- `omite: ["15"]` — esa torta no viene en ese tamaño.

Los aplica `mergedScale()` en `<sucursal>/js/main.js`. **Cambiar solo la escala
no cambia el precio de todas las tortas**, y el carrito cobra lo que diga cada
una.

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
