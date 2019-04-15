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
        this.mutation_rate = 0.1;
        this.gen = 1;
        this.matingPool = new MatingPool();
        this.counter = 0;
    }

    /**
     * @description - Creates a new population based on the fitness of the previous popualtion.
     */
    evolve() {
        if(population.getAgents() == 0){
            this.calculateFitness();
            this.matingPool.getMatingPool();
            for(var i = 0; i < population.getPopSize(); i++){
                population.getAgents()[i] = this.selection();
            }
            this.gen += 1;
            population.resetNewAgents();
            population.resetScore();
        }
    }

    /**
     * @description - Calculates the normalised fitness for each agent in the population.
     * @see Agent#getFitness
     */
    calculateFitness() {
        var maximum_fitness = 0;
        for(var i = 0; i < population.getNewAgents().length; i++) {   
            var agent_fitness = population.getNewAgents()[i].getFitness();
            if(agent_fitness > maximum_fitness) {
                maximum_fitness = agent_fitness;
            } 
        }
        // console.log("max fit: "+ maximum_fitness);
        for(var i = 0; i < population.getNewAgents().length; i++) {
            population.getNewAgents()[i].fitness /= maximum_fitness;       
            // console.log(i + ": " + population.getNewAgents()[i].fitness*100);
        }     
    }

    /**
     * @description - Creates a new agent based on the best fitness from the last population.
     * @return {object} - The new agent.
     */
    selection() {
        var picked = random(this.matingPool.mating_pool);
        // console.log(picked);
        // console.log(picked.brain);
        var child = new Agent(grid.getStartX(), grid.getStartY(), agentSettings.getWidth(), agentSettings.getHeight(), picked.brain);
        child.brain.mutate(this.mutation_rate);
        // console.log("child" + child.brain.weights_ho.data + ": " + picked.fitness);
        return child;  
    }
    
    resetGen() {
        this.gen = 1;
    }

    getMutation() {
        return this.mutation_rate;
    }
    
    getGenerations() {
        return this.gen;
    }
}