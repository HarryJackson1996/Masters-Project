class MatingPool {

    constructor() {
        this.mating_pool = [];
    }

    getMatingPool() {
            this.newMatingPool()
            for(var i = 0; i < population.getPopSize(); i++) {
                var x = population.getNewAgents()[i].fitness*100;
                for(var j = 0; j < x; j++) {
                    this.mating_pool.push(population.getNewAgents()[i]);
                }
            }
            return this.mating_pool;
        }
        

    newMatingPool() {
        return this.mating_pool = [];
    }
    
}