let pic
let x=0
function preload() {
  pic = loadImage('/showcase/sketches/kinegram/kin.png')
 
}

function setup() {
  createCanvas(400, 400);
  frameRate(15)
}

function draw() {
  background(pic);

  
  
  for(let j=0;j<2000;j+=7){
    stroke(50)
    strokeWeight(5)
    line(j+x,0,j+x,height)
  }
 
  if(x>550){
    x=0
  }else{
    x=x+0.5
  }
  
}









/*
let x=0
for(let k=99; k<1000;k+=7){
   stroke(220)
   strokeWeight(4)
   line(k,0,k,300)
  
   stroke(220)
   strokeWeight(7)
   line(k,290,k,500)
 } 
  push()
  translate(100,101)
  rotate(HALF_PI*4)
  image(pic,0,0,275,300)
  
  pop() 
 
   for(let j=0;j<2000;j+=7){
    stroke(50)
    strokeWeight(2)
    line(j+x,0,j+x,height)
  }
  if(x>550){
    x=0
  }else{
    x=x+0.9
  }*/