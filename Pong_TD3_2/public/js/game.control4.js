game.control4 = {


    
    controlSystem4 : null,
    mousePointer4 : null,
   
    onKeyDown4 : function(event) {

        game.control4.controlSystem4 = "KEYBOARD";

  

            
        if ( event.keyCode == game.keycode.KEYDOWN ) {

            game.playerFour.goDown = true;
        } 
        if ( event.keyCode == game.keycode.KEYUP ) {
            game.playerFour.goUp = true;
        }


    },
   
    onKeyUp4 : function(event) {

        game.control4.controlSystem4 = "KEYBOARD";
      //  if(player == game.playerOne){
            if ( event.keyCode == game.keycode.KEYDOWN ) {
    
                game.playerFour.goDown = false;
            } 
            if ( event.keyCode == game.keycode.KEYUP ) {
                game.playerFour.goUp = false;
            }

    },

    onMouseMove4 : function (event) {

     

        game.control4.controlSystem4 = "MOUSE";

        if ( event ) {
            game.control4.mousePointer4 = event.clientY;
        }

        if ( game.control4.mousePointer4 > game.playerFour.posY ) {
            game.playerFour.goDown = true;
            game.playerFour.goUp = false;
        } 
        
        else if ( game.control4.mousePointer4 < game.playerFour.posY ) {
            game.playerFour.goDown = false;
            game.playerFour.goUp = true;
        } 

        else {
            game.playerFour.goDown = false;
            game.playerFour.goUp = false;
        }
    }

  }