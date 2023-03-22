let randomCameraAngle = false;
let depth = 400;
let size = 10;
let overlap = 300;  //550
let water = 6;
let treeLine = -70;
let sw = 0.2; //0.2 strokeWeight
let terrRange, terrHeight, rez1, rez2, cam, seed;

function setup() {
  terrRange = random(60, 180);
  terrHeight = random(-15, 5);
  rez1 = random(0.002, 0.02); //bumpy terrain
  rez2 = random(0.001, 0.009); //gradual elevation
  let canv = createCanvas(700, 500, WEBGL);
  canv.mousePressed(setup);
  noLoop();
  colorMode(HSB, 360, 100, 100, 100);
  cam = createCamera();
  let saveButton = createButton("save jpg");
  saveButton.position(10, height + 25);
  saveButton.mousePressed(saveArt);
  seed = millis() * 10000;  //to vary noise
  draw();
}

function draw() {
  if (randomCameraAngle == true){    
   cam.camera(0,random(-80,-500),random(-50,-300),random(-50,50),random(-100,250),0,0,1,0)} 
   else {
   cam.camera(0, -350, -400, 0, 0, 0, 0, 1, 0)} //high overview
  background(220, 100, 100);
  for (x = -overlap-width/2; x < width/2 + overlap; x += size) {
    for (z = -overlap-depth/2; z < depth/2 + overlap; z += size) {
      let yn1 =
        (noise(x * rez1 + seed, z * rez1 + seed)-0.5) * terrRange //bumpy noise
      let yn2 =
        (noise(x * rez2 + seed, z * rez2 + seed)-0.5) * terrRange * 2 //gradual elevation
      y = yn1 + yn2 + terrHeight;
      // y = round((yn1 +yn2 + terrHeight)/size)*size;
      h = noise(
        (x + overlap) * rez1 + 10000,
        (z + overlap) * rez1 + seed + 10000
      ); //noise for grass color
      if (y > water) {
        fill(random(230, 245), 100, random(50, 70), 100); //water colors
        y = water;
        noStroke();
      } else {
        stroke(0, 0, 0);
        strokeWeight(sw); 
        fill(
          h * 50 + 110 + random(-5, 5),
          h * 30 + 90 + random(-5, 5),
          h * 85 + 35 + random(-5, 5),
          100      //grass colors
        );
      }
      push();
      translate(x, y, z);
      if (y > treeLine) {
        box(size, size, size); //grass or water
        translate(0, size*3, 0);
      }
      else {translate(0,size*2,0)}
      fill(random(180, 220), random(10, 30), random(30, 50)); //stone colors
      box(size, size * 5, size); //stones
      let treeChance =
        random(-2, 2) +
        noise(
          (x + overlap) * rez1 + 20000,
          (z + overlap) * rez1 + seed + 20000
        ) *
          14;
      if (y < water && y > treeLine && treeChance > 9.5) {
        makeTree();
      }
      pop();
    }
  }
}

function makeTree() {
  let treeSize = random(0.5, 1.3) * size;
  translate(0, -treeSize*5, 0);
  fill(0, random(70, 80), random(20, 40)); //trunk color
  noStroke();
  cylinder(treeSize / 3, treeSize * 3);
  stroke(0,0,0);
  strokeWeight(sw);
  translate(-treeSize, -treeSize, -treeSize);
  fill(random(110, 130), random(70, 100), random(20, 40)); //green leaves
  //fill(random(40), 100, random(80,90)); //fall colors
  //sphere(treeSize);
  // fill in tree:
  for (i=0;i<2;i++){
  for (j=0;j<3;j++){
    for (k=0;k<3;k++){
      box(treeSize);
      translate(0,0,treeSize)
    }
    translate(treeSize,0,-treeSize*3)
  } translate(-treeSize*3,-treeSize,0)
  }
  translate(treeSize,0,treeSize);
  box(treeSize) //cap on tree
}

function saveArt() {
  save("myCanvas.jpg");
}