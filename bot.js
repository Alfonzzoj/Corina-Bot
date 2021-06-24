//================================Imports librerias 
const TelegramBot = require("node-telegram-bot-api")
const { initializeBotUtils } = require("./helpers/bot_utils.js");
require("dotenv").config()


//================================Servidor
process.env.NTBA_FIX_319 = 1
require("./config/server.js")
const token = process.env.BOT_TOKEN

//================================Covid Api 
const axios = require('axios')
var api = require("./apis/api.js")

//================================Respuestas automaticas Answers
var answers = require("./chat/answers")
var requests = require("./chat/requests")

//================================Instancia de bot 
var bot = new TelegramBot(token, { polling: true })
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
// // Diagnostico
// bot.onText(/\/diagnostico/, (msg) => {
//     const chatId = msg.chat.id

//     bot.sendMessage(chatId, "¿Qué sintomas tienes? ", {
//         "reply_markup": {
//             "teclado": [["Texto de muestra", "Segunda muestra"], ["Teclado"], ["Soy un robot"]]
//         }
//     });

// })
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
    // puedes hacer algo mas?
    else if (escucharMsg(respuesta, "puedes")) {
        bot.sendMessage(chatId, "aun estoy aprendiendo.")
    }
    //Quien eres 
    else if (escucharMsgArr(respuesta, requests.quienEres)) {
        bot.sendMessage(chatId, "Mi nombre es Corina me apodan (Coco), soy un Bot informativo.  puedo ayudarte a saber mas del coronavirus (COVID 19) 👲")
    }
    //Gracias
    else if (escucharMsg(respuesta, "gracias")) {
        bot.sendMessage(chatId, "Espero haberte ayudado 😉")
    }
    // Quien te creo?
    else if (escucharMsg(respuesta, "quien te")) {
        bot.sendMessage(chatId, "Mis creadores son Jesus Alfonzo @Alfonzzoj\n\nOliver torres\n\nPedro Duran")
    }
    //Si es comando
    else if (isCommand(respuesta)) {
        console.log("Comando: " + respuesta)
    }
    //==============Otros == 
    //Hora dormir
    else if (escucharMsgArr(respuesta, requests.duermes)) {
        bot.sendMessage(chatId, "Suelo descansar de 12:30am a 6:30am , o cuando estoy en desarrollo 👀")
    }
    //Estatus sistema
    else if (escucharMsgArr(respuesta, requests.status)) {
        bot.sendMessage(chatId, "Sistemas y algoritmos funcionando correctamente 😎")
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
    //¿Hasta cuando crees que haya cuarentena en venezuela?
    else if (escucharMsg(respuesta, "cuarentena en")) {
        bot.sendMessage(chatId, "Es dificil de calcular, depende de cada pais. ")
    }
    //Vacuna o vacunacion
    else if (escucharMsg(respuesta, "vacuna") || escucharMsg(respuesta, "vacunacion") || escucharMsg(respuesta, "vacunarse")) {
        if (escucharMsg(respuesta, "que es ")) {
            bot.sendMessage(chatId, "La vacunación es una forma sencilla, inocua y eficaz de protegernos contra enfermedades dañinas antes de entrar en contacto con ellas. Las vacunas activan las defensas naturales del organismo para que aprendan a resistir a infecciones específicas, y fortalecen el sistema inmunitario. ")
            bot.sendMessage(chatId, "Tras vacunarnos, nuestro sistema inmunitario produce anticuerpos, como ocurre cuando nos exponemos a una enfermedad, con la diferencia de que las vacunas contienen solamente microbios (como virus o bacterias) muertos o debilitados y no causan enfermedades ni complicaciones.\n\nLa mayoría de las vacunas se inyectan, pero otras se ingieren (vía oral) o se nebulizan en la nariz.            ")
        }
        // como funciona
        else if (escucharMsg(respuesta, "como funciona") || escucharMsg(respuesta, "como actua")) {
            bot.sendMessage(chatId, "Las vacunas ponen en marcha las defensas naturales del organismo y, de ese modo, reducen el riesgo de contraer enfermedades. Actúan desencadenando una respuesta de nuestro sistema inmunitario, que: reconoce al microbio invasor (por ejemplo, un virus o una bacteria) genera anticuerpos, que son proteínas que nuestro sistema inmunitario produce naturalmente para luchar contra las enfermedades;    recuerda la enfermedad y el modo de combatirla. Si, en el futuro, nos vemos expuestos al microbio contra el que protege la vacuna, nuestro sistema inmunitario podrá destruirlo rápidamente antes de que empecemos a sentirnos mal.    En definitiva, las vacunas son una forma ingeniosa e inocua de inducir una respuesta inmunitaria sin causar enfermedades.                ")
            bot.sendMessage(chatId, "Nuestro sistema inmunitario está diseñado para recordar. Tras la administración de una o más dosis de una vacuna contra una enfermedad concreta, quedamos protegidos contra ella, normalmente durante años, décadas o incluso para toda la vida. Por eso las vacunas son tan eficaces: en vez de tratar una enfermedad cuando esta aparece, evitan que nos enfermemos.        ")

        }
        // importancia
        else if (escucharMsg(respuesta, "importante") || escucharMsg(respuesta, "importancia")) {
            bot.sendMessage(chatId, "La vacunación es una forma segura y eficaz de prevenir enfermedades y salvar vidas, hoy más que nunca. En la actualidad disponemos de vacunas para protegernos contra al menos 20 enfermedades, entre ellas la difteria, el tétanos, la tos ferina, la gripe y el sarampión. En su conjunto, esas vacunas salvan cada año tres millones de vidas.")
            bot.sendMessage(chatId, " Cuando nos vacunamos, no solo nos protegemos a nosotros mismos, sino también a quienes nos rodean. A algunas personas, por ejemplo, las que padecen enfermedades graves, se les desaconseja vacunarse contra determinadas enfermedades; por lo tanto, la protección de esas personas depende de que los demás nos vacunemos y ayudemos a reducir la propagación de tales enfermedades.        ")
            bot.sendMessage(chatId, "Durante la pandemia de COVID-19 la vacunación sigue siendo de importancia crucial. La pandemia ha provocado una disminución del número de niños que reciben inmunización sistemática, lo que podría dar lugar a un aumento de enfermedades y defunciones por enfermedades prevenibles. La OMS ha instado a los países a que garanticen la continuidad de los servicios de inmunización y salud esenciales, a pesar de los desafíos que plantea la COVID-19.            ")
        }
        // Me protege me cuida
        else if (escucharMsg(respuesta, "protege") || escucharMsg(respuesta, "cuida") || escucharMsg(respuesta, "protegera")) {
            bot.sendMessage(chatId, "Las vacunas adiestran y preparan las defensas naturales del organismo, el sistema inmunitario, para que reconozcan y combatan virus y bacterias. Si después de la vacunación el organismo se viera expuesto a esos agentes patógenos, estaría preparado para destruirlos rápidamente y, de ese modo, evitaría la enfermedad.             ")

            bot.sendMessage(chatId, "Cuando una persona se vacuna contra una enfermedad, su riesgo de infección también se reduce, por lo que es mucho menos probable que transmita el virus o la bacteria a otras personas. Cuantas más personas de una comunidad se vacunen habrá menos personas vulnerables, y de ese modo se reducirán las probabilidades de que una persona infectada transmita el agente patógeno a otros. La reducción de las probabilidades de circulación de un agente patógeno en la comunidad protege de la enfermedad a quienes no se se les puede aplicar la vacuna correspondiente (debido a situaciones clínicas tales como alergias o la edad).    ")

        }
        // ¿por que debo de vacunarme?
        else if (escucharMsg(respuesta, "que debo") || escucharMsg(respuesta, "es necesario") || escucharMsg(respuesta, "es obligatorio")) {
            bot.sendMessage(chatId, "Si no nos vacunamos, corremos el riesgo de contraer enfermedades graves como el sarampión, la meningitis, la neumonía, el tétanos y la poliomielitis, muchas de las cuales pueden ser discapacitantes y mortales. Según los cálculos de la OMS, las vacunas salvan la vida a entre dos y tres millones de personas cada año.            ")

            bot.sendMessage(chatId, "Aunque algunas enfermedades son actualmente poco frecuentes, los patógenos que las causan continúan circulando en todo el mundo o en partes de él. Hoy en día, las enfermedades infecciosas atraviesan fronteras con facilidad e infectan a las personas que no están protegidas.\n\nLas dos principales razones para vacunarse son protegernos a nosotros mismos y proteger a las personas que nos rodean. Puesto que no se puede vacunar a todas las personas —por ejemplo, no es recomendable para los recién nacidos, las personas gravemente enfermas y las que pueden presentar determinadas alergias—, al protegernos nosotros evitamos contagiarles enfermedades que se pueden prevenir mediante vacunación.            ")

        }
        // ¿quien puede vacunarse?
        else if (escucharMsg(respuesta, "quien")) {
            if (escucharMsg(respuesta, "debe") || escucharMsg(respuesta, "puede") || escucharMsg(respuesta, "necesita")) {
                bot.sendMessage(chatId, "Prácticamente todo el mundo se puede vacunar. Sin embargo, la vacunación está desaconsejada o debe postergarse en situaciones específicas o cuando se presentan determinadas enfermedades orgánicas                ")
                bot.sendMessage(chatId, "Si eres una persona que ya padecio covid y aun tienes secuelas, lo mas recomendable es no vacunarte por los efectos secundarios, pero si eres una persona que aun no ha tenido covid y no presentas ningun cuadro de salud fuerte, es importante que te vacunes.          ")

            }
        }
        // ¿No me he vacunado aun, es tarde para hacerlo?
        else if (escucharMsg(respuesta, "es tarde")) {
            bot.sendMessage(chatId, "Con las escasas excepciones de algunas vacunas, nunca es demasiado tarde para vacunarse. Pregunte a los profesionales sanitarios cómo recuperar las dosis de vacunas no administradas, tanto a usted como a su hijo.                ")
        }
        // ¿¿como contribuye la oms con las vacunas??
        else if (escucharMsg(respuesta, "contribuye la oms")) {
            bot.sendMessage(chatId, "la OMS trabaja para garantizar que cada persona en cualquier lugar que sea esté protegida por vacunas seguras y eficaces. Para ello, ayuda a los países a establecer sistemas de seguridad rigurosos en lo relativo a las vacunas, y aplica normas internacionales estrictas para reglamentarlos.\n\nJunto con científicos de todo el mundo, los expertos de la OMS realizan seguimientos constantes para garantizar que las vacunas sigan siendo seguras. Además, la OMS trabaja con asociados para ayudar a los países a investigar y comunicar cualquier motivo de preocupación que pudiera surgir.\n\nTodo efecto secundario adverso imprevisto notificado a la OMS es objeto de evaluación por parte de un grupo de expertos independientes que integran el Comité Consultivo Mundial sobre Seguridad de las Vacunas.            ")
        }
        // Aun no me convence la vacuna
        else if (escucharMsg(respuesta, "no me convence") || escucharMsg(respuesta, "no estoy") || escucharMsg(respuesta, "tengo miedo")) {
            bot.sendMessage(chatId, "Si tiene dudas acerca de las vacunas, confíe en los profesionales sanitarios. Ellos se las aclararán con información basada en datos científicos sobre la vacunación para usted y para su familia, y le proporcionarán el calendario vacunal recomendado en su país.            ")
            bot.sendMessage(chatId, "En internet, confíe solamente en fuentes fiables para informarse sobre las vacunas. Para ayudarle a reconocerlas, la OMS ha examinado y certificado muchos sitios web de todo el mundo que contienen solamente información basada en datos científicos fiables y revisiones independientes realizadas por los mejores expertos técnicos. Todos estos sitios web son miembros de la Red de Seguridad Vacunal (www.vaccinesafetynet.org).           ")
        }
        // ¿que contiene la vacuna?
        else if (escucharMsg(respuesta, "tiene")) {
            bot.sendMessage(chatId, "Todos los componentes de las vacunas son importantes para garantizar su inocuidad y su eficacia. Estos son algunos de ellos:            ")
            let mensaje = `• El *antígeno:* es una forma muerta o debilitada de un patógeno (por ejemplo, un virus o una bacteria) que prepara a nuestro organismo para reconocer y combatir una determinada enfermedad en el futuro.\n\n• *Adyuvantes:* ayudan a incrementar la respuesta inmunitaria y, así, facilitan la acción de las vacunas.\n\n• *Conservantes:* garantizan que la vacuna mantiene su eficacia.\n\n*• Estabilizantes:* protegen la vacuna durante su transporte y almacenamiento.\n\nAlgunos de los componentes que figuran en la etiqueta de las vacunas nos son desconocidos, pero muchos de ellos están presentes de forma natural en nuestro organismo, en nuestro entorno y en los alimentos que ingerimos. Para garantizar su inocuidad, se hace un examen y un seguimiento integral de todas las vacunas y de sus ingredientes por separado.
            `
            bot.sendMessage(chatId, toEscapeMSg(mensaje), { parse_mode: "MarkdownV2" })

        }
        // ¿como se hacen las vacunas?
        else if (escucharMsg(respuesta, "como se")) {
            if (escucharMsg(respuesta, "hacen") || escucharMsg(respuesta, "cre") || escucharMsg(respuesta, "produc")) {
                bot.sendMessage(chatId, "Las vacunas más utilizadas se han administrado durante decenios, y millones de personas las reciben cada año con total seguridad. Al igual que los medicamentos, cada vacuna debe pasar por una serie de pruebas amplias y rigurosas que garanticen su seguridad, antes de que se puedan introducir en un país.                ")
                bot.sendMessage(chatId, "El primer ensayo de una vacuna experimental se realiza con animales, con el fin de evaluar su seguridad y sus posibilidades para prevenir la enfermedad. Con posterioridad se realizan ensayos clínicos con seres humanos, en tres fases:                ")
                let mensaje = `En la *fase I* se administra la vacuna a un pequeño número de voluntarios, a fin de evaluar su seguridad, confirmar que genera una respuesta inmunitaria y determinar la dosis correcta.\n\nEn la *fase II*, se suele administrar la vacuna a cientos de voluntarios, de los que se hace un seguimiento estrecho para detectar cualquier efecto secundario y evaluar su capacidad de generar una inmunitaria. Además, de ser posible, en esta fase se obtienen datos sobre resultados relacionados con enfermedades, pero, por lo general, en números insuficientes para tener un panorama claro del efecto de la vacuna en la enfermedad. Los participantes en esta fase tienen las mismas características (por ejemplo, edad y sexo) que las personas a las que se prevé vacunar. En esta fase, algunos voluntarios reciben la vacuna y otros no, lo que permite efectuar comparaciones y extraer conclusiones sobre la vacuna.
                \n\nEn la *fase III* se administra la vacuna a miles de voluntarios, algunos de los cuales reciben la vacuna experimental y otros no, al igual que en los ensayos de fase II. Los datos de ambos grupos se comparan cuidadosamente para determinar si la vacuna es segura y eficaz contra la enfermedad de que se trate.
                \n\nUna vez disponibles los resultados de los ensayos clínicos se deben adoptar una serie de medidas que incluyen exámenes de la eficacia, seguridad y fabricación, con miras a obtener las autorizaciones normativas y de salud pública previas a la introducción de la vacuna en un programa nacional de inmunización.`
                bot.sendMessage(chatId, toEscapeMSg(mensaje), { parse_mode: "MarkdownV2" })


            }
        }
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


