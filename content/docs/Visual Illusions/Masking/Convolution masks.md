---
weight: 3
---
## Ejercicio 4: Kernel de imagenes

**1. Introducción**

Un kernel, matriz de convolución o máscara es una matriz diminuta utilizada en el procesamiento de imágenes para la detección de bordes, el relieve, la nitidez y otras funciones. Para ello se utiliza la convolución entre el núcleo y una imagen. Dicho de otro modo, el núcleo o kernel es la función que determina cómo cada píxel de la imagen de salida se ve afectado por los píxeles vecinos (incluido él mismo) de la imagen de entrada.

![Animación de convolución](https://en.wikipedia.org/wiki/Kernel_(image_processing)#/media/File:2D_Convolution_Animation.gif)

**2. Solución**

Un script que permite cargar una imagen para que sea procesada por el kernel de elección. Al mismo tiempo se elige los niveles de Hue saturation lighthness o hue saturation value.

![HSL y HSV](https://en.wikipedia.org/wiki/HSL_and_HSV#/media/File:Hsl-hsv_models.svg)

De igual forma, se presentan los histogramas RGB de la imagen cargada.

<iframe src="showcase/sketches/convolution/kernels.html" style="border:none;width:750px;height:700px;"></iframe>

**3. Conclusón**

El uso de estos kernels facilitan el procesamiento de imagenes en demacia. Lo cual es importante en el avance tecnológico como el reconocimiento facial.