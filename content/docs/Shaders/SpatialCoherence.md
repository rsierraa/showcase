---
title: Spatial Coherence
weight: 6
---
## Exercise
1. Implement your own source dataset and a mechanism to select different images from it.
2. Implement a pixelator in software that doesn’t use spatial coherence and compare the results with those obtained here.

## Introduction

La coherencia espacial se refiere a la propiedad de que los píxeles o elementos de una imagen o gráfico cercanos entre sí tienden a tener características o valores similares. Esto significa que existe una correlación o similitud en los datos espacialmente adyacentes.

## Background

La técnica de "spatial coherence" o "coherencia espacial" tiene sus antecedentes en el campo de la informática gráfica y el procesamiento de imágenes. A continuación, se presentan algunos de los antecedentes relevantes en el uso de esta técnica:

Radiosity y Ray Tracing: A finales de la década de 1970 y principios de la década de 1980, los investigadores comenzaron a explorar métodos de renderizado más realistas, como la radiosity y el ray tracing. Estos métodos aprovechaban la coherencia espacial al propagar la luz de un punto a otro en la escena y calcular la iluminación globalmente. Al utilizar técnicas de coherencia espacial, fue posible reducir el tiempo de cálculo necesario para renderizar escenas complejas.

Algoritmos de compresión de imágenes: En el campo de la compresión de imágenes, se desarrollaron algoritmos que aprovechaban la coherencia espacial para lograr una mayor eficiencia en la representación de imágenes. Por ejemplo, los métodos de codificación predictiva utilizan la información de píxeles vecinos para predecir el valor de un píxel y, de esta manera, reducir la redundancia en los datos.

Culling y técnicas de optimización en gráficos 3D: En el ámbito de los gráficos 3D en tiempo real, se han desarrollado diversas técnicas de optimización basadas en la coherencia espacial. Por ejemplo, el ocultamiento de superficies (culling) se utiliza para evitar el procesamiento de objetos o partes de objetos que están completamente ocultos detrás de otros. Además, los algoritmos de agrupación espacial (spatial partitioning) como el octree y el árbol BSP (Binary Space Partitioning) se utilizan para dividir el espacio en regiones coherentes y acelerar la detección de colisiones y el renderizado.

Filtros de imágenes: Los filtros espaciales aplicados a imágenes, como los filtros de suavizado o enfoque, se basan en la coherencia espacial para lograr resultados visuales deseables. Estos filtros utilizan operaciones que consideran los valores de los píxeles vecinos para calcular los nuevos valores de los píxeles en la imagen filtrada.

## Solution, spatial coherence

En este ejercicio, se realiza la pixelación de imágenes utilizando la técnica de coherencia espacial. El proceso se lleva a cabo mediante un shader llamado "pixelator", el cual recibe la imagen original y la resolución deseada. Al especificar una resolución de 30, por ejemplo, la imagen pixelada tendrá píxeles de baja resolución (grandes) en cada lado, totalizando 30 píxeles.

El mecanismo de coherencia espacial funciona de la siguiente manera: para cada texel (píxel de la textura), se recibe una coordenada normalizada en el rango de [0..1]. Cada componente de la coordenada se multiplica por la resolución, lo que ajusta su valor al rango [0..30]. A continuación, se aplica la función piso a estos componentes, lo que resulta en un redondeo hacia abajo. Por ejemplo, todas las coordenadas dentro del espacio [2, 3) x [2, 3) se mapearán a la coordenada (2, 2). Luego, esta coordenada se divide entre la resolución para obtener nuevamente valores normalizados. El color correspondiente a la coordenada (2, 2) se asigna a todos los texeles que se encuentren en el rango [2, 3) x [2, 3). La coherencia espacial se aplica asumiendo que este color será cercano a los colores de todos los texeles mapeados a esa coordenada, aunque esto no sea cierto en todos los casos, pero es altamente probable.

Además, se ha agregado una implementación alternativa que no utiliza la coherencia espacial, lo cual permite al usuario comparar los resultados. Esta implementación pinta cada píxel de baja resolución con el color promedio de los píxeles mapeados a esa coordenada. Esta aplicación se realiza mediante software, sin utilizar shaders. El usuario debe cargar manualmente la imagen que desea comparar en ambas implementaciones y ajustar el control deslizante para que ambas tengan la misma resolución.

Al observar los resultados, se nota que no hay una gran diferencia en los colores utilizados en los píxeles de baja resolución. Incluso puede parecer que la coherencia espacial muestra la imagen pixelada con un poco más de detalle, mientras que la implementación que utiliza el promedio de los colores parece tener un efecto de desenfoque o algo similar.

Es importante mencionar que la implementación sin coherencia espacial no admite videos y solo se puede realizar la comparación con imágenes estáticas.

### Controles

* **Botón Seleccionar archivo**: para cargar una imagen o video
* **Checkbox Video por defecto**: marcar para usar el video por defecto, desmarcar para usar la imagen por defecto
* **Slider**: define la resolución (por defecto 30, es decir 30 pixeles de baja resolución por cada lado de la cuadrícula). El mínimo valor es 1 y el máximo 150. Una resolución mayor, implica más pixeles, y por tanto, de menor tamaño cada vez. El tamaño de la cuadrícula es de 600px x 600px  por lo que una resolución de 150 implica pixeles de baja resolución de dimensiones 4px x 4px.
* **Select**: para decidir si ver la imagen pixelada o la original

{{< p5-iframe sketch="/showcase/sketches/shaders/SpatialCoherence/scoherence.js" width="650" height="750" lib1="https://cdn.jsdelivr.net/gh/VisualComputing/p5.treegl/p5.treegl.js">}}


{{<details "Sketch Code">}}

``` js
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
```
{{</details >}}

{{<details "Pixelator Shader Code">}}
```glsl
precision mediump float;

// source (image or video) is sent by the sketch
uniform sampler2D source;
// displays original
uniform bool original;
// target horizontal & vertical resolution
uniform float resolution;

// interpolated texcoord (same name and type as in vertex shader)
// defined as a (normalized) vec2 in [0..1]
varying vec2 texcoords2;

void main() {
  if (original) {
    gl_FragColor = texture2D(source, texcoords2);
  }
  else {
    // define stepCoord to sample the texture source as a 3-step process:
    // i. define stepCoord as a texcoords2 remapping in [0.0, resolution] ∈ R
    vec2 stepCoord = texcoords2 * resolution;
    // ii. remap stepCoord in [0.0, resolution] ∈ Z
    // see: https://thebookofshaders.com/glossary/?search=floor
    stepCoord = floor(stepCoord);
    // iii. remap stepCoord in [0.0, 1.0] ∈ R
    stepCoord = stepCoord / vec2(resolution);
    // source texel
    gl_FragColor = texture2D(source, stepCoord);
    // ✨ source texels may be used to compute image palette lookup keys,
    // such as in video & photographic mosaics or ascii art visualizations.
  }
}
```
{{</details >}}

## Solution, average Color 

A continuación se presenta la implementación realizada en software (no en hardware) para la pixelación sin utilizar coherencia espacial. En este enfoque, en lugar de seleccionar un pixel arbitrario de una sección para pintar el píxel de baja resolución correspondiente, se realiza un promedio de los colores de todos los píxeles en dicha sección y se utiliza ese valor para pintar el píxel de baja resolución.

Para utilizar esta implementación, el usuario debe cargar manualmente la imagen (puede descargar la versión original haciendo clic derecho sobre la imagen en la aplicación que utiliza coherencia espacial y luego cargarla aquí). Además, es necesario ajustar el control deslizante (slider) si es necesario, para que ambas implementaciones tengan la misma resolución y así poder realizar la comparación entre ellas.

### Controles

* **Botón Seleccionar archivo**: para cargar una imagen o video
* **Slider**: define la resolución (por defecto 30, es decir 30 pixeles de baja resolución por cada lado de la cuadrícula). El mínimo valor es 1 y el máximo 150. Una resolución mayor, implica más pixeles, y por tanto, de menor tamaño cada vez. El tamaño de la cuadrícula es de 600px x 600px  por lo que una resolución de 150 implica pixeles de baja resolución de dimensiones 4px x 4px.

{{< p5-iframe sketch="/showcase/sketches/shaders/SpatialCoherence/average.js" width="650" height="750">}}

{{<details "Sketch Code">}}

``` js

let mid = 10;
let w = 20; // pixel width and height: split is in groups of 256 pixels.

let input;
let img;

let width;
let height;

let resolution;

function setup() {

    input = createFileInput(handleFile);

    resolution = createSlider(1, 150, 30, 1);
    resolution.position(100, 10);
    resolution.style('width', '150px');
    resolution.input(() => {
        w = Math.floor(600 / resolution.value());
        mid = Math.floor(w / 2);
    });

}

function draw() {

    if (img != null && img.width > 0) {

        width = 600;

        height = 600;

        input.position(2 * width, 0);

        createCanvas(2 * width, height);

        image(img, width, 0, 600, 600);
    
        fill(100);
        noStroke();
        for (let i = 0; i < width; i += w)
        {
            for (let j = 0; j < height; j += w)
            {
                square(i, j, w);
            } 
        }   
    
        let COLORS = {}
    
        for (let i = 0; i < width; i++) {
            let i_ = i + width;
            for (let j = 0; j < height; j++) {
                let color = get(i_, j);
                let key = `${Math.floor(i / w)}-${Math.floor(j / w)}`;
                if (COLORS[key] == null)
                    COLORS[key] = [];
                COLORS[key].push(color);
            }
        }
    
        for (const key in COLORS) {
            let colors = COLORS[key]
            let R = 0;
            let G = 0;
            let B = 0;
            colors.forEach((c) => {
                R += c[0];
                G += c[1];
                B += c[2];
            })
            COLORS[key] = [Math.floor(R / w**2), Math.floor(G / w**2), Math.floor(B / w**2)]
        }
    
        for (const key in COLORS) {
            fill(COLORS[key])
            let x = parseInt(key.split('-')[0])
            let y = parseInt(key.split('-')[1])
            square(x*w, y*w, w);
        }
    
    }
}

function handleFile(file) {
    if (file.type === 'image') {
      img = createImg(file.data, '');
      img.hide();
    } else {
      img = null;
    }
  }

```
{{</details >}}

## Conclusions

El uso de la técnica de coherencia espacial en el procesamiento de imágenes y gráficos tiene varias conclusiones destacadas:

Optimización de algoritmos: La coherencia espacial permite optimizar algoritmos al aprovechar la correlación y similitud entre datos espacialmente adyacentes. Esto reduce la carga computacional al evitar cálculos redundantes y mejorar la eficiencia en el procesamiento de grandes conjuntos de datos.

Mejora del rendimiento: Al reducir el número de operaciones repetitivas y optimizar el procesamiento de datos coherentes, se logra un mejor rendimiento en aplicaciones gráficas y de procesamiento de imágenes en tiempo real. Esto es especialmente valioso en situaciones donde se requiere una respuesta rápida, como en juegos, simulaciones interactivas o visualización de datos en tiempo real.

Mayor realismo y calidad visual: La coherencia espacial puede utilizarse para mejorar la calidad visual de las imágenes y gráficos generados. Al considerar la relación entre píxeles o elementos cercanos, se pueden aplicar técnicas de suavizado, iluminación global y sombreado más precisos, lo que conduce a resultados más realistas y atractivos visualmente.

Reducción de artefactos y ruido: Al aplicar la coherencia espacial en la manipulación de imágenes, se pueden reducir los artefactos y el ruido en las imágenes resultantes. Al tomar en cuenta la relación espacial entre los píxeles, se puede minimizar la distorsión y los efectos no deseados que pueden surgir al realizar operaciones de filtrado, compresión o transformación.

Flexibilidad y adaptabilidad: La técnica de coherencia espacial es aplicable en una variedad de contextos y algoritmos. Puede utilizarse en diferentes etapas del procesamiento de imágenes y gráficos, y se puede adaptar según las necesidades específicas de cada aplicación. Esto la convierte en una herramienta versátil para optimizar y mejorar diversos aspectos del procesamiento visual.

## Future work

La técnica de coherencia espacial tiene un amplio potencial en diversas áreas y se pueden vislumbrar varias aplicaciones futuras. Algunas de ellas son:

Renderizado en tiempo real: La coherencia espacial puede ser utilizada para mejorar la eficiencia y calidad del renderizado en tiempo real en videojuegos y simulaciones interactivas. Al optimizar los cálculos de iluminación, sombreado y efectos visuales basándose en la coherencia espacial, se puede lograr un mayor nivel de detalle y realismo visual sin comprometer el rendimiento.

Realidad virtual y aumentada: En el contexto de la realidad virtual y aumentada, la coherencia espacial puede ser empleada para mejorar la interacción y la integración de los objetos virtuales en el entorno real. Al considerar la relación espacial entre los objetos virtuales y el entorno físico, se pueden lograr transiciones suaves, detección precisa de colisiones y efectos visuales más realistas.

Compresión de imágenes y video: La coherencia espacial puede utilizarse para desarrollar algoritmos de compresión más eficientes y efectivos. Al aprovechar las correlaciones espaciales entre los píxeles de una imagen o fotogramas consecutivos en un video, se pueden lograr tasas de compresión más altas sin pérdida significativa de calidad visual.

Procesamiento de imágenes médicas: En el campo de la medicina, la coherencia espacial puede ser aplicada al procesamiento de imágenes médicas para mejorar la detección de anomalías y facilitar el análisis clínico. Al considerar la relación espacial entre los tejidos o estructuras en una imagen médica, se pueden desarrollar algoritmos de segmentación y análisis más precisos.

Reconocimiento de objetos y visión por computadora: En aplicaciones de visión por computadora y reconocimiento de objetos, la coherencia espacial puede ayudar a mejorar la precisión y robustez de los algoritmos. Al considerar la relación espacial entre los diferentes elementos de una escena o imagen, se pueden desarrollar modelos de reconocimiento más sólidos y capaces de manejar diversas variaciones y transformaciones.

Generación de contenido procedural: La coherencia espacial puede ser utilizada en la generación procedural de contenido, como la creación de terrenos, paisajes, texturas y objetos virtuales. Al considerar las correlaciones espaciales en la generación de detalles y características, se pueden lograr resultados más coherentes y naturales.