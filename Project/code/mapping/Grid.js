class Grid {

    /**
     * @constructor
     * 
     * @param {Number} rows - Number of rows in the grid object.
     * @param {Number} cols - Number of columns in the grid object
     * @property {Array} grid - Array for holding the grid object.
     * 
     * @example
     * var grid = new Grid(10, 10);
     */
    constructor(rows, cols) {
        this.rows = rows;
        this.cols = cols;
        this.grid = [];
    }

    /**
     * @description - Creates a Grid object which is 1D array of Node objects.
     * @returns {Grid} - Returns the Grid object.
     * @see Node
     */
    createGrid() {
        var settings_X = (((settings.getWidth()-1)/settings.getNodeSize())-1);
        var settings_Y = (((settings.getHeight()-1)/settings.getNodeSize())-1);

        for(var i = 0; i < this.rows; i++) {
            for(var j = 0; j < this.cols; j++) {
                if(i == 0 || i == settings_X || j == 0 || j == settings_Y) {
                    this.grid.push(new BlockedNode(i * settings.getNodeSize(), j * settings.getNodeSize(), settings.getNodeSize(), settings.getNodeSize()));  
                }
                // else if(j == 6 && i%2 == 1) {
                //     this.grid.push(new BlockedNode(i * settings.getNodeSize(), j * settings.getNodeSize(), settings.getNodeSize(), settings.getNodeSize()));  
                // }
                // else if(j == 20 && i%2 == 1) {
                //     this.grid.push(new BlockedNode(i * settings.getNodeSize(), j * settings.getNodeSize(), settings.getNodeSize(), settings.getNodeSize()));  
                // }
                // else if(j == 13 && i%2 == 0) {
                //     this.grid.push(new BlockedNode(i * settings.getNodeSize(), j * settings.getNodeSize(), settings.getNodeSize(), settings.getNodeSize()));  
                // }
                // else if(j == 7 && i == 6 || j == 7 && i == 7 ||
                //         j == 7 && i == 8 || j == 7 && i == 9 ||
                //         j == 7 && i == 10 || j == 7 && i == 11 ||
                //         j == 7 && i == 12 || j == 7 && i == 13 ||
                //         j == 7 && i == 14) {
                //     this.grid.push(new BlockedNode(i * settings.getNodeSize(), j * settings.getNodeSize(), settings.getNodeSize(), settings.getNodeSize()));  
                // }
                // else if(j == 14 && i == 1 || j == 14 && i == 2 ||
                //         j == 14 && i == 3 || j == 14 && i == 4 ||
                //         j == 14 && i == 16 || j == 14 && i == 17 ||
                //         j == 14 && i == 18 || j == 14 && i == 19 ||
                //         j == 14 && i == 10 || j == 14 && i == 15 ||
                //         j == 14 && i == 5) {
                //     this.grid.push(new BlockedNode(i * settings.getNodeSize(), j * settings.getNodeSize(), settings.getNodeSize(), settings.getNodeSize()));  
                // }
                // else if(j == 21 && i == 3 || j == 21 && i == 4 ||
                //         j == 21 && i == 5 || j == 21 && i == 6 ||
                //         j == 21 && i == 7 || j == 21 && i == 8 ||
                //         j == 21 && i == 9 || j == 21 && i == 11 ||
                //         j == 21 && i == 12 || j == 21 && i == 13 ||
                //         j == 21 && i == 14 || j == 21 && i == 15 ||  
                //         j == 21 && i == 16 || j == 21 && i == 17) {
                //     this.grid.push(new BlockedNode(i * settings.getNodeSize(), j * settings.getNodeSize(), settings.getNodeSize(), settings.getNodeSize()));  
                // }
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
     * @description - Handles drawing the Grid object to the canvas.
     * @see Node#drawNode
     */
    drawGrid() {
        for(var i = 0; i < this.grid.length; i++){
            this.grid[i].drawNode();
        }
    }

    /**
     * @description - This method allows the user to click and drag the 
     * start Node with their mouse and set its new location in the grid object.
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
     * @description - This method allows the user to click and drag the 
     * goal Node with their mouse and set its new location in the grid object.
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
     * @returns - Returns the width of a single Node from the Grid object.
     * @see Node#getWidth
     */
    getWidth() {
        for(var i = 0; this.grid.length; i++){ 
            return this.grid[i].getWidth();
        }
    }

    /**
     * @returns - Returns the height of a single Node from the Grid object.
     * @see Node#getHeight
     */
    getHeight() {
        for(var i = 0; this.grid.length; i++){ 
            return this.grid[i].getHeight();
        }
    }

    /**
     * @returns - Returns the x position of the goal Node from the Grid object.
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
     * @returns - Returns the y position of the goal Node from the Grid object.
     */
    getGoalY() {
        for(var i = 0; i < this.grid.length; i++){
            if(this.grid[i].goal == true) {
                return this.grid[i].y;
            }
        }
    }

    /**
     * @returns - Returns the x position of the start Node from the Grid object.
     */
    getStartX() {
        for(var i = 0; i < this.grid.length; i++){
            if(this.grid[i].start == true) {
                //console.log(this.grid[i].x);
                return this.grid[i].x + this.getWidth()/4;
            }
        }
    }

    /**
     * @returns - Returns the y position of the start Node from the Grid object.
     */
    getStartY() {
        for(var i = 0; i < this.grid.length; i++){
            if(this.grid[i].start == true) {
                return this.grid[i].y + this.getHeight()/4;
            }
        }
    }
    
    /**
     * @description - Iterates over the Grid object (array) and calls the Node method 'clicked'.
     * @see Node#clicked
     */
    mouseClicked() {
        for(var i = 0; i < this.grid.length; i++){
            if(this.grid[i].goal != true && this.grid[i].start != true){
                this.grid[i].clicked();
            }
        }
    }

    /**
     * @returns {Array} - Returns the grid object.
     */
    getGrid() {
        return this.grid;
    }
}