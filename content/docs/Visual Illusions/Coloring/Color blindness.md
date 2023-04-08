---
weight: 2
---
Color blindness

## Ejercicio 1: Ayuda a daltonicos

**1. Introducción**

El daltonismo se define como la incapacidad de ver algunos colores en la forma normal. Ocurre cuando existe un problema con ciertas celulas nerviosas del ojo que perciben el color. Si solo falta un pigmento, la persona suele tener inconvenientes al momento de diferenciar entre el rojo y el verde, el cual es el tipo más común de daltonismo. En la mayoría de los casos, esta condición se debe a un problema genético.

{{< hint info >}}
Encuentra más información sobre el daltonismo en https://www.nei.nih.gov/learn-about-eye-health/eye-conditions-and-diseases/color-blindness
{{< /hint >}}

Ser daltonico, no solo significa ver los colores de forma diferente. De hecho, puede involucrar perderse de información vital dependiendo de la composición de una imagen. A continuación se presenta un ejemplo de ello. 



######

**2. Antecedentes y Trabajo Previo**

Desde el desarrollo de software y las interfaces gráficas, existen  implementaciones para intentar comprender los distintos tipos de daltonismo, y de esta manera ayudar a escoger paletas de colores que sean "seguras" desde este punto de vista; es decir, que sean legibles para las personas que poseen esta condición. Un ejemplo de estas herramientas es esta, de Adobe, para obtener paletas "Color Blind Safe":

{{< hint info >}}
https://color.adobe.com/create/color-accessibility
{{< /hint >}}


Dentro de los Web Content Accesibilty Guidelines 2.0, se describe los distintos parámetros que son estándar para la inclusividad a la hora de hacer contenido web, y dentro de estos se justifican los niveles de contraste entre colores, entendiéndose un mayor contraste como una implementación más inclusiva para personas con condiciones visuales direrentes. Una mejor explicación de los contrastes se encuentra en:


{{< hint info >}}
https://palett.es/accessibility
{{< /hint >}}

**3. Solución**

Para ayudar a esta población, se desarrolló una aplicación que, haciendo uso de la posición del cursor, determina el Hue de pixel al que se esta señalando, de tal forma que cuando el usuario oprima click sobre algún punto de la imagen, un audio le indicara qué color prima en esa zona; entre amarillo, azul, rojo y verde.

El Hue es una representación de colores de un solo valor, que corresponde al ángulo que apunta al color representado, organizado en un círculo que agrupa los colores primarios y sus intersecciones (de 0 a 360 grados), entonces el programa obtiene este valor y lo ubica según el intervalo del círculo en el que entre.

{{< hint info >}}
Más información sobre la representación Hue de los colores en:
https://en.wikipedia.org/wiki/Hue
{{< /hint >}}


{{< details "Código" >}}
<pre>
// Carga la imagen y los sonidos a utilizar
function preload() {
  img = loadImage('/showcase/sketches/colorBlind/daltonismo.jpeg');
  soundFormats('mp3');
  azulSound = loadSound('/showcase/sketches/colorBlind/azul');
  rojoSound = loadSound('/showcase/sketches/colorBlind/rojo');
  verdeSound = loadSound('/showcase/sketches/colorBlind/verde');
  amarilloSound = loadSound('/showcase/sketches/colorBlind/amarillo');
}

// Configura el canvas y define la función que se ejecuta al hacer clic en él
function setup() {
  let cnv = createCanvas(700, 700); // Crea un canvas con las dimensiones indicadas
  img.resize(700, 700); // Redimensiona la imagen para que coincida con las dimensiones del canvas
  cnv.mousePressed(canvasPressed); // Asigna la función canvasPressed() para ser llamada cada vez que se haga clic en el canvas
}

// Función que reproduce un sonido dependiendo del color que se ha detectado en el canvas
function getColor(colorHue) {
  colorHue = hue(colorHue); // Obtiene el valor de "hue" del color detectado
  
  // Si el valor de "hue" del color detectado está entre 0 y 12, se reproduce el sonido "rojo"
  if (colorHue > 0 && colorHue < 12) {
    rojoSound.play();
    return;
  }
  
  // Si el valor de "hue" del color detectado está entre 33 y 67, se reproduce el sonido "amarillo"
  if (colorHue > 33 && colorHue < 67) {
    amarilloSound.play();
    return;
  }
  
  // Si el valor de "hue" del color detectado está entre 67 y 165, se reproduce el sonido "verde"
  if (colorHue > 67 && colorHue < 165) {
    verdeSound.play();
    return;
  }
  
  // Si el valor de "hue" del color detectado está entre 165 y 255, se reproduce el sonido "azul"
  if (colorHue > 165 && colorHue < 255) {
    azulSound.play();
    return;
  }
  
  // Si el valor de "hue" del color detectado es mayor a 311, se reproduce el sonido "rojo"
  if (colorHue > 311) {
    rojoSound.play();
    return;
  }
}

// Función que se llama al hacer clic en el canvas
function canvasPressed(){
    getColor(detectedColor);
}

function draw() {
  background(220); // Establece el color de fondo
  
  let pix = img.get(mouseX, mouseY); // Obtiene el color del pixel que se encuentra en la posición del mouse
  
  image(img, 0, 0, width, height); // Muestra la imagen en el canvas
  
  // Convierte el color del pixel obtenido en el paso anterior a un objeto de color de p5.js
  detectedColor = color(red(pix), green(pix), blue(pix));
}
</pre>
{{< /details >}}

en esta solución solo se tienen en cuenta los colores rojo, verde, azul y amarillo. Pues los tipos mas comunes de daltonismo involucran los colores dichos colores.

{{< p5-iframe sketch="/showcase/sketches/colorBlind/colorBlind.js"  width="525" height="525" >}}

**4. Conclusiones**

En la actualidad la humanidad consume toneladas de contenido digital y no seria justo excluir a la población que padece de daltonismo cuando 
la misma digitalización ofrece alternativas. Aunque exiten herramientas mas efectivas como la conversion de color en tiempo real, todas
las herramientas de inclusión son utiles, incluso una tan rustica como la presentada.

Desde el punto de vista del software es posible, aunque no revertir la condición médica del daltonismo o tratarla de alguna manera; brindar asistencia para lidiar con esta desde el lado de las interfaces de usuario. Esto, bien sea teniendo en cuenta los parámetros necesarios para diseñar productos amigables con esta condición, o implementando asistencia al usuario para identificar colores, como es el caso de la implementación presentada en este informe,
