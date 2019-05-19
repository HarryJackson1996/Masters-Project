class Population {

    /**
     * @constructor
     * @param {Number} population_size - The size of the population.
     * 
     * @property {Array} agents - The array is used for storing the agent objects.
     * @property {Array} new_agents - The array is used for storing the agents who have collided with Node objects.
     * @property {Array} data - The array will store all data that will be pushed to the CSV file.
     * @property {Number} score - The score increments per generation.
     * 
     * @example 
     * var population = new Population(100);
     */
    constructor(population_size) {
        this.population_size = population_size;
        this.agents = [];
        this.dead_agents = [];
        this.score = 0.01;
    }

    /**
     * @description - This method handles creating the population by iterating over
     * the population_size and pushing Agent objects to the agents array.
     * @param {Grid} grid - The current Grid object.
     * @see Agent
     * @see Grid#getStartX
     * @see Grid#getStartY
     * @see AgentSettings#getWidth
     * @see AgentSettings#getHeight
     */
    createPopulation(grid) {
        this.dead_agents = [];
        for (var i = 0; i < this.population_size; i++) {
            this.agents[i] = new Agent(grid.getStartX(), grid.getStartY(), agentSettings.getWidth(), agentSettings.getHeight());
        }
    }

    /**
     * @description - This method runs the population, it handles calling all methods required 
     * by the population to function.
     * @see Agent#makeDecision
     * @see Agent#checkCollision
     * @see #checkGoalCollision
     */
    runPopulation() {
        if (counter == 0) {
            for (var i = 0; i < this.agents.length; i++) {
                this.agents[i].makeDecision(grid);
                this.agents[i].checkCollision();
                this.agents[i].checkGoalCollision(this.agents);
            }
            this.score += 0.01;
            // console.log(this.agents.length);
            // console.log(this.dead_agents.length);
        }
    }

    /**
     * @description - This method handles drawing the Population to the canvas.
     * @see Agent#show
     */
    drawPopulation() {
        for (var i = 0; i < this.agents.length; i++) {
            this.agents[i].show();
        }
    }

    /**
     * @description - This method handles removing Agents from the canvas if
     * they collide with a blocked Node.
     */
    killAgent() {
        for (var i = 0; i < this.agents.length; i++) {
            if (this.agents[i].CRASHED == true) {
                this.dead_agents.push(this.agents.splice(i, 1)[0]);
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
    getDeadAgents() {
        return this.dead_agents;
    }

    /**
     * @returns {Number} - Returns the population size.
     */
    getPopSize() {
        return this.population_size;
    }

    /**
     * @returns {Number} - Returns the score.
     */
    getScore() {
        return this.score;
    }

    /**
    * @returns {Array} - Clears the agents array.
    */
    clearPopulation() {
        return this.agents = [];
    }

    /**
     * @returns {Array} - Clears the new_agents array.
     * @todo Refactor method name, since the new_agents array is specifically
     * for dealing with dead agents?
     */
    resetDeadAgents() {
        return this.dead_agents = [];
    }

    /**
     * @returns {Number} - Resets the score to zero.
     */
    resetScore() {
        return this.score = 0.01;
    }
}