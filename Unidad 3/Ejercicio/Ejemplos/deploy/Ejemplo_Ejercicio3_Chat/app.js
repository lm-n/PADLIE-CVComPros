//Requerimientos 
var express = require("express");
var logger = require('morgan');
var ultimoMensaje = "Hola, ¿todo bien?";
var bodyParser = require('body-parser');

//Crear objeto 'express' 
var app = express();

//escribe en la terminal las solicitudes que recibe
app.use(logger('dev'));
app.use(bodyParser.json());

//Crea un directorio de vistas
app.set("views", __dirname);
//Asigna el lenguaje del motor y la extensión .html
app.engine('.html', require('ejs').__express);
app.set('view engine', 'html');
//Agrega una conexión al folder público 
app.use(express.static(__dirname + '/publico'));

//Rutas
app.get("/", function(solicitud, respuesta){
	respuesta.render('indice');
});

app.get("/ultimoMSJ", function(solicitud,respuesta){
	var data={"mensaje": ultimoMensaje};
	respuesta.json(data);
});

app.post("/nuevoMSJ", function(solicitud,respuesta){
	ultimoMensaje=solicitud.body.mensaje;
	var data = {"recibido": true};
	respuesta.json(data);
});


app.get("*", function(solicitud, respuesta){
	respuesta.send('No hay nada aquí');
});


// Iniciar el servidor
var port = process.env.PORT || 3000;
app.listen(port);
//console.log(console.log('Express started on port ' + port);