//Import libreria Telegraf
const { Telegraf } = require('telegraf')
//Servidor
require("./server");
require("dotenv").config();

//Covid Api 
//Api: https://rapidapi.com/es/Gramzivi/api/covid-19-data/
const axios = require('axios');

var options = {
    method: 'GET',
    url: 'https://covid-19-data.p.rapidapi.com/totals',
    headers: {
        'x-rapidapi-key': '3800c51dc0msh15078a490cf2229p129603jsn6fe630f17743',
        'x-rapidapi-host': 'covid-19-data.p.rapidapi.com'
    }
};

// Instancia de bot 
const bot = new Telegraf(process.env.BOT_TOKEN)

//Funciones support
function random(min, max) {
    return Math.floor((Math.random() * (max - min + 1)) + min);
}




// =============C O M A N D O S =============
//Comando de inicio saluda 
bot.start((ctx) => {
    var mensaje = `***Mis comandos disponibles son:*** 
    - **Basicos**
     1. */start* - Reinicializo la conversación
     2. */help*  - Te muestro mis comandos
     3. */link /share* - Te proporciono un link para que me muestres a mas personas 
    - **Estadisticas**
     4. */total* - Te muestro estadísticas a nivel mundial sobre los casos del coronavirus
    - **Informacion**
     5. */sintomas* - Te indico que sintomas tienen las personas que contraen el virus
     6. */cura*  - Te informo de el/los medicamentos que actualmente se utilizan para controlar el virus
     7. */contagio* - Te indico que procedimiento seguir en caso de creer o saber que estas contagiado
     `
    ctx.reply("Hola " + ctx.from.first_name + ", puedo ayudarte a saber mas del coronavirus (COVID 19)  😄🏥")
    ctx.replyWithMarkdown(mensaje)
})
//Muestra los comandos disponibles 
bot.help((ctx) => {
    var mensaje = `***Mis comandos disponibles son:*** 
    - **Basicos**
    1. */start* - Reinicializo la conversación
    2. */help*  - Te muestro mis comandos
    3. */link /share* - Te proporciono un link para que me muestres a mas personas 
    - **Estadisticas**
    4. */total* - Te muestro estadísticas a nivel mundial sobre los casos del coronavirus
    - **Informacion**
    5. */sintomas* - Te indico que sintomas tienen las personas que contraen el virus
    6. */cura*  - Te informo de el/los medicamentos que actualmente se utilizan para controlar el virus
    7. */contagio* - Te indico que procedimiento seguir en caso de creer o saber que estas contagiado
    `
    ctx.replyWithMarkdown(mensaje)
    ctx.reply('Recuerda que puedes preguntarme acerca del covid, Que es, como se propaga')
})

//Bot comparte su link 
bot.command(['link', 'Link', 'share', 'Share'], (ctx) => {
    ctx.reply('Puedes compartirme utilizando este link http://t.me/Cocorina_bot');
})
//Explica los sintomas del covid
bot.command(['sintomas', 'Sintomas', 'sint', 'sints'], (ctx) => {
    var mensaje = ` 
        1.  **Los síntomas más habituales son los siguientes:**

	- Fiebre
	- Tos seca
	- Cansancio

2.  **Otros síntomas menos comunes son los siguientes:**

	- Molestias y dolores
	- Dolor de garganta
	- Diarrea
	- Conjuntivitis
	- Dolor de cabeza
	- Pérdida del sentido del olfato o del gusto
	- Erupciones cutáneas o pérdida del color en los dedos de las manos o de los pies

3.  **Los síntomas graves son los siguientes:**

	- Dificultad para respirar o sensación de falta de aire
	- Dolor o presión en el pecho
	- Incapacidad para hablar o moverse`
    ctx.replyWithMarkdown(mensaje)
})
//Explica los sintomas del covid
bot.command(['cura'], (ctx) => {
    var mensaje = ` La FDA ha aprobado el fármaco antiviral llamado remdesivir (Veklury) para tratar la COVID-19 en adultos y niños de 12 años y mayores que estén internados en el hospital. La FDA ha autorizado el uso de emergencia del fármaco baricitinib (Olumiant) para la artritis reumatoide para tratar la COVID-19 en algunos casos.`
    ctx.reply(mensaje)
})
//Explica los sintomas del covid
bot.command(['contagio'], (ctx) => {
    var mensaje = `**Si has estado en contacto con alguien que tenga la COVID-19, sigue estos pasos:**

    1. Llama por teléfono a tu proveedor de servicios sanitarios o a una línea de atención sobre la COVID-19 para que te indiquen dónde y cuándo puedes hacerte una prueba.
    
    2. Coopera en los procedimientos de rastreo para frenar la propagación del virus.
    
    3. En caso de que no sea posible hacerte una prueba, quédate en casa y aíslate durante 14 días.
    
    4. Durante el periodo de cuarentena, no vayas al trabajo, a clase ni a lugares públicos. Si necesitas algo de fuera, pide a alguien que te lo lleve.
    
    5. Mantén una distancia de al menos 1 metro con otras personas, incluidos tus familiares.
    
    6. Usa la mascarilla para no contagiar a los demás. También debes llevarla puesta si necesitas acudir a un centro médico.
    
    7. Lávate las manos con frecuencia.
    
    8. Quédate en una habitación aislada del resto de los miembros de tu familia y, si no es posible, lleva puesta la mascarilla.
    
    9. Mantén la estancia bien ventilada.
    
    10. Si compartes el dormitorio con otras personas, debe haber una separación de al menos 1 metro entre las camas.
    
    11. Controla tus síntomas durante 14 días.
    
    12. Llama por teléfono a tu proveedor de servicios sanitarios de inmediato si tienes algún síntoma peligroso, como dificultad para respirar, pérdida de movilidad o del habla, confusión o dolor en el pecho.
    
    13. Mantén una actitud positiva. Para ello, puedes comunicarte con los tuyos por teléfono o por Internet, o hacer ejercicio en casa.
    
    `
    ctx.replyWithMarkdown(mensaje)
    ctx.replyWithMarkdown("Seguir estas indicaciones evitara el contagio, y te ayudara a sobrevivir")
})
//Bot escribe numero total 
bot.command(['Total', 'total'], (ctx) => {

    axios.request(options).then(function (response) {
        // console.log(response.data);
        var fecha = new Date(response.data[0].lastUpdate);
        // console.log(fecha.toLocaleString("en-us"));
        var mensaje = `*Numero de casos totales:*\n
-Confirmados: ${response.data[0].confirmed}
-Recuperados: ${response.data[0].recovered}
-Muertes: ${response.data[0].deaths} 
-Ultima actualizacion: ${fecha.toLocaleString("en-us")}`

        ctx.replyWithMarkdown(mensaje)
    }).catch(function (error) {
        console.error(error);
    });
})

// ==========================Bot hears ==============
//Bot escucha las frases autosaludo
bot.hears(['Hola corina', 'hola corina', 'HOLA CORINA', 'hola', 'Hola'], ctx => {

    var saludos = ["Hola " + ctx.from.first_name + " 👋",
    "Que tal  " + ctx.from.first_name + " 😄",
    "Holaa  " + ctx.from.first_name + ", me alegro de verte  😎",
    ];

    ctx.reply(saludos[random(0, saludos.length)])
})

// ==========================Bot recibe ==============
//Si recibe un stickers
bot.on('sticker', ctx => {
    ctx.reply("Que curioso sticker 😅")
})

//Iniciar bot
bot.launch()