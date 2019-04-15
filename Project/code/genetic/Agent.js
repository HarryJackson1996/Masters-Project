class Agent {
   
    /**
     * 
     * @param {number} x - The agents x position.
     * @param {number} y - The agents y position.
     * @param {number} width - The width of the agent.
     * @param {number} height - The height of the agent.
     * @param {number:3} brain - The agents Neural network (brain) or null.
     * 
     * @property {boolean} CRASHED - The state of the agent, it is either moving or crashed.
     * @property {number} fitness - The agents fitness.
     * 
     * @example
     * var agent = new Agent(0, 0, 10, 10, new NeuralNetwork(6, 10, 1));
     */
    constructor(x, y, width, height, brain) {
        this.x = x;
        this.y = y;
        this.height = height;
        this.width = width;
        this.CRASHED = false;
        this.fitness = 0;
        if(brain instanceof NeuralNetwork) {
            this.brain = brain.copy();
            // console.log("copy");
        } 
        else {
            // console.log("new")
            this.brain = new NeuralNetwork(6, networkSettings.getHiddenNeurons(), 1);
        }   
    }
    
    /**
     * @description - Checks if the agent has collided with the canvas bounds or nodes with a blocked state.
     * @returns {boolean} - If the agent has collided.
     */
    checkCollision() {
        var grid2 = grid.getGrid();
        if(this.x > settings.getWidth() - this.width || this.x <= 0){
            return this.CRASHED = true;
        }
        if(this.y > settings.getHeight() - this.height || this.y <= 0) {
            return this.CRASHED = true;
        }
        for(var i = 0; i < grid2.length; i++){
            if(grid2[i].blocked == true || grid2[i].goal == true){
                var hit = collideRectRect(grid2[i].getX(), grid2[i].getY(), 
                                  grid2[i].getWidth(), grid2[i].getHeight(), 
                                  this.x, this.y,
                                  this.width, this.height);
                if(hit){
                    return this.CRASHED = true;
                }
            }
        }
    }

    /**
     * @description - Draws the agent to the canvas.
     */
    show() {
        push();
        stroke(0);
        fill(agentSettings.getColour());
        rect(this.x, this.y, this.width, this.height);
        pop();
    }

    /**
     * @description - Calculates the agent fitness based on how close they got to the goal node.
     * @returns {number} - The agents fitness value.
     */
    getFitness() {
        var getGrid = grid.getGrid();
        var goalX;
        var goalY;
        for(var i = 0; i < getGrid.length; i++) {
            if(getGrid[i].goal == true) {
                goalX = getGrid[i].x;
                goalY= getGrid[i].y;
            }
        }
        
        var distance = dist(this.x, this.y, goalX, goalY);
        var x = 0;

        for(var i = 0; i < floor(distance); i+=20){
            x++;
        }

        // console.log(x + "," + distance);
        
        this.fitness = (1/(distance * x));
        return this.fitness;
    }  
    
    /**
     * @description - Values input into the Neural Network are computed to a movement function.
     * @param {object} grid - expects a grid object as an argument. 
     */
    makeDecision(grid) {
        var closestBlocked = 0;
        for(var i = 0; i < grid.grid.length; i++) {
            if(grid.grid[i].blocked == true) {
                var d = dist(this.x, this.y, grid.grid[i].x, grid.grid[i].y);
                if (closestBlocked == 0) {
                    closestBlocked = d;
                    } else if (closestBlocked > d) {
                        closestBlocked = d;
                    }
            }
        }
        // var distToGoal = dist(this.x, this.y, grid.getGoalX(), grid.getGoalY());
        // console.log(distToGoal);
        let inputs = [];
        inputs[0] = this.x;
        inputs[1] = this.y;
        inputs[2] = closestBlocked;
        inputs[3] = grid.getGoalX();
        inputs[4] = grid.getGoalY();
        inputs[5] = grid.getWidth();
        // inputs[6] = distToGoal;
       
        // for(var i = 0; i < inputs.length; i++) {
        //     console.log(i + ": " + inputs[i]);
        // }
        
        let output = this.brain.predict(inputs); 
        
        if(output < 0.3333) {
            this.moveLeft();
        } 
        else if(output >= 0.3333 && output < 0.6666) {
            this.moveUp();
        }
        else if(output >= 0.6666 && output < 1) {
            this.moveRight();

        }
    }
    
    /**
     * @returns {number} - The agents height.
     */
    getHeight() {
        return this.height;
    }    

    /**
     * @returns {number} - The agents width.
     */
    getWidth() {
        return this.width;
    }

    /**
     * @returns {number} - The agents x position.
     */
    getX() {
        return this.x;
    }

    /**
     * @returns {number} - The agents y position.
     */
    getY() {
        return this.y;
    }

    /**
     * @description - Controls the agents movement permitting the agent to move up the canvas
     * @returns {number} - Moves the agent up the canvas.
     */
    moveUp() {
        return this.y -= agentSettings.getUp();
    }

    /**
     * @description - Controls the agents movement permitting the agent to move down the canvas
     * @returns {number} - Moves the agents dowm the canvas.
     */
    moveDown() {
        return this.y += 5;
    }

    /**
     * @description - Controls the agents movement permitting the agent to move left across the canvas
     * @returns {number} - Moves the agent left across the canvas.
     */
    moveLeft() {
        return this.x -= agentSettings.getLeft();    
    }

    /**
     * @description - Controls the agents movement permitting the agent to move right across the canvas
     * @returns {number} - Moves the agent right across the canvas.
     */
    moveRight() {
        return this.x += agentSettings.getRight();   
    } 
}
