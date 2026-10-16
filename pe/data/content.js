/* =============================================================
   Pastelería Kaiser · Casa Matriz Peñaflor
   Fuente única de datos del sitio. Editar SOLO este archivo para
   actualizar textos, precios, contacto, horarios y fotos.
   Cargado como window.KAISER (sin fetch, funciona con file://).
   ============================================================= */
window.KAISER = {

  /* ---- Negocio y contacto ----
     Del catálogo de WhatsApp de la sucursal (2026-07-27). Confirmar con la sucursal antes de cambiarlos. Peñaflor es la CASA MATRIZ de Kaiser
     (lo dice su propio catálogo), no una sucursal más. */
  biz: {
    nombre: "Pastelería Kaiser",
    sucursal: "Casa Matriz · Peñaflor",
    lema: "Sabor casero desde 2005",
    direccion: "Av. Miraflores 2103, Peñaflor",
    ciudad: "Peñaflor, Región Metropolitana",
    email: "psdeliciaskaiser@gmail.com",
    whatsapp: "56999575267",
    whatsappDisplay: "+569 9957 5267",
    instagram: "pasteleriadeliciaskaiser_",
    tiktok: "pendiente_pe",          // PENDIENTE: no vino en el catálogo
    facebook: "pendiente_pe",
    web: "www.pasteleriakaiser.cl",
    rating: "4,6",
    reviewCount: "252",
    reviewsUrl: "https://maps.app.goo.gl/jyVwRAkbHr49W7X79",
    mapsQuery: "Av. Miraflores 2103, Peñaflor",
  },

  /* ---- Horario real (catálogo de WhatsApp, 2026-07-27) ---- */
  horario: {
    placeholder: false,
    dias: {
      1: null,                             // Lun: cerrado
      2: { abre: "11:30", cierra: "20:00" }, // Mar
      3: { abre: "11:30", cierra: "20:00" }, // Mié
      4: { abre: "11:30", cierra: "20:00" }, // Jue
      5: { abre: "11:30", cierra: "20:00" }, // Vie
      6: { abre: "10:00", cierra: "20:00" }, // Sáb
      0: { abre: "10:00", cierra: "20:00" }, // Dom
    },
    resumen: [
      { etiqueta: "Lunes", valor: "Cerrado" },
      { etiqueta: "Martes a viernes", valor: "11:30 – 20:00" },
      { etiqueta: "Sábado y domingo", valor: "10:00 – 20:00" },
    ],
  },

  /* ---- Franja de confianza (stats reales) ---- */
  stats: [
    { n: "4,6★", t: "252 reseñas en Google" },
    { n: "2005", t: "Sabor casero desde" },
    { n: "45+", t: "Tortas, kuchen y cóctel" },
    { n: "100%", t: "Hecho en casa" },
  ],

  /* ---- Tamaños de las tortas (tabla oficial, real — igual a la de PH) ---- */
  tamanos: [
    { personas: "10", forma: "Redonda", medida: "18 cm diámetro" },
    { personas: "15", forma: "Redonda", medida: "22 cm diámetro" },
    { personas: "25", forma: "Redonda", medida: "26 cm diámetro" },
    { personas: "30", forma: "Cuadrada", medida: "25 x 25 cm" },
    { personas: "35", forma: "Redonda", medida: "30 cm diámetro" },
    { personas: "40", forma: "Rectangular", medida: "38,5 x 28 cm" },
    { personas: "50", forma: "Rectangular", medida: "38,5 x 30 cm" },
  ],

  /* Escalas de precios: lista de precios de Peñaflor de octubre 2026 (cargada el
     2026-10-16; la anterior era del 2026-09-14). Donde la lista deja una celda en
     blanco no hay precio para ese tamaño: va como `tope` u `omite`.
     La escala es solo el valor por defecto del grupo. Cada torta puede traer
     `precios: { "50": 65000 }` (pisa esos tamaños), `omite: ["15"]` (no viene
     en ese tamaño) o `tope: "25"` (no pasa de ahí). Los lee `mergedScale()` en
     js/main.js. La premium es de Chocolate, Trufa, Choconuez, Selva Negra y
     Pasta de Almendras, y la Mil Hojas Frambuesa la trae como `precios`. */
  escalaTortas: {
    "10": 30500, "15": 35500, "25": 42500, "30": 54000,
    "35": 59000, "40": 65000, "50": 72000,
  },
  escalaTortasPremium: {
    "10": 32500, "15": 41500, "25": 48500, "30": 58000,
    "35": 64000, "40": 70000, "50": 77000,
  },
  escalaHelada: {
    "10": 30500, "15": 35500, "25": 42500, "30": 54000,
    "35": 59000, "40": 65000, "50": 72000,
  },
  escalaBizcocho: { "10": 30500, "15": 35500, "25": 42500 },
  escalaLight: { "10": 30500, "15": 35500, "25": 42500 },

  /* ---- Especialidades destacadas (selección editorial) ---- */
  especialidades: [
    {
      nombre: "Locura Kaiser",
      cat: "Torta de panqueque",
      desc: "Panqueque de chocolate, discos de merengue y capas de mil hojas, rellena con mousse de lúcuma, manjar puro, mermelada de frambuesa y crema chantilly.",
      img: "assets/img/torta-panqueque.jpg",
      destacada: true,
    },
    {
      nombre: "Selva Negra",
      cat: "Torta de chocolate",
      desc: "Panqueque de chocolate, mousse de chocolate, mermelada de frambuesa, crema chantilly y cerezas, cubierta con crema chantilly, cerezas y chips de chocolate.",
      img: "assets/img/torta-chocolate.jpg",
    },
    {
      nombre: "Cheesecake de Berries",
      cat: "Kuchen y pie",
      desc: "Base de queso philadelphia endulzado, cubierto con frambuesas y arándanos, con una corona de azúcar rubia, almendras, nueces y canela.",
      img: "assets/img/cheesecake.jpg",
    },
    {
      nombre: "Mil Hojas de la Casa",
      cat: "Torta mil hojas",
      desc: "Capas de mil hojas, rellena con manjar crema, nueces, mermelada de guinda y crema chantilly, cubierta con mil hojas molida.",
      img: "assets/img/torta-milhojas.jpg",
    },
  ],

  /* =========================================================
     CARTA COMPLETA · organizada por secciones y categorías
     Fuente: catálogo de WhatsApp de la Casa Matriz Peñaflor
     (2026-07-27). Las fotos por producto se van reemplazando a
     medida que llegan las del catálogo de la sucursal.
     ========================================================= */
  carta: [

    /* ---------- TORTAS ---------- */
    {
      id: "tortas",
      titulo: "Tortas",
      nota: "Precio según cantidad de personas. Consulta tamaños en la tabla más abajo. ¿Buscas torta de matrimonio? Ofrecemos degustación de 4 mini tortas y diseños personalizados en fondant o buttercream — escríbenos por WhatsApp con 2 a 4 semanas de anticipación.",
      img: "assets/img/torta-panqueque.jpg",
      grupos: [
        {
          nombre: "Tortas de panqueque",
          precio: "escalaTortas",
          items: [
            { n: "Naranja Manjar", d: "Panqueque de vainilla, rellena con salsa de naranja y manjar.", tope: "30", img: "assets/img/carta/naranja-manjar.jpg" },
            { n: "Manjar Nuez", d: "Panqueques de vainilla, rellena manjar crema y nueces, cubierta con ganache de chocolate.", omite: ["35", "40"], img: "assets/img/carta/manjar-nuez.jpg" },
            { n: "Nuez Lúcuma", d: "Panqueques de vainilla, rellena con manjar, nueces y crema chantilly con pulpa de lúcuma.", tope: "30" },
            { n: "Tres Sabores", d: "Panqueque de chocolate, rellena con manjar crema, crema pastelera, crema chantilly y frambuesas naturales.", precios: { "30": 56000, "35": 61000, "40": 68000, "50": 74000 }, img: "assets/img/carta/tres-sabores.jpg" },
            { n: "4 Leches", d: "Panqueque de vainilla con semillas de amapola, manjar y crema pastelera, con remojo de 4 leches.", tope: "25" },
            { n: "3 Leches", d: "Panqueque de vainilla y crema pastelera, con remojo de 3 leches.", tope: "25" },
            { n: "Amapolas", d: "Panqueque de vainilla con semillas de amapola, capa de mil hojas, rellena con crema Bariloche (mezcla de chocolate con manjar), mermelada de guinda y crema pastelera.", precios: { "30": 58000, "35": 64000, "40": 70000, "50": 80000 }, img: "assets/img/carta/amapola.jpg" },
            { n: "Almendra (también la llaman Plátano)", d: "Panqueque de vainilla con almendras, capas de mil hojas, rellena con manjar, crema pastelera con pasta de almendras y esencia de Baileys, y crema chantilly con esencia de plátano, cubierto de merengue.", img: "assets/img/carta/platano.jpg" },
            { n: "Panqueque Maracuyá", d: "Panqueques de chocolate y vainilla, discos de merengue, rellena con mousse de maracuyá, cubierta con salsa de maracuyá.", img: "assets/img/carta/panqueque-maracuya.jpg" },
            { n: "Panqueque Merengue Lúcuma", d: "Panqueques de vainilla, discos de merengue, rellena con mousse de lúcuma.", tope: "30", img: "assets/img/carta/panqueque-merengue-lucuma.jpg" },
            { n: "Torta de Frutas", d: "Panqueque de vainilla, rellena con crema chantilly y una fruta a elección (piña, duraznos o cerezas). Precio por confirmar: consúltalo por WhatsApp.", omite: ["10", "15", "25", "30", "35", "40", "50"], img: "assets/img/carta/torta-de-frutas.jpg" },
            { n: "Locura Kaiser", d: "Panqueque de chocolate, discos de merengue y capas de mil hojas, rellena con mousse de lúcuma, manjar puro, mermelada de frambuesa y crema chantilly.", img: "assets/img/carta/locura-kaiser.jpg" },
            { n: "Lúcuma Manjar", d: "Panqueques de vainilla, rellena con mousse de lúcuma y manjar.", tope: "30", img: "assets/img/carta/lucuma-manjar.jpg" },
            { n: "Torta Pie de Limón", d: "Panqueques de vainilla, rellena con mousse de limón, cubierta con merengue.", precios: { "25": 42000 }, tope: "30", img: "assets/img/carta/pie-de-limon-torta.jpg" },
          ],
        },
        {
          nombre: "Tortas de chocolate",
          precio: "escalaTortas",
          items: [
            { n: "Chocopastelera (Chocopaste)", d: "Panqueque de chocolate, rellena con mousse de chocolate, manjar puro y crema pastelera.", img: "assets/img/carta/chocopaste.jpg" },
            { n: "Café", d: "Panqueques de chocolate, rellena con mousse de café con mermelada de frambuesa, mousse de chocolate, crema chantilly y frambuesas naturales.", img: "assets/img/carta/cafe.jpg" },
            { n: "Cappuccino", d: "Panqueque de chocolate, rellena con mousse de cappuccino, mousse de chocolate y chips de chocolate.", precios: { "10": 32500 }, tope: "25", img: "assets/img/carta/cappuccino.jpg" },
            { n: "Diplomática", d: "Panqueque de chocolate, rellena con crema diplomática (mezcla de crema chantilly y crema pastelera) y mermelada de frambuesa, cubierta con merengue.", precios: { "25": 42000 }, tope: "25", img: "assets/img/carta/diplomatica.jpg" },
            { n: "Menta", d: "Panqueque de chocolate, rellena con mousse de chocolate, mousse de menta, mousse de cappuccino y chips de chocolate. Precio por confirmar: consúltalo por WhatsApp.", omite: ["10", "15", "25", "30", "35", "40", "50"] },
            { n: "Cheesecake de Berries", d: "Panqueque de chocolate, rellena con mousse de queso philadelphia y chips de chocolate, cubierta con arándanos y frambuesas.", precios: { "10": 32500, "15": 41500, "25": 48500 }, img: "assets/img/cheesecake.jpg", tope: "25" },
          ],
        },
        {
          nombre: "Tortas de chocolate premium",
          precio: "escalaTortasPremium",
          nota: "Recetas con más relleno/ingredientes especiales — precio distinto al resto de las tortas de chocolate.",
          items: [
            { n: "Chocolate", d: "Panqueque de chocolate, rellena con mermelada de frambuesa y chocolate.", precios: { "50": 80000 } },
            { n: "Trufa", d: "Panqueque de chocolate, remojo de agua ardiente, rellena con trufa y manjar.", img: "assets/img/carta/trufa.jpg" },
            { n: "Choconuez", d: "Panqueques de chocolate, rellena con mousse de chocolate, nueces, manjar crema y mermelada de frutillas, cubierta con ganache de chocolate.", img: "assets/img/carta/choconuez.jpg" },
            { n: "Selva Negra", d: "Panqueque de chocolate, rellena con mousse de chocolate, mermelada de frambuesa, crema chantilly y cerezas, cubierta con crema chantilly, cerezas y chips de chocolate.", img: "assets/img/carta/selva-negra.jpg" },
            { n: "Pasta de Almendras", d: "Panqueque de chocolate, rellena con mousse de chocolate, pasta de almendras, y mermelada de naranja.", tope: "25", img: "assets/img/carta/pasta-almendras.jpg" },
          ],
        },
        {
          nombre: "Tortas de mil hojas",
          precio: "escalaTortas",
          items: [
            { n: "Mil Hojas Frambuesa", d: "Capas de mil hojas, rellena con manjar, crema chantilly y frambuesas naturales, cubierta con merengue.", precios: { "10": 32500, "15": 41500, "25": 48500, "30": 58000, "35": 64000, "40": 70000, "50": 77000 }, img: "assets/img/carta/hoja-frambuesa.jpg" },
            { n: "Mil Hojas Tres Sabores", d: "Capas de mil hojas, rellena con mousse de manjar, crema pastelera, crema chantilly y frambuesas naturales, cubierta con manjar y crema chantilly.", img: "assets/img/carta/hoja-tres-sabores.jpg" },
            { n: "Mil Hojas Manjar", d: "Capas de mil hojas, rellena con manjar puro.", img: "assets/img/carta/hoja-manjar.jpg" },
            { n: "Mil Hojas Manjar Pastelera", d: "Capas de mil hojas, rellena con manjar y crema pastelera.", img: "assets/img/carta/hoja-manjar-pastelera.jpg" },
            { n: "Mil Hojas de la Casa", d: "Capas de mil hojas, rellena con manjar crema, nueces, mermelada de guinda y crema chantilly, cubierta con mil hojas molida.", precios: { "30": 57000 }, img: "assets/img/carta/mil-hojas-de-la-casa.jpg" },
          ],
        },
        {
          nombre: "Tortas heladas",
          precio: "escalaHelada",
          items: [
            { n: "Torta Helada de Frambuesa", d: "Discos de merengue, rellena con frambuesas naturales y crema chantilly.", img: "assets/img/carta/frambuesa-y-chantilly.jpg" },
            { n: "Torta Helada de Lúcuma", d: "Discos de merengue, rellena con crema chantilly con pulpa de lúcuma.", tope: "25", img: "assets/img/carta/mousse-de-lucuma.jpg" },
            { n: "Torta Helada de Maracuyá", d: "Discos de merengue, rellena con mousse de maracuyá.", tope: "25", img: "assets/img/carta/mousse-de-maracuya.jpg" },
            { n: "Torta Helada de Frutillas", d: "Discos de merengue, rellena con frutillas y crema chantilly. Solo en temporada de frutillas.", tope: "25", img: "assets/img/carta/frutillas-y-chantilly.jpg" },
            { n: "Torta Helada de Frutilla con Mousse", d: "Discos de merengue, rellena con mousse de frutilla, cubierta con crema chantilly.", tope: "25" },
          ],
        },
        {
          nombre: "Tortas Light",
          precio: "escalaLight",
          nota: "Disponible hasta 25 personas.",
          items: [
            { n: "Torta de Naranja Light", d: "Panqueque de vainilla, rellena con salsa de naranja light, cubierta con salsa de naranja light y decorada con chocolate.", img: "assets/img/carta/torta-de-naranja-light.jpg" },
            { n: "Torta de Yogurt Light", d: "Panqueque de vainilla, rellena con mousse de yogurt light, cubierta con mermelada light de frambuesa.", img: "assets/img/carta/torta-de-yogurt.jpg" },
          ],
        },
        {
          nombre: "Tortas de bizcocho",
          precio: "escalaBizcocho",
          nota: "Disponible hasta 25 personas. La de Durazno, la 4 Leches de Bizcocho y la de Piña no vienen en 15 personas.",
          items: [
            { n: "Carrot Cake", d: "Bizcocho de zanahorias con nueces, rellena con manjar y frosting de queso philadelphia.", precios: { "10": 32500, "15": 41500, "25": 48500 }, img: "assets/img/carta/carrot-cake.jpg" },
            { n: "Bizcocho de Chocolate", d: "Bizcocho de chocolate, rellena con manjar y ganache de chocolate." },
            { n: "Torta Tropical", d: "Bizcocho de vainilla, mousse de mango, maracuyá y piña.", img: "assets/img/carta/torta-tropical.jpg" },
            { n: "Red Velvet", d: "Bizcocho rojo, relleno con manjar y cream cheese.", precios: { "10": 32500, "15": 41500, "25": 48500 }, img: "assets/img/carta/red-velvet.jpg" },
            { n: "Torta de Durazno", d: "Bizcocho de vainilla, relleno con duraznos, remojo y manjar crema.", omite: ["15"] },
            { n: "4 Leches de Bizcocho", d: "Bizcocho de vainilla, manjar y frambuesas, con remojo de 4 leches.", precios: { "10": 32500, "25": 48500 }, omite: ["15"] },
            { n: "Torta de Piña", d: "Bizcocho con crema chantilly y trocitos de piña.", precios: { "25": 42000 }, omite: ["15"] },
          ],
        },
        {
          nombre: "Tortas sin azúcar",
          precio: "escalaBizcocho",
          nota: "Ninguna de las dos es apta para diabéticos: la Mil Hojas lleva manjar sin azúcar y el semifrío lleva maltitol.",
          items: [
            { n: "Mil Hojas Frambuesa Sin Azúcar", d: "Mil hojas y manjar sin azúcar, con frambuesas naturales y crema chantilly. No apta para diabéticos.", precios: { "10": 35500, "25": 51500 }, omite: ["15"], img: "assets/img/carta/hoja-frambuesa-light.jpg" },
            { n: "Torta Sin Azúcar Semifrío", d: "Bizcocho de vainilla, ganache de chocolate, mousse de maracuyá y mermelada de maracuyá sin azúcar. Contiene maltitol. No apta para diabéticos. Precio por confirmar: consúltalo por WhatsApp.", omite: ["10", "15", "25", "30", "35", "40", "50"] },
          ],
        },
        {
          nombre: "Tortas mini rectangulares",
          nota: "Para 6 a 8 personas.",
          items: [
            { n: "Mini de la Casa, Locura Kaiser o Pie de Limón", d: "", precioFijo: "$19.500" },
            { n: "Mini Hoja Manjar o Hoja Frambuesa", d: "", precioFijo: "$22.000" },
          ],
        },
        {
          nombre: "Trozos de torta",
          nota: "Solo venta en el local, no se encargan.",
          items: [
            { n: "Trozo de torta", d: "$3.600" },
            { n: "Trozo de Chocolate, Bizcocho de Chocolate, Trufa, Hoja Frambuesa, Choconuez, Pasta de Almendras, Selva Negra o Red Velvet", d: "$3.800" },
          ],
        },
      ],
    },

    /* ---------- KUCHEN, PIE Y TARTALETA ---------- */
    {
      id: "kuchen",
      titulo: "Kuchen, Pie y Tartaleta",
      nota: "Chico: 6 a 8 personas · Grande: 10 a 12 personas. Precio: chico / grande.",
      img: "assets/img/kuchen.jpg",
      grupos: [
        {
          nombre: "Kuchen, pie y tartaleta",
          items: [
            { n: "Tartaleta de Frutas", d: "Base de crema pastelera, cubierta con duraznos, piña y cerezas en almíbar.", precioFijo: "$16.900 / $19.000", img: "assets/img/carta/tartaleta-de-frutas.jpg" },
            { n: "Tartaleta de Frutillas", d: "Base de crema pastelera, cubierta de frutillas. Solo en temporada de frutillas.", precioFijo: "$16.900 / $19.000", img: "assets/img/carta/tartaleta-de-frutillas.jpg" },
            { n: "Streusel de Frambuesa (kuchen de frambuesa)", d: "Crema pastelera, frambuesas naturales, cubierto con migas.", precioFijo: "$16.900 / $19.900", img: "assets/img/carta/streusel-de-frambuesa.jpg" },
            { n: "Pie de Limón", d: "Mousse de limón, hecho con jugo de limón natural, cubierto con merengue.", precioFijo: "$16.900 / $19.900", img: "assets/img/carta/pie-de-limon.jpg" },
            { n: "Pie de Maracuyá", d: "Mousse de maracuyá, cubierto con salsa de maracuyá.", precioFijo: "$16.900 / $19.900", img: "assets/img/carta/pie-de-maracuya.jpg" },
            { n: "Kuchen de Manzana", d: "Manzanas verdes, crema pastelera, mermelada de damasco y nueces. Solo en temporada de manzana verde.", precioFijo: "$16.900 / $19.900", img: "assets/img/carta/kuchen-de-manzana.jpg" },
            { n: "Cheesecake de Berries", d: "Base de queso philadelphia endulzado, cubierto con frambuesas y arándanos, con corona de azúcar rubia, almendras, nueces y canela.", precioFijo: "$17.900 / $21.900", img: "assets/img/carta/cheesecake-de-berries.jpg" },
            { n: "Kuchen de Nuez", d: "Nueces con leche condensada.", precioFijo: "$17.900 / $21.900", img: "assets/img/carta/kuchen-de-nuez.jpg" },
            { n: "Mix Kaiser", d: "Pie de limón, pie de maracuyá, kuchen de nuez y streusel de frambuesa — para probar de todo un poco. El grande mide 26 cm de diámetro.", precioFijo: "$18.000 / $20.900", img: "assets/img/carta/mix-kaiser.jpg" },
            { n: "Cheesecake New York (frambuesa o maracuyá)", d: "Cheesecake horneado, cubierto con mermelada de frambuesa o de maracuyá. Tamaño grande. También por trozo ($3.400) o en pote ($5.200).", precioFijo: "$32.000", img: "assets/img/carta/cheesecake-new-york.jpg" },
          ],
        },
        {
          nombre: "Trozos de kuchen y pie",
          nota: "Solo venta en el local, no se encargan.",
          items: [
            { n: "Trozo de Cheesecake de Berries, Kuchen de Nuez, Pie de Limón o Kuchen de Manzana", d: "$2.600" },
            { n: "Trozo de Pie de Maracuyá o Kuchen de Frambuesa", d: "$2.500" },
          ],
        },
      ],
    },

    /* ---------- DULCES Y EMPANADAS ---------- */
    {
      id: "dulces",
      titulo: "Dulces y empanadas",
      nota: "",
      img: "assets/img/kuchen.jpg",
      grupos: [
        {
          nombre: "Empanadas",
          nota: "De viernes a domingo. Por ahora, solo de pino. Se pueden encargar y dejar pagadas: escríbenos por WhatsApp.",
          items: [
            { n: "Empanada de pino (de horno)", d: "Pino de carne picada · $2.900 c/u" },
          ],
        },
        {
          nombre: "Brazos de reina y brownie",
          items: [
            { n: "Brazo de Reina Blanco", d: "Bizcocho de vainilla, relleno con manjar, cubierto con azúcar flor. Precio por confirmar: consúltalo por WhatsApp." },
            { n: "Brazo de Reina Chocolate", d: "Bizcocho de chocolate, relleno con mermelada de guinda y mousse de chocolate. Precio por confirmar: consúltalo por WhatsApp." },
            { n: "Brownie", d: "Cubierto con manjar y merengue. También por trozo ($2.900).", precioFijo: "$24.500" },
          ],
        },
        {
          nombre: "Galletas y dulces",
          items: [
            { n: "Rollos de canela", d: "", precioFijo: "$1.800" },
            { n: "Alfajores", d: "", precioFijo: "$1.250" },
            { n: "Alfajores de maicena", d: "", precioFijo: "$750 c/u" },
            { n: "Muffin", d: "1 unidad, hecha en molde rectangular de queque inglés. De chip de chocolate, frambuesa o arándanos.", precioFijo: "$7.200" },
            { n: "Galletas de limón", d: "Por kilo. También en bolsa de 200 g ($2.800).", precioFijo: "$14.000 / kilo" },
            { n: "Crumb cookie chip de chocolate", d: "Rellena de ganache de chocolate. Precio por confirmar: consúltalo por WhatsApp." },
            { n: "Crumb cookie red velvet", d: "Con chips de chocolate blanco, rellena de frosting. Precio por confirmar: consúltalo por WhatsApp." },
            { n: "Crumb cookie de zanahoria, canela y nuez", d: "Rellena de frosting. Precio por confirmar: consúltalo por WhatsApp." },
          ],
        },
      ],
    },

    /* ---------- COCTELERÍA ---------- */
    {
      id: "cocteleria",
      titulo: "Coctelería",
      nota: "Precios de la lista de Peñaflor cargada el 2026-10-04. Valor por 100 unidades, salvo indicado. Pedido mínimo según cada producto.",
      img: "assets/img/carta/canapes-premium.jpg",
      grupos: [
        {
          nombre: "Tapaditos",
          img: "assets/img/carta/tapaditos.jpg",
          nota: "Pedido mínimo 100 unidades.",
          items: [
            { n: "Filetitos de pollo a la mostaza", d: "Lechuga y palmito.", precioFijo: "$63.000 / 100 u" },
            { n: "Pasta de ave pimentón", d: "", precioFijo: "$46.000 / 100 u" },
            { n: "Churrasco italiano", d: "", precioFijo: "$64.000 / 100 u" },
            { n: "Lomito italiano", d: "", precioFijo: "$58.000 / 100 u" },
            { n: "Jamón de pavo", d: "Jamón de pavo, palmito, lechuga y queso crema.", precioFijo: "$59.000 / 100 u" },
            { n: "Queso chanco", d: "Queso chanco, tomates asados y aceitunas.", precioFijo: "$44.000 / 100 u" },
            { n: "Queso fresco", d: "Queso fresco, lechuga, tomate y ají verde.", precioFijo: "$45.000 / 100 u" },
          ],
        },
        {
          nombre: "Crostinis",
          nota: "Pedido mínimo 50 unidades. Sobre crujiente pan baguette.",
          items: [
            { n: "Pasta de ave y palta", d: "", precioFijo: "$56.000 / 100 u" },
            { n: "Salmón ahumado", d: "Salmón ahumado, queso crema y sésamo negro.", precioFijo: "$76.000 / 100 u", img: "assets/img/carta/crostini-salmon.jpg" },
            { n: "Queso crema y salame", d: "Pasta de queso crema, salame, palmitos y ciboulette.", precioFijo: "$43.000 / 100 u", img: "assets/img/carta/crostini-queso-salame.jpg" },
          ],
        },
        {
          nombre: "Bruschettas",
          nota: "Pedido mínimo 50 unidades. Sobre crujiente pan baguette.",
          items: [
            { n: "Ricotta y tomate cherry", d: "Pasta de ricota, queso crema y albahaca y aceitunas, decorada con tomate cherry asado.", precioFijo: "$55.000 / 100 u" },
            { n: "Queso de cabra", d: "Queso de cabra, espinaca y tomate cherry. Solo de temporada.", precioFijo: "$68.000 / 100 u" },
          ],
        },
        {
          nombre: "Canapés Premium",
          nota: "Pedido mínimo 100 unidades. Surtido de 6 variedades.",
          items: [
            { n: "Canapés Premium surtidos", d: "Palmito, jamón, queso crema y sésamo negro · huevo de codorniz, pepinillo y mayonesa · camarón salteado, queso crema y ciboulette · salame, queso crema y almendra ahumada · espárragos, mayonesa y pimentón · choclito oriental, ciboulette, queso crema y un toque de merquén.", precioFijo: "$45.000 / 100 u", img: "assets/img/carta/canapes-premium.jpg" },
            { n: "Canapés solo de Camarón", d: "Para quienes prefieren solo la variedad de camarón, en vez del surtido.", precioFijo: "$55.000 / 100 u" },
          ],
        },
        {
          nombre: "Brochetas",
          img: "assets/img/carta/brochetas-carne-chorizo.jpg",
          nota: "Pedido mínimo 50 unidades.",
          items: [
            { n: "Carne y chorizo", d: "", precioFijo: "$110.000 / 100 u", img: "assets/img/carta/brochetas-carne-chorizo.jpg" },
            { n: "Pollo y cerdo", d: "", precioFijo: "$76.000 / 100 u" },
            { n: "Queso chanco y albahaca", d: "Queso chanco, tomate cherry y albahaca.", precioFijo: "$61.000 / 100 u", img: "assets/img/carta/brochetas-caprese.jpg" },
            { n: "Frutas de estación", d: "", precioFijo: "$72.000 / 100 u", img: "assets/img/carta/brochetas-de-frutas.jpg" },
          ],
        },
        {
          nombre: "Bolitas de Carne",
          nota: "Pedido mínimo 50 unidades. Con salsa de queso para untar.",
          items: [
            { n: "Bolitas de carne", d: "Vacuno y sésamo.", precioFijo: "$122.000 / 100 u", img: "assets/img/carta/bolitas-de-carne.jpg" },
          ],
        },
        {
          nombre: "Queso Apanado",
          nota: "Pedido mínimo 50 unidades.",
          items: [
            { n: "Cubitos de queso crema apanados", d: "Con salsa de vino tinto para untar.", precioFijo: "$75.000 / 100 u", img: "assets/img/carta/queso-apanado.jpg" },
          ],
        },
        {
          nombre: "Postres Individuales",
          nota: "Pedido mínimo 50 unidades. Postres de 160 cc, en 6 variedades: panacota con coulis de frambuesa · mousse de pie de limón · tiramisú · mousse de maracuyá · manjarate · suspiro limeño. Precio por caja: 6 unidades $16.990 · 12 unidades $29.990.",
          items: [
            { n: "Postres individuales surtidos", d: "Caja de 6 unidades: $16.990 · Caja de 12 unidades: $29.990.", img: "assets/img/carta/postres-individuales.jpg" },
          ],
        },
        {
          nombre: "Mini Sopaipillas",
          nota: "Pedido mínimo 50 unidades. Con pebre para servir.",
          items: [
            { n: "Mini sopaipillas de cóctel", d: "", precioFijo: "$45.000 / 100 u", img: "assets/img/carta/mini-sopaipillas.jpg" },
          ],
        },
        {
          nombre: "Ceviche de Pescado",
          nota: "Pedido mínimo 50 unidades. Montado en pocillos individuales.",
          items: [
            { n: "Ceviche de pescado a la peruana", d: "", precioFijo: "$137.000 / 100 u", img: "assets/img/carta/ceviche-pescado.jpg" },
          ],
        },
        {
          nombre: "Pastel de Jaiba",
          nota: "Pedido mínimo 50 unidades. Montado en pocillos individuales — precio cada 50 unidades.",
          items: [
            { n: "Pastel de jaiba", d: "", precioFijo: "$59.000 / 50 u" },
          ],
        },
        {
          nombre: "Mini Hamburguesas",
          nota: "Pedido mínimo 100 unidades.",
          items: [
            { n: "Mini hamburguesas caseras", d: "Vacuno, con queso.", precioFijo: "$110.000 / 100 u" },
          ],
        },
        {
          nombre: "Pastelitos de Cóctel",
          nota: "Pedido mínimo 50 unidades. 6 variedades surtidas.",
          items: [
            { n: "Pastelitos de cóctel surtidos", d: "Mini pie de limón · mini pie de maracuyá · mini tartaleta de frutas · mini alfajor · mini cheesecake de berries · mini mil hojas manjar.", precioFijo: "$45.000 / 100 u", img: "assets/img/carta/mini-pastelitos.jpg" },
          ],
        },
        {
          nombre: "Petit Bouche",
          img: "assets/img/carta/petit-bouche.jpg",
          nota: "Pedido mínimo 50 unidades. Tacitas de masa quiche.",
          items: [
            { n: "Camarón y queso", d: "", precioFijo: "$45.000 / 100 u" },
            { n: "Espinacas a la crema", d: "", precioFijo: "$43.000 / 100 u" },
            { n: "Salame y queso", d: "", precioFijo: "$43.000 / 100 u" },
            { n: "Choclo y champiñón", d: "En salsa bechamel.", precioFijo: "$43.000 / 100 u" },
          ],
        },
        {
          nombre: "Mini Pizzas",
          nota: "Pedido mínimo 50 unidades. 2 variedades, mismo precio.",
          items: [
            { n: "Napolitana", d: "Queso, tomate, jamón y aceitunas.", precioFijo: "$49.000 / 100 u", img: "assets/img/carta/pizzetas-napolitanas.jpg" },
            { n: "De verduras", d: "Queso, palmito, espárragos, tomate y aceituna.", precioFijo: "$49.000 / 100 u", img: "assets/img/carta/pizzetas-de-verduras.jpg" },
          ],
        },
      ],
    },
  ],

  /* ---- Reseñas destacadas (reales, de Google — traducidas al español) ----
     Mismas 3 en las 3 sucursales: Google no diferencia el listado por sucursal. */
  resenas: [
    { nombre: "Milena Covazzi", estrellas: 5, texto: "Exquisitas tortas en porciones para probar diferentes sabores. Relación calidas precio muy buena." },
    { nombre: "Stephania Díaz", estrellas: 5, texto: "Excelente pastelería. Sus pasteles son maravillosos 💗" },
    { nombre: "Cristián Nicolás Aguilar Ramírez", estrellas: 5, texto: "la mejor en la comuna y santiago, especialidades de la casa que son únicas e inigualables.. todos en casa compramos ahí y cada uno tiene su especialidad favorita. encargamos por whatsapp y se paga al retirar; muy práctico y confiable" },
  ],
};
