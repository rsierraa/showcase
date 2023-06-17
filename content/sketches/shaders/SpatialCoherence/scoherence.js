'use strict';

let img;
let pixelatorShader;

let resolution;
let mode;

let input;
let imgcode;

let dataset = [];

let video_on;

function preload() {
  img = loadImage(`/showcase/docs/Shaders/resources/scoherence.jpg`);
  pixelatorShader = readShader('/showcase/docs/Shaders/fragments/pixelator.frag', { matrices: Tree.NONE, varyings: Tree.texcoords2 });
}

function setup() {
  createCanvas(600, 600, WEBGL);
  textureMode(NORMAL);
  noStroke();
  shader(pixelatorShader);
  resolution = createSlider(1, 150, 30, 1);
  resolution.position(100, 10);
  resolution.style('width', '150px');
  resolution.input(() => pixelatorShader.setUniform('resolution', resolution.value()));
  pixelatorShader.setUniform('resolution', resolution.value());
  mode = createSelect();
  mode.position(10, 10);
  mode.option('original');
  mode.option('pixelator');
  mode.selected('pixelator');
  mode.changed(() => {
    if (mode.value() == 'original')
        resolution.hide();
    else
        resolution.show();
    pixelatorShader.setUniform('original', mode.value() === 'original');
  });
  input = createFileInput(handleFile);
  imgcode = createInput('', 'number');
  imgcode.style('display', 'none');

  video_on = createCheckbox('Video por defecto', false);
  video_on.changed(() => {
    if (video_on.checked()) {
      img = createVideo(['/showcase/docs/Shaders/resources/scoherence.mp4']);
      img.hide();
      img.loop();
    } else {
      img = loadImage(`/showcase/docs/Shaders/resources/scoherence.jpg`);
      img.hide();
      img.pause();
    }
    pixelatorShader.setUniform('source', img);
  })

}

function draw() {

    if (imgcode.value() != '') {
        img = dataset[(parseInt(imgcode.value()) - 1) % dataset.length];
    }

    if (img != null) {
        
        image(img, 0, 0, 600, 600); 

        pixelatorShader.setUniform('source', img);

        beginShape();
        vertex(-1, -1, 0, 0, 1);
        vertex(1, -1, 0, 1, 1);
        vertex(1, 1, 0, 1, 0);
        vertex(-1, 1, 0, 0, 0);
        endShape();
    }
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
        imgcode.value('') // to avoid getting dataset image instead
    }
}