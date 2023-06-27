let blendShader;
let colorB; // picked by user
let B; // vec4 vector sent to shader
let tex; // shader output texture
let cpickerB;
let bslider; // brightness slider
let bmselect; // blending mode select
let brightness;
let mode;
let img; // shader input texture
let input;
let video_on;

function preload() {
  blendShader = readShader('/showcase/docs/Shaders/fragments/blend.frag', { matrices: Tree.NONE, varyings: Tree.texcoords2 });
}

function setup() {

  createCanvas(900, 850, WEBGL);
  
  colorB = color(10, 255, 170);
  
  tex = createGraphics(800, 800, WEBGL);
  
  cpickerB = createColorPicker(colorB);
  cpickerB.position(100, 600);

  bslider = createSlider(0, 1, 1, 0.05);
  bslider.position(200, 600);
  bslider.style('width', '80px');

  bmselect = createSelect();
  bmselect.position(300, 600);
  bmselect.option('MULTIPLY', 0);
  bmselect.option('ADD (LINEAR DODGE)', 1);
  bmselect.option('SCREEN', 2);
  bmselect.option('OVERLAY', 3);
  bmselect.option('DARKEST', 4);
  bmselect.option('LIGHTEST', 5);
  bmselect.option('COLOR BURN', 6);
  bmselect.option('LINEAR BURN', 7);
  bmselect.option('DIFFERENCE', 8);
  bmselect.option('DIVIDE', 9);
  bmselect.option('EXCLUSION', 10);
  bmselect.option('COLOR DODGE', 11);
  bmselect.option('HARD LIGHT', 12);
  bmselect.option('VIVID LIGHT', 13);
  bmselect.option('LINEAR LIGHT', 14);
  bmselect.option('PIN LIGHT', 15);
  bmselect.option('SOFT LIGHT 1', 16); // photoshop
  bmselect.option('SOFT LIGHT 2', 17); // pegtop
  bmselect.option('SOFT LIGHT 3', 18); // ilussions.hu
  bmselect.option('SOFT LIGHT 4', 19); // w3C
  bmselect.selected('MULTIPLY');

  img = loadImage('/showcase/docs/Shaders/resources/coloring.jpg');
  input = createFileInput(handleFile);

  video_on = createCheckbox('Video por defecto', false);
  video_on.changed(() => {
    if (video_on.checked()) {
      img = createVideo(['/showcase/docs/Shaders/resources/coloring.mp4']);
      img.hide();
      img.loop();
    } else {
      img = loadImage('/showcase/docs/Shaders/resources/coloring.jpg');
      img.hide();     
      img.pause();
    }
    blendShader.setUniform('texture', img);
  })
}

function draw() {
 
  colorB = cpickerB.color()
  
  background(255);
  
  image(img, -450, -400, 400, 400); 

  
  // vec4 vector sent to shader
  B = [colorB._getRed() / 255, colorB._getGreen() / 255, colorB._getBlue() / 255, alpha(colorB) / 255] // normalized
  
  brightness = bslider.value();
  mode = bmselect.value();

  tex.shader(blendShader)
  blendShader.setUniform('texture', img); // each texel will be color A
  blendShader.setUniform('colorB', B); 
  blendShader.setUniform('brightness', brightness); 
  blendShader.setUniform('mode', mode); 
  tex.square();
  texture(tex);
  square(-450, -400, 800);
}


function handleFile(file) {
  if (file.type === 'image') {
    img = createImg(file.data, '');
    img.hide();
  }
  else if (file.type === 'video') {
    img = createVideo([file.data]);
    img.hide();
    img.loop();
  }
}