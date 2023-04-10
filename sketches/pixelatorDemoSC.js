let video;
let playing = false;

function setup() {
  // Crea un canvas de 800x400
  createCanvas(800, 400);
  
  // Carga el video Colombia.mp4
  video = createVideo("/showcase/sketches/Colombia.mp4", vidLoaded);
  
  // Establece el tamaño del video en 800x400
  video.size(800,400);
}

function vidLoaded(){
  // Establece el loop del video
  video.loop();
  
  // Establece la velocidad del video en 1 (velocidad normal)
  video.speed(1);
  
  // Oculta el video
  video.hide();
}

function draw() {
  // Establece el fondo del canvas en gris claro
  background(220);
  
  // Dibuja el video en el canvas
  image(video, 0, 0);
  
  // Elimina el borde de los cuadrados que se van a dibujar
  noStroke();
  
  // Carga los píxeles del video
  video.loadPixels();

  // Recorre el canvas de 10 en 10 píxeles
  for (let x = 0; x < width; x += 10){
    for (let y = 0; y < height; y += 10){
      
      // Calcula el índice de los píxeles en el arreglo
      let index = (x + (y * width)) * 4;
      
      // Obtiene los valores RGB de los píxeles
      let r = video.pixels[index + 0] + 30;
      let g = video.pixels[index + 1] + 30;
      let b = video.pixels[index + 2] + 30;
      
      // Establece la opacidad de los cuadrados en 100
      let a = 100;
           
      // Dibuja un cuadrado en la posición actual con los colores obtenidos
      fill(r, g, b, a);
      square (x, y, 50)
    }
  }
}

function mousePressed() {
  // Pausa o reanuda el video al hacer clic en el mouse
  if (playing) {
    video.pause();
  } else {
    video.loop();
  }
  playing = !playing;
}