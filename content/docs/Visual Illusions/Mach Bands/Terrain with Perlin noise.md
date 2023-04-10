---
weight: 2
---
## Ejercicio 2: Generación infinita en videojuegos

**1. Introducción**

El Ruido Perlin es una función matemática que utiliza la interpolación entre un gran número de gradientes de vectores precalculados para crear un valor que varía de forma pseudoaleatoria en el espacio o en el tiempo. Se asemeja al ruido blanco y se utiliza con frecuencia en imágenes generadas por ordenador para simular la variabilidad de muchos tipos de fenómenos, dándoles un aspecto más realista.

Perlin Noise es un método matemático para generar fluctuaciones aleatorias pero muy contiguas, por lo que, a diferencia de cualquier tipo de función aleatoria, es una manera muy apta para generar terrenos aleatorios que, aunque aleatorios, requieren una forma coherente.

{{< hint info >}}
Lee más sobre el Ruido Perlin y otros métodos de generación de terreno aleatorio en:
https://medium.com/nerd-for-tech/generating-digital-worlds-using-perlin-noise-5d11237c29e9
{{< /hint >}}

**2. Solución**

En los videojuegos y ambientes virtuales se suele procurar optimizar los recursos de la maquina para dar una mejor experiencia al usuario. Una forma de realizar esto es haciendo uso de la renderización parcial: Esto evita que la máquina se cargue con trabajo que de todos modos no será visible para el usuario. 

En esta solución se propone la generacion aleatoria de terreno para un simulador de vuelo simple.


{{< details "Código" >}}
<pre>
var cols, rows; // variables para almacenar el número de columnas y filas en el mapa de ruido
var scl = 20; // escala para el tamaño de los bloques de ruido
var w = 1400; // ancho del mapa de ruido
var h = 1000; // altura del mapa de ruido

var flying = 0; // variable para almacenar el valor del desplazamiento vertical del mapa de ruido

var terrain = []; // arreglo vacío que almacenará el valor del mapa de ruido en cada posición

function preload(){
    airplane = loadModel('/showcase/sketches/terrain/airplane.obj'); // precargar el modelo del avión
}

function setup() {
  createCanvas(800, 800, WEBGL); // crear un canvas en modo WEBGL
  cols = w / scl; // calcular el número de columnas del mapa de ruido
  rows = h / scl; // calcular el número de filas del mapa de ruido
  slider = createSlider(-300,300,0,1); // crear un slider para desplazar la cámara
  slider.position(10,10); // colocar el slider en la esquina superior izquierda
  camera = createCamera(); // crear una cámara para la escena

  for (var x = 0; x < cols; x++) {
    terrain[x] = [];
    for (var y = 0; y < rows; y++) {
      terrain[x][y] = 0; // inicializar el valor del mapa de ruido en cada posición con cero
    }
  }
}

function draw() {

  flying -= 0.1; // decrementar el valor del desplazamiento vertical del mapa de ruido
  var yoff = flying; // almacenar el valor actual del desplazamiento vertical del mapa de ruido
  for (var y = 0; y < rows; y++) {
    var xoff = 10;
    for (var x = 0; x < cols; x++) {
      terrain[x][y] = map(noise(xoff, yoff), 0, 1, -200, 55); // mapear el valor del ruido a un valor entre -200 y 55
      xoff += 0.2;
    }
    yoff += 0.2;
  }

  background(0); // definir un fondo negro para la escena
  translate(0, 50); // trasladar el sistema de coordenadas hacia abajo para mostrar la escena completa
  rotateX(PI / 3); // rotar la escena alrededor del eje X para mostrar la vista desde arriba
  let sld=slider.value(); // almacenar el valor actual del slider
  camera.camera(230,400,600,200,100,200,0,1,0); // definir la posición inicial de la cámara
  camera.setPosition(sld,400,600); // actualizar la posición de la cámara con el valor del slider
  push();
  scale(0.03); // escalar el modelo del avión
  fill(0,0,0,150); // definir un color negro semitransparente para el modelo del avión
  rotateZ(55); // rotar el modelo del avión alrededor del eje Z
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
</pre>
{{< /details >}}


El avión se incuye como un archivo .OBJ, que es un estándar para representar diseños en 3D a partir de sus coordenadas.



{{< p5-iframe sketch="/showcase/sketches/terrain/terrainGenerator.js" width="800" height="800" >}}

El usuario jwdunn1 propone la generación de un mundo inspirado en el popular videojuego Minecraft haciendo uso del ruido Perlin:

{{< p5-iframe sketch="/showcase/sketches/terrain/terrainGenerator2.js" width="700" height="500" >}}

**3. Conclusión**

El ruido Perlin brinda un patron tan impredecible como la naturaleza misma, lo cual puede ser aprovechado para hacer creer a nuestras mentes que estamos viendo paisajes naturales en los que incluso podemos crear una falsa sensación de movimiento.