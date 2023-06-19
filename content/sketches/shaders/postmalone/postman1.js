let image_pg, noiseWarp_pg, godrays_pg;
let imageTexture, noiseWarpShader, godraysShader;
let noiseScale, noiseStrength, godraysIntensity;

function preload() {
  
    imageTexture = loadImage('/showcase/sketches/shaders/postmalone/post.jpg');
    noiseWarpShader = readShader('/showcase/docs/Shaders/fragments/noiseWarpShader.frag', { varyings: Tree.texcoords2 });
    godraysShader = readShader('/showcase/docs/Shaders/fragments/godraysShader.frag', { varyings: Tree.texcoords2 });
  }

  function setup() {
    createCanvas(600, 600, WEBGL);
    noiseWarp_pg = createGraphics(width, height, WEBGL);
    noiseWarp_pg.colorMode(RGB, 1);
    noiseWarp_pg.textureMode(NORMAL);
    noiseWarp_pg.shader(noiseWarpShader);

    // godrays_pg = createGraphics(width, height, WEBGL);
    // godrays_pg.colorMode(RGB, 1);
    // godrays_pg.textureMode(NORMAL);
    // godrays_pg.shader(grodays_pg);
  
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
  
    // godraysIntensity = createSlider(0.0, 1.0, 0.5, 0.01);
    // godraysIntensity.position(width - 120, 60);
    // godraysIntensity.style('width', '80px');
    // godraysIntensity.input(() => {
    //   godraysShader.setUniform('godraysIntensity', godraysIntensity.value());
    // });
    // godraysShader.setUniform('godraysIntensity', godraysIntensity.value());
  }

function draw() {
  

  noiseWarp_pg.background(125);
  noiseWarpShader.setUniform('image', imageTexture);
  noiseWarpShader.setUniform('resolution', [width, height]);
  noiseWarp_pg.emitResolution(noiseWarpShader);

  console.log(noiseWarp_pg);


//   godraysShader.setUniform('image', noiseWarp_pg);
//   godraysShader.setUniform('resolution', [width, height]);


  // Display final result
  image(imageTexture, 0, 0);
}

// 77
