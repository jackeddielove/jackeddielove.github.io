let drops = []

function setup() {
  createCanvas(windowWidth, windowHeight)
  for (let i = 0; i < 500; i++) {
    drops.push(new Drop(random(width), random(-500, -50)))
  }
}

function draw() {
  background(230, 230, 250)
  for (drop of drops) {
    drop.fall()
    drop.show()
  }
}

class Drop {
  constructor(x, y) {
    this.x = x
    this.y = y
    this.z = randomGaussian(7, 3)
    this.yspeed = map(this.z, 0, 20, 1, 20)
    this.length = map(this.z, 0, 20, 10, 20)
  }

  fall() {
    this.y += this.yspeed
    const gravity = map(this.z, 0, 20, 0, 0.2)
    this.yspeed += gravity
    if (this.y > height) {
      this.y = random(-200, -100)
      this.yspeed = map(this.z, 0, 20, 1, 20)
    }
  }

  show() {
    strokeWeight(map(this.z, 0, 20, 1, 3))
    stroke(138, 43, 226)
    line(this.x, this.y, this.x, this.y + this.length)
  }
}
