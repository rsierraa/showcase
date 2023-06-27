let toggleButton;
let toggleState = false;
let ball_texture;
let ball1_texture;
let bg_texture;
let empty_texture;
let sphere_current_texture;
let sphere1_current_texture;
let bg_current_texture;

function preload() {
    ball_texture = loadImage('/showcase/docs/Shaders/resources/billar.png');
    ball1_texture = loadImage('/showcase/docs/Shaders/resources/billar.png');
    bg_texture = loadImage('/showcase/docs/Shaders/resources/tabla.jpg');

    pool_texture = loadImage('/showcase/docs/Shaders/resources/tenis.png');
    pool1_texture = loadImage('/showcase/docs/Shaders/resources/tenis.png');
    bg1_texture = loadImage('/showcase/docs/Shaders/resources/cancha.jpg');

    sphere_current_texture = loadImage('/showcase/docs/Shaders/resources/tenis.png');
    sphere1_current_texture = loadImage('/showcase/docs/Shaders/resources/tenis.png');
    bg_current_texture = loadImage('/showcase/docs/Shaders/resources/cancha.jpg');
}

function setup() {
    createCanvas(700, 700, WEBGL);
    toggleButton = createButton('Toggle texture');
    toggleButton.position(width - 100, 15);
    toggleButton.mousePressed(toggleTextures);
}

function toggleTextures() {
    toggleState = !toggleState; // Changes the state of the textures
    
    if (toggleState) {
        sphere_current_texture = pool_texture;
        sphere1_current_texture = pool1_texture;
        bg_current_texture = bg1_texture;
    } else {
        sphere_current_texture = ball_texture;
        sphere1_current_texture = ball1_texture;
        bg_current_texture = bg_texture;
    }
}

function draw() {
    background("black")
    
    noStroke() //No dibujar la malla de las esferas
    
    texture(bg_current_texture)
    sphere(800)

    for (let i = 0; i < 3; i++) {
         directionalLight(
              255, 255, 255 - i * 25,//Color
              -1, 1, -1 //Dirección
         );
    }

    orbitControl() //Controlar con el mouse la camara

    rotateZ(-0.3) //Inclinación de la tierra

    push()
    rotateY(frameCount * 0.01); //rotación de la tierra sobre su propio eje
    texture(sphere_current_texture); 
    sphere(100);
    pop()

    push()
    rotateY(frameCount * 0.3 / 10);;//Traslación de la luna al rededor de la tierra
    translate(0, 0, 170)//Distancia del centro de la luna al centro de la tierra
    rotateY(-frameCount * 0.0042);//Rotación del la luna sobre su propio eje
    texture(sphere1_current_texture);
    sphere(25);
    pop()
}