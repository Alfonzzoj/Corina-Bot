const { Telegraf } = require('telegraf')

// Instancia de bot 
const bot = new Telegraf('1713876666:AAGAsa8ioKx5yZzgv7sZM5g3iUEtO5m3yxw')


// =============C O M A N D O S =============
//Comando de inicio saluda 
bot.start((ctx) => {
    ctx.reply('Hola bienvenido.')
})
//Muestra los comandos disponibles 
bot.help((ctx) => {
    ctx.reply('Estos son mis comandos')
})
//Bot escucha las frases autosaludo
bot.hears('Hola coco', ctx => {
    ctx.reply("Hola usuario 👋")
})
//Si recibe un stickers
bot.on('sticker', ctx => {
    ctx.reply("Que curioso sticker 😅")
})

//Iniciar bot
bot.launch()