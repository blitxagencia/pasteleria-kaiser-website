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

  /* Escalas de precios: lista de precios de Peñaflor (cargada el 2026-09-14).
     La escala es solo el valor por defecto del grupo. Cada torta puede traer
     `precios: { "50": 65000 }` (pisa esos tamaños), `omite: ["15"]` (no viene
     en ese tamaño) o `tope: "25"` (no pasa de ahí). Los lee `mergedScale()` en
     js/main.js. La premium es de Chocolate, Trufa, Choconuez, Selva Negra y
     Pasta de Almendras, y la Mil Hojas Frambuesa la trae como `precios`. */
  escalaTortas: {
    "10": 28500, "15": 33500, "25": 40500, "30": 49000,
    "35": 54000, "40": 60000, "50": 67000,
  },
  escalaTortasPremium: {
    "10": 30500, "15": 39500, "25": 46500, "30": 53000,
    "35": 59000, "40": 64000, "50": 72000,
  },
  escalaHelada: {
    "10": 28500, "15": 33500, "25": 40500, "30": 49000,
    "35": 54000, "40": 60000, "50": 67000,
  },
  escalaBizcocho: { "10": 28500, "15": 33500, "25": 40500 },
  escalaLight: { "10": 28500, "15": 33500, "25": 40500 },

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
            { n: "Naranja Manjar", d: "Panqueque de vainilla, rellena con salsa de naranja y manjar." },
            { n: "Manjar Nuez", d: "Panqueques de vainilla, rellena manjar crema y nueces, cubierta con ganache de chocolate." },
            { n: "Nuez Lúcuma", d: "Panqueques de vainilla, rellena con manjar, nueces y crema chantilly con pulpa de lúcuma." },
            { n: "Tres Sabores", d: "Panqueque de chocolate, rellena con manjar crema, crema pastelera, crema chantilly y frambuesas naturales." },
            { n: "4 Leches", d: "Panqueque de vainilla con semillas de amapola, manjar y crema pastelera, con remojo de 4 leches.", tope: "25" },
            { n: "3 Leches", d: "Panqueque de vainilla y crema pastelera, con remojo de 3 leches.", tope: "25" },
            { n: "Amapolas", d: "Panqueque de vainilla con semillas de amapola, capa de mil hojas, rellena con crema Bariloche (mezcla de chocolate con manjar), mermelada de guinda y crema pastelera." },
            { n: "Almendra (también la llaman Plátano)", d: "Panqueque de vainilla con almendras, capas de mil hojas, rellena con manjar, crema pastelera con pasta de almendras y esencia de Baileys, y crema chantilly con esencia de plátano, cubierto de merengue.", precios: { "50": 65000 } },
            { n: "Panqueque Maracuyá", d: "Panqueques de chocolate y vainilla, discos de merengue, rellena con mousse de maracuyá, cubierta con salsa de maracuyá." },
            { n: "Panqueque Merengue Lúcuma", d: "Panqueques de vainilla, discos de merengue, rellena con mousse de lúcuma." },
            { n: "Torta de Frutas", d: "Panqueque de vainilla, rellena con crema chantilly y una fruta a elección (piña, duraznos o cerezas)." },
            { n: "Locura Kaiser", d: "Panqueque de chocolate, discos de merengue y capas de mil hojas, rellena con mousse de lúcuma, manjar puro, mermelada de frambuesa y crema chantilly.", img: "assets/img/torta-panqueque.jpg" },
            { n: "Lúcuma Manjar", d: "Panqueques de vainilla, rellena con mousse de lúcuma y manjar." },
            { n: "Pie de Limón", d: "Panqueques de vainilla, rellena con mousse de limón, cubierta con merengue." },
          ],
        },
        {
          nombre: "Tortas de chocolate",
          precio: "escalaTortas",
          items: [
            { n: "Chocopastelera (Chocopaste)", d: "Panqueque de chocolate, rellena con mousse de chocolate, manjar puro y crema pastelera." },
            { n: "Café", d: "Panqueques de chocolate, rellena con mousse de café con mermelada de frambuesa, mousse de chocolate, crema chantilly y frambuesas naturales." },
            { n: "Cappuccino", d: "Panqueque de chocolate, rellena con mousse de cappuccino, mousse de chocolate y chips de chocolate." },
            { n: "Diplomática", d: "Panqueque de chocolate, rellena con crema diplomática (mezcla de crema chantilly y crema pastelera) y mermelada de frambuesa, cubierta con merengue." },
            { n: "Menta", d: "Panqueque de chocolate, rellena con mousse de chocolate, mousse de menta, mousse de cappuccino y chips de chocolate." },
            { n: "Cheesecake de Berries", d: "Panqueque de chocolate, rellena con mousse de queso philadelphia y chips de chocolate, cubierta con arándanos y frambuesas.", img: "assets/img/cheesecake.jpg", tope: "25" },
          ],
        },
        {
          nombre: "Tortas de chocolate premium",
          precio: "escalaTortasPremium",
          nota: "Recetas con más relleno/ingredientes especiales — precio distinto al resto de las tortas de chocolate.",
          items: [
            { n: "Chocolate", d: "Panqueque de chocolate, rellena con mermelada de frambuesa y chocolate." },
            { n: "Trufa", d: "Panqueque de chocolate, remojo de agua ardiente, rellena con trufa y manjar.", img: "assets/img/torta-chocolate.jpg" },
            { n: "Choconuez", d: "Panqueques de chocolate, rellena con mousse de chocolate, nueces, manjar crema y mermelada de frutillas, cubierta con ganache de chocolate." },
            { n: "Selva Negra", d: "Panqueque de chocolate, rellena con mousse de chocolate, mermelada de frambuesa, crema chantilly y cerezas, cubierta con crema chantilly, cerezas y chips de chocolate." },
            { n: "Pasta de Almendras", d: "Panqueque de chocolate, rellena con mousse de chocolate, pasta de almendras, y mermelada de naranja." },
          ],
        },
        {
          nombre: "Tortas de mil hojas",
          precio: "escalaTortas",
          items: [
            { n: "Mil Hojas Frambuesa", d: "Capas de mil hojas, rellena con manjar, crema chantilly y frambuesas naturales, cubierta con merengue.", precios: { "10": 30500, "15": 39500, "25": 46500, "30": 53000, "35": 59000, "40": 64000, "50": 72000 }, img: "assets/img/torta-milhojas.jpg" },
            { n: "Mil Hojas Tres Sabores", d: "Capas de mil hojas, rellena con mousse de manjar, crema pastelera, crema chantilly y frambuesas naturales, cubierta con manjar y crema chantilly." },
            { n: "Mil Hojas Manjar", d: "Capas de mil hojas, rellena con manjar puro." },
            { n: "Mil Hojas Manjar Pastelera", d: "Capas de mil hojas, rellena con manjar y crema pastelera." },
            { n: "Mil Hojas de la Casa", d: "Capas de mil hojas, rellena con manjar crema, nueces, mermelada de guinda y crema chantilly, cubierta con mil hojas molida." },
          ],
        },
        {
          nombre: "Tortas heladas",
          precio: "escalaHelada",
          items: [
            { n: "Torta Helada de Frambuesa", d: "Discos de merengue, rellena con frambuesas naturales y crema chantilly." },
            { n: "Torta Helada de Lúcuma", d: "Discos de merengue, rellena con crema chantilly con pulpa de lúcuma." },
            { n: "Torta Helada de Maracuyá", d: "Discos de merengue, rellena con mousse de maracuyá." },
            { n: "Torta Helada de Frutillas", d: "Discos de merengue, rellena con frutillas y crema chantilly. Solo en temporada de frutillas." },
          ],
        },
        {
          nombre: "Tortas Light",
          precio: "escalaLight",
          nota: "Disponible hasta 25 personas.",
          items: [
            { n: "Torta de Naranja Light", d: "Panqueque de vainilla, rellena con salsa de naranja light, cubierta con salsa de naranja light y decorada con chocolate." },
            { n: "Torta de Yogurt Light", d: "Panqueque de vainilla, rellena con mousse de yogurt light, cubierta con mermelada light de frambuesa." },
          ],
        },
        {
          nombre: "Tortas de bizcocho",
          precio: "escalaBizcocho",
          nota: "Disponible hasta 25 personas. La Torta Tropical y la Red Velvet no vienen en 15 personas.",
          items: [
            { n: "Carrot Cake", d: "Bizcocho de zanahorias con nueces, rellena con manjar y frosting de queso philadelphia." },
            { n: "Bizcocho de Chocolate", d: "Bizcocho de chocolate, rellena con manjar y ganache de chocolate." },
            { n: "Torta Tropical", d: "Bizcocho de vainilla, mousse de mango, maracuyá y piña.", omite: ["15"] },
            { n: "Red Velvet", d: "Bizcocho rojo, relleno con manjar y cream cheese.", precios: { "10": 30500, "25": 46500 }, omite: ["15"] },
          ],
        },
        {
          nombre: "Tortas sin azúcar",
          precio: "escalaBizcocho",
          nota: "Ninguna de las dos es apta para diabéticos: la Mil Hojas lleva manjar sin azúcar y el semifrío lleva maltitol.",
          items: [
            { n: "Mil Hojas Frambuesa Sin Azúcar", d: "Mil hojas y manjar sin azúcar, con frambuesas naturales y crema chantilly. No apta para diabéticos.", precios: { "10": 33500, "25": 49500 }, omite: ["15"] },
            { n: "Torta Sin Azúcar Semifrío", d: "Bizcocho de vainilla, ganache de chocolate, mousse de maracuyá y mermelada de maracuyá sin azúcar. Contiene maltitol. No apta para diabéticos.", precios: { "25": 46500 }, omite: ["10", "15"] },
          ],
        },
        {
          nombre: "Tortas mini rectangulares",
          nota: "Para 6 a 8 personas.",
          items: [
            { n: "Mini de la Casa, Locura Kaiser o Pie de Limón", d: "", precioFijo: "$17.500" },
            { n: "Mini Hoja Manjar o Hoja Frambuesa", d: "", precioFijo: "$20.000" },
          ],
        },
        {
          nombre: "Trozos de torta",
          nota: "Solo venta en el local, no se encargan.",
          items: [
            { n: "Trozo de torta", d: "$3.400" },
            { n: "Trozo de Chocolate, Bizcocho de Chocolate, Trufa, Hoja Frambuesa, Choconuez, Pasta de Almendras, Selva Negra o Red Velvet", d: "$3.600" },
            { n: "Trozo de Torta Sin Azúcar Semifrío", d: "$3.600" },
            { n: "Trozo de Mil Hojas Frambuesa Sin Azúcar", d: "$3.900" },
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
            { n: "Tartaleta de Frutas", d: "Base de crema pastelera, cubierta con duraznos, piña y cerezas en almíbar.", precioFijo: "$15.900 / $18.000" },
            { n: "Tartaleta de Frutillas", d: "Base de crema pastelera, cubierta de frutillas. Solo en temporada de frutillas.", precioFijo: "$15.900 / $18.000" },
            { n: "Streusel de Frambuesa (kuchen de frambuesa)", d: "Crema pastelera, frambuesas naturales, cubierto con migas.", precioFijo: "$15.900 / $18.000" },
            { n: "Pie de Limón", d: "Mousse de limón, hecho con jugo de limón natural, cubierto con merengue.", precioFijo: "$15.900 / $18.900", img: "assets/img/pie-limon.jpg" },
            { n: "Pie de Maracuyá", d: "Mousse de maracuyá, cubierto con salsa de maracuyá.", precioFijo: "$15.900 / $18.900" },
            { n: "Kuchen de Manzana", d: "Manzanas verdes, crema pastelera, mermelada de damasco y nueces. Solo en temporada de manzana verde.", precioFijo: "$15.900 / $18.900" },
            { n: "Cheesecake de Berries", d: "Base de queso philadelphia endulzado, cubierto con frambuesas y arándanos, con corona de azúcar rubia, almendras, nueces y canela.", precioFijo: "$16.900 / $20.900", img: "assets/img/cheesecake.jpg" },
            { n: "Kuchen de Nuez", d: "Nueces con leche condensada.", precioFijo: "$16.900 / $20.900", img: "assets/img/kuchen.jpg" },
            { n: "Mix Kaiser", d: "Pie de limón, pie de maracuyá, kuchen de nuez y streusel de frambuesa — para probar de todo un poco. El grande mide 26 cm de diámetro.", precioFijo: "$17.000 / $19.900" },
            { n: "Cheesecake New York (frambuesa o maracuyá)", d: "Cheesecake horneado, cubierto con mermelada de frambuesa o de maracuyá. Tamaño grande. También por trozo ($3.200) o en pote ($5.000).", precioFijo: "$30.000" },
          ],
        },
        {
          nombre: "Trozos de kuchen y pie",
          nota: "Solo venta en el local, no se encargan.",
          items: [
            { n: "Trozo de Cheesecake de Berries, Kuchen de Nuez, Pie de Limón o Pie de Maracuyá", d: "$2.400" },
            { n: "Trozo de Kuchen de Frambuesa, Kuchen de Manzana o Tartaleta de Frutas", d: "$2.300" },
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
          nota: "De viernes a domingo. Por ahora, solo de pino. Solo venta en el local, no se encargan.",
          items: [
            { n: "Empanada de pino (de horno)", d: "Pino de carne picada · $2.900 c/u" },
          ],
        },
        {
          nombre: "Brazos de reina y brownie",
          items: [
            { n: "Brazo de Reina Blanco", d: "Bizcocho de vainilla, relleno con manjar, cubierto con azúcar flor.", precioFijo: "$11.500" },
            { n: "Brazo de Reina Chocolate", d: "Bizcocho de chocolate, relleno con mermelada de guinda y mousse de chocolate.", precioFijo: "$12.000" },
            { n: "Brownie", d: "Cubierto con manjar y merengue. También por trozo ($2.700).", precioFijo: "$22.500" },
          ],
        },
        {
          nombre: "Galletas y dulces",
          items: [
            { n: "Rollos de canela", d: "", precioFijo: "$1.600" },
            { n: "Alfajores", d: "", precioFijo: "$1.100" },
            { n: "Alfajores de maicena", d: "", precioFijo: "$600 c/u" },
            { n: "Muffin", d: "1 unidad, hecha en molde rectangular de queque inglés. De chip de chocolate, frambuesa o arándanos.", precioFijo: "$6.200" },
            { n: "Galletas de limón", d: "Por kilo.", precioFijo: "$12.000 / kilo" },
            { n: "Crumb cookie chip de chocolate", d: "Rellena de ganache de chocolate.", precioFijo: "$1.900" },
            { n: "Crumb cookie red velvet", d: "Con chips de chocolate blanco, rellena de frosting.", precioFijo: "$2.400" },
            { n: "Crumb cookie de zanahoria, canela y nuez", d: "Rellena de frosting.", precioFijo: "$1.900" },
          ],
        },
      ],
    },

    /* ---------- COCTELERÍA ---------- */
    {
      id: "cocteleria",
      titulo: "Coctelería",
      nota: "Valor por 100 unidades, salvo indicado. Pedido mínimo según cada producto.",
      img: "assets/img/canapes.jpg",
      grupos: [
        {
          nombre: "Tapaditos",
          nota: "Pedido mínimo 100 unidades.",
          items: [
            { n: "Filetitos de pollo a la mostaza", d: "Lechuga y palmito.", precioFijo: "$61.000 / 100 u", img: "assets/img/tapaditos.jpg" },
            { n: "Pasta de ave pimentón", d: "", precioFijo: "$42.000 / 100 u" },
            { n: "Churrasco italiano", d: "", precioFijo: "$57.000 / 100 u" },
            { n: "Lomito italiano", d: "", precioFijo: "$54.000 / 100 u" },
            { n: "Jamón de pavo", d: "Jamón de pavo, palmito, lechuga y queso crema.", precioFijo: "$57.000 / 100 u" },
            { n: "Queso chanco", d: "Queso chanco, tomates asados y aceitunas.", precioFijo: "$42.000 / 100 u" },
            { n: "Queso fresco", d: "Queso fresco, lechuga, tomate y ají verde.", precioFijo: "$42.000 / 100 u" },
          ],
        },
        {
          nombre: "Crostinis",
          nota: "Pedido mínimo 50 unidades. Sobre crujiente pan baguette.",
          items: [
            { n: "Salmón ahumado", d: "Salmón ahumado, queso crema y sésamo negro.", precioFijo: "$74.000 / 100 u" },
            { n: "Queso crema y salame", d: "Pasta de queso crema, salame, palmitos y ciboulette.", precioFijo: "$41.000 / 100 u" },
          ],
        },
        {
          nombre: "Bruschettas",
          nota: "Pedido mínimo 50 unidades. Sobre crujiente pan baguette.",
          items: [
            { n: "Ricotta y tomate cherry", d: "Pasta de ricota, queso crema y albahaca y aceitunas, decorada con tomate cherry asado.", precioFijo: "$53.000 / 100 u" },
            { n: "Queso de cabra", d: "Queso de cabra, espinaca y tomate cherry.", precioFijo: "$47.000 / 100 u" },
          ],
        },
        {
          nombre: "Canapés Premium",
          nota: "Pedido mínimo 100 unidades. Surtido de 6 variedades.",
          items: [
            { n: "Canapés Premium surtidos", d: "Palmito, jamón, queso crema y sésamo negro · huevo de codorniz, pepinillo y mayonesa · camarón salteado, queso crema y ciboulette · salame, queso crema y almendra ahumada · espárragos, mayonesa y pimentón · choclito oriental, ciboulette, queso crema y un toque de merquén.", precioFijo: "$40.000 / 100 u", img: "assets/img/canapes.jpg" },
          ],
        },
        {
          nombre: "Brochetas",
          nota: "Pedido mínimo 50 unidades.",
          items: [
            { n: "Carne y chorizo", d: "", precioFijo: "$83.000 / 100 u" },
            { n: "Pollo y cerdo", d: "", precioFijo: "$74.000 / 100 u", img: "assets/img/brochetas.jpg" },
            { n: "Queso chanco y albahaca", d: "Queso chanco, tomate cherry y albahaca.", precioFijo: "$47.000 / 100 u" },
            { n: "Frutas de estación", d: "", precioFijo: "$72.000 / 100 u" },
          ],
        },
        {
          nombre: "Bolitas de Carne",
          nota: "Pedido mínimo 50 unidades. Con salsa de queso para untar.",
          items: [
            { n: "Bolitas de carne", d: "Vacuno y sésamo.", precioFijo: "$89.000 / 100 u" },
          ],
        },
        {
          nombre: "Queso Apanado",
          nota: "Pedido mínimo 50 unidades.",
          items: [
            { n: "Cubitos de queso crema apanados", d: "Con salsa de vino tinto para untar.", precioFijo: "$61.000 / 100 u" },
          ],
        },
        {
          nombre: "Postres Individuales",
          nota: "Pedido mínimo 50 unidades. Postres de 160 cc, en 6 variedades: panacota con coulis de frambuesa · mousse de pie de limón · tiramisú · mousse de maracuyá · manjarate · suspiro limeño. Precio por caja: 6 unidades $16.990 · 12 unidades $29.990.",
          items: [
            { n: "Postres individuales surtidos", d: "Caja de 6 unidades: $16.990 · Caja de 12 unidades: $29.990." },
          ],
        },
        {
          nombre: "Mini Sopaipillas",
          nota: "Pedido mínimo 50 unidades. Con pebre para servir.",
          items: [
            { n: "Mini sopaipillas de cóctel", d: "", precioFijo: "$40.000 / 100 u" },
          ],
        },
        {
          nombre: "Ceviche de Pescado",
          nota: "Pedido mínimo 50 unidades. Montado en pocillos individuales.",
          items: [
            { n: "Ceviche de pescado a la peruana", d: "", precioFijo: "$137.000 / 100 u" },
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
            { n: "Mini hamburguesas caseras", d: "Vacuno, con queso.", precioFijo: "$89.000 / 100 u" },
          ],
        },
        {
          nombre: "Pastelitos de Cóctel",
          nota: "Pedido mínimo 50 unidades. 6 variedades surtidas.",
          items: [
            { n: "Pastelitos de cóctel surtidos", d: "Mini pie de limón · mini pie de maracuyá · mini tartaleta de frutas · mini alfajor · mini cheesecake de berries · mini mil hojas manjar.", precioFijo: "$40.000 / 100 u" },
          ],
        },
        {
          nombre: "Petit Bouche",
          nota: "Pedido mínimo 50 unidades. Tacitas de masa quiche.",
          items: [
            { n: "Camarón y queso", d: "", precioFijo: "$40.000 / 100 u" },
            { n: "Espinacas a la crema", d: "", precioFijo: "$40.000 / 100 u" },
            { n: "Salame y queso", d: "", precioFijo: "$40.000 / 100 u" },
            { n: "Choclo y champiñón", d: "En salsa bechamel.", precioFijo: "$40.000 / 100 u" },
          ],
        },
        {
          nombre: "Mini Pizzas",
          nota: "Pedido mínimo 50 unidades. 2 variedades.",
          items: [
            { n: "Napolitana", d: "Queso, tomate, jamón y aceitunas.", precioFijo: "$45.000 / 100 u", img: "assets/img/pizzetas.jpg" },
            { n: "De verduras", d: "Queso, palmito, espárragos, tomate y aceituna.", precioFijo: "$45.000 / 100 u" },
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
