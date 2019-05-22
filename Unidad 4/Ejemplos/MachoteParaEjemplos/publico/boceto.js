//declaración de variables globales
var x = []; //declaración de arreglos vacíos
var y = [];
var numcirculos = 90; //número de círculos
var diametro = 20; 
var puntos = 0; //puntaje
var mayorPuntaje;


function setup(){
	mejorPuntaje();
	createCanvas(400,400);
	//sin borde
	noStroke();
	//crear posiciones "x" y "y" para los círculos
	for (var i = 0; i < numcirculos; i++) {
		//asignar valores aleatorios para posiciones "x" y "y" de los círculos
		x[i]=random(0,400);
		y[i]=random(40,400);
	}
}

function draw(){
	//fondo con transparencia
	background(100,50);
	//bucle corre y ejecuta el código para cada círculo
	for (var i = 0; i<numcirculos; i++) {
		//se calcula la distancia entre el cursor y el centro de cada circulo
		var distancia = dist(mouseX, mouseY, x[i], y[i]);
		//si el cursor está dentro de un círculo
		if (distancia < diametro/2){
			//reasignar valores aleatorios a coordenadas de ese círculo
			x[i]=random(0,400);
			y[i]=random(0,400);
			if (i > numcirculos-8){
				//aumentar puntaje porque el usuario atrapó círculo verde
				puntos++;
			}else{
				//disminuir puntaje porque el usuario tocó círculo rojo
				puntos--;
			}
		}
		//si el círculo es uno de los últimos 7
		if (i> numcirculos-8) {
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
	rect(0,0,200,70); 
	textSize(16);
	fill(255);
	triangle(10,20,20,10,20,30);
	text("Puntos: " + puntos, 30,25);
	text("Mejor puntaje: " + mayorPuntaje, 30,50);
	if (puntos>mayorPuntaje){
		mayorPuntaje = puntos;
		nuevoRecord();
	}
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