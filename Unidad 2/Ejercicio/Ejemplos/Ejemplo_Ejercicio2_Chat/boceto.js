var mensajes = [];
var palabra = "";

function setup() {
  createCanvas(400, 400);
  mensajes[0] = new Burbuja("hola, ¿cómo estas?","recibido");
}

function draw() {
  background(220);
  stroke(50);
  fill(0);
  rect(100,10,200,370,20);
  fill(250);
  rect(110,20,180,350,20);
  fill(250);
  rect(120,330,140,30,20);
  noStroke();
  fill(0,255,0);
  ellipse(275,345,20,20);
  fill(255);
  triangle(270,340,270,350,280,345);
  for (var i = 0; i < mensajes.length; i++) {
    mensajes[i].mostrar(mensajes.length-i);
  }
  fill(0);
  text(palabra,130,350);
}


function keyPressed(){
  if(key!="Backspace" && key!="Enter"){
    //agrega letra
    palabra = palabra + key;
  }else if (key=="Backspace"){
    //elimina última letra
    palabra=palabra.slice(0,-1);
  }else if(key=="Enter"){
    nuevoMensaje(palabra);
    palabra = "";
  }
}

function mousePressed(){
  var distancia = dist(mouseX, mouseY, 275,345);

  if (distancia < 10 && palabra!="") {
    nuevoMensaje(palabra);
    palabra = "";
  }
}

function nuevoMensaje(texto){
  mensajes.push(new Burbuja(texto,"enviado"));
}

function Burbuja (tempText, tempTipo){
  this.text = tempText;
  this.tipo = tempTipo;
  this.mostrar = function(num,total){
    if (num < 9){
      num = 9-num;
    if (this.tipo=="recibido"){
        fill(150);
        rect(120,15+num*35,140,30,20);
        fill(0);
        text(this.text,130,35+num*35);
      }else{
        fill(0,255,0);
        rect(140,15+num*35,140,30,20);
        fill(0);
        text(this.text,160,35+num*35);
      }
    } 
  }
}