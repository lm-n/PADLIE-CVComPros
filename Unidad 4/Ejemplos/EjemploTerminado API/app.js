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

app.get("/estadoTiempo", function(solicitud,respuesta){
	//permitir solicitudes a terceros
	respuesta.header('Access-Control-Allow-Origin', "*");
	var llave = "03eca7acbe4302cc89ecd441a4ac7d77";
	var id = 3623076;//Liberia
	var solicitudURL = "https://api.openweathermap.org/data/2.5/weather?id="+id+"&appid="+llave;
	Request(solicitudURL, function (error, resp, body) {
		if (!error && resp.statusCode == 200) {
			var datos = JSON.parse(body);
			console.log(datos.main);
			respuesta.json(datos.main);
		}
	});
});


app.get("*", function(solicitud, respuesta){
	respuesta.send('No hay nada aquí');
});


// Iniciar el servidor
app.listen(3000);
console.log('Express inició en el puerto 3000');


