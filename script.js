let bubbles = [];
let rippleAngles = [];

function setup() {
  let mycanvas = createCanvas(800, 500);
  mycanvas.parent("p5-canvas-container");
  // initial bubbless
  for (let i = 0; i < 20; i++) {
    bubbles.push(
      new Bubble(
        random(width * 0.35, width * 0.65),
        random(height * 0.35, height * 0.65),
        random(5, 20)
      )
    );
  }
  // ripple water effect
  for (let i = 0; i < 10; i++) {
    rippleAngles.push(random(TWO_PI));
  }
}

function draw() {
  clear()
  //draw the pot
  fill(80);
  ellipse(width / 2, height / 2, 300, 300);
  drawHandles(width / 2, height / 2, 300, 300);

  // water surface
  fill(0, 100, 255, 150);
  ellipse(width / 2, height / 2, 280, 280);

  //ripples on the water
  drawRipples(width / 2, height / 2, 280, 280);

  // Update and display bubbles
  for (let i = bubbles.length - 1; i >= 0; i--) {
    bubbles[i].update();
    bubbles[i].display();
    if (bubbles[i].r > 50) {
      bubbles.splice(i, 1);
    }
  }

  //add new bubbles
  if (random(1) < 0.05) {
    bubbles.push(
      new Bubble(
        random(width * 0.35, width * 0.65),
        random(height * 0.35, height * 0.65),
        random(5, 20)
      )
    );
  }
}

function mousePressed() {
  // bubble clicked
  for (let i = bubbles.length - 1; i >= 0; i--) {
    if (bubbles[i].clicked(mouseX, mouseY)) {
      bubbles.splice(i, 1);
    }
  }
}

class Bubble {
  constructor(x, y, r) {
    this.x = x;
    this.y = y;
    this.r = r;
    this.life = 0;
  }

  update() {
    // bubbles growth
    this.r += 0.2;
    // bubbles up
    this.y -= random(0.5, 2);
    // bubbles side to side
    this.x += random(-1, 1);
  }

  display() {
    noStroke();
    fill(255, 150); //white bubbles
    ellipse(this.x, this.y, this.r * 2);
  }

  clicked(px, py) {
    let d = dist(px, py, this.x, this.y);
    return d < this.r;
  }
}

function drawHandles(px, py, potWidth, potHeight) {
  fill(80);
  arc(
    px - potWidth / 2,
    py,
    potWidth * 0.2,
    potHeight * 0.2,
    HALF_PI,
    3 * HALF_PI
  );
  arc(
    px + potWidth / 2,
    py,
    potWidth * 0.2,
    potHeight * 0.2,
    3 * HALF_PI,
    HALF_PI
  );
}

function drawRipples(px, py, potWidth, potHeight) {
  noFill();
  stroke(0, 100, 255, 100);
  strokeWeight(1);
  for (let angle of rippleAngles) {
    let x = px + cos(angle) * potWidth * 0.4 * noise(frameCount * 0.02);
    let y = py + sin(angle) * potHeight * 0.4 * noise(frameCount * 0.02 + 10);
    ellipse(x, y, 20 + noise(frameCount * 0.01) * 15);
  }
}