class Grid {

    constructor(rows, cols) {
        this.rows = rows;
        this.cols = cols;
        this.grid = [];
    }

    createGrid() {
        for(var i = 0; i < this.rows; i++) {
            for(var j = 0; j < this.cols; j++) {
                if(i == 5 && j == 5) {
                    this.grid.push(new BlockedNode(i * 10, j * 10, 10, 10));  
                }
                else{
                    this.grid.push(new Node(i * 10, j * 10, 10, 10));  
                }
            } 
        }
    }

    drawGrid() {
        for(var i = 0; i < this.grid.length; i++){
            this.grid[i].drawNode();
        }
    }

    mouseClicked() {
        for(var i = 0; i < this.grid.length; i++){
            this.grid[i].clicked();
        }
    }
}