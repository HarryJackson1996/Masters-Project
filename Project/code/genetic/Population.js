class Population {

    constructor(population_size) {
        this.population_size = population_size;
        this.agents = [];
        this.new_agents = [];
        this.data = [];
        this.score = 0.01;
    }

    createPopulation(grid) {
        // console.log(this.population_size);
        for(var i = 0; i < this.population_size; i++) {
            this.agents[i] = new Agent(grid.getStartX(), grid.getStartY(), agentSettings.getWidth(), agentSettings.getHeight());
        }
    }

    clearPopulation() {
        return this.agents = [];
    }

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

    getData() {
        return this.data;
    }

    runPopulation() {
        for(var i = 0; i < this.agents.length; i++) {
            this.agents[i].makeDecision(grid);
            this.agents[i].checkCollision();
            this.checkGoalCollision();
        } 
        this.score += 0.01;
    }

    drawPopulation() {
        for(var i = 0; i < this.agents.length; i++) {
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

    getAgents() {
        return this.agents;
    }

    getNewAgents() {
        return this.new_agents;
    }

    getPopSize() {
        return this.population_size;
    }

    resetNewAgents() {
        return this.new_agents = [];
    }

    resetScore() {
        this.score = 0.01;
    }

    getScore() {
        return this.score;
    }
}