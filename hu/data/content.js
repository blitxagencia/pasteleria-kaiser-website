/* =============================================================
   Pastelería Kaiser · Sucursal Huechuraba
   Fuente única de datos del sitio. Editar SOLO este archivo para
   actualizar textos, precios, contacto, horarios y fotos.
   Cargado como window.KAISER (sin fetch, funciona con file://).
   ============================================================= */
window.KAISER = {

  /* ---- Negocio y contacto ----
     Dirección, horario, email y web: reales (catálogo de WhatsApp
     de la sucursal). Confirmar con la sucursal antes de cambiarlos. */
  biz: {
    nombre: "Pastelería Kaiser",
    sucursal: "Sucursal Huechuraba",
    lema: "Sabor casero desde 2005",
    direccion: "Av. Pedro Fontova 6898, Huechuraba",
    ciudad: "Huechuraba, Región Metropolitana",
    email: "Dkaiserhuechuraba@gmail.com",
    whatsapp: "56976235401",
    whatsappDisplay: "+56 9 7623 5401",
    instagram: "pendiente_hu",      // PENDIENTE: confirmar si tiene redes propias
    tiktok: "pendiente_hu",
    facebook: "pendiente_hu",
    web: "www.pasteleriakaiser.cl",
    rating: "4,8",
    reviewCount: "135",
    reviewsUrl: "https://maps.app.goo.gl/PYM81qZuZa6xVUjX9",
    mapsQuery: "Av. Pedro Fontova 6898, Huechuraba",
  },

  /* ---- Horario real (catálogo de WhatsApp, 2026-07-27) ----
     Formato 24h. day: 0=domingo .. 6=sábado. Cerrado = null. */
  horario: {
    placeholder: false,
    dias: {
      1: null,                             // Lun: cerrado
      2: { abre: "12:00", cierra: "19:30" }, // Mar
      3: { abre: "12:00", cierra: "19:30" }, // Mié
      4: { abre: "12:00", cierra: "19:30" }, // Jue
      5: { abre: "12:00", cierra: "19:30" }, // Vie
      6: { abre: "12:00", cierra: "19:30" }, // Sáb
      0: { abre: "12:00", cierra: "19:00" }, // Dom
    },
    resumen: [
      { etiqueta: "Lunes", valor: "Cerrado" },
      { etiqueta: "Martes a sábado", valor: "12:00 – 19:30" },
      { etiqueta: "Domingo", valor: "12:00 – 19:00" },
    ],
  },

  /* ---- Franja de confianza (stats reales) ---- */
  stats: [
    { n: "4,8★", t: "135 reseñas en Google" },
    { n: "2005", t: "Sabor casero desde" },
    { n: "55+", t: "Tortas, kuchen y cóctel" },
    { n: "100%", t: "Hecho en casa" },
  ],

  /* ---- Tamaños de las tortas (lista de precios real, válida sep. 2025 – abr. 2026) ---- */
  tamanos: [
    { personas: "10-12", forma: "Redonda", medida: "18 cm diámetro" },
    { personas: "15-20", forma: "Redonda", medida: "22 cm diámetro" },
    { personas: "25", forma: "Redonda", medida: "26 cm diámetro" },
    { personas: "30", forma: "Cuadrada", medida: "26 x 26 cm" },
    { personas: "35", forma: "Redonda", medida: "30 cm diámetro" },
    { personas: "40", forma: "Rectangular", medida: "26 x 37 cm" },
    { personas: "50", forma: "Rectangular", medida: "30 x 45 cm" },
  ],

  /* Escala de precios real de tortas (única para todos los tipos: panqueque,
     chocolate, mil hojas, heladas y bizcocho — así viene en la lista de precios).
     Lista nueva desde el martes 27-oct-2026 (comunicado de don Víctor, 24-oct:
     "en Huechuraba los precios son por tamaño y no por sabor"). */
  escalaTortas: {
    "10-12": 31500, "15-20": 38000, "25": 47500, "30": 53000,
    "35": 58000, "40": 63000, "50": 69000,
  },

  /* La torta baja en azúcar tiene su propio precio y solo dos tamaños (lista
     del 27-oct: "10 per" y "25 per"; la de 10 es la misma 10-12 de las demás). */
  escalaBajaAzucar: { "10-12": 39000, "25": 59000 },

  /* ---- Especialidades destacadas (selección editorial) ---- */
  especialidades: [
    {
      nombre: "Locura Kaiser",
      cat: "Torta de panqueque",
      desc: "Discos de merengue, panqueque de chocolate, discos de mil hoja, con crema de lúcuma, manjar y crema chantilly con mermelada de frambuesa.",
      img: "assets/img/torta-panqueque.jpg",
      destacada: true,
    },
    {
      nombre: "Panqueque Trufa",
      cat: "Torta de chocolate",
      desc: "Panqueque de chocolate con trufa, manjar y licor en la trufa (esencia de whisky y un toque de aguardiente).",
      img: "assets/img/torta-chocolate.jpg",
    },
    {
      nombre: "Cheesecake de Frutos Rojos",
      cat: "Kuchen y pie",
      desc: "Queso Philadelphia dulce con miga de azúcar rubia, canela, nueces y almendras molidas, arándanos y frambuesa.",
      img: "assets/img/cheesecake.jpg",
    },
    {
      nombre: "Mil Hoja de la Casa",
      cat: "Torta mil hojas",
      desc: "Mil hoja con relleno de crema chantilly con mermelada de guinda, y manjar mezclado con crema chantilly y nueces.",
      img: "assets/img/torta-milhojas.jpg",
    },
  ],

  /* =========================================================
     CARTA COMPLETA · organizada por secciones y categorías
     Fuente: catálogo de WhatsApp de la sucursal (2026-07-27).
     Las fotos por producto se van reemplazando a medida que llegan
     las del catálogo de la sucursal.
     ========================================================= */
  carta: [

    /* ---------- TORTAS ---------- */
    {
      id: "tortas",
      titulo: "Tortas",
      nota: "Precio según cantidad de personas, el mismo para todos los sabores. Consulta tamaños en la tabla más abajo. También disponible por trozo: torta $4.000 · pie o kuchen $3.200 · Cheesecake New York $3.500.",
      img: "assets/img/torta-panqueque.jpg",
      grupos: [
        {
          nombre: "Tortas de panqueque",
          precio: "escalaTortas",
          items: [
            { n: "Amapola", d: "Panqueque con semillas de amapola, crema pastelera, crema bariloche (chocolate con manjar) y mermelada de guinda." },
            { n: "Almendra", d: "Panqueque con trocitos de almendras, crema pastelera con esencia de Baileys, manjar y crema chantilly con esencia de plátano." },
            { n: "Merengue Maracuyá", d: "Panqueque de chocolate y vainilla, discos de merengue y mousse de maracuyá." },
            { n: "Naranja Manjar", d: "Panqueque de vainilla con salsa de naranja y manjar." },
            { n: "Lúcuma Manjar Nuez", d: "Panqueque de vainilla con crema de lúcuma y manjar crema con nueces." },
            { n: "Torta Pie Limón", d: "Panqueque de vainilla y mousse de pie limón." },
            { n: "3 Sabores", d: "Panqueque de chocolate con crema pastelera, manjar crema y crema chantilly con frambuesa natural." },
            { n: "Frutas", d: "Panqueque de vainilla con crema chantilly acompañada de piña, durazno y cereza." },
            { n: "Merengue Lúcuma", d: "Panqueque de vainilla, discos de merengue con crema de lúcuma." },
            { n: "4 Leches Amapola", d: "Panqueque con amapola, manjar crema y crema pastelera, con un ligero remojo de leche condensada y leche evaporada." },
            { n: "Manjar Nuez", d: "Panqueque de vainilla con manjar crema con nueces." },
            { n: "Lúcuma Manjar", d: "Panqueque de vainilla con crema de lúcuma y manjar puro." },
            { n: "Locura Kaiser", d: "Discos de merengue, panqueque de chocolate, discos de mil hoja, con crema de lúcuma, manjar y crema chantilly con mermelada de frambuesa.", img: "assets/img/torta-panqueque.jpg" },
          ],
        },
        {
          nombre: "Tortas de chocolate",
          precio: "escalaTortas",
          items: [
            { n: "Choconuez", d: "Panqueque con trocitos de nueces, mousse de chocolate, mousse de manjar y mermelada de frutilla." },
            { n: "Trufa", d: "Panqueque de chocolate con trufa, manjar y licor en la trufa (esencia de whisky y un toque de aguardiente).", img: "assets/img/torta-chocolate.jpg" },
            { n: "Menta", d: "Panqueque de chocolate con mousse de chocolate, crema de menta, crema de capuchino y chips de chocolate." },
            { n: "Chocopaste", d: "Panqueque de chocolate con manjar, crema pastelera y mousse de chocolate." },
            { n: "Chocolate", d: "Panqueque de chocolate con mousse de chocolate y mermelada de frambuesa." },
            { n: "Selva Negra", d: "Panqueque de chocolate, mousse de chocolate, mermelada de frambuesa y crema chantilly con cerezas." },
            { n: "Café", d: "Panqueque de chocolate, crema de café, mermelada de frambuesa, mousse de chocolate con crema chantilly con frambuesa natural." },
            { n: "Diplomática", d: "Panqueque de chocolate, crema chantilly y crema pastelera mezclada, y mermelada de frambuesa." },
            { n: "Pasta Almendra", d: "Panqueque de chocolate con mousse de chocolate, pasta de almendra y mermelada de naranja." },
            { n: "Capuchino", d: "Panqueque de chocolate con mousse de chocolate y crema de capuchino con chips de chocolate." },
          ],
        },
        {
          nombre: "Tortas de mil hojas",
          precio: "escalaTortas",
          items: [
            { n: "Mil Hoja Frambuesa", d: "Relleno de crema chantilly con frambuesa natural y manjar puro.", img: "assets/img/torta-milhojas.jpg" },
            { n: "Mil Hoja Manjar", d: "Relleno de manjar." },
            { n: "Mil Hoja de la Casa", d: "Relleno de crema chantilly con mermelada de guinda, y manjar mezclado con crema chantilly y nueces." },
            { n: "Mil Hoja Manjar Pastelera", d: "Relleno de manjar y crema pastelera." },
            { n: "Mil Hoja 3 Sabores", d: "Manjar crema, crema pastelera y crema chantilly con frambuesa natural." },
          ],
        },
        {
          nombre: "Tortas heladas",
          precio: "escalaTortas",
          items: [
            { n: "Helada Frambuesa", d: "Discos de merengue con crema chantilly y frambuesa natural." },
            { n: "Helada Lúcuma", d: "Discos de merengue con crema chantilly y crema de lúcuma." },
            { n: "Yogur Frambuesa Light", d: "Bizcocho delgado con yogurt light de frambuesa encima, crema chantilly y mermelada de frambuesa light." },
          ],
        },
        {
          nombre: "Tortas de bizcocho",
          precio: "escalaTortas",
          items: [
            { n: "Bizcocho Zanahoria", d: "Bizcocho de zanahoria con nueces, con frosting de queso Philadelphia y manjar.", tope: "25" },
            { n: "Bizcocho Chocolate", d: "Bizcocho de chocolate con mousse de chocolate y manjar." },
          ],
        },
        {
          nombre: "Torta baja en azúcar",
          precio: "escalaBajaAzucar",
          nota: "La única torta baja en azúcar de la sucursal. Solo en 10-12 y 25 personas.",
          items: [
            { n: "Torta baja en azúcar", d: "De mil hoja, rellena con crema chantilly con frambuesa natural y manjar sin azúcar (endulzado 99% con alulosa y 1% con sucralosa)." },
          ],
        },
      ],
    },

    /* ---------- KUCHEN, PIE Y TARTALETA ---------- */
    {
      id: "kuchen",
      titulo: "Kuchen, Pie y Tartaleta",
      nota: "$19.500 cada uno, salvo indicado. Pie Limón, Pie de Maracuyá y Kuchen de Nuez vienen en dos tamaños: chico (6 a 8 trozos aprox.) $19.500 y grande (10 a 12 trozos aprox.) $26.000. Cheesecake de Frutos Rojos: chico (8 trozos) $21.000 y grande (10 a 12 trozos) $27.000. Mix Kaiser: $20.000. Cheesecake New York: $36.000. Por trozo: pie o kuchen $3.200 · Cheesecake New York $3.500.",
      img: "assets/img/kuchen.jpg",
      grupos: [
        {
          nombre: "Kuchen, pie y tartaleta",
          items: [
            { n: "Pie Limón", d: "Mousse de pie limón (leche condensada y crema chantilly) con jugo de limón natural y merengue.", precioFijo: "$19.500 / $26.000", img: "assets/img/pie-limon.jpg" },
            { n: "Pie de Maracuyá", d: "Mousse de maracuyá (leche condensada y crema chantilly) con pulpa natural.", precioFijo: "$19.500 / $26.000" },
            { n: "Streusel de Frambuesa", d: "Crema pastelera y frambuesa cocida y endulzada, con masa de streusel.", precioFijo: "$19.500" },
            { n: "Streusel de Arándanos", d: "Crema pastelera, arándanos cocidos y endulzados, con masa de streusel.", precioFijo: "$19.500" },
            { n: "Kuchen de Manzana", d: "Toque de crema pastelera, manzana verde cocida al dente, nueces y tamizado con mermelada de damasco.", precioFijo: "$19.500" },
            { n: "Kuchen de Nuez", d: "Leche condensada con nueces.", precioFijo: "$19.500 / $26.000", img: "assets/img/kuchen.jpg" },
            { n: "Tartaleta de Frutas", d: "Crema pastelera con piña, durazno y cereza.", precioFijo: "$19.500" },
            { n: "Tartaleta de Frutillas", d: "Crema pastelera con frutillas.", precioFijo: "$19.500" },
            { n: "Tartaleta de Arándanos", d: "Crema pastelera con arándanos.", precioFijo: "$19.500" },
            { n: "Cheesecake de Frutos Rojos", d: "Queso Philadelphia dulce con miga de azúcar rubia, canela, nueces y almendras molidas, arándanos y frambuesa.", precioFijo: "$21.000 / $27.000", chico: "8 trozos", img: "assets/img/cheesecake.jpg" },
            { n: "Cheesecake New York", d: "Un solo tamaño, de 10 trozos aprox. También por trozo, a $3.500.", precioFijo: "$36.000" },
            { n: "Mix Kaiser", d: "Trozo de pie limón, pie maracuyá, kuchen de nuez y streusel de frambuesa — para probar de todo un poco.", precioFijo: "$20.000" },
          ],
        },
      ],
    },

    /* ---------- COCTELERÍA ---------- */
    {
      id: "cocteleria",
      titulo: "Coctelería",
      nota: "Valor por 100 unidades. Pedido mínimo según cada producto (indicado abajo).",
      img: "assets/img/canapes.jpg",
      grupos: [
        {
          nombre: "Canapés Premium",
          nota: "Surtido de 6 variedades, o solo de camarón, sobre pan de miga blanco. Se piden de 100 en 100.",
          items: [
            { n: "Canapés Premium surtidos", d: "Palmito, jamón, queso crema y sésamo negro · huevitos de codorniz con pepinillo y mayonesa · camarón salteado, queso crema y ciboulette · salame, queso crema y almendra ahumada · espárragos, mayonesa y pimentón · choclito oriental, ciboulette, queso crema y mayonesa con toque de merquén.", precioFijo: "$48.000 / 100 u", img: "assets/img/canapes.jpg" },
            { n: "Canapés solo de camarón", d: "Todos de camarón salteado, queso crema y ciboulette, en vez del surtido.", precioFijo: "$55.000 / 100 u" },
          ],
        },
        {
          nombre: "Tapaditos Fríos",
          nota: "Se piden de 100 en 100.",
          items: [
            { n: "Filetitos de pollo a la mostaza", d: "Montado en lechuga y palmito o pepinillo.", precioFijo: "$63.000 / 100 u", img: "assets/img/tapaditos.jpg" },
            { n: "Pasta casera de ave y pimiento", d: "", precioFijo: "$46.000 / 100 u" },
            { n: "Pasta de ave palta", d: "", precioFijo: "$56.000 / 100 u" },
            { n: "Churrasco italiano", d: "", precioFijo: "$64.000 / 100 u" },
            { n: "Lomito italiano", d: "", precioFijo: "$64.000 / 100 u" },
            { n: "Jamón de pavo y palmito", d: "Lechuga, jamón de pavo y palmito, con un toque de queso crema.", precioFijo: "$59.000 / 100 u" },
          ],
        },
        {
          nombre: "Tapaditos Vegetarianos",
          nota: "Se piden de 100 en 100.",
          items: [
            { n: "Queso chanco", d: "Queso chanco con tomate asado y aceitunas.", precioFijo: "$50.000 / 100 u" },
            { n: "Queso fresco", d: "Lechuga, queso fresco, tomate y ají verde.", precioFijo: "$49.000 / 100 u" },
          ],
        },
        {
          nombre: "Mini Pastelitos Cóctel",
          nota: "Pedido mínimo 50 unidades. 5 variedades surtidas.",
          items: [
            { n: "Mini pastelitos surtidos", d: "Mini pie limón · mini pie maracuyá · mini alfajores · mini cheesecake de berries · mini mil hoja manjar.", precioFijo: "$48.000 / 100 u" },
          ],
        },
        {
          nombre: "Petit Bouche",
          nota: "Pedido mínimo 50 unidades. Tacitas de masa rellenas. En un pedido de 100 unidades se pueden elegir 2 variedades y se cobra proporcional a lo que se pide de cada una.",
          items: [
            { n: "Camarón y queso", d: "", precioFijo: "$50.000 / 100 u" },
            { n: "Espinacas a la crema", d: "", precioFijo: "$43.000 / 100 u" },
            { n: "Salame y queso", d: "Salsa de queso, salame y ciboulette.", precioFijo: "$43.000 / 100 u" },
            { n: "Choclo y champiñón", d: "Choclo y champiñón en salsa bechamel.", precioFijo: "$43.000 / 100 u" },
          ],
        },
        {
          nombre: "Mini Pizzas",
          nota: "Pedido mínimo 50 unidades. 2 variedades.",
          items: [
            { n: "Napolitana", d: "Queso, tomate, jamón y aceitunas.", precioFijo: "$54.000 / 100 u", img: "assets/img/pizzetas.jpg" },
            { n: "De verduras", d: "Queso, palmitos, espárragos, tomate y aceituna.", precioFijo: "$54.000 / 100 u" },
          ],
        },
        {
          nombre: "Mini Sopaipillas",
          nota: "Pedido mínimo 50 unidades. Con pebre en pocillos.",
          items: [
            { n: "Mini sopaipillas de cóctel", d: "", precioFijo: "$45.000 / 100 u" },
          ],
        },
        {
          nombre: "Mini Hamburguesas",
          nota: "Pedido mínimo 100 unidades.",
          items: [
            { n: "Mini hamburguesas caseras", d: "", precioFijo: "$89.000 / 100 u" },
          ],
        },
        {
          nombre: "Crostinis",
          nota: "Pedido mínimo 50 unidades. Sobre pan baguette.",
          items: [
            { n: "Salmón ahumado", d: "Montado en queso crema, salmón ahumado con sésamo negro.", precioFijo: "$76.000 / 100 u" },
            { n: "Queso crema y salame", d: "Montado en pasta casera de queso crema, salame, palmito y ciboulette.", precioFijo: "$50.000 / 100 u" },
          ],
        },
        {
          nombre: "Bolitas de Carne",
          nota: "Pedido mínimo 50 unidades. Con salsa de queso para untar.",
          items: [
            { n: "Bolitas de carne", d: "", precioFijo: "$89.000 / 100 u" },
          ],
        },
        {
          nombre: "Bruschetas",
          nota: "Pedido mínimo 50 unidades. Sobre pan baguette tostado al oliva.",
          items: [
            { n: "Ricotta y tomate cherry", d: "Suave pasta de ricotta con un toque de queso crema, albahaca y aceitunas picadas, decorado con tomate cherry asado.", precioFijo: "$61.000 / 100 u" },
            { n: "Queso de cabra", d: "Queso de cabra, hojas de espinacas y tomate cherry. Solo de temporada: consulta disponibilidad.", precioFijo: "$68.000 / 100 u" },
          ],
        },
        {
          nombre: "Queso Crema Apanado",
          nota: "Pedido mínimo 50 unidades.",
          items: [
            { n: "Cubitos de queso crema apanado", d: "Con salsa de vino tinto para untar, en pocillo.", precioFijo: "$61.000 / 100 u" },
          ],
        },
        {
          nombre: "Brochetas de Frutas",
          nota: "Pedido mínimo 50 unidades. Frutas de estación.",
          items: [
            { n: "Brochetas de frutas", d: "", precioFijo: "$72.000 / 100 u", img: "assets/img/brochetas.jpg" },
          ],
        },
        {
          nombre: "Brochetas",
          nota: "Pedido mínimo 50 unidades.",
          items: [
            { n: "Carne con chorrillo", d: "", precioFijo: "$83.000 / 100 u" },
            { n: "Pollo con pulpa de cerdo", d: "", precioFijo: "$74.000 / 100 u" },
          ],
        },
        {
          nombre: "Brochetas de Verduras",
          nota: "Pedido mínimo 50 unidades. Queso sujeto a estación.",
          items: [
            { n: "Tomate cherry, queso de cabra y albahaca", d: "", precioFijo: "$47.000 / 100 u" },
          ],
        },
      ],
    },
  ],

  /* ---- Reseñas destacadas (reales, de Google — traducidas al español) ----
     Mismas 3 en las 3 sucursales: Google no diferencia el listado por sucursal. */
  resenas: [
    { nombre: "Sofia García", estrellas: 5, texto: "Muy ricas tortas! Si van a comprar uff no se arrepentirán 10/10." },
    { nombre: "Katherine Atenas", estrellas: 5, texto: "Las mejores tortas del sector norte de Santiago. He probado casi todo los sabores de torta de esta pastelería y todas son maravillosas 💜" },
    { nombre: "Valeska Vargas", estrellas: 5, texto: "Las mejores tortas que e probado son esquisitas" },
  ],
};
