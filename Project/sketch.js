var grid;
var GA;
var agentSettings;
var start = false;
var stop = false;
var pause = false;
var population;

function setup() {
  settings = new Settings(420, 400, 20);
  agentSettings = new AgentSettings(3, 3, 3, 10, 10, 20);
  createCanvas(settings.getWidth(), settings.getHeight());
  grid = new Grid(floor(settings.getWidth()/settings.getNodeSize()), 
  floor(settings.getHeight()/settings.getNodeSize()));
  grid.createGrid();
  population = new Population(350);
  GA = new Genetic();
  GUI.createGUI();
  document.getElementById("gui").style.position = "absolute";
  document.getElementById("gui").style.left = settings.getWidth() + 20;
  document.getElementById("gui").style.top = 7;
  const element1 = document.querySelector('.cr.function:nth-child(5)');
  const element2 = document.querySelector('.cr.function:nth-child(6)');
  const element3 = document.querySelector('.cr.function:nth-child(7)');
  const element4 = document.querySelector('.cr.function:nth-child(8)');
  const element5 = document.querySelector('.cr.function:nth-child(9)');
  tippy(element1, {
    placement: 'right',
    content: 'Updates the map'
  });
  tippy(element2, {
    content: 'Starts the application',
    placement: 'right',
  });
  tippy(element3, {
    content: 'Pauses the application',
    placement: 'right',
  });
  tippy(element4, {
    content: 'Stops the application',
    placement: 'right',
  });
  tippy(element5, {
    content: 'Downloads CSV file with all recorded data',
    placement: 'right',
  });
}

function draw() {
  background(30); 
  grid.drawGrid();
  if(start == true && pause == false && stop == false) {
  population.killMember();
  GA.evolve();
  population.runPopulation();
  population.drawPopulation();
  } else if(pause == true) {
    population.drawPopulation();
  }
  grid.moveStartNode();
  grid.moveGoalNode();
}

function mousePressed() {
  grid.mouseClicked();

}

function mouseDragged() {
  grid.moveStartNode();
  grid.moveGoalNode();
}