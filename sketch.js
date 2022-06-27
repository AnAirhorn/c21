var PLAY = 1;
var END = 0;
var gamestate = PLAY;
var player, playerImg;
var fireGroup,fireImg;
var ground, groundImg;
var backgroundImg;
var gameOver, gameOverImg;
var restart, restartImg;
var score = 0;

function preload(){
 backgroundImg = loadImage("caveBackground.png");   
 groundImg = loadImage("ground2.png");
 playerImg = loadImage("miner.png");
 fireImg = loadImage("fire.png");
 gameOverImg = loadImage("gameOver.png");
 restartImg = loadImage("restart.png");
}

function setup() {

 createCanvas(windowWidth, windowHeight);

 //player - miner
 player = createSprite(70, height-130, 50, 110);
 player.shapeColor = "yellow";
 player.addImage(playerImg);

 //fire
 fireGroup = new Group()
 

 //ground
 ground = createSprite(windowWidth/2, windowHeight-40, windowWidth, 80);
 ground.addImage(groundImg);
 
 //Gameover and Restart
 gameOver = createSprite(width/2, height/2 - 50);
 gameOver.addImage(gameOverImg);
 restart = createSprite(width/2, height/2 + 50);
 restart.addImage(restartImg);
 restart.scale = 0.2

}

function draw() {
  background(backgroundImg);
  textSize(20);
  fill("black")
  text("Score: " + score, 30, 50);
  console.log(score)
  if(gamestate === PLAY){
    ground.velocityX = -(6 + 3*score/100);
    if (ground.x < 300){
      ground.x = ground.width/2;
    }
    player.collide(ground);
    
    spawnObstacles();

    if(keyDown("SPACE") && player.y >= 450){
      player.velocityY = -10;
    }

    if(fireGroup.isTouching(player)){
      gamestate = END;
      console.log("touching")
    }

    score = score + Math.round(getFrameRate()/60);
    ground.velocityX = -(6 + 3*score/100);

    player.collide(ground);
    gameOver.visible = false;
    restart.visible = false;
  }
  
  if(gamestate === END){
    ground.velocityX = 0
    player.velocityY = 0
    fireGroup.setLifetimeEach(-1);
    fireGroup.setVelocityXEach(0);
    player.collide(ground);

    gameOver.visible = true;
    restart.visible = true;

    if(keyDown("SPACE") || mousePressedOver(restart)){
      reset();
    }
  }

  player.velocityY = player.velocityY + 0.8;
  drawSprites();
}

function spawnObstacles(){
   if(frameCount % 60 === 0) {
       var fire = createSprite(width-5,height-80,70,110);
       fire.addImage(fireImg);
       fire.velocityX = -(6 + 3*score/100);
       player.depth = fire.depth;
       player.depth += 1
       fire.lifetime = 300
       fireGroup.add(fire);
  }
}

function reset(){
  fireGroup.destroyEach();
  gamestate = PLAY;
  score = 0;
}