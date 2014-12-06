function Game (str){
    this.board = str.split("").map(function(el){
        return parseInt(el);
    });
    this.rows = this.getRows();
    this.columns = this.getCols();
}

Game.prototype = {
    show: function(){
        console.log(this.board); 
    },
    getRows: function(){
        return null;
    },
    getCols: function(){
        return null;
    },
    slide: function(direction){
        switch(direction) {
            case 'u':
                this.moveCells(0,-1);
                break;
            case 'd':
                this.moveCells(0,1);
                break;
            case 'l':
                this.moveCells(-1,0);
                break;
            case 'r':
                this.moveCells(1,0);
                break; 
        }
    },
    moveCells: function(x,y){
        // Remove all zeroes from the row/col
        // Merge any 2 digits which are nieghbors and duplicate
        // Pad row/col with new 'tiles' until length is 4
        // Write the new row/col back to model
        console.log("Called the moveCells function");
    },
    removeEmpty: function(arr){
        return arr.filter(function(el){ return el !== 0})
    },


}

gameInstance = new Game("0020020000000000");
gameInstance.show();


