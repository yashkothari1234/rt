//Create variables here
var dog,happyDog;
var database;
var foodS,foodStock;

var dogimg,happydogimg;

var food = 20;
function preload()
{
  //load images here
  happydogimg = loadImage("dogImg.png");
 dogimg = loadImage("dogImg1.png");
}

function setup() {
  database = firebase.database();
	createCanvas(1500, 1500);
   dog = createSprite(750,450,10,10);
  dog.addImage(dogimg);

  foodStock = database.ref('food');
  foodStock.on("value",readStock);
}


function draw() {  
background(46,139,87);

if(keyWentDown(UP_ARROW)){
writeStock(foodS);
dog.addImage(happydogimg);
food = food-1
}
if(keyWentUp(UP_ARROW)) {
  dog.addImage(dogimg);
}

  drawSprites();
  //add styles here
textSize(35);
fill("black");
stroke("black");
text("Press the up arrow key to feed Candy !! ",100,90);
text("food remaining: "+food,200,200);
}

function readStock(data){
  foodS = data.val();
}
function writeStock(x){
database.ref('/').update({
  food : "x" 
})
}

