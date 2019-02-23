var settings;
var node;
var grid;

function setup() {
  settings = new Settings(400, 400);
  grid = new Grid(10, 10);
  createCanvas(settings.SCREEN_WIDTH, settings.SCREEN_HEIGHT);
  grid.createGrid()
}

function draw() {
  background(30); 
  grid.drawGrid();
}