class Node {

    constructor(x, y, width, height) {
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.col = color(255, 255, 255);
        this.goal = false;
        this.blocked = false;
        this.start = false;
    }

    drawNode() {
        stroke(0);
        fill(this.col);
        rect(this.x, this.y, this.width, this.height);
    }

    clicked() {
        if(mouseX > this.x && mouseX < this.x + this.width){      
            if(mouseY > this.y && mouseY < this.y + this.height){ 
                switch(true) {
                    case this.blocked: 
                    this.setNormal();
                    break;

                    default: 
                    this.setBlocked();
                    break;
                }
            }
        }
    }

    setNormal() {
        this.col = color(255, 255, 255);
        this.goal = false;
        this.blocked = false;
        this.start = false;
        return;
    }
    
    setGoal() {
        this.col = color(0, 200, 0);
        this.blocked = true;
        return this.goal = true;
    }

    setBlocked() {
        this.col = color(200, 0, 0);
        return this.blocked = true;  
    }

    setStart() {
        this.col = color(0, 220, 255);
        return this.start = true;  
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
        this.blocked = true;
        this.col = color(0, 200, 0);
    }
}

class StartNode extends Node {

    constructor(x, y, width, height){
        super(x, y, width, height);
        this.start = true;
        this.col = color(0, 220, 255);
    }
}