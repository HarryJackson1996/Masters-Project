class Grid {

    constructor(rows, cols) {
        this.rows = rows;
        this.cols = cols;
        this.grid = [];
    }

    createGrid() {
        var settings_X = (((settings.getWidth()-1)/settings.getNodeSize())-1);
        var settings_Y = (((settings.getHeight()-1)/settings.getNodeSize())-1);

        for(var i = 0; i < this.rows; i++) {
            for(var j = 0; j < this.cols; j++) {
                if(i == 0 || i == settings_X || j == 0 || j == settings_Y) {
                    this.grid.push(new BlockedNode(i * settings.getNodeSize(), j * settings.getNodeSize(), settings.getNodeSize(), settings.getNodeSize()));  
                }
                else if(i == floor(settings_X/2) && j == 2){
                    this.grid.push(new GoalNode(i * settings.getNodeSize(), j * settings.getNodeSize(), settings.getNodeSize(), settings.getNodeSize())); 
                }
                else if(i == floor(settings_X/2) && j == (settings_Y - 2)){
                    this.grid.push(new StartNode(i * settings.getNodeSize(), j * settings.getNodeSize(), settings.getNodeSize(), settings.getNodeSize())); 
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
            if(this.grid[i].goal != true && this.grid[i].start != true){
                this.grid[i].clicked();
            }
        }
    }
}