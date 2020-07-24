
var rows, cols;
var cellSize = 20;
var cellGrid = [];

var stack = [];

var current;
var display = true;
var amountDone;

function setup() {

  createCanvas(600, 600);
  frameRate(60);

  cols = width / cellSize;
  rows = height / cellSize;

  for (var i = 0; i < cols; i ++) {

    for (var j = 0; j < rows; j++) {

      var cell = new Cell(i, j);
      cellGrid.push(cell);
    }
  }

  current = cellGrid[0];

  print ("dimensions: " + cols + " - " + rows + "\nSetup complete\n")
}

function draw() {

  background(250);

  amountDone = 0;
  for (var i = 0; i < cellGrid.length; i++) {

    if (display) {

      cellGrid[i].display();
    }
    cellGrid[i].highlighted = false;
    if (cellGrid[i].visited) {amountDone++;}
  }

  current.visited = true;
  var nextCell = current.checkNeighbors();
  if (nextCell) {

    stack.push(current);

    nextCell.highlighted = true;
    nextCell.visited = true;
    removeWalls(current, nextCell);
    current = nextCell;
  } else if (stack.length > 0) {

    current = stack.pop();
    current.highlighted = true;
  }
}

function removeWalls (a, b) {

  x = a.col - b.col;
  if (x === 1) {

    a.walls[3] = false;
    b.walls[1] = false;
  } else if (x === -1) {

    a.walls[1] = false;
    b.walls[3] = false;
  }
  y = a.row - b.row;
  if (y === 1) {

    a.walls[0] = false;
    b.walls[2] = false;
  } else if (y === -1) {

    a.walls[2] = false;
    b.walls[0] = false;
  }

}

function index (j, i) {

  if (i < 0 || j < 0 || i > rows - 1 || j > cols - 1) {

    return -1;
  }
  return i + j * cols;
}
