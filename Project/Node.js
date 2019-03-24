class Node {

    /**
     * @constructor
     * 
     * @param {number} x - The x position of the Node object.
     * @param {number} y - The y position of the Node object.
     * @param {number} width - The width of the Node object.
     * @param {number} height - The height of the Node object.
     *
     * @property {boolean} blocked 
     * @property {boolean} goal 
     * @property {boolean} start 
     * @property {(3:number)} col
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
     * @method
     * @description - Method for drawing the Node graphics to the canvas.
     */
    drawNode() {
        stroke(0);
        fill(this.col);
        rect(this.x, this.y, this.width, this.height);
    }

    /**
     * @method
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
     * @method
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
     * @method 
     * @description - Sets the nodes state to goal.
     * @returns {boolean}
     */
    setGoal() {
        this.col = color(0, 200, 0);
        this.blocked = true;
        return this.goal = true;
    }

    /**
     * @method 
     * @description - Sets the nodes state to blocked.
     * @returns {boolean}
     */
    setBlocked() {
        this.col = color(200, 0, 0);
        return this.blocked = true;  
    }

    /**
     * @method 
     * @description - Sets the nodes state to start.
     * @returns {boolean}
     */
    setStart() {
        this.col = color(0, 220, 255);
        return this.start = true;  
    }

    /**
     * @method 
     * @returns {boolean} - Returns the nodes x position.
     */
    getX(){
        return this.x;
    }

    /**
     * @method 
     * @returns {boolean} - Returns the nodes y position.
     */
    getY() {
        return this.y;
    }
    
    /**
     * @method 
     * @returns {boolean} - Returns the nodes width.
     */
    getWidth() {
        return this.width;
    }
 
    /**
     * @method 
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
     */
    constructor(x, y, width, height){
        super(x, y, width, height);
        this.start = true;
        this.col = color(0, 220, 255);
    }
}