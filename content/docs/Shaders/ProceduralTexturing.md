---
title: Procedural Texturing
weight: 4
---
## Exercise
Adapt other patterns from the book of shaders (refer also to the shadertoy collection) and map them as textures onto other 3D shapes.

## Procedural Texturing

**1. Introducción**

La texturización procedural es una técnica revolucionaria en la creación de contenido digital que utiliza algoritmos y reglas matemáticas para generar texturas y patrones complejos en tiempo real. A diferencia de los métodos tradicionales, esta técnica automatizada permite crear texturas detalladas, realistas y personalizables de manera eficiente y escalable. Es ampliamente utilizada en la industria del entretenimiento para crear mundos virtuales convincentes en videojuegos, películas y animaciones. La texturización procedural ofrece eficiencia, escalabilidad, variabilidad y control creativo, impulsando la creación de experiencias visuales asombrosas en diversas industrias.

**2. Antecedentes y  trabajo previo**

El concepto de texturización procedural tiene sus raíces en la década de 1970, cuando los investigadores comenzaron a explorar técnicas computacionales para la generación automática de texturas. Uno de los primeros trabajos destacados en este campo fue el desarrollado por Ken Perlin en 1983, conocido como el ruido de Perlin. Este algoritmo proporcionaba una forma eficiente de generar texturas orgánicas y naturales, y sigue siendo ampliamente utilizado en la industria del cine y los videojuegos.

A lo largo de los años, diversos investigadores y profesionales han contribuido al avance de la texturización procedural. Michael F. Cohen, John R. Wallace y David H. Salesin presentaron un enfoque basado en el análisis de texturas llamado "Texture Synthesis on Surfaces" en 1992, que permitía la creación de texturas realistas mediante la extracción de características y la síntesis procedural.

Otro hito importante en la texturización procedural se produjo en 1999, cuando Eric Lengyel introdujo los mapas de ruido llamados "Simplex Noise", que son una mejora del ruido de Perlin y ofrecen resultados más suaves y detallados.

Con el tiempo, la texturización procedural se ha convertido en una disciplina activa de investigación y desarrollo, con la aparición de numerosos métodos y técnicas. Algunas áreas de estudio incluyen la generación de texturas procedurales basadas en fractales, la simulación de materiales realistas como madera, metal y piel, y la aplicación de principios físicos para lograr resultados más precisos.

En la industria del entretenimiento, la texturización procedural ha sido ampliamente adoptada para la creación de mundos virtuales en videojuegos, películas y animaciones. Herramientas como Substance Designer y Houdini permiten a los artistas y desarrolladores crear y manipular texturas procedurales de manera intuitiva y eficiente.

En resumen, el desarrollo de la texturización procedural ha sido impulsado por investigadores y profesionales a lo largo de las décadas, con importantes avances en algoritmos y técnicas. Esta área de estudio continúa evolucionando y desempeña un papel fundamental en la generación de contenido digital de alta calidad en diversas industrias.

**3. Solución**

En este ejercicio, se implementaron dos patrones. Uno tomado de [The Book of Shaders: Random](https://thebookofshaders.com/10/?lan=es) llamado Mosaic y otro tomado de [generative art deco 4 (Shadertoy)](https://www.shadertoy.com/view/mds3DX) y que aplica el concepto de [Chromatic aberration](https://en.wikipedia.org/wiki/Chromatic_aberration).

Por defecto se mostrará este segundo shader sobre un conjunto de conos generados aleatoriamente y que se mueven cíclicamente por el espacio (mod 400) mientras rotan.

Si el usuario selecciona mosaic del selector de shaders, los objetos se transforman en esferas y se aplica la textura procedimental mosaic.

### Controles
* **Select**: selecciona el shader de textura procedimental que desea visualizar


{{< p5-iframe sketch="/showcase/sketches/shaders/ProceduralTexturing/protexturing.js" width="550" height="550" lib1="https://cdn.jsdelivr.net/gh/VisualComputing/p5.treegl/p5.treegl.js" lib2="https://cdn.jsdelivr.net/gh/freshfork/p5.EasyCam@1.2.1/p5.easycam.js">}}



{{<details "Sketch Code">}}

``` js
let angle = 0;
let positions = []; // will contain objects 3D positions

let easycam;
let P;

let pg;
let cabberShader;
let mosaicShader;

let i = 1;

let texselect;
let tex;

function preload() {
    cabberShader = readShader('/VisualComputing/docs/Shaders/fragments/cabber.frag', { matrices: Tree.NONE, varyings: Tree.NONE });
    mosaicShader = readShader('/VisualComputing/docs/Shaders/fragments/mosaic.frag', { matrices: Tree.NONE, varyings: Tree.NONE });
  }

function setup() {

  createCanvas(500, 500, WEBGL);

  pg = createGraphics(400, 400, WEBGL);
  textureMode(NORMAL);
  noStroke();
  pg.noStroke();
  pg.textureMode(NORMAL);
  
  easycam = createEasyCam();

  let state = {
    distance: 600,           
    center: [200, 200, 200],       
    rotation: [1, -1, 0, 0],
  };

  easycam.setState(state, 1000);
  
  // 50 objects are placed throughout the space with random positions.
  for (let i = 0; i < 30; i++) {
    let x = randomint(-400, 400);
    let y = randomint(-400, 400);
    let z = randomint(-400, 400);
    positions.push([x, y, z]);
  }

  texselect = createSelect();
  texselect.position(10, 10);
  texselect.option('cabber', 0);
  texselect.option('mosaic', 1);
  texselect.selected('cabber');

}

function draw() {
  
  tex = texselect.value();

  background(0);

  P = easycam.getPosition();
  
  let size = 50;
  let ssize = 300;
  let chromabber = 0.01;

  for (let i = 0; i < positions.length; i++) {
    cabberShader.setUniform('SHAPE_SIZE', ssize/1000);
    cabberShader.setUniform('CHROMATIC_ABBERATION', chromabber);
    cabberShader.setUniform('u_time', frameCount * 0.1);
    mosaicShader.setUniform('u_time', frameCount * 0.1);
    pg.emitResolution(cabberShader);
    pg.emitResolution(mosaicShader);
    if (tex == 0)
        pg.shader(cabberShader);
    else if (tex == 1)
        pg.shader(mosaicShader);
    pg.quad(-1, -1, 1, -1, 1, 1, -1, 1);
    texture(pg);
    push();
    positions[i][0] = (positions[i][0] + 2) % 400;
    positions[i][1] = (positions[i][1] + 2) % 400;
    positions[i][2] = (positions[i][2] + 2) % 400;
    translate(positions[i][0], positions[i][1], positions[i][2]); // with push and pop, translation and rotation of each object is independent of each other.
    rotateX(angle);
    rotateY(angle * 0.4);
    if (tex == 0)
        cone(size);
    else if (tex == 1)
        sphere(size);
    pop();
    ssize += 20;
    size += 1;
    chromabber += 0.002;
    if (tex == 1)
        angle += 0.001;
  }
}

function randomint(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1) + min);
}
```
{{</details >}}

{{<details "Mosaic Shader Code">}}

``` glsl
// Author @patriciogv - 2015
// Title: Mosaic

#ifdef GL_ES
precision mediump float;
#endif

uniform vec2 u_resolution;
uniform vec2 u_mouse;
uniform float u_time;

float random (vec2 st) {
    return fract(sin(dot(st.xy,
                         vec2(12.9898,78.233)))*
        43758.5453123);
}

void main() {
    vec2 st = gl_FragCoord.xy/u_resolution.xy;

    st *= 10.0; // Scale the coordinate system by 10
    vec2 ipos = floor(st);  // get the integer coords
    vec2 fpos = fract(st);  // get the fractional coords

    // Assign a random value based on the integer coord
    vec3 color = vec3(random( ipos ));

    // Uncomment to see the subdivided grid
    // color = vec3(fpos,0.0);

    gl_FragColor = vec4(color,1.0);
}

```
{{</details >}}

{{<details "Chromatic Abberration Shader Code">}}

``` glsl

// Fork of "generative art deco 3" by morisil. https://shadertoy.com/view/mdl3WX
// 2022-10-28 00:47:55

// Fork of "generative art deco 2" by morisil. https://shadertoy.com/view/ftVBDz
// 2022-10-27 22:34:54

// Fork of "generative art deco" by morisil. https://shadertoy.com/view/7sKfDd
// 2022-09-28 11:25:15

// Copyright Kazimierz Pogoda, 2022 - https://xemantic.com/
// I am the sole copyright owner of this Work.
// You cannot host, display, distribute or share this Work in any form,
// including physical and digital. You cannot use this Work in any
// commercial or non-commercial product, website or project. You cannot
// sell this Work and you cannot mint an NFTs of it.
// I share this Work for educational purposes, and you can link to it,
// through an URL, proper attribution and unmodified screenshot, as part
// of your educational material. If these conditions are too restrictive
// please contact me and we'll definitely work it out.

// copyright statement borrowed from Inigo Quilez

// Music by Giovanni Sollima, L'invenzione del nero:
// https://soundcloud.com/giovanni-sollima/linvenzione-del-nero

// See also The Mathematics of Perception to check the ideas behind:
// https://www.shadertoy.com/view/7sVBzK

precision mediump float;

uniform float SHAPE_SIZE;
uniform float CHROMATIC_ABBERATION;
const float ITERATIONS = 10.;
const float INITIAL_LUMA = .5;

uniform vec2 u_resolution;
uniform float u_time;

const float PI = 3.14159265359;
const float TWO_PI = 6.28318530718;

mat2 rotate2d(float _angle){
    return mat2(cos(_angle),-sin(_angle),
                sin(_angle),cos(_angle));
}

float sdPolygon( float angle,  float distance) {
  float segment = TWO_PI / 4.0;
  return cos(floor(.5 + angle / segment) * segment - angle) * distance;
}

float random(vec2 st) {
    return fract(sin(dot(st.xy,
                         vec2(12.9898,78.233)))*
        43758.5453123);
}

float getColorComponent( vec2 st, float modScale,  float blur) {
    vec2 modSt = mod(st, 1. / modScale) * modScale * 2. - 1.;
    float dist = length(modSt);
    float angle = atan(modSt.x, modSt.y) + sin(u_time * .08) * 9.0;
    float shapeMap = smoothstep(SHAPE_SIZE + blur, SHAPE_SIZE - blur, sin(dist * 3.0) * .5 + .5);
    return shapeMap;
}



void main() {

    vec2 st =
        (2.* gl_FragCoord.xy - u_resolution)
        / min(u_resolution.x, u_resolution.y);
    vec2 origSt = st;
    st *= rotate2d(sin(u_time * .14) * .3);
    st *= (sin(u_time * .15) + 2.) * .3;
    st *= log(length(st * .428)) * 1.1;
  
    float blur = .4 + sin(u_time * .52) * .2;

    float modScale = 1.;

    vec3 color = vec3(0);
    float luma = INITIAL_LUMA;
    for (float i = 0.; i < ITERATIONS; i++) {
        vec2 center = st + vec2(sin(u_time * .12), cos(u_time * .13));
        //center += pow(length(center), 1.);
        vec3 shapeColor = vec3(
            getColorComponent(center - st * CHROMATIC_ABBERATION, modScale, blur),
            getColorComponent(center, modScale, blur),
            getColorComponent(center + st * CHROMATIC_ABBERATION, modScale, blur)        
        ) * luma;
        st *= 1.1 + getColorComponent(center, modScale, .04) * 1.2;
        st *= rotate2d(sin(u_time  * .05) * 1.33);
        color += shapeColor;
        color = clamp(color, 0., 1.);
//        if (color == vec3(1)) break;
        luma *= .6;
        blur *= .63;
    }
    const float GRADING_INTENSITY = .4;
    vec3 topGrading = vec3(
        1. + sin(u_time * 1.13 * .3) * GRADING_INTENSITY,
        1. + sin(u_time * 1.23 * .3) * GRADING_INTENSITY,
        1. - sin(u_time * 1.33 * .3) * GRADING_INTENSITY
    );
    vec3 bottomGrading = vec3(
        1. - sin(u_time * 1.43 * .3) * GRADING_INTENSITY,
        1. - sin(u_time * 1.53 * .3) * GRADING_INTENSITY,
        1. + sin(u_time * 1.63 * .3) * GRADING_INTENSITY
    );
    float origDist = length(origSt);
    vec3 colorGrading = mix(topGrading, bottomGrading, origDist - .5);
    gl_FragColor = vec4(pow(color.rgb, colorGrading), 1.);
    gl_FragColor *= smoothstep(2.1, .7, origDist);
}
```
{{</details >}}

**4. Conclusiones**

En conclusión, el trabajo presentado utiliza la texturización procedural como una técnica innovadora para la generación de contenido visual en 3D. A través de algoritmos y shaders personalizados, se logra generar texturas y detalles complejos de manera eficiente y escalable.

Los antecedentes y el trabajo previo en el campo de la texturización procedural han sentado las bases para el desarrollo de esta técnica. Desde el ruido de Perlin hasta los avances en la generación de texturas basadas en fractales y principios físicos, diversos investigadores y profesionales han contribuido al avance y aplicación de la texturización procedural en diversas industrias.

La texturización procedural ofrece ventajas significativas, como la eficiencia en la generación de contenido visual, la escalabilidad en la manipulación de texturas y la capacidad de personalización y variabilidad. Estas características son especialmente valiosas en la industria del entretenimiento, donde se requiere un alto nivel de realismo y detalles en la creación de mundos virtuales en videojuegos, películas y animaciones.

El código presentado en este trabajo demuestra la implementación práctica de la texturización procedural en un entorno de programación como p5.js. Mediante shaders personalizados, se logra la generación automática y visualmente atractiva de texturas en objetos geométricos 3D.

En resumen, la texturización procedural es una técnica poderosa y versátil que ha transformado la forma en que se crea y se visualiza el contenido digital. Su aplicación en la generación de texturas y detalles realistas ha permitido avanzar en la calidad y eficiencia en la creación de mundos virtuales y ha abierto nuevas posibilidades creativas en diversas industrias.

**5. Trabajo a futuro**

En el ámbito de la texturización procedural, existen diversas áreas que ofrecen oportunidades para futuros trabajos y avances. Algunas posibles líneas de investigación y desarrollo incluyen:

1. Mejora de algoritmos y técnicas: Continuar explorando y refinando los algoritmos y métodos utilizados en la texturización procedural para lograr resultados aún más realistas y detallados. Esto implica investigar nuevas técnicas de generación de texturas basadas en fractales, simulación de materiales y principios físicos, así como explorar enfoques innovadores de generación procedural.

2. Integración con inteligencia artificial: Explorar la integración de técnicas de inteligencia artificial, como el aprendizaje automático y las redes neuronales, en la texturización procedural. Esto podría permitir la generación automática de texturas basadas en ejemplos o la capacidad de aprender y adaptarse a estilos y preferencias específicas.

3. Herramientas y software mejorados: Continuar desarrollando y mejorando las herramientas y software dedicados a la texturización procedural. Esto podría implicar la creación de entornos de desarrollo más intuitivos y accesibles, la optimización de algoritmos para un rendimiento más rápido y eficiente, y la creación de bibliotecas y recursos adicionales para facilitar la implementación de la texturización procedural en diversos proyectos.

4. Aplicaciones en nuevas industrias: Explorar y aplicar la texturización procedural en industrias más allá del entretenimiento, como la arquitectura, el diseño de productos, la realidad virtual/aumentada, la medicina y la visualización científica. Investigar cómo la texturización procedural puede mejorar la calidad visual y la eficiencia en la creación de contenido en estas áreas.

5. Interacción y experiencia del usuario: Investigar y desarrollar técnicas interactivas y de tiempo real para la texturización procedural, permitiendo a los usuarios explorar y personalizar las texturas en tiempo real. Esto podría incluir interfaces de usuario intuitivas, herramientas de manipulación de parámetros en tiempo real y la capacidad de generar texturas procedurales en respuesta a la interacción del usuario.