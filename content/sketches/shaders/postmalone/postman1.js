let myShader;
let imageTexture;

function preload() {
  myShader = loadShader('shader.vert', 'shader.frag');
  imageTexture = loadImage('/showcase/sketches/shaders/postmalone/post.jpg');
}

function setup() {
  createCanvas(800, 600, WEBGL);
  noStroke();
  shader(myShader);
  myShader.setUniform('u_resolution', [width, height]);
  myShader.setUniform('u_mouse', [mouseX, mouseY]);
  myShader.setUniform('u_time', millis() / 1000.0);
  myShader.setUniform('u_tex0', imageTexture);
}

function draw() {
  background(0);
  quad(-1, -1, 1, -1, 1, 1, -1, 1);
}