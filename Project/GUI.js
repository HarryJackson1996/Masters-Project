class GUI {

    constructor(gui) {
        this.gui = gui;
    }

    static createGUI() {
        this.gui = new dat.GUI();

        GUI.MapFolder();
        GUI.AgentSettings();
        GUI.GeneticSettings();
        
        this.start = { Start:function(){
            if(pause!=true){
                GA.createPopulation();
            }
            pause = false;
            start = true;
        }};

        this.pause = { Pause:function(){
            if(pause == false) {
                pause = true;
            } else {
            pause = false;
            }
        }};

        this.stop = { Stop:function(){
            stop = true;
            start = false;
            GA.createPopulation();
            console.clear();
            GA.resetGen();
            GA.resetScore();
        }};

        this.gui.add(this.start, 'Start');
        this.gui.add(this.pause, 'Pause');
        this.gui.add(this.stop, 'Stop');

        GUI.outputPanel();

        this.CSV = {CSV:function() {
            var data = GA.getData();
            var csv = 'Population size, Mutation rate, Generations, Time taken\n';
            data.forEach(function(row) {
                    csv += row.join(',');
                    csv += "\n";
            });
            var hiddenElement = document.createElement('a');
            hiddenElement.href = 'data:text/csv;charset=utf-8,' + encodeURI(csv);
            hiddenElement.target = '_blank';
            hiddenElement.download = 'GA-Data.csv';
            hiddenElement.click();
        }};
        this.gui.add(this.CSV, 'CSV').name("Download CSV");
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
            grid.createGrid(); 
            }};
            map_folder.add(this.obj, 'Update');
    }

    static AgentSettings() {
        var agent_folder = this.gui.addFolder('Agent Settings');
        agent_folder.add(GA, 'width').name("Agents Width");
        agent_folder.add(GA, 'height').name("Agents Height");   
    }

    static GeneticSettings() {
        var genetic_folder = this.gui.addFolder('Genetic Settings');
        genetic_folder.add(GA, 'population_size');
        genetic_folder.add(GA, 'mutation_rate');        
    }

    static outputPanel() {
        var output_folder = this.gui.addFolder('OUTPUTS')
        output_folder.add(GA, 'gen').listen().name("Generation Number")
        output_folder.add(GA, 'population_size').listen();
        output_folder.add(GA, 'mutation_rate').listen();    
        output_folder.add(GA, 'score').listen();
    }

}