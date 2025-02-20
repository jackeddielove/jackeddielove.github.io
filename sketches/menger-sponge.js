class Box {
  constructor(x, y, z, r_) {
    this.position = createVector(x, y, z)
    this.r = r_
  }
  show() {
    push()
    translate(this.position.x, this.position.y, this.position.z)
    fill(255)
    box(this.r)
    pop()
  }
  generate() {
    const boxes = []
    for (let x = -1; x < 2; x++) {
      for (let y = -1; y < 2; y++) {
        for (let z = -1; z < 2; z++) {
          const sum = abs(x) + abs(y) + abs(z)
          const newR = this.r / 3
          if (sum > 1) {
            boxes.push(
              new Box(
                this.position.x + x * newR,
                this.position.y + y * newR,
                this.position.z + z * newR,
                newR
              )
            )
          }
        }
      }
    }
    return boxes
  }
}

let a = 0
let sponge = []

function setup() {
  createCanvas(windowWidth, windowHeight, WEBGL)
  normalMaterial()
  sponge.push(new Box(0, 0, 0, 200))
}

function draw() {
  background(0)
  lights()
  rotateX(a)
  rotateY(a * 0.4)
  rotateZ(a * 0.2)
  for (let i = 0; i < sponge.length; i++) {
    sponge[i].show()
  }
  a += 0.01
}

function mousePressed() {
  let next = []
  for (const b of sponge) {
    const newBoxes = b.generate()
    next = next.concat(newBoxes)
  }
  sponge = next
}
