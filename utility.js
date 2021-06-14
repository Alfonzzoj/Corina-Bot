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
module.exports = { toEscapeMSg, Formatter, Formatter2 };