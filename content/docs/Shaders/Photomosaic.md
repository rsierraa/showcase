---
title: Photomosaic
weight: 7
---
## Exercise
Implement a mosaic (or/and ascii art) visual application.

## Photomosaic

## 1. Introducción

El fotomosaico es una técnica que consiste en crear una imagen grande compuesta por una colección de imágenes más pequeñas (los azulejos o "tiles") que, en conjunto, forman una representación visual del objeto o escena original. Cada imagen pequeña se selecciona y coloca de manera que su contenido contribuya a la apariencia general del objeto o escena que se está representando.

## 2. Antecedentes y trabajo previo

Inicios en el arte: El artista y diseñador Robert Silvers se considera uno de los pioneros en el uso de la técnica del fotomosaico. En la década de 1970, Silvers comenzó a crear obras de arte utilizando fotografías pequeñas dispuestas en patrones regulares para formar una imagen más grande. Sus trabajos iniciales fueron realizados manualmente, seleccionando y pegando las imágenes en su lugar.

Investigación académica: En la década de 1990, la técnica del fotomosaico comenzó a recibir atención en el ámbito académico y de investigación. Diversos estudios exploraron enfoques computacionales para generar fotomosaicos automáticamente, lo que implicaba el desarrollo de algoritmos y técnicas para la selección y colocación eficiente de las imágenes de azulejos.

Popularización comercial: A mediados de la década de 1990, el fotomosaico ganó popularidad a través de aplicaciones comerciales y programas de software que permitían a los usuarios crear sus propios fotomosaicos. Uno de los ejemplos más conocidos fue el software "AndreaMosaic", lanzado en 1999, que facilitó la creación de fotomosaicos utilizando una colección de imágenes como entrada.

Aplicaciones interactivas: Con el avance de la tecnología, el fotomosaico se ha utilizado en aplicaciones interactivas y en línea. Se han desarrollado sitios web y aplicaciones móviles que permiten a los usuarios cargar sus propias imágenes y generar fotomosaicos en tiempo real, lo que ha ampliado aún más el alcance y la accesibilidad de la técnica.

## 3. Solución [Images Photomosaic]

En esta aplicación, se utiliza un mecanismo similar al de la coherencia espacial para la pixelación, con la particularidad de que cada píxel de baja resolución se asigna a una imagen específica. El shader recibe una imagen que contiene todas las imágenes del conjunto de datos que formarán el mosaico. Estas imágenes se ordenan según una métrica, en este caso, el luma. El shader calcula el color para cada texel de baja resolución y luego obtiene el luma de ese color. Este valor de luma se utiliza para determinar el desplazamiento horizontal desde el extremo izquierdo utilizando la función "texture2D". De esta manera, se obtiene la coordenada x de la imagen correspondiente que se dibujará en esa sección del mosaico, es decir, la ubicación de inicio de la imagen en el buffer recibido.

### Controles

* **Botón Elegir archivo**: para cargar una imagen o video
* **Checkbox Video por defecto**: marcar para usar el video por defecto, desmarcar para usar la imagen por defecto
* **Slider**: define la resolución (por defecto 30, es decir 30 pixeles de baja resolución que en este caso serán imágenes del mosaico por cada lado de la cuadrícula). El mínimo valor es 1 y el máximo 150. Una resolución mayor, implica más pixeles, y por tanto, de menor tamaño cada vez. El tamaño de la cuadrícula es de 600px x 600px  por lo que una resolución de 150 implica pixeles de baja resolución de dimensiones 4px x 4px.
* **Select**: para decidir si ver la imagen pixelada (keys), la original o el mosaico.
* **Input**: ingrese un número entre 1 y 30 para escoger una imagen del dataset. El dataset se muestra en orden abajo de esta aplicación. Observe por ejemplo que panda rojo le corresponde el número 7. Una vez ingresado un número puede usar las flechas de su teclado para cambiar de imagen, siempre que el foco esté sobre el input.

{{< p5-iframe sketch="/showcase/sketches/shaders/Photomosaic/photomosaic.js" width="650" height="750" lib1="https://cdn.jsdelivr.net/gh/VisualComputing/p5.treegl/p5.treegl.js" lib2="https://cdn.jsdelivr.net/gh/objetos/p5.quadrille.js/p5.quadrille.js">}}

## Dataset
{{<details "Dataset">}}
<img src="/showcase/docs/Shaders/resources/dataset/1.jpg" alt="1" width="150"/>
<img src="/showcase/docs/Shaders/resources/dataset/2.jpg" alt="2" width="150"/>
<img src="/showcase/docs/Shaders/resources/dataset/3.jpg" alt="3" width="150"/>
<img src="/showcase/docs/Shaders/resources/dataset/4.jpg" alt="4" width="150"/>
<img src="/showcase/docs/Shaders/resources/dataset/5.jpg" alt="5" width="150"/>
<img src="/showcase/docs/Shaders/resources/dataset/6.jpg" alt="6" width="150"/>
<img src="/showcase/docs/Shaders/resources/dataset/7.jpg" alt="7" width="150"/>
<img src="/showcase/docs/Shaders/resources/dataset/8.jpg" alt="8" width="150"/>
<img src="/showcase/docs/Shaders/resources/dataset/9.jpg" alt="9" width="150"/>
<img src="/showcase/docs/Shaders/resources/dataset/10.jpg" alt="10" width="150"/>
<img src="/showcase/docs/Shaders/resources/dataset/11.jpg" alt="11" width="150"/>
<img src="/showcase/docs/Shaders/resources/dataset/12.jpg" alt="12" width="150"/>
<img src="/showcase/docs/Shaders/resources/dataset/13.jpg" alt="13" width="150"/>
<img src="/showcase/docs/Shaders/resources/dataset/14.jpg" alt="14" width="150"/>
<img src="/showcase/docs/Shaders/resources/dataset/15.jpg" alt="15" width="150"/>
<img src="/showcase/docs/Shaders/resources/dataset/16.jpg" alt="16" width="150"/>
<img src="/showcase/docs/Shaders/resources/dataset/17.jpg" alt="17" width="150"/>
<img src="/showcase/docs/Shaders/resources/dataset/18.jpg" alt="18" width="150"/>
<img src="/showcase/docs/Shaders/resources/dataset/19.jpg" alt="19" width="150"/>
<img src="/showcase/docs/Shaders/resources/dataset/20.jpg" alt="20" width="150"/>
<img src="/showcase/docs/Shaders/resources/dataset/21.jpg" alt="21" width="150"/>
<img src="/showcase/docs/Shaders/resources/dataset/22.jpg" alt="22" width="150"/>
<img src="/showcase/docs/Shaders/resources/dataset/23.jpg" alt="23" width="150"/>
<img src="/showcase/docs/Shaders/resources/dataset/24.jpg" alt="24" width="150"/>
<img src="/showcase/docs/Shaders/resources/dataset/25.jpg" alt="25" width="150"/>
<img src="/showcase/docs/Shaders/resources/dataset/26.jpg" alt="26" width="150"/>
<img src="/showcase/docs/Shaders/resources/dataset/27.jpg" alt="27" width="150"/>
<img src="/showcase/docs/Shaders/resources/dataset/28.jpg" alt="28" width="150"/>
<img src="/showcase/docs/Shaders/resources/dataset/29.jpg" alt="29" width="150"/>
<img src="/showcase/docs/Shaders/resources/dataset/30.jpg" alt="30" width="150"/>
{{</details >}}
{{<details "Sketch Code">}}

``` js
'use strict';

let img;
let photomosaicShader;

let resolution;
let mode;

let input;

let dataset = [];

let palette;
let pg;

let imgcode;

let video_on;

const SAMPLE_RES = 30;

function preload() {
  img = loadImage(`/showcase/docs/Shaders/resources/dataset/${int(random(1, 31))}.jpg`);
  for (let i = 1; i <= 30; i++) {
    dataset.push(loadImage(`/showcase/docs/Shaders/resources/dataset/${i}.jpg`));
  }
  photomosaicShader = readShader('/showcase/docs/Shaders/fragments/photomosaic.frag', { matrices: Tree.NONE, varyings: Tree.texcoords2 });
}

function setup() {
  createCanvas(600, 600, WEBGL);
  textureMode(NORMAL);
  noStroke();
  shader(photomosaicShader);
  resolution = createSlider(1, 150, 100, 1);
  resolution.position(100, 10);
  resolution.style('width', '150px');
  resolution.input(() => photomosaicShader.setUniform('resolution', resolution.value()));
  photomosaicShader.setUniform('resolution', resolution.value());
  mode = createSelect();
  mode.position(10, 10);
  mode.option('original');
  mode.option('keys');
  mode.option('photomosaic');
  mode.selected('photomosaic');
  mode.changed(() => {
    if (mode.value() == 'original')
        resolution.hide();
    else
        resolution.show();
    photomosaicShader.setUniform('original', mode.value() === 'original');
    photomosaicShader.setUniform('keys', mode.value() === 'keys');
  });
  input = createFileInput(handleFile);
  imgcode = createInput('', 'number');
  palette = createQuadrille(dataset);
  console.log(palette.height)
  pg = createGraphics(SAMPLE_RES * palette.width, SAMPLE_RES);
  photomosaicShader.setUniform('n', palette.width);
  sample();

  video_on = createCheckbox('default video', false);
  video_on.changed(() => {
    if (video_on.checked()) {
      img = createVideo(['/showcase/docs/Shaders/resources/video0.mp4']);
      img.hide();
      img.loop();
    } else {
      img = loadImage(`/showcase/docs/Shaders/resources/dataset/${int(random(1, 31))}.jpg`);
      img.hide();
      img.pause();
    }
    photomosaicShader.setUniform('source', img);
  })

}

function draw() {

  if (imgcode.value() != '') {
    img = dataset[(parseInt(imgcode.value()) - 1) % dataset.length];
  }

  if (img != null) {

    image(img, 0, 0, 600, 600); 

    photomosaicShader.setUniform('source', img);

    beginShape();
    vertex(-1, -1, 0, 0, 1);
    vertex(1, -1, 0, 1, 1);
    vertex(1, 1, 0, 1, 0);
    vertex(-1, 1, 0, 0, 0);
    endShape();
  }
}

function sample() {
  if (pg.width !== SAMPLE_RES * palette.width) {
    pg = createGraphics(SAMPLE_RES * palette.width, SAMPLE_RES);
    photomosaicShader.setUniform('n', palette.width);
  }
  palette.sort({ ascending: true, cellLength: SAMPLE_RES });
  drawQuadrille(palette, { graphics: pg, cellLength: 30, outlineWeight: 0 });
  photomosaicShader.setUniform('palette', pg);
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

{{<details "Photomosaic Shader Code">}}

``` glsl
precision mediump float;

uniform sampler2D palette;
// source (image or video) is sent by the sketch
uniform sampler2D source;
uniform bool keys;
// displays original
uniform bool original;
// target horizontal & vertical resolution
uniform float resolution;
uniform float n;

// interpolated texcoord (same name and type as in vertex shader)
// defined as a (normalized) vec2 in [0..1]
varying vec2 texcoords2;

float luma(vec3 texel) {
    return 0.299 * texel.r + 0.587 * texel.g + 0.114 * texel.b; // min 0, max 255
}

void main() {
  if (original) {
    gl_FragColor = texture2D(source, texcoords2);
  }
  else {
    // i. define coord as a texcoords2 remapping in [0.0, resolution] ∈ R
    vec2 coord = texcoords2 * resolution;
    // ii. remap stepCoord in [0.0, resolution] ∈ Z
    vec2 stepCoord = floor(coord);
    vec2 symbolCoord = coord - stepCoord;
    // iii. remap stepCoord in [0.0, 1.0] ∈ R
    stepCoord = stepCoord / vec2(resolution); // normalized step coord
    // source texel
    vec4 key = texture2D(source, stepCoord); // texel will be the key to look up

    // we calculate key color luma
    float kluma = luma(key.rgb);

    // palette is an image containing the 30 images but with 1.0 x 1.0 dimensions.
    // each key will get an image from the palette: we have the symbol coord (x, y).
    // images are ordered horizontally, so we take x, which indicates the starting coordinate of our key, and divide it by n because we have n images, 
    // with this we can start counting from the left-most image to the right
    // to this quotient, we add kluma, which is a value between 0 a 1. It will ensure we are going to use the correct image texel. 
    // y coordinate need no special treatment.
    // for each texel, we need to paint the correct portion of the image that will represent

    vec4 paletteTexel = texture2D(palette, vec2(symbolCoord.x / n + kluma, symbolCoord.y));

    gl_FragColor = keys ? key : paletteTexel;
  }
}
```
{{</details >}}

## 3.1. Solución [ASCII Art]

Para las imágenes, se redujo el tamaño de los caracteres a 4pt y se ajustó el interlineado para permitir la visualización de la imagen en un espacio más reducido.

<iframe src="/showcase/sketches/shaders/Photomosaic/videoASCII.html" style="border:none;width:1200px;height:1000px;"></iframe>

{{<details "Sketch Code">}}

``` js
const density = 'qwerty12345';

let video;
let asciiDiv;

function setup() {
  noCanvas();
  video = createVideo(
    ['/showcase/docs/Shaders/resources/videoASCII.mp4'], 
    vidLoad
  );
  video.size(100, 100);
  
  asciiDiv = createDiv();
  
}

function vidLoad() {
  video.loop();
  video.volume(0);
}

function draw(){
  
  video.loadPixels();
  let asciiImage = '';

  for(let j = 0; j < video.height; j++){
    
    for(let i = 0; i < video.width; i++){      
    
      const pixelIndex = (i + j * video.width) * 4;
      const r = video.pixels[pixelIndex + 0];
      const g = video.pixels[pixelIndex + 1];
      const b = video.pixels[pixelIndex + 2];
      const avg = (r + g + b) / 3;
      
      
      const len = density.length;
      const charIndex = floor(map(avg, 0, 255, len, 0));
      const c = density.charAt(charIndex);
      if (c == '') asciiImage += '&nbsp;'
      else asciiImage += c;
      
    }
    asciiImage += '<br/>';
  }
  asciiDiv.html(asciiImage);
}
```
{{</details >}}

<iframe src="/showcase/sketches/shaders/Photomosaic/imageASCII.html" style="border:none;width:1200px;height:1000px;"></iframe>

{{<details "Sketch Code">}}

``` js

const density = 'qwerty12345';

let photo;

function preload(){
  photo = loadImage("/showcase/docs/Shaders/resources/imageASCII.jpg")
}

function setup() {
  noCanvas();
  
  background(0);
  image(photo,0,0,width,height);
  
  let w = width/photo.width;
  let h = height/photo.height;
  
  photo.loadPixels();
    
  for(let j = 0; j < photo.height; j++){
    let row = '';
    for(let i = 0; i < photo.width; i++){      
    
      const pixelIndex = (i + j * photo.width) * 4;
      const r = photo.pixels[pixelIndex + 0];
      const g = photo.pixels[pixelIndex + 1];
      const b = photo.pixels[pixelIndex + 2];
      const avg = (r + g + b) / 3;
      
      
      const len = density.length;
      const charIndex = floor(map(avg, 0, 255, len, 0));
      const c = density.charAt(charIndex);
      if (c == '') row += '&nbsp;'
      else row += c;
      
    }
    createDiv(row);
  }
  
}

```
{{</details >}}

## 4. Conclusiones

Creatividad visual: El fotomosaico brinda una forma creativa de presentar imágenes utilizando una colección de imágenes más pequeñas. Esto permite crear composiciones visuales interesantes y sorprendentes, agregando un elemento de originalidad y estilo a las imágenes.

Representación detallada: Aunque el fotomosaico está compuesto por imágenes más pequeñas, a cierta distancia, puede lograr una representación detallada del objeto o escena original. Esto se debe a la cuidadosa selección y colocación de las imágenes de azulejos, lo que permite capturar características y detalles clave de la imagen objetivo.

Versatilidad y aplicaciones: La técnica del fotomosaico se ha utilizado en una amplia gama de aplicaciones, desde el arte y el diseño gráfico hasta la publicidad y las aplicaciones interactivas. Su versatilidad radica en la posibilidad de adaptarla a diferentes contextos y temáticas, lo que la convierte en una opción atractiva para transmitir mensajes visuales de manera impactante.

Personalización y participación del usuario: Con las herramientas y software adecuados, los usuarios pueden crear sus propios fotomosaicos personalizados. Esto implica una mayor interacción y participación del usuario, lo que agrega un elemento de diversión y creatividad al proceso de creación.

Evolución tecnológica: A medida que la tecnología avanza, las técnicas y herramientas para crear fotomosaicos también evolucionan. Los algoritmos de selección y colocación de imágenes de azulejos se han vuelto más sofisticados, lo que permite una mayor precisión y calidad en los resultados. Además, la disponibilidad de aplicaciones en línea y móviles ha facilitado aún más la creación y el uso de fotomosaicos.

## 5. Trabajo a futuro

Arte y diseño digital: El fotomosaico puede seguir siendo utilizado como una forma de expresión artística, permitiendo a los artistas crear obras visuales únicas y originales. Además, puede aplicarse en el diseño digital para crear composiciones visuales llamativas en diferentes contextos, como publicidad, diseño de logotipos, ilustraciones, entre otros.

Presentaciones interactivas: La técnica del fotomosaico puede aplicarse en presentaciones interactivas, donde las imágenes se generan en tiempo real a medida que el usuario interactúa con el contenido. Esto puede utilizarse en presentaciones comerciales, exposiciones interactivas, museos y eventos especiales, brindando una experiencia visual atractiva y participativa.

Generación de contenido multimedia: La técnica del fotomosaico puede integrarse en aplicaciones y software de edición de fotos y videos, permitiendo a los usuarios transformar sus imágenes y clips en fotomosaicos personalizados. Esto puede utilizarse para crear videos musicales, presentaciones de diapositivas, portafolios visuales y más.

Visualización de datos: Los fotomosaicos pueden utilizarse como una forma visualmente atractiva de representar datos complejos o conjuntos de información. Al asignar imágenes de azulejos a diferentes categorías o valores de datos, se puede crear una representación gráfica que facilite la comprensión y la identificación de patrones o tendencias.

Realidad aumentada y virtual: Con el avance de la realidad aumentada y virtual, el fotomosaico puede integrarse en experiencias inmersivas y aplicaciones de juegos para crear entornos visuales únicos. Por ejemplo, en juegos de realidad virtual, se pueden generar escenarios o paisajes utilizando fotomosaicos generados a partir de imágenes reales, brindando una experiencia visual impresionante y envolvente.