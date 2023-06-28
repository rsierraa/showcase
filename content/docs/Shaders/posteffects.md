---
title: Post Effects
weight: 2
---
## Exercise
1. Implement some posteffects you find interesting.


**1. Introducción y contexto**

Un shader es básicamente un programa que realiza cálculos matemáticos, con el propósito de materializar efectos gráficos deseados. Siendo los cálculos realizados por una computadora (generalmente una GPU), y los efectos añadidos, por lo general, a un programa más grande que demuestra gráficos.

**2. Ejercicio**

Se implementaron luma y Top sobel, los cuales pueden aplicarse marcando las checkbox correspondientes.

### Controles

 * **Checkbox Luma**: Marcar para aplicar el efecto de brillo luma.
 * **Checkbox Top Sobel**: Marcar para aplicar el kernel de convolución Top Sobel.
 * **Checkbox Default Video**: marcar para usar el video por defecto, desmarcar para usar la imagen por defecto.

{{< p5-iframe sketch="/showcase/sketches/shaders/posteffects/2.js" width="800" height="650" lib1="https://cdn.jsdelivr.net/gh/VisualComputing/p5.treegl/p5.treegl.js">}}







