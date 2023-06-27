let n, selected;
let mosaic;
let uv;
let palette;
let pics;
let resolution, quantity;

function preload() {
  mosaic = readShader('/showcase/sketches/shaders/Photomosaic/normalMosaic.frag', { varyings: Tree.texcoords2 });
  pics = [];
  n = 31;
  for(let i=1; i<n; i++) pics.push(loadImage(`/showcase/sketches/shaders/Photomosaic/dataset/${i}.jpg`));
  console.log(pics)
}

function setup() {
  createCanvas(600, 600, WEBGL);
  textureMode(NORMAL);
  noStroke();
  
  shader(mosaic);
  
  resolution = createSlider(1, 300, 1, 1);
  resolution.position(10, 15);
  resolution.style('width', '80px');
  resolution.input(() => {
    mosaic.setUniform('resolution', resolution.value());
  });
  
  uv = createCheckbox('uv visualization', false);
  uv.style('color', 'magenta');
  uv.changed(() => mosaic.setUniform('uv', uv.checked()));
  uv.position(10, 40);
  
  mosaic.setUniform('n', n-1);
  mosaic.setUniform('resolution', resolution.value());
  mosaic.setUniform('uv', false);
  
  selected = floor(random() * pics.length);
  generatePalette();
  
}

function generatePalette(){
  palette = createGraphics(128*(n-1),128); //Object with images to shader
  
  for(let i=0; i<n-1; i++){
    palette.image(pics[i], 128*i, 0, 128, 128);
  }
}

function keyPressed() {
  if (key === 'n' || key === 'N') {
    selected = floor(random() * pics.length);
    generatePalette();
  }
}

function draw() {
  background(120);
  mosaic.setUniform('original', pics[selected]);
  mosaic.setUniform('pics', palette);
  beginShape();
  vertex(-1, -1, 0, 0, 1);
  vertex(1, -1, 0, 1, 1);
  vertex(1, 1, 0, 1, 0);
  vertex(-1, 1, 0, 0, 0);
  endShape();
}