//Requerimientos 
var express = require("express");
var logger = require('morgan');
var mayorPuntaje = 0;
var bodyParser = require('body-parser');
var Request = require('request');


//Crear objeto 'express' 
var app = express();

//escribe en la terminal las solicitudes que recibe
app.use(logger('dev'));
//analiza objetos JSON
app.use(bodyParser.json());

//Crea un directorio de vistas
app.set("views", __dirname);
//Asigna el lenguaje del motor y la extensión .html
app.engine('.html', require('ejs').__express);
app.set('view engine', 'html');
//Agrega una conexión al folder público 
app.use(express.static(__dirname + '/publico'));

// Iniciar el servidor
var puerto = 3000;
// Start the server & save it to a var
var servidor = app.listen(puerto);
var io = require('socket.io')(servidor);

//Rutas
app.get("/", function(solicitud, respuesta){
	respuesta.render('indice');
});

app.get("/mejorPuntaje", function(solicitud,respuesta){
	var data={"mayorPuntaje": mayorPuntaje};
	respuesta.json(data);
});

app.post("/nuevoRecord", function(solicitud,respuesta){
	console.log(solicitud.body.puntos);
	if (solicitud.body.puntos>mayorPuntaje){
		mayorPuntaje=solicitud.body.puntos;
	};
	var data = {"mayorPuntaje": mayorPuntaje};
	respuesta.json(data);
});

app.get("*", function(solicitud, respuesta){
	respuesta.send('No hay nada aquí');
});

//Socket
io.on('connection', function (socket) {
 	console.log('nuevo usuario conectado');
	socket.on('juego', function (data) {
		//console.log(data);

		//Envía datos a todos los clientes menos el que los mandó
		socket.broadcast.emit('nuevo', data);

  });
});