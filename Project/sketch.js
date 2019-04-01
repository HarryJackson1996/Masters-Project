var grid;
var GA;
var start = false;
var stop = false;
var pause = false;

function setup() {
  settings = new Settings(400, 400, 20);
  createCanvas(settings.getWidth(), settings.getHeight());
  grid = new Grid(floor(settings.getWidth()/settings.getNodeSize()), 
  floor(settings.getHeight()/settings.getNodeSize()));
  grid.createGrid();
  GA = new Genetic(200, 7, 7);
  GUI.createGUI();
}

function draw() {
  background(30); 
  grid.drawGrid();
  if(start == true && pause == false) {
  GA.killMember();
  GA.newPopulation();
  GA.runPopulation();
  GA.drawPopulation();
  } else if(pause == true) {
    GA.drawPopulation();
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