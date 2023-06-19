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

  godrays_pg = createGraphics(width, height, WEBGL);
  godrays_pg.colorMode(RGB, 1);
  godrays_pg.textureMode(NORMAL);

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

  noiseWarp_pg.shader(noiseWarpShader);
  godrays_pg.shader(godraysShader);
}

function draw() {
  // Render noise warp effect
  noiseWarp_pg.background(125);
  noiseWarpShader.setUniform('image', imageTexture);
  noiseWarpShader.setUniform('resolution', [width, height]);
  noiseWarp_pg.quad(-1, 1, 1, 1, 1, -1, -1, -1);

  // Render godrays effect
  godrays_pg.background(0);
  godraysShader.setUniform('image', noiseWarp_pg);
  godraysShader.setUniform('resolution', [width, height]);

  let screenPos = godrays_pg.canvas.width / 2;
  let delta = 1.0 / screenPos;

  let weight = 1.0;
  let sum = godrays_pg.color(0, 0, 0, 0);
  let currentColor = godrays_pg.color(0, 0, 0, 0);

  for (let i = 0; i < 50; i++) {
    screenPos -= delta * 0.1;
    let sample = godrays_pg.get(screenPos, godrays_pg.canvas.height / 2);
    sample = godrays_pg.color(
      godrays_pg.red(sample),
      godrays_pg.green(sample),
      godrays_pg.blue(sample),
      godrays_pg.alpha(sample)
    );
    sample.mult(weight);
    sum.add(sample);
    weight *= godraysIntensity.value();
  }

  let godrayColor = sum.copy();
  godrayColor.mult(0.05);

  let finalColor = lerpColor(currentColor, godrayColor, godraysIntensity.value());
  godrays_pg.fill(finalColor);
  godrays_pg.rect(-1, -1, 2, 2);

  // Display final result
  image(godrays_pg, 0, 0);
}