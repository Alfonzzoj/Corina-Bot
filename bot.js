//Import libreria Telegraf
const TelegramBot = require("node-telegram-bot-api")

const { initializeBotUtils } = require("./bot_utils");

//Servidor
require("./server");
require("dotenv").config();
const token = process.env.BOT_TOKEN

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
let bot = new TelegramBot(token, { polling: true });


//Inicialización de las utilidades del bot
bot = initializeBotUtils(bot);


//Funciones support
const { toEscapeMSg } = require('./utility')
function random(min, max) {
    return Math.floor((Math.random() * (max - min + 1)) + min);
}




// =============C O M A N D O S =============
//Comando de inicio saluda 
bot.onText(/\/start/, (msg) => {
    const chatId = msg.chat.id
    const name = msg.from.first_name
    bot.sendMessage(chatId, `Hola ${name},Mi nombre es Corina(Coco), soy un Bot informativo.  puedo ayudarte a saber mas del coronavirus (COVID 19)  😄🏥 un gusto en saludarte!`)

    var mensaje = `*** Mis comandos disponibles son:***
-  ***Basicos***
    1. */start* - Reinicializo la conversación
    2. */help*  - Te muestro mis comandos
    3. */link /share* - Te proporciono un link para que me muestres a mas personas 
- ***Estadisticas***
    4. */total* - Te muestro estadísticas a nivel mundial sobre los casos del coronavirus
- ***Informacion***
    5. */sintomas* - Te indico que sintomas tienen las personas que contraen el virus
    6. */cura*  - Te informo de el/los medicamentos que actualmente se utilizan para controlar el virus
    7. */contagio* - Te indico que procedimiento seguir en caso de creer o saber que estas contagiado
    `
    // bot.sendMessage(chatId, { parse_mode: "Markdown" }, mensaje)
    bot.sendMessage(chatId, toEscapeMSg(mensaje), { parse_mode: "MarkdownV2" });

})
//Muestra los comandos disponibles
bot.onText(/\/help/, (msg) => {
    const chatId = msg.chat.id

    var mensaje = `*** Mis comandos disponibles son:***
-  ***Basicos***
    1. */start* - Reinicializo la conversación
    2. */help*  - Te muestro mis comandos
    3. */link* - Te proporciono un link para que me muestres a mas personas 
- ***Estadisticas***
    4. */total* - Te muestro estadísticas a nivel mundial sobre los casos del coronavirus
- ***Informacion***
    5. */sintomas* - Te indico que sintomas tienen las personas que contraen el virus
    6. */cura*  - Te informo de el/los medicamentos que actualmente se utilizan para controlar el virus
    7. */contagio* - Te indico que procedimiento seguir en caso de creer o saber que estas contagiado
    `
    bot.sendMessage(chatId, toEscapeMSg(mensaje), { parse_mode: "MarkdownV2" });

})

//Bot comparte su link 
bot.onText(/\/link/, (msg) => {
    const chatId = msg.chat.id
    bot.sendMessage(chatId, " Puedes compartirme utilizando este link http://t.me/Cocorina_bot");

})
// //Explica los sintomas del covid
bot.onText(/\/sintomas/, (msg) => {
    const chatId = msg.chat.id

    var mensaje = ` 
 1.  *Los síntomas más habituales son los siguientes:*

	- Fiebre
	- Tos seca
	- Cansancio
2.  *Otros síntomas menos comunes son los siguientes:*

	- Molestias y dolores
	- Dolor de garganta
	- Diarrea
	- Conjuntivitis
	- Dolor de cabeza
	- Pérdida del sentido del olfato o del gusto
	- Erupciones cutáneas o pérdida del color en los dedos de las manos o de los pies
3.  *Los síntomas graves son los siguientes:*

	- Dificultad para respirar o sensación de falta de aire
	- Dolor o presión en el pecho
	- Incapacidad para hablar o moverse`
    bot.sendMessage(chatId, toEscapeMSg(mensaje), { parse_mode: "MarkdownV2" });
})
// //Explica los sintomas del covid
bot.onText(/\/cura/, (msg) => {
    const chatId = msg.chat.id

    var mensaje = ` La FDA ha aprobado el fármaco antiviral llamado remdesivir (Veklury) para tratar la COVID-19 en adultos y niños de 12 años y mayores que estén internados en el hospital. La FDA ha autorizado el uso de emergencia del fármaco baricitinib (Olumiant) para la artritis reumatoide para tratar la COVID-19 en algunos casos.`
    bot.sendMessage(chatId, toEscapeMSg(mensaje), { parse_mode: "MarkdownV2" });
})
//Explica los sintomas del covid
bot.onText(/\/contagio/, (msg) => {
    const chatId = msg.chat.id

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
    bot.sendMessage(chatId, toEscapeMSg(mensaje), { parse_mode: "MarkdownV2" });
})
//Bot escribe numero total
bot.onText(/\/total/, (msg) => {
    const chatId = msg.chat.id

    axios.request(options).then(function (response) {
        // console.log(response.data);
        var fecha = new Date(response.data[0].lastUpdate);
        // console.log(fecha.toLocaleString("en-us"));
        var mensaje = `*Numero de casos totales a nivel mundial:* 💹\n
-Confirmados: ${response.data[0].confirmed}
-Recuperados: ${response.data[0].recovered}
-Muertes: ${response.data[0].deaths} 
-Ultima actualizacion: ${fecha.toLocaleString("en-us")}`

        bot.sendMessage(chatId, toEscapeMSg(mensaje), { parse_mode: "MarkdownV2" });
    }).catch(function (error) {
        console.error(error);
    });
})

// ==========================Bot hears ==============
//Bot escucha conversacion hola
bot.on('message', (msg) => {
    const userId = msg.chat.id;
    let respuesta = msg.text
    const name = msg.from.first_name
    console.log(msg.text)
    if (respuesta.toLowerCase().includes("hola")) {
        bot
            .sendMessage(userId, `Hola ${name} `)
    } else if (respuesta.toLowerCase().includes("como estas")) {
        bot.sendMessage(userId, `Muy bien y tu ? `)
    }

})



// ==========================Bot recibe ==============
//Si recibe un stickers


