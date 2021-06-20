//================================Imports librerias 
const TelegramBot = require("node-telegram-bot-api")
const { initializeBotUtils } = require("./helpers/bot_utils.js");
require("dotenv").config()


//================================Servidor
process.env.NTBA_FIX_319 = 1
require("./config/server.js")
const token = process.env.BOT_TOKEN

//================================Covid Api 
const axios = require('axios');
var api = require("./apis/api.js");

//================================Respuestas automaticas Answers
var answers = require("./chat/answers")
var requests = require("./chat/requests")

//================================Instancia de bot 
var bot = new TelegramBot(token, { polling: true });
//Inicialización de las utilidades del bot
bot = initializeBotUtils(bot);


//================================Funciones support
const { toEscapeMSg, escucharMsg, isCommand, randomElementOfArray, escucharMsgArr } = require('./helpers/utility')

// ================= T E S T I N G==============

bot.on("polling_error", console.log)

// ================= C O M A N D O S =============
//Comando de inicio saluda 
bot.onText(/\/start/, (msg) => {
    const chatId = msg.chat.id
    const name = msg.from.first_name
    bot.sendMessage(chatId, `Hola ${name}👋, mi nombre es Corina (Coco), soy un Bot informativo.  puedo ayudarte a saber mas del coronavirus (COVID 19) un gusto en saludarte!😄`)

    var mensaje = `*** Mis comandos disponibles son:***
-  ***Basicos***
    1. */start* - Reinicializo la conversación
    2. */help*  - Te muestro mis comandos
    3. */link * - Te proporciono un link para que me muestres a mas personas 
- ***Estadisticas***
    4. */total* - Te muestro estadísticas a nivel mundial sobre los casos del coronavirus
- ***Informacion***
    5. */sintomas* - Te indico que sintomas tienen las personas que contraen el virus
    6. */cura*  - Te informo de el/los medicamentos que actualmente se utilizan para controlar el virus
    7. */contagio* - Te indico que procedimiento seguir en caso de creer o saber que estas contagiado
    `
    // bot.sendMessage(chatId, { parse_mode: "Markdown" }, mensaje)
    bot.sendMessage(chatId, toEscapeMSg(mensaje), { parse_mode: "MarkdownV2" })

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
function help(chatId) {
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
}
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

    axios.request(api.options).then(function (response) {
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
    const chatId = msg.chat.id;
    let respuesta = msg.text
    const name = msg.from.first_name
    console.log(name + ": " + msg.text)
    /*El bot recibe el mensaje del usuario "respuesta"
    *   1. elimna los acentos
    *   2. lo transforma a minusculas
    *   3. verifica que diga lo que dice
    */

    //==============Conversacion
    //Decir hola
    if (escucharMsg(respuesta, "hola")) {
        bot.sendMessage(chatId, randomElementOfArray(answers.saludos).replace("first_name", name))

        //Despedidas
    }
    // Despedidas (chao, adios)
    else if (escucharMsgArr(respuesta, requests.despedidas)) {
        bot.sendMessage(chatId, randomElementOfArray(answers.despedidas))
    }
    //Como estas
    else if (escucharMsgArr(respuesta, requests.comoEstas)) {
        bot.sendMessage(chatId, randomElementOfArray(answers.comoEstas))
    }
    //Que puedes hacer
    else if (escucharMsg(respuesta, "que puedes hacer")) {
        help(chatId)
    }
    //Si es comando
    else if (isCommand(respuesta)) {
        console.log("Comando: " + respuesta)
    }
    //Quien eres 
    else if (escucharMsgArr(respuesta, requests.quienEres)) {
        bot.sendMessage(chatId, "Mi nombre es Corina me apodan (Coco), soy un Bot informativo.  puedo ayudarte a saber mas del coronavirus (COVID 19) 👲")
    }
    else if (escucharMsg(respuesta, "gracias")) {
        bot.sendMessage(chatId, "Espero haberte ayudado 😉")
    }
    //==============Otros == 
    //Hora dormir
    else if (escucharMsgArr(respuesta, requests.duermes)) {
        bot.sendMessage(chatId, "Suelo descansar de 12:30am a 6:30am , o cuando estoy en desarrollo 👀")
    }
    //Estatus sistema
    else if (escucharMsgArr(respuesta, requests.status)) {
        bot.sendMessage(chatId, "sistemas y algoritmos funcionando correctamente 😎")
    }
    //==============Info covid 
    else if (escucharMsg(respuesta, "covid") || escucharMsg(respuesta, "corona")) {
        //Que es covid
        if (escucharMsgArr(respuesta, requests.whatCovid)) {
            bot.sendMessage(chatId, "El coronavirus es un grupo de virus que causan enfermedades que van desde el resfriado común hasta enfermedades más graves como neumonía, síndrome respiratorio de Oriente Medio (MERS) y síndrome respiratorio agudo grave (SARS). Cabe destacar que la cepa de coronavirus (2019-nCoV) que ha causado el brote en China es nueva y no se conocía previamente.  ")
        }
        //Que ees covid-19
        else if (escucharMsgArr(respuesta, requests.whatCovid19)) {
            bot.sendMessage(chatId, "La COVID-19 es la enfermedad infecciosa causada por el coronavirus que se ha descubierto más recientemente. Ambos eran desconocidos antes de que estallara el brote en Wuhan (China) en diciembre de 2019.")
        }
        //historia del covid 
        else if (escucharMsgArr(respuesta, requests.story)) {
            bot.sendMessage(chatId, "El 31 de diciembre de 2019, la Organización Mundial de la Salud (OMS) recibió reportes de presencia de neumonía, de origen desconocido, en la ciudad de Wuhan, en China. Rápidamente, a principios de enero, las autoridades de este país identificaron la causa como una nueva cepa de coronavirus. La enfermedad ha ido expandiéndose hacia otros continentes como Asia, Europa y América.    ")

            bot.sendMessage(chatId, "En cuanto a su comienzo, todavía no se ha confirmado el posible origen animal de la COVID-19.")
        }
        //Contagio
        else if (escucharMsg(respuesta, "transmite") || escucharMsg(respuesta, "contagia")) {
            bot.sendMessage(chatId, "Si te refieres al corona virus, Hay casos confirmados de coronavirus en casi todo del mundo, incluyendo China, Europa (siendo en Italia y España los primeros focos), Irán, Estados Unidos, África, Australia y LATAM. La Organización Mundial de la Salud (OMS) y la Organización Panamericana de la Salud (OPS) han reconocido el estado de pandemia, que supone el desarrollo de esta enfermedad. Es por ello que los viajes se han visto restringidos y muchos países ha cerrado sus fronteras, para tratar de evitar su expansión.        ")
        }
        //Mas informacion del corona virus
        else if (escucharMsgArr(respuesta, requests.moreInfo)) {
            bot.sendMessage(chatId, "Esta información fue publicada por el equipo de Bupa de información sobre la salud, y está basada en fuentes acreditadas de evidencia médica. Ha sido sometida a revisión por  médicos de Bupa. Este contenido se presenta únicamente con fines de información general y no reemplaza la necesidad de consulta personal con un profesional de la salud calificado.\n\nAlgunos links de interes son. ")

            var mensaje = `
            - Organizacion Mundial de la salud (https://www.who.int/es/home)\n\n 
- Consejos para la población acerca de los rumores sobre el nuevo coronavirus (https://www.who.int/es/emergencies/diseases/novel-coronavirus-2019/advice-for-public/myth-busters)
            `
            bot.sendMessage(chatId, toEscapeMSg(mensaje), { parse_mode: "MarkdownV2" })

        }

    }
    //Deteccion de sintomas 
    else if (escucharMsg(respuesta, "sintoma")) {
        if (escucharMsg(respuesta, "cuales son los sintoma")) {

            var mensaje = `
            *Los principales síntomas del virus coronavirus incluyen:*
    - Síntomas respiratorios (similares a los de un resfriado)
    - Fiebre (alta temperatura)
    - Tos seca
    - Falta de aliento o cansancio
    - Dificultades respiratorias
            `
            bot.sendMessage(chatId, toEscapeMSg(mensaje), { parse_mode: "MarkdownV2" })
            bot.sendMessage(chatId, "En casos más graves, el virus puede causar neumonía o síndrome respiratorio agudo grave (SRAS) que es una forma grave de neumonía, insuficiencia renal y hasta la muerte.")
            bot.sendMessage(chatId, "En otros casos, algunas personas infectadas no desarrollan ningún síntoma, pero pueden contagiar igualmente al resto de población..")
        }

    }
    //Contagio
    else if (escucharMsg(respuesta, "transmite") || escucharMsg(respuesta, "contagia")) {
        bot.sendMessage(chatId, "Si te refieres al corona virus, Hay casos confirmados de coronavirus en casi todo del mundo, incluyendo China, Europa (siendo en Italia y España los primeros focos), Irán, Estados Unidos, África, Australia y LATAM. La Organización Mundial de la Salud (OMS) y la Organización Panamericana de la Salud (OPS) han reconocido el estado de pandemia, que supone el desarrollo de esta enfermedad. Es por ello que los viajes se han visto restringidos y muchos países ha cerrado sus fronteras, para tratar de evitar su expansión.        ")
    }
    //A quien afecta mas
    else if (escucharMsg(respuesta, "a quien afecta")) {
        bot.sendMessage(chatId, "Hay casos confirmados de coronavirus en casi todo del mundo, incluyendo China, Europa (siendo en Italia y España los primeros focos), Irán, Estados Unidos, África, Australia y LATAM. La Organización Mundial de la Salud (OMS) y la Organización Panamericana de la Salud (OPS) han reconocido el estado de pandemia, que supone el desarrollo de esta enfermedad. Es por ello que los viajes se han visto restringidos y muchos países ha cerrado sus fronteras, para tratar de evitar su expansión.        ")
    }
    //Hora de ir al medico 
    else if (escucharMsgArr(respuesta, requests.irMedic)) {
        bot.sendMessage(chatId, "Si usted cree que ha estado expuesto al contacto con un afectado, quédese en casa practique el aislamiento social o cuarentena. Si desarrolla cualquiera de los síntomas relacionado con el coronavirus, o. es importante que busque atención médica tan pronto como sea posible. Consulte los números de teléfono habilitados en su país para recibir atención médica y controlar la evolución de los síntomas.")
        bot.sendMessage(chatId, "Es importante que contacte a su médico antes de ir a consulta y le informe sobre si ha tenido un viaje reciente o ha estado en contacto con una persona afectada por el virus.")
    }
    //¿que es la cuarentena y por que tenemos que tenerla?
    else if (escucharMsg(respuesta, "que es la cuarentena")) {
        bot.sendMessage(chatId, "la cuarentena es la separación y restricción de movimientos impuesta a una persona que puede haber estado en contacto con una fuente de infección pero que no tiene síntomas. El objetivo de la cuarentena es lograr que, en el caso de que la persona se hubiera infectado, no transmita a su vez la infección a otros. La realización de cuarentena sólo tiene sentido para aquellas enfermedades que se pueden transmitir durante el periodo asintomático, es decir, antes de que la persona muestre síntomas de enfermedad. Sobre la base de la información que se maneja actualmente se ha establecido una cuarentena de 14 días.        ")
    }

    //=================Easter eggs============================
    //Achu
    else if (escucharMsg(respuesta, "achu")) {
        bot.sendMessage(chatId, "Salud " + name + " 😉")
    }
    //Porque te llaman Coco
    else if (escucharMsgArr(respuesta, requests.nameCoco)) {
        bot.sendMessage(chatId, "Fue mi primer nombre, y esta lindo 👼 ")
    }
    //Coco
    else if (escucharMsg(respuesta, "coco")) {
        bot.sendMessage(chatId, "Veo que conoces mi apodo 🧠 ")
    }
    //Goku
    else if (escucharMsg(respuesta, "goku")) {
        bot.sendMessage(chatId, "No hay dudas goku le gana ")

    }
    //Badbunny
    else if (escucharMsgArr(respuesta, requests.bb)) {
        bot.sendMessage(chatId, "Yeyeyee")
    }
    //============== No conozco lo que me dices 
    else {         //Es una respuesta que no entiendo
        bot.sendMessage(chatId, randomElementOfArray(answers.defaults))
    }
})



// ==========================Bot recibe ==============
//Si recibe un stickers


