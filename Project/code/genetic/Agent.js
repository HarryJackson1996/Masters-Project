class Agent {

    /**
     * 
     * @param {number} x - The Agents x position.
     * @param {number} y - The Agents y position.
     * @param {number} width - The width of the Agent.
     * @param {number} height - The height of the Agent.
     * @param {number:3} brain - The Agents Neural network (brain) or null.
     * 
     * @property {boolean} CRASHED - The state of the Agent, it is either moving or crashed.
     * @property {number} fitness - The Agents fitness.
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
        if (brain instanceof NeuralNetwork) {
            this.brain = brain.copy();
            console.log("copy");
        }
        else {
            console.log("new")
            this.brain = new NeuralNetwork(6, networkSettings.getHiddenNodes(), 1);
        }
    }

    /**
     * @description - Checks if the Agent has collided with the canvas bounds or nodes with a blocked state.
     * @returns {Boolean} - Returns true If the Agent has collided.
     */
    checkCollision() {
        var grid2 = grid.getGrid();
        if (this.x > settings.getWidth() - this.width || this.x <= 0) {
            return this.CRASHED = true;
        }
        if (this.y > settings.getHeight() - this.height || this.y <= 0) {
            return this.CRASHED = true;
        }
        for (var i = 0; i < grid2.length; i++) {
            if (grid2[i].blocked == true || grid2[i].goal == true) {
                var hit = collideRectRect(grid2[i].getX(), grid2[i].getY(),
                    grid2[i].getWidth(), grid2[i].getHeight(),
                    this.x, this.y,
                    this.width, this.height);
                if (hit) {
                    return this.CRASHED = true;
                }
            }
        }
    }

    /**
     * @description - This method checks if any of the Agents have collided with the goal. 
     * 
     * @see GA#resetGen
     * @see #resetScore
     * @see #createPopulation(grid)
     */
    checkGoalCollision(agents) {
        var grid2 = grid.getGrid();
        var a;
        var b;
        for (var i = 0; i < grid2.length; i++) {
            if (grid2[i].goal == true) {
                a = grid2[i].x;
                b = grid2[i].y;
            }
        }

        for (var i = 0; i < agents.length; i++) {
            var hit = collideRectRect(a, b, grid.getWidth(), grid.getHeight(),
                agents[i].x, agents[i].y, agents[i].width, agents[i].height);
            if (hit || GA.getGenerations() >= 50) {
                data.push([population.getPopSize(), GA.getMutation(), GA.getGenerations(), population.getScore(), networkSettings.getHiddenNodes()]);
                console.log(data);
                GA.resetGen();
                population.resetScore();
                population.createPopulation(grid);
                counter++;
                // let agent = population.getAgents()[0];
                // saveJSON(agent.brain, 'agent.json');
            }
        }
    }

    /**
     * @description - Handles drawing the Agent to the canvas.
     */
    show() {
        push();
        stroke(0);
        fill(agentSettings.getColour());
        rect(this.x, this.y, this.width, this.height);
        pop();
    }

    /**
     * @description - Calculates the Agent fitness based on how close they got to the goal node.
     * @returns {Nnumber} - The Agents fitness value.
     */
    getFitness() {
        var getGrid = grid.getGrid();
        var goalX;
        var goalY;
        for (var i = 0; i < getGrid.length; i++) {
            if (getGrid[i].goal == true) {
                goalX = getGrid[i].x;
                goalY = getGrid[i].y;
            }
        }

        var distance = dist(this.x, this.y, goalX, goalY);
        var x = 0;

        for (var i = 0; i < floor(distance); i += 20) {
            x++;
        }

        // console.log(x + "," + distance);

        this.fitness = (1 / (distance * x));
        return this.fitness;
    }

    /**
     * @description - We represent the hidden layer as an array whereby each node represents a seperate index in the Array.
     * This array is fed into the neural network library whereby the inputs are computed and converted to an output value.
     * The output value is then mapped to a specific movement, which controls the direction in which the Agents move.
     * @param {Object} grid - expects a Grid object as an argument. 
     */
    makeDecision(grid) {
        var closestBlocked = 0;
        for (var i = 0; i < grid.grid.length; i++) {
            if (grid.grid[i].blocked == true) {
                var d = dist(this.x, this.y, grid.grid[i].x, grid.grid[i].y);
                if (closestBlocked == 0) {
                    closestBlocked = d;
                } else if (closestBlocked > d) {
                    closestBlocked = d;
                }
            }
        }
        var distToGoal = dist(this.x, this.y, grid.getGoalX(), grid.getGoalY());
        // console.log(distToGoal);
        let inputs = [];
        inputs[0] = this.x / 10;
        inputs[1] = this.y / 10;
        inputs[2] = closestBlocked / 10;
        inputs[3] = grid.getGoalX() / 10;
        inputs[4] = grid.getGoalY() / 10;
        inputs[5] = distToGoal / 10;


        // inputs[6] = grid.getWidth()/100;
        // inputs[7] = agentSettings.getUpVelocity();
        // inputs[8] = agentSettings.getDownVelocity();
        // inputs[9] = agentSettings.getLeftVelocity();
        // inputs[10] = agentSettings.getRightVelocity();

        // for(var i = 0; i < inputs.length; i++) {
        //     console.log(i + ": " + inputs[i]);
        // }

        let output = this.brain.predict(inputs);

        if (output < 0.25) {
            this.moveLeft();
        }
        else if (output >= 0.25 && output < 0.5) {
            this.moveUp();
        }
        else if (output >= 0.5 && output < 0.75) {
            this.moveRight();
        }
        else {
            this.moveDown();
        }
    }

    /**
     * @returns {Number} - The Agents height.
     */
    getHeight() {
        return this.height;
    }

    /**
     * @returns {Number} - The Agents width.
     */
    getWidth() {
        return this.width;
    }

    /**
     * @returns {Number} - The Agents x position.
     */
    getX() {
        return this.x;
    }

    /**
     * @returns {Number} - The Agents y position.
     */
    getY() {
        return this.y;
    }

    /**
     * @description - Controls the Agents movement permitting the Agent to move up the canvas
     * @returns {Number} - Moves the Agent up the canvas.
     * 
     * @see AgentSettings#getUpVelocity
     */
    moveUp() {
        return this.y -= agentSettings.getUpVelocity();
    }

    /**
     * @description - Controls the Agents movement permitting the Agent to move down the canvas
     * @returns {Number} - Moves the Agents dowm the canvas.
     * 
     * @see AgentSettings#getDownVelocity
     */
    moveDown() {
        return this.y += agentSettings.getDownVelocity();
    }

    /**
     * @description - Controls the Agents movement permitting the Agent to move left across the canvas
     * @returns {Number} - Moves the Agent left across the canvas.
     * 
     * @see AgentSettings#getLeftVelocity
     */
    moveLeft() {
        return this.x -= agentSettings.getLeftVelocity();
    }

    /**
     * @description - Controls the Agents movement permitting the Agent to move right across the canvas
     * @returns {Number} - Moves the Agent right across the canvas.
     * 
     * @see AgentSettings#getRightVelocity
     */
    moveRight() {
        return this.x += agentSettings.getRightVelocity();
    }
}
