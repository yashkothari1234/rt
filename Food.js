class Food{
    constructor(){
        var foodCount = this.foodStock=20;
        var lastFed;
        this.image = loadImage("Milk.png");
 }
 bedroom(){
     background(bedroomimg,550,500);
 }
 garden(){
     background(gardenimg,600,400);
 }
 washroom(){
     background(washroomimg,400,600);
 }
 getState(){
    var gameStateRef = database.ref('gameState');
    gameStateRef.on("value",function(data){
        gameState = data.val();
    })
}
update(state){
    database.ref('/').update({
gameState : state
    });
}
 getFoodCount(){
    var foodCountRef = database.ref('foodCount');
    foodCountRef.on("value",function(data){
        foodStock = data.val();
    })
}
updateFoodCount(count){
    database.ref('/').update({
        foodCount : count
    });
}
deductFoodCount(name){
        var foodIndex = "food"+this.foodStock;
            database.ref(foodIndex).set({
                name : name
            });
    
}
    display(){
        var x=80,y=100;

        imageMode(CENTER);
        image(this.image,x,y,120,120); 

        if(this.foodStock!=0){
for(var i=0;i<this.foodStock;i++){
if(i%10==0){
x = 80;
y= y+50;
}
image(this.image,x,y,120,120);
x = x+30;
}
        }    
    }
}