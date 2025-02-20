// https://bleuje.com/tutorial2/

function setup() {
  createCanvas(windowWidth, windowHeight);
}

const numFrames = 60;

function periodicFunction(p) {
  return map(sin(TWO_PI * p), -1, 1, 2, 8);
}

function offset(x, y) {
  return 0.01 * dist(x, y, width / 2, height / 2);
}

function draw() {
  background(255);
  const t = (1.0 * (frameCount - 1)) / numFrames;
  const m = 40;
  stroke(0);
  // fill(0)
  // noStroke()

  for (i = 0; i < m; i++) {
    for (j = 0; j < m; j++) {
      const x = map(i, 0, m - 1, 0, width);
      const y = map(j, 0, m - 1, 0, height);

      const circleSize = periodicFunction(t - offset(x, y));
      print(circleSize);
      strokeWeight(circleSize);
      point(x, y);
      // circle(x, y, circleSize)
    }
  }
}
