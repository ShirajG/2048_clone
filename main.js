document.addEventListener('DOMContentLoaded', function(){
    var size = prompt("How many columns do you want?")
    var game = new Game(parseInt(size));
    var gameController = new Controller(game);
});