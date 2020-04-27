game.control2 = {


    controlSystem2 : null,
    mousePointer2 : null,
   
    onKeyDown2 : function(event) {

        game.control2.controlSystem2 = "KEYBOARD";
        if ( event.keyCode == game.keycode.KEYDOWN ) {
            game.playerTwo.goDown = true;
        } 
        else if ( event.keyCode == game.keycode.KEYUP ) {
            game.playerTwo.goUp = true;
        }

        if ( event.keyCode == game.keycode.SPACEBAR && !game.ball.inGame ) { 
            game.ball.inGame = true;
            game.ball.posX = game.playerTwo.posX + game.playerTwo.width;
            game.ball.posY = game.playerTwo.posY;
            game.ball.directionX = 1;
            game.ball.directionY = 1;
        }
    },
   
    onKeyUp2 : function(event) {

        game.control2.controlSystem2 = "KEYBOARD";
        if ( event.keyCode == game.keycode.KEYDOWN ) {
            game.playerTwo.goDown = false;
        } 
        else if ( event.keyCode == game.keycode.KEYUP ) {
            game.playerTwo.goUp = false;
        }
        /*if ( event.keyCode == game.keycode.SPACEBAR ) { 
            game.ball.inGame = false;
        }*/
    },

    onMouseMove2 : function (event) {


        
     

        game.control2.controlSystem2 = "MOUSE";

        if ( event ) {
            game.control2.mousePointer2 = event.clientY;
        }

        if ( game.control2.mousePointer2 > game.playerTwo.posY ) {
            game.playerTwo.goDown = true;
            game.playerTwo.goUp = false;
        } 
        
        else if ( game.control2.mousePointer2 < game.playerTwo.posY ) {
            game.playerTwo.goDown = false;
            game.playerTwo.goUp = true;
        } 

        else {
            game.playerTwo.goDown = false;
            game.playerTwo.goUp = false;
        }
    }


  }