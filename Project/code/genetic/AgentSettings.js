class AgentSettings {

    constructor(up, left, right, width, height) {
        this.MOVE_UP = up;
        this.MOVE_LEFT = left;
        this.MOVE_RIGHT = right;
        this.WIDTH = width;
        this.HEIGHT = height;
        this.COLOUR = "#ffae23";
    }

    getUp() {
        return this.MOVE_UP;
    }

    getLeft() {
        return this.MOVE_LEFT;
    }

    getRight() {
        return this.MOVE_RIGHT;
    }

    getWidth() {
        return this.WIDTH;
    }

    getHeight() {
        return this.HEIGHT;
    }

    getColour() {
        return this.COLOUR;
    }

}