class Node {

    /**
     * @constructor
     * 
     * @param {number} x - The x position of the Node object.
     * @param {number} y - The y position of the Node object.
     * @param {number} width - The width of the Node object.
     * @param {number} height - The height of the Node object.
     *
     * @property {boolean} blocked - The blocked state of the node @default false.
     * @property {boolean} goal - The goal state of the node @default false.
     * @property {boolean} start - The start state of the node @default false.
     * @property {(3:number)} col - The colour of node @default white.
     * 
     * @example 
     * var node = new Node(0, 0, 20, 20);
     */
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

    /**
     * @description - Method for drawing the Node to the canvas.
     */
    drawNode() {
        stroke(0);
        fill(this.col);
        rect(this.x, this.y, this.width, this.height);
    }

    /**
     * @description - Handles Node onClick functionality.
     * @see setNormal 
     * @see setBlocked
     */
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

    /**
     * @description - returns the node state to normal (it is traversable).
     */
    setNormal() {
        this.col = color(255, 255, 255);
        this.goal = false;
        this.blocked = false;
        this.start = false;
        return;
    }
    
    /**
     * @returns {boolean} - Sets the nodes state to goal.
     */
    setGoal() {
        this.col = color(0, 200, 0);
        this.blocked = true;
        return this.goal = true;
    }

    /**
     * @returns {boolean} - Sets the nodes state to blocked.
     */
    setBlocked() {
        this.col = color(200, 0, 0);
        return this.blocked = true;  
    }

    /**
     * @returns {boolean} - Sets the nodes state to start.
     */
    setStart() {
        this.col = color(0, 220, 255);
        return this.start = true;  
    }

    /**
     * @returns {boolean} - Returns the nodes x position.
     */
    getX(){
        return this.x;
    }

    /**
     * @returns {boolean} - Returns the nodes y position.
     */
    getY() {
        return this.y;
    }
    
    /**
     * @returns {boolean} - Returns the nodes width.
     */
    getWidth() {
        return this.width;
    }
 
    /**
     * @returns {boolean} - Returns the nodes height.
     */
    getHeight() {
        return this.height;
    }
}

/**
 * @memberof Node
 */
class BlockedNode extends Node {

    /**
     * @param {number} x - The x position of the Node object.
     * @param {number} y - The y position of the Node object.
     * @param {number} width - The width of the Node object.
     * @param {number} height - The height of the Node object.
     * 
     * @property {number} col
     * @property {boolean} blocked - Blocked Node defaults to blocked.
     */
    constructor(x, y, width, height){
        super(x, y, width, height);
        this.blocked = true;
        this.col = color(200, 0, 0);
    }
}

/**
 * @memberof Node
 */
class GoalNode extends Node {

    /**
     * @param {number} x - The x position of the Node object.
     * @param {number} y - The y position of the Node object.
     * @param {number} width - The width of the Node object.
     * @param {number} height - The height of the Node object.
     * 
     * @property {number} col
     * @property {boolean} blocked - Goal Node defaults to blocked.
     * @property {boolean} goal - Goal Node defaults to goal.
     */
    constructor(x, y, width, height){
        super(x, y, width, height);
        this.goal = true;
        this.blocked = true;
        this.col = color(0, 200, 0);
    }
}

/**
 * @memberof Node
 */
class StartNode extends Node {
    
    /**
     * @param {number} x - The x position of the Node object.
     * @param {number} y - The y position of the Node object.
     * @param {number} width - The width of the Node object.
     * @param {number} height - The height of the Node object.
     * 
     * @property {number} col
     * @property {boolean} start - Start Node defaults to start.
     */
    constructor(x, y, width, height){
        super(x, y, width, height);
        this.start = true;
        this.col = color(0, 220, 255);
    }
}