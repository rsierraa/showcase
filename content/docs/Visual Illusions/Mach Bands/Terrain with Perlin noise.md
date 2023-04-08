---
weight: 2
---
## Ejercicio 2: Generación infinita en videojuegos

**1. Introducción**

El Ruido Perlin es una función matemática que utiliza la interpolación entre un gran número de gradientes de vectores precalculados para crear un valor que varía de forma pseudoaleatoria en el espacio o en el tiempo. Se asemeja al ruido blanco y se utiliza con frecuencia en imágenes generadas por ordenador para simular la variabilidad de muchos tipos de fenómenos, dándoles un aspecto más realista.


**2. Solución**

En los videojuegos y ambientes virtuales se suele procurar optimizar los recursos de la maquina para dar una mejor experiencia al usuario. Una forma de realizar esto es haciendo uso de la renderización parcial: Esto evita que la máquina se cargue con trabajo que de todos modos no será visible para el usuario. 

En esta solución se propone la generacion aleatoria de terreno para un simulador de vuelo simple.


{{< details "Código" >}}
<pre>
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
      terrain[x][y] = map(noise(xoff, yoff), 0, 1, -200, 200);
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
</pre>
{{< /details >}}


El avión se incuye como un archivo .OBJ, que es un estándar para representar diseños en 3D a partir de sus coordenadas.



{{< p5-iframe sketch="/showcase/sketches/terrain/terrainGenerator.js" width="800" height="800" >}}

El usuario jwdunn1 propone la generación de un mundo inspirado en el popular videojuego Minecraft haciendo uso del ruido Perlin:

{{< p5-iframe sketch="/showcase/sketches/terrain/terrainGenerator2.js" width="700" height="500" >}}

**3. Conclusión**

El ruido Perlin brinda un patron tan impredecible como la naturaleza misma, lo cual puede ser aprovechado para hacer creer a nuestras mentes que estamos viendo paisajes naturales en los que incluso podemos crear una falsa sensación de movimiento.