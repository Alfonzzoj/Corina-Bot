var express = require("express");
var packageInfo = require("./package.json");
// Instancia de express de la app en node
var app = express();

//Ruta principal que retorna la versiÃ³n del proyecto, ruta a la cual se hacen ping con Kaffeine para mantener el bot encendido
app.get("/", function (req, res) {
    res.json({ version: packageInfo.version });
});

var server = app.listen(5555, function () {
    var host = server.address().address;
    var port = server.address().port;

    console.log("Web server started at http://%s:%s", host, port);
});
