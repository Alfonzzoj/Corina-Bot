/**
 *
 * @param {TelegramBot} bot Bot de telegram
 * @returns {TelegramBot} *bot* con las propiedades para la gestión de respuesatas por parte del usuario.
 */
const initializeBotUtils = (bot) => {
  return nextMessageHandler(bot);
};

/**
 * Función encargada de esperar y guardar una respuesta del usuario antes de enviar el mensaje siguiente
 *
 * @param {TelegramBot} bot
 * @returns {TelegramBot} *bot* con las propiedades para la gestión de respuesatas por parte del usuario.
 */
const nextMessageHandler = (bot) => {
  bot.nextMessage = {};

  /**
   * Evento que captura el siguiente mensaje del usuario para devolver una promesa en respuesta a ello
   *
   * @param {Number} chatId ID único del usuario que ejecuta el comando
   * @param {Function} callback Función que ejecutará el bot posterior a la resolución de la promesa (cuando el usuario responda su mensaje)
   * @returns {Promise} Promesa que permitirá al bot continuar con el flujo de interacción luego de la respuesta del usuario
   */
  bot.onNextMessage = (chatId, callback) => {
    let promise = new Promise((resolve) => {
      bot.nextMessage[chatId] = { callback: callback, next: resolve };
    });
    return promise;
  };
  /**
   * Evento que captura todos los mensajes, en caso de ser un mensaje de respuesta que el bot espera,éste ejecuta el callback del mismo y continúa
   * con su flujo de interacción 
   *
   */

  bot.on("message", (msg) => {
    const chatId = msg.chat.id;

    let nextMsg = bot.nextMessage[chatId];
    if (nextMsg) {
      nextMsg.callback(msg);
      nextMsg.next(msg);
      bot.nextMessage[chatId] = undefined;
    }
  });
  return bot;
};
module.exports = { initializeBotUtils };
