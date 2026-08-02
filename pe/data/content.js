/* =============================================================
   Pastelería Kaiser · Casa Matriz Peñaflor
   Fuente única de datos del sitio. Editar SOLO este archivo para
   actualizar textos, precios, contacto, horarios y fotos.
   Cargado como window.KAISER (sin fetch, funciona con file://).
   ============================================================= */
window.KAISER = {

  /* ---- Negocio y contacto ----
     Del catálogo de WhatsApp que pasó Ian (2026-07-27) — no oficial,
     igual confirmar con el dueño. Peñaflor es la CASA MATRIZ de Kaiser
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
    rating: "4,8",
    reviewCount: "135",
    reviewsUrl: "https://www.google.com/search?sca_esv=cd31abf341a22df9&sxsrf=APpeQns7YAm6DEPTJYEzc_NM633pQ5Y61A:1785196180034&q=pasteleria+kaiser&si=APenkKm7iecQ4G6P-TsbSMFKIQtv3EFIqRAFw-i8uEbk55Z-_wdkNF8y89wzLX-v0qH_EOEAtv3DrnQybJz0XowiMQ_Cf1dBpIUNPHIm-lp4B8FQv0wbZqfftXoxefT03UmPpBQ56DeH43YWmmMO4UHg88C2cX5-KA%3D%3D&sa=X&ved=2ahUKEwje66iBhvSVAxUCmZUCHRE6Nx8QrrQLegQIHhAA&biw=1517&bih=703&dpr=0.9&hl=es",
    mapsQuery: "Av. Miraflores 2103, Peñaflor",
  },

  /* ---- Horario real (catálogo de WhatsApp, 2026-07-27) ---- */
  horario: {
    placeholder: false, // real, pero no oficial — confirmar con el dueño si se puede
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
    { n: "4,8★", t: "135 reseñas en Google" },
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

  /* Escalas de precios reales (catálogo de WhatsApp, 2026-07-27).
     La mayoría de las tortas usa "escalaTortas"; Trufa, Choconuez,
     Selva Negra y Pasta de Almendras tienen una escala más cara
     ("escalaTortasPremium") — así viene en su propio catálogo. */
  escalaTortas: {
    "10": 28500, "15": 33500, "25": 40500, "30": 49000,
    "35": 54000, "40": 60000, "50": 67000,
  },
  escalaTortasPremium: {
    "10": 30500, "15": 39500, "25": 46500, "30": 53000,
    "35": 59000, "40": 64000, "50": 72000,
  },
  escalaHelada: { "10": 28500, "15": 33500, "25": 40500 },
  escalaBizcocho: { "10": 28500, "15": 33500, "25": 40500 },

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
     (no oficial, pasado por Ian el 2026-07-27). Fotos todavía
     son de stock — faltan las fotos reales recortadas del catálogo.
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
            { n: "Tres Sabores", d: "Panqueque de chocolate, rellena con manjar crema, crema pastelera, crema chantilly y frambuesas naturales." },
            { n: "Amapolas", d: "Panqueque de vainilla con semillas de amapola, rellena con crema Bariloche (mezcla de chocolate con manjar), mermelada de guinda y crema pastelera." },
            { n: "Plátano", d: "Panqueque de vainilla, capas de mil hojas, rellena con crema pastelera con esencia de Baileys y pasta de almendras, crema chantilly con esencia de plátano, y manjar, cubierto de merengue." },
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
            { n: "Chocopaste", d: "Panqueque de chocolate, rellena con mousse de chocolate, manjar puro y crema pastelera." },
            { n: "Café", d: "Panqueques de chocolate, rellena con mousse de café, mousse de chocolate, crema chantilly y frambuesas naturales." },
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
            { n: "Mil Hojas Frambuesa", d: "Capas de mil hojas, rellena con manjar, crema chantilly y frambuesas naturales, cubierta con merengue.", img: "assets/img/torta-milhojas.jpg" },
            { n: "Mil Hojas Tres Sabores", d: "Capas de mil hojas, rellena con mousse de manjar, crema pastelera, crema chantilly y frambuesas naturales, cubierta con manjar y crema chantilly." },
            { n: "Mil Hojas Manjar", d: "Capas de mil hojas, rellena con manjar puro." },
            { n: "Mil Hojas Manjar Pastelera", d: "Capas de mil hojas, rellena con manjar y crema pastelera." },
            { n: "Mil Hojas de la Casa", d: "Capas de mil hojas, rellena con manjar crema, nueces, mermelada de guinda y crema chantilly, cubierta con mil hojas molida." },
          ],
        },
        {
          nombre: "Tortas heladas",
          precio: "escalaHelada",
          nota: "Disponible hasta 25 personas.",
          items: [
            { n: "Torta Helada de Frambuesa", d: "Discos de merengue, rellena con frambuesas naturales y crema chantilly." },
            { n: "Torta Helada de Lúcuma", d: "Discos de merengue, rellena con mousse de lúcuma." },
            { n: "Torta Helada de Frutillas", d: "Discos de merengue, rellena con frutillas de estación y crema chantilly.", tope: "25" },
          ],
        },
        {
          nombre: "Tortas Light",
          precio: "escalaHelada",
          nota: "Disponible hasta 25 personas.",
          items: [
            { n: "Torta de Naranja Light", d: "Panqueque de vainilla, rellena con salsa de naranja light, cubierta con salsa de naranja light y decorada con chocolate." },
            { n: "Torta de Yogurt Light", d: "Panqueque de vainilla, rellena con mousse de yogurt light, cubierta con mermelada light de frambuesa." },
          ],
        },
        {
          nombre: "Tortas de bizcocho",
          precio: "escalaBizcocho",
          nota: "Disponible hasta 25 personas.",
          items: [
            { n: "Carrot Cake", d: "Bizcocho de zanahorias con nueces, rellena con manjar y frosting de queso philadelphia." },
          ],
        },
      ],
    },

    /* ---------- KUCHEN, PIE Y TARTALETA ---------- */
    {
      id: "kuchen",
      titulo: "Kuchen, Pie y Tartaleta",
      nota: "Chico: 6 a 8 personas · Grande: 10 a 12 personas. PENDIENTE el precio de esta categoría — su catálogo no incluía la lista de valores. Consulta directo por WhatsApp mientras la confirmamos.",
      img: "assets/img/kuchen.jpg",
      grupos: [
        {
          nombre: "Kuchen, pie y tartaleta",
          items: [
            { n: "Pie de Limón", d: "Mousse de limón, hecho con jugo de limón natural, cubierto con merengue. Chico (6 a 8 pers.) o grande (10 a 12 pers.).", img: "assets/img/pie-limon.jpg" },
            { n: "Pie de Maracuyá", d: "Mousse de maracuyá, cubierto con salsa de maracuyá. Chico (6 a 8 pers.) o grande (10 a 12 pers.)." },
            { n: "Kuchen de Nuez", d: "Nueces con leche condensada. Chico (6 a 8 pers.) o grande (10 a 12 pers.).", img: "assets/img/kuchen.jpg" },
            { n: "Kuchen de Manzana", d: "Manzanas verdes, crema pastelera, mermelada de damasco y nueces. Solo en temporada de manzana verde. Chico (6 a 8 pers.) o grande (10 a 12 pers.)." },
            { n: "Streusel de Frambuesa", d: "Crema pastelera, frambuesas naturales, cubierto con migas. Chico (6 a 8 pers.) o grande (10 a 12 pers.)." },
            { n: "Cheesecake de Berries", d: "Base de queso philadelphia endulzado, cubierto con frambuesas y arándanos, con corona de azúcar rubia, almendras, nueces y canela. Chico (6 a 8 pers.) o grande (10 a 12 pers.).", img: "assets/img/cheesecake.jpg" },
            { n: "Tartaleta de Frutillas", d: "Base de crema pastelera, cubierta de frutillas. Solo en temporada de frutillas. Chico (6 a 8 pers.) o grande (10 a 12 pers.)." },
            { n: "Tartaleta de Frutas", d: "Base de crema pastelera, cubierta con duraznos, piña y cerezas en almíbar. Chico (6 a 8 pers.) o grande (10 a 12 pers.)." },
            { n: "Mix Kaiser", d: "Pie de limón, pie de maracuyá, kuchen de nuez y streusel de frambuesa — para probar de todo un poco. Chico (6 a 8 pers.) o grande (10 a 12 pers.)." },
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
    { nombre: "Antonia Paz", estrellas: 5, texto: "Las mejores tortas que he probado. Siempre están frescas y tienen mucha variedad. Suele estar muy lleno y hay que esperar para comprar, sobre todo los fines de semana, pero vale la pena. También venden tortas y pasteles por trozo, así que puedes probar sus creaciones. Las recomiendo totalmente." },
    { nombre: "Linsay Reyes", estrellas: 5, texto: "Todo estaba muy fresco y delicioso. Compramos trozos sueltos de torta: kuchen de nuez, pie de maracuyá, pie de limón y otras piezas deliciosas." },
    { nombre: "Katherine Atenas", estrellas: 5, texto: "Las mejores tortas del sector norte de Santiago. He probado casi todos los sabores de esta pastelería y todos son increíbles 💜" },
  ],
};
