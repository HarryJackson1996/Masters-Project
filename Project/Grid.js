class Grid {

    /**
     * @constructor
     * 
     * @param {number} rows - Number of rows in the grid object.
     * @param {number} cols - Number of columns in the grid object
     * @property {array} grid - Array for creating the grid object.
     */
    constructor(rows, cols) {
        this.rows = rows;
        this.cols = cols;
        this.grid = [];
    }

    /**
     * @method 
     * @see Node
     * @returns - The grid object (Array of Node objects).
     */
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
        return this.grid;
    }

    /**
     * @method
     * @description - Handles Drawing the grid object to the canvas.
     * @see Node#drawNode
     */
    drawGrid() {
        for(var i = 0; i < this.grid.length; i++){
            this.grid[i].drawNode();
        }
    }

    /**
     * @method
     * @returns - The size of a single node from the grid object 
     * @see Node#getWidth
     */
    getWidth() {
        for(var i = 0; this.grid.length; i++){ 
            return this.grid[i].getWidth();
        }
    }

    /**
     * @method
     * @description - Permits the movement of the Goal node.
     * @see Node#setNormal
     * @see Node#setStart
     */
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
    
    /**
     * @method
     * @description - Permits the movement of the Goal node.
     * @see Node#setNormal
     * @see Node#setGoal
     */
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

    /**
     * @method
     * @returns - The x position of the goal node from the grid object.
     */
    getGoalX() {
        for(var i = 0; i < this.grid.length; i++){
            if(this.grid[i].goal == true) {
                //console.log(this.grid[i].x);
                return this.grid[i].x;
            }
        }
    }

    /**
     * @method 
     * @returns - The y position of the goal node from the grid object.
     */
    getGoalY() {
        for(var i = 0; i < this.grid.length; i++){
            if(this.grid[i].goal == true) {
                return this.grid[i].y;
            }
        }
    }
    
    /**
     * @method 
     * @
     */
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