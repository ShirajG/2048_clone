document.addEventListener('DOMContentLoaded', function(){
  var game = new Game(5,5);

  window.addEventListener("keydown",function(keypress){
    console.log(keypress.keyCode)
    switch(keypress.keyCode) {
            case 37:
                // left key pressed
                game.slide('left')
                break;
            case 38:
                // up key pressed
                game.slide('up')
                break;
            case 39:
                // right key pressed
                game.slide('right')
                break;
            case 40:
                // down key pressed
                game.slide('down')
                break;  
        }

    
  })

});