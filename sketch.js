function setup() {
    createCanvas(700, 700, WEBGL);
  
    
    //constants for drawing the tetrapod
  
    // s = 30;
    // l = sqrt(8 / 3) * s;
  
    //rotation speed
    r = 25;
  
    //hasse diagram
    size = 125;
    N = [0, -size];
    E = [size, 0];
    S = [0, size];
    W = [-size, 0];
  
    //elements of A4
  
    A4element = [0, 1, 2, 3];
  
    A4 = [
      [0, 1, 2, 3],
      [2, 0, 1, 3],
      [1, 2, 0, 3],
      [3, 0, 2, 1],
      [1, 3, 2, 0],
      [3, 1, 0, 2],
      [2, 1, 3, 0],
      [0, 3, 1, 2],
      [0, 2, 3, 1],
      [1, 0, 3, 2],
      [2, 3, 0, 1],
      [3, 2, 1, 0],
    ];
  
    //variables for animating
  
    vAnimate = false;
    eAnimate = false;
    vCountdown = r;
    eCountdown = r;
    vAxis = createVector(1, 1, 1);
    eAxis = createVector(1, 0, 0);
  
    //indexing parts of the tetrapod to use in for-loop
  
    hub = [
      [1, 1, 1],
      [-1, -1, 1],
      [1, -1, -1],
      [-1, 1, -1],
      [1, 1, -1],
      [1, -1, 1],
      [-1, 1, 1],
      [-1, -1, -1],
    ];
    feet = [
      [-1, -1, -1],
      [1, 1, -1],
      [-1, 1, 1],
      [1, -1, 1],
    ];
  
    //colors for the legs and feet
  
    colors = ["#F500D3", "#FFBC00", "#019AFF", "#41F501"];
    targetColors = ["#F500D3", "#FFBC00", "#019AFF", "#41F501"];
  }
  
  //draw the tetrapod
  
  function tetrapod(s) {
    for (i = 0; i <= 3; i++) {
      strokeWeight(0.5);
      stroke(0);
      l = sqrt(8 / 3) * s;
  
      //HUB
      fill(255);
      beginShape();
      vertex(s * hub[i][0], 0, 0);
      vertex(0, s * hub[i][1], 0);
      vertex(0, 0, s * hub[i][2]);
      endShape(CLOSE);
  
      //LEGS
      fill(color(colors[i]));
      beginShape();
      vertex(feet[i][0] * (s + l), feet[i][1] * l, feet[i][2] * l);
      vertex(feet[i][0] * l, feet[i][1] * (s + l), feet[i][2] * l);
      vertex(0, feet[i][1] * s, 0);
      vertex(feet[i][0] * s, 0, 0);
      endShape(CLOSE);
  
      beginShape();
      vertex(feet[i][0] * (s + l), feet[i][1] * l, feet[i][2] * l);
      vertex(feet[i][0] * l, feet[i][1] * l, feet[i][2] * (s + l));
      vertex(0, 0, feet[i][2] * s);
      vertex(feet[i][0] * s, 0, 0);
      endShape(CLOSE);
  
      beginShape();
      vertex(feet[i][0] * l, feet[i][1] * (s + l), feet[i][2] * l);
      vertex(feet[i][0] * l, feet[i][1] * l, feet[i][2] * (s + l));
      vertex(0, 0, feet[i][2] * s);
      vertex(0, feet[i][1] * s, 0);
      endShape(CLOSE);
  
      //FEET
      beginShape();
      vertex(feet[i][0] * (s + l), feet[i][1] * l, feet[i][2] * l);
      vertex(feet[i][0] * l, feet[i][1] * (s + l), feet[i][2] * l);
      vertex(feet[i][0] * l, feet[i][1] * l, feet[i][2] * (s + l));
      endShape(CLOSE);
    }
  }
  
  //draw the target tetrapod
  
  function targetTetrapod(s) {
    for (i = 0; i <= 3; i++) {
      strokeWeight(0.5);
      stroke(0);
      l = sqrt(8 / 3) * s;
  
      //HUB
      fill(255);
      beginShape();
      vertex(s * hub[i][0], 0, 0);
      vertex(0, s * hub[i][1], 0);
      vertex(0, 0, s * hub[i][2]);
      endShape(CLOSE);
  
      //LEGS
      fill(color(targetColors[A4element[i]]));
      beginShape();
      vertex(feet[i][0] * (s + l), feet[i][1] * l, feet[i][2] * l);
      vertex(feet[i][0] * l, feet[i][1] * (s + l), feet[i][2] * l);
      vertex(0, feet[i][1] * s, 0);
      vertex(feet[i][0] * s, 0, 0);
      endShape(CLOSE);
  
      beginShape();
      vertex(feet[i][0] * (s + l), feet[i][1] * l, feet[i][2] * l);
      vertex(feet[i][0] * l, feet[i][1] * l, feet[i][2] * (s + l));
      vertex(0, 0, feet[i][2] * s);
      vertex(feet[i][0] * s, 0, 0);
      endShape(CLOSE);
  
      beginShape();
      vertex(feet[i][0] * l, feet[i][1] * (s + l), feet[i][2] * l);
      vertex(feet[i][0] * l, feet[i][1] * l, feet[i][2] * (s + l));
      vertex(0, 0, feet[i][2] * s);
      vertex(0, feet[i][1] * s, 0);
      endShape(CLOSE);
  
      //FEET
      beginShape();
      vertex(feet[i][0] * (s + l), feet[i][1] * l, feet[i][2] * l);
      vertex(feet[i][0] * l, feet[i][1] * (s + l), feet[i][2] * l);
      vertex(feet[i][0] * l, feet[i][1] * l, feet[i][2] * (s + l));
      endShape(CLOSE);
    }
  }
  
  //hasse diagram
  
  //draw the target tetrapod
  
  function hasseTetrapod(x, y, s) {
    for (i = 0; i <= 3; i++) {
      strokeWeight(0.5);
      stroke(0);
      l = sqrt(8 / 3) * s;
  
      //HUB
      fill(255);
      beginShape();
      vertex(s * hub[i][0], 0, 0);
      vertex(0, s * hub[i][1], 0);
      vertex(0, 0, s * hub[i][2]);
      endShape(CLOSE);
  
      //LEGS
      fill(color(targetColors[A4element[i]]));
      beginShape();
      vertex(feet[i][0] * (s + l), feet[i][1] * l, feet[i][2] * l);
      vertex(feet[i][0] * l, feet[i][1] * (s + l), feet[i][2] * l);
      vertex(0, feet[i][1] * s, 0);
      vertex(feet[i][0] * s, 0, 0);
      endShape(CLOSE);
  
      beginShape();
      vertex(feet[i][0] * (s + l), feet[i][1] * l, feet[i][2] * l);
      vertex(feet[i][0] * l, feet[i][1] * l, feet[i][2] * (s + l));
      vertex(0, 0, feet[i][2] * s);
      vertex(feet[i][0] * s, 0, 0);
      endShape(CLOSE);
  
      beginShape();
      vertex(feet[i][0] * l, feet[i][1] * (s + l), feet[i][2] * l);
      vertex(feet[i][0] * l, feet[i][1] * l, feet[i][2] * (s + l));
      vertex(0, 0, feet[i][2] * s);
      vertex(0, feet[i][1] * s, 0);
      endShape(CLOSE);
  
      //FEET
      beginShape();
      vertex(feet[i][0] * (s + l), feet[i][1] * l, feet[i][2] * l);
      vertex(feet[i][0] * l, feet[i][1] * (s + l), feet[i][2] * l);
      vertex(feet[i][0] * l, feet[i][1] * l, feet[i][2] * (s + l));
      endShape(CLOSE);
    }
  }
  
  //interaction
  
  function keyPressed() {
    if (keyCode === RIGHT_ARROW) {
      vAnimate = true;
      vCountdown = r;
    }
  
    if (keyCode === UP_ARROW) {
      eAnimate = true;
      eCountdown = r;
    }
  
    if (keyCode === DOWN_ARROW) {
      A4element = random(A4);
    }
  }
  
  function draw() {
    background(220);
    // orbitControl();
    
      // fullscreen(true);
  
  
    push();
    translate(-width / 4, -height / 4);
  
    // draw rotation axes
  
    strokeWeight(1.5);
    stroke(150);
  
    line(-500, 0, 150, 0);
    line(-500, -500, -500, 150, 150, 150);
  
    //rotate about vAxis
  
    if (vAnimate == true) {
      rotate((((r - vCountdown) / r) * 2 * PI) / 3, vAxis);
      tetrapod(30);
      vCountdown--;
      if (vCountdown == 0) {
        vAnimate = false;
        colors = [colors[0], colors[3], colors[1], colors[2]];
      }
    }
  
    //rotate about eAxis
  
    if (eAnimate == true) {
      rotate(((r - eCountdown) / r) * PI, eAxis);
      tetrapod(30);
      eCountdown--;
      if (eCountdown == 0) {
        eAnimate = false;
        colors = [colors[2], colors[3], colors[0], colors[1]];
      }
    }
  
    //draw tetrapod in current orientation
    else {
      tetrapod(30);
    }
  
    pop();
  
  //   push();
  //   translate(150, 0);
  //   push();
  //   translate(0, -100);
  //   tetrapod(10);
  //   pop();
  //   push();
  //   translate(50, -100 - (100 * sqrt(3)) / 2);
  //   tetrapod(10);
  //   pop();
  //   push();
  //   translate(-50, -100 - (100 * sqrt(3)) / 2);
  //   tetrapod(10);
  //   pop();
  //   push();
  //   translate(100, 0);
  //   tetrapod(10);
  //   pop();
  //   push();
  //   translate(100 + (100 * sqrt(3)) / 2, -50);
  //   tetrapod(10);
  //   pop();
  //   push();
  //   translate(100 + (100 * sqrt(3)) / 2, 50);
  //   tetrapod(10);
  //   pop();
  //   push();
  //   translate(0, 100);
  //   tetrapod(10);
  //   pop();
  //   push();
  //   translate(50, 100 + (100 * sqrt(3)) / 2);
  //   tetrapod(10);
  //   pop();
  //     push();
  //   translate(-50, 100 + (100 * sqrt(3)) / 2);
  //   tetrapod(10);
  //   pop();
  //   pop();
  
    push();
    translate(-width / 4, height / 4);
    rotateX(PI / 6);
    targetTetrapod(30);
    pop();
  }
  