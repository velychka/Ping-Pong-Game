game.control = {


    
    controlSystem : null,
    mousePointer : null,
   
    onKeyDown : function(event) {

        game.control.controlSystem = "KEYBOARD";

  

            
        if ( event.keyCode == game.keycode.KEYDOWN ) {

            game.playerOne.goDown = true;
        } 
        if ( event.keyCode == game.keycode.KEYUP ) {
            game.playerOne.goUp = true;
        }

       /* if ( event.keyCode == game.keycode.KEYZ ) {
            game.playerThree.goUp = true;
        }
        if ( event.keyCode == game.keycode.KEYS ) {
            game.playerThree.goDown = true;
        }*/

       /* if ( event.keyCode == game.keycode.SPACEBAR && !game.ball.inGame ) { 
            game.ball.inGame = true;
            game.ball.posX = game.playerOne.posX + game.playerOne.width;
            game.ball.posY = game.playerOne.posY;
            game.ball.directionX = 1;
            game.ball.directionY = 1;
        }*/
    },
   
    onKeyUp : function(event) {

        game.control.controlSystem = "KEYBOARD";
      //  if(player == game.playerOne){
            if ( event.keyCode == game.keycode.KEYDOWN ) {
    
                game.playerOne.goDown = false;
            } 
            if ( event.keyCode == game.keycode.KEYUP ) {
                game.playerOne.goUp = false;
            }

    },

    onMouseMove : function (event) {

     

        game.control.controlSystem = "MOUSE";

        if ( event ) {
            game.control.mousePointer = event.clientY;
        }

        if ( game.control.mousePointer > game.playerOne.posY ) {
            game.playerOne.goDown = true;
            game.playerOne.goUp = false;
        } 
        
        else if ( game.control.mousePointer < game.playerOne.posY ) {
            game.playerOne.goDown = false;
            game.playerOne.goUp = true;
        } 

        else {
            game.playerOne.goDown = false;
            game.playerOne.goUp = false;
        }
    }


  }