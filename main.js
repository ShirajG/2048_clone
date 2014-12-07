document.addEventListener('DOMContentLoaded', function(){
    var game = new Game(4);
    var gameController = new Controller(game);
    gameController.updateView();
});