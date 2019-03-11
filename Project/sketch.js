var node;
var grid;
var GA;

function setup() {
  settings = new Settings(400, 400, 20);
  createCanvas(settings.getWidth(), settings.getHeight());
  GA = new Genetic(10);
  GA.createPopulation();
  grid = new Grid(floor(settings.getWidth()/settings.getNodeSize()), 
                  floor(settings.getHeight()/settings.getNodeSize()));
  grid.createGrid();

  GUI.createGUI();
}

function draw() {
  background(30); 
  grid.drawGrid();
  grid.moveStartNode();
  grid.moveGoalNode();
  GA.runPopulation();
}

function mousePressed() {
  grid.mouseClicked();

}

function mouseDragged() {
  grid.moveStartNode();
  grid.moveGoalNode();
}