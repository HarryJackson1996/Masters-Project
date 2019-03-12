class Genetic {

    constructor(population_size) {
        this.population_size = population_size;
        this.agents = [];
        this.new_agents = [];
    }

    createPopulation() {
        var myGrid = grid.getGrid();
        var x;
        var y;

        for(var i = 0; i < myGrid.length; i++) {
            if(myGrid[i].start == true) {
                x = myGrid[i].getX();
                y = myGrid[i].getY();
            }
        }

        for(var i = 0; i < this.population_size; i++) {
            this.agents[i] = new Agent(x, y, 10, 10);
        }
    }

    runPopulation() {
        for(var i = 0; i < this.agents.length; i++) {
            this.agents[i].moveUp();
            this.agents[i].checkCollision();
            this.agents[i].show();
        } 
    }

    checkPopulation() {
        for(var i = 0; i < this.agents.length; i++) {
            if(this.agents[i].CRASHED == true) {
                this.new_agents.push(this.agents.splice(i, 1)[0]);
            }
        }
    }

    newPopulation() {
        this.calculateFitness();
        if(this.agents.length == 0) {
            this.createPopulation();
        }
    }

    calculateFitness() {
        var maximum_fitness = 0;
        var total_fitness = 0;

        for(var i = 0; i < this.new_agents.length; i++) {
            var agent_fitness = this.new_agents[i].getFitness();
            if(agent_fitness > maximum_fitness) {
                maximum_fitness = agent_fitness;
            } 
        }
    }


}