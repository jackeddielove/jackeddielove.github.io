let speed = 1;
const numberOfStars = 800;
let increasingSpeed = false;
let decreasingSpeed = false;
let movingLeft = false;
let movingRight = false;
let originX = 0;
let originY = 0;
const stars = [];

function Star() {
  this.x = random(-width, width);
  this.y = random(-height, height);
  this.z = random(width);
  this.previousZ = this.z;

  this.update = function () {
    this.z -= speed; // move towards the screen

    // if the star is behind the screen, reset its position
    if (this.z < 1) {
      this.z = width;
      this.x = random(-width, width);
      this.y = random(-height, height);
      this.previousZ = this.z;
    }
  };

  this.show = function () {
    fill(247, 237, 178);
    noStroke();

    const starX = map(this.x / this.z, 0, 1, 0, width);
    const starY = map(this.y / this.z, 0, 1, 0, height);

    const starRadius = map(this.z, 0, width, 10, 1);
    ellipse(starX, starY, starRadius, starRadius);

    const previousStarX = map(
      this.x / this.previousZ,
      0,
      1,
      0,
      width + speed / 2
    );
    const previousStarY = map(
      this.y / this.previousZ,
      0,
      1,
      0,
      height + speed / 2
    );

    // Star streaks
    stroke(247, 237, 178);
    streakWeight = map(this.z, 0, width, 6, 0);
    strokeWeight(streakWeight);
    line(previousStarX, previousStarY, starX, starY);

    this.previousZ = this.z;
  };
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  originX = windowWidth / 2;
  originY = windowHeight / 2;
  // create 800 stars
  for (let i = 0; i < numberOfStars; i++) {
    stars.push(
      new Star(
        random(0, windowWidth),
        random(0, windowHeight),
        random(0, windowWidth)
      )
    );
  }
}

function draw() {
  cursor(CROSS);
  if (increasingSpeed && speed < 100) {
    speed += 1;
  }
  if (decreasingSpeed && speed > 0) {
    speed -= 1;
  }
  if (movingLeft) {
    originX += 10;
  }
  if (movingRight) {
    originX -= 10;
  }

  background(0);
  translate(originX, originY);

  for (let i = 0; i < stars.length; i++) {
    stars[i].update();
    stars[i].show();
  }
}

function keyPressed() {
  if (keyCode === UP_ARROW) {
    originX = windowWidth / 2;
    originY = windowHeight / 2;
    increasingSpeed = true;
  }
  if (keyCode === DOWN_ARROW) {
    decreasingSpeed = true;
  }
  if (keyCode === LEFT_ARROW) {
    movingLeft = true;
  }
  if (keyCode === RIGHT_ARROW) {
    movingRight = true;
  }
}

function keyReleased() {
  if (keyCode === UP_ARROW) {
    increasingSpeed = false; // Stop increasing speed
  }
  if (keyCode === DOWN_ARROW) {
    decreasingSpeed = false; // Stop decreasing speed
  }
  if (keyCode === LEFT_ARROW) {
    movingLeft = false;
  }
  if (keyCode === RIGHT_ARROW) {
    movingRight = false;
  }
}
