---
weight: 2
---
## Ejercicio 5: Pixelador

**1. Introducción**

Aunque a primera vista parece qeu pixelar una imagen sea un desproposito, lo cierto es que tiene aplicaciones muy utiles. Un ejemplo de esto es la censura por pixelado que busca ocultar información; Otro uso bastante popular es el de reducir el tamaño de las imagenes a cambio de perder algo de calidad para poder enviar archivos no tan pesados.

**2. Solución**

A continuación se pixela el mismo video utilizando dos tecnicas diferentes: Color averaging y Spatial coherence:

Spatial Coherence

{{< p5-iframe sketch="/showcase/sketches/pixelatorDemoSC.js" width="800" height="400" >}}

Color Averaging

{{< p5-iframe sketch="/showcase/sketches/pixelatorDemoCA.js" width="800" height="400" >}}

**3. Conclusión**

Utilizando el metodo de coherencia espacial se conservan unos colores mas vivos respecto a su contraparte de promediado de color. Por lo que desde nuestra opinión de ignorantes, consideramos al metodo de coherencia espacial como el mejor entre estos.