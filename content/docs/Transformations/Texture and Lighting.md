---
weight: 6
---

## Texture and Lighting

## 1. Introducción

En el campo de la Computación Visual, las transformaciones juegan un papel fundamental en la creación y manipulación de imágenes y objetos en entornos 2D y 3D. Estas operaciones nos permiten alterar la posición, orientación, escala e iluminación de elementos visuales, proporcionando una amplia gama de posibilidades creativas.

Las transformaciones en el espacio son esenciales para la generación de efectos visuales impresionantes y la construcción de escenas realistas en aplicaciones como gráficos por computadora, videojuegos, realidad virtual y animación. Mediante el uso de matrices y operaciones geométricas, podemos trasladar, rotar, escalar y deformar objetos en el espacio, creando la ilusión de movimiento y transformación en las representaciones visuales.

Además de su papel en la manipulación de objetos virtuales, las transformaciones en el espacio también son cruciales para la composición de imágenes y la edición fotográfica. Con ellas, podemos corregir distorsiones, ajustar la perspectiva y mejorar la calidad visual de las fotografías, lo que permite obtener resultados impactantes y profesionales.

Las transformaciones en el espacio son un componente fundamental en la creación de efectos especiales en películas y producciones audiovisuales. A través de ellas, los artistas pueden hacer que los objetos se muevan, se transformen y se integren de manera realista en escenas complejas, llevando al espectador a mundos imaginarios y sorprendentes.

## 2. Conceptos clave

Una de las transformaciones más básicas es la traducción (translation), que nos permite desplazar un objeto en el espacio sin cambiar su forma ni orientación original. En 2D, esto se logra mediante el desplazamiento de las coordenadas (x, y) del objeto en una dirección específica. En 3D, se aplica el mismo principio desplazando las coordenadas (x, y, z) del objeto en una dirección determinada.

La escala (scaling) es otra transformación comúnmente utilizada, que nos permite cambiar el tamaño de un objeto en el espacio. Esta transformación puede ser aplicada de forma uniforme en todas las dimensiones del objeto, ya sea para agrandarlo o reducirlo. En 2D, la escala se realiza multiplicando las coordenadas (x, y) del objeto por factores de escala. En 3D, se aplica el mismo principio multiplicando las coordenadas (x, y, z) del objeto por los factores de escala correspondientes.

Las rotaciones (rotations) nos permiten girar un objeto alrededor de un punto de referencia, cambiando su posición y orientación relativa en el espacio. Estas transformaciones son esenciales para crear efectos visuales dinámicos y modificar la perspectiva de los objetos. En 2D, las rotaciones se realizan aplicando una matriz de rotación a las coordenadas (x, y) del objeto. En 3D, las rotaciones se pueden realizar alrededor de un eje específico, como el eje x, y o z, utilizando matrices de rotación de 3x3 o cuaterniones.

La iluminación (lighting) desempeña un papel crucial en la percepción visual de objetos en un entorno 3D. Al manipular propiedades de la luz como dirección, intensidad y color, podemos simular diferentes condiciones de iluminación y agregar realismo a nuestras creaciones. En p5.js, un framework de JavaScript para la creación de gráficos y animaciones interactivas, se pueden utilizar varios tipos de iluminación, como la luz ambiente (ambient light), luz direccional (directional light), luz puntual (point light) y luz focal (spotlight), para mejorar la apariencia visual de escenas 3D.

Los árboles de transformación (transformation trees) son estructuras jerárquicas utilizadas para gestionar múltiples transformaciones de manera eficiente. Permiten la combinación y aplicación de transformaciones en un orden específico, lo que resulta en efectos visuales más complejos. En p5.js, se pueden implementar árboles de transformación utilizando una técnica conocida como pila de matrices push-pop (push-pop matrix stack). Esta aproximación basada en pilas te permite definir una serie de transformaciones y gestionarlas de manera jerárquica.

Al organizar las transformaciones en una estructura jerárquica, los árboles de transformación te permiten crear animaciones y efectos visuales complejos. Por ejemplo, puedes animar la posición, escala y rotación de un objeto a lo largo del tiempo combinando transformaciones de traslación, escala y rotación dentro de un árbol de transformación. Además, puedes aplicar árboles de transformación para crear escenas intrincadas con múltiples objetos. Al anidar árboles de transformación, puedes establecer relaciones padre-hijo entre objetos, lo que permite realizar transformaciones relativas a los sistemas de coordenadas de sus padres.

## 3. Motivación

Este trabajo tiene como objetivo analizar cómo la geometría de las figuras geométricas afecta la interacción con la iluminación desde diferentes ángulos. Exploraremos cómo la forma y la estructura de estas figuras influyen en la distribución de la luz, generando efectos visuales únicos. Este análisis nos permitirá comprender cómo la geometría afecta la apariencia visual de las figuras y cómo utilizar este conocimiento para crear representaciones más realistas y estéticamente atractivas.

## 4. Sketch

{{< p5-iframe sketch="/showcase/sketches/shaders/transformations/1.js" width="950" height="900" lib1="https://cdn.jsdelivr.net/gh/VisualComputing/p5.treegl/p5.treegl.js">}}







