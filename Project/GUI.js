class GUI {

    constructor(gui) {
        this.gui = gui;
        this.obj = obj;
    }

    static createGUI() {
        this.gui = new dat.GUI();
        GUI.MapFolder();
        GUI.AgentSettings();
    }

    static MapFolder() {
        var map_folder = this.gui.addFolder('Map settings');
        map_folder.add(settings, 'SCREEN_WIDTH', 200, 800, 20, 'speed').name("Grid Width");
        map_folder.add(settings, 'SCREEN_HEIGHT', 200, 800, 20).name("Grid Height");
        map_folder.add(settings, 'NODE_SIZE', 0, 100, 10).name("Node Size");
    
        this.obj = { Update:function(){
            createCanvas(settings.getWidth(), settings.getHeight());
            grid = new Grid(floor(settings.getWidth()/settings.getNodeSize()), 
            floor(settings.getHeight()/settings.getNodeSize()));
            agent = new Agent(0, 0, 20, 20);
            grid.createGrid();
            agent.setSpawn(grid);
    
            }};
            map_folder.add(this.obj, 'Update');
    }

    static AgentSettings() {
        var agent_folder = this.gui.addFolder('Agent Settings');
        agent_folder.add(settings, 'SCREEN_WIDTH', 200, 800, 20, 'speed').name("Grid Width");
        agent_folder.add(settings, 'SCREEN_HEIGHT', 200, 800, 20).name("Grid Height");
        agent_folder.add(settings, 'NODE_SIZE', 0, 100, 10).name("Node Size");
    }

    static GeneticSettings() {
        var genetic_folder = this.gui.addFolder('Genetic Settings')
    }

    static run() {

    }

}