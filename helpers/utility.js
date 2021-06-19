/**
 * Función que se encarga de escapar aquellos carácteres especiales de Markdown para evitar errores durante el Parsing
 *
 * @param {String} str mensaje a ser limpiado para su posterior envío en formato Markdown
 * @returns {String} Mensaje formateado
 */

function toEscapeMSg(str) {
    return str
        .replace(/_/gi, "\\_")
        .replace(/-/gi, "\\-")
        .replace("~", "\\~")
        .replace(/`/gi, "\\`")
        .replace(/\./g, "\\.")
        .replace(/\=/g, "\\=")
        .replace(/\|/g, "\\|")
        .replace(/\}/g, "\\}")
        .replace(/\{/g, "\\{")
        .replace(/\(/g, "\\(")
        .replace(/\)/g, "\\)");
}
/**
 * Implementación de la API de internacionalización para formatear los precios de las acciones a dos dígitos en USD
 */
const Formatter = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 2,
});

/**
 * Implementación de la API de internacionalización para formatear los porcentajes a dos dígitos
 */
const Formatter2 = new Intl.NumberFormat("en-US", {
    style: "percent",
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
});

function random(min, max) {
    return Math.floor((Math.random() * (max - min + 1)) + min);
}
/*
*elimina los acentos del string
*/
const randomElementOfArray = (Arr) => {
    var size = Arr.length
    var indice = random(0, size - 1)
    return Arr[indice]
}
/*
*Verifica si el string es un comando
*/
function isCommand(respuesta) {
    if (respuesta.includes('/')) {
        console.log("Es un comando")
        return true
    } else {
        return false
    }
}

/*
*elimina los acentos del string
*/
const removeAccents = (str) => {
    return str.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
}
/*
*formatea el string a estructuras para recibir en el bot 
*/
const minix = (str) => {
    return removeAccents(str).toLowerCase()
}
/*
*bot recibe mensaje formateado y pregunta si lo incluye
*/
const escucharMsg = (str, phrase) => {
    return minix(str).includes(phrase)
}
module.exports = { toEscapeMSg, Formatter, Formatter2, random, isCommand, removeAccents, randomElementOfArray, escucharMsg };