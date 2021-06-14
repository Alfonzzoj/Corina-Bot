//Import libreria Telegraf
const { Telegraf } = require('telegraf')

// Instancia de bot 
const bot = new Telegraf('1713876666:AAGAsa8ioKx5yZzgv7sZM5g3iUEtO5m3yxw')

//Funciones support
function random(min, max) {
    return Math.floor((Math.random() * (max - min + 1)) + min);
}

// =============C O M A N D O S =============
//Comando de inicio saluda 
bot.start((ctx) => {
    ctx.reply('Hola puedo ayudarte a saber mas del covid ')
})
//Muestra los comandos disponibles 
bot.help((ctx) => {
    ctx.reply('Estos son mis comandos')
})

//Bot comparte su link 
bot.command(['link', 'Link', 'share', 'Share'], (ctx) => {
    ctx.reply('Puedes compartirme utilizando este link ');
})

// ==========================Bot hears ==============
//Bot escucha las frases autosaludo
bot.hears(['Hola coco', 'hola coco', 'HOLA COCO', 'hola', 'Hola'], ctx => {

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