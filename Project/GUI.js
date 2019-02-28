class GUI {

    constructor(gui) {
        this.gui = gui;
        this.obj = obj;
    }

    static createGUI() {
        this.gui = new dat.GUI();
        var folder1 = this.gui.addFolder('Screen settings');
        folder1.add(settings, 'SCREEN_WIDTH', 200, 800, 20, 'speed').name("Grid Width");
        folder1.add(settings, 'SCREEN_HEIGHT', 200, 800, 20).name("Grid Height");
        folder1.add(settings, 'NODE_SIZE', 0, 100, 10).name("Node Size");
    
        this.obj = { Update:function(){
            createCanvas(settings.getWidth(), settings.getHeight());
            grid = new Grid(floor(settings.getWidth()/settings.getNodeSize()), 
            floor(settings.getHeight()/settings.getNodeSize()));
            // agent = new Agent(0, 0, 20, 20);
            grid.createGrid();
            // agent.setSpawn(grid);
    
            }};
            folder1.add(this.obj, 'Update');
    }

}