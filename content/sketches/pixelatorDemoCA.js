// declarar las variables del video y playing
let video;
let playing = false;

function setup() {
  // crear un lienzo con dimensiones de 800x400 píxeles
  createCanvas(800, 400);
  
  // crear un objeto Video y cargar Colombia.mp4
  video = createVideo("/showcase/sketches/Colombia.mp4", vidLoaded);
  // establecer las dimensiones del video para que coincidan con el lienzo
  video.size(800,400);
}

function vidLoaded(){
  // establecer el video para que se reproduzca en bucle indefinidamente
  video.loop();
  // establecer la velocidad de reproducción del video a 1x
  video.speed(1);
  // ocultar el elemento de video para que no sea visible en la página
  video.hide();
}

function draw() {
  // establecer el color de fondo en blanco
  background(220);
  // mostrar el video en el lienzo en coordenadas (0, 0)
  image(video, 0, 0);
  // deshabilitar el trazo para las formas siguientes
  noStroke();
  // cargar los datos de píxeles para el video
  video.loadPixels();

  // recorrer el lienzo en incrementos de 10 píxeles en ambas direcciones x e y
  for (let x = 0; x < width; x += 10){
    for (let y = 0; y < height; y += 10){
      // calcular el índice del píxel en el arreglo de píxeles
      let index = (x + (y * width)) * 4;
      // obtener los valores rojo, verde y azul para el píxel
      let r = video.pixels[index + 0];
      let g = video.pixels[index + 1];
      let b = video.pixels[index + 2];
      // establecer la opacidad del píxel a 100
      let a = 100;
      
      // establecer el relleno del rectángulo al color promedio del píxel
      fill(r, g, b, a);
      // dibujar un rectángulo en la posición actual
      square (x, y, 50)
    }
  }
}

function mousePressed() {
  // si el video se está reproduciendo, ponerlo en pausa
  if (playing) {
    video.pause();
  } 
  // de lo contrario, hacer que el video se reproduzca en bucle
  else {
    video.loop();
  }
  // cambiar el valor de playing a su opuesto
  playing = !playing;
}