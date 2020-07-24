
function Cell (col, row) {

  this.col = col;
  this.row = row;

  this.walls = [true, true, true, true];
  this.visited;
  this.highlighted;

  this.checkNeighbors = function() {

    var neighbors = [];

    var top = cellGrid[index(col, row - 1)];
    var right = cellGrid[index(col + 1, row)];
    var bottom = cellGrid[index(col, row + 1)];
    var left = cellGrid[index(col - 1, row)];

    if (top && !top.visited) {
      neighbors.push(top);
    }
    if (right && !right.visited) {
      neighbors.push(right);
    }
    if (bottom && !bottom.visited) {
      neighbors.push(bottom);
    }
    if (left && !left.visited) {
      neighbors.push(left);
    }

    if (neighbors.length > 0) {

      var r = floor(random(0, neighbors.length));
      return neighbors[r];
    } else {

      return undefined;
    }
  }

  this.display = function() {

    var x = col * cellSize;
    var y = row * cellSize;

    noStroke();
    if (this.highlighted) {

      fill(0, 255, 0);
      rect(x, y, cellSize, cellSize);
    } else if (this.visited) {

      fill(255, 80, 150);
      rect(x, y, cellSize, cellSize);
    }

    stroke(0);
    strokeWeight(2);
    if (this.walls[0]) {

      line (x, y, x + cellSize, y);// top
    }
    if (this.walls[1]) {

      line (x + cellSize, y, x + cellSize, y + cellSize);// right
    }
    if (this.walls[2]) {

      line (x + cellSize, y + cellSize, x, y + cellSize);// bottom
    }
    if (this.walls[3]) {

      line (x, y + cellSize, x, y);// left
    }
  }
}
