class AgentSettings {

    /**
     * @constructor
     * 
     * @param {Number} up - The upwards velocity of the Agents.
     * @param {Number} down - The downwards velocity of the Agents.
     * @param {Number} left - The left velocity of the Agents.
     * @param {Number} right - The right velocity of the Agents.
     * @param {Number} width - The width of the Agents.
     * @param {Number} height - The height of the Agents.
     * 
     * @property {Hexcode} COLOUR -  The agents colour.
     */
    constructor(up, down, left, right, width, height) {
        this.UP_VELOCITY = up;
        this.DOWN_VELOCITY = down;
        this.LEFT_VELOCITY = left;
        this.RIGHT_VELOCITY = right;
        this.WIDTH = width;
        this.HEIGHT = height;
        this.COLOUR = "#b400ff";
    }

    /**
     * @returns {Number} - Returns the upwards velocity of the Agents.
     */
    getUpVelocity() {
        return this.UP_VELOCITY;
    }

    /**
     * @returns {Number} - Returns the downwards velocity of the Agents.
     */
    getDownVelocity() {
        return this.DOWN_VELOCITY;
    }

    /**
     * @returns {Number} - Returns the left velocity of the Agents.
     */
    getLeftVelocity() {
        return this.LEFT_VELOCITY;
    }

    /**
     * @returns {Number} - Returns the right velocity of the Agents.
     */
    getRightVelocity() {
        return this.RIGHT_VELOCITY;
    }

    /**
     * @returns {Number} - Returns the Agents width.
     */
    getWidth() {
        return this.WIDTH;
    }

    /**
     * @returns {Number} - Returns the Agents height.
     */
    getHeight() {
        return this.HEIGHT;
    }

    /**
     * @returns {Number} - Returns the colour of the agents.
     */
    getColour() {
        return this.COLOUR;
    }

}