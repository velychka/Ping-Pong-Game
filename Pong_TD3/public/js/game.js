var game = {


  groundWidth : 700,
  groundHeight : 400,
  groundColor: "#000000",
  netWidth : 6,
  netColor: "#FFFFFF",
     
  groundLayer : null,
  scoreLayer : null,
  playersBallLayer : null,
  scorePosPlayer1 : 300,
  scorePosPlayer2 : 365,
  wallSound : null,
  playerSound : null,
  divGame : null,

  ball : {
      width : 10,
      height : 10,
      color : "#FFFF00",
      posX : 200,
      posY : 200, 
      speed : 2,
      directionX : 1,
      directionY : 1,
      inGame : true,


      move : function(posX, posY) {

          if(this.inGame){

              if (posX != undefined && posY != undefined) {
                this.posX = posX;
                this.posY = posY;
              } else {
                this.posX += this.directionX * this.speed;
                this.posY += this.directionY * this.speed;
              }
              
          }
      },

      bounce : function(soundToPlay) {
          if ( this.posX > game.groundWidth || this.posX < 0 ){

              this.directionX = -this.directionX;
              soundToPlay.play();

          }
          if ( this.posY > game.groundHeight || this.posY < 0  ){

              this.directionY = -this.directionY;  
              soundToPlay.play();    
          }

          
      }, 

      collide : function(anotherItem) {
      if ( !( this.posX >= anotherItem.posX + anotherItem.width || this.posX <= anotherItem.posX - this.width
      || this.posY >= anotherItem.posY + anotherItem.height || this.posY <= anotherItem.posY - this.height ) ) {
          // Collision
          return true;
      } 
      return false;
      },

      lost : function(player) {

          var returnValue = false;
          if ( player.originalPosition == "left" && this.posX == 0) {
            returnValue = true;
          } else if ( player.originalPosition == "right" && this.posX == game.groundWidth ) {
            returnValue = true;
          }
          return returnValue;
        }
    },

  playerOne : {
      width : 10,
      height : 50,
      color : "#4AD7FF",
      posX : 10,
      posY : 125,
      goUp : false,
      goDown : false,
      originalPosition : "left",
      score : 0,
      ai : false
  },
     
    playerTwo : {
      width : 10,
      height : 50,
      color : "#4AD7FF",
      posX : 680,
      posY : 125,
      goUp : false,
      goDown : false,
      originalPosition : "right",
      score : 0,
      ai : true  
  },

    playerThree : {
      width : 10,
      height : 50,
      color : "#FFFFFF",
      posX : 10,
      posY : 300,
      goUp : false,
      goDown : false,
      originalPosition : "left",
      score : 0,
      ai : true  
  },

    playerFour : {
      width : 10,
      height : 50,
      color : "#FFFFFF",
      posX : 680,
      posY : 300,
      goUp : false,
      goDown : false,
      originalPosition : "right",
      score : 0,
      ai : true  
  },

  init : function(player) {

    this.divGame = document.getElementById("divGame");
   
    this.groundLayer= game.display.createLayer("terrain", this.groundWidth, this.groundHeight, this.divGame, 0, "#000000", 10, 50); 
    game.display.drawRectangleInLayer(this.groundLayer, this.netWidth, this.groundHeight, this.netColor, this.groundWidth/2 - this.netWidth/2, 0);
       
    this.scoreLayer = game.display.createLayer("score", this.groundWidth, this.groundHeight, this.divGame, 1, undefined, 10, 50);
    game.display.drawTextInLayer(this.scoreLayer , "SCORE", "10px Arial", "#FF0000", 10, 10);
       
    this.playersBallLayer = game.display.createLayer("joueursetballe", this.groundWidth, this.groundHeight, this.divGame, 2, undefined, 10, 50);  
    game.display.drawTextInLayer(this.playersBallLayer, "JOUEURSETBALLE", "10px Arial", "#FF0000", 100, 100);
      
    // //this.scoreLayer.clear()
    this.displayScore(0,0);
    this.displayBall();
    this.displayPlayers();



    if(player==1){
      this.initKeyboard(game.control.onKeyDown, game.control.onKeyUp);
     // this.initMouse(game.control.onMouseMove);
    }
    if(player==2){
      this.initKeyboard(game.control2.onKeyDown2, game.control2.onKeyUp2);
     // this.initMouse(game.control2.onMouseMove2);
    }

    this.wallSound = new Audio("./sound/wall.ogg");
    this.playerSound = new Audio("./sound/player.ogg");
    //game.ai.setPlayerAndBall(this.playerTwo, this.ball);
    
  }, 


  init2 : function() {

    this.groundLayer= game.display.createLayer("terrain", this.groundWidth, this.groundHeight, undefined, 0, "#000000", 0, 0); 
    game.display.drawRectangleInLayer(this.groundLayer, this.netWidth, this.groundHeight, this.netColor, this.groundWidth/2 - this.netWidth/2, 0);
 
    this.scoreLayer = game.display.createLayer("score", this.groundWidth, this.groundHeight, undefined, 1, undefined, 0, 0);
    game.display.drawTextInLayer(this.scoreLayer , "SCORE", "10px Arial", "#FF0000", 10, 10);
 
    this.playersBallLayer = game.display.createLayer("joueursetballe", this.groundWidth, this.groundHeight, undefined, 2, undefined, 0, 0);  
    game.display.drawTextInLayer(this.playersBallLayer, "JOUEURSETBALLE", "10px Arial", "#FF0000", 100, 100);
      
    // //this.scoreLayer.clear()
    this.displayScore(0,0);
    this.displayBall();
    this.displayPlayers();

    

    this.initKeyboard(game.control2.onKeyDown2, game.control2.onKeyUp2);
    this.initMouse(game.control2.onMouseMove2);

    this.wallSound = new Audio("./sound/wall.ogg");
    this.playerSound = new Audio("./sound/player.ogg");
    //game.ai.setPlayerAndBall(this.playerTwo, this.ball);
    
  }, 

  displayScore : function(scorePlayer1, scorePlayer2) {
    //this.scoreLayer = game.display.createLayer("score", this.groundWidth, this.groundHeight, undefined, 1, undefined, 0, 0);
    game.display.drawTextInLayer(this.scoreLayer, scorePlayer1, "60px Arial", "#FFFFFF", this.scorePosPlayer1, 55);
    game.display.drawTextInLayer(this.scoreLayer, scorePlayer2, "60px Arial", "#FFFFFF", this.scorePosPlayer2, 55);
  }, 

  // displayBall : function() {
  //     game.display.drawRectangleInLayer(this.playersBallLayer, this.ball.width, this.ball.height, this.ball.color, this.ball.posX, this.ball.posY);
  // },

  displayPlayers : function() {
      //this.displayScore( game.playerOne.scorePlayer1, game.playerTwo.scorePlayer2);
      game.display.drawRectangleInLayer(this.playersBallLayer, this.playerOne.width, this.playerOne.height, this.playerOne.color, this.playerOne.posX, this.playerOne.posY);
      game.display.drawRectangleInLayer(this.playersBallLayer, this.playerTwo.width, this.playerTwo.height, this.playerTwo.color, this.playerTwo.posX, this.playerTwo.posY);
      game.display.drawRectangleInLayer(this.playersBallLayer, this.playerThree.width, this.playerThree.height, this.playerThree.color, this.playerThree.posX, this.playerThree.posY);
      game.display.drawRectangleInLayer(this.playersBallLayer, this.playerFour.width, this.playerFour.height, this.playerFour.color, this.playerFour.posX, this.playerFour.posY);

  },
  
  displayBall : function() {
      game.display.drawRectangleInLayer(this.playersBallLayer, this.ball.width, this.ball.height, this.ball.color, this.ball.posX, this.ball.posY);
  },

  moveBall : function(posX, posY) { 
      this.ball.move(posX, posY);
      this.ball.bounce(this.wallSound);
      this.displayBall();
  },
  
  clearLayer : function(targetLayer) {
      targetLayer.clear();
  }, 

  initKeyboard : function(onKeyDownFunction, onKeyUpFunction) {
      window.onkeydown = onKeyDownFunction;
      window.onkeyup = onKeyUpFunction;
  },

  movePlayers : function(posY, player, posY2, player2) {


    if (player == undefined) {

      player = this.playerTwo;
      player.posY = posY;

      player2 = this.playerFour;
      player2.posY = posY2; 



      if ( game.control.controlSystem == "KEYBOARD" ) {
        //console.log(game.control.controlSystem == "KEYBOARD");
          // keyboard control
         if ( this.playerOne.goUp && this.playerOne.posY > 0  ) {
         // console.log(this.playerOne.posY);
          this.playerOne.posY-=5;
         } 
          if ( this.playerOne.goDown && this.playerOne.posY < (game.groundHeight)/2.5) {
            this.playerOne.posY+=5;
         }

         if ( this.playerThree.goUp && this.playerThree.posY > (game.groundHeight)/2 ) {
          this.playerThree.posY-=5;
         } 
         if ( this.playerThree.goDown && this.playerThree.posY < game.groundHeight - this.playerThree.height) {
          this.playerThree.posY+=5;
        }
    
      } 

      /*if ( game.control.controlSystem == "MOUSE" ) {
        // mouse control
        if (this.playerOne.goUp && this.playerOne.posY > game.control.mousePointer){        
          this.playerOne.posY-=5;
        }
        else if (this.playerOne.goDown && this.playerOne.posY < game.control.mousePointer && this.playerOne.posY < game.groundHeight - this.playerOne.height){
          this.playerOne.posY+=5;
        }
      }*/
    }
      
    
    if (player == 1) {

      player = this.playerOne;
      player.posY = posY;

      player2 = this.playerThree;
      player2.posY = posY2;


      if ( game.control2.controlSystem2 == "KEYBOARD" ) {
          // keyboard control
        if ( this.playerTwo.goUp && this.playerTwo.posY > 0 ) {
          this.playerTwo.posY-=5;
        } 
          if ( this.playerTwo.goDown && this.playerTwo.posY < (game.groundHeight)/2.5) {
            this.playerTwo.posY+=5;
        }

        if ( this.playerFour.goUp && this.playerFour.posY > game.groundHeight/2 ) {
          this.playerFour.posY-=5;
         } 
        if ( this.playerFour.goDown && this.playerFour.posY < game.groundHeight - this.playerFour.height) {
          this.playerFour.posY+=5;
        }
  
      }


    }

  },

  initMouse : function(onMouseMoveFunction) {
      window.onmousemove = onMouseMoveFunction;
  },

  collideBallWithPlayersAndAction : function() { 
      if ( this.ball.collide(game.playerOne) ){
          game.ball.directionX = -game.ball.directionX;
          this.playerSound.play();

      }
      if ( this.ball.collide(game.playerTwo) ){
          game.ball.directionX = -game.ball.directionX;
          this.playerSound.play();

      }
      if ( this.ball.collide(game.playerThree) ){
        game.ball.directionX = -game.ball.directionX;
        this.playerSound.play();
      }
      if ( this.ball.collide(game.playerFour) ){
        game.ball.directionX = -game.ball.directionX;
        this.playerSound.play();
      }
  },  

  lostBall : function() {
      if ( this.ball.lost(this.playerOne) ) {
          this.playerTwo.score++;
          this.ball.inGame = false;
          
          this.ball.posX = 200;
          this.ball.posY = 200;
          this.ball.directionX = 1;
          this.ball.directionY = 1;
          this.ball.inGame = true;
           
          // if ( this.playerOne.ai ) { 
          //   setTimeout(game.ai.startBall(), 3000);
          // }
        } else if ( this.ball.lost(this.playerTwo) ) {

          this.playerOne.score++;
          this.ball.inGame = false;

          this.ball.posX = 500;
          this.ball.posY = 200;
          this.ball.directionX = -1;
          this.ball.directionY = 1;
          this.ball.inGame = true;
       
          // if ( this.playerTwo.ai ) { 
          //   setTimeout(game.ai.startBall(), 3000);
          // }
        }

        this.scoreLayer.clear();
        this.displayScore(this.playerOne.score, this.playerTwo.score);
    },

    updateScore : function(score1, score2) {
      this.playerOne.score = score1;
      this.playerTwo.score = score2;

      this.scoreLayer.clear();
      this.displayScore(this.playerOne.score, this.playerTwo.score);
    }
  
};