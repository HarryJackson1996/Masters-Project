class Grid {

    constructor(rows, cols) {
        this.rows = rows;
        this.cols = cols;
        this.grid = [];
    }

    createGrid() {
        var settings_X = (((settings.getWidth()-1)/settings.getNodeSize())-1);
        var settings_Y = (((settings.getHeight()-1)/settings.getNodeSize())-1);

        for(var i = 0; i < this.rows; i++) {
            for(var j = 0; j < this.cols; j++) {
                if(i == 0 || i == settings_X || j == 0 || j == settings_Y) {
                    this.grid.push(new BlockedNode(i * settings.getNodeSize(), j * settings.getNodeSize(), settings.getNodeSize(), settings.getNodeSize()));  
                }
                else if(j == 6 && i%8 == 1) {
                    this.grid.push(new BlockedNode(i * settings.getNodeSize(), j * settings.getNodeSize(), settings.getNodeSize(), settings.getNodeSize()));  
                }
                else if(j == 20 && i%2 == 1) {
                    this.grid.push(new BlockedNode(i * settings.getNodeSize(), j * settings.getNodeSize(), settings.getNodeSize(), settings.getNodeSize()));  
                }
                else if(j == 13 && i%3 == 0) {
                    this.grid.push(new BlockedNode(i * settings.getNodeSize(), j * settings.getNodeSize(), settings.getNodeSize(), settings.getNodeSize()));  
                }
                else if(i == floor(settings_X/2) && j == 2){
                    this.grid.push(new GoalNode(i * settings.getNodeSize(), j * settings.getNodeSize(), settings.getNodeSize(), settings.getNodeSize())); 
                }
                else if(i == floor(settings_X/2) && j == (settings_Y - 2)){
                    this.grid.push(new StartNode(i * settings.getNodeSize(), j * settings.getNodeSize(), settings.getNodeSize(), settings.getNodeSize())); 
                }
                else{
                    this.grid.push(new Node(i * settings.getNodeSize(), j * settings.getNodeSize(), settings.getNodeSize(), settings.getNodeSize()));  
                }
            } 
        }
    }

    getWidth() {
        for(var i = 0; this.grid.length; i++){ 
            return this.grid[i].getWidth();
        }
    }

    drawGrid() {
        for(var i = 0; i < this.grid.length; i++){
            this.grid[i].drawNode();
        }
    }

    moveStartNode() {
        for(var i = 0; i < this.grid.length; i++){
            if(mouseX > this.grid[i].x && mouseX < this.grid[i].x + this.grid[i].width
            && mouseY > this.grid[i].y && mouseY < this.grid[i].y + this.grid[i].height) {
                if(this.grid[i].start == true && mouseIsPressed) {
                    this.start = true;
                    this.x = this.grid[i];
                }
                else if(this.start == true && mouseIsPressed && this.grid[i].goal !=true){
                    this.y = this.grid[i];
                    this.y.setStart();
                    this.x.setNormal();
                    this.start = false;
                }
                else {
                    return this.start = false;
                }
            }
        }
    }

    moveGoalNode() {
        for(var i = 0; i < this.grid.length; i++){
            if(mouseX > this.grid[i].x && mouseX < this.grid[i].x + this.grid[i].width
            && mouseY > this.grid[i].y && mouseY < this.grid[i].y + this.grid[i].height) {
                if(this.grid[i].goal == true && mouseIsPressed) {
                    this.goal = true;
                    this.x = this.grid[i];
                }
                else if(this.goal == true && mouseIsPressed & this.grid[i].start !=true){
                    this.y = this.grid[i];
                    this.y.setGoal();
                    this.x.setNormal();
                    this.goal = false;
                }
                else {
                    return this.goal = false;
                }
            }
        }
    }

    getGoalX() {
        for(var i = 0; i < this.grid.length; i++){
            if(this.grid[i].goal == true) {
                //console.log(this.grid[i].x);
                return this.grid[i].x;
            }
        }
    }

    getGoalY() {
        for(var i = 0; i < this.grid.length; i++){
            if(this.grid[i].goal == true) {
                return this.grid[i].y;
            }
        }
    }
    
    mouseClicked() {
        for(var i = 0; i < this.grid.length; i++){
            if(this.grid[i].goal != true && this.grid[i].start != true){
                this.grid[i].clicked();
            }
        }
    }

    getGrid() {
        return this.grid;
    }
}