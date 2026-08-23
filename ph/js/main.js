/* =============================================================
   Pastelería Kaiser · Padre Hurtado · render e interacciones
   Lee window.KAISER (data/content.js). Sin dependencias.
   ============================================================= */
(function () {
  "use strict";
  var D = window.KAISER;
  if (!D) return;
  var $ = function (s, c) { return (c || document).querySelector(s); };

  /* ---------- Helpers ---------- */
  function clp(n) { return "$" + n.toLocaleString("es-CL"); }

  function waLink(msg) {
    var t = msg || "Hola Pastelería Kaiser, quiero hacer un encargo.";
    return "https://wa.me/" + D.biz.whatsapp + "?text=" + encodeURIComponent(t);
  }

  function scaleObj(name) {
    if (name === "escalaTortas") return D.escalaTortas;
    if (name === "escalaHelada") return D.escalaHelada;
    if (name === "escalaBizcocho") return D.escalaBizcocho;
    if (name === "escalaLight") return D.escalaLight;
    if (name === "escalaHojaLight") return D.escalaHojaLight;
    return null;
  }

  function scaleRange(obj) {
    // Ordena por precio (no por texto de la llave): JS reordena solo las
    // llaves numéricas puras ("25") antes que las con guión ("10-12"),
    // así que el orden de Object.keys() no siempre refleja el tamaño real.
    var keys = Object.keys(obj).sort(function (a, b) { return obj[a] - obj[b]; });
    var min = obj[keys[0]], max = obj[keys[keys.length - 1]];
    var pmin = keys[0], pmax = keys[keys.length - 1];
    return pmin + " a " + pmax + " personas · " + clp(min) + " a " + clp(max);
  }

  /* ---------- Registro de ítems y precios para el carrito ---------- */
  var ITEMS = [];               // catálogo plano: {n, cat, opts:[{label,price}], sel}
  function parseCLP(s) { return parseInt(String(s).replace(/[^\d]/g, ""), 10) || 0; }

  // Deriva las opciones de precio de un ítem (tamaños de torta, chico/grande, o pack de 100 u)
  // Lee el minimo del grupo desde su propia nota ("Pedido minimo 50 unidades.")
  function minUnits(nota) {
    var m = /m[i\u00ed]nimo\s*(\d+)\s*unidad/i.exec(nota || "");
    return m ? parseInt(m[1], 10) : 0;
  }
  // La nota autoriza repartir la centena entre dos variedades?
  function allowsMix(nota) {
    return /50\s*de\s*una/i.test(nota || "");
  }

  function buildOpts(it, scaleName, nota) {
    if (scaleName) {
      var sc = scaleObj(scaleName);
      return Object.keys(sc).map(function (k) { return { label: k + " personas", price: sc[k], units: 0 }; });
    }
    if (it.precioFijo) {
      var ms = it.precioFijo.match(/\$[\d.]+/g) || [];
      var per100 = /100\s*u/i.test(it.precioFijo);
      if (ms.length >= 2) {
        return [{ label: "Chico (6 a 8 pers.)", price: parseCLP(ms[0]), units: 0 },
                { label: "Grande (10 a 12 pers.)", price: parseCLP(ms[1]), units: 0 }];
      }
      if (ms.length === 1) {
        var full = parseCLP(ms[0]);
        if (!per100) return [{ label: "", price: full, units: 0 }];
        // El precio de 50 u es la mitad exacta (confirmado por Nicolas, 31 jul 2026).
        var opts = [];
        if (minUnits(nota) === 50 || allowsMix(nota)) {
          opts.push({ label: "50 unidades", price: Math.round(full / 2), units: 50 });
        }
        opts.push({ label: "100 unidades", price: full, units: 100 });
        return opts;
      }
    }
    return [{ label: "", price: 0, units: 0 }];
  }

  function defaultSel(opts, scaleName) {
    if (scaleName) { var i = opts.map(function (o) { return o.label; }).indexOf("15 personas"); return i < 0 ? 0 : i; }
    var j = opts.map(function (o) { return o.units; }).indexOf(100);
    return j < 0 ? 0 : j;
  }

  // Registra un ítem en el catálogo y devuelve su índice
  function registerItem(it, grupoNombre, scaleName, nota) {
    var opts = buildOpts(it, scaleName, nota);
    if (!opts[0] || !opts[0].price) return -1; // sin precio parseable, no se puede agregar
    return ITEMS.push({ n: it.n, cat: grupoNombre, opts: opts, sel: defaultSel(opts, scaleName), mix: allowsMix(nota) }) - 1;
  }

  /* ---------- Enlaces (WhatsApp, redes) ---------- */
  function wireLinks() {
    var wa = waLink();
    ["topWa", "headWa", "heroWa", "pedidoWa", "ubiWa", "footWa", "waFloat"].forEach(function (id) {
      var el = document.getElementById(id); if (el) el.href = wa;
    });
    var ig = "https://instagram.com/" + D.biz.instagram;
    ["igBtn", "igLink", "footIg"].forEach(function (id) {
      var el = document.getElementById(id); if (el) el.href = ig;
    });
    var tt = document.getElementById("ttLink"); if (tt) tt.href = "https://tiktok.com/@" + D.biz.tiktok;
    var yr = document.getElementById("year"); if (yr) yr.textContent = "2026";
  }

  /* ---------- Franja de confianza ---------- */
  function renderStats() {
    var box = document.getElementById("stats");
    box.innerHTML = D.stats.map(function (s) {
      return '<div class="stat"><b>' + s.n + "</b><span>" + s.t + "</span></div>";
    }).join("");
  }

  /* ---------- Especialidades ---------- */
  function renderEsp() {
    var g = document.getElementById("espGrid");
    g.innerHTML = D.especialidades.map(function (e, i) {
      var lead = (i === 0 || e.destacada) ? " lead" : "";
      return '<article class="esp-card' + lead + '">' +
        zoom(e.img, e.nombre) +
        '<div class="esp-body"><span class="tag">' + e.cat + "</span>" +
        "<h3>" + e.nombre + "</h3><p>" + e.desc + "</p></div></article>";
    }).join("");
  }

  /* ---------- Reseñas ---------- */
  function renderResenas() {
    var section = document.getElementById("resenas");
    var grid = document.getElementById("resenasGrid");
    if (!section || !grid) return;
    if (!D.resenas || !D.resenas.length) { section.style.display = "none"; return; }
    grid.innerHTML = D.resenas.map(function (r) {
      var stars = "★★★★★".slice(0, r.estrellas || 5);
      return '<article class="rev-card"><div class="rev-stars">' + stars + '</div>' +
        '<p class="rev-text">“' + r.texto + '”</p><span class="rev-name">' + r.nombre + '</span></article>';
    }).join("");
    var link = document.getElementById("resenasLink");
    if (link && D.biz.reviewsUrl) link.href = D.biz.reviewsUrl;
  }

  /* ---------- Preguntas frecuentes ----------
     Usa <details>/<summary> nativo: el acordeón funciona sin JavaScript,
     lo lee un lector de pantalla y Google indexa las respuestas aunque
     estén cerradas. Si la sucursal no tiene FAQ cargada, la sección se
     esconde entera en vez de mostrarse vacía. */
  function renderFaq() {
    var section = document.getElementById("faq");
    var list = document.getElementById("faqList");
    if (!section || !list) return;
    if (!D.faq || !D.faq.length) { section.style.display = "none"; return; }
    list.innerHTML = D.faq.map(function (f) {
      return '<details class="faq-item"><summary class="faq-q">' + f.p +
        '</summary><div class="faq-a">' + f.r + "</div></details>";
    }).join("");
  }

  /* ---------- Fotos ampliables ----------
     Cada foto de la carta existe dos veces: la miniatura de 176px que se ve en la
     lista, y una versión grande en carta/grande/ que SOLO se descarga cuando alguien
     hace clic. Ampliar la miniatura se vería borrosa; bajar la grande de entrada
     costaría más de 1 MB que casi nadie mira. */
  function zoom(src, alt) {
    var grande = src.indexOf("assets/img/carta/") === 0
      ? src.replace("assets/img/carta/", "assets/img/carta/grande/")
      : src;
    return '<img src="' + src + '" alt="' + alt + '" loading="lazy" class="ampliable" ' +
      'data-full="' + grande + '" data-pie="' + alt + '" />';
  }

  /* ---------- Carta ---------- */
  function renderItem(it, grupoNombre, scaleName, nota) {
    var idx = registerItem(it, grupoNombre, scaleName, nota);
    var price = it.precioFijo ? '<span class="i-price">' + it.precioFijo + "</span>" : "";
    var tope = it.tope ? '<span class="i-tope">hasta ' + it.tope + " pers.</span>" : "";
    var media = it.img ? '<div class="i-thumb">' + zoom(it.img, it.n) + "</div>" : "";
    var add = idx >= 0 ? '<button class="add-btn" data-idx="' + idx + '" aria-label="Agregar ' + it.n + ' al pedido">+ Agregar</button>' : "";
    var body = '<div class="i-body"><div class="i-top"><span class="i-name">' + it.n + "</span>" + tope +
      '<span class="i-lead"></span>' + price + "</div>" +
      (it.d ? '<p class="i-desc">' + it.d + "</p>" : "") + add + "</div>";
    return '<div class="item' + (it.img ? " has-img" : "") + '">' + media + body + "</div>";
  }

  function renderGrupo(gr) {
    var precio = "";
    if (gr.precio) { var o = scaleObj(gr.precio); if (o) precio = '<span class="g-precio">' + scaleRange(o) + "</span>"; }
    var nota = gr.nota ? '<p class="grupo-nota">' + gr.nota + "</p>" : "";
    // Foto del grupo: se usa cuando la del catálogo es de un surtido y no de una
    // variedad. Colgarla de un ítem diría que ese ítem se ve así, y no es cierto.
    // Va DEBAJO del título, no al lado, para que se lea de quién es la foto.
    var foto = gr.img ? '<div class="g-thumb">' + zoom(gr.img, gr.nombre) + "</div>" : "";
    var items = gr.items.map(function (it) { return renderItem(it, gr.nombre, gr.precio, gr.nota); }).join("");
    return '<div class="grupo"><div class="grupo-head"><h3>' + gr.nombre + "</h3>" + precio + "</div>" +
      foto + nota + '<div class="items-grid">' + items + "</div></div>";
  }

  function renderTamanos() {
    var rows = D.tamanos.map(function (t) {
      var p = D.escalaTortas[t.personas];
      return "<tr><td>" + t.personas + " personas</td><td>" + t.forma + "</td><td>" + t.medida +
        "</td><td>" + (p ? clp(p) : "Consultar") + "</td></tr>";
    }).join("");
    return '<div class="tamanos"><h4>Tamaños y precios de las tortas</h4>' +
      '<div class="tamanos-scroll"><table><thead><tr><th>Personas</th><th>Forma</th><th>Tamaño</th><th>Precio</th></tr></thead>' +
      "<tbody>" + rows + "</tbody></table></div>" +
      '<p class="grupo-nota" style="margin-top:.8rem">Precios de tortas de panqueque, chocolate y mil hojas. Las heladas, las de bizcocho y las sin azúcar tienen su propia escala (hasta 25 personas).</p></div>';
  }

  function renderCarta() {
    var tabs = document.getElementById("cartaTabs");
    var panels = document.getElementById("cartaPanels");
    tabs.innerHTML = D.carta.map(function (sec, i) {
      return '<button class="carta-tab' + (i === 0 ? " active" : "") + '" data-t="' + sec.id + '">' + sec.titulo + "</button>";
    }).join("");

    panels.innerHTML = D.carta.map(function (sec, i) {
      var grupos = sec.grupos.map(renderGrupo).join("");
      if (sec.id === "tortas") grupos += renderTamanos();
      var nota = sec.nota ? '<p class="grupo-nota" style="margin-bottom:1.4rem">' + sec.nota + "</p>" : "";
      return '<div class="carta-panel' + (i === 0 ? " active" : "") + '" id="panel-' + sec.id + '">' +
        nota + grupos + "</div>";
    }).join("");

    tabs.addEventListener("click", function (e) {
      var b = e.target.closest(".carta-tab"); if (!b) return;
      var id = b.getAttribute("data-t");
      tabs.querySelectorAll(".carta-tab").forEach(function (t) { t.classList.toggle("active", t === b); });
      panels.querySelectorAll(".carta-panel").forEach(function (p) {
        p.classList.toggle("active", p.id === "panel-" + id);
      });
      // Al cambiar de categoría, si vamos scrolleados dentro de la carta,
      // reposiciona para que las tabs vuelvan a su altura fija y el panel empiece justo debajo.
      var stickyTop = parseFloat(getComputedStyle(tabs).top) || 0;
      var panelsTop = panels.getBoundingClientRect().top + window.scrollY;
      var target = panelsTop - stickyTop - tabs.offsetHeight;
      if (window.scrollY > target) {
        var reduce = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
        window.scrollTo({ top: target, behavior: reduce ? "auto" : "smooth" });
      }
    });
  }

  /* ---------- Carrito / Pedido ---------- */
  var CART = [];
  var LS_KEY = "kaiserCartPH2";

  function cartLoad() { try { CART = JSON.parse(localStorage.getItem(LS_KEY)) || []; } catch (e) { CART = []; } }
  function cartSave() { try { localStorage.setItem(LS_KEY, JSON.stringify(CART)); } catch (e) {} }

  function cartTotal() { return CART.reduce(function (s, e) { return s + e.opts[e.sel].price * e.qty; }, 0); }
  function cartCount() { return CART.reduce(function (s, e) { return s + e.qty; }, 0); }

  function cartAdd(idx) {
    var it = ITEMS[idx]; if (!it) return;
    var found = null;
    for (var i = 0; i < CART.length; i++) { if (CART[i].n === it.n && CART[i].cat === it.cat) { found = CART[i]; break; } }
    if (found) found.qty++;
    else CART.push({ n: it.n, cat: it.cat, opts: it.opts, sel: it.sel, qty: 1, mix: it.mix });
    cartSave(); cartRender();
  }

  function cartRender() {
    var body = document.getElementById("cartBody");
    var count = cartCount();
    var badge = document.getElementById("cartCount");
    if (badge) { badge.textContent = count; badge.style.display = count ? "grid" : "none"; }
    var send = document.getElementById("cartSend");
    if (send) send.disabled = !count;

    if (!count) {
      body.innerHTML = '<p class="cart-empty">Tu pedido está vacío.<br>Agrega productos desde la carta con el botón <b>+ Agregar</b>.</p>';
    } else {
      body.innerHTML = CART.map(function (e, i) {
        var opt = "";
        if (e.opts.length > 1) {
          opt = '<select class="cl-opt" data-i="' + i + '">' + e.opts.map(function (o, oi) {
            return '<option value="' + oi + '"' + (oi === e.sel ? " selected" : "") + ">" + o.label + " · " + clp(o.price) + "</option>";
          }).join("") + "</select>";
        } else if (e.opts[0].label) {
          opt = '<span class="cl-opt-fixed">' + e.opts[0].label + "</span>";
        }
        return '<div class="cart-line">' +
          '<div class="cl-info"><span class="cl-name">' + e.n + '</span><span class="cl-cat">' + e.cat + "</span>" + opt + "</div>" +
          '<div class="cl-controls"><div class="qty">' +
          '<button data-act="dec" data-i="' + i + '" aria-label="Menos">−</button>' +
          "<span>" + e.qty + "</span>" +
          '<button data-act="inc" data-i="' + i + '" aria-label="Más">+</button></div>' +
          '<span class="cl-price">' + clp(e.opts[e.sel].price * e.qty) + "</span>" +
          '<button class="cl-rm" data-act="rm" data-i="' + i + '" aria-label="Quitar">×</button>' +
          "</div></div>";
      }).join("");
    }
    var errs = centenaErrors();
    var warn = document.getElementById("cartWarn");
    if (warn) {
      if (errs.length) {
        warn.innerHTML = errs.map(function (x) {
          return "En <b>" + x.cat + "</b> llevas <b>" + x.units + " unidades</b>. El pedido va de 100 en 100: " +
                 "puedes elegir 50 de una variedad y 50 de otra, pero el total tiene que ser 100, 200, 300\u2026";
        }).join("<br>");
        warn.style.display = "";
      } else {
        warn.style.display = "none";
      }
    }
    if (send) send.disabled = !CART.length || errs.length > 0;
    var tot = document.getElementById("cartTotal");
    if (tot) tot.textContent = clp(cartTotal());
  }


  // Grupos que permiten 50+50 deben totalizar multiplos de 100
  function centenaErrors() {
    var per = {};
    CART.forEach(function (e) {
      if (!e.mix) return;
      var u = (e.opts[e.sel] && e.opts[e.sel].units) || 0;
      per[e.cat] = (per[e.cat] || 0) + u * e.qty;
    });
    return Object.keys(per)
      .filter(function (c) { return per[c] % 100 !== 0; })
      .map(function (c) { return { cat: c, units: per[c] }; });
  }

  function cartToWhatsApp() {
    if (!CART.length) return;
    if (centenaErrors().length) { cartOpen(true); return; }
    var lines = CART.map(function (e) {
      var o = e.opts[e.sel];
      if (o.units) return "• " + (o.units * e.qty) + " unidades de " + e.n + " · " + clp(o.price * e.qty);
      return "• " + e.qty + "x " + e.n + (o.label ? " (" + o.label + ")" : "") + " · " + clp(o.price) + " c/u";
    });
    var msg = "¡Hola Pastelería Kaiser! Me gustaría encargar:\n\n" + lines.join("\n") +
      "\n\nTotal referencial: " + clp(cartTotal()) +
      "\n\nQuedo atento/a para confirmar disponibilidad, tamaños y fecha. ¡Gracias!";
    window.open(waLink(msg), "_blank");
  }

  function cartOpen(v) {
    var d = document.getElementById("cartDrawer");
    var o = document.getElementById("cartOverlay");
    d.classList.toggle("open", v); o.classList.toggle("show", v);
    document.body.style.overflow = v ? "hidden" : "";
  }

  function wireCart() {
    cartLoad();
    cartRender();

    // Agregar desde la carta (delegación)
    document.addEventListener("click", function (e) {
      var add = e.target.closest(".add-btn"); if (!add) return;
      cartAdd(parseInt(add.getAttribute("data-idx"), 10));
      add.classList.remove("added"); void add.offsetWidth; add.classList.add("added");
      cartOpen(true);
    });

    document.getElementById("cartFab").addEventListener("click", function () { cartOpen(true); });
    document.getElementById("cartOverlay").addEventListener("click", function () { cartOpen(false); });
    document.getElementById("cartClose").addEventListener("click", function () { cartOpen(false); });
    document.getElementById("cartSend").addEventListener("click", cartToWhatsApp);
    document.getElementById("cartClear").addEventListener("click", function () { CART = []; cartSave(); cartRender(); });

    var body = document.getElementById("cartBody");
    body.addEventListener("click", function (e) {
      var b = e.target.closest("[data-act]"); if (!b) return;
      var i = parseInt(b.getAttribute("data-i"), 10);
      var act = b.getAttribute("data-act");
      if (act === "inc") CART[i].qty++;
      else if (act === "dec") { CART[i].qty--; if (CART[i].qty <= 0) CART.splice(i, 1); }
      else if (act === "rm") CART.splice(i, 1);
      cartSave(); cartRender();
    });
    body.addEventListener("change", function (e) {
      var s = e.target.closest(".cl-opt"); if (!s) return;
      var i = parseInt(s.getAttribute("data-i"), 10);
      CART[i].sel = parseInt(s.value, 10);
      cartSave(); cartRender();
    });
  }

  /* ---------- Horario / Abierto ahora ---------- */
  function renderHorario() {
    var ubi = document.getElementById("ubiHorario");
    if (ubi) ubi.innerHTML = D.horario.resumen.map(function (r) {
      return r.etiqueta + ": " + r.valor;
    }).join("<br>");

    var now = new Date();
    var day = now.getDay();
    var h = D.horario.dias[day];
    var dot = $("#openState .dot");
    var txt = document.getElementById("openText");
    if (!h) { dot.className = "dot closed"; txt.textContent = "Cerrado hoy"; return; }
    var cur = now.getHours() * 60 + now.getMinutes();
    function toMin(s) { var p = s.split(":"); return (+p[0]) * 60 + (+p[1]); }
    var abre = toMin(h.abre), cierra = toMin(h.cierra);
    if (cur >= abre && cur < cierra) {
      dot.className = "dot open"; txt.textContent = "Abierto ahora · cierra " + h.cierra;
    } else {
      dot.className = "dot closed";
      txt.textContent = cur < abre ? "Cerrado · abre " + h.abre : "Cerrado por hoy";
    }
  }

  /* ---------- Header, nav móvil ---------- */
  function wireHeader() {
    var header = document.getElementById("header");
    window.addEventListener("scroll", function () {
      header.classList.toggle("scrolled", window.scrollY > 20);
    }, { passive: true });

    var hamb = document.getElementById("hamb");
    var nav = document.getElementById("nav");
    hamb.addEventListener("click", function () { nav.classList.toggle("show"); });
    nav.addEventListener("click", function (e) {
      if (e.target.tagName === "A") nav.classList.remove("show");
    });
  }

  /* ---------- Reveal on scroll ---------- */
  function wireReveal() {
    var els = document.querySelectorAll(".reveal");
    if (!("IntersectionObserver" in window)) {
      els.forEach(function (el) { el.classList.add("is-visible"); }); return;
    }
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (en.isIntersecting) { en.target.classList.add("is-visible"); io.unobserve(en.target); }
      });
    }, { threshold: 0.12 });
    els.forEach(function (el) { io.observe(el); });
  }

  /* ---------- Visor de fotos ----------
     Un solo listener en el documento en vez de uno por foto: las fotos se dibujan
     después (renderCarta) y se vuelven a dibujar al cambiar de pestaña, así que
     engancharlas una por una dejaría muertas las que aparezcan más tarde. */
  function wireZoom() {
    var visor = document.createElement("div");
    visor.className = "visor";
    visor.setAttribute("role", "dialog");
    visor.setAttribute("aria-modal", "true");
    visor.innerHTML = '<button class="visor-x" aria-label="Cerrar">&times;</button>' +
      '<figure><img alt="" /><figcaption></figcaption></figure>';
    // Todo el visor se estiliza acá y NO en styles.css, a propósito. Es un elemento
    // que existe solo si corre el JS, así que el JS se hace cargo entero de cómo se
    // ve. Repartirlo entre los dos archivos ya nos costó dos rondas: bastaba con que
    // el navegador entregara una hoja de estilos vieja para que el visor se desarmara
    // (las fotos caían al pie de la página y la X quedaba suelta al medio).
    // styles.css se queda solo con el foco de teclado y la animación, que si faltan
    // no rompen nada.
    var css = {
      visor: "position:fixed;inset:0;z-index:200;display:none;align-items:center;" +
        "justify-content:center;padding:4vmin;background:rgba(30,8,15,.88)",
      fig: "margin:0;max-width:min(92vw,900px);text-align:center",
      img: "max-width:100%;max-height:78vh;width:auto;height:auto;display:block;" +
        "margin:0 auto;border-radius:16px;box-shadow:0 24px 60px rgba(0,0,0,.5)",
      pie: "margin-top:.9rem;color:#fff;font-size:1.15rem",
      x: "position:fixed;top:1rem;right:1.2rem;z-index:1;width:44px;height:44px;" +
        "border:0;border-radius:50%;cursor:pointer;background:rgba(255,255,255,.18);" +
        "color:#fff;font-size:1.8rem;line-height:1;display:grid;place-items:center;padding:0",
    };
    visor.style.cssText = css.visor;
    var boton = visor.querySelector(".visor-x");
    var figura = visor.querySelector("figure");
    var img = visor.querySelector("img");
    var pie = visor.querySelector("figcaption");
    boton.style.cssText = css.x;
    figura.style.cssText = css.fig;
    img.style.cssText = css.img;
    pie.style.cssText = css.pie;
    document.body.appendChild(visor);
    var previo = null;

    function abrir(el) {
      img.src = el.getAttribute("data-full") || el.src;
      img.alt = el.alt || "";
      pie.textContent = el.getAttribute("data-pie") || el.alt || "";
      visor.style.display = "flex";
      visor.classList.add("open");
      // Al esconder la barra de desplazamiento la página se ensancha de golpe y
      // todo salta a la derecha. Se compensa con el ancho exacto que desaparece.
      var barra = window.innerWidth - document.documentElement.clientWidth;
      document.body.style.overflow = "hidden";
      if (barra > 0) document.body.style.paddingRight = barra + "px";
      previo = el;
      // preventScroll o el navegador arrastra la página hasta el botón
      visor.querySelector(".visor-x").focus({ preventScroll: true });
    }
    function cerrar() {
      visor.style.display = "none";
      visor.classList.remove("open");
      document.body.style.overflow = "";
      document.body.style.paddingRight = "";
      img.src = "";                       // suelta la imagen grande de memoria
      if (previo) { previo.focus({ preventScroll: true }); previo = null; }
    }

    document.addEventListener("click", function (e) {
      if (!e.target.closest) return;
      // En las tarjetas destacadas la foto está debajo del degradado y del texto,
      // así que se acepta el clic en cualquier parte de la tarjeta.
      var tarjeta = e.target.closest(".esp-card");
      var el = e.target.closest("img.ampliable") ||
        (tarjeta && tarjeta.querySelector("img.ampliable"));
      if (el) { e.preventDefault(); abrir(el); return; }
      if (visor.classList.contains("open") && !e.target.closest("figure")) cerrar();
    });
    // El teclado tiene que servir igual que el mouse: hay gente que no usa mouse.
    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape" && visor.classList.contains("open")) return cerrar();
      if ((e.key === "Enter" || e.key === " ") && document.activeElement &&
          document.activeElement.classList.contains("ampliable")) {
        e.preventDefault(); abrir(document.activeElement);
      }
    });
  }

  /* ---------- Init ---------- */
  wireLinks();
  renderStats();
  renderEsp();
  renderResenas();
  renderFaq();
  renderCarta();
  wireCart();
  renderHorario();
  wireHeader();
  wireReveal();
  wireZoom();
})();
