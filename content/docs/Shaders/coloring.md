---
title: Coloring
weight: 1
---

## Exercise
1. Figure it out the js code of the above sketches.
2. Implement other blending modes.

## Coloring


## Color Blender 

## 1. Introducción
El "color blending" o "mezcla de colores" se refiere al proceso de combinar varios colores para crear un efecto de transición suave entre ellos. Es comúnmente utilizado en el campo del diseño gráfico, la pintura, la ilustración y la fotografía digital.

## 2. Antecedentes y trabajo previo
El uso del color blending tiene antecedentes históricos y técnicos en diversas formas de arte visual. Algunos ejemplos importantes son los siguientes:

Arte tradicional: En la historia del arte, el uso de la mezcla de colores ha estado presente durante siglos. Los maestros de la pintura al óleo, como Leonardo da Vinci y Rembrandt, empleaban técnicas de mezcla de colores para lograr transiciones suaves y tonos intermedios en sus obras. Utilizaban capas de pintura superpuestas y diferentes tipos de pinceles para lograr estos efectos.

Impresión de colores: El desarrollo de la técnica de impresión a color ha contribuido al uso del color blending en la producción de imágenes impresas. Desde las primeras técnicas de impresión en relieve hasta la impresión en offset moderna, se han utilizado diferentes métodos para lograr una mezcla suave de colores. Esto incluye el uso de puntos de colores cercanos entre sí, como en la impresión de semitonos, para crear la ilusión de tonos y mezclas de colores.

Fotografía e impresión digital: Con el advenimiento de la fotografía digital y la edición de imágenes en computadoras, el color blending se ha vuelto más accesible y versátil. Los programas de edición de imágenes, como Adobe Photoshop, ofrecen una amplia gama de herramientas y técnicas para mezclar colores de manera digital. Esto permite a los artistas y diseñadores crear efectos de color más complejos y realistas en sus trabajos.

Tecnología de visualización: La tecnología de visualización también ha jugado un papel importante en el desarrollo del color blending. Los avances en pantallas de alta resolución, como las pantallas de píxeles individuales en los monitores modernos, han permitido una representación más precisa y detallada de las mezclas de colores. Esto ha sido especialmente relevante en campos como el diseño gráfico, la animación y los videojuegos.

## 3. Solución

Esta aplicación utiliza diferentes métodos de mezcla en una imagen con un color seleccionado por el usuario.

En primer lugar, la imagen cargada se representa y se envía como una textura al shader de mezcla. El shader de mezcla recibe el color seleccionado por el usuario como un arreglo de JavaScript de cuatro posiciones, donde cada entrada se divide por 255 para representar un color RGBA normalizado en el rango de 0 a 1.

El shader de mezcla toma el color de cada texel que recibe en la textura (imagen cargada y recibida) y realiza el cálculo de la mezcla con el color recibido, utilizando la fórmula correspondiente según el modo de mezcla seleccionado.

El resultado de la operación de mezcla es un color que se aplica al píxel correspondiente en la textura de salida, la cual se representa en el cuadrado de la parte inferior.

Esta textura renderizada en la parte inferior es la misma imagen cargada inicialmente, pero sus colores son el resultado de la operación de mezcla aplicada texel a texel con el color seleccionado por el usuario.

Los modos de mezcla implementados incluyen: multiplicación, suma (dodge lineal), pantalla, superposición, más oscuro, más claro, quemado de color, quemado lineal, diferencia, división, exclusión, esquivar color, luz intensa, luz vívida, luz lineal, luz de pin y cuatro versiones de luz suave: photoshop, pegtop, ilussions.hu y w3c.

Las fórmulas fueron tomadas de [Blend Modes (Wikipedia)](https://en.wikipedia.org/wiki/Blend_modes) y [Formulas for Photoshop blending modes (RBA's Astrophotography)](http://www.deepskycolors.com/archivo/2010/04/21/formulas-for-Photoshop-blending-modes.html)

Otras referencias utilizadas: [Why my texture coordinates are inverted each time I call my GLSL shader in P5.js (Stack Overflow)](https://stackoverflow.com/questions/67576655/why-my-texture-coordinates-are-inverted-each-time-i-call-my-glsl-shader-in-p5js)

{{< p5-iframe sketch="/showcase/sketches/shaders/Blending/colorBlend2.js" width="950" height="900" lib1="https://cdn.jsdelivr.net/gh/VisualComputing/p5.treegl/p5.treegl.js">}}

### Controls

* **Botón Subir archivo**: para cargar una imagen o video
* **Checkbox Video por defecto**: marcar para usar el video por defecto, desmarcar para usar la imagen por defecto
* **Slider**: controla el brillo
* **Selector**: selecciona el blending mode que desea utilizar
* **Color Picker**: selecciona el color que se usará en la mezcla para cada pixel del archivo cargado

{{< p5-iframe sketch="/showcase/sketches/shaders/Blending/blend.js" width="950" height="900" lib1="https://cdn.jsdelivr.net/gh/VisualComputing/p5.treegl/p5.treegl.js">}}

## Código

{{<details "Sketch Code">}}

``` js

let blendShader;
let colorB; // picked by user
let B; // vec4 vector sent to shader
let tex; // shader output texture
let cpickerB;
let bslider; // brightness slider
let bmselect; // blending mode select
let brightness;
let mode;
let img; // shader input texture
let input;
let video_on;

function preload() {
  blendShader = readShader('/showcase/docs/Shaders/fragments/blend.frag', { matrices: Tree.NONE, varyings: Tree.texcoords2 });
}

function setup() {

  createCanvas(900, 850, WEBGL);
  
  colorB = color(10, 255, 170);
  
  tex = createGraphics(800, 800, WEBGL);
  
  cpickerB = createColorPicker(colorB);
  cpickerB.position(100, 600);

  bslider = createSlider(0, 1, 1, 0.05);
  bslider.position(200, 600);
  bslider.style('width', '80px');

  bmselect = createSelect();
  bmselect.position(300, 600);
  bmselect.option('MULTIPLY', 0);
  bmselect.option('ADD (LINEAR DODGE)', 1);
  bmselect.option('SCREEN', 2);
  bmselect.option('OVERLAY', 3);
  bmselect.option('DARKEST', 4);
  bmselect.option('LIGHTEST', 5);
  bmselect.option('COLOR BURN', 6);
  bmselect.option('LINEAR BURN', 7);
  bmselect.option('DIFFERENCE', 8);
  bmselect.option('DIVIDE', 9);
  bmselect.option('EXCLUSION', 10);
  bmselect.option('COLOR DODGE', 11);
  bmselect.option('HARD LIGHT', 12);
  bmselect.option('VIVID LIGHT', 13);
  bmselect.option('LINEAR LIGHT', 14);
  bmselect.option('PIN LIGHT', 15);
  bmselect.option('SOFT LIGHT 1', 16); // photoshop
  bmselect.option('SOFT LIGHT 2', 17); // pegtop
  bmselect.option('SOFT LIGHT 3', 18); // ilussions.hu
  bmselect.option('SOFT LIGHT 4', 19); // w3C
  bmselect.selected('MULTIPLY');

  img = loadImage('/showcase/docs/Shaders/resources/coloring.jpg');
  input = createFileInput(handleFile);

  video_on = createCheckbox('default video', false);
  video_on.changed(() => {
    if (video_on.checked()) {
      img = createVideo(['/showcase/docs/Shaders/resources/coloring.mp4']);
      img.hide();
      img.loop();
    } else {
      img = loadImage('/showcase/docs/Shaders/resources/coloring.jpg');
      img.hide();     
      img.pause();
    }
    blendShader.setUniform('texture', img);
  })
}

function draw() {
 
  colorB = cpickerB.color()
  
  background(255);
  
  image(img, -450, -400, 400, 400); 

  
  // vec4 vector sent to shader
  B = [colorB._getRed() / 255, colorB._getGreen() / 255, colorB._getBlue() / 255, alpha(colorB) / 255] // normalized
  
  brightness = bslider.value();
  mode = bmselect.value();

  tex.shader(blendShader)
  blendShader.setUniform('texture', img); // each texel will be color A
  blendShader.setUniform('colorB', B); 
  blendShader.setUniform('brightness', brightness); 
  blendShader.setUniform('mode', mode); 
  tex.square();
  texture(tex);
  square(-450, -400, 800);
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
  }
}

```
{{</details >}}

{{<details "Blend Shader">}}

``` glsl

precision mediump float;

uniform vec4 colorB;
uniform float brightness; // [0, 1]
uniform int mode;
uniform sampler2D texture;
varying vec2 texcoords2;

void main() {

  // https://stackoverflow.com/questions/67576655/why-my-texture-coordinates-are-inverted-each-time-i-call-my-glsl-shader-in-p5js
  vec4 colorA = texture2D(texture, vec2(texcoords2.x, 1.0 - texcoords2.y)); // each texel is color A

  if (mode == 0) { // multiply
    gl_FragColor = colorA * colorB * brightness;
  }
  else if (mode == 1) { // add (linear dodge)
    gl_FragColor = (colorA + colorB) * brightness;
  }
  else if (mode == 2) { // screen
    gl_FragColor = (1. - (1. - colorA) * (1. - colorB)) * brightness;
  }
  else if (mode == 3) { // overlay
    float R = (colorA[0] < 0.5) ? 2. * colorA[0] * colorB[0] : (1. - (1. - colorA[0]) * (1. - colorB[0]));
    float G = (colorA[1] < 0.5) ? 2. * colorA[1] * colorB[1] : (1. - (1. - colorA[1]) * (1. - colorB[1]));
    float B = (colorA[2] < 0.5) ? 2. * colorA[2] * colorB[2] : (1. - (1. - colorA[2]) * (1. - colorB[2]));
    float A = (colorA[3] < 0.5) ? 2. * colorA[3] * colorB[3] : (1. - (1. - colorA[3]) * (1. - colorB[3]));
    gl_FragColor = vec4(R, G, B, A) * brightness;
  }
  else if (mode == 4) { // darkest
    gl_FragColor = vec4(min(colorA[0], colorB[0]), 
                        min(colorA[1], colorB[1]), 
                        min(colorA[2], colorB[2]), 
                        min(colorA[3], colorB[3])) * brightness;
  }
  else if (mode == 5) { // lightest
    gl_FragColor = vec4(max(colorA[0], colorB[0]), 
                        max(colorA[1], colorB[1]), 
                        max(colorA[2], colorB[2]), 
                        max(colorA[3], colorB[3])) * brightness;
  }
  else if (mode == 6) { // color burn
    gl_FragColor = 1. - ((1. - colorA) / colorB) * brightness;
  }
  else if (mode == 7) { // linear burn
    gl_FragColor = (colorA + colorB - 1.) * brightness;
  }
  else if (mode == 8) { // difference
    gl_FragColor = (abs(colorA - colorB)) * brightness;
  }
  else if (mode == 9) { // divide
    gl_FragColor = (colorA / colorB) * brightness;
  }
  else if (mode == 10) { // exclusion
    gl_FragColor = (0.5 - 2. * (colorA - 0.5) * (colorB - 0.5)) * brightness;
  }
  else if (mode == 11) { // color dodge
    gl_FragColor = (colorA / (1. - colorB)) * brightness;
  }
  else if (mode == 12) { // hard light
    float R = (colorB[0] > 0.5) ? (1. - (1. - colorA[0]) * (1. - 2. * (colorB[0] - 0.5))) : colorA[0] * 2. * colorB[0];
    float G = (colorB[1] > 0.5) ? (1. - (1. - colorA[1]) * (1. - 2. * (colorB[1] - 0.5))) : colorA[1] * 2. * colorB[1];
    float B = (colorB[2] > 0.5) ? (1. - (1. - colorA[2]) * (1. - 2. * (colorB[2] - 0.5))) : colorA[2] * 2. * colorB[2];
    float A = (colorB[3] > 0.5) ? (1. - (1. - colorA[3]) * (1. - 2. * (colorB[3] - 0.5))) : colorA[3] * 2. * colorB[3];
    gl_FragColor = vec4(R, G, B, A) * brightness;
  }
  else if (mode == 13) { // vivid light
    float R = (colorB[0] > 0.5) ? colorA[0] / (1. - 2. * (colorB[0] - 0.5)) : (1. - (1. - colorA[0]) / (2. * colorB[0]));
    float G = (colorB[1] > 0.5) ? colorA[1] / (1. - 2. * (colorB[1] - 0.5)) : (1. - (1. - colorA[1]) / (2. * colorB[1]));
    float B = (colorB[2] > 0.5) ? colorA[2] / (1. - 2. * (colorB[2] - 0.5)) : (1. - (1. - colorA[2]) / (2. * colorB[2]));
    float A = (colorB[3] > 0.5) ? colorA[3] / (1. - 2. * (colorB[3] - 0.5)) : (1. - (1. - colorA[3]) / (2. * colorB[3]));
    gl_FragColor = vec4(R, G, B, A) * brightness;
  }
  else if (mode == 14) { // vivid light
    float R = (colorB[0] > 0.5) ? colorA[0] + 2. * (colorB[0] - 0.5) : (colorA[0] + 2. * colorB[0] - 1.);
    float G = (colorB[1] > 0.5) ? colorA[1] + 2. * (colorB[1] - 0.5) : (colorA[1] + 2. * colorB[1] - 1.);
    float B = (colorB[2] > 0.5) ? colorA[2] + 2. * (colorB[2] - 0.5) : (colorA[2] + 2. * colorB[2] - 1.);
    float A = (colorB[3] > 0.5) ? colorA[3] + 2. * (colorB[3] - 0.5) : (colorA[3] + 2. * colorB[3] - 1.);
    gl_FragColor = vec4(R, G, B, A) * brightness;
  }
  else if (mode == 15) { // pin light
    float R = (colorB[0] > 0.5) ? max(colorA[0], 2. * (colorB[0] - 0.5)) : min(colorA[0], 2. * colorB[0]);
    float G = (colorB[1] > 0.5) ? max(colorA[1], 2. * (colorB[1] - 0.5)) : min(colorA[1], 2. * colorB[1]);
    float B = (colorB[2] > 0.5) ? max(colorA[2], 2. * (colorB[2] - 0.5)) : min(colorA[2], 2. * colorB[2]);
    float A = (colorB[3] > 0.5) ? max(colorA[3], 2. * (colorB[3] - 0.5)) : min(colorA[3], 2. * colorB[3]);
    gl_FragColor = vec4(R, G, B, A) * brightness;    
  }
  else if (mode == 16) { // soft light photoshop
    float R = (colorB[0] < 0.5) ? 2. * colorA[0] * colorB[0] + colorA[0] * colorA[0] * (1. - 2. * colorB[0]) : 2. * colorA[0] * (1. - colorB[0]) + sqrt(colorA[0]) * (2. * colorB[0] - 1.);
    float G = (colorB[1] < 0.5) ? 2. * colorA[1] * colorB[1] + colorA[1] * colorA[1] * (1. - 2. * colorB[1]) : 2. * colorA[1] * (1. - colorB[1]) + sqrt(colorA[1]) * (2. * colorB[1] - 1.);
    float B = (colorB[2] < 0.5) ? 2. * colorA[2] * colorB[2] + colorA[2] * colorA[2] * (1. - 2. * colorB[2]) : 2. * colorA[2] * (1. - colorB[2]) + sqrt(colorA[2]) * (2. * colorB[2] - 1.);
    float A = (colorB[3] < 0.5) ? 2. * colorA[3] * colorB[3] + colorA[3] * colorA[3] * (1. - 2. * colorB[3]) : 2. * colorA[3] * (1. - colorB[3]) + sqrt(colorA[3]) * (2. * colorB[3] - 1.);
    gl_FragColor = vec4(R, G, B, A) * brightness;
  }
  else if (mode == 17) { // soft light pegtop
    gl_FragColor = ((1. - (2. * colorB)) * (colorA * colorA) + (2. * colorB * colorA)) * brightness;
  }
  else if (mode == 18) { // soft light illusions.hu
    float R = pow(colorA[0], pow(2., 2. * (0.5 - colorB[0])));
    float G = pow(colorA[1], pow(2., 2. * (0.5 - colorB[1])));
    float B = pow(colorA[2], pow(2., 2. * (0.5 - colorB[2])));
    float A = pow(colorA[3], pow(2., 2. * (0.5 - colorB[3])));
    gl_FragColor = vec4(R, G, B, A) * brightness;
  }
  else if (mode == 19) { // soft-light w3c
    float gRa = (colorA[0] <= 0.25) ? ((16. * colorA[0] - 12.) * colorA[0] + 4.) * colorA[0] : sqrt(colorA[0]); 
    float gGa = (colorA[1] <= 0.25) ? ((16. * colorA[1] - 12.) * colorA[1] + 4.) * colorA[1] : sqrt(colorA[1]); 
    float gBa = (colorA[2] <= 0.25) ? ((16. * colorA[2] - 12.) * colorA[2] + 4.) * colorA[2] : sqrt(colorA[2]); 
    float gAa = (colorA[3] <= 0.25) ? ((16. * colorA[3] - 12.) * colorA[3] + 4.) * colorA[3] : sqrt(colorA[3]);

    float R = (colorB[0] <= 0.5) ? colorA[0] - (1. - 2. * colorB[0]) * colorA[0] * (1. - colorA[0]) : colorA[0] + (2. * colorB[0] - 1.) * (gRa - colorA[0]);
    float G = (colorB[1] <= 0.5) ? colorA[1] - (1. - 2. * colorB[1]) * colorA[1] * (1. - colorA[1]) : colorA[1] + (2. * colorB[1] - 1.) * (gGa - colorA[1]);
    float B = (colorB[2] <= 0.5) ? colorA[2] - (1. - 2. * colorB[2]) * colorA[2] * (1. - colorA[2]) : colorA[2] + (2. * colorB[2] - 1.) * (gBa - colorA[2]);
    float A = (colorB[3] <= 0.5) ? colorA[3] - (1. - 2. * colorB[3]) * colorA[3] * (1. - colorA[3]) : colorA[3] + (2. * colorB[3] - 1.) * (gAa - colorA[3]);

    gl_FragColor = vec4(R, G, B, A) * brightness;

  }
  // http://www.deepskycolors.com/archivo/2010/04/21/formulas-for-Photoshop-blending-modes.html
}

```

{{</details >}}

## 4. Conclusiones

Al considerar el uso de la técnica de color blending, se pueden extraer las siguientes conclusiones:

Transiciones suaves: El color blending es una técnica efectiva para lograr transiciones suaves entre colores, lo que permite crear efectos visuales atractivos y realistas. Esto es especialmente útil en campos como el diseño gráfico, la ilustración y la fotografía, donde se busca suavizar las transiciones y lograr mezclas armoniosas.

Versatilidad creativa: El color blending brinda a los artistas y diseñadores una herramienta versátil para la expresión creativa. Permite la combinación de diferentes tonalidades, la creación de sombras y luces graduales, así como la posibilidad de generar degradados y efectos de mezcla únicos. Esto amplía las opciones disponibles para la creación de obras visuales y permite explorar diferentes estilos y efectos.

Realismo y profundidad: Al utilizar el color blending de manera adecuada, es posible lograr una mayor sensación de realismo y profundidad en una imagen. Al mezclar colores de forma gradual y natural, se pueden crear efectos de sombreado, iluminación y texturas que añaden una mayor sensación de volumen y detalle a la representación visual.

Herramientas digitales: Con el avance de la tecnología y las herramientas digitales, el color blending se ha vuelto aún más accesible y poderoso. Los programas de edición de imágenes y diseño gráfico ofrecen una amplia gama de herramientas y opciones para controlar y ajustar la mezcla de colores de manera precisa y flexible. Esto permite a los artistas y diseñadores tener un mayor control sobre el proceso creativo y obtener resultados más precisos y personalizados.

## 5. Trabajo a futuro

Considerando las tendencias actuales y posibles aplicaciones futuras, se pueden vislumbrar las siguientes oportunidades para el color blending:

Realidad aumentada y virtual: El color blending podría desempeñar un papel importante en la integración de elementos virtuales con el entorno real en aplicaciones de realidad aumentada y virtual. Al utilizar técnicas de mezcla de colores más avanzadas y precisas, se podrían lograr transiciones más suaves y efectos de integración más realistas entre objetos virtuales y el mundo real.

Diseño de interfaces y experiencias de usuario: El color blending puede ser una herramienta poderosa en el diseño de interfaces y experiencias de usuario más inmersivas y atractivas. Al combinar colores de manera fluida y sutil, se pueden crear efectos visuales sofisticados que mejoren la usabilidad y la estética de las aplicaciones y los sitios web.

Animación y efectos visuales: En el campo de la animación y los efectos visuales, el color blending seguirá siendo relevante. Con la creciente demanda de efectos visuales de alta calidad en películas, series, videojuegos y publicidad, el control preciso sobre la mezcla de colores permitirá lograr transiciones y efectos más suaves y realistas en las animaciones y escenas visuales.

Generación de arte generativo: El color blending podría ser utilizado en técnicas de arte generativo, donde algoritmos y sistemas de inteligencia artificial crean obras de arte de forma autónoma. Al permitir la mezcla de colores de manera dinámica y creativa, se podrían generar composiciones visuales únicas y sorprendentes, explorando nuevas posibilidades artísticas.

Diseño de productos y moda: En el diseño de productos y moda, el color blending puede ser utilizado para crear combinaciones de colores atractivas y modernas. Al suavizar las transiciones entre tonos y lograr degradados armoniosos, se pueden diseñar productos y prendas de vestir visualmente atractivos que reflejen las últimas tendencias de color.