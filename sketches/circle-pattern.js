// Created by https://thedotisblack.com/

let dia = 400 // find a better name for this variable d
let angle = 0
let swAngle
let strokeWeightMax = 0

function setup() {
  createCanvas(windowWidth, windowHeight)
  stroke(255)
}
function draw() {
  background(0, 40, 65) // lovely deep blue
  dia = lerp(dia, mouseX, 0.1)
  translate(width / 2, height / 2)
  rotate(-angle)
  for (let a = 0; a < 360; a += 30) {
    push()
    rotate(radians(a))
    for (let r = 0; r < 180; r += 8) {
      const sw = map(cos(radians(r)), -1, 1, strokeWeightMax, 1)
      strokeWeight(sw)
      line(
        sin(radians(r)) * dia,
        cos(radians(r)) * dia,

        sin(radians(-r)) * dia,
        cos(radians(-r)) * dia
      )
    }
    pop()
  }
  angle += TWO_PI / 720
  swAngle = map(dia, 0, width, 0, 360)
  swAngle = constrain(swAngle, 180, 360)
  strokeWeightMax = map(cos(radians(swAngle)), -1, 1, 1, 225)
  noFill()
  stroke(255)
  ellipse(0, 0, dia * 2, dia * 2)
}
