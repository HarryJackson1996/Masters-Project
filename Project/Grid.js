class Grid {

    constructor(rows, cols, square_size) {
        this.rows = rows;
        this.cols = cols;
        this.grid = [];
        this.size = square_size;
    }

    createGrid() {
        for(var i = 0; i < this.rows; i++) {
            for(var j = 0; j < this.cols; j++) {
                this.grid.push(new Node(i * 10, j * 10, 10, 10));  
            }
        }
    }

    drawGrid() {
        for(var i = 0; i < this.grid.length; i++){
            this.grid[i].drawNode();
        }
    }

}