class NetworkSettings {

    /**
     * @constructor 
     * @param {Number} hidden - The number of hidden nodes. 
     * @todo Add functionality allowing user to choose number of input nodes.
     * 
     * @example
     * var hiddenNodes = new NetworkSettings(10);
     */
    constructor(hidden) {
        this.HIDDEN_NODES = hidden;
    }

    /** 
     * @returns {Number} - Returns the number of hidden nodes.
     */
    getHiddenNodes() {
        // console.log(this.hiddenNodes)
        return this.HIDDEN_NODES;
    }
}