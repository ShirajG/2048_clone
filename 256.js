String.prototype.shirajReplace = function (index, newValue) {

    while(this[index] === newValue){
        index = Math.floor(Math.random() * this.length)
    }
    return this.slice(0,index) + newValue + this.slice(index + 1)
}
String.prototype.shirajPad = function(minLength) {
    that = this;
    while(that.length < minLength){
        that = " " + that
    }
    return that;
};
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
function Game (width, height){
    this.width = width;
    this.height = height;
    this.area = width * height;
    this.board = this.newBoard();
    this.rows = this.getRows();
    this.columns = this.getCols();
    this.finished = false
    this.start()
}
Game.prototype = {
    newBoard: function(){
        str = "";
        while(str.length < this.area){
            str += "0";
        }

        var times = 0
        while(times < 2){
            str = str.shirajReplace(Math.floor(Math.random() * str.length) ,"2");
            times++;
        }

        return str.split("").map(function(el){
            return parseInt(el);
        });
    },
    show: function(){
        str = ""
        for(var i = 0; i < this.board.length;){
            str += this.board[i].toString().shirajPad(4);
            i++;
            if ( i % this.width === 0){
                str += "\n";
            }
        }
        console.log(str)
    },
    getRows: function(){
        rows = [];
        for(var i = 0; i< this.board.length;){
            var row = [];
            while(row.length < this.width ){
                row.push(this.board[i]);
                i++;
            }
            rows.push(row);
        }
        return rows;       
    },
    setRows: function(rows){
        ret = [];
        for(var i = 0; i<rows.length; i++){
            ret = ret.concat(rows[i]);
        }
        this.board = ret;
    },
    getCols: function(){
        var cols = [];
        for(var i = 0; i < this.height;i++){
            var col = [];
            var j = i;

            while(col.length < this.height ){
                col.push(this.board[j]);
                j += this.height;
            }
            cols.push(col);
        }
        return cols;
    },
    setCols: function(cols){
        var ret = []
        for(var i = 0; i<cols.length;i++){
            for(var j = 0; j<cols[i].length;j++){
                ret.push(cols[j][i]);
            }
        }
        this.board = ret;
    },
    slide: function(direction){
        switch(direction) {
            case 'up':
                this.moveCells(0,-1);
                break;
            case 'down':
                this.moveCells(0,1);
                break;
            case 'left':
                this.moveCells(-1,0);
                break;
            case 'right':
                this.moveCells(1,0);
                break; 
        }
        this.checkWon();//Check if 256 is on the board, set finished to true if so.
        this.checkLocked();//Check if there are any free spaces, set finished to true if so.
    },
    moveCells: function(x,y){
        // Remove all zeroes from the row/col
        // Merge any 2 digits which are neighbors and duplicate
        // Pad row/col with new 'tiles' until length is 4
        // One of the new tiles should have a number on it.
        // Write the new row/col back to model
        console.log("Called the moveCells function");
    },
    mergeDoubles: function(){
        // Merge any 2 digits which are neighbors and duplicate
    },
    addTiles: function(){
        // Merge any 2 digits which are neighbors and duplicate
    },
    checkWon: function(){
        for(var i = 0; i < this.board.length; i++){
            if(this.board[i] === 256){
                this.finished === true;
                return true;
            }
        }
        return false;
    },
    checkLocked: function(){
        emptyTiles = this.board.filter(function(el){
            return el === 0;
        })
        if (emptyTiles.length === 0){
            this.finished = true;
        }
    },
    removeZeroes: function(arr){
        return arr.filter(function(el){ return el !== 0})
    },
    start: function(){
        //runs the game until a 256 tile appears, or you have no free spaces.
        // while(!this.finished){
            console.log("started the game")
        // }
    }
}
assert=new Assert;
gameInstance = new Game(4,4);
assert.deepEqual( [23,34,443,5], gameInstance.removeZeroes([23,0,34,443,5,0]))

gameInstance.setRows([[2,3,4,5],[3,0,0,2],[3,6,4,7],[5,7,8,3]])
assert.deepEqual([2,3,4,5,3,0,0,2,3,6,4,7,5,7,8,3], gameInstance.board)

gameInstance.setCols([[2,3,4,5],[3,0,0,2],[3,6,4,7],[5,7,8,3]])
assert.deepEqual([2,3,3,5,3,0,6,7,4,0,4,8,5,2,7,3], gameInstance.board)

gameInstance.setRows([0,0,0,2],[0,0,0,2],[0,0,0,0],[0,0,0,0])
