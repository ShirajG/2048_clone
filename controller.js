function Controller(model,view){
    this.model = model;
    this.view = view;

    window.addEventListener("keydown",function(keypress){
        switch(keypress.keyCode) {
            case 37:
                // left key pressed
                this.model.slide('left');
                break;
            case 38:
                // up key pressed
                this.model.slide('up');
                break;
            case 39:
                // right key pressed
                this.model.slide('right');
                break;
            case 40:
                // down key pressed
                this.model.slide('down');
                break;  
        }
    }.bind(this));

    Object.observe(this.model, this.updateView.bind(this));
}
Controller.prototype = {
    updateView: function(){
        document.querySelector("#board").innerHTML = "";
        for(var i = 0; i < this.model.board.length; i++){
            cell = document.createElement('DIV');
            cell.classList.add('cell');

            if(this.model.board[i] !== 0){
                cell.innerHTML = this.model.board[i];
            }
            else{
                cell.innerHTML = " "
            }
            document.querySelector("#board").appendChild(cell);
        }
        if(this.checkWin()){
            this.view.showWin();
        }
        else if(this.checkLocked()){
            this.view.showLoss();
        }
    },
    checkWin: function(){
        return this.model.checkWon()
    },
    checkLocked: function(){
        return this.model.checkLocked()
    }
}
