let ship
let flowers = []
let flowerCount = 6
let squirts = []
let isMovingLeft = false
let isMovingRight = false

function setup() {
  createCanvas(windowWidth, windowHeight)
  ship = new Ship()

  for (let i = 0; i < flowerCount; i++) {
    const sectionLength = width / flowerCount
    const x = i * sectionLength + sectionLength / 2
    const y = 60
    flowers[i] = new Flower(x, y)
  }
}

function draw() {
  background(51)
  ship.show()
  for (flower of flowers) {
    flower.show()
  }
  for (squirt of squirts) {
    squirt.show()
    squirt.move()
    for (flower of flowers) {
      if (squirt.hits(flower)) {
        flower.hitCount++
        flower.grow()
        squirt.disappear()
      }
    }
  }
  for (let i = squirts.length - 1; i >= 0; i--) {
    if (squirts[i].toDelete) {
      squirts.splice(i, 1)
    }
  }
  if (isMovingLeft) {
    ship.move(-1)
  }
  if (isMovingRight) {
    ship.move(1)
  }

  if (frameCount % 60 === 0) {
    for (flower of flowers) {
      if (flower.isTouchingEdge()) {
        for (flower of flowers) {
          flower.shiftDown()
          flower.xdir *= -1
        }
      } else {
        for (flower of flowers) {
          flower.shiftSideways()
        }
      }
    }
  }
}

function keyPressed() {
  if (key === " ") {
    squirts.push(new Squirt(ship.x, height))
  }
  if (keyCode === RIGHT_ARROW) {
    isMovingRight = true
  }
  if (keyCode === LEFT_ARROW) {
    isMovingLeft = true
  }
}

function keyReleased() {
  if (keyCode === RIGHT_ARROW) {
    isMovingRight = false
  }
  if (keyCode === LEFT_ARROW) {
    isMovingLeft = false
  }
}

class Ship {
  constructor() {
    this.x = width / 2
  }

  move(direction) {
    if (this.x < 0 + 10) {
      this.x = 10
    }
    if (this.x > width - 10) {
      this.x = width - 10
    }
    this.x += direction * 5
  }

  show() {
    fill(255)
    rectMode(CENTER)
    rect(this.x, height - 20, 20, 60)
  }
}

class Flower {
  constructor(x, y) {
    this.x = x
    this.y = y
    this.r = 30
    this.xdir = 1
    this.hitCount = 0
    this.petalCount = 0
  }

  grow() {
    this.r += 1
  }

  show() {
    fill(255, 0, 200)
    ellipse(this.x, this.y, this.r * 2, this.r * 2)
    if (this.hitCount > 0) {
      this.showEyes()
    }
    if (this.hitCount > 3) {
      this.showMouth()
    }
    this.petalCount = floor(this.hitCount / 5)
    this.showPetals()
  }

  showEyes() {
    fill(255)
    ellipse(this.x - 10, this.y - 10, 10, 10)
    ellipse(this.x + 10, this.y - 10, 10, 10)
  }

  showMouth() {
    fill(255)
    rect(this.x, this.y + 10, 20, 10)
  }

  showPetals() {
    for (let i = 0; i < this.petalCount; i++) {
      // draw green petals around the flower, starting at the top and going clockwise
      const angle = TWO_PI / this.petalCount
      const x = this.x + cos(angle * i) * this.r
      const y = this.y + sin(angle * i) * this.r
      fill(0, 255, 0)
      ellipse(x, y, this.r * 2, 20)
    }
  }

  shiftSideways() {
    this.x += this.xdir * 5
  }

  shiftDown() {
    this.y += 10
  }
  isTouchingEdge() {
    return this.x > width - this.r * 2 || this.x < this.r * 2
  }
}

class Squirt {
  constructor(x, y) {
    this.x = x
    this.y = y
    this.r = 8
    this.toDelete = false
  }

  move() {
    this.y -= 5
  }

  hits(flower) {
    const d = dist(this.x, this.y, flower.x, flower.y)
    return d < this.r + flower.r
  }

  disappear() {
    this.toDelete = true
  }

  show() {
    noStroke()
    fill(150, 0, 255)
    ellipse(this.x, this.y, this.r * 2, this.r * 2)
  }
}
