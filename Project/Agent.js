class Agent {

    constructor(x, y, width, height, brain) {
        this.VELOCITY = p5.Vector.random2D();
        this.ACCELERATION = createVector();
        this.CRASHED = false;
        this.x = x;
        this.y = y;
        this.height = height;
        this.width = width;
        this.fitness = 0;
        if(brain instanceof NeuralNetwork) {
            this.brain = brain.copy();
        } 
        else {
            this.brain = new NeuralNetwork(6, 14, 1);
        }    
    }

    checkCollision() {
        var grid2 = grid.getGrid();
        if(this.x > settings.getWidth() - this.width || this.x <= 0){
            return this.CRASHED = true;
        }
        if(this.y > settings.getHeight() - this.height || this.y <= 0) {
            return this.CRASHED = true;
        }
        for(var i = 0; i < grid2.length; i++){
            if(grid2[i].blocked == true || grid2[i].goal == true){
                var hit = collideRectRect(grid2[i].getX(), grid2[i].getY(), 
                                  grid2[i].getWidth(), grid2[i].getHeight(), 
                                  this.x, this.y,
                                  this.width, this.height);
                if(hit){
                    return this.CRASHED = true;
                }
            }
        }
    }
    
    // setSpawn(grid) {
    //     this.grid = grid.getGrid();
    //     for(var i = 0; i < this.grid.length; i++) {
    //         if(this.grid[i].goal == true) {
    //             this.grid[i].getX();
    //             this.x = this.grid[i].getX();
    //         }
    //     }
    // }
    
    show() {
        push();
        stroke(0);
        fill(0,200,20);
        //rotate(this.VELOCITY.heading());
        //rectMode(CENTER);
        rect(this.x, this.y, this.width, this.height);
        pop();
    }

    applyForce(force) {
        this.ACCELERATION.add(force);
    }

    getFitness() {
        var getGrid = grid.getGrid();
        var goalX;
        var goalY;
        for(var i = 0; i < getGrid.length; i++) {
            if(getGrid[i].goal == true) {
                goalX = getGrid[i].x;
                goalY= getGrid[i].y;
            }
        }
        
        var distance = dist(this.x, this.y, goalX, goalY);
        this.fitness = 1/distance;
        return this.fitness;
    }  
    
    makeDecision(grid) {
        var closest = 0;
        for(var i = 0; i < grid.length; i++) {
            if(grid[i].blocked == true) {
                var d = dist(this.x, this.y, grid[i].x, grid[i].y);
                    if (closest == 0) {
                        closest = d;
                    } else if (closest > d) {
                        closest = d;
                    }
            }
        }

        let inputs = [];
        inputs[0] = this.x;
        inputs[1] = this.y;
        inputs[2] = (closest);
        inputs[3] = grid.getGoalX();
        inputs[4] = grid.getGoalY();
        inputs[5] = grid.getWidth();
       
        let output = this.brain.predict(inputs); 

        if(output < 0.3333) {
            this.moveLeft();
        } 
        else if(output >= 0.3333 && output < 0.6666) {
            this.moveUp();
        }
        else if(output >= 0.6666 && output < 1) {
            this.moveRight();

        }
    }
    
    getHeight() {
        return this.height;
    }    

    getWidth() {
        return this.width;
    }

    getX() {
        return this.x;
    }

    getY() {
        return this.y;
    }

    moveDown() {
        return this.y += 2;
    }

    moveUp() {
        return this.x += 2;
    }

    moveRight() {
        return this.x += 2;
    }

    moveLeft() {
        return this.y -= 2;
    }   

}
