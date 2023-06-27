---
title: Texturing
weight: 2
---
## Exercise
1. Implement other coloring brightness tools such as HSV value V, HSL lightness L or Component average.
2. Implement texture tinting by mixing color and texel interpolated data.

## Texturing

## 1. Introducción y contexto

El mapeo de texturas en transportar una textura (una imágen) a una superficie dibujada. Usualmente, para cubrir de la manera más eficiente distintas formas geométricas, se utiliza el mapeo a triángulos, por lo que se implementa la interpolación con coordenadas baricéntricas para lograr tal efecto.

{{< hint info >}}
https://www.scratchapixel.com/lessons/3d-basic-rendering/ray-tracing-rendering-a-triangle/barycentric-coordinates.html#:~:text=In%20other%20words%2C%20barycentric%20coordinates,normal%20at%20the%20intersection%20point.
{{< /hint >}}

## 2. Antecedentes y trabajo previo

 A lo largo de los años, se han desarrollado diferentes técnicas y algoritmos para generar y aplicar texturas a imágenes digitales. Algunos de los enfoques y avances más destacados son los siguientes:

Mapeo de texturas: Uno de los primeros enfoques para aplicar texturas a objetos 3D fue el mapeo de texturas. Esta técnica consiste en asignar una imagen bidimensional a la superficie de un objeto tridimensional, lo que permite simular la apariencia de texturas en la renderización de gráficos por computadora. El mapeo de texturas ha sido ampliamente utilizado en industrias como los videojuegos y la animación por computadora.

Síntesis de texturas: La síntesis de texturas se refiere a la generación de nuevas texturas a partir de una o varias muestras de textura existentes. Los algoritmos de síntesis de texturas se basan en la extracción de características estadísticas de las muestras y su posterior generación para crear texturas coherentes y realistas. Algunos métodos populares incluyen los campos aleatorios de Markov, la transformada Wavelet y los modelos de fractales.

Texturización basada en imágenes: La texturización basada en imágenes implica la transferencia de texturas de una imagen de origen a una imagen de destino. Esto puede ser útil, por ejemplo, para aplicar el estilo de una pintura a una fotografía o para transferir las características de textura de una imagen a otra. Algoritmos como el mapeo de coordenadas y la fusión de regiones se han utilizado para realizar esta tarea.

Texturización procedural: La texturización procedural consiste en generar texturas de forma algorítmica, sin la necesidad de utilizar muestras de textura existentes. Se basa en el uso de funciones y operaciones matemáticas para generar patrones de textura complejos y detallados. Esto permite la creación de texturas personalizadas y la generación de variaciones infinitas. Algunas técnicas comunes en la texturización procedural incluyen el ruido fractal, los algoritmos de Voronoi y los generadores de patrones.

Aprendizaje profundo para la texturización: En los últimos años, el uso de técnicas de aprendizaje profundo, como las redes neuronales convolucionales, ha demostrado ser prometedor en el campo de la texturización. Estos enfoques permiten aprender características y estilos de textura a partir de grandes conjuntos de datos, lo que facilita la generación de texturas realistas y la transferencia de estilos de manera más precisa.

## 3. Solución [Brightness & Tinting]

El ejercicio se compone de dos partes: La primera consiste en la visualización de la iluminación de la imagen y la segunda es la aplicación de tinting sobre la imagen utilizando diferentes blending modes.

La iluminación se implementó con un brightness shader usando las siguientes cuatro métricas: luma, value (HSV), lightness (HSL) e intensidad (HSI).

Para cada texel se calcula la métrica indicada y ese valor (normalizado [0..1]) se aplica sobre un vector vec4 en el shader para pintar cada pixel, de manera que la visualización es en escala de grises. 

Para el tinting, desde el sketch, se dibuja un rectángulo sobre la imagen cargada. Cada uno de los cuatro vertices tiene un color asociado que puede ser seleccionado por el usuario. Estos valores le sirven al vertex shader para hacer la interpolación de los colores de los pixeles de todo el rectángulo.

El tinting shader recibe interpoladas las coordernadas de la imagen cargada (texcoords2) y el color (color4) interpolado desde el vertex shader. Con esas dos variables, el tinting shader aplica el blending mode seleccionado. El color A es el color del texel cuyas coordenadas son texcoords2 y el color B es el color que llegó interpolado desde el vertex shader.

Al aplicar la operación texel a texel, el color resultante se va pintando, y la imagen queda tinturada con el blending mode aplicado.

Los blending modes aplicados son los mismos vistos en **Coloring**.

### Controless

* **Botón Choose File**: para cargar una imagen o video
* **Checkbox Default Video**: marcar para usar el video por defecto, desmarcar para usar la imagen por defecto
* **Select**: selecciona entre original, luma, value, lightness, intensity o tinting
* **Select (Blending Mode)**: selecciona el blending mode que desea utilizar (visible cuando se selecciona tinting)
* **Slider**: controla el brillo (visible cuando se selecciona tinting)
* **Color Pickers**: para seleccionar los colores que se aplicarán en el tinting


{{< p5-iframe sketch="/showcase/sketches/shaders/texturing/brightness.js" width="800" height="650" lib1="https://cdn.jsdelivr.net/gh/VisualComputing/p5.treegl/p5.treegl.js">}}

{{<details "Sketch Code">}}

``` js

let brightnessShader;
let tintingShader;
let img;
let input;
let mode;
let lmselect; // lightness mode select

let colorA;
let colorB;
let colorC;
let colorD;

let cpcikerA;
let cpcikerB;
let cpcikerC;
let cpcikerD;

let bmselect; // blending mode select
let bmode;

let bslider; // brightness slider

let video_on;

function preload() {

  brightnessShader = readShader('/showcase/docs/Shaders/fragments/brightness.frag', { varyings: Tree.texcoords2 });
  tintingShader = readShader('/showcase/docs/Shaders/fragments/tinting.frag', { varyings: [Tree.texcoords2 | Tree.color4] });

}

function setup() {

  createCanvas(700, 500, WEBGL);
  noStroke();
  textureMode(NORMAL);

  lmselect = createSelect();
  lmselect.position(10, 10);
  lmselect.option('original', 0);
  lmselect.option('luma', 1);
  lmselect.option('value', 2);
  lmselect.option('lightness', 3);
  lmselect.option('intensity', 4);
  lmselect.option('tinting', 5);
  lmselect.selected('original');

  img = loadImage('/showcase/docs/Shaders/resources/fire_breathing.png');
  input = createFileInput(handleFile);

  colorA = "red";
  colorB = "green";
  colorC = "blue";
  colorD = "yellow";

  cpickerA = createColorPicker(colorA);
  cpickerA.position(20, 40);
  cpickerA.hide();

  cpickerB = createColorPicker(colorB);
  cpickerB.position(640, 40);
  cpickerB.hide();

  cpickerC = createColorPicker(colorC);
  cpickerC.position(20, 440);
  cpickerC.hide();

  cpickerD = createColorPicker(colorD);
  cpickerD.position(640, 440);
  cpickerD.hide();

  bslider = createSlider(0, 1, 1, 0.05);
  bslider.position(280, 10);
  bslider.style('width', '80px');
  bslider.hide();

  bmselect = createSelect();
  bmselect.position(100, 10);
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

  bmselect.hide();

  video_on = createCheckbox('default video', false);
  video_on.changed(() => {
    if (video_on.checked()) {
      img = createVideo(['/showcase/docs/Shaders/resources/video0.mp4']);
      img.hide();
      img.loop();
    } else {
      img = loadImage('/showcase/docs/Shaders/resources/fire_breathing.png');
      img.hide();
      img.pause();
    }
    blendShader.setUniform('texture', img);
    tintingShader.setUniform('texture', img);
  })

}

function draw() {
  background(0);

  image(img, 0, 0, 700, 500); 
  
  mode = lmselect.value()

  if (mode == 5) {

    cpickerA.show();
    colorA = cpickerA.color()

    cpickerB.show();
    colorB = cpickerB.color()
  
    cpickerC.show();
    colorC = cpickerC.color()

    cpickerD.show();
    colorD = cpickerD.color()

    bmselect.show();
    bmode = bmselect.value();

    bslider.show();
    brightness = bslider.value();

    shader(tintingShader);

    beginShape();
    fill(colorA);
    vertex(-width / 2, -height / 2);
    fill(colorB);
    vertex(width / 2, -height / 2);
    fill(colorC);
    vertex(width / 2, height / 2);
    fill(colorD);
    vertex(-width / 2, height / 2);
    endShape();
  
    tintingShader.setUniform('brightness', brightness); 
    tintingShader.setUniform('mode', bmode); 
    tintingShader.setUniform('texture', img);

  } 
  else {

    cpickerA.hide();
    cpickerB.hide();
    cpickerC.hide();
    cpickerD.hide();
    bmselect.hide();
    bslider.hide();

    shader(brightnessShader);

    brightnessShader.setUniform('texture', img);
    brightnessShader.setUniform('mode', mode);
  }

  quad(-width / 2, -height / 2, width / 2, -height / 2, width / 2, height / 2, -width / 2, height / 2);

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

function randomint(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1) + min);
}

```
{{</details >}}

{{<details "Brightness Shader">}}

```glsl
precision mediump float;

uniform int mode;
uniform sampler2D texture;

varying vec2 texcoords2;

float luma(vec3 texel) {
    return 0.299 * texel.r + 0.587 * texel.g + 0.114 * texel.b;
}

float value(vec3 texel) {
    return max(texel.r, max(texel.g, texel.b));
}

float lightness(vec3 texel) {
    float M = max(texel.r, max(texel.g, texel.b));
    float m = min(texel.r, min(texel.g, texel.b));
    return 0.5 * (M + m);
}

float intensity(vec3 texel) {
    return (1. / 3.) * (texel.r + texel.g + texel.b);
}

void main() {

    vec4 texel = texture2D(texture, texcoords2);

    if (mode == 1) {
        gl_FragColor = vec4((vec3(luma(texel.rgb))), 1.0);
    }
    else if (mode == 2) {
        gl_FragColor = vec4((vec3(value(texel.rgb))), 1.0);
    }
    else if (mode == 3) {
        gl_FragColor = vec4((vec3(lightness(texel.rgb))), 1.0);
    }
    else if (mode == 4) {
        gl_FragColor = vec4((vec3(intensity(texel.rgb))), 1.0);
    }
    else {
        gl_FragColor = texel;
    }
}
```

{{</details >}}

{{<details "Tinting Shader">}}

```glsl
precision mediump float;

uniform sampler2D texture;
uniform int mode;
uniform float brightness;

varying vec2 texcoords2;
varying vec4 color4;


void main() {

    vec4 texel = texture2D(texture, texcoords2);
    vec4 colorA = texel;
    vec4 colorB = color4;

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
}
```

{{</details >}}

## 4. Conclusiones

1. El texturizado es una técnica fundamental en el procesamiento de imágenes y video que permite aplicar efectos visuales interesantes y realistas a través de la manipulación de texturas.

2. Los antecedentes y el trabajo previo en texturizado han demostrado una amplia gama de aplicaciones en campos como la animación, los videojuegos, la realidad virtual y aumentada, entre otros.

3. El código presentado en este trabajo muestra cómo se puede implementar el texturizado utilizando shaders en un entorno de programación. La combinación de shaders de brillo y tintado permite ajustar la luminosidad y aplicar colores personalizados a una imagen o video en tiempo real.

4. El trabajo presenta una interfaz de usuario intuitiva que permite al usuario seleccionar diferentes modos de luminosidad, modos de mezcla de colores, brillo y cargar imágenes o videos para aplicar los efectos de texturizado.

5. La aplicación del texturizado a través de shaders proporciona un enfoque flexible y eficiente para procesar imágenes y videos en tiempo real, lo que puede ser especialmente útil en aplicaciones interactivas y en tiempo real como juegos y aplicaciones multimedia.

6. A través de la experimentación con el código presentado, se puede observar cómo diferentes configuraciones de modos de luminosidad, colores y brillo pueden afectar la apariencia de la imagen o video, lo que permite una amplia gama de posibilidades creativas en el texturizado.

## 5. Trabajo a futuro

1. Mejora de algoritmos de texturizado: Se puede investigar y desarrollar nuevos algoritmos y técnicas de texturizado que permitan una mayor calidad y realismo en la aplicación de texturas. Esto puede incluir métodos de mapeo de texturas más precisos, técnicas de suavizado y blending mejoradas, generación procedural de texturas, entre otros.

2. Generación automática de texturas: Explorar la generación automática de texturas basada en parámetros y características específicas. Esto podría implicar el desarrollo de algoritmos que generen texturas realistas y coherentes a partir de imágenes de referencia, permitiendo una mayor flexibilidad en la creación y aplicación de texturas.

3. Texturizado basado en análisis de contenido: Investigar y desarrollar técnicas que utilicen análisis de contenido de la imagen o el objeto a texturizar para adaptar la aplicación de texturas de manera más inteligente. Esto puede incluir la detección de características y patrones relevantes en la imagen y su aplicación en áreas específicas, teniendo en cuenta la forma y la estructura del objeto.

4. Herramientas interactivas de texturizado: Crear herramientas interactivas y amigables para el usuario que permitan una edición y manipulación intuitiva de las texturas aplicadas. Esto podría incluir características como la pintura directa sobre la superficie del objeto, la selección y manipulación de regiones de textura, y la visualización en tiempo real de los cambios aplicados.

5. Texturizado en tiempo real: Investigar y desarrollar técnicas que permitan el texturizado en tiempo real de objetos en movimiento o escenas dinámicas. Esto podría ser útil en aplicaciones como animación, juegos y realidad virtual, donde se requiere una actualización continua de las texturas para mantener la coherencia visual.

6. Texturizado basado en inteligencia artificial: Explorar la aplicación de técnicas de inteligencia artificial, como el aprendizaje automático y las redes neuronales, para mejorar el proceso de texturizado. Esto podría incluir el entrenamiento de modelos que generen automáticamente texturas realistas o la optimización de los parámetros de texturizado basados en análisis de grandes conjuntos de datos.

Estas son solo algunas ideas para el trabajo a futuro en el campo del texturizado. La elección dependerá de tus intereses, recursos disponibles y objetivos específicos de aplicación.