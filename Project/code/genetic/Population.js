class Population {

    /**
     * @constructor
     * @param {Number} population_size - The size of the population.
     * 
     * @property {Array} agents - The array is used for storing the agent objects.
     * @property {Array} new_agents - The array is used for storing the agents who have collided with Node objects.
     * @property {Array} data - The array will store all data that will be pushed to the CSV file.
     * @property {Number} score - The score increments per generation.
     */
    constructor(population_size) {
        this.population_size = population_size;
        this.agents = [];
        this.new_agents = [];
        this.data = [];
        this.score = 0.01;
    }

    /**
     * @description - This method handles creating the population by iterating over
     * the population_size and pushing Agent objects to the agents array.
     * @param {Grid} grid - A grid object.
     * @see Agent
     * @see Grid#getStartX
     * @see Grid#getStartY
     * @see AgentSettings#getWidth
     * @see AgentSettings#getHeight
     */
    createPopulation(grid) {
        // console.log(this.population_size);
        for(var i = 0; i < this.population_size; i++) {
            this.agents[i] = new Agent(grid.getStartX(), grid.getStartY(), agentSettings.getWidth(), agentSettings.getHeight());
        }
    }

    /**
     * @returns {Array} - Returns an empty agents array.
     */
    clearPopulation() {
        return this.agents = [];
    }

    /**
     * 
     */
    checkGoalCollision() {
        var grid2 = grid.getGrid();
        var a;
        var b;
        for(var i = 0; i < grid2.length; i++){
            if(grid2[i].goal == true){
                a = grid2[i].x;
                b = grid2[i].y;
            }
        }

       for(var i = 0; i < this.agents.length; i++) {
           var hit = collideRectRect(a, b, grid.getWidth(), grid.getHeight(), this.agents[i].x, this.agents[i].y, this.agents[i].width, this.agents[i].height);
            if(hit || this.gen >= 50){ 
                this.data.push([this.getPopSize(), GA.getMutation(), GA.getGenerations(), this.getScore(), networkSettings.getHiddenNodes()]);
                GA.resetGen();
                this.resetScore();
                this.createPopulation(grid);
            } 
        }
    } 

    /**
     * @description - This method runs the population, it invokes the neural network methods,
     * and checks the Agent collision with blocked Node and the goal Node.
     */
    runPopulation() {
        for(var i = 0; i < this.agents.length; i++) {
            this.agents[i].makeDecision(grid);
            this.agents[i].checkCollision();
            this.checkGoalCollision();
        } 
        this.score += 0.01;
    }

    /**
     * @description - This method handles drawing the Population to the canvas.
     * @see Agent#show
     */
    drawPopulation() {
        for(var i = 0; i < this.agents.length; i++) {
            this.agents[i].show();
        }
    }

    /**
     * @description - This method handles removing Agents from the canvas if
     * they collide with a blocked Node in the Grid object.
     */
    killMember() {
        for(var i = 0; i < this.agents.length; i++) {
            if(this.agents[i].CRASHED == true) {
                this.new_agents.push(this.agents.splice(i, 1)[0]);
            }
        }
    }

    /**
     * @returns {Array} - Returns agents array.
     */
    getAgents() {
        return this.agents;
    }

    /**
     * @returns {Array} - Returns new_agents array.
     */
    getNewAgents() {
        return this.new_agents;
    }

    /**
     * @returns {Number} - Returns population size.
     */
    getPopSize() {
        return this.population_size;
    }

    /**
     * @returns {Array} - Returns data array.
     */
    getData() {
        return this.data;
    }

    /**
     * @returns {Number} - Returns the score.
     */
    getScore() {
        return this.score;
    }

    /**
     * @returns {Array} - Returns empty new_agents array.
     */
    resetNewAgents() {
        return this.new_agents = [];
    }

    /**
     * @returns {Number} - Resets the score to zero.
     */
    resetScore() {
        return this.score = 0.01;
    }
}