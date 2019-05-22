//declaración de variables globales
var x = []; //declaración de arreglos vacíos
var y = [];
var nombres = [];
var numcirculos = 90; //número de círculos
var diametro = 20; 
var puntos = 0; //puntaje
var mayorPuntaje;
var agregar = false;

function setup(){
	mejorPuntaje();
	createCanvas(400,400);
	//sin borde
	noStroke();
	//crear posiciones "x" y "y" para los círculos
	for (var i = 0; i < numcirculos; i++) {
		//asignar valores aleatorios para posiciones "x" y "y" de los círculos
		x[i]=random(10,390);
		y[i]=random(50,390);
	}
}

function draw(){
	//fondo con transparencia
	background(100,50);
	//bucle corre y ejecuta el código para cada círculo
	for (var i = 0; i<x.length; i++) {
		//se calcula la distancia entre el cursor y el centro de cada circulo
		var distancia = dist(mouseX, mouseY, x[i], y[i]);
		//si el cursor está dentro de un círculo
		if (distancia < diametro/2){
			//reasignar valores aleatorios a coordenadas de ese círculo
			x[i]=random(10,390);
			y[i]=random(50,390);
			if (i < 8){
				//aumentar puntaje porque el usuario atrapó círculo verde
				puntos++;
			}else{
				//disminuir puntaje porque el usuario tocó círculo rojo
				puntos--;
			}
		}
		//si el círculo es uno de los últimos 7
		if (i< 8) {
			//pintar verde
			fill(0,255,0);
		} else {
			//pintar rojo
			fill(255,0,0);
		}
		//dibujar el círculo
		ellipse(x[i],y[i],diametro,diametro);
	}
	//dibuja círculo del cursor
	fill(255);
	ellipse(mouseX,mouseY,10,10);
	//dibuja puntaje
	fill(0);
	rect(0,0,250,40); 
	textSize(16);
	fill(255);
	triangle(10,20,20,10,20,30);
	text("Puntos: " + puntos, 30,25);
	text("Mejor puntaje: " + mayorPuntaje, 120,25);
	if (puntos>mayorPuntaje){
		mayorPuntaje = puntos;
		nuevoRecord();
	}
	
}

function mouseMoved(){
	enviar(mouseX,mouseY);
}

function mouseClicked(){
	agregar = true;
}

function mejorPuntaje(){
	$.ajax({
		url: '/mejorPuntaje',
		type: 'GET',
		dataType: 'json',
		error: function(respuesta){
			console.log(respuesta);
			alert("¡Oh No! Intente de nuevo");
		},
		success: function(respuesta){
			console.log("WooHoo!");
			console.log(respuesta);
			mayorPuntaje = respuesta.mayorPuntaje; 
		}
	});
}

function nuevoRecord(){
	var enviar = {"puntos":mayorPuntaje};
	$.ajax({
		url: '/nuevoRecord',
		type: 'POST',
		contentType: 'application/json',
		data: JSON.stringify(enviar),
		error: function(respuesta){
			console.log(respuesta);
			alert("¡Oh No! Intente de nuevo");
		},
		success: function(respuesta){
			console.log("WooHoo!");
			console.log(respuesta.mayorPuntaje);
			mayorPuntaje = respuesta.mayorPuntaje;
		}
	});
}

//----------SOCKET LADO CLIENTE----------//
//Inicializar objeto socket
var socket = io();

//Recibir datos del servidor usando.on()
socket.on('nuevo', function (datos) {
	dibujarDatos(datos);
});

function dibujarDatos(datos){
	var otroX = datos.pos[0];
	var otroY = datos.pos[1];
	if (datos.agregar == true){
		x.push(otroX);
		y.push(otroY);
	}
	fill(255,51,153);
	ellipse(otroX, otroY, 20,20);
}

//enviarDatos
function enviar(posX, posY){
	var data = {
		pos: [posX, posY],
		agregar
	};
	socket.emit('juego', data);
	agregar = false;
}