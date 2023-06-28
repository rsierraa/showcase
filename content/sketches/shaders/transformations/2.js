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

function preload() {
    ball_texture = loadImage('/showcase/docs/Shaders/resources/billar.png');
    ball1_texture = loadImage('/showcase/docs/Shaders/resources/billar.png');
    bg_texture = loadImage('/showcase/docs/Shaders/resources/tabla.jpg');

    pool_texture = loadImage('/showcase/docs/Shaders/resources/tenis.png');
    pool1_texture = loadImage('/showcase/docs/Shaders/resources/tenis.png');
    bg1_texture = loadImage('/showcase/docs/Shaders/resources/cancha.jpg');

    sphere_current_texture = loadImage('/showcase/docs/Shaders/resources/tenis.png');
    sphere1_current_texture = loadImage('/showcase/docs/Shaders/resources/tenis.png');
    bg_current_texture = loadImage('/showcase/docs/Shaders/resources/cy1.jpg');
}

function setup() {
    createCanvas(700, 700, WEBGL);
}


function draw() {
    background("white");
  
    noStroke(); // No dibujar los bordes del prisma
    texture(bg_current_texture);
    sphere(800)
  
    orbitControl(); // Controlar la cámara con el mouse
  
    // Posicionar la luz direccional según la rotación del prisma
    let dirX = sin(prismaRotation);
    let dirY = -cos(prismaRotation);
    let dirZ = -0.5;
    directionalLight(255, 255, 255, dirX, dirY, dirZ);
  
    // Configurar el material brillante para el prisma
    specularMaterial(255);
    shininess(100);
  
    push();
    rotateY(prismaRotation);
    rotateX(prismaRotation);
  
    beginShape(TRIANGLE_STRIP);
    vertex(0, -100, 0);
    vertex(-100, 100, 0);
    vertex(100, 100, 0);
    vertex(0, 0, 100);
    vertex(-100, 100, 0);
    vertex(-100, 100, 0);
    vertex(0, 0, 100);
    vertex(100, 100, 0);
    vertex(0, -100, 0);
    vertex(100, 100, 0);
    vertex(0, 0, 100);
    vertex(0, -100, 0);
    endShape(CLOSE);
  
    pop();
  
    // Actualizar la rotación del prisma
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
      rotateY(sphereRotation);
      translate(x, y, 0);
      sphere(sphereSize);
      pop();
    }
  }
