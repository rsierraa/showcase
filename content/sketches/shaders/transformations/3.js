let toggleButton;
let toggleState = false;
let ball_texture;
let ball1_texture;
let bg_texture;
let empty_texture;
let sphere_current_texture;
let sphere1_current_texture;
let bg_current_texture;
let prismaRotation = 0;
let numSpheres = 10;
let sphereDistance = 150;
let sphereSize = 30;
let eye;

function preload() {
    bg_current_texture = loadImage('/showcase/docs/Shaders/resources/heaven.jpg');
    eye = loadImage('/showcase/docs/Shaders/resources/neptune.jpg');
}

function setup() {
    createCanvas(700, 700, WEBGL);
}

function draw() {
    background("white");

    noStroke(); // No dibujar los bordes del cubo
    texture(bg_current_texture);
    sphere(800);

    orbitControl(); // Controlar la cámara con el mouse

    // Posicionar la luz direccional según la rotación del cubo
    let dirX = sin(prismaRotation);
    let dirY = -cos(prismaRotation);
    let dirZ = -0.5;
    directionalLight(255, 255, 255, dirX, dirY, dirZ);

    // Configurar el material brillante para el cubo
    specularMaterial(255);
    shininess(100);

    // Actualizar la rotación del cubo
    prismaRotation += 0.01;

    // Configurar las esferas pequeñas
    let sphereRotation = prismaRotation * 2;
    let angle = TWO_PI / numSpheres;

    // Iluminación para las esferas
    let lightColor = color(255);
    let lightIntensity = 0.5;
    pointLight(lightColor, sphereDistance, 0, 0);

    // Material brillante para las esferas
    let sphereMaterial = color(255, 200, 0);
    specularMaterial(sphereMaterial);
    shininess(200);

    for (let i = 0; i < numSpheres; i++) {
        let x = cos(i * angle) * sphereDistance;
        let y = sin(i * angle) * sphereDistance;

        push();
        if (i % 2 === 0) {
            rotateY(sphereRotation);
        } else {
            rotateY(sphereRotation + HALF_PI);
        }
        translate(x, y, 0);
        texture(eye);
        sphere(sphereSize);
        pop();
    }

    // Configurar el cubo en el centro
    let cubeSize = 100;
    let cubeRotation = prismaRotation * 0.5;

    // Iluminación para el cubo
    let cubeLightColor = color(255);
    let cubeLightIntensity = 0.5;
    pointLight(cubeLightColor, 0, 0, 0);

    // Material brillante para el cubo
    let cubeMaterial = color(0, 200, 255);
    specularMaterial(cubeMaterial);
    shininess(200);

    push();
    rotateY(cubeRotation);
    rotateX(cubeRotation);
    rotateZ(cubeRotation);
    box(cubeSize);
    pop();
}
