function Assert(){};
Assert.prototype = {
    //Checks if simple values are equal
    equal: function(expected, actual){
        if(!(expected == actual)){
          throw "ERROR:" + expected + " did not equal: " + actual;
        }
    },
    deepEqual: function(obj1, obj2){
    //Checks if objects are the same by comparing all their keys and vals
        for(var x in obj1){
            if(obj1[x]!==obj2[x]){
                throw "ERROR: " + obj1 + " is not equal to " + obj2;
            }
        }
    }
}
assert= new Assert;

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
            case 'k':
                this.moveCells(0,-1);
                break;
            case 'j':
                this.moveCells(0,1);
                break;
            case 'h':
                this.moveCells(-1,0);
                break;
            case 'l':
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
assert.deepEqual( [23,34,443,5], gameInstance.removeEmpty([23,0,34,443,5,0]))
assert.deepEqual([ [0,0,2,0],[0,2,0,0],[0,0,0,0],[0,0,0,0] ], game.getRows())
