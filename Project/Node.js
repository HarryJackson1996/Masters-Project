class Node {

    constructor(x, y, width, height) {
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.col = color(255, 255, 255);
    }

    drawNode() {
        stroke(0);
        fill(this.col);
        rect(this.x, this.y, this.width, this.height);
    }
}