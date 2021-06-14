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
     5. */sintomas* - Te indico que sintomas tienen las personas que contraen el virus`
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
    5. */sintomas* - Te indico que sintomas tienen las personas que contraen el virus`
    ctx.replyWithMarkdown(mensaje)
    ctx.reply('Recuerda que puedes preguntarme acerca del covid, Que es, como se propaga')
})

//Bot comparte su link 
bot.command(['link', 'Link', 'share', 'Share'], (ctx) => {
    ctx.reply('Puedes compartirme utilizando este link http://t.me/Cocorina_bot');
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