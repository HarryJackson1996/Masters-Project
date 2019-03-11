class Genetic {

    constructor(population_size) {
        this.population_size = population_size;
        this.agents = [];
    }

    createPopulation() {
        for(var i = 0; i < this.population_size; i++) {
            this.agents[i] = new Agent(200, 200, 10, 10);
        }
    }

    runPopulation() {
        for(var i = 0; i < this.agents.length; i++) {
            this.agents[i].moveUp();
            this.agents[i].checkCollision();
            this.agents[i].show();
        }
    }



}