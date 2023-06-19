let image_pg;
let imageTexture;

function preload() {
  imageTexture = loadImage('/showcase/sketches/shaders/postmalone/post.jpg');
}

function setup() {
  createCanvas(600, 600);
  image_pg = createGraphics(width, height);
}

function draw() {
  image_pg.background(0);
  image_pg.image(imageTexture, 0, 0, width, height);

  // Display final result
  image(image_pg, 0, 0);
}