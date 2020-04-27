game.control3 = {

    controlSystem3 : null,
    mousePointer3 : null,
   
    onKeyDown3 : function(event) {

        game.control3.controlSystem3 = "KEYBOARD";
            
        if ( event.keyCode == game.keycode.KEYDOWN ) {

            game.playerThree.goDown = true;
        } 
        if ( event.keyCode == game.keycode.KEYUP ) {
            game.playerThree.goUp = true;
        }

    },
   
    onKeyUp3 : function(event) {

        game.control3.controlSystem3 = "KEYBOARD";

            if ( event.keyCode == game.keycode.KEYDOWN ) {
    
                game.playerThree.goDown = false;
            } 
            if ( event.keyCode == game.keycode.KEYUP ) {
                game.playerThree.goUp = false;
            }

    },

    onMouseMove3 : function (event) {

     

        game.control3.controlSystem3 = "MOUSE";

        if ( event ) { 
            game.control3.mousePointer3 = event.clientY;
        }

        if ( game.control3.mousePointer3 > game.playerThree.posY ) {
            game.playerThree.goDown = true;
            game.playerThree.goUp = false;
        } 
        
        else if ( game.control3.mousePointer3 < game.playerThree.posY ) {
            game.playerThree.goDown = false;
            game.playerThree.goUp = true;
        } 

        else {
            game.playerThree.goDown = false;
            game.playerThree.goUp = false;
        }
    }


  }