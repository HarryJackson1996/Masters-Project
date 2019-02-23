class Node {

    constructor(x, y, width, height) {
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.col = color(255, 255, 255);
        this.blocked = false;
        this.goal = false;
    }

    drawNode() {
        stroke(0);
        fill(this.col);
        rect(this.x, this.y, this.width, this.height);
    }

    clicked() {
        if(mouseX > this.x && mouseX < this.x + this.width){      
            if(mouseY > this.y && mouseY < this.y + this.height){ 
                if(this.blocked == false) {
                    this.col = color(200, 0, 0);
                    this.blocked = true;
                } 
                else {
                    this.col = color(255, 255, 255);
                    this.blocked = false;
                }
            }
        }
    }
}

class BlockedNode extends Node {

    constructor(x, y, width, height){
        super(x, y, width, height);
        this.blocked = true;
        this.col = color(200, 0, 0);
    }
}

class GoalNode extends Node {

    constructor(x, y, width, height){
        super(x, y, width, height);
        this.goal = true;
        this.col = color(0, 200, 0);
    }
}