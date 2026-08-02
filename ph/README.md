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
- **Fotos reales** de 3 tortas de chocolate (Chocopaste, Choconuez, Selva Negra), recortadas de la carta oficial: `real-chocopaste.jpg`, `real-choconuez.jpg`, `real-selvanegra.jpg`.

**Referencial (cambiar cuando haya info/fotos reales):**
- **El resto de las fotos** → representativas de stock (Unsplash). Reemplazar por fotos reales de los pasteles de Kaiser. Ver abajo.
- **Horario** → PLACEHOLDER (Lun a Sáb 09:30–20:00, Dom 10:00–15:00). No es el horario real; confirmar en la reunión y editar en `data/content.js` → `horario`. De ahí sale también el indicador "Abierto ahora".

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

Nombres de las fotos actuales: `hero, torta-panqueque, torta-chocolate, torta-milhojas, cheesecake, kuchen, pie-limon, canapes, tapaditos, pizzetas, brochetas, nosotros`.

## Pendiente
- Fotos reales de los pasteles (lo más importante para una pastelería).
- Horario real de la sucursal.

---
Sitio por BlitX · julio 2026. Parte del sitio combinado en `../` (selector de sucursales).
