let cells = []
function setup() {
  createCanvas(windowWidth, windowHeight)
  const adamCell = new Cell(
    createVector(width / 2, height / 2),
    80,
    color(random(100, 255), 0, random(100, 255))
  )
  cells.push(adamCell)
}

function draw() {
  background(51)
  fill(255)
  textSize(32)
  text("UNFINISHED", width / 2, 100)
  for (let cell of cells) {
    cell.move()
    cell.show()
  }
}
function mousePressed() {
  for (cell of cells) {
    if (cell.clicked()) {
      console.log("cell clicked")
      cells.push(cell.mitosis())
    }
  }
}

class Cell {
  constructor(position, radius, color) {
    this.position = position
    this.radius = radius
    this.color = color
  }

  move() {
    let velocity = p5.Vector.random2D()
    this.position.add(velocity)
  }

  show() {
    fill(this.color)
    noStroke()
    ellipse(this.position.x, this.position.y, this.radius * 2, this.radius * 2)
  }

  clicked() {
    let d = dist(this.position.x, this.position.y, mouseX, mouseY)
    return d < this.radius
  }

  mitosis() {
    return new Cell(this.position, this.radius * 0.5, this.color)
  }
}
