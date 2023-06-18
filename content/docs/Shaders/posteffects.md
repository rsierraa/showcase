---
title: Post Effects
weight: 2
---
## Exercise
1. Implement other coloring brightness tools such as HSV value V, HSL lightness L or Component average.
2. Implement texture tinting by mixing color and texel interpolated data.


**1. Introducción y contexto**

El mapeo de texturas en transportar una textura (una imágen) a una superficie dibujada. Usualmente, para cubrir de la manera más eficiente distintas formas geométricas, se utiliza el mapeo a triángulos, por lo que se implementa la interpolación con coordenadas baricéntricas para lograr tal efecto.

{{< hint info >}}
https://www.scratchapixel.com/lessons/3d-basic-rendering/ray-tracing-rendering-a-triangle/barycentric-coordinates.html#:~:text=In%20other%20words%2C%20barycentric%20coordinates,normal%20at%20the%20intersection%20point.
{{< /hint >}}


## Brightness & Tinting



### Controles

* **Botón Choose File**: para cargar una imagen o video
* **Checkbox Default Video**: marcar para usar el video por defecto, desmarcar para usar la imagen por defecto
* **Select**: selecciona entre original, luma, value, lightness, intensity o tinting
* **Select (Blending Mode)**: selecciona el blending mode que desea utilizar (visible cuando se selecciona tinting)
* **Slider**: controla el brillo (visible cuando se selecciona tinting)
* **Color Pickers**: para seleccionar los colores que se aplicarán en el tinting


{{< p5-iframe sketch="/showcase/sketches/shaders/postmalone/postman.js" width="800" height="650" lib1="https://cdn.jsdelivr.net/gh/VisualComputing/p5.treegl/p5.treegl.js">}}

{{<details "Sketch Code">}}

``` js
let lol = 3

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

```

{{</details >}}