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



**3. Solución**

Para ayudar a esta población, se desarrollo una aplicacion que haciendo uso de la posición del cursor mide los niveles RGB del pixel al que se esta señalando, de tal forma que cuando el usuario oprima click, un audio le indicara de que color es esa zona. 

en esta solución solo se tienen en cuenta los colores rojo, verde, azul y amarillo. Pues los tipos mas comunes de daltonismo involucran los colores dichos colores.

{{< p5-iframe sketch="/showcase/sketches/colorBlind/colorBlind.js"  width="525" height="525" >}}

**4. Conclusiones**

En la actualidad la humanidad consume toneladas de contenido digital y no seria justo excluir a la población que padece de daltonismo cuando 
la misma digitalización ofrece alternativas. Aunque exiten herramientas mas efectivas como la conversion de color en tiempo real, todas
las herramientas de inclusión son utiles, incluso una tan rustica como la presentada.

Desde el punto de vista del software es posible, aunque no revertir la condición médica del daltonismo o tratarla de alguna manera; brindar asistencia para lidiar con esta desde el lado de las interfaces de usuario. Esto, bien sea teniendo en cuenta los parámetros necesarios para diseñar productos amigables con esta condición, o implementando asistencia al usuario para identificar colores, como es el caso de la implementación presentada en este informe,
