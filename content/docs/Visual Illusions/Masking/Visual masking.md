---
weight: 1
---

## Ejercicio 3: Cinegramas y el patrón de Moaré

**1. Introducción**

Un patrón de muaré, a veces conocido como patrón de moaré, es un patrón de interferencia que aparece en matemáticas, física, óptica y artes gráficas cuando se superponen dos líneas, ya sean rectas o curvas. 

Este patrón puede ser utilizado para cubrir parcialmente una imagen cuya disposición es la justa para que en cada fragmento de imagen mostrada se formen varias imagenes diferentes.

**2. Antecedentes y  trabajo previo**

Los cinegramas y los patrones de Moaré son conceptos que han sido objeto de estudio y exploración en diferentes áreas, incluyendo la ciencia, la tecnología, el arte y la comunicación. A continuación, se presentan algunos resultados académicos y trabajos relevantes sobre estos conceptos:

En el campo de la ciencia y la tecnología, los patrones de Moaré se han estudiado para entender mejor cómo se forman y cómo se pueden controlar. Se han utilizado en la fabricación de microchips y en la medición de la deformación de objetos. También se han explorado en el campo de la imagenología médica, para mejorar la calidad de las imágenes y reducir la radiación necesaria para obtenerlas.

En el campo del arte, los cinegramas han sido objeto de exploración por artistas que buscan nuevas formas de crear movimiento y narrativa en sus obras. Uno de los trabajos más relevantes en este sentido es la serie "Chronophotographs" del artista francés Étienne-Jules Marey, que utilizó la técnica de exposición prolongada para crear imágenes que muestran el movimiento en una sola imagen fija.

En el campo de la comunicación y la producción audiovisual, los patrones de Moaré han sido objeto de estudio para comprender cómo afectan a la calidad de las imágenes y cómo pueden ser evitados o reducidos. También se han utilizado en la producción de efectos visuales en películas y televisión.

En el campo de la educación, se han utilizado los cinegramas como una herramienta pedagógica para enseñar conceptos de física y animación. Por ejemplo, el sitio web "PhET Interactive Simulations" ofrece una simulación interactiva que permite a los estudiantes experimentar con la técnica de cinegramas y entender cómo funciona.

En conclusión, los cinegramas y los patrones de Moaré han sido objeto de exploración y estudio en diferentes campos, y su aplicación y relevancia dependen del contexto en el que se utilicen.


**3. Solución**

A continuación se hace uso de una rejilla que presenta un patrón de moaré para reproducir un cinegrama que anima el aleteo de unas aves.


{{< details "Código"  >}}


<pre>
let pic
let x=0
function preload() {
  pic = loadImage('/showcase/sketches/kinegram/kin.png')
 
}

function setup() {
  createCanvas(400, 400);
  frameRate(15)
}

function draw() {
  background(pic);

  
  
  for(let j=0;j<2000;j+=7){
    stroke(50)
    strokeWeight(5)
    line(j+x,0,j+x,height)
  }
 
  if(x>550){
    x=0
  }else{
    x=x+0.5
  }
  
}
</pre>
{{< /details >}}

<br>
<br>

{{< p5-iframe sketch="/showcase/sketches/kinegram/kinegram.js" width="525" height="525" >}}

**4. Conclusiones y trabajo a futuro**

El estudio y exploración de los conceptos de cinegramas y patrones de Moaré han llevado a importantes avances en diferentes áreas, incluyendo la ciencia, la tecnología, el arte y la comunicación. Los trabajos previos han permitido entender mejor cómo se forman y cómo se pueden controlar los patrones de Moaré, y cómo los cinegramas pueden ser utilizados como herramienta pedagógica y en la producción audiovisual.

A futuro, existen varias posibilidades de trabajo relacionadas con estos conceptos, como el desarrollo de nuevas técnicas de cinegramas, la investigación sobre los patrones de Moaré en la impresión 3D, la aplicación de cinegramas en la educación, la creación de efectos visuales en la producción audiovisual, y la exploración de los cinegramas en la narrativa transmedia.

En resumen, los conceptos de cinegramas y patrones de Moaré siguen siendo áreas de interés y exploración, y es probable que continúen siendo objeto de investigación y desarrollo en el futuro.
