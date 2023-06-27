let myShader, pg;
let imageTexture;

function preload() {
  //myShader = loadShader('/showcase/docs/Shaders/fragments/shader.vert', '/showcase/docs/Shaders/fragments/shader.frag');
  myShader = readShader('/showcase/docs/Shaders/fragments/shader.frag', { varyings: Tree.texcoords2 });
  imageTexture = loadImage('/showcase/sketches/shaders/postmalone/post.jpg');
}

function setup() {
  createCanvas(800, 600, WEBGL);

  pg = createGraphics(width, height, WEBGL);
  pg.colorMode(RGB, 1);
  pg.textureMode(NORMAL);
  pg.shader(myShader);
  myShader.setUniform('u_resolution', [width, height]);
  myShader.setUniform('u_mouse', [mouseX, mouseY]);
  myShader.setUniform('u_time', millis() / 1000.0);
  myShader.setUniform('u_tex0', imageTexture);
}

function draw() {
  render(pg);
  pg.quad(-1, 1, 1, 1, 1, -1, -1, -1);
  // display the resulted buffer
  image(pg, 0, 0);
}