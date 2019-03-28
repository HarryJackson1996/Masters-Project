class Settings {

    /**
     * @constructor
     * 
     * @param {Number} width - The canvas width in pixels.
     * @param {Number} height - The canvas height in pixels.
     * @param {Number} size - The size of a singular node (width and height).
     * 
     * @example 
     * var settings = new Settings(400, 400, 20);
     */
    constructor(width, height, size) {
        this.SCREEN_HEIGHT = height;
        this.SCREEN_WIDTH = width;
        this.NODE_SIZE = size;
    }

    /**
     * @returns {Number} - The Canvas width.
     */
    getWidth() {
        return this.SCREEN_WIDTH + 1;
    }

    /**
     * @returns {Number} - The Canvas height.
     */
    getHeight() {
        return this.SCREEN_HEIGHT + 1;
    }

    /**
     * @returns {Number} - The Node width and height.
     * @see Node
     */
    getNodeSize() {
        return this.NODE_SIZE;
    }

}