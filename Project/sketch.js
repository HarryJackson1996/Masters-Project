var node;
var grid;
var GA;

function setup() {
  settings = new Settings(400, 400, 20);
  createCanvas(settings.getWidth(), settings.getHeight());
  
  grid = new Grid(floor(settings.getWidth()/settings.getNodeSize()), 
  floor(settings.getHeight()/settings.getNodeSize()));
  grid.createGrid();
  
  GA = new Genetic(10);
  GA.createPopulation();


  GUI.createGUI();
}

function draw() {
  background(30); 
  grid.drawGrid();
  grid.moveStartNode();
  grid.moveGoalNode();
  GA.checkPopulation();
  GA.runPopulation();
  GA.newPopulation();
}

function mousePressed() {
  grid.mouseClicked();

}

function mouseDragged() {
  grid.moveStartNode();
  grid.moveGoalNode();
}