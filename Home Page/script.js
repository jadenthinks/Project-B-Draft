let cherryBlossoms = 100; // Number of pink cherry blossoms
let whiteBlossoms = 50; // Number of smaller white blossoms
let particles = [];

function setup() {
  let canvas = createCanvas(800, 600);
  canvas.parent("p5-canvas-container");

  // pink cherry blossoms
  for (let i = 0; i < cherryBlossoms; i++) {
    particles.push(new Particle(random(width), random(height), 'pink'));
  }

  //  white blossoms
  for (let i = 0; i < whiteBlossoms; i++) {
    particles.push(new Particle(random(width), random(height), 'white'));
  }
}

function draw() {
  background(140, 200, 250); //sky background

  // update and display
  particles.forEach(particle => {
    particle.update();
    particle.display();
  });
}

class Particle {
  // constructor function
  constructor(startX, startY, n) {
    // properties: particle's characteristics
    this.x = startX;
    this.y = startY;
    this.type = n; // 'pink' or 'white' blossoms for n
    this.dia = n === 'pink' ? random(8, 12) : random(4, 6); 
    
    // color for blossoms
    if (n === 'pink') {
      this.color = [255, random(160, 200), random(180, 220)];
      this.centerColor = [255, 205, 0];
    } else { 
      this.color = [255, random(240, 255), random(240, 255)];
      this.centerColor = [240, 240, 240];
    }
    // horizontal speed
    this.xSpeed = random(-0.5, 0.5);

    // falling speed
    this.ySpeed = random(0.5, 1.5);
  }

  // methods (functions): particle's behaviors
  update() {
    this.x += this.xSpeed;
    this.y += this.ySpeed;

    // Reset particles to the top once they've fallen out of view
    if (this.y > height) {
      this.y = 0;
      this.x = random(width);
    }
  }

  display() {
    // particle's appearance
    push();
    translate(this.x, this.y);
    noStroke();

    // drawing blossoms with petals
    fill(...this.color);
    for (let i = 0; i < 5; i++) {
      ellipse(0, this.dia / 4, this.dia / 2, this.dia);
      rotate(TWO_PI / 5);
    }

    fill(...this.centerColor);
    circle(0, 0, this.dia / 3);

    pop();
  }
}
