let shader;
let imageTexture;

function preload() {
  shader = loadShader('shader.vert', 'shader.frag');
  imageTexture = loadImage('/showcase/sketches/shaders/postmalone/post.jpg');
}

function setup() {
  createCanvas(800, 600, WEBGL);
  noStroke();
  shader.shader(this._renderer);
}

function draw() {
  shader.setUniform('iResolution', [width, height]);
  shader.setUniform('iMouse', [mouseX, mouseY]);
  shader.setUniform('iTime', millis() / 1000.0);
  shader.setUniform('iChannel0', imageTexture);
  shader.setUniform('iChannelResolution[0]', [imageTexture.width, imageTexture.height]);

  quad(-1, -1, 1, -1, 1, 1, -1, 1);
}

// Z