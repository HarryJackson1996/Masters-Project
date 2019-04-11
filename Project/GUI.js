class GUI {

    constructor(gui) {
        this.gui = gui;
    }

    static createGUI() {
        this.gui = new dat.GUI();       
        GUI.MapFolder();
        GUI.AgentSettings();
        GUI.GeneticSettings();
        GUI.outputPanel();

        this.start = { Start:function(){
            if(pause==false) {
            population.createPopulation(grid);
            }

            pause = false;
            start = true;
            stop = false;
        }};

        this.pause = { Pause:function(){
            if(start == true) {
                pause = true;
                start = false;
            }
            else if(start == false && pause == true) {
                pause = false;
                start = true;
            }
        }};

        this.stop = { Stop:function(){
            stop = true;
            pause = false;
            start = false;
            population.clearPopulation();
            console.clear();
            GA.resetGen();
            population.resetScore();
        }};

        this.gui.add(this.start, 'Start');
        this.gui.add(this.pause, 'Pause');
        this.gui.add(this.stop, 'Stop');

        this.CSV = {CSV:function() {
            var data = population.getData();
            var csv = 'Population size, Mutation rate, Generations, Time taken\n';
            data.forEach(function(row) {
                    csv += row.join(',');
                    csv += "\n";
            });
            var hiddenElement = document.createElement('a');
            hiddenElement.href = 'data:text/csv;charset=utf-8,' + encodeURI(csv);
            hiddenElement.target = '_blank';
            hiddenElement.download = '4-3-1.csv';
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
        agent_folder.add(population, 'width').name("Agents Width");
        agent_folder.add(population, 'height').name("Agents Height");   
    }

    static GeneticSettings() {
        var genetic_folder = this.gui.addFolder('Genetic Settings');
        genetic_folder.add(population, 'population_size');
        genetic_folder.add(GA, 'mutation_rate');        
    }

    static outputPanel() {
        var output_folder = this.gui.addFolder('OUTPUTS')
        output_folder.add(GA, 'gen').listen().name("Generation Number")
        output_folder.add(population, 'population_size').listen();
        output_folder.add(GA, 'mutation_rate').listen();    
        output_folder.add(population, 'score').listen();
        output_folder.open();
    }

}