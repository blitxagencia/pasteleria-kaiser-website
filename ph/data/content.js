/* =============================================================
   Pastelería Kaiser · Sucursal Padre Hurtado
   Fuente única de datos del sitio. Editar SOLO este archivo para
   actualizar textos, precios, contacto, horarios y fotos.
   Cargado como window.KAISER (sin fetch, funciona con file://).
   ============================================================= */
window.KAISER = {

  /* ---- Negocio y contacto (datos reales de Padre Hurtado) ---- */
  biz: {
    nombre: "Pastelería Kaiser",
    sucursal: "Sucursal Padre Hurtado",
    lema: "Sabor casero desde 2005",
    direccion: "Rodolfo Jaramillo N°2660, Padre Hurtado",
    ciudad: "Padre Hurtado, Región Metropolitana",
    whatsapp: "56974899392",        // +569 74899392
    whatsappDisplay: "+569 7489 9392",
    instagram: "pasteleriakaiserph",
    tiktok: "pasteleriakaiserph",
    facebook: "Kaiserpadrehurtado",
    web: "www.pasteleriakaiser.cl",
    rating: "4,4",
    reviewCount: "36",
    reviewsUrl: "https://maps.app.goo.gl/NNs1rtoqQhLN462cA",
    mapsQuery: "Pastelería Kaiser Rodolfo Jaramillo 2660 Padre Hurtado",
  },

  /* ---- Horario · REAL ----
     Fuente: perfil de WhatsApp Business de la propia sucursal,
     verificado el 2026-08-03. Formato 24h. day: 0=domingo .. 6=sábado.
     Cerrado = null.

     ⚠️ Confirmar el horario contra el WhatsApp Business de la
     sucursal antes de cambiarlo.
     El lunes la sucursal cierra. */
  horario: {
    placeholder: false,
    dias: {
      1: null,                               // Lun: CERRADO
      2: { abre: "12:00", cierra: "20:00" }, // Mar
      3: { abre: "09:00", cierra: "20:00" }, // Mié
      4: { abre: "09:00", cierra: "20:00" }, // Jue
      5: { abre: "09:00", cierra: "20:00" }, // Vie
      6: { abre: "09:00", cierra: "20:00" }, // Sáb
      0: { abre: "11:45", cierra: "19:30" }, // Dom
    },
    resumen: [
      { etiqueta: "Lunes", valor: "Cerrado" },
      { etiqueta: "Martes", valor: "12:00 – 20:00" },
      { etiqueta: "Miércoles a sábado", valor: "09:00 – 20:00" },
      { etiqueta: "Domingo", valor: "11:45 – 19:30" },
    ],
  },

  /* ---- Franja de confianza (stats reales) ---- */
  stats: [
    { n: "4,4★", t: "36 reseñas en Google" },
    { n: "2005", t: "Sabor casero desde" },
    { n: "50+", t: "Tortas, kuchen y cóctel" },
    { n: "100%", t: "Hecho en casa" },
  ],

  /* ---- Tamaños de las tortas (tabla oficial) ---- */
  tamanos: [
    { personas: "10", forma: "Redonda", medida: "18 cm diámetro" },
    { personas: "15", forma: "Redonda", medida: "22 cm diámetro" },
    { personas: "25", forma: "Redonda", medida: "26 cm diámetro" },
    { personas: "30", forma: "Cuadrada", medida: "25 x 25 cm" },
    { personas: "35", forma: "Redonda", medida: "30 cm diámetro" },
    { personas: "40", forma: "Rectangular", medida: "38,5 x 28 cm" },
    { personas: "50", forma: "Rectangular", medida: "38,5 x 30 cm" },
  ],

  /* Escala de precios estándar de tortas por N de personas */
  escalaTortas: {
    "10": 31500, "15": 39000, "25": 43500, "30": 52000,
    "35": 57000, "40": 62000, "50": 71000,
  },
  escalaHelada: { "10": 31500, "15": 39000, "25": 46500 },
  escalaBizcocho: { "10": 31500, "15": 39000, "25": 43500 },
  /* Sin azúcar / light. Misma escala que las heladas hoy, pero es otro producto:
     si Kaiser sube una, la otra no tiene por qué moverse. Catálogo de Tortas PH 2025, pág. 10. */
  escalaLight: { "10": 31500, "15": 39000, "25": 46500 },
  escalaHojaLight: { "10": 41000, "25": 57000 },

  /* ---- Especialidades destacadas (selección editorial) ---- */
  especialidades: [
    {
      nombre: "Locura Kaiser",
      cat: "Torta de panqueque",
      desc: "Panqueque de chocolate, discos de merengue, mil hojas, mousse de lúcuma, manjar puro, mermelada de frambuesa y chantilly.",
      img: "assets/img/torta-panqueque.jpg",
      destacada: true,
    },
    {
      nombre: "Selva Negra",
      cat: "Torta de chocolate",
      desc: "Panqueque de chocolate, mousse de chocolate, mermelada de frambuesa, chantilly, cerezas y chips de chocolate.",
      img: "assets/img/real-selvanegra.jpg",
    },
    {
      nombre: "Cheesecake Frutos Rojos",
      cat: "Kuchen y pie",
      desc: "Queso philadelphia, frambuesas y arándanos, con corona de azúcar rubia, almendras, nueces y canela.",
      img: "assets/img/cheesecake.jpg",
    },
    {
      nombre: "Mil Hojas de la Casa",
      cat: "Torta mil hojas",
      desc: "Mil hojas, manjar crema, nueces, mermelada de guinda, chantilly y hojarasca molida.",
      img: "assets/img/torta-milhojas.jpg",
    },
  ],

  /* =========================================================
     CARTA COMPLETA · organizada por secciones y categorías
     ========================================================= */
  carta: [

    /* ---------- TORTAS ---------- */
    {
      id: "tortas",
      titulo: "Tortas",
      nota: "Precio según cantidad de personas. Consulta tamaños en la tabla más abajo.",
      img: "assets/img/torta-panqueque.jpg",
      grupos: [
        {
          nombre: "Tortas de panqueque",
          precio: "escalaTortas",
          items: [
            { n: "Tres Sabores", d: "Panqueque de chocolate, manjar crema, crema pastelera, chantilly y frambuesas.", img: "assets/img/carta/tres-sabores.jpg" },
            { n: "Amapola", d: "Panqueque de vainilla con amapola, crema Bariloche (chocolate y manjar), mermelada de guinda y crema pastelera.", img: "assets/img/carta/amapola.jpg" },
            { n: "Plátano", d: "Panqueque de vainilla, capas de mil hojas, crema pastelera con Baileys y pasta de almendras, chantilly esencia de plátano, manjar y merengue.", img: "assets/img/carta/platano.jpg" },
            { n: "Locura Kaiser", d: "Panqueque de chocolate, discos de merengue, mil hojas, mousse de lúcuma, manjar puro, mermelada de frambuesa y chantilly.", img: "assets/img/torta-panqueque.jpg" },
            { n: "Lúcuma Manjar", d: "Panqueque de vainilla, mousse de lúcuma y manjar.", img: "assets/img/carta/lucuma-manjar.jpg" },
            { n: "Pie de Limón", d: "Panqueque de vainilla, mousse de limón y merengue.", img: "assets/img/carta/pie-de-limon-torta.jpg" },
            { n: "Manjar Nuez", d: "Panqueque de vainilla, manjar crema y nueces, ganache de chocolate.", img: "assets/img/carta/manjar-nuez.jpg" },
            { n: "Panqueque Maracuyá", d: "Panqueque de chocolate y vainilla, discos de merengue, mousse de maracuyá y salsa de maracuyá.", tope: "25", img: "assets/img/carta/panqueque-maracuya.jpg" },
            { n: "Panqueque Merengue Lúcuma", d: "Panqueque de vainilla, discos de merengue y mousse de lúcuma.", tope: "25", img: "assets/img/carta/panqueque-merengue-lucuma.jpg" },
            { n: "Naranja Manjar", d: "Panqueque de vainilla, salsa de naranja y manjar.", img: "assets/img/carta/naranja-manjar.jpg" },
            { n: "Torta de Frutas", d: "Panqueque de vainilla, chantilly y fruta a elección (piña, durazno o cerezas).", tope: "25", img: "assets/img/carta/torta-de-frutas.jpg" },
          ],
        },
        {
          nombre: "Tortas de chocolate",
          precio: "escalaTortas",
          items: [
            { n: "Chocopaste", d: "Panqueque de chocolate, mousse de chocolate, manjar puro y crema pastelera.", img: "assets/img/carta/chocopaste.jpg" },
            { n: "Choconuez", d: "Panqueque de chocolate, mousse de chocolate, nueces, manjar crema, mermelada de frutillas y ganache.", img: "assets/img/carta/choconuez.jpg" },
            { n: "Selva Negra", d: "Panqueque de chocolate, mousse de chocolate, mermelada de frambuesa, chantilly, cerezas y chips de chocolate.", img: "assets/img/real-selvanegra.jpg" },
            { n: "Trufa", d: "Panqueque de chocolate remojado en aguardiente, trufa y manjar.", img: "assets/img/carta/trufa.jpg" },
            { n: "Café", d: "Panqueque de chocolate, mousse de café, mousse de chocolate, chantilly y frambuesas.", img: "assets/img/carta/cafe.jpg" },
            { n: "Cappuccino", d: "Panqueque de chocolate, mousse de cappuccino, mousse de chocolate y chips de chocolate.", img: "assets/img/carta/cappuccino.jpg" },
          ],
        },
        {
          nombre: "Tortas de mil hojas",
          precio: "escalaTortas",
          items: [
            { n: "Hoja de la Casa", d: "Mil hojas, manjar crema, nueces, mermelada de guinda, chantilly y hojarasca molida.", img: "assets/img/torta-milhojas.jpg" },
            { n: "Hoja Frambuesa", d: "Mil hojas, manjar, chantilly, frambuesas y merengue.", img: "assets/img/carta/hoja-frambuesa.jpg" },
            { n: "Hoja Tres Sabores", d: "Mil hojas y panqueque de vainilla, mousse de manjar, crema pastelera, chantilly, frambuesas y manjar.", img: "assets/img/carta/hoja-tres-sabores.jpg" },
            { n: "Hoja Manjar", d: "Mil hojas y manjar puro.", img: "assets/img/carta/hoja-manjar.jpg" },
            { n: "Hoja Manjar Pastelera", d: "Mil hojas, manjar y crema pastelera.", img: "assets/img/carta/hoja-manjar-pastelera.jpg" },
          ],
        },
        {
          nombre: "Tortas heladas",
          precio: "escalaHelada",
          nota: "Base de discos de merengue. Disponible en cuatro variedades.",
          items: [
            { n: "Frambuesa y chantilly", d: "Discos de merengue, frambuesas y chantilly.", img: "assets/img/carta/frambuesa-y-chantilly.jpg" },
            { n: "Mousse de lúcuma", d: "Discos de merengue y mousse de lúcuma.", img: "assets/img/carta/mousse-de-lucuma.jpg" },
            { n: "Mousse de maracuyá", d: "Discos de merengue y mousse de maracuyá.", img: "assets/img/carta/mousse-de-maracuya.jpg" },
            { n: "Frutillas y chantilly", d: "Discos de merengue, frutillas y chantilly.", img: "assets/img/carta/frutillas-y-chantilly.jpg" },
          ],
        },
        {
          nombre: "Tortas de bizcocho",
          precio: "escalaBizcocho",
          items: [
            { n: "Torta Tropical", d: "Bizcocho de vainilla, mousse de piña, mango y maracuyá, con trozos de piña y mango.", img: "assets/img/carta/torta-tropical.jpg" },
            { n: "Red Velvet", d: "Bizcocho de vainilla rojo, cheesecake philadelphia y manjar.", img: "assets/img/carta/red-velvet.jpg" },
            { n: "Carrot Cake", d: "Bizcocho de zanahoria con nueces, manjar y frosting de queso philadelphia.", img: "assets/img/carta/carrot-cake.jpg" },
          ],
        },
        {
          nombre: "Tortas sin azúcar",
          precio: "escalaLight",
          nota: "Endulzadas sin azúcar. Consulta por disponibilidad al encargar.",
          items: [
            { n: "Torta de Yogurt", d: "Panqueque de vainilla, mousse de yogurt light, cubierta con mermelada de frambuesa light.", img: "assets/img/carta/torta-de-yogurt.jpg" },
            { n: "Torta de Naranja Light", d: "Panqueque de vainilla, salsa de naranja light, cubierta con salsa de naranja light y decorada con chocolate.", img: "assets/img/carta/torta-de-naranja-light.jpg" },
          ],
        },
        {
          nombre: "Mil hojas sin azúcar",
          precio: "escalaHojaLight",
          nota: "Tiene su propia escala: 10 o 25 personas.",
          items: [
            { n: "Hoja Frambuesa Light", d: "Capas de mil hojas, manjar endulzado con alulosa, crema chantilly sin azúcar y frambuesas naturales, cubierta con mermelada de frambuesa sin azúcar.", img: "assets/img/carta/hoja-frambuesa-light.jpg" },
          ],
        },
      ],
    },

    /* ---------- KUCHEN Y PIE ---------- */
    {
      id: "kuchen",
      titulo: "Kuchen y Pie",
      nota: "Chico (6 a 8 personas) $19.000 · Grande (10 a 12 personas) $23.000, salvo indicado.",
      img: "assets/img/kuchen.jpg",
      grupos: [
        {
          nombre: "Kuchen y pie",
          items: [
            { n: "Kuchen de Manzana", d: "Manzanas verdes, crema pastelera, mermelada de damasco y nueces. Solo en temporada de manzana verde.", precioFijo: "$19.000 / $23.000", img: "assets/img/carta/kuchen-de-manzana.jpg" },
            { n: "Streusel de Frambuesa", d: "Crema pastelera, frambuesas naturales, cubierto con migas.", precioFijo: "$19.000 / $23.000", img: "assets/img/carta/streusel-de-frambuesa.jpg" },
            { n: "Cheesecake de Frutos Rojos", d: "Base de queso philadelphia con azúcar, cubierto con frambuesas y arándanos, con corona de azúcar rubia, almendras, nueces y canela.", precioFijo: "$19.000 / $23.000", img: "assets/img/cheesecake.jpg" },
            { n: "Pie de Limón", d: "Mousse de limón hecho con jugo de limón natural, cubierto con merengue.", precioFijo: "$19.000 / $23.000", img: "assets/img/carta/pie-de-limon.jpg" },
            { n: "Pie de Maracuyá", d: "Mousse de maracuyá, cubierto con salsa de maracuyá.", precioFijo: "$19.000 / $23.000", img: "assets/img/carta/pie-de-maracuya.jpg" },
            { n: "Kuchen de Nuez", d: "Relleno de nueces con leche condensada.", precioFijo: "$19.000 / $23.000", img: "assets/img/kuchen.jpg" },
            { n: "Cheesecake New York", d: "Base de galletas molidas con mantequilla, relleno de cheesecake horneado, cubierto con mermelada de frambuesa. Solo tamaño grande.", precioFijo: "$34.000", img: "assets/img/carta/cheesecake-new-york.jpg" },
          ],
        },
      ],
    },

    /* ---------- COCTELERÍA ---------- */
    {
      id: "cocteleria",
      titulo: "Coctelería",
      nota: "Ideal para eventos y celebraciones. Pedido mínimo según cada producto.",
      img: "assets/img/canapes.jpg",
      grupos: [
        {
          nombre: "Canapés Premium",
          nota: "Pedido mínimo 50 unidades. Surtido de 6 variedades.",
          items: [
            { n: "Canapés Premium surtidos", d: "Palmito, jamón, queso crema y sésamo · huevo de codorniz sobre pepinillo y mayonesa · camarón salteado, queso crema y sésamo · salame, queso crema y almendra · espárragos, queso crema y pimentón · choclito oriental, queso crema y pimentón rojo.", precioFijo: "$45.000 / 100 u", img: "assets/img/canapes.jpg" },
          ],
        },
        {
          nombre: "Mini Pastelitos",
          nota: "Pedido mínimo 50 unidades. Cuatro variedades surtidas.",
          items: [
            { n: "Mini pastelitos surtidos", d: "Pie de limón · pie de maracuyá · alfajor de manjar bañado en chocolate · cheesecake de frutos rojos · mil hojas con manjar · tartaleta de frutas.", precioFijo: "$45.000 / 100 u", img: "assets/img/carta/mini-pastelitos.jpg" },
          ],
        },
        {
          nombre: "Mini Pizzetas",
          nota: "Pedido mínimo 50 unidades.",
          items: [
            { n: "Napolitanas", d: "Tomate, jamón, aceitunas y queso.", precioFijo: "$47.000 / 100 u", img: "assets/img/carta/pizzetas-napolitanas.jpg" },
            { n: "De verduras", d: "Palmito, choclito de coctel, espárragos, tomate y queso.", precioFijo: "$47.000 / 100 u", img: "assets/img/carta/pizzetas-de-verduras.jpg" },
          ],
        },
        {
          nombre: "Tapaditos", img: "assets/img/carta/tapaditos.jpg",
          nota: "Pedido mínimo 100 unidades. Se pueden pedir 50 de una variedad y 50 de otra.",
          items: [
            { n: "Pollo a la mostaza", d: "Filetitos de pollo a la mostaza, rodaja de palmito, lechuga y mayonesa.", precioFijo: "$61.000 / 100 u" },
            { n: "Pasta de ave con pimentón", d: "Pasta de pollo, pimentón rojo y mayonesa.", precioFijo: "$42.000 / 100 u" },
            { n: "Churrasco italiano", d: "Churrasco de vacuno, tomate, palta y mayonesa.", precioFijo: "$57.000 / 100 u" },
            { n: "Lomito italiano", d: "Lomito de cerdo, palta, tomate y mayonesa.", precioFijo: "$54.000 / 100 u" },
            { n: "Jamón de pavo", d: "Jamón de pavo, rodaja de palmito, lechuga, queso crema y mayonesa.", precioFijo: "$57.000 / 100 u" },
            { n: "Queso chanco", d: "Queso chanco, tomates cherry salteados y aceitunas negras.", precioFijo: "$57.000 / 100 u" },
            { n: "Queso fresco", d: "Queso fresco, lechuga, tomate y ají verde.", precioFijo: "$50.000 / 100 u" },
          ],
        },
        {
          nombre: "Crostinis",
          nota: "Pedido mínimo 50 unidades. Sobre pan baguette horneado con aceite de oliva.",
          items: [
            { n: "Salmón ahumado", d: "Salmón ahumado, queso crema y sésamo.", precioFijo: "$74.000 / 100 u", img: "assets/img/carta/crostini-salmon.jpg" },
            { n: "Queso crema y salame", d: "Pasta de queso crema, salame, palmitos y ciboulette.", precioFijo: "$41.000 / 100 u", img: "assets/img/carta/crostini-queso-salame.jpg" },
          ],
        },
        {
          nombre: "Petit Bouche", img: "assets/img/carta/petit-bouche.jpg",
          nota: "Pedido mínimo 100 unidades. Tacitas de masa rellenas. Se hornean antes de servir.",
          items: [
            { n: "Camarones gamba", d: "Camarones gamba con salsa de queso.", precioFijo: "$42.000 / 100 u" },
            { n: "Espinacas a la crema", d: "Tacita de masa rellena con espinacas a la crema.", precioFijo: "$40.000 / 100 u" },
          ],
        },
        {
          nombre: "Brochetas",
          nota: "Pedido mínimo 50 unidades.",
          items: [
            { n: "Caprese", d: "Trozos de queso, tomates cherry y albahaca fresca.", precioFijo: "$47.000 / 100 u", img: "assets/img/carta/brochetas-caprese.jpg" },
            { n: "De frutas", d: "Trozos de fruta de estación con decoración de chocolate.", precioFijo: "$72.000 / 100 u", img: "assets/img/carta/brochetas-de-frutas.jpg" },
          ],
        },
        {
          nombre: "Mini Sopaipillas",
          nota: "Pedido mínimo 100 unidades.",
          items: [
            { n: "Mini sopaipillas de coctel", d: "Acompañadas de un pocillo con abundante pebre casero.", precioFijo: "$42.000 / 100 u", img: "assets/img/carta/mini-sopaipillas.jpg" },
          ],
        },
      ],
    },
  ],

  /* ---- Reseñas destacadas (reales, de Google — traducidas al español) ----
     Mismas 3 en las 3 sucursales: Google no diferencia el listado por sucursal. */
  resenas: [
    { nombre: "Mauricio Toledo", estrellas: 5, texto: "Probamos la torta mil hojas manjar tradicional, estaba muy buena, fresca, porción grande, buen precio, atención amable, gran variedad de sabores." },
    { nombre: "Limel Alvarez", estrellas: 5, texto: "Muy buena atencion, se pueden hacer reservas, la calidad de sus productos es la mejor 100% recomendados" },
    { nombre: "Luis Martinez Rios", estrellas: 5, texto: "Muy buenos a buen precio" },
  ],

  /* ---- Preguntas frecuentes ----

     Cada respuesta sale de lo que la pastelería ya le
     contesta a sus clientes por WhatsApp. Las fuentes textuales están
     en projects/pasteleria-kaiser/faq-real-clientes.md.

     Estas seis son las preguntas que más se repiten en el historial y
     que el sitio no respondía. Cada una que el sitio contesta es un
     WhatsApp que el encargado no tiene que escribir.

     ⚠️ SOLO PADRE HURTADO. Peñaflor y Huechuraba NO tienen este bloque
     todavía porque estas reglas salieron del WhatsApp de PH y nadie ha
     confirmado que apliquen igual en las otras dos. Si se copian sin
     preguntar, se estarían inventando condiciones de venta. */
  faq: [
    {
      p: "¿Con cuánta anticipación tengo que encargar?",
      /* 2026-08-14: Nicolás cambió el mínimo de "1 o 2 días" a 2 días para
         las tortas de 10 y 25. Antes decía "basta con 1 o 2 días", que era
         textual del WhatsApp de PH de agosto. La regla la fija Kaiser.
         2026-09-03: Nicolás corrigió el pago. Antes decía que solo las de 30
         en adelante se pagaban al reservar, y eso le prometía a la torta de
         15 personas un pago al retiro que Kaiser no da. Ahora: 10 y 25 al
         retiro, TODO el resto por adelantado, y el pago 3 días antes del
         retiro (Nicolás: "en este caso fueron 2 pero mejor dejémoslo en 3").
         2026-09-03 16:44: se le preguntó derecho por la de 15 ("se paga al
         retirar o se paga completo?") y contestó "Se paga completo". Ahora
         se nombra explícita, porque era el tamaño que este FAQ prometía mal.
         La anticipación de la de 15 la cerró Benjamín el mismo día: 3 días,
         igual que las grandes. No es palabra de Nicolás, es la consecuencia
         de su propia regla — si el pago tiene que estar listo 3 días antes
         del retiro y el pedido se reserva solo pagado, un pedido a 2 días
         era imposible de cumplir. */
      r: "Para las tortas de 10 y 25 personas necesitamos 2 días de anticipación como mínimo, y no necesitas pagar por adelantado: nos dejas tu nombre y apellido y queda reservada. Todos los demás tamaños, desde la de 15 personas en adelante, necesitan 3 días de anticipación como mínimo y se confirman con el pago total, que tiene que quedar listo a más tardar 3 días antes del día del retiro.",
    },
    {
      p: "¿Hacen despacho a domicilio?",
      r: "Por ahora no hacemos despacho. Todos los pedidos se retiran acá en el local.",
    },
    {
      p: "¿Cuándo se paga?",
      /* 2026-09-03: Nicolás. Antes la excepción eran "30 personas o más", lo
         que dejaba a la de 15 prometida como pago al retiro. La regla real es
         al revés: solo 10 y 25 pagan al retirar. */
      r: "Las tortas de 10 y 25 personas las puedes pagar al momento de retirar tu pedido, no hay problema. Todos los demás tamaños, incluida la de 15 personas, se confirman con el pago total, que tiene que quedar listo a más tardar 3 días antes del día en que retiras.",
    },
    {
      p: "¿Se puede escribir un mensaje en la torta?",
      r: "Sí, y no tiene costo. Nos lo pides al momento del retiro y lo escribimos ahí mismo, en el instante.",
    },
    {
      p: "¿Cómo reservo mi pedido?",
      r: "Escríbenos por WhatsApp con estos cuatro datos: el sabor de la torta, el tamaño (para cuántas personas), el día en que la necesitas y tu nombre y apellido. Con eso te confirmamos la disponibilidad.",
    },
    {
      p: "¿A qué hora puedo retirar?",
      r: "Cuando te confirmemos el pedido te decimos el horario exacto de retiro para ese día, porque depende de la hora en que quede lista. Siempre dentro de nuestro horario de atención.",
    },
  ],
};
