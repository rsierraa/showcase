// Carga la imagen y los sonidos a utilizar
function preload() {
  img = loadImage('/showcase/sketches/colorBlind/mushies.jpg');
  soundFormats('mp3');
  azulSound = loadSound('/showcase/sketches/colorBlind/azul');
  rojoSound = loadSound('/showcase/sketches/colorBlind/rojo');
  verdeSound = loadSound('/showcase/sketches/colorBlind/verde');
  amarilloSound = loadSound('/showcase/sketches/colorBlind/amarillo');
  naranjaSound = loadSound('/showcase/sketches/colorBlind/Naranja');
  negroSound = loadSound('/showcase/sketches/colorBlind/Negro');
}

// Configura el canvas y define la función que se ejecuta al hacer clic en él
function setup() {
  let cnv = createCanvas(800, 800); // Crea un canvas con las dimensiones indicadas
  img.resize(700, 700); // Redimensiona la imagen para que coincida con las dimensiones del canvas
  cnv.mousePressed(canvasPressed); // Asigna la función canvasPressed() para ser llamada cada vez que se haga clic en el canvas
}

// Función que reproduce un sonido dependiendo del color que se ha detectado en el canvas
function getColor(colorHue) {
  colorHue = hue(colorHue); // Obtiene el valor de "hue" del color detectado
  
  // Si el valor de "hue" del color detectado está entre 0 y 12, se reproduce el sonido "rojo"
  if (colorHue > 0 && colorHue < 25) {
    rojoSound.play();
    return;
  }
   // Si el valor de "hue" del color detectado está entre 30 y 60, se reproduce el sonido "naranja"
   if (colorHue > 25 && colorHue < 50) {
    naranjaSound.play();
    return;
  } 
  // Si el valor de "hue" del color detectado está entre 33 y 67, se reproduce el sonido "amarillo"
  if (colorHue > 50 && colorHue < 65) {
    amarilloSound.play();
    return;
  }
  
  // Si el valor de "hue" del color detectado está entre 67 y 165, se reproduce el sonido "verde"
  if (colorHue > 65 && colorHue < 170) {
    verdeSound.play();
    return;
  }
  
  // Si el valor de "hue" del color detectado está entre 165 y 255, se reproduce el sonido "azul"
  if (colorHue > 170 && colorHue < 270) {
    azulSound.play();
    return;
  }
  
  // Si el valor de "hue" del color detectado es mayor a 311, se reproduce el sonido "rojo"
  if (colorHue > 330) {
    rojoSound.play();
    return;
  }
}

// Función que se llama al hacer clic en el canvas
function canvasPressed(){
    getColor(detectedColor);
}

function draw() {
  background(220); // Establece el color de fondo
  
  let pix = img.get(mouseX, mouseY); // Obtiene el color del pixel que se encuentra en la posición del mouse
  
  image(img, 0, 0, width, height); // Muestra la imagen en el canvas
  
  // Convierte el color del pixel obtenido en el paso anterior a un objeto de color de p5.js
  detectedColor = color(red(pix), green(pix), blue(pix));
}