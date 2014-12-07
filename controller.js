function Controller(model){
    this.model = model;

    window.addEventListener("keydown",function(keypress){
        switch(keypress.keyCode) {
            case 37:
                // left key pressed
                this.model.slide('left')
                break;
            case 38:
                // up key pressed
                this.model.slide('up')
                break;
            case 39:
                // right key pressed
                this.model.slide('right')
                break;
            case 40:
                // down key pressed
                this.model.slide('down')
                break;  
        }
    }.bind(this));

    Object.observe(this.model, this.updateView.bind(this));
}
Controller.prototype = {
    updateView: function(){
        console.log("Updating the view automatically...")
        document.querySelector("#board").innerHTML = "";
        for(var i = 0; i < this.model.board.length; i++){
            cell = document.createElement('DIV');
            cell.classList.add('cell');
            cell.innerHTML = this.model.board[i];
            document.querySelector("#board").appendChild(cell);
        }
    }
}
