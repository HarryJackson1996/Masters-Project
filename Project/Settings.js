class Settings {

    constructor(width, height, size) {
        this.SCREEN_HEIGHT = height;
        this.SCREEN_WIDTH = width;
        this.NODE_SIZE = size;
    }

    getWidth() {
        return this.SCREEN_WIDTH + 1;
    }

    getHeight() {
        return this.SCREEN_HEIGHT + 1;
    }


    getNodeSize() {
        return this.NODE_SIZE;
    }

}