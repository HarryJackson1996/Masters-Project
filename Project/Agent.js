class Agent {

    constructor(x, y, width, height) {
        this.POSITION = createVector(0, settings.SCREEN_HEIGHT-90);
        this.VELOCITY = p5.Vector.random2D();
        this.ACCELERATION = createVector();
        this.CRASHED = false;
        this.x = x;
        this.y = y;
        this.height = height;
        this.width = width;
        this.grid;
    }

    checkCollision() {
        var grid2 = grid.getGrid();
        if(this.POSITION.x > 400 || this.POSITION.x < 0){
            return this.CRASHED = true;
        }
        if(this.POSITION.y >= settings.getHeight() || this.POSITION.y <= 0) {
            return this.CRASHED = true;
        }
        for(var i = 0; i < grid2.length; i++){
            if(grid2[i].blocked == true || grid2[i].goal == true){
                var hit = collideRectRect(grid2[i].getX(), grid2[i].getY(), 
                                  grid2[i].getWidth(), grid2[i].getHeight(), 
                                  agent.getX(), agent.getY(),
                                  agent.getWidth(), agent.getHeight());
                if(hit){
                    return this.CRASHED = true;
                }
            }
            }
        }
    
    setSpawn(grid) {
        this.grid = grid.getGrid();
        for(var i = 0; i < this.grid.length; i++) {
            if(this.grid[i].goal == true) {
                this.grid[i].getX();
                this.POSITION.x = this.grid[i].getX();
            }
        }
    }

    kill() {
        this.POSITION.x = createVector(-50, -50);
    }

        agentSpawn() {
        this.POSITION = createVector(20, 200);
    }

    update() {
        if(this.CRASHED == false){
            this.VELOCITY.add(this.ACCELERATION);
            this.POSITION.add(this.VELOCITY);
        }   
    }

    show() {
        push();
        stroke(0);
        fill(0,200,20);
        translate(this.POSITION.x, this.POSITION.y);
        //rotate(this.VELOCITY.heading());
        //rectMode(CENTER);
        rect(this.x, this.y, this.width, this.height);
        pop();
    }

    applyForce(force) {
        this.ACCELERATION.add(force);
    }

    getHeight() {
        //console.log(this.POSITION.y);
        return this.height;
    }    

    getWidth() {
        //console.log(this.width);
        return this.width;
    }

    getX() {
        // console.log(this.POSITION.x);
        return this.POSITION.x;
    }

    getY() {
        // console.log(this.POSITION.y);
        return this.POSITION.y;
    }
    
}
