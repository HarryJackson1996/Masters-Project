var settings;
var node;
var grid;
var agent;


function setup() {
  settings = new Settings(400, 400, 20);
  createCanvas(settings.getWidth(), settings.getHeight());
  agent = new Agent(0, 0, 10, 10);

  grid = new Grid(floor(settings.getWidth()/settings.getNodeSize()), 
                  floor(settings.getHeight()/settings.getNodeSize()));
  grid.createGrid();
  agent.setSpawn(grid);

  GUI.createGUI();
}

function draw() {
  background(30); 
  grid.drawGrid();
  agent.update();
  agent.checkCollision();
  agent.show(); 
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