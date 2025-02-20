let openSimplex
function setup() {
  createCanvas(windowWidth, windowHeight)
  openSimplex = openSimplexNoise(12345)
}
function offset(x, y) {
  return 0.015 * dist(x, y, width / 2, height / 2)
}

function draw() {
  background(0)
  const t = (1.0 * (frameCount - 1)) / frameRate()
  let m = 450
  stroke(255, 50)
  strokeWeight(1.4)

  for (let i = 0; i < m; i++) {
    for (let j = 0; j < m; j++) {
      const margin = 50
      const x = map(i, 0, m - 1, margin, width - margin)
      const y = map(j, 0, m - 1, margin, height - margin)

      const dx = 20.0 * periodicFunction(t - offset(x, y), 0, x, y)
      const dy = 20.0 * periodicFunction(t - offset(x, y), 123, x, y)

      point(x + dx, y + dy)
    }
  }
}
//
function periodicFunction(p, seed, x, y) {
  const radius = 1.8
  const scl = 0.018
  return (
    1.0 *
    openSimplex.noise2D(
      seed + radius * cos(TWO_PI * p),
      radius * sin(TWO_PI * p),
      scl * x,
      scl * y
    )
  )
}
