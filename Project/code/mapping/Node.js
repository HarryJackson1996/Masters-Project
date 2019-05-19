class Node {

    /**
     * @constructor
     * 
     * @param {Number} x - The x position of the Node object.
     * @param {Number} y - The y position of the Node object.
     * @param {Number} width - The width of the Node object.
     * @param {Number} height - The height of the Node object.
     *
     * @property {Boolean} blocked - The blocked state of the node @default false.
     * @property {Boolean} goal - The goal state of the node @default false.
     * @property {Boolean} start - The start state of the node @default false.
     * @property {(3:Number)} col - The colour of node @default white.
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
        this.blocked = false;
        this.goal = false;
        this.start = false;
    }

    /**
     * @description - This method handles drawing the Node to the canvas.
     */
    drawNode() {
        stroke(0);
        fill(this.col);
        rect(this.x, this.y, this.width, this.height);
    }

    /**
     * @description - Handles Node onClick functionality and determines the updated
     * Node state. A Node can be either blocked (not-traversable) or normal (traversable).
     * @see setNormal 
     * @see setBlocked
     */
    clicked() {
        if (mouseX > this.x && mouseX < this.x + this.width) {
            if (mouseY > this.y && mouseY < this.y + this.height) {
                switch (true) {
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
     * @description - returns node state to normal, the Node is now traversable);
     */
    setNormal() {
        this.col = color(255, 255, 255);
        this.goal = false;
        this.blocked = false;
        this.start = false;
        return;
    }

    /**
     * @description - This method will set the current node equal to the goal node. 
     * The goal node is the node that the Agents are attempting to pathfind towards.
     * @returns {Boolean} - Returns goal state equal to true.
     */
    setGoal() {
        this.col = color(0, 200, 0);
        this.blocked = true;
        return this.goal = true;
    }

    /**
     * @description - This method will set the state of the node to blocked,
     * meaning the node is now not traversable by the agents.
     * @returns {Boolean} - Returns start state equal to true.
     */
    setBlocked() {
        this.col = color(200, 0, 0);
        return this.blocked = true;
    }

    /**
     * @description - This method will set the current node equal to the start node. 
     * The start node handles where the Agents will spawn (their starting location).
     * @returns {Boolean} - Returns blocked state equal to true.
     */
    setStart() {
        this.col = color(0, 220, 255);
        return this.start = true;
    }

    /**
     * @returns {Boolean} - Returns the nodes x position.
     */
    getX() {
        return this.x;
    }

    /**
     * @returns {Boolean} - Returns the nodes y position.
     */
    getY() {
        return this.y;
    }

    /**
     * @returns {Boolean} - Returns the nodes width.
     */
    getWidth() {
        return this.width;
    }

    /**
     * @returns {Boolean} - Returns the nodes height.
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
     * @param {Number} x - The x position of the Node object.
     * @param {Number} y - The y position of the Node object.
     * @param {Number} width - The width of the Node object.
     * @param {Number} height - The height of the Node object.
     * 
     * @property {(3:Number)} col - The colour of blocked node @default red.
     * @property {Boolean} blocked - Blocked Node default state is blocked.
     */
    constructor(x, y, width, height) {
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
     * @param {Number} x - The x position of the Node object.
     * @param {Number} y - The y position of the Node object.
     * @param {Number} width - The width of the Node object.
     * @param {Number} height - The height of the Node object.
     * 
     * @property {(3:Number)} col - The colour of goal node @default green.
     * @property {Boolean} blocked - Goal Node defaults to blocked.
     * @property {Boolean} goal - Goal Node default state is goal.
     */
    constructor(x, y, width, height) {
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
     * @param {Number} x - The x position of the Node object.
     * @param {Number} y - The y position of the Node object.
     * @param {Number} width - The width of the Node object.
     * @param {Number} height - The height of the Node object.
     * 
     * @property {(3:Number)} col - The colour of start node @default blue.
     * @property {Boolean} start - Start Node default state is start.
     */
    constructor(x, y, width, height) {
        super(x, y, width, height);
        this.start = true;
        this.col = color(0, 220, 255);
    }
}