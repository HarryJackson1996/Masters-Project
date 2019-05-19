class Genetic {

    /**
     * 
     * @param {number} population_size - The size of the population.
     * 
     * @property {array} agents - Array to store the new population of agents.
     * @property {array} new_agents - Array to store the agents once killed.
     * @property {array} matingPool - Array for storing the agents used for selection.
     * 
     * @example 
     * var GA = new Genetic(10);
     */
    constructor() {
        this.mutation_rate = 0.3;
        this.gen = 1;
        this.matingPool = new MatingPool();
    }

    /**
     * @description - Creates a new population based on the fitness of the previous popualtion.
     * @see MatingPool
     * @see #selection
     * @see #calculateFitness
     * @see Population#getAgents
     * @see Population#resetNewAgents
     * @see Population#resetScore
     */
    evolve() {
        if (population.getAgents() == 0) {
            this.calculateFitness();
            for (var i = 0; i < population.getPopSize(); i++) {
                population.getAgents()[i] = this.selection();
            }
            this.gen += 1;
            population.resetDeadAgents();
            population.resetScore();
        }
    }

    /**
     * @description - Calculates the normalised fitness for each agent in the population.
     * @see Agent#getFitness
     */
    calculateFitness() {
        var maximum_fitness = 0;
        for (var i = 0; i < population.getDeadAgents().length; i++) {
            var agent_fitness = population.getDeadAgents()[i].getFitness();
            if (agent_fitness > maximum_fitness) {
                maximum_fitness = agent_fitness;
            }
        }
        // console.log("max fit: "+ maximum_fitness);
        for (var i = 0; i < population.getDeadAgents().length; i++) {
            population.getDeadAgents()[i].fitness /= maximum_fitness;
        }
    }

    /**
     * @description - Creates a new agent based on the best fitness from the last population.
     * @return {Object} - The new agent.
     * 
     * @see Grid#getStartX 
     * @see Grid#getStartY
     * @see AgentSettings#getWidth 
     * @see AgentSettings#getHeight
     */
    selection() {
        var picked = random(this.matingPool.getMatingPool());
        // console.log("picked" + picked.brain.weights_ho.data);
        var child = new Agent(grid.getStartX(), grid.getStartY(), agentSettings.getWidth(), agentSettings.getHeight(), picked.brain);
        child.brain.mutate(this.mutation_rate);
        // console.log("child" + child.brain.weights_ho.data);
        return child;
    }

    /**
     * @returns {Number} - Resets the generation number back to 1.
     */
    resetGen() {
        this.gen = 1;
    }

    /**
     * @returns {Number} - Returns the mutation rate.
     */
    getMutation() {
        return this.mutation_rate;
    }

    /**
     * @returns {Number} - Returns the generation number.
     */
    getGenerations() {
        return this.gen;
    }
}