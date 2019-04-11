var grid;
var GA;
var start = false;
var stop = false;
var pause = false;
var population;

function setup() {
  settings = new Settings(420, 400, 20);
  createCanvas(settings.getWidth(), settings.getHeight());
  grid = new Grid(floor(settings.getWidth()/settings.getNodeSize()), 
  floor(settings.getHeight()/settings.getNodeSize()));
  grid.createGrid();
  population = new Population(2, 7, 7);
  console.log(population.getPopSize());
  GA = new Genetic();
  GUI.createGUI();
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