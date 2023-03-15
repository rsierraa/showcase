

function preload() {
  img = loadImage('/showcase/sketches/colorBlind/daltonismo.jpeg');
  soundFormats('mp3');
  azulSound = loadSound('/showcase/sketches/colorBlind/azul');
  rojoSound = loadSound('/showcase/sketches/colorBlind/rojo');
  verdeSound = loadSound('/showcase/sketches/colorBlind/verde');
  amarilloSound = loadSound('/showcase/sketches/colorBlind/amarillo');
}

function setup() {
  let cnv = createCanvas(700, 700);
  img.resize(700, 700);
  cnv.mousePressed(canvasPressed);
}




function getColor(colorHue) {

  colorHue = hue(colorHue)
  
  if (colorHue > 0 && colorHue < 12) {
    rojoSound.play();
    return;
  }
  
  if (colorHue > 33 && colorHue < 67) {
    amarilloSound.play();

    return;
  }
  
  if (colorHue > 67 && colorHue < 165) {
    verdeSound.play();
    return;
  }
  
  if (colorHue > 165 && colorHue < 255) {
    azulSound.play();
    return;
  }
  
  if (colorHue > 311) {
    rojoSound.play();

    return;
  }
  
}

function canvasPressed(){
    getColor(detectedColor);
}

function draw() {

  background(220);

  let pix = img.get(mouseX, mouseY);

  image(img, 0, 0, width, height);

  // Get the RGB color for that pixel
  detectedColor = color(red(pix), green(pix), blue(pix));
   
}