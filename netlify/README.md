# El bot de WhatsApp · etapa 1

**Estado (2026-08-05): desplegado en la rama de pruebas, todavía NO en producción.**

## Dónde vive esto

| | Rama | URL | Qué tiene |
|---|---|---|---|
| Producción | `main` | https://pasteleriakaiser.cl | El sitio de los clientes. **Sin bot.** |
| Pruebas | `bot-pruebas` | https://bot-pruebas--pasteleria-kaiser.netlify.app | El sitio **+ el bot** |

La rama de pruebas existe por una razón concreta: el commit del bot está encima del commit del
FAQ de Padre Hurtado, y el FAQ no se publica hasta que Kaiser mande las fotos. Como en git los
commits son una cadena, subir el bot a `main` arrastraría el FAQ. La rama corta esa cadena.

Cuando lleguen las fotos, `main` se publica con todo junto y esta rama se borra.

### Endpoint del webhook (el que se pega en Meta)

```
https://bot-pruebas--pasteleria-kaiser.netlify.app/.netlify/functions/whatsapp
```

Durante las pruebas, `WA_PHONE_ID_PH` apunta al **número de prueba de Meta**
(`1175099102364099`, el +1 555 653-7667). O sea: el bot contesta como Padre Hurtado, con su
dirección y su horario reales, sin necesidad del número definitivo. Cuando llegue el número de
verdad se cambia esa variable y nada más.

## Probarlo sin Meta, sin cuenta y sin internet

```bash
node netlify/probar-bot.mjs        # las tres sucursales
node netlify/probar-bot.mjs ph     # solo una
```

Muestra 20 mensajes reales de cliente con la respuesta exacta que daría el bot. Si algo suena
a robot o dice algo que no corresponde, **se arregla ahí y no en producción.**

## Qué hay acá

| Archivo | Qué hace |
|---|---|
| `functions/whatsapp.mjs` | El webhook. Verifica la firma de Meta, recibe el mensaje y contesta |
| `lib/datos.mjs` | Lee los `<sucursal>/data/content.js` **del sitio**. No copia ni un dato |
| `lib/cerebro.mjs` | Clasifica en 4 tipos y arma la respuesta |
| `probar-bot.mjs` | El banco de pruebas |

**Una sola función atiende las tres sucursales.** Se distingue por el `phone_number_id` que Meta
manda en cada webhook, así que no hay tres copias del mismo código esperando desincronizarse.

## Los cuatro tipos

| | Qué es | Qué hace el bot |
|---|---|---|
| **A** | Pedido armado en el sitio | Acusa recibo y avisa al encargado |
| **B** | Pregunta de dato fijo (horario, dirección, carta) | **Responde solo** |
| **C** | Fecha, disponibilidad, delivery, encargo especial | **Nunca responde. Escala** |
| **D** | Pide hablar con una persona | Escala de inmediato |

**Todo lo que no calza es C.** El fallback nunca es adivinar.

### Dos candados que no se tocan

1. **Horario no confirmado = no se responde.** Si `content.js` tiene `placeholder: true`, el bot
   escala en vez de decir una hora que nadie verificó. Hoy le aplica a **Padre Hurtado**.
2. **Una señal de compromiso gana siempre.** *"¿A qué hora abren y me hacen una torta para el
   sábado?"* trae una pregunta contestable y una que compromete producción. El bot responde lo que
   sabe **y escala igual**, porque si contesta solo la fácil el cliente cree que le respondieron.

## Lo que falta antes de producción

- [ ] **El handoff.** Con el camino C (número propio del bot) el encargado **no ve** esta
      conversación en su celular. Hoy el escalamiento solo queda en el log. Hay que decidir cómo
      avisarle: **email = $0**, WhatsApp fuera de ventana se paga
- [x] ~~El horario real de Padre Hurtado~~ — confirmado y publicado el 2026-08-05 (commit
      `558defd`). El bot ya lo responde
- [x] ~~Variables de entorno en Netlify~~ — cargadas el 2026-08-05. `WA_APP_SECRET` y
      `WA_TOKEN` como *secret* (Production + Branch deploys); `WA_VERIFY_TOKEN` y
      `WA_PHONE_ID_PH` en All scopes
- [ ] **Token permanente.** El `WA_TOKEN` de hoy es el temporal del Paso 1 y **vence en 24 h**.
      Hay que reemplazarlo por uno de *usuario del sistema* antes de que esto quede en pie solo
- [ ] El handoff (ver arriba)
- [ ] Etapa 2: la IA para los tipo C, reusando `@anthropic-ai/sdk` con `claude-haiku-4-5`

## Trampa de Netlify que ya nos mordió

`lib/datos.mjs` **lee** los `content.js` en tiempo de ejecución, no los importa. Netlify empaqueta
las funciones siguiendo los `import`, así que no tiene forma de saber que esos archivos hacen
falta y **no los sube**. Local funciona perfecto; producción muere con ENOENT.

Por eso `netlify.toml` los declara a mano en `included_files`. **Si algún día se agrega una
sucursal, su `content.js` va en esa lista o el bot se cae solo para esa sucursal.**

## Si cambia el sitio, ojo con esto

`cerebro.mjs` detecta el pedido del carrito por dos frases exactas que escribe
`js/main.js` → `cartToWhatsApp()`: **"Me gustaría encargar:"** y **"Total referencial:"**.
Si ese texto cambia en el sitio, hay que cambiarlo acá o los pedidos dejan de reconocerse.
