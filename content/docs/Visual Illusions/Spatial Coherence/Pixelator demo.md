---
weight: 2
---
## Ejercicio 5: Pixelador

**1. Introducción**

Aunque a primera vista parece qeu pixelar una imagen sea un desproposito, lo cierto es que tiene aplicaciones muy utiles. Un ejemplo de esto es la censura por pixelado que busca ocultar información; Otro uso bastante popular es el de reducir el tamaño de las imagenes a cambio de perder algo de calidad para poder enviar archivos no tan pesados.

**2. Solución**

A continuación se pixela el mismo video utilizando dos tecnicas diferentes: Color averaging y Spatial coherence:

Spatial Coherence

{{< p5-iframe sketch="/showcase/sketches/pixelatorDemoSC.js" width="800" height="400" >}}

Color Averaging

{{< p5-iframe sketch="/showcase/sketches/pixelatorDemoCA.js" width="800" height="400" >}}


En la implementación de Pixelación por Promedio de Color (Color Averaging), el código divide la pantalla en cuadrados de 50 píxeles de ancho y alto y toma el color promedio de los píxeles dentro de cada cuadrado. El color promedio se usa para pintar el cuadrado correspondiente. La división de la pantalla se realiza mediante un bucle for anidado que recorre los píxeles de la imagen original. Este método de pixelación es sencillo pero efectivo para lograr un efecto de imagen pixelada.

{{< details "Código" >}}
<pre>
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
</pre>
{{< /details >}}





En la implementación de Coherencia Espacial (Spatial Coherence), el código también divide la pantalla en cuadrados de 50 píxeles de ancho y alto, pero esta vez se suma un valor constante a cada componente RGB (rojo, verde, azul) del color de los píxeles dentro de cada cuadrado antes de pintar el cuadrado correspondiente. Esto hace que los colores de los cuadrados sean un poco más brillantes que en la imagen original. El objetivo de agregar el valor constante es aumentar la coherencia espacial en la imagen, es decir, hacer que los colores de los cuadrados sean más similares entre sí y estén más en armonía. Esto puede ser útil para crear una sensación de unidad en la imagen pixelada.

{{< details "Código" >}}
<pre>
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
</pre>
{{< /details >}}


**3. Conclusión**

Utilizando el metodo de coherencia espacial se conservan unos colores mas vivos respecto a su contraparte de promediado de color. Por lo que desde nuestra opinión de ignorantes, consideramos al metodo de coherencia espacial como el mejor entre estos.