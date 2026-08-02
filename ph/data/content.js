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

  /* ---- Horario · PLACEHOLDER, confirmar en la reunión ----
     Formato 24h. day: 0=domingo .. 6=sábado. Cerrado = null. */
  horario: {
    placeholder: true, // TODO: reemplazar con el horario real de la sucursal
    dias: {
      1: { abre: "09:30", cierra: "20:00" }, // Lun
      2: { abre: "09:30", cierra: "20:00" }, // Mar
      3: { abre: "09:30", cierra: "20:00" }, // Mié
      4: { abre: "09:30", cierra: "20:00" }, // Jue
      5: { abre: "09:30", cierra: "20:00" }, // Vie
      6: { abre: "09:30", cierra: "20:00" }, // Sáb
      0: { abre: "10:00", cierra: "15:00" }, // Dom
    },
    resumen: [
      { etiqueta: "Lunes a sábado", valor: "09:30 – 20:00" },
      { etiqueta: "Domingo", valor: "10:00 – 15:00" },
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
            { n: "Tres Sabores", d: "Panqueque de chocolate, manjar crema, crema pastelera, chantilly y frambuesas." },
            { n: "Amapola", d: "Panqueque de vainilla con amapola, crema Bariloche (chocolate y manjar), mermelada de guinda y crema pastelera." },
            { n: "Plátano", d: "Panqueque de vainilla, capas de mil hojas, crema pastelera con Baileys y pasta de almendras, chantilly esencia de plátano, manjar y merengue." },
            { n: "Locura Kaiser", d: "Panqueque de chocolate, discos de merengue, mil hojas, mousse de lúcuma, manjar puro, mermelada de frambuesa y chantilly.", img: "assets/img/torta-panqueque.jpg" },
            { n: "Lúcuma Manjar", d: "Panqueque de vainilla, mousse de lúcuma y manjar." },
            { n: "Pie de Limón", d: "Panqueque de vainilla, mousse de limón y merengue." },
            { n: "Manjar Nuez", d: "Panqueque de vainilla, manjar crema y nueces, ganache de chocolate." },
            { n: "Panqueque Maracuyá", d: "Panqueque de chocolate y vainilla, discos de merengue, mousse de maracuyá y salsa de maracuyá.", tope: "25" },
            { n: "Panqueque Merengue Lúcuma", d: "Panqueque de vainilla, discos de merengue y mousse de lúcuma.", tope: "25" },
            { n: "Naranja Manjar", d: "Panqueque de vainilla, salsa de naranja y manjar." },
            { n: "Torta de Frutas", d: "Panqueque de vainilla, chantilly y fruta a elección (piña, durazno o cerezas).", tope: "25" },
          ],
        },
        {
          nombre: "Tortas de chocolate",
          precio: "escalaTortas",
          items: [
            { n: "Chocopaste", d: "Panqueque de chocolate, mousse de chocolate, manjar puro y crema pastelera.", img: "assets/img/real-chocopaste.jpg" },
            { n: "Choconuez", d: "Panqueque de chocolate, mousse de chocolate, nueces, manjar crema, mermelada de frutillas y ganache.", img: "assets/img/real-choconuez.jpg" },
            { n: "Selva Negra", d: "Panqueque de chocolate, mousse de chocolate, mermelada de frambuesa, chantilly, cerezas y chips de chocolate.", img: "assets/img/real-selvanegra.jpg" },
            { n: "Trufa", d: "Panqueque de chocolate remojado en aguardiente, trufa y manjar." },
            { n: "Café", d: "Panqueque de chocolate, mousse de café, mousse de chocolate, chantilly y frambuesas." },
            { n: "Cappuccino", d: "Panqueque de chocolate, mousse de cappuccino, mousse de chocolate y chips de chocolate." },
          ],
        },
        {
          nombre: "Tortas de mil hojas",
          precio: "escalaTortas",
          items: [
            { n: "Hoja de la Casa", d: "Mil hojas, manjar crema, nueces, mermelada de guinda, chantilly y hojarasca molida.", img: "assets/img/torta-milhojas.jpg" },
            { n: "Hoja Frambuesa", d: "Mil hojas, manjar, chantilly, frambuesas y merengue." },
            { n: "Hoja Tres Sabores", d: "Mil hojas y panqueque de vainilla, mousse de manjar, crema pastelera, chantilly, frambuesas y manjar." },
            { n: "Hoja Manjar", d: "Mil hojas y manjar puro." },
            { n: "Hoja Manjar Pastelera", d: "Mil hojas, manjar y crema pastelera." },
          ],
        },
        {
          nombre: "Tortas heladas",
          precio: "escalaHelada",
          nota: "Base de discos de merengue. Disponible en cuatro variedades.",
          items: [
            { n: "Frambuesa y chantilly", d: "Discos de merengue, frambuesas y chantilly." },
            { n: "Mousse de lúcuma", d: "Discos de merengue y mousse de lúcuma." },
            { n: "Mousse de maracuyá", d: "Discos de merengue y mousse de maracuyá." },
            { n: "Frutillas y chantilly", d: "Discos de merengue, frutillas y chantilly." },
          ],
        },
        {
          nombre: "Tortas de bizcocho",
          precio: "escalaBizcocho",
          items: [
            { n: "Torta Tropical", d: "Bizcocho de vainilla, mousse de piña, mango y maracuyá, con trozos de piña y mango." },
            { n: "Red Velvet", d: "Bizcocho de vainilla rojo, cheesecake philadelphia y manjar." },
            { n: "Carrot Cake", d: "Bizcocho de zanahoria con nueces, manjar y frosting de queso philadelphia." },
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
            { n: "Kuchen de Manzana", d: "Manzanas verdes, crema pastelera, mermelada de damasco y nueces. Solo en temporada de manzana verde.", precioFijo: "$19.000 / $23.000" },
            { n: "Streusel de Frambuesa", d: "Crema pastelera, frambuesas naturales, cubierto con migas.", precioFijo: "$19.000 / $23.000" },
            { n: "Cheesecake de Frutos Rojos", d: "Base de queso philadelphia con azúcar, cubierto con frambuesas y arándanos, con corona de azúcar rubia, almendras, nueces y canela.", precioFijo: "$19.000 / $23.000", img: "assets/img/cheesecake.jpg" },
            { n: "Pie de Limón", d: "Mousse de limón hecho con jugo de limón natural, cubierto con merengue.", precioFijo: "$19.000 / $23.000", img: "assets/img/pie-limon.jpg" },
            { n: "Pie de Maracuyá", d: "Mousse de maracuyá, cubierto con salsa de maracuyá.", precioFijo: "$19.000 / $23.000" },
            { n: "Kuchen de Nuez", d: "Relleno de nueces con leche condensada.", precioFijo: "$19.000 / $23.000", img: "assets/img/kuchen.jpg" },
            { n: "Cheesecake New York", d: "Base de galletas molidas con mantequilla, relleno de cheesecake horneado, cubierto con mermelada de frambuesa. Solo tamaño grande.", precioFijo: "$34.000" },
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
            { n: "Mini pastelitos surtidos", d: "Pie de limón · pie de maracuyá · alfajor de manjar bañado en chocolate · cheesecake de frutos rojos · mil hojas con manjar · tartaleta de frutas.", precioFijo: "$45.000 / 100 u" },
          ],
        },
        {
          nombre: "Mini Pizzetas",
          nota: "Pedido mínimo 50 unidades.",
          items: [
            { n: "Napolitanas", d: "Tomate, jamón, aceitunas y queso.", precioFijo: "$47.000 / 100 u", img: "assets/img/pizzetas.jpg" },
            { n: "De verduras", d: "Palmito, choclito de coctel, espárragos, tomate y queso.", precioFijo: "$47.000 / 100 u" },
          ],
        },
        {
          nombre: "Tapaditos",
          nota: "Pedido mínimo 100 unidades. Se pueden pedir 50 de una variedad y 50 de otra.",
          items: [
            { n: "Pollo a la mostaza", d: "Filetitos de pollo a la mostaza, rodaja de palmito, lechuga y mayonesa.", precioFijo: "$61.000 / 100 u", img: "assets/img/tapaditos.jpg" },
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
            { n: "Salmón ahumado", d: "Salmón ahumado, queso crema y sésamo.", precioFijo: "$74.000 / 100 u" },
            { n: "Queso crema y salame", d: "Pasta de queso crema, salame, palmitos y ciboulette.", precioFijo: "$41.000 / 100 u" },
          ],
        },
        {
          nombre: "Petit Bouche",
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
            { n: "Caprese", d: "Trozos de queso, tomates cherry y albahaca fresca.", precioFijo: "$47.000 / 100 u" },
            { n: "De frutas", d: "Trozos de fruta de estación con decoración de chocolate.", precioFijo: "$72.000 / 100 u", img: "assets/img/brochetas.jpg" },
          ],
        },
        {
          nombre: "Mini Sopaipillas",
          nota: "Pedido mínimo 100 unidades.",
          items: [
            { n: "Mini sopaipillas de coctel", d: "Acompañadas de un pocillo con abundante pebre casero.", precioFijo: "$42.000 / 100 u" },
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
};
