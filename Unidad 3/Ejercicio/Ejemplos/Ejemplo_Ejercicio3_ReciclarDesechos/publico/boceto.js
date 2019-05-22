var arregloDesechos = [];
var mayorPuntaje;
var puntos = 0;

function setup() {
  mejorPuntaje();
  createCanvas(400, 400);
  for(var i = 0; i<80; i++){
    var tipo;
    var x = random(10,390);
    var y = random(-4000,0);
    if (i<40){
      tipo = "botella";
    }else{
      tipo = "lata";
    }
    var objeto = new Desecho( x, y, tipo);
    arregloDesechos[i] = objeto;
  }
}

function draw() {
  background(220);
  for (var i = 0; i < arregloDesechos.length; i++) {
    arregloDesechos[i].mover();
    arregloDesechos[i].mostrar();
  }
  stroke(0,100,0);
  strokeWeight(20);
  fill(150);
  rect(mouseX,300,55,100);
  rect(mouseX+25,300,25,100);
  rect(mouseX-10,300,75,10);
  noStroke();
  fill(0);
  text("botellas recolectadas: " + puntos,20,20);
  text("record: " + mayorPuntaje, 20,30);
  if (puntos>mayorPuntaje){
    mayorPuntaje = puntos;
    nuevoRecord();
  }
  fill(0,255,0);
  text("reciclaje botellas",mouseX-15,310);
}

function Desecho(tempX,tempY,tempTipo){
  this.x = tempX;
  this.y = tempY;
  this.tipo = tempTipo
  this.adentro = false;
  this.velocidad = 0.9;
  this.mover = function(){
    this.y += this.velocidad;
  }
  this.mostrar = function(){
    if (this.tipo=="botella"){
      fill(0,100,255);
      noStroke();
      if (this.adentro == false) {
        rect(this.x,this.y,25,50,10);
        rect(this.x+8,this.y-7,8,7);
      }  
      if ((this.y-7 > 300 && this.y-7 < 350) && (this.x>mouseX && this.x+8<mouseX+55 ) && (this.adentro == false)){
        this.adentro = true;
        puntos ++;
      }
    }else{
      fill(255, 100, 5);
      noStroke();
      if (this.adentro == false) {
        rect(this.x,this.y,20,32,3);
        fill(255);
        text(this.tipo,this.x,this.y+20);
      }  
      if ((this.y-7 > 300 && this.y-7 < 350) && (this.x>mouseX && this.x+8<mouseX+55 ) && (this.adentro == false)){
        this.adentro = true;
        puntos --;
      }
    }
  }
}

function mejorPuntaje(){
  $.ajax({
    url: '/mejorPuntaje/',
    type: 'GET',
    dataType: 'json',
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

function nuevoRecord(puntos){
  var enviar = {"puntos":mayorPuntaje};
  console.log(enviar);
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
