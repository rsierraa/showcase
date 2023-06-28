let maskShader, pg_1;
let lumaShader, pg_2;
let src;
let img_src;
let video_src;
let video_on;
let lightness;
let uv;
let mask3;

function preload() {
  lumaShader = readShader('/showcase/docs/Shaders/fragments/luma.frag', { varyings: Tree.texcoords2 });
  maskShader = readShader('/showcase/docs/Shaders/fragments/mask.frag', { varyings: Tree.texcoords2 });
  video_src = createVideo(['/showcase/docs/Shaders/resources/video0.mp4']);
  video_src.hide(); 
  
  img_src = loadImage('/showcase/docs/Shaders/resources/photomosaic.jpg');
  src = img_src;
}

function setup() {
mask3 = [0, 0, 0, 0, 1, 0, 0, 0, 0]; //identidad
  createCanvas(700, 500, WEBGL);
  noStroke();
  textureMode(NORMAL);
//   pg_1 = createGraphics(width, height, WEBGL);
//   pg_1.colorMode(RGB, 1);
//   pg_1.textureMode(NORMAL);
//   pg_1.shader(lumaShader);

//   pg_2 = createGraphics(width, height, WEBGL);
//   pg_2.colorMode(RGB, 1);
//   pg_2.textureMode(NORMAL);
//   pg_2.shader(maskShader);
  shader(maskShader);
  shader(lumaShader);
  video_on = createCheckbox('video', false);
  video_on.style('color', 'white');
  video_on.changed(() => {
    src = video_on.checked() ? video_src : img_src;
    video_on.checked() ? video_src.loop() : video_src.pause();
  });
  video_on.position(10, 10);
  maskShader.setUniform('texture', src);

  lightness = createCheckbox('luma', false);
  lightness.position(10, 30);
  lightness.style('color', 'white');
  lightness.input(() => lumaShader.setUniform('lightness', lightness.checked()));
  
  ridges = createCheckbox('Ridges visualization', false);
  ridges.style('color', 'white');
  let checked = false;
  ridges.changed(() => {
    checked = !checked;
    if (checked) {
        mask3 = [-1, -1, -1, -1, 8, -1, -1, -1, -1];
    }else{
        mask3 = [0, 0, 0, 0, 1, 0, 0, 0, 0]; //identidad
    }
  });
  ridges.position(10, 50);
  
}

function draw() {
  /*
  NDC quad shape, i.e., x, y and z vertex coordinates ∈ [-1..1]
  textureMode is NORMAL, i.e., u, v texture coordinates ∈ [0..1]
  see: https://p5js.org/reference/#/p5/beginShape
       https://p5js.org/reference/#/p5/vertex
          y                  v
          |                  |
  (-1,1,0)|   (1,1,0)        (0,1)     (1,1)
    *_____|_____*            *__________*   
    |     |     |            |          |        
    |____NDC____|__x         | texture  |        
    |     |     |            |  space   |
    *_____|_____*            *__________*___ u
  (-1,-1,0)   (1,-1,0)       (0,0)    (1,0) 
  */
  lumaShader.setUniform('texture', src);

  roiradius = 100;
  mode = 0;
  maskShader.setUniform('texture', src);
  maskShader.setUniform('texOffset', [1 / src.width, 1 / src.height]);
  maskShader.setUniform('ksize', 3);
  maskShader.setUniform('roiradius', roiradius);
  maskShader.setUniform('mode', mode);
  emitMousePosition(maskShader, [uniform = 'mouse']);
  emitResolution(maskShader, [uniform = 'resolution']);
  

  maskShader.setUniform('mask3', mask3);

  beginShape();
  vertex(-1, -1, 0, 0, 1);
  vertex(1, -1, 0, 1, 1);
  vertex(1, 1, 0, 1, 0);
  vertex(-1, 1, 0, 0, 0);
  endShape();
} 