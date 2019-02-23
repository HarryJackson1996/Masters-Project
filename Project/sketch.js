var settings;
var node;

function setup() {
  settings = new Settings(400, 400);
  node = new Node(100, 100, 30, 30);
  createCanvas(settings.SCREEN_WIDTH, settings.SCREEN_HEIGHT);
}

function draw() {
  background(30); 
  node.drawNode();
}