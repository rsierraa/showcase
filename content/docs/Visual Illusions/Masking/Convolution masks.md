---
weight: 3
---
## Ejercicio 4: Kernel de imagenes

**1. Introducción**

Un kernel, matriz de convolución o máscara es una matriz diminuta utilizada en el procesamiento de imágenes para la detección de bordes, el relieve, la nitidez y otras funciones. Para ello se utiliza la convolución entre el núcleo y una imagen. Dicho de otro modo, el núcleo o kernel es la función que determina cómo cada píxel de la imagen de salida se ve afectado por los píxeles vecinos (incluido él mismo) de la imagen de entrada.

![Animación de convolución](https://en.wikipedia.org/wiki/Kernel_(image_processing)#/media/File:2D_Convolution_Animation.gif)

**2. Antecedentes y  trabajo previo**

Algunos de los trabajos previos relevantes en este campo incluyen el filtro de Sobel, que se utiliza para detectar bordes en una imagen, el filtro de Laplaciano, que se utiliza para la detección de características y el filtro de Gaussiano, que se utiliza para suavizar imágenes y eliminar ruido. Además, se han desarrollado muchos otros kernels y filtros específicos para tareas particulares en visión por computadora, como el kernel de Gabor para el análisis de texturas y el kernel de Haar para la detección de objetos en imágenes.   

**3. Solución**

Un script que permite cargar una imagen para que sea procesada por el kernel de elección. Al mismo tiempo se elige los niveles de Hue saturation lighthness o hue saturation value.

![HSL y HSV](https://en.wikipedia.org/wiki/HSL_and_HSV#/media/File:Hsl-hsv_models.svg)

De igual forma, se presentan los histogramas RGB de la imagen cargada.

<iframe src="/showcase/sketches/convolution/kernels.html" style="border:none;width:750px;height:700px;"></iframe>
<br>
<br>

{{< details "Código" >}}
<pre>
    function bound(color) {
        if (color > 255)
            return 255
        else if (color < 0)
            return 0
        return color
    }


    function applyLightness(image, width, height) {

        let L = document.querySelector('#lightness-input').value

        if (L == '')
            return;

        let canvas = document.querySelector("#canvas-for-rgba");
        canvas.width = width;
        canvas.height = height;

        var ctx = canvas.getContext("2d");
        ctx.drawImage(image, 0, 0);
        var data = ctx.getImageData(0, 0, width, height).data;  
        
        lightness_data = []

        let R_array = []
        let G_array = []
        let B_array = []

        let def = document.querySelector('#lightness-definition-select').value

        for (let i = 0; i < data.length; i += 4) {

            let r = data[i];
            let g = data[i + 1];
            let b = data[i + 2];
            let a = data[i + 3];
            
            let c = constant(L, r, g, b, def)
            
            let cr = c * r
            let cg = c * g
            let cb = c * b

            let R = bound(Math.round(cr))
            let G = bound(Math.round(cg))
            let B = bound(Math.round(cb))
            let A = a

            R_array.push(R)   
            G_array.push(G)   
            B_array.push(B)    
            
            lightness_data.push(R)
            lightness_data.push(G)
            lightness_data.push(B)
            lightness_data.push(A)

        }

        canvas = document.querySelector("#transformed-image-canvas");
        canvas.width = width;
        canvas.height = height;

        ctx = canvas.getContext("2d");

        var imageData = canvas.getContext('2d').createImageData(width, height);
        imageData.data.set(lightness_data);
        ctx.putImageData(imageData, 0, 0)

        drawHistogram(R_array, 'red');
        drawHistogram(G_array, 'green');
        drawHistogram(B_array, 'blue');
    }

    // función de procesamiento de la imagen
    function processImage(image, width, height) {
        let canvas = document.querySelector("#canvas-for-rgba");
        canvas.width = width;
        canvas.height = height;

        var ctx = canvas.getContext("2d");
        ctx.drawImage(image, 0, 0);
        var data = ctx.getImageData(0, 0, width, height).data; // data es un arreglo con los valores RGBA de la imagen (arreglo unidimensional)

        transformed_data = [] // es el arreglo transformado o procesado

        let ker = kernel(document.querySelector('#kernel-select').value) // kernel a usar

        let R_array = []
        let G_array = []
        let B_array = []

        for (let i = 0; i < data.length; i += 4) { // se itera de 4, i corresponde al valor R del pixel i-ésimo de la imagen

            let r = data[i];
            let g = data[i + 1];
            let b = data[i + 2];
            let a = data[i + 3];

            let pos = position(i, width, height)
            let nbs = neighbours(i, pos, width)
            let ws = weights(ker, pos)

            let sum = ws.reduce((partialSum, a) => partialSum + a, 0); // en la matriz se debe garantizar que la suma de los pesos no sea cero para que funcione
            
            let rtotal = 0
            let gtotal = 0
            let btotal = 0
            let atotal = 0

            // suma ponderada para cada valor R G B A 
            for (let j = 0; j < nbs.length; j++) {
                rtotal += data[nbs[j]] * ws[j]
                gtotal += data[nbs[j] + 1] * ws[j]
                btotal += data[nbs[j] + 2] * ws[j]
                atotal += data[nbs[j] + 3] * ws[j]
            }

            // se obtiene la suma ponderada: error cuando sum es cero ...
            let R = Math.round(rtotal / sum)
            let G = Math.round(gtotal / sum)
            let B = Math.round(btotal / sum)
            let A = Math.round(atotal / sum)

            R_array.push(R)   
            G_array.push(G)   
            B_array.push(B)           

            // se agregan los nuevos valores al arreglo transformado
            transformed_data.push(R)
            transformed_data.push(G)
            transformed_data.push(B)
            transformed_data.push(A)
        }

        // se crea canvas de la imagen transformada para mostrarla en pantalla
        // nota: se necesita usar canvas para poder visualizar la imagen apartir del arreglo de R G B A
        canvas = document.querySelector("#transformed-image-canvas");
        canvas.width = width;
        canvas.height = height;

        ctx = canvas.getContext("2d");

        var imageData = canvas.getContext('2d').createImageData(width, height);
        imageData.data.set(transformed_data);
        ctx.putImageData(imageData, 0, 0)

        drawHistogram(R_array, 'red');
        drawHistogram(G_array, 'green');
        drawHistogram(B_array, 'blue');
    }

    // se procesa imagen cuando se sube archivo
    const image_input = document.querySelector("#image-input");
    image_input.addEventListener("change", function() {

        const reader = new FileReader();
        reader.readAsDataURL(this.files[0]);
        reader.onload = (e) => {

            const image = new Image();
            
            image.src = e.target.result;

            image.onload = (e) => {

                const width = e.target.width;
                const height = e.target.height;

                const uploaded_image = reader.result
                document.querySelector("#uploaded-image").src = uploaded_image;

                processImage(image, width, height)

                document.querySelector('#lightness-input').removeAttribute("hidden"); 
                document.querySelector('#lightness-definition-select').removeAttribute('hidden')

            };
        };
    });

    // se procesa imagen cuando se cambia el valor del select kernel
    const kernel_select = document.querySelector("#kernel-select");
    kernel_select.addEventListener("change", function() {

        const image = new Image();
            
        let img = document.querySelector("#uploaded-image")
        
        image.src = img.src;

        let width = img.width
        let height = img.height

        processImage(image, width, height)
    });

    // se procesa imagen cuando se cambia el valor del select kernel
    const lightness_input = document.querySelector("#lightness-input");
    lightness_input.addEventListener("change", function() {

        const image = new Image();
            
        let img = document.querySelector("#uploaded-image")
        
        image.src = img.src;

        let width = img.width
        let height = img.height

        applyLightness(image, width, height)
    });


    // se procesa imagen cuando se cambia el valor del select kernel
    const lightness_definition_select = document.querySelector("#lightness-definition-select");
    lightness_definition_select.addEventListener("change", function() {

        const image = new Image();
            
        let img = document.querySelector("#uploaded-image")
        
        image.src = img.src;

        let width = img.width
        let height = img.height

        applyLightness(image, width, height)
    });


    // obtener posición del pixel según su índice y los valores weight y height
    let position = (i, w, h) => { 
        if (i == 0)
            return 'top-left-corner';
        else if (i == (w * 4) - 1)
            return 'top-right-corner';
        else if (i == h * ((w * 4) - 1))
            return 'bottom-left-corner';
        else if (i == (h * w * 4) - 1)
            return 'bottom-right-corner';
        else if (i < (w * 4) - 1)
            return 'top-row';
        else if (i % (w * 4) == (w * 4) - 1)
            return 'right-row';
        else if (i > h * ((w * 4) - 1) && i < (h * w * 4) - 1)
            return 'bottom-row';      
        else if (i % (w * 4) == 0)
            return 'left-row';        
        else
            return 'inner-cell'
    }

    // arreglo de índices según posición, que será usado para obtener las posiciones de los pixeles vecinos (neighbours) y 
    // las posiciones de los pesos de la matriz del kernel
    let indexes = (position) => { 
        if (position == 'inner-cell')
            return [0, 1, 2,
                    3, 4, 5,
                    6, 7, 8]
        else if (position == 'left-row')
            return [   1, 2, 
                       4, 5,
                       7, 8]
        else if (position == 'right-row')
            return [0, 1, 
                    3, 4,
                    6, 7   ]
        else if (position == 'top-row')
            return [ 
                    3, 4, 5,
                    6, 7, 8]
        else if (position == 'bottom-row')
            return [0, 1, 2, 
                    3, 4, 5,
                           ]
        else if (position == 'top-right-corner')
            return [                               
                    3, 4,
                    6, 7   ]
        else if (position == 'top-left-corner')
            return [
                       4, 5,
                       7, 8]
        else if (position == 'bottom-left-corner')
            return [   1, 2, 
                       4, 5
                           ]
        else if (position == 'bottom-right-corner')
            return [0, 1, 
                    3, 4   
                           ]
        else
            return []
    }

    // arreglo con los índices de los pixeles vecinos
    let neighbours = (i, position, w) => {

        let matrix = [i - (w * 4) - 4, i - (w * 4), i - (w * 4) + 4, 
                      i - 4,           i          , i + 4,
                      i + (w * 4) - 4, i + (w * 4), i + (w * 4) + 4]

        let idx = indexes(position)

        let nbs = []

        idx.forEach((i) => {
            nbs.push(matrix[i])
        })

        return nbs
    }

    // kernels disponibles: cada matriz es una matriz de pesos
    let kernel = (kernel) => {
        if (kernel == 'identity')
            return [0, 0, 0, 
                    0, 1, 0,
                    0, 0, 0]
        else if (kernel == 'gaussian-blur')
            return [1, 2, 1, 
                    2, 4, 1,
                    1, 2, 1]
        else if (kernel == 'emboss')
            return [-2, -1, 0, 
                    -1, 2, 1,
                    0, 1, 2]
        else if (kernel == 'left-sobel')
            return [1, 0, -1, 
                    2, 1, -2,
                    1, 0, -1]
        else if (kernel == 'right-sobel')
            return [-1, 0, 1, 
                    -2, 1, 2, // se agregó 1 en la posición central para garantizar que suma de pesos no sea cero
                    -1, 0, 1]
        else if (kernel == 'top-sobel')
            return [1, 2, 1, 
                    0, 1, 0,
                    -1, -2, -1]
        else if (kernel == 'bottom-sobel')
            return [-1, -2, -1, 
                    0, 1, 0,
                    1, 2, 1]
        else if (kernel == 'sharpen')
            return [0, -1, 0, 
                    -1, 5, -1,
                    0, -1, 0]
        else if (kernel == 'outline')
            return [-1, -1, -1, 
                    -1, 9, -1,
                    -1, 1, -1]
        else
            return []
    }

    // arreglo de pesos que se usarán en la suma ponderada del pixel actual: depende del kernel y de la posición del pixel
    let weights = (ker, position) => {

        let idx = indexes(position)

        let ws = []

        idx.forEach((i) => {
            ws.push(ker[i])
        })

        return ws
    }

    let constant = (L, R, G, B, definition) => {
        if (definition == 'HSI')
            return 3 * (L / (R + G + B))
        else if (definition == 'HSV')
            return L / Math.max(R, G, B)
        else if (definition == 'HSL')
            return  2 * (L / (Math.min(R, G, B) + Math.max(R, G, B)))
        else if (definition == 'Luma 601')
            return L / (0.2989 * R + 0.5870 * G + 0.1140 * B)
        else if (definition == 'Luma 240')
            return L / (0.212 * R + 0.701 * G + 0.087 * B)
        else if (definition == 'Luma 709')
            return L / (0.2126 * R + 0.7152 * G + 0.0722 * B)
        else if (definition == 'Luma 2020')
            return L / (0.2627 * R + 0.6780 * G + 0.0593 * B)
        else
            return 1   
    }

    function drawHistogram(data, color) {

        let colors = {
            'red': '#FF0000',
            'green': '#00FF00',
            'blue': '#0000FF'
        }

        var domain  = [0, 255]

        var margin = { top: 30, right: 30, bottom: 30, left: 50 },
            width = 460 - margin.left - margin.right,
            height = 400 - margin.top - margin.bottom;

        var x = d3
            .scaleLinear()
            .domain(domain)
            .range([0, width]);

        var histogram = d3
            .histogram()
            .domain(x.domain())
            .thresholds(x.ticks(256)); 

        var bins = histogram(data);

        d3
            .select(`#${color}-histogram svg`).remove()

        var svg = d3
            .select(`#${color}-histogram`)
            .append("svg")
            .attr("width", width + margin.left + margin.right)
            .attr("height", height + margin.top + margin.bottom)
            .append("g")
            .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

        svg
            .append("g")
            .attr("transform", "translate(0," + height + ")")
            .call(d3.axisBottom(x));

        var y = d3
            .scaleLinear()
            .range([height, 0])
            .domain([
                0,
                d3.max(bins, function(d) {
                return d.length;
                })
            ]);

        svg.append("g").call(d3.axisLeft(y));

        svg
            .selectAll("rect")
            .data(bins)
            .enter()
            .append("rect")
            .attr("x", 1)
            .attr("transform", function(d) {
                return "translate(" + x(d.x0) + "," + y(d.length) + ")";
            })
            .attr("width", function(d) {
                return x(d.x1) - x(d.x0) - 1;
            })
            .attr("height", function(d) {
                return height - y(d.length);
            })
            .style("fill", colors[color]);

    }

    </pre>
{{< /details >}}




## Explicación breve

>La función processImage procesa la imagen utilizando una matriz de convolución (kernel) y devuelve una imagen transformada. La función applyLightness ajusta la luminosidad de la imagen según el valor de entrada del usuario. También dibuja un histograma para cada componente RGB de la imagen transformada. Ambas funciones utilizan la función bound para garantizar que los valores RGB estén dentro del rango [0, 255]. La matriz de convolución y la definición de luminosidad se obtienen a través de selecciones de usuario en la página web.
>


**4. Conclusión y trabajo a futuro/**

El trabajo realizado en este campo ha sido fundamental para el desarrollo de la visión por computadora y el aprendizaje automático, y el trabajo futuro promete seguir mejorando nuestras capacidades para procesar y comprender imágenes.

A medida que las aplicaciones que involucran conceptos de computación visual o procesamiento de imágenes se vuelven más complejas, se espera que la investigación sobre los kernels y el procesamiento de imágenes continúe avanzando. Por ejemplo, se están investigando nuevos kernels y filtros para mejorar la detección de características y la clasificación de imágenes. Además, se están desarrollando nuevas técnicas para interpretar y visualizar las características aprendidas por las redes neuronales convolucionales, que son ampliamente utilizadas para estas tareas.