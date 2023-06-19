let image_pg, noiseWarp_pg, godrays_pg;
let imageTexture, noiseWarpShader, godraysShader;
let noiseScale, noiseStrength, godraysIntensity;

function preload() {
  
  imageTexture = loadImage('/showcase/sketches/shaders/postmalone/post.jpg');
  noiseWarpShader = readShader('/showcase/docs/Shaders/fragments/noiseWarpShader.frag',{varyings: Tree.texcoords2 });
  godraysShader = readShader('/showcase/docs/Shaders/fragments/godraysShader.frag',{varyings: Tree.texcoords2 });
  // noiseWarpShader = loadShader('/showcase/docs/Shaders/fragments/noiseWarpShader.frag');
  //godraysShader = loadShader('/showcase/docs/Shaders/fragments/godraysShader.frag');
}

function setup() {
  createCanvas(600, 600, WEBGL);
  image_pg = createGraphics(width, height, WEBGL);
  noiseWarp_pg = createGraphics(width, height, WEBGL);
  godrays_pg = createGraphics(width, height, WEBGL);

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

  godraysIntensity = createSlider(0.0, 1.0, 0.5, 0.01);
  godraysIntensity.position(width - 120, 60);
  godraysIntensity.style('width', '80px');
  godraysIntensity.input(() => {
    godraysShader.setUniform('godraysIntensity', godraysIntensity.value());
  });
  godraysShader.setUniform('godraysIntensity', godraysIntensity.value());
}

function draw() {
  image_pg.background(0);
  image_pg.textureMode(NORMAL);
  image_pg.shader();
  image_pg.image(imageTexture, -width / 2, -height / 2, width, height);

  noiseWarp_pg.shader(noiseWarpShader);
  noiseWarpShader.setUniform('image', image_pg);
  noiseWarpShader.setUniform('resolution', [width, height]);
  noiseWarp_pg.rect(-width / 2, -height / 2, width, height);

  godrays_pg.shader(godraysShader);
  godraysShader.setUniform('image', noiseWarp_pg);
  godraysShader.setUniform('resolution', [width, height]);
  godrays_pg.rect(-width / 2, -height / 2, width, height);

  // Display final resultadoo
  image(godrays_pg, 0, 0);
}