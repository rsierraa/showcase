var cols, rows; // variables para almacenar el número de columnas y filas en el mapa de ruido
var scl = 20; // escala para el tamaño de los bloques de ruido
var w = 1400; // ancho del mapa de ruido
var h = 1000; // altura del mapa de ruido

var flying = 0; // variable para almacenar el valor del desplazamiento vertical del mapa de ruido

var terrain = []; // arreglo vacío que almacenará el valor del mapa de ruido en cada posición

function preload(){
    airplane = loadModel('/showcase/sketches/terrain/airplane.obj'); // precargar el modelo del avión
}

function setup() {
  createCanvas(800, 800, WEBGL); // crear un canvas en modo WEBGL
  cols = w / scl; // calcular el número de columnas del mapa de ruido
  rows = h / scl; // calcular el número de filas del mapa de ruido
  slider = createSlider(-300,300,0,1); // crear un slider para desplazar la cámara
  slider.position(10,10); // colocar el slider en la esquina superior izquierda
  camera = createCamera(); // crear una cámara para la escena

  for (var x = 0; x < cols; x++) {
    terrain[x] = [];
    for (var y = 0; y < rows; y++) {
      terrain[x][y] = 0; // inicializar el valor del mapa de ruido en cada posición con cero
    }
  }
}

function draw() {

  flying -= 0.1; // decrementar el valor del desplazamiento vertical del mapa de ruido
  var yoff = flying; // almacenar el valor actual del desplazamiento vertical del mapa de ruido
  for (var y = 0; y < rows; y++) {
    var xoff = 10;
    for (var x = 0; x < cols; x++) {
      terrain[x][y] = map(noise(xoff, yoff), 0, 1, -200, 55); // mapear el valor del ruido a un valor entre -200 y 55
      xoff += 0.2;
    }
    yoff += 0.2;
  }

  background(0); // definir un fondo negro para la escena
  translate(0, 50); // trasladar el sistema de coordenadas hacia abajo para mostrar la escena completa
  rotateX(PI / 3); // rotar la escena alrededor del eje X para mostrar la vista desde arriba
  let sld=slider.value(); // almacenar el valor actual del slider
  camera.camera(230,400,600,200,100,200,0,1,0); // definir la posición inicial de la cámara
  camera.setPosition(sld,400,600); // actualizar la posición de la cámara con el valor del slider
  push();
  scale(0.03); // escalar el modelo del avión
  fill(0,0,0,150); // definir un color negro semitransparente para el modelo del avión
  rotateZ(55); // rotar el modelo del avión alrededor del eje Z
  model(airplane, true);