# El bot de WhatsApp · etapa 1

**Estado: escrito y probado en local. Todavía NO está conectado a Meta ni desplegado.**

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
- [ ] **El horario real de Padre Hurtado.** Mientras siga en placeholder, el bot no lo responde
- [ ] Variables de entorno en Netlify (ver cabecera de `functions/whatsapp.mjs`)
- [ ] Etapa 2: la IA para los tipo C, reusando `@anthropic-ai/sdk` con `claude-haiku-4-5`

## Si cambia el sitio, ojo con esto

`cerebro.mjs` detecta el pedido del carrito por dos frases exactas que escribe
`js/main.js` → `cartToWhatsApp()`: **"Me gustaría encargar:"** y **"Total referencial:"**.
Si ese texto cambia en el sitio, hay que cambiarlo acá o los pedidos dejan de reconocerse.
