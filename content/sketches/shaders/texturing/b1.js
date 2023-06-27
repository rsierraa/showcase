let lumaShader;
let src;
let img_src;
let video_src;
let video_on;
let lightness;
let uv;

function preload() {
  lumaShader = readShader('/showcase/docs/Shaders/fragments/luma.frag',
    { varyings: Tree.texcoords2 });
  // video source: https://t.ly/LWUs2
  video_src = createVideo(['/showcase/docs/Shaders/resources/video0.mp4']);
  video_src.hide(); // by default video shows up in separate dom
  // image source: https://t.ly/Dz8W
  img_src = loadImage('/showcase/docs/Shaders/resources/photomosaic.jpg');
  src = img_src;
}

function setup() {
  createCanvas(700, 500, WEBGL);
  noStroke();
  textureMode(NORMAL);
  shader(lumaShader);
  video_on = createCheckbox('video', false);
  video_on.style('color', 'white');
  video_on.changed(() => {
    src = video_on.checked() ? video_src : img_src;
    video_on.checked() ? video_src.loop() : video_src.pause();
  });
  video_on.position(10, 10);
  lightness = createCheckbox('luma', false);
  lightness.position(10, 30);
  lightness.style('color', 'white');
  lightness.input(() => lumaShader.setUniform('lightness', lightness.checked()));
  uv = createCheckbox('uv visualization', false);
  uv.style('color', 'white');
  uv.changed(() => lumaShader.setUniform('uv', uv.checked()));
  uv.position(10, 50);
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
  beginShape();
  // format is: vertex(x, y, z, u, v)
  vertex(-1, -1, 0, 0, 1);
  vertex(1, -1, 0, 1, 1);
  vertex(1, 1, 0, 1, 0);
  vertex(-1, 1, 0, 0, 0);
  endShape();
}