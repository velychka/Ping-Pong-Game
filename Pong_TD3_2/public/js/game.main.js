    const socket = io();

      var player = 0;


      socket.on('message', function(nbPlayer) {
        if (nbPlayer == 1) {
          player = 1;
        }
        if (nbPlayer == 2) {
          player = 2;
        }
        if(nbPlayer == 3){
          player = 3;
        }
        if(nbPlayer == 4){
          player = 4;
        }

      })

      
      var newPosX = 0;
      var newPosY = 0;
      
      
      socket.on('newPos', function(posX, posY) {
        console.log(posX, posY);
        newPosX = posX;
        newPosY = posY;
      })
      
      var newPosYPlayer1 = 125; 

      socket.on('newPosPlayer1', function(posY) {
        console.log(posY);
        newPosYPlayer1 = posY;
      })

      var newPosYPlayer2 = 125; 

      socket.on('newPosPlayer2', function(posY) {
        console.log(posY);
        newPosYPlayer2 = posY;
      });

      var newPosYPlayer3 = 300; 

      socket.on('newPosPlayer3', function(posY) {
        console.log(posY);
        newPosYPlayer3 = posY;
      });

      var newPosYPlayer4 = 300; 

      socket.on('newPosPlayer4', function(posY) {
        console.log(posY);
        newPosYPlayer4 = posY;
      });

      var newScore1 = 0;
      var newScore2 = 0;

      socket.on('newScore', function(score1, score2) {
        newScore1 = score1;
        newScore2 = score2;
      })

      

      var requestAnimId;
      
      var initialisation = function() {
        // le code de l'initialisation
        game.init(player);

        var tag = document.createElement("p");
        var text = document.createTextNode("Bienvenue JOUEUR"+ player);
        tag.appendChild(text);
        var element = document.getElementById("a");
        element.appendChild(tag);
        
        if (player == 1) {
          
          requestAnimId = window.requestAnimationFrame(main); // premier appel de main au rafraîchissement de la page
        } 
        if(player==2){
          
          requestAnimId = window.requestAnimationFrame(secondmain);
        }
        if(player==3){
          
          requestAnimId = window.requestAnimationFrame(thirdmain);
        }
        if(player==4){
          
          requestAnimId = window.requestAnimationFrame(fourthmain);
        }

      }

      var fourthmain = function() {
        
        // le code du jeu
        game.clearLayer(game.playersBallLayer);
        game.movePlayers(newPosYPlayer1, 4, newPosYPlayer3, undefined, newPosYPlayer2, undefined);
        game.displayPlayers();
        game.moveBall(newPosX, newPosY);

        game.updateScore(newScore1, newScore2);

        var posYPlayer4 = game.playerFour.posY; 
        socket.emit('sendPosPlayer4', posYPlayer4);

        requestAnimId = window.requestAnimationFrame(fourthmain);
      }

      var thirdmain = function() {

        
        // le code du jeu
        game.clearLayer(game.playersBallLayer);
        game.movePlayers(newPosYPlayer1, 3, newPosYPlayer4, undefined, newPosYPlayer2, undefined);
        game.displayPlayers();
        game.moveBall(newPosX, newPosY);

        game.updateScore(newScore1, newScore2);

        
        var posYPlayer3 = game.playerThree.posY; 
        socket.emit('sendPosPlayer3', posYPlayer3);

        requestAnimId = window.requestAnimationFrame(thirdmain);
      }

      var secondmain = function() {
        
        // le code du jeu
        game.clearLayer(game.playersBallLayer);
        game.movePlayers(newPosYPlayer1, 2, newPosYPlayer3, undefined, newPosYPlayer4, undefined);
        game.displayPlayers();
        game.moveBall(newPosX, newPosY);

        game.updateScore(newScore1, newScore2);

        var posYPlayer2 = game.playerTwo.posY; 
        socket.emit('sendPosPlayer2', posYPlayer2);

        requestAnimId = window.requestAnimationFrame(secondmain);
      }
      
      var main = function() {
        // le code du jeu
        game.clearLayer(game.playersBallLayer);
        //game.movePlayers(undefined, undefined);
        game.movePlayers(newPosYPlayer2, 1, newPosYPlayer3, undefined, newPosYPlayer4, undefined);
        game.displayPlayers();
        game.moveBall(undefined, undefined);
        if ( game.ball.inGame ) {
          game.lostBall();
        }

        game.collideBallWithPlayersAndAction();


        var posYPlayer1 = game.playerOne.posY; 
        socket.emit('sendPosPlayer1', posYPlayer1);



        var posX = game.ball.posX;
        var posY = game.ball.posY;

        socket.emit('sendPos', posX, posY);

        var a = game.playerOne.score;
        var b = game.playerTwo.score;

        socket.emit('sendScore', a, b);

        requestAnimId = window.requestAnimationFrame(main); // rappel de main  au prochain rafraîchissement de la page
      }
      
      window.onload = initialisation; // appel de la fonction initialisation au chargement de la page
