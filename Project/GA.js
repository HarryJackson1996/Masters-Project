var startTime = 0;
var time = 0;

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
    constructor(population_size, width, height) {
        this.population_size = population_size;
        this.width = width;
        this.height = height;
        this.mutation_rate = 0.1;
        this.gen = 0;
        this.agents = [];
        this.new_agents = [];
        this.matingPool = [];
        this.timer = 0;
        }

    /**
     * @description - Creates the first population of agents initialised with random neural networks.
     * @see Agent
     */
    createPopulation() {      
        for(var i = 0; i < this.population_size; i++) {
            this.agents[i] = new Agent(grid.getStartX(), grid.getStartY(), this.width, this.height);
        }
    }

    /**
     * @description - The main method for running the population.
     * 
     * @see Agent#makeDecision
     * @see Agent#checkCollision
     * @see Agent#show
     */
    runPopulation() {
        for(var i = 0; i < this.agents.length; i++) {
            this.agents[i].makeDecision(grid);
            this.agents[i].checkCollision();
        } 
    }

    drawPopulation() {
        for(var i = 0; i < this.agents.length; i++) {
            this.agents[i].show();
        }
    }

    /**
     * @description - Method for deleting crashed agents from the canvas.
     */
    killMember() {
        for(var i = 0; i < this.agents.length; i++) {
            if(this.agents[i].CRASHED == true) {
                this.new_agents.push(this.agents.splice(i, 1)[0]);
            }
        }
    }

    /**
     * @description - Creates a new population based on the fitness of the previous popualtion.
     */
    newPopulation() {
        if(this.agents.length == 0){
            this.calculateFitness();
            for(var i = 0; i < this.population_size; i++){
                this.agents[i] = this.selection();
            }
            //console.log(this.agents.length);
            this.gen += 1;
            this.new_agents = [];
        }
    }

    /**
     * @description - Calculates the normalised fitness for each agent in the population.
     * @see Agent#getFitness
     */
    calculateFitness() {
        var maximum_fitness = 0;

        for(var i = 0; i < this.new_agents.length; i++) {
            var agent_fitness = this.new_agents[i].getFitness();
            // console.log(agent_fitness);
            if(agent_fitness > maximum_fitness) {
                maximum_fitness = agent_fitness;
            } 
        }
        // console.log("max fit: "+ maximum_fitness);

        for(var i = 0; i < this.new_agents.length; i++) {
            this.new_agents[i].fitness /= maximum_fitness;       
            //console.log(i + ": " + this.new_agents[i].fitness);
        }     
    }

    /**
     * @description - Creates a new agent based on the best fitness from the last population.
     * @return {object} - The new agent.
     */
    selection() {
        for(var i = 0; i < this.population_size; i++) {
            var n = this.new_agents[i].fitness * 1000;
            //console.log(n);
            for(var j = 0; j < n; j++) {
                this.matingPool.push(this.new_agents[i]);
            }
        } 
        var picked = random(this.matingPool);
        //console.log("adult" + picked.brain.weights_ho.data + ": " + picked.fitness);
        var child = new Agent(grid.getStartX(), grid.getStartY(), this.width, this.height, picked.brain);
        child.brain.mutate(this.mutation_rate);
        //console.log("child" + child.brain.weights_ho.data + ": " + picked.fitness);
        return child;  
    }

    getMutation() {
        return this.mutation_rate;
    }

    resetGen() {
        this.gen = 0;
    }
    resetTimer() {
        this.timer = 0;
    }
}