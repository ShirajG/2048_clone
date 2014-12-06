function Game (str){
    this.board = str.split("").map(function(el){
        return parseInt(el);
    });
}

Game.prototype = {
    show: function(){
      console.log(this.board); 
    },

}

gameInstance = new Game("0020020000000000");
gameInstance.show();


