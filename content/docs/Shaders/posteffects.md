---
title: Post Effects
weight: 2
---
## Exercise
1. Implement some posteffects you find interesting.


**1. Introducción y contexto**

Un shader es básicamente un programa que realiza cálculos matemáticos, con el propósito de materializar efectos gráficos deseados. Siendo los cálculos realizados por una computadora (generalmente una GPU), y los efectos añadidos, por lo general, a un programa más grande que demuestra gráficos.

{{< hint info >}}
https://en.wikipedia.org/wiki/Shader
{{< /hint >}}


## God Rays Shader

Un shader de God Rays es, como su nombre lo dice, un efecto que añade rayos de luz luminosos sobre una imágen. Por lo general el efecto incluye algún modo de fusionar el efecto de luz con el fondo, para lograr que se vea como luz sobre la imágen y no simplemente como una superposición.



{{< hint info >}}
https://godotshaders.com/shader/god-rays/
{{< /hint >}}

Aquí podemos observar un ejemplo de un shader de God Rays implementado por el portal godotshaders.com:

{{<details "Sketch Code">}}
/*
Shader from Godot Shaders - the free shader library.
godotshaders.com/shader/god-rays

Feel free to use, improve and change this shader according to your needs
and consider sharing the modified result on godotshaders.com.
*/

shader_type canvas_item;

uniform float angle = -0.3;
uniform float position = -0.2;
uniform float spread : hint_range(0.0, 1.0) = 0.5;
uniform float cutoff : hint_range(-1.0, 1.0) = 0.1;
uniform float falloff : hint_range(0.0, 1.0) = 0.2;
uniform float edge_fade : hint_range(0.0, 1.0) = 0.15;

uniform float speed = 1.0;
uniform float ray1_density = 8.0;
uniform float ray2_density = 30.0;
uniform float ray2_intensity : hint_range(0.0, 1.0) = 0.3;

uniform vec4 color : hint_color = vec4(1.0, 0.9, 0.65, 0.8);

uniform bool hdr = false;
uniform float seed = 5.0;

// Random and noise functions from Book of Shader's chapter on Noise.
float random(vec2 _uv) {
    return fract(sin(dot(_uv.xy,
                         vec2(12.9898, 78.233))) *
        43758.5453123);
}

float noise (in vec2 uv) {
    vec2 i = floor(uv);
    vec2 f = fract(uv);

    // Four corners in 2D of a tile
    float a = random(i);
    float b = random(i + vec2(1.0, 0.0));
    float c = random(i + vec2(0.0, 1.0));
    float d = random(i + vec2(1.0, 1.0));


    // Smooth Interpolation

    // Cubic Hermine Curve. Same as SmoothStep()
    vec2 u = f * f * (3.0-2.0 * f);

    // Mix 4 coorners percentages
    return mix(a, b, u.x) +
            (c - a)* u.y * (1.0 - u.x) +
            (d - b) * u.x * u.y;
}

mat2 rotate(float _angle){
    return mat2(vec2(cos(_angle), -sin(_angle)),
                vec2(sin(_angle), cos(_angle)));
}

vec4 screen(vec4 base, vec4 blend){
	return 1.0 - (1.0 - base) * (1.0 - blend);
}

void fragment()
{
	
	// Rotate, skew and move the UVs
	vec2 transformed_uv = ( rotate(angle) * (UV - position) )  / ( (UV.y + spread) - (UV.y * spread) );
	
	// Animate the ray according the the new transformed UVs
	vec2 ray1 = vec2(transformed_uv.x * ray1_density + sin(TIME * 0.1 * speed) * (ray1_density * 0.2) + seed, 1.0);
	vec2 ray2 = vec2(transformed_uv.x * ray2_density + sin(TIME * 0.2 * speed) * (ray1_density * 0.2) + seed, 1.0);
	
	// Cut off the ray's edges
	float cut = step(cutoff, transformed_uv.x) * step(cutoff, 1.0 - transformed_uv.x);
	ray1 *= cut;
	ray2 *= cut;
	
	// Apply the noise pattern (i.e. create the rays)
	float rays;
	
	if (hdr){
		// This is not really HDR, but check this to not clamp the two merged rays making 
		// their values go over 1.0. Can make for some nice effect
		rays = noise(ray1) + (noise(ray2) * ray2_intensity);
	}
	else{
		 rays = clamp(noise(ray1) + (noise(ray2) * ray2_intensity), 0., 1.);
	}
	
	// Fade out edges
	rays *= smoothstep(0.0, falloff, (1.0 - UV.y)); // Bottom
	rays *= smoothstep(0.0 + cutoff, edge_fade + cutoff, transformed_uv.x); // Left
	rays *= smoothstep(0.0 + cutoff, edge_fade + cutoff, 1.0 - transformed_uv.x); // Right
	
	// Color to the rays
	vec3 shine = vec3(rays) * color.rgb;

	// Try different blending modes for a nicer effect. "Screen" is included in the code,
	// but take a look at https://godotshaders.com/snippet/blending-modes/ for more.
	// With "Screen" blend mode:
	shine = screen(texture(SCREEN_TEXTURE, SCREEN_UV), vec4(color)).rgb;
	
	COLOR = vec4(shine, rays * color.a);
}
{{</details >}}

El shader utiliza varios parámetros para controlar la apariencia de los rayos de luz divinos. Estos parámetros se definen al comienzo del shader y pueden ajustarse según las necesidades del usuario.

El parámetro "angle" controla el ángulo de los rayos de luz. Un valor negativo hará que los rayos se inclinen hacia la izquierda, mientras que un valor positivo los inclinará hacia la derecha.

El parámetro "position" ajusta la posición de los rayos de luz. Un valor negativo moverá los rayos hacia arriba, mientras que un valor positivo los moverá hacia abajo.

El parámetro "spread" determina cuánto se separan los rayos de luz a medida que se alejan de la fuente luminosa. Un valor más alto resultará en rayos más separados, mientras que un valor más bajo los hará más cercanos entre sí.

El parámetro "cutoff" controla la intensidad de los rayos de luz en los bordes. Un valor más alto hará que los bordes de los rayos sean más nítidos y oscuros, mientras que un valor más bajo los hará más suaves y transparentes.

El parámetro "falloff" determina cómo disminuye la intensidad de los rayos a medida que se alejan de la fuente luminosa. Un valor más alto resultará en una atenuación más rápida, mientras que un valor más bajo hará que los rayos se atenúen más gradualmente.

El parámetro "edge_fade" controla la suavidad de la transición entre los rayos y el fondo. Un valor más alto hará que la transición sea más suave y gradual, mientras que un valor más bajo la hará más brusca.

El parámetro "speed" ajusta la velocidad de animación de los rayos de luz. Un valor más alto hará que los rayos se muevan más rápidamente, mientras que un valor más bajo los hará más lentos.

Los parámetros "ray1_density" y "ray2_density" controlan la densidad de los rayos de luz. Valores más altos resultarán en rayos más densos, mientras que valores más bajos harán que sean más dispersos.

El parámetro "ray2_intensity" determina la intensidad de los rayos de luz secundarios. Un valor más alto hará que estos rayos sean más visibles, mientras que un valor más bajo los hará menos notorios.

El parámetro "color" establece el color de los rayos de luz. Se utiliza un valor de tipo "vec4" que representa el color en formato RGBA (rojo, verde, azul, alfa). El color predeterminado es un tono amarillo claro.

El parámetro "hdr" es un booleano que indica si se utiliza un rango dinámico alto (HDR) para los rayos de luz. Si se establece en verdadero, los valores de los rayos no se limitarán a 1.0, lo que puede generar efectos visuales interesantes.

El parámetro "seed" es un valor numérico utilizado como semilla para generar los patrones de ruido en los rayos de luz.

El shader utiliza una función llamada "random" para generar números pseudoaleatorios basados en una función hash. Esta función se utiliza para crear patrones de ruido en los rayos de luz.

Además, el shader utiliza una función llamada "rotate" para aplicar una rotación a las coordenadas de textura. Esta función utiliza el ángulo especificado por el parámetro "angle" para rotar las coordenadas.

La función "screen" se utiliza para combinar los rayos de luz con el color de fondo. Esta función aplica un efecto de mezcla que resulta en un resplandor de luz más suave y natural.

En la función "fragment", se lleva a cabo todo el procesamiento del shader. Primero, se aplican transformaciones a las coordenadas de textura para ajustar el ángulo y la posición de los rayos de luz.

A continuación, se animan los rayos de luz utilizando las coordenadas de textura transformadas y los parámetros de densidad y velocidad. También se aplica un corte a los bordes de los rayos de luz para controlar su extensión.

Después, se aplica un patrón de ruido a los rayos de luz utilizando la función "noise". Dependiendo del valor del parámetro "hdr", se puede permitir que los valores de los rayos excedan 1.0, lo que genera efectos visuales interesantes.

Finalmente, se realiza un suavizado en los bordes de los rayos de luz y se mezclan con el color de los rayos utilizando la función "smoothstep". También se aplica un efecto de mezcla de pantalla utilizando la función "screen" para obtener un aspecto más agradable.

El resultado final se asigna a la variable "COLOR", que representa el color de salida del shader.

Este es el funcionamiento básico del shader de rayos de luz divinos en Godot. Sin embargo, se pueden realizar ajustes y modificaciones adicionales según las necesidades y preferencias del usuario.

## Noise Warp Shader

Un "noise warp shader" es un tipo de shader utilizado en computación gráfica para aplicar deformaciones y distorsiones a una textura o a un objeto en una escena. El término "noise warp" hace referencia a la utilización de funciones de ruido para generar variaciones y perturbaciones en las coordenadas de textura o en las posiciones de los vértices de un objeto.

El ruido, en este contexto, se refiere a una función matemática que genera valores pseudoaleatorios en una distribución aparentemente aleatoria pero coherente. Estas funciones de ruido son utilizadas en computación gráfica para crear efectos orgánicos, naturales y realistas.

En un "noise warp shader", el ruido se aplica para distorsionar las coordenadas de textura o las posiciones de los vértices de un objeto. Esto puede lograrse de diferentes maneras, como desplazando las coordenadas o las posiciones según los valores generados por la función de ruido.

Al aplicar estas deformaciones basadas en ruido, se pueden lograr efectos visuales interesantes y naturales, como ondulaciones, fracturas, superficies rugosas o incluso efectos de fuego y humo. Estos efectos son especialmente útiles en la creación de terrenos, texturas orgánicas, animaciones fluidas y otros elementos visuales complejos.

El "noise warp shader" puede ser utilizado en diferentes etapas del pipeline gráfico, como la generación de geometría, el procesamiento de vértices o el sombreado de fragmentos. Esto depende de la forma en que se desee aplicar la deformación y del nivel de detalle y control requerido en la aplicación específica.

En resumen, un "noise warp shader" es un shader que utiliza funciones de ruido para aplicar deformaciones y distorsiones basadas en ruido a una textura o a un objeto en una escena. Estas deformaciones generan efectos visuales realistas y orgánicos, y son ampliamente utilizadas en la computación gráfica para crear una amplia gama de efectos y elementos visuales complejos.



{{< hint info >}}
Un ejemplo de Warp Shader con ruido en GLSL:
https://www.shadertoy.com/view/ttsfzH
{{< /hint >}}


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


## Difucultades

El funcionamiento del programa se ve entorpecido por las políticas de CORS (Cross-Origin Resource Sharing), las cuales no permiten cargar los recursos citados en el código correctamente, junto con otros errores de p5.js que no ha sido posible resolver hasta el momento, pero se encuentra en revisión.

{{< hint info >}}
https://developer.mozilla.org/en-US/docs/Web/HTTP/CORS
{{< /hint >}}

![debugger](content/sketches/shaders/postmalone/qunundrum.png)
