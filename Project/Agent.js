class Agent {

    constructor(x, y, width, height) {
        this.VELOCITY = p5.Vector.random2D();
        this.ACCELERATION = createVector();
        this.CRASHED = false;
        this.x = x;
        this.y = y;
        this.height = height;
        this.width = width;
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
        return this.x;
    }

    getY() {
        // console.log(this.POSITION.y);
        return this.y;
    }

    moveDown() {
        return this.y += 2;
    }

    moveUp() {
        if(this.CRASHED == false) {
        return this.x += 2;
        }
    }

    moveRight() {
        return this.x += 2;
    }

    moveLeft() {
        return this.y -= 2;
    }   
}
