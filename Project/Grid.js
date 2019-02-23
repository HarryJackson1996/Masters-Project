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
                    this.grid.push(new BlockedNode(i * settings.getNodeSize(), j * settings.getNodeSize(), settings.getNodeSize(), settings.getNodeSize()));  
                }
                else{
                    this.grid.push(new Node(i * settings.getNodeSize(), j * settings.getNodeSize(), settings.getNodeSize(), settings.getNodeSize()));  
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