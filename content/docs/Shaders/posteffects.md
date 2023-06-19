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

## 2. Antecedentes y trabajo previo

Buenas noches.

## 3. Solución [Brightness & Tinting]



### Controles

{{< p5-iframe sketch="/showcase/sketches/shaders/postmalone/postman.js" width="800" height="650" lib1="https://cdn.jsdelivr.net/gh/VisualComputing/p5.treegl/p5.treegl.js">}}



{{<details "Sketch Code">}}

``` js
let image_pg, noiseWarp_pg, godrays_pg;
let imageTexture, noiseWarpShader, godraysShader;
let noiseScale, noiseStrength, godraysIntensity;

function preload() {
  imageTexture = loadImage('/showcase/content/sketches/shaders/postmalone/post.jpg');
  noiseWarpShader = loadShader('/showcase/content/docs/Shaders/fragments/noiseWarpShader.frag');
  godraysShader = loadShader('/showcase/content/docs/Shaders/fragments/godraysShader.frag');
}

function setup() {
  createCanvas(600, 600, WEBGL);
  image_pg = createGraphics(width, height, WEBGL);
  noiseWarp_pg = createGraphics(width, height, WEBGL);
  godrays_pg = createGraphics(width, height, WEBGL);
  
  noiseScale = createSlider(0.001, 0.1, 0.01, 0.001);
  noiseScale.position(width - 120, 10);
  noiseScale.style('width', '80px');
  noiseScale.input(() => {
    noiseWarpShader.setUniform('noiseScale', noiseScale.value());
  });
  noiseWarpShader.setUniform('noiseScale', noiseScale.value());
  
  noiseStrength = createSlider(0.1, 10, 2, 0.1);
  noiseStrength.position(width - 120, 35);
  noiseStrength.style('width', '80px');
  noiseStrength.input(() => {
    noiseWarpShader.setUniform('noiseStrength', noiseStrength.value());
  });
  noiseWarpShader.setUniform('noiseStrength', noiseStrength.value());
  
  godraysIntensity = createSlider(0.0, 1.0, 0.5, 0.01);
  godraysIntensity.position(width - 120, 60);
  godraysIntensity.style('width', '80px');
  godraysIntensity.input(() => {
    godraysShader.setUniform('godraysIntensity', godraysIntensity.value());
  });
  godraysShader.setUniform('godraysIntensity', godraysIntensity.value());
}

function draw() {
  image_pg.background(0);
  image_pg.textureMode(NORMAL);
  image_pg.shader();
  image_pg.image(imageTexture, -width / 2, -height / 2, width, height);
  
  noiseWarp_pg.shader(noiseWarpShader);
  noiseWarpShader.setUniform('image', image_pg);
  noiseWarpShader.setUniform('resolution', [width, height]);
  noiseWarp_pg.rect(-width / 2, -height / 2, width, height);
  
  godrays_pg.shader(godraysShader);
  godraysShader.setUniform('image', noiseWarp_pg);
  godraysShader.setUniform('resolution', [width, height]);
  godrays_pg.rect(-width / 2, -height / 2, width, height);
  
  // Display final result
  image(godrays_pg, 0, 0);
}


```

{{</details >}}

{{<details "NoiseWarp Shader">}}

```glsl
#ifdef GL_ES
precision mediump float;
#endif

uniform sampler2D image;
uniform vec2 resolution;
uniform float noiseScale;
uniform float noiseStrength;

varying vec2 vTexCoord;

// 2D Random
float random(vec2 p) {
  return fract(sin(dot(p, vec2(12.9898, 78.233))) * 43758.5453);
}

void main() {
  vec2 uv = vTexCoord.xy;
  vec2 p = uv * resolution.xy / noiseScale;

  float distortion = noiseStrength * (random(p) - 0.5);
  vec2 distortedUV = uv + vec2(distortion);

  vec4 color = texture2D(image, distortedUV);
  gl_FragColor = color;
}


```

{{</details >}}

{{<details "GODrays Shader">}}

```glsl
#ifdef GL_ES
precision mediump float;
#endif

uniform sampler2D image;
uniform vec2 resolution;
uniform float godraysIntensity;

varying vec2 vTexCoord;

void main() {
  vec2 uv = vTexCoord.xy;
  vec2 screenPos = uv * resolution;
  vec2 delta = 1.0 / resolution;

  float weight = 1.0;
  vec4 sum = vec4(0.0);
  vec4 currentColor = texture2D(image, uv);

  for (int i = 0; i < 50; i++) {
    screenPos -= delta * 0.1;
    vec4 sample = texture2D(image, screenPos);
    sample *= weight;
    sum += sample;
    weight *= godraysIntensity;
  }

  vec4 godrayColor = sum * 0.05;
  vec4 finalColor = mix(currentColor, godrayColor, godraysIntensity);

  gl_FragColor = finalColor;
}


```

{{</details >}}