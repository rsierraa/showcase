---
weight: 2
---
## Ejercicio 2: Generación infinita en videojuegos

**1. Introducción**

El Ruido Perlin es una función matemática que utiliza la interpolación entre un gran número de gradientes de vectores precalculados para crear un valor que varía de forma pseudoaleatoria en el espacio o en el tiempo. Se asemeja al ruido blanco y se utiliza con frecuencia en imágenes generadas por ordenador para simular la variabilidad de muchos tipos de fenómenos, dándoles un aspecto más realista.


**2. Solución**

En los videojuegos y ambientes virtuales se suele procurar optimizar los recursos de la maquina para dar una mejor experiencia al usuario. Una forma de realizar esto es haciendo uso de la renderización parcial: esto evita que la maquita se cargue con trabajo que no sera visible para el usuario. 

En esta solución se porpone la generacion aleatoria de terreno para un simple simulador de vuelo.

{{< p5-iframe sketch="/showcase/sketches/terrain/terrainGenerator.js" width="800" height="800" >}}

El usuario jwdunn1 propone la generación de un mundo inspirado en el popular videojuego Minecraft haciendo uso del ruido Perlin:

{{< p5-iframe sketch="/showcase/sketches/terrain/terrainGenerator2.js" width="700" height="500" >}}

**3. Conclusión**

El ruido Perlin brinda un patron tan impredecible como la naturaleza misma, lo cual puede ser aprovechado para hacer creer a nuestras mentes que estamos viendo paisajes naturales en los que incluso podemos crear una falsa sensación de movimiento.