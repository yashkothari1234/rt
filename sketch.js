var currentTime;
var gameState ="";
var feedPetButton,addFoodButton;
var fedTime,lastFed=0;
var food;
var database;
var dog, happyDog, database, foodS, foodStock;
var bedroomimg,washroomimg,gardenimg;

function preload(){
    dogimg = loadImage("dogImg1.png");
    dogimg2 = loadImage("dogImg.png");
    bedroomimg = loadImage("Bed Room.png");
    washroomimg = loadImage("Wash Room.png");
}

function setup(){
    database = firebase.database();
    canvas = createCanvas(1200,800);
 dog = createSprite(600,400,10,10);
dog.addImage(dogimg);
food = new Food();
food.getState();

feedPetButton = createButton("Feed the Dog");
feedPetButton.position(700,95);
feedPetButton.mousePressed(feedDog);

addFoodButton = createButton("Add Food");
addFoodButton.position(800,95);
addFoodButton.mousePressed(addFood);


   
}

function draw(){
    background(46,139,87);
    dog.display();
    food.display();

fedTime = database.ref('feedTime');
fedTime.on("value",function(data){
lastFed = data.val();
});

fill(0);
textSize(15);
if(lastFed>=12){
    text("Last Feed: "+lastFed % 12 +"PM",350,30 );
}
else if(lastFed==0) {
text("Last Feed : 12 AM",350,30);
}
else{
text("Last Feed: "+lastFed+"AM",350,30);
}

if(gameState!="hungry"){
food.hide();
addFood.hide();
dog.remove();
}
else{
   food.show();
   addFood.show();
   dog.addImage(dogimg2); 
}
if(currentTime==(lastFed+1)){
update("playing");
food.garden();
}
else if (currentTime==(lastFed+2)){
update("Sleeping");
food.bedroom();
}
else if (currentTime==(lastFed+2)&&currentTime<=(lastFed+4)){
update("Bathing");
food.wasshroom();
}
else{
    update("hungry");
    food.display();
}
}

function addFood(){
foodS++;
database.ref('/').update({
    food:foodS
});
}

function feedDog(){
    dog.addImage(dogimg2);
    
    food.updateFoodCount(food.getFoodCount()-1);
    database.ref('/').update({
food:food.getFoodCount(),
feedTime:hour()
    });
}
