var play = 1;
var end = 0;
var gameState = play;
var count = 0;
var cloudImage,cloudsGroup;
var invisibleGround;
var ground,groundImage;
var trex,trexrunning,trexcollided;
var obstaclesGroup;
var restartimage;
var gameOverimage;
var highscore = 0;




  function preload(){
  trexrunning=loadAnimation("trex1.png", "trex3.png", "trex4.png" );
  groundImage = loadImage ("ground2.png"); 
  cloudImage = loadImage ("cloud.png");
  obs1Image = loadImage ("obstacle1.png");
  obs2Image = loadImage ("obstacle2.png");
  obs3Image = loadImage ("obstacle3.png");
  obs4Image = loadImage ("obstacle4.png");
  obs5Image = loadImage ("obstacle5.png");
  obs6Image = loadImage ("obstacle6.png");
  trexcollided = loadAnimation ("trex_collided.png");
  restartimage = loadImage ("restart.png");
  gameOverimage = loadImage("gameOver.png");
  
  
  
}



  function setup() {
  createCanvas(600,200);
  trex=createSprite(400,180,20,50);
  trex.addAnimation("trex", trexrunning );
  trex.addAnimation("collided",trexcollided);
  trex.scale = 0.5;
  trex.x = 50;
  ground=createSprite(200,180,400,20);
  ground.addImage("ground", groundImage);
  invisibleGround = createSprite(200,190,400,5);
  invisibleGround.visible = false;
  ground.x = ground.width/2;
  cloudsGroup = new Group();
  ObstaclesGroup = new Group();
  restart=createSprite(300,140);
  restart.addImage(restartimage);
  restart.scale = 0.5;
  gameOver=createSprite(300,100);
  gameOver.addImage(gameOverimage);
  gameOver.scale = 0.5;
    
  restart.visible = false;
  gameOver.visible = false;
    
    
}


   function draw() {
   background(180);
   text("score:" +count,500,40);
   text("high score:"+highscore,400,40);
   if(keyDown("space")&& trex.y>=164){  
   trex.velocityY = -12;
  }
   //add gravity
   trex.velocityY = trex.velocityY + 0.8;
   trex.collide(invisibleGround);
  
   if(gameState === play ){
   //move the ground
   ground.velocityX = -(6 + 3*count/100);
   count = count +Math.round(getFrameRate()/60);
   if(ground.x<0){
   ground.x = ground.width/2;
  }
    
  //spawn the clouds
  spawnClouds();
  //spawn the clouds
  spawnObstacles();
  if(ObstaclesGroup.isTouching(trex)){
  gameState= end;
  }
  
  }

  

   
  else if(gameState === end ){
  gameOver.visible = true;
  restart.visible = true;
  
  //set velcity of each game object to 0
  ground.velocityX = 0;
  trex.velocityY = 0;
  ObstaclesGroup.setVelocityXEach(0);
  cloudsGroup.setVelocityXEach(0);
    
  trex.changeAnimation("collided",trexcollided);
  ObstaclesGroup.setLifetimeEach(-1);
  cloudsGroup.setLifetimeEach(-1);
  }  
   
  if(mousePressedOver(restart)) {
    reset();
  }
 
  drawSprites();
  }
  
function reset(){
  gameState = play;
  ObstaclesGroup.destroyEach();
  cloudsGroup.destroyEach();
 
  gameOver.visible = false;
  restart.visible = false;
  trex.changeAnimation("trex",trexrunning);
  if(highscore<count){
  highscore=count;
  }
  count = 0;
 
  }
 
  
  function spawnClouds (){
  if(World.frameCount % 60===0){
  var cloud = createSprite(600,120,40,10);
  cloud.y = random(80,120);
  cloud.addImage("cloud",cloudImage);
  cloud.scale = 0.5;
  cloud.velocityX = -3;
  //add lifetime for the clouds
  cloud.lifetime = 200;
  //add depth for the clouds
  cloud.depth = trex.depth;
  trex.depth = trex.depth+1;
  //add ech cloud to a group
  cloudsGroup.add(cloud);
  }
    
  }
  function spawnObstacles(){
  if(World.frameCount % 60 === 0) {
  var obstacle = createSprite(600,165,10,40);
  obstacle.velocityX = - (6 + 3*count/100);
   
   
   //generate random obstacles
   
   var rand = Math.round (random(1,6));
   switch(rand){
     case 1: obstacle.addImage(obs1Image);
       break;
    case 2: obstacle.addImage(obs2Image);
       break;
    case 3: obstacle.addImage(obs3Image);
       break;
    case 4: obstacle.addImage(obs4Image);
       break;
    case 5: obstacle.addImage(obs5Image);
       break;
    case 6: obstacle.addImage(obs6Image);
       break;
     default : break;
     
   } 
    //assign scale and lifetime to the obstacle           
    obstacle.scale = 0.5;
    obstacle.lifetime = 120;
    //add each obstacle to the group
    ObstaclesGroup.add(obstacle);
   }  
}










