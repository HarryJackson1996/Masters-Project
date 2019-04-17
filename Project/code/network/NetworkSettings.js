class NetworkSettings {

    /**
     * @constructor 
     * @param {Number} hidden - The number of hidden nodes. 
     * @todo Add functionality allowing user to choose number of input nodes.
     */
    constructor(hidden) {
        this.hiddenNodes = hidden;
    }

    /** 
     * @returns {Number} - Returns the number of hidden nodes.
     */
    getHiddenNodes() {
        // console.log(this.hiddenNodes)
        return this.hiddenNodes;
    }
}