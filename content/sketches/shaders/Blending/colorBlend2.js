let colorShader;
let picker1;
let picker2;
let color1;
let color2;
let rectColor1;
let rectColor2;
let rectResult;
let offset;
let operations = ["mult", "sum", "sub", "overlay", "screen", "darken", "lighten"];
let effect;
let brightness;

function preload(){
  colorShader = readShader('/showcase/sketches/shaders/Blending/colorBlender2.frag',
                          {varyings: Tree.color4});
}

function setup() {
  createCanvas(600, 600, WEBGL);
  
  picker1 = createColorPicker('red');
  picker1.position(width/8, height/8);
  picker2 = createColorPicker('lightgreen');
  picker2.position(width*7/12, height/8);

  effect = createSelect();
  effect.position(10, 10);
  effect.option('effect');
  for(let i of operations) effect.option(i);
  effect.changed(changeEffect);
  colorShader.setUniform('mult', true);

  brightness = createSlider(0, 1, 0.5, 0);
  brightness.position(300-40, 260);
  brightness.style('width', '80px');
  
  rectColor1 = createGraphics(150, 150);
  rectColor2 = createGraphics(150, 150);
  rectResult = createGraphics(1, 1);
  
  color1 = picker1.value();
  color2 = picker2.value();
  
  offset = 40;
}

function draw() {
  background('#1E1E37');
  
  color1 = picker1.value();
  color2 = picker2.value();
  
  rectColor1.background(color1);
  rectColor2.background(color2);
  image(rectColor1, -width/2+offset*2, -height/2+offset*2);
  image(rectColor2, -width/2+offset*9, -height/2+offset*2);

  shader(colorShader);
  colorShader.setUniform('brightness', brightness.value());
  colorShader.setUniform('color1', normalized(color1));
  colorShader.setUniform('color2', normalized(color2));
  
  beginShape();
  vertex(-1/3, -2/3);
  vertex(1/3, -2/3);
  vertex(1/3, 0.0);
  vertex(-1/3, 0.0);
  endShape();
}

function normalized(color){
  const r = red(color)/255;
  const g = green(color)/255;
  const b = blue(color)/255;
  return [r,g,b];
}

function changeEffect(){
  effect.disable('effect');
  for(let i of operations) colorShader.setUniform(i, false);
  colorShader.setUniform(effect.value(), true);
}