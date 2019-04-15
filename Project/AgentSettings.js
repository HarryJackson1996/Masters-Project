class AgentSettings {

    constructor(up, left, right, width, height, hidden_neurons) {
        this.MOVE_UP = up;
        this.MOVE_LEFT = left;
        this.MOVE_RIGHT = right;
        this.WIDTH = width;
        this.HEIGHT = height;
        this.HIDDEN_NEURONS = hidden_neurons;
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

    getHiddenNeurons() {
        return this.HIDDEN_NEURONS;
    }

    getColour() {
        return this.COLOUR;
    }

}