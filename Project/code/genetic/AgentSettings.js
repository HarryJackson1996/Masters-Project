class AgentSettings {

    /**
     * 
     * @param {*} up 
     * @param {*} left 
     * @param {*} right 
     * @param {*} width 
     * @param {*} height 
     */
    constructor(up, left, right, width, height) {
        this.MOVE_UP = up;
        this.MOVE_LEFT = left;
        this.MOVE_RIGHT = right;
        this.WIDTH = width;
        this.HEIGHT = height;
        this.COLOUR = "#ffae23";
    }

    /**
     * @returns {Number}
     */
    getUp() {
        return this.MOVE_UP;
    }

    /**
     * @returns {Number}
     */
    getDown() {
        return this.MOVE_UP;
    }

    /**
     * @returns {Number}
     */
    getLeft() {
        return this.MOVE_LEFT;
    }

    /**
     * @returns {Number}
     */
    getRight() {
        return this.MOVE_RIGHT;
    }

    /**
     * @returns {Number}
     */
    getWidth() {
        return this.WIDTH;
    }

    /**
     * @returns {Number}
     */
    getHeight() {
        return this.HEIGHT;
    }

    /**
     * @returns {Number}
     */
    getColour() {
        return this.COLOUR;
    }

}