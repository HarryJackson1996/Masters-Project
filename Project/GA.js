class Genetic {

    constructor(population_size) {
        this.population_size = population_size;
        this.agents = [];
        this.new_agents = [];
        this.matingPool = [];
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
            this.agents[i].makeDecision(grid);
            this.agents[i].checkCollision();
            this.agents[i].show();
        } 
    }

    killMember() {
        for(var i = 0; i < this.agents.length; i++) {
            if(this.agents[i].CRASHED == true) {
                this.new_agents.push(this.agents.splice(i, 1)[0]);
            }
        }
    }

    newPopulation() {
        if(this.agents.length == 0){
            this.calculateFitness();
            for(var i = 0; i < this.population_size; i++){
                this.agents[i] = this.selection();

            }
            //console.log(this.agents.length);
            this.new_agents = [];
        }
    }

    calculateFitness() {
        var maximum_fitness = 0;

        for(var i = 0; i < this.new_agents.length; i++) {
            var agent_fitness = this.new_agents[i].getFitness();
            console.log(agent_fitness);
            if(agent_fitness > maximum_fitness) {
                maximum_fitness = agent_fitness;
            } 
        }
        console.log("max fit: "+ maximum_fitness);

        for(var i = 0; i < this.new_agents.length; i++) {
            this.new_agents[i].fitness /= maximum_fitness;       
            console.log(i + ": " + this.new_agents[i].fitness);
        }        
    }

    selection() {
    
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
            var n = this.new_agents[i].fitness * 10;
            for(var j = 0; j < n; j++) {
                this.matingPool.push(this.new_agents[i]);
            }
        } 
        var picked = random(this.matingPool);
        //console.log(picked.brain.weights_ho.data + ": " + picked.fitness);
        var child = new Agent(x, y, 10, 10, picked.brain);
        // console.log(child.brain.weights_ho.data + ": " + picked.fitness);
        noLoop();
        return child;  
    }

    static mutate(x) {
        if (random(1) < 0.1) {
            let offset = randomGaussian() * 0.1;
            let newx = x + offset;
            return newx;
        } else {
            return x;
        }
    }


}