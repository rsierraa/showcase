let myShader;
let imageTexture;

function preload() {
  myShader = loadShader('shader.vert', 'shader.frag');
  imageTexture = loadImage('ruta_de_la_imagen.jpg'); // Reemplaza 'ruta_de_la_imagen.jpg' con la ruta correcta a tu imagen
}

function setup() {
  createCanvas(800, 600, WEBGL);
  noStroke();
  shader(myShader);
  myShader.setUniform('iResolution', [width, height]);
  myShader.setUniform('iMouse', [mouseX, mouseY]);
  myShader.setUniform('iTime', millis() / 1000.0);
  myShader.setUniform('iChannel0', imageTexture);
  myShader.setUniform('iChannelResolution[0]', [imageTexture.width, imageTexture.height]);
}

function draw() {
  background(0);
  quad(-1, -1, 1, -1, 1, 1, -1, 1);
}