const { createBot, createProvider, createFlow, addKeyword } = require('@bot-whatsapp/bot')

const QRPortalWeb = require('@bot-whatsapp/portal')
const BaileysProvider = require('@bot-whatsapp/provider/baileys')
const MockAdapter = require('@bot-whatsapp/database/mock')

// Flujos de conversación
const flowQuilpue = addKeyword(['1', 'Quilpué', 'Villa Alemana', 'quilpue', 'villa alemana', 'viña del mar'])
    .addAnswer('En Quilpué, Villa Alemana y Viña del Mar tenemos 4 opciones a la fecha')
    .addAnswer('Desayuno A Domicilio SKU IOIA-17 - https://mimandote.cl/cl/detalle-producto/36', { media: 'https://mimandote.cl/newmimandote/admin/uploads/qlp001.jpg' })
    .addAnswer('Desayuno A Domicilio SKU IOIA-16 - https://mimandote.cl/cl/detalle-producto/35', { media: 'https://mimandote.cl/newmimandote/admin/uploads/qlp001.jpg' })
    .addAnswer('Desayuno A Domicilio SKU IOIA-15 - https://mimandote.cl/cl/detalle-producto/34', { media: 'https://mimandote.cl/newmimandote/admin/uploads/qlp002.jpg' })
    .addAnswer('Desayuno A Domicilio SKU IOIA-14 - https://mimandote.cl/cl/detalle-producto/33', { media: 'https://mimandote.cl/newmimandote/admin/uploads/qlp003.jpg' })
    .addAnswer('Si deseas volver al inicio de la conversación, simplemente escribe *Inicio* y volverás. 🔄');

const flowSerena = addKeyword(['2', 'Serena', 'La Serena', 'la serena', 'coquimbo'])
    .addAnswer('En La Serena y Coquimbo Romina es nuestro proveedor. Tenemos las siguientes opciones')
    .addAnswer('Desayuno Gourmet Sorpresa (SER) IOIA-001 - https://mimandote.cl/cl/detalle-producto/44', { media: 'https://mimandote.cl/newmimandote/admin/uploads/SKU-010.jpg' })
    .addAnswer('Desayuno Gourmet Sorpresa (SER) IOIA-002 - https://mimandote.cl/cl/detalle-producto/45', { media: 'https://mimandote.cl/newmimandote/admin/uploads/SKU-006.jpg' })
    .addAnswer('Si deseas volver al inicio de la conversación, simplemente escribe *Inicio* y volverás. 🔄');

const flowDesa = addKeyword(['desa', 'desayuno', 'domicilio' , 'desayunos'])
    .addAnswer(
    [
        'Escribe el numero o el nombre de la comuna en la cual quieres ver desayunos (solamente de las que se muestran a continuación)',
        '\n*1* Quilpué, Villa Alemana, Viña del mar',
        '\n*2* La Serena, Coquimbo',
    ],
    null,
    null,
    [flowQuilpue, flowSerena]
)

const flowTuto = addKeyword(['tutorial', 'tuto']).addAnswer(
    [
        '🙌 Aquí encontras un ejemplo rapido',
        'https://bot-whatsapp.netlify.app/docs/example/',
        '\n*2* Para siguiente paso.',
    ],
    null,
    null
)

const flowProveedor = addKeyword(['Proveedor', 'proveedor'])

.addAnswer('🚀 ¡Únete a nuestro equipo de proveedores en Mimándote! Obtén más información sobre cómo ser nuestro proveedor en tu ciudad en nuestro sitio web: [Haz clic aquí](https://mimandote.cl/proveedores/).')
.addAnswer('Si deseas hablar con uno de nuestros ejecutivos, ¡no dudes en contactarnos en WhatsApp al +56963733862! Te atenderemos lo antes posible. También puedes comunicarte con nosotros directamente aquí en este mismo WhatsApp. 📲')
.addAnswer('🎥 Aquí tienes un video que resume lo que es ser proveedor en Mimándote: [Ver Video](https://youtu.be/K8N99Ydeuaw?si=OulTU45Acm-FlA07)')
.addAnswer('Si deseas volver al inicio de la conversación, simplemente escribe *Inicio* y volverás. 🔄');

const flowMedios = addKeyword(['Medios de pago', 'pagos', 'pago', 'medios'])

.addAnswer('🚀 Los medios de pago aceptados son: WebPay (Crédito y débito), OnePay, Mach, Servipag, Klap y Check')
.addAnswer('Si deseas volver al inicio de la conversación, simplemente escribe *Inicio* y volverás. 🔄');


const flowPrincipal = addKeyword(['hola', 'ole', 'alo', 'inicio', 'volver', 'desayuno'])
    .addAnswer('¡Hola! 🌟 Soy Mimador, el bot de Mimándote. Aquí estoy para asegurarme de que cada mañana comience con una sonrisa y un desayuno perfecto justo en tu puerta. ¿Cómo puedo mimarte hoy? 😊🥞')
    .addAnswer(
        [
            'Teclea alguna de la siguientes opciones',
            '👉 *Desayunos* disponibles en tu región',
            '👉 *Proveedor*  para unirte como proveedor',
            '👉 *Medios de pago* conoce que medios de pago aceptamos',
            '👉 *Ejecutivo* Para hablar con un ejecutivo de *Mimándote*',
        ],
        null,
        null,
        [flowDesa, flowProveedor, flowMedios ,flowTuto]
    )

const main = async () => {
    const adapterDB = new MockAdapter()
    const adapterFlow = createFlow([flowPrincipal])
    const adapterProvider = createProvider(BaileysProvider)

    createBot({
        flow: adapterFlow,
        provider: adapterProvider,
        database: adapterDB,
    })

    QRPortalWeb()
}

main()
