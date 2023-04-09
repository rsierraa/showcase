var cols, rows;
var scl = 20;
var w = 1400;
var h = 1000;

var flying = 0;

var terrain = [];

function preload(){
    airplane = loadModel('/showcase/sketches/terrain/airplane.obj');
}

function setup() {
  createCanvas(800, 800, WEBGL);
  cols = w / scl;
  rows = h / scl;
  slider = createSlider(-300,300,0,1);
  slider.position(10,10);
  camera = createCamera();

  for (var x = 0; x < cols; x++) {
    terrain[x] = [];
    for (var y = 0; y < rows; y++) {
      terrain[x][y] = 0; //specify a default value for now
    }
  }
}

function draw() {

  flying -= 0.1;
  var yoff = flying;
  for (var y = 0; y < rows; y++) {
    var xoff = 10;
    for (var x = 0; x < cols; x++) {
      terrain[x][y] = map(noise(xoff, yoff), 0, 1, -200, 100);
      xoff += 0.2;
    }
    yoff += 0.2;
  }


  background(0);
  translate(0, 50);
  rotateX(PI / 3);
  let sld=slider.value();
  camera.camera(230,400,600,200,100,200,0,1,0);
  camera.setPosition(sld,400,600);
  push();
  scale(0.03);
  fill(0,0,0,150);
  rotateZ(55);
  model(airplane, true);
  pop();
  fill(200, 200, 200, 150);
  translate(-w / 2, -h / 2);
  for (var y = 0; y < rows - 1; y++) {
    noStroke();
    beginShape(TRIANGLE_STRIP);
    for (var x = 0; x < cols; x++) {
        fill(100,0,255,150)
      vertex(x * scl, y * scl, terrain[x][y]);
      vertex(x * scl, (y + 1) * scl, terrain[x][y + 1]);
    }
    endShape();
  }
  
}