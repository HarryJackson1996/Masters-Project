var settings;
var node;
var grid;

function setup() {
  settings = new Settings(400, 400, 20);
  createCanvas(settings.getWidth(), settings.getHeight());

  grid = new Grid(floor(settings.getWidth()/settings.getNodeSize()), 
                  floor(settings.getHeight()/settings.getNodeSize()));
  grid.createGrid()
}

function draw() {
  background(30); 
  grid.drawGrid();
}

function mousePressed() {
  grid.mouseClicked();
}