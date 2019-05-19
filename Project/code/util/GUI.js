class GUI {

    /** 
     * @constructor
     * @property {Variable} - Variable for storing GUI data. 
     */
    constructor() {
        this.gui;
    }

    /**
     * @static
     * @description - This method handles pulling together all folders and then creates 
     * the GUI object/ primary controller.
     * @property {Event} start - Starts the program. 
     * @property {Event} pause - Pauses the program. 
     * @property {Event} stop - Stops (resets) the program. 
     * @property {Event} CSV - Downloads the CSV file. 
     * @returns {Object} - The GUI.
     * 
     * @see GUI.mapController 
     * @see GUI.agentController 
     * @see GUI.geneticController 
     * @see GUI.networkController 
     * @see GUI.outputPanel
     * 
     */
    static createGUI() {
        this.gui = new dat.GUI({ autoplace: false });
        this.gui.domElement.id = 'gui';

        GUI.mapController();
        GUI.agentController();
        GUI.geneticController();
        GUI.networkController();
        GUI.outputPanel();

        this.start = {
            Start: function () {
                if (pause == false) {
                    population.createPopulation(grid);
                }
                pause = false;
                start = true;
                stop = false;
                counter = 0;
            }
        };

        this.pause = {
            Pause: function () {
                if (start == true) {
                    pause = true;
                    start = false;
                }
                else if (start == false && pause == true) {
                    pause = false;
                    start = true;
                }
            }
        };

        this.stop = {
            Stop: function () {
                stop = true;
                pause = false;
                start = false;
                population.clearPopulation();
                population.resetDeadAgents();
                GA.resetGen();
                population.resetScore();
                console.clear();
                counter = 0;
            }
        };

        this.gui.add(this.start, 'Start');
        this.gui.add(this.pause, 'Pause');
        this.gui.add(this.stop, 'Stop');

        this.CSV = {
            CSV: function () {
                var csv = 'Population size, Mutation rate, Generations, Time taken, Hidden Neurons\n';
                data.forEach(function (row) {
                    csv += row.join(',');
                    csv += "\n";
                });
                var hiddenElement = document.createElement('a');
                hiddenElement.href = 'data:text/csv;charset=utf-8,' + encodeURI(csv);
                hiddenElement.target = '_blank';
                hiddenElement.download = '0-1-3-4.csv';
                hiddenElement.click();
            }
        };
        this.gui.add(this.CSV, 'CSV').name("Download CSV");
        return this.gui;
    }

    /**
     * @static
     * @description - This method creates a (GUI) folder which is the specific controller 
     * segment used for manipulating Map data in the framework.
     * @property {Event} update - Updates the map object.  
     * @throws {alert} - Throws window alert if WIDTH/NODE_SIZE and HEIGHT/NODE_SIZE does not equal 0.
     * @returns {Object} - Returns the folder for controlling Map data.
     * 
     * @see MapSettings
     * 
     */
    static mapController() {
        var map_folder = this.gui.addFolder('Map settings');
        map_folder.add(settings, 'SCREEN_WIDTH', 200, 1200, 10, 'speed').name("Grid Width");
        map_folder.add(settings, 'SCREEN_HEIGHT', 200, 1000, 10).name("Grid Height");
        map_folder.add(settings, 'NODE_SIZE', 0, 100, 10).name("Node Size");

        this.update = {
            Update: function () {
                var checkX = (settings.getWidth() - 1) / settings.getNodeSize();
                var checkY = (settings.getHeight() - 1) / settings.getNodeSize();
                try {
                    if (checkX % 1 != 0 || checkY % 1 != 0) {
                        throw error;
                    } else {
                        createCanvas(settings.getWidth(), settings.getHeight());
                        grid = new Grid(floor(settings.getWidth() / settings.getNodeSize()),
                            floor(settings.getHeight() / settings.getNodeSize()));
                        grid.createGrid();
                        document.getElementById("gui").style.position = "absolute";
                        document.getElementById("gui").style.left = settings.getWidth() + 20;
                        document.getElementById("gui").style.top = 7;
                    }
                }
                catch (error) {
                    window.alert("nope");
                }
            }
        };
        map_folder.add(this.update, 'Update');
        return map_folder;
    }

    /**
     * @static
     * @description - This method creates a (GUI) folder which is the specific controller 
     * segment used for manipulating Agent data in the framework.
     * @returns {Object} - Returns the folder for controlling Agent data. 
     * @see AgentSettings
     */
    static agentController() {
        var agent_folder = this.gui.addFolder('Agent Settings');
        agent_folder.add(agentSettings, 'WIDTH').name("Agents Width");
        agent_folder.add(agentSettings, 'HEIGHT').name("Agents Height");
        agent_folder.add(agentSettings, 'UP_VELOCITY', 0, 10, 0.5).name("Up speed");
        agent_folder.add(agentSettings, 'DOWN_VELOCITY', 0, 10, 0.5).name("Down speed");
        agent_folder.add(agentSettings, 'LEFT_VELOCITY', 0, 10, 0.5).name("Left speed");
        agent_folder.add(agentSettings, 'RIGHT_VELOCITY', 0, 10, 0.5).name("Right speed");
        agent_folder.addColor(agentSettings, 'COLOUR').name("Colour");
        return agent_folder;
    }

    /**
     * @static
     * @description - This method creates a (GUI) folder which is the specific controller 
     * segment used for manipulating Agent data in the framework.
     * @returns {Object} - Returns the folder for controlling Genetic data.
     * @see Population
     * @see GA
     */
    static geneticController() {
        var genetic_folder = this.gui.addFolder('Genetic Settings');
        genetic_folder.add(population, 'population_size').name("Population size");
        genetic_folder.add(GA, 'mutation_rate').name("Mutation rate");
        return genetic_folder;
    }

    /**
     * @static
     * @description - This method creates a (GUI) folder which is the specific controller 
     * segment used for manipulating Neural Network data in the framework.
     * @returns {Object} - Returns the folder for controlling NeuralNetwork data.
     * @see NetworkSettings
     */
    static networkController() {
        var network_folder = this.gui.addFolder('Network Settings');
        network_folder.add(networkSettings, 'HIDDEN_NODES').name('Hidden-layer neurons')
        return network_folder;
    }

    /**
     * @static
     * @description - This method creates a (GUI) folder that in real-time displays all 
     * the crucial data from the other folders in the GUI.
     * @returns {Object} - Returns the folder for displaying outputs from framework.
     */
    static outputPanel() {
        var output_folder = this.gui.addFolder('OUTPUTS')
        output_folder.add(GA, 'gen').listen().name("Generation Number")
        output_folder.add(population, 'population_size').name("Population size").listen();
        output_folder.add(GA, 'mutation_rate').name("Mutation rate").listen();
        output_folder.add(population, 'score').name("Score").listen();
        output_folder.open();
        return output_folder;
    }
}