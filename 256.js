Array.prototype.shirajFlatten = function(){
    return this.reduce(function(prev,curr){
        return prev.concat(curr);
    })
}
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
        if(expected !== actual){
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
function Game (width){
    this.width = width;
    this.height = width;
    this.area = width * width;
    this.board = this.newBoard();
    this.finished = false
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
            case 'down':
                this.moveCols(-1);
                break;
            case 'up':
                this.moveCols(1);
                break;
            case 'left':
                this.moveRows(-1);
                break;
            case 'right':
                this.moveRows(1);
                break; 
        }
        if (!this.checkLocked()) {
            this.addTile();
            this.show();
        }
        else{
            this.show();
            console.log("NO MORE MOVES!!!")
            return
        }
    },
    moveCols: function(offset){
        var cols = this.getCols();
        
        for(var i = 0; i<cols.length; i++){
            cols[i] = this.removeZeroes(cols[i]);
        }

        cols = this.mergeDoubles(cols);

        if (offset < 1){
            for (var i = 0; i < cols.length; i++) {
                while(cols[i].length < this.height){
                    cols[i].unshift(0);
                }
            };
        }
        else{
            for (var i = 0; i < cols.length; i++) {
                while(cols[i].length < this.height){
                    cols[i].push(0);
                }
            };   
        }
        this.setCols(cols);
    },
    moveRows: function(offset){
        var rows = this.getRows();
        
        for(var i = 0; i<rows.length; i++){
            rows[i] = this.removeZeroes(rows[i]);
        }
        rows = this.mergeDoubles(rows);

        if (offset >= 1){
            for (var i = 0; i < rows.length; i++) {
                while(rows[i].length < this.width){
                    rows[i].unshift(0);
                }
            };
        }
        else{
            for (var i = 0; i < rows.length; i++) {
                while(rows[i].length < this.width){
                    rows[i].push(0);
                }
            };   
        }

        this.setRows(rows);
    },
    mergeDoubles: function(nestedArr){

        for (var i = 0; i < nestedArr.length; i++) {
            if (nestedArr[i].length <= 1){
                continue;
            }
            for (var j = 0; j < nestedArr[i].length - 1; j++) {
                if (nestedArr[i][j] === nestedArr[i][j+1]){
                    nestedArr[i][j+1] *= 2;
                    nestedArr[i].splice(j,1);
                }
            };
        };
        return nestedArr;        
    },
    getRand: function(range){
        return Math.floor(Math.random() * range)
    },
    addTile: function(){
        possibleNewTiles = [2,4];
        rand = this.getRand(this.board.length);
        while(this.board[rand] !== 0){
            rand = this.getRand(this.board.length);
        }
        this.board[rand] = possibleNewTiles[this.getRand(possibleNewTiles.length)];
    },
    checkWon: function(){
        for(var i = 0; i < this.board.length; i++){
            if(this.board[i] === 256){
                this.finished = true;
                return true;
            }
        }
        return false;
    },
    checkLocked: function(){
        //This should be refactored to check if there are 
        //any possible merges left, not if the board is full.
        // There can still be moves even when the board is filled.
        
        emptyTiles = this.board.filter(function(el){
            return el === 0;
        })
        if (emptyTiles.length === 0){
            this.finished = true;
            return true;
        }
        return false;
    },
    removeZeroes: function(arr){
        return arr.filter(function(el){ return el !== 0})
    },
    start: function(){
        while(!this.finished){
            this.show();
            var choice = prompt("choose: up down left right")
            this.slide(choice);
        }
    }
}
/*
assert = new Assert;
gameInstance = new Game(4,4);
assert.deepEqual( [23,34,443,5], gameInstance.removeZeroes([23,0,34,443,5,0]))

gameInstance.setRows([[2,3,4,5],[3,0,0,2],[3,6,4,7],[5,7,8,3]])
assert.deepEqual([2,3,4,5,3,0,0,2,3,6,4,7,5,7,8,3], gameInstance.board)

gameInstance.setCols([[2,3,4,5],[3,0,0,2],[3,6,4,7],[5,7,8,3]])
assert.deepEqual([2,3,3,5,3,0,6,7,4,0,4,8,5,2,7,3], gameInstance.board)

gameInstance.setRows([[2,2,2,2],[2,2,2,2],[2,2,2,2],[2,2,2,2]])
assert.equal(true,gameInstance.checkLocked())

gameInstance.setRows([[2,0,2,2],[2,2,2,2],[2,2,2,2],[2,2,2,2]])
assert.equal(false,gameInstance.checkLocked())

gameInstance.setCols([[2,0,0,2],[0,0,0,0],[0,0,0,0],[0,0,0,0]])
gameInstance.moveCols(1);
assert.deepEqual(
    [4,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
    gameInstance.getCols().shirajFlatten()
)

gameInstance.setCols([[2,0,0,0],[0,0,0,2],[0,2,0,0],[0,0,0,0]])
gameInstance.moveCols(1);
assert.deepEqual(
    [2,0,0,0,2,0,0,0,2,0,0,0,0,0,0,0],
    gameInstance.getCols().shirajFlatten()
)



gameInstance.setRows([[2,0,0,2],[0,0,0,0],[0,0,0,0],[0,0,0,0]])
gameInstance.moveRows(-1);
assert.deepEqual(
    [4,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
    gameInstance.getRows().shirajFlatten()
)


gameInstance.setRows([[2,0,0,0],[0,2,0,0],[2,0,2,0],[0,2,0,0]])
gameInstance.moveRows(-1);
assert.deepEqual(
    [2,0,0,0,2,0,0,0,4,0,0,0,2,0,0,0],
    gameInstance.getRows().shirajFlatten()
)
*/



