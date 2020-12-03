var dog, dogImage, happyDogImage;
var database;
var position;
var foodAmt = 20
var time;
var Fd;


function preload()
{
  dogImage = loadImage("Dog.png");
  happyDogImage = loadImage("happydog (3).png");
}

function setup() {
  database = firebase.database();
  createCanvas(500, 500);
  
  dog = createSprite(250,250);
  dog.addImage(happyDogImage);
  dog.addImage(dogImage);
  dog.scale = 0.2;

  var dogl = database.ref('dog/food');
  dogl.on("value", readPos, error);
  database.ref('dog').set({
    'food': foodAmt
  });
  
}


function draw() {  
  background("green");
  time = frameCount/frameRate();
  //console.log(time)
  

  if(keyWentDown("UP_ARROW")) {
    var keep = time;
    foodAmt = foodAmt - 1;
    dog.addImage(happyDogImage);
    feed()
    console.log(keep)

    if(time-keep > 7) {
      dog.addImage(dogImage);
    }
  }

  drawSprites();
  fill("White")
  textSize(25);text("Food left: " + foodAmt, dog.x - 70, dog.y - 100);
  textSize(15);text("Press up arrow to feed Drago milk", 140, 40)
}

function readPos(data) {
  Fd = data.val();
  foodAmt = Fd;
} 

function error() {
  console.log("error");
}

function feed() {
  database.ref('dog').set({
    'food': foodAmt
  })
}

