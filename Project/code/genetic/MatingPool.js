class MatingPool {

    /**
     * @constuctor
     * @property {Array} mating_pool - Array used to store Agents based on their fitness.
     */
    constructor() {
        this.mating_pool = [];
    }

    /**
     * @desciption - This method iterates over the population and then adds agents to the
     * mating_pool array based on their repsective fitness multiplied by 100. More fit 
     * individuals are therefore added more often.
     * @returns {Array} - Returns the mating_pool array.
     * @see Population#getPopSize
     * @see Population#getNewAgents
     */
    getMatingPool() {
        this.mating_pool = [];
        for (var i = 0; i < population.getPopSize(); i++) {
            var x = population.getDeadAgents()[i].fitness * 100;
            for (var j = 0; j < x; j++) {
                this.mating_pool.push(population.getDeadAgents()[i]);
            }
        }
        return this.mating_pool;
    }


    /**
     * @returns - Returns empty mating_pool array.
     */
    newMatingPool() {
        return this.mating_pool = [];
    }

}