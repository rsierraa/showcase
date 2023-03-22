let video;
let playing = false;

function setup() {
  createCanvas(800, 400);
  video = createVideo("/showcase/sketches/homer.mp4", vidLoaded);
  video.size(800,400);

}

function vidLoaded(){
  video.loop();
  video.speed(1);
  video.hide();
}

function draw() {
  background(220);
  image(video, 0, 0);
  noStroke();
  video.loadPixels();

  for (let x = 0; x < width; x += 10){
    for (let y = 0; y < height; y += 10){
      
      let index = (x + (y * width)) * 4;
      let r = video.pixels[index + 0] + 30;
      let g = video.pixels[index + 1] + 30;
      let b = video.pixels[index + 2] + 30;
      let a = 100;
           
      
      fill(r, g, b, a);
      square (x, y, 50)
    }
  }
}

function mousePressed() {
  if (playing) {
    video.pause();
  } else {
    video.loop();
  }
  playing = !playing;
}