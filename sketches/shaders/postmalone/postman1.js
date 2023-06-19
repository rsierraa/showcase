let image_pg, noiseWarp_pg, godrays_pg;
let imageTexture, noiseWarpShader, godraysShader;
let noiseScale, noiseStrength, godraysIntensity;

function preload() {
  imageTexture = loadImage('/showcase/sketches/shaders/postmalone/post.jpg');
  noiseWarpShader = loadShader('/showcase/docs/Shaders/fragments/noiseWarpShader.frag');
  godraysShader = loadShader('/showcase/docs/Shaders/fragments/godraysShader.frag');
}

function setup() {
  createCanvas(600, 600, WEBGL);
  
  noiseWarp_pg = createGraphics(width, height, WEBGL);
  noiseWarp_pg.colorMode(RGB, 1);
  noiseWarp_pg.textureMode(NORMAL);
  noiseWarp_pg.shader(noiseWarpShader);

  noiseScale = createSlider(0.001, 0.1, 0.01, 0.001);
  noiseScale.position(width - 120, 10);
  noiseScale.style('width', '80px');
  noiseScale.input(() => {
    noiseWarpShader.setUniform('noiseScale', noiseScale.value());
  });
  noiseWarpShader.setUniform('noiseScale', noiseScale.value());

  noiseStrength = createSlider(0.1, 10, 2, 0.1);
  noiseStrength.position(width - 120, 35);
  noiseStrength.style('width', '80px');
  noiseStrength.input(() => {
    noiseWarpShader.setUniform('noiseStrength', noiseStrength.value());
  });
  noiseWarpShader.setUniform('noiseStrength', noiseStrength.value());
}

function draw() {
  noiseWarp_pg.background(125);
  noiseWarpShader.setUniform('image', imageTexture);
  noiseWarpShader.setUniform('resolution', [width, height]);
  noiseWarp_pg.quad(-1, 1, 1, 1, 1, -1, -1, -1);

  // Display final result
  image(noiseWarp_pg, 0, 0);
}