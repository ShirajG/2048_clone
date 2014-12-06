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

    Object.observe(this.model, this.updateView);
}

Controller.prototype = {
    updateView: function(){
        console.log("Updating the view automatically...")
    }
}
